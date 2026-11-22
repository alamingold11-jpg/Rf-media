import https from 'node:https';
import { createClient } from '@supabase/supabase-js';

// The whitelisted cPanel payment server
const CPANEL_PAYMENT_URL = 'https://imcagro.top/api/create-payment';

function getSupabaseAdminClient() {
  const supabaseUrl = process.env.SUPABASE_URL || 'https://scbpjqsxntqdzwnqyjmi.supabase.co';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;
  if (!serviceRoleKey) return null;
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}

/**
 * Vercel Serverless Function Handler
 * POST /api/create-payment
 * Routes through user's whitelisted cPanel server (https://imcagro.top)
 * so WPay never rejects with 'Illegal IP'.
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'শুধুমাত্র POST মেথড গ্রহণযোগ্য।' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) { body = {}; }
    }
    body = body || {};

function normalizeBdPhone(raw) {
  if (!raw) return '';
  let digits = String(raw).replace(/\D/g, '');
  if (digits.startsWith('880') && digits.length >= 13) digits = digits.slice(3);
  if (digits.length === 11 && digits.startsWith('01')) digits = digits.slice(1);
  return digits || String(raw).trim();
}

    const rawAmount = Math.round(parseFloat(body.amount) || 0);
    const payType = String(body.payType || body.pay_type || 'BKASH').toUpperCase().trim();
    const rawPhone = String(body.phone || body.user_phone || 'guest').trim();
    const phone = rawPhone === 'guest' ? 'guest' : (normalizeBdPhone(rawPhone) || rawPhone);
    const orderId = String(body.orderId || body.order_id || ('ORD' + Date.now() + Math.floor(100 + Math.random() * 900))).trim();

    if (rawAmount < 126 || rawAmount > 50000) {
      return res.status(400).json({
        success: false,
        message: 'টাকার পরিমাণ অবশ্যই ১২৬ থেকে ৫০,০০০ এর মধ্যে হতে হবে।'
      });
    }

    // 1. Record pending order in Supabase (avoid duplicate if client already inserted same order_id)
    const supabase = getSupabaseAdminClient();
    if (supabase) {
      try {
        const gwMethod = payType === 'NAGAD' ? 'নগদ (Nagad) [Auto]' : 'বিকাশ (bKash) [Auto]';
        const { data: existingOrder } = await supabase
          .from('transactions')
          .select('id')
          .eq('type', 'deposit')
          .ilike('method', `%${orderId}%`)
          .limit(1)
          .maybeSingle();

        if (!existingOrder) {
          let bdtRate = 126;
          try {
            const { data: sysRow } = await supabase
              .from('users')
              .select('bkash_optional')
              .eq('phone', 'SYSTEM_CONFIG')
              .maybeSingle();
            if (sysRow && sysRow.bkash_optional) {
              const cfg = typeof sysRow.bkash_optional === 'string'
                ? JSON.parse(sysRow.bkash_optional)
                : sysRow.bkash_optional;
              const r = Number(cfg && cfg.usdtRate);
              if (Number.isFinite(r) && r > 0) bdtRate = r;
            }
          } catch (e) {}
          const usdAmount = Number((rawAmount / bdtRate).toFixed(2));
          await supabase.from('transactions').insert({
            phone: phone,
            type: 'deposit',
            amount: usdAmount,
            actual: 0,
            ratio: '0%',
            status: 'মুলতবি (Pending)',
            method: `${gwMethod} · #${orderId}`,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toTimeString().split(' ')[0],
            created_at: new Date().toISOString()
          });
        }
      } catch (dbErr) {
        console.warn('[Create Payment] Supabase log notice:', dbErr.message);
      }
    }

    // 2. Call user's cPanel server (https://imcagro.top/api/create-payment)
    // The cPanel server IP is whitelisted on WPay, avoiding "Illegal IP" errors
    const cpanelPayload = JSON.stringify({
      amount: rawAmount,
      orderId: orderId,
      payType: payType,
      phone: phone,
      attach: phone
    });

    console.log(`[Payment Proxy] Forwarding to cPanel (${CPANEL_PAYMENT_URL}):`, cpanelPayload);

    const cpanelResult = await new Promise((resolve) => {
      const parsedUrl = new URL(CPANEL_PAYMENT_URL);
      const reqOpts = {
        hostname: parsedUrl.hostname,
        port: 443,
        path: parsedUrl.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(cpanelPayload),
          'Accept': 'application/json'
        },
        timeout: 20000
      };

      const reqClient = https.request(reqOpts, (cRes) => {
        let respData = '';
        cRes.on('data', chunk => { respData += chunk; });
        cRes.on('end', () => {
          let parsed = {};
          try {
            parsed = JSON.parse(respData);
          } catch (e) {
            console.warn('[cPanel Response] Non-JSON:', respData);
            parsed = { success: false, raw: respData };
          }
          resolve({ status: cRes.statusCode, data: parsed });
        });
      });

      reqClient.on('timeout', () => {
        reqClient.destroy();
        resolve({ status: 504, data: { success: false, message: 'cPanel পেমেন্ট সার্ভার টাইমআউট হয়েছে।' } });
      });

      reqClient.on('error', (err) => {
        console.error('[cPanel Network Error]:', err.message);
        resolve({ status: 502, data: { success: false, message: 'cPanel সার্ভারে সংযোগ করা সম্ভব হয়নি: ' + err.message } });
      });

      reqClient.write(cpanelPayload);
      reqClient.end();
    });

    console.log('[cPanel Response]', cpanelResult.status, cpanelResult.data);

    // 3. Return cPanel response directly to client
    const responseData = cpanelResult.data || {};
    
    // Normalize payment URL
    const paymentUrl = responseData.paymentUrl || 
                       responseData?.gatewayResponse?.data?.url || 
                       responseData?.data?.url || 
                       responseData?.url;

    if (responseData.success === true && paymentUrl) {
      return res.status(200).json({
        success: true,
        orderId: orderId,
        paymentUrl: paymentUrl,
        transactionId: responseData.transactionId || '',
        gatewayResponse: responseData.gatewayResponse || { code: 0, msg: 'success', data: { url: paymentUrl } }
      });
    }

    // Failure from cPanel/WPay
    const errorMsg = responseData?.gatewayResponse?.msg || 
                     responseData?.message || 
                     responseData?.msg || 
                     'পেমেন্ট চ্যানেল বর্তমানে অনুপলব্ধ।';

    return res.status(cpanelResult.status >= 400 ? cpanelResult.status : 400).json({
      success: false,
      orderId: orderId,
      message: errorMsg,
      gatewayResponse: responseData?.gatewayResponse || { code: 1, msg: errorMsg }
    });

  } catch (error) {
    console.error('[Create Payment] Internal error:', error);
    return res.status(500).json({
      success: false,
      message: 'অভ্যন্তরীণ সার্ভার ত্রুটি: ' + (error.message || 'Error')
    });
  }
}
