/**
 * Crypto HD Wallet Proxy API
 * Proxies requests to live cPanel crypto deposit backend:
 * - Address: https://imcagro.top/crypto/:userId
 * - Balance Check: https://imcagro.top/crypto/check/:userId
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
  const q = req.query || {};
  const action = q.action || url.searchParams.get('action') || (url.pathname.includes('/check') ? 'check' : 'address');
  let userId = q.userId || q.id || url.searchParams.get('userId') || url.searchParams.get('id');

  if (!userId) {
    const parts = url.pathname.split('/').filter(Boolean);
    const lastPart = parts[parts.length - 1];
    if (lastPart && /^\d+$/.test(lastPart)) {
      userId = lastPart;
    }
  }

  const cleanUserId = parseInt(String(userId || '1').replace(/\D/g, ''), 10) || 1;

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
