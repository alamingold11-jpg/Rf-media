import crypto from 'node:crypto';

const DEFAULT_CPANEL_OTP_URL = 'https://imcagro.top/send-api/send-otp';
const OTP_EXPIRY_SECONDS = 300;
const OTP_COOLDOWN_SECONDS = 300;
const OTP_MAX_ATTEMPTS = 5;

const memCooldown = new Map();
const memUsedTokens = new Map();

function pruneOtpMemoryStores(nowSec) {
  if (memCooldown.size > 200) {
    for (const [k, ts] of memCooldown.entries()) {
      if (nowSec - ts >= OTP_COOLDOWN_SECONDS) memCooldown.delete(k);
    }
  }
  if (memCooldown.size > 5000) {
    const excess = memCooldown.size - 4000;
    let i = 0;
    for (const k of memCooldown.keys()) {
      memCooldown.delete(k);
      if (++i >= excess) break;
    }
  }
  if (memUsedTokens.size > 200) {
    for (const [k, st] of memUsedTokens.entries()) {
      if (st && st.exp && st.exp < nowSec) memUsedTokens.delete(k);
    }
  }
  if (memUsedTokens.size > 5000) {
    const excess = memUsedTokens.size - 4000;
    let i = 0;
    for (const k of memUsedTokens.keys()) {
      memUsedTokens.delete(k);
      if (++i >= excess) break;
    }
  }
}

function normalizeBdPhone(rawPhone) {
  let digits = String(rawPhone || '').replace(/\D+/g, '');
  if (!digits) return { valid: false };
  if (digits.startsWith('880')) digits = digits.slice(3);
  if (digits.startsWith('0')) digits = digits.slice(1);
  if (!/^1[3-9]\d{8}$/.test(digits)) {
    return { valid: false };
  }
  return {
    valid: true,
    core10: digits,
    local11: '0' + digits,
    e164: '880' + digits,
    masked: '0' + digits.slice(0, 2) + '****' + digits.slice(-2)
  };
}

function parseExternalOtpEndpoint(rawUrl) {
  const input = String(rawUrl || '').trim();
  if (!input || input.startsWith('/')) return null;
  let parsed;
  try {
    parsed = new URL(input);
  } catch (e) {
    return null;
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
  const host = (parsed.hostname || '').toLowerCase();
  if (
    !host ||
    host === 'localhost' ||
    host === '0.0.0.0' ||
    host === '::1' ||
    host === '[::1]' ||
    host.endsWith('.local') ||
    host.startsWith('127.') ||
    host.startsWith('10.') ||
    host.startsWith('192.168.') ||
    host.startsWith('169.254.') ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(host)
  ) {
    return null;
  }

  const cleanPath = parsed.pathname.replace(/\/+$/, '');
  const fullNormalized = `${parsed.origin}${cleanPath}`;

  // Directory-style cpanel-otp PHP folder (contains send_otp.php + verify_otp.php)
  if (/\/(send_otp|verify_otp)\.php$/i.test(cleanPath)) {
    const dirPath = cleanPath.replace(/\/(send_otp|verify_otp)\.php$/i, '');
    return {
      mode: 'php_pair',
      baseUrl: `${parsed.origin}${dirPath}`,
      sendUrl: `${parsed.origin}${dirPath}/send_otp.php`,
      verifyUrl: `${parsed.origin}${dirPath}/verify_otp.php`
    };
  }

  // Single callback endpoint such as https://imcagro.top/send-api/send-otp
  if (/\/(send[-_]?otp|send[-_]?sms)$/i.test(cleanPath) || !/\/otp$/i.test(cleanPath)) {
    return {
      mode: 'single_send',
      sendUrl: fullNormalized
    };
  }

  // Folder path ending in /otp
  return {
    mode: 'php_pair',
    baseUrl: fullNormalized,
    sendUrl: `${fullNormalized}/send_otp.php`,
    verifyUrl: `${fullNormalized}/verify_otp.php`
  };
}

function getOtpSecret() {
  return process.env.OTP_SECRET || process.env.BD_SMS_API_KEY || 'pw-bd-otp-imcagro-hmac-2026';
}

function signToken(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', getOtpSecret()).update(body).digest('base64url');
  return `${body}.${sig}`;
}

function verifySignedToken(token) {
  if (typeof token !== 'string' || !token.includes('.')) return null;
  const [body, sig] = token.split('.', 2);
  if (!body || !sig) return null;
  const expectedSig = crypto.createHmac('sha256', getOtpSecret()).update(body).digest('base64url');
  const a = Buffer.from(expectedSig);
  const b = Buffer.from(sig);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    return JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
  } catch (e) {
    return null;
  }
}

function verifyStatelessOrMemOtp(phoneInfo, code, otpToken) {
  const nowSec = Math.floor(Date.now() / 1000);
  pruneOtpMemoryStores(nowSec);
  const cleanCode = String(code || '').replace(/\D+/g, '');
  if (!/^\d{4,8}$/.test(cleanCode)) {
    return { status: 400, body: { success: false, code: 'INVALID_OTP_FORMAT', message: 'সঠিক SMS OTP কোড লিখুন।' } };
  }

  const tokenData = verifySignedToken(otpToken);
  if (!tokenData || tokenData.phone !== phoneInfo.core10 || !tokenData.hash || !tokenData.exp) {
    return { status: 400, body: { success: false, code: 'INVALID_OTP_TOKEN', message: 'OTP সেশন সঠিক নয়। নতুন কোড পাঠান।' } };
  }
  if (Number(tokenData.exp) < nowSec) {
    return { status: 400, body: { success: false, code: 'OTP_EXPIRED', message: 'OTP কোডের মেয়াদ শেষ হয়ে গেছে। নতুন কোড পাঠান।' } };
  }

  const usedState = memUsedTokens.get(tokenData.jti) || { used: false, attempts: 0, exp: Number(tokenData.exp) };
  if (!usedState.exp) usedState.exp = Number(tokenData.exp);
  if (usedState.used) {
    return { status: 400, body: { success: false, code: 'OTP_ALREADY_USED', message: 'এই OTP কোডটি আগেই ব্যবহার হয়ে গেছে।' } };
  }
  if (usedState.attempts >= OTP_MAX_ATTEMPTS) {
    return { status: 429, body: { success: false, code: 'OTP_TOO_MANY_ATTEMPTS', message: 'অনেকবার ভুল কোড দেওয়া হয়েছে। নতুন OTP পাঠান।' } };
  }

  const actualHash = crypto.createHmac('sha256', getOtpSecret()).update(`${phoneInfo.core10}:${cleanCode}`).digest('hex');
  const a = Buffer.from(String(tokenData.hash));
  const b = Buffer.from(actualHash);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    usedState.attempts += 1;
    memUsedTokens.set(tokenData.jti, usedState);
    return { status: 400, body: { success: false, code: 'OTP_INCORRECT', message: 'OTP কোডটি সঠিক নয়। আবার চেক করে লিখুন।' } };
  }

  usedState.used = true;
  memUsedTokens.set(tokenData.jti, usedState);
  return {
    status: 200,
    body: {
      success: true,
      verified: true,
      phone: phoneInfo.core10,
      message: 'মোবাইল নম্বর সফলভাবে যাচাই হয়েছে।'
    }
  };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, code: 'METHOD_NOT_ALLOWED', message: 'Only POST method is allowed.' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const action = String(body.action || req.query?.action || 'send').toLowerCase();
  if (action !== 'send' && action !== 'verify') {
    return res.status(400).json({ success: false, code: 'INVALID_ACTION', message: 'Invalid OTP action.' });
  }

  const phoneInfo = normalizeBdPhone(body.phone);
  if (!phoneInfo.valid) {
    return res.status(400).json({
      success: false,
      code: 'INVALID_BD_PHONE',
      message: 'সঠিক ১১ ডিজিটের বাংলাদেশি মোবাইল নম্বর (013–019) দিন।'
    });
  }

  const targetEndpoint =
    parseExternalOtpEndpoint(process.env.CPANEL_OTP_URL) ||
    parseExternalOtpEndpoint(body.cpanelOtpUrl) ||
    parseExternalOtpEndpoint(DEFAULT_CPANEL_OTP_URL);

  if (!targetEndpoint) {
    return res.status(503).json({
      success: false,
      code: 'OTP_ENDPOINT_MISSING',
      message: 'cPanel OTP URL সঠিক নয়।'
    });
  }

  // Handle verification
  if (action === 'verify') {
    if (targetEndpoint.mode === 'php_pair') {
      try {
        const upstream = await fetch(targetEndpoint.verifyUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            phone: phoneInfo.local11,
            code: String(body.code || '').trim(),
            otpToken: String(body.otpToken || '').trim()
          }),
          signal: AbortSignal.timeout(18000)
        });
        const rawText = await upstream.text();
        let parsed = null;
        try { parsed = JSON.parse(rawText); } catch (e) {}
        if (!parsed) {
          return res.status(502).json({
            success: false,
            code: 'CPANEL_INVALID_RESPONSE',
            message: 'cPanel verify সার্ভিস থেকে সঠিক JSON পাওয়া যায়নি।'
          });
        }
        return res.status(upstream.status >= 200 && upstream.status < 600 ? upstream.status : 502).json(parsed);
      } catch (err) {
        return res.status(502).json({
          success: false,
          code: 'CPANEL_UNREACHABLE',
          message: 'cPanel OTP সার্ভারের সাথে সংযোগ করা যাচ্ছে না।'
        });
      }
    }

    const vRes = verifyStatelessOrMemOtp(phoneInfo, body.code, body.otpToken);
    return res.status(vRes.status).json(vRes.body);
  }

  // Handle send OTP (5-minute cooldown lock per number)
  const nowSec = Math.floor(Date.now() / 1000);
  pruneOtpMemoryStores(nowSec);
  const lastSent = memCooldown.get(phoneInfo.core10) || 0;
  if (lastSent > 0 && nowSec - lastSent < OTP_COOLDOWN_SECONDS) {
    const wait = OTP_COOLDOWN_SECONDS - (nowSec - lastSent);
    const mins = Math.floor(wait / 60);
    const secs = wait % 60;
    const waitLabel = mins > 0
      ? (secs > 0 ? `${mins} মিনিট ${secs} সেকেন্ড` : `${mins} মিনিট`)
      : `${secs} সেকেন্ড`;
    return res.status(429).json({
      success: false,
      code: 'OTP_COOLDOWN',
      retryAfter: wait,
      message: `একবার OTP পাঠানোর পর ৫ মিনিট অপেক্ষা করতে হবে। আরও ${waitLabel} পর আবার চেষ্টা করুন।`
    });
  }

  try {
    const upstream = await fetch(targetEndpoint.sendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ phone: phoneInfo.local11 }),
      signal: AbortSignal.timeout(20000)
    });

    const rawText = await upstream.text();
    let parsed = null;
    try {
      parsed = JSON.parse(rawText);
    } catch (e) {
      return res.status(502).json({
        success: false,
        code: 'CPANEL_INVALID_RESPONSE',
        message: `cPanel থেকে সঠিক JSON উত্তর পাওয়া যায়নি (HTTP ${upstream.status})।`
      });
    }

    if (!upstream.ok || parsed.success === false) {
      const upstreamErr = parsed.error || parsed.message || 'SMS পাঠানো যায়নি।';
      return res.status(upstream.status >= 400 && upstream.status < 600 ? upstream.status : 502).json({
        success: false,
        code: parsed.code || 'SMS_SEND_FAILED',
        retryAfter: parsed.retryAfter,
        message: upstreamErr
      });
    }

    // Check nested sms_response status from cPanel gateways (e.g., sms.net.bd / alpha.net.bd)
    const smsResp = parsed.sms_response;
    if (smsResp && typeof smsResp === 'object') {
      const st = String(smsResp.status || '').toLowerCase();
      if (st === 'error' || st === 'failed' || st === 'fail' || smsResp.success === false || (Number(smsResp.error) > 0)) {
        return res.status(502).json({
          success: false,
          code: 'SMS_SEND_FAILED',
          message: smsResp.message || smsResp.msg || 'SMS গেটওয়ে থেকে মেসেজ পাঠানো যায়নি।'
        });
      }
    }

    // Mode A: Endpoint returned its own signed otpToken (never raw otp)
    if (parsed.otpToken && parsed.otp === undefined) {
      memCooldown.set(phoneInfo.core10, nowSec);
      return res.status(200).json(parsed);
    }

    // Mode B: cPanel endpoint generated raw `otp` (e.g. {"success":true,"otp":7248,"sms_response":{...}})
    // Never leak raw `otp` back to the browser — seal it inside an HMAC-signed otpToken!
    if (parsed.otp !== undefined && parsed.otp !== null) {
      const rawOtp = String(parsed.otp).trim();
      if (!/^\d{4,8}$/.test(rawOtp)) {
        return res.status(502).json({
          success: false,
          code: 'CPANEL_INVALID_RESPONSE',
          message: 'cPanel থেকে সঠিক OTP ফরম্যাট পাওয়া যায়নি।'
        });
      }

      memCooldown.set(phoneInfo.core10, nowSec);
      const jti = crypto.randomBytes(12).toString('hex');
      const exp = nowSec + OTP_EXPIRY_SECONDS;
      const hash = crypto.createHmac('sha256', getOtpSecret()).update(`${phoneInfo.core10}:${rawOtp}`).digest('hex');
      const otpToken = signToken({ jti, phone: phoneInfo.core10, hash, exp });

      return res.status(200).json({
        success: true,
        otpToken,
        otpLength: rawOtp.length,
        expiresIn: OTP_EXPIRY_SECONDS,
        cooldown: OTP_COOLDOWN_SECONDS,
        maskedPhone: phoneInfo.masked,
        message: 'আপনার মোবাইলে OTP কোড পাঠানো হয়েছে।'
      });
    }

    return res.status(502).json({
      success: false,
      code: 'CPANEL_INVALID_RESPONSE',
      message: 'cPanel থেকে OTP বা টোকেন পাওয়া যায়নি।'
    });
  } catch (err) {
    return res.status(502).json({
      success: false,
      code: 'CPANEL_UNREACHABLE',
      message: 'আপনার cPanel OTP সার্ভারের সাথে সংযোগ করা যাচ্ছে না।'
    });
  }
}
