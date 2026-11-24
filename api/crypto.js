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
const UPSTREAM_TIMEOUT_MS = 4500;
const SWEEP_TIMEOUT_MS = 12000;
const UPSTREAM_COOLDOWN_MS = 45000;

let upstreamDownUntil = 0;
let lastUpstreamWarnAt = 0;

function isValidBep20Address(addr) {
  return /^0x[a-fA-F0-9]{40}$/.test(String(addr || '').trim());
}

async function fetchWithTimeout(url, options = {}, timeoutMs = UPSTREAM_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, Object.assign({}, options, { signal: controller.signal }));
  } finally {
    clearTimeout(timer);
  }
}

function markUpstreamUnavailable(err) {
  const now = Date.now();
  upstreamDownUntil = now + UPSTREAM_COOLDOWN_MS;
  if (now - lastUpstreamWarnAt >= UPSTREAM_COOLDOWN_MS) {
    lastUpstreamWarnAt = now;
    const reason = (err && err.name === 'AbortError')
      ? `timeout (${UPSTREAM_TIMEOUT_MS}ms)`
      : ((err && err.cause && err.cause.code) || (err && err.message) || 'unreachable');
    console.warn(`[Crypto Proxy] Upstream imcagro.top temporarily unavailable (${reason}); pausing upstream requests for ${Math.round(UPSTREAM_COOLDOWN_MS / 1000)}s.`);
  }
}

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
      const rpcResp = await fetchWithTimeout(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload
      }, 4000);
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

async function respondWithBscFallbackOrUnavailable(res, action, cleanUserId, hintAddress) {
  if (action === 'check' && isValidBep20Address(hintAddress)) {
    const bscBal = await readBscUsdtBalance(hintAddress);
    if (bscBal !== null) {
      return res.status(200).json({
        success: true,
        user_id: cleanUserId,
        address: hintAddress,
        usdt_balance: bscBal,
        bsc_rpc_balance: bscBal,
        verified_zero_onchain: (bscBal === 0),
        source: 'bsc_rpc'
      });
    }
  }
  return res.status(200).json({
    success: false,
    upstream_unavailable: true,
    message: 'Crypto backend temporarily unreachable'
  });
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
  const rawHintAddress = String(q.address || url.searchParams.get('address') || '').trim();
  const hintAddress = isValidBep20Address(rawHintAddress) ? rawHintAddress : '';

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

    if (Date.now() < upstreamDownUntil) {
      return res.status(503).json({
        success: false,
        upstream_unavailable: true,
        message: 'Crypto sweep backend temporarily unreachable. Please retry shortly.'
      });
    }

    try {
      // Pre-check balance before calling cPanel sweep so empty addresses never trigger transactions
      const checkResp = await fetchWithTimeout(`https://imcagro.top/crypto/check/${parsedUserId}`, {
        headers: { 'Accept': 'application/json' }
      }, UPSTREAM_TIMEOUT_MS);
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

      const sweepResp = await fetchWithTimeout(`https://imcagro.top/crypto/sweep/${parsedUserId}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-sweep-secret': sweepSecret
        },
        body: JSON.stringify({ userId: parsedUserId })
      }, SWEEP_TIMEOUT_MS);

      upstreamDownUntil = 0;
      const sweepData = await sweepResp.json().catch(() => ({ success: false, message: 'Invalid response from sweep server' }));
      return res.status(sweepResp.ok ? 200 : sweepResp.status).json({
        success: Boolean(sweepData && sweepData.success),
        swept_usdt: sweepData && sweepData.swept_usdt ? sweepData.swept_usdt : null,
        tx_hash: sweepData && sweepData.tx_hash ? sweepData.tx_hash : null,
        message: (sweepData && (sweepData.message || sweepData.error)) || 'Sweep processed'
      });
    } catch (sweepErr) {
      markUpstreamUnavailable(sweepErr);
      return res.status(503).json({
        success: false,
        upstream_unavailable: true,
        message: 'Crypto sweep backend temporarily unreachable. Please retry shortly.'
      });
    }
  }

  const cleanUserId = (Number.isInteger(parsedUserId) && parsedUserId >= 1 && parsedUserId <= 2147483647) ? parsedUserId : 1;

  if (Date.now() < upstreamDownUntil) {
    return respondWithBscFallbackOrUnavailable(res, action, cleanUserId, hintAddress);
  }

  try {
    const targetUrl = action === 'check'
      ? `https://imcagro.top/crypto/check/${cleanUserId}`
      : `https://imcagro.top/crypto/${cleanUserId}`;

    const resp = await fetchWithTimeout(targetUrl, {
      headers: {
        'Accept': 'application/json'
      }
    }, UPSTREAM_TIMEOUT_MS);

    if (!resp.ok) {
      return respondWithBscFallbackOrUnavailable(res, action, cleanUserId, hintAddress);
    }

    upstreamDownUntil = 0;
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
    markUpstreamUnavailable(err);
    return respondWithBscFallbackOrUnavailable(res, action, cleanUserId, hintAddress);
  }
}
