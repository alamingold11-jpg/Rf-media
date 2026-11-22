/**
 * Crypto HD Wallet Proxy API
 * Proxies requests to live cPanel crypto deposit backend:
 * - Address: https://imcagro.top/crypto/:userId
 * - Balance Check: https://imcagro.top/crypto/check/:userId
 */
const BSC_USDT_CONTRACT = '0x55d398326f99059ff775485246999027b3197955';
const BSC_RPC_ENDPOINTS = [
  'https://bsc-dataseed.binance.org/',
  'https://bsc.publicnode.com'
];

async function readBscUsdtBalance(address) {
  const cleanAddr = String(address || '').trim().toLowerCase().replace(/^0x/, '');
  if (!/^[a-f0-9]{40}$/.test(cleanAddr)) return null;
  const callData = '0x70a08231' + cleanAddr.padStart(64, '0');
  const payload = JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'eth_call',
    params: [{ to: BSC_USDT_CONTRACT, data: callData }, 'latest']
  });

  for (const rpcUrl of BSC_RPC_ENDPOINTS) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 4000);
      const rpcResp = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        signal: controller.signal
      });
      clearTimeout(timer);
      if (!rpcResp.ok) continue;
      const rpcJson = await rpcResp.json();
      if (rpcJson && typeof rpcJson.result === 'string' && rpcJson.result.startsWith('0x')) {
        const wei = BigInt(rpcJson.result);
        const whole = wei / 1000000000000000000n;
        const frac = (wei % 1000000000000000000n) / 100000000000000n; // 4 decimals
        return Number(`${whole}.${String(frac).padStart(4, '0')}`);
      }
    } catch (e) {}
  }
  return null;
}

export default async function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
  const q = req.query || {};
  const action = q.action || url.searchParams.get('action') || (url.pathname.includes('/check') ? 'check' : (url.pathname.includes('/sweep') ? 'sweep' : 'address'));

  if (action !== 'sweep') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  } else {
    const reqOrigin = String(req.headers.origin || '').trim();
    const reqHost = String(req.headers['x-forwarded-host'] || req.headers.host || '').trim().toLowerCase();
    if (reqOrigin) {
      try {
        const originHost = new URL(reqOrigin).host.toLowerCase();
        if (originHost && originHost === reqHost) {
          res.setHeader('Access-Control-Allow-Origin', reqOrigin);
          res.setHeader('Vary', 'Origin');
        }
      } catch (e) {}
    }
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
  }

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  let userId = q.userId || q.id || url.searchParams.get('userId') || url.searchParams.get('id');

  if (!userId) {
    const parts = url.pathname.split('/').filter(Boolean);
    const lastPart = parts[parts.length - 1];
    if (lastPart && /^\d+$/.test(lastPart)) {
      userId = lastPart;
    }
  }

  const parsedUserId = parseInt(String(userId || '').replace(/\D/g, ''), 10);

  // Authenticated server-to-server USDT auto-sweep trigger (destination is locked on cPanel)
  if (action === 'sweep') {
    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, message: 'Only POST is allowed for sweep' });
    }
    if (!Number.isInteger(parsedUserId) || parsedUserId < 1 || parsedUserId > 2147483647) {
      return res.status(400).json({ success: false, message: 'Invalid userId' });
    }

    // Require same-origin header or XMLHttpRequest custom header
    const reqHost = String(req.headers['x-forwarded-host'] || req.headers.host || '').trim().toLowerCase();
    const reqOrigin = String(req.headers.origin || '').trim();
    const xRequestedWith = String(req.headers['x-requested-with'] || '').trim().toLowerCase();
    let originOk = (xRequestedWith === 'xmlhttprequest');
    if (reqOrigin && reqHost) {
      try {
        originOk = originOk || (new URL(reqOrigin).host.toLowerCase() === reqHost);
      } catch (e) {}
    }
    if (!originOk) {
      return res.status(403).json({ success: false, message: 'Forbidden origin' });
    }

    const sweepSecret = String(process.env.CRYPTO_SWEEP_SECRET || process.env.SWEEP_SECRET || '').trim();
    if (!sweepSecret) {
      return res.status(503).json({
        success: false,
        skipped: true,
        message: 'CRYPTO_SWEEP_SECRET / SWEEP_SECRET is not configured on server'
      });
    }

    try {
      // Pre-check balance before calling cPanel sweep so empty addresses never trigger transactions
      const checkResp = await fetch(`https://imcagro.top/crypto/check/${parsedUserId}`, {
        headers: { 'Accept': 'application/json' }
      });
      if (!checkResp.ok) {
        return res.status(checkResp.status).json({ success: false, message: 'Failed to check balance before sweep' });
      }
      const checkData = await checkResp.json();
      const onchainUsdt = parseFloat(checkData && checkData.usdt_balance ? checkData.usdt_balance : 0);
      if (!Number.isFinite(onchainUsdt) || onchainUsdt < 1) {
        return res.status(200).json({
          success: false,
          skipped: true,
          message: 'Balance below 1 USDT minimum for sweep',
          usdt_balance: onchainUsdt || 0
        });
      }

      const sweepResp = await fetch(`https://imcagro.top/crypto/sweep/${parsedUserId}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-sweep-secret': sweepSecret
        },
        body: JSON.stringify({ userId: parsedUserId })
      });

      const sweepData = await sweepResp.json().catch(() => ({ success: false, message: 'Invalid response from sweep server' }));
      return res.status(sweepResp.ok ? 200 : sweepResp.status).json({
        success: Boolean(sweepData && sweepData.success),
        swept_usdt: sweepData && sweepData.swept_usdt ? sweepData.swept_usdt : null,
        tx_hash: sweepData && sweepData.tx_hash ? sweepData.tx_hash : null,
        message: (sweepData && (sweepData.message || sweepData.error)) || 'Sweep processed'
      });
    } catch (sweepErr) {
      console.error('[Crypto Sweep Proxy] Error:', sweepErr.message);
      return res.status(500).json({
        success: false,
        message: 'Sweep proxy failed'
      });
    }
  }

  const cleanUserId = (Number.isInteger(parsedUserId) && parsedUserId >= 1 && parsedUserId <= 2147483647) ? parsedUserId : 1;

  try {
    const targetUrl = action === 'check' 
      ? `https://imcagro.top/crypto/check/${cleanUserId}`
      : `https://imcagro.top/crypto/${cleanUserId}`;

    const resp = await fetch(targetUrl, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!resp.ok) {
      return res.status(resp.status).json({
        success: false,
        message: `Crypto backend returned status ${resp.status}`
      });
    }

    const data = await resp.json();

    // Cross-verify zero balance directly on BSC RPC before allowing sweep-reset of claimedUsdtOnchain
    if (action === 'check' && data && data.success && data.address) {
      const cpanelBal = parseFloat(data.usdt_balance || 0);
      if (Number.isFinite(cpanelBal) && cpanelBal === 0) {
        const bscBal = await readBscUsdtBalance(data.address);
        if (bscBal !== null) {
          data.bsc_rpc_balance = bscBal;
          data.verified_zero_onchain = (bscBal === 0);
        }
      }
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('[Crypto Proxy] Error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to communicate with crypto backend',
      error: err.message
    });
  }
}
