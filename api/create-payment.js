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

    const rawAmount = Math.round(parseFloat(body.amount) || 0);
    const payType = String(body.payType || body.pay_type || 'BKASH').toUpperCase().trim();
    const phone = String(body.phone || body.user_phone || 'guest').trim();
    const orderId = String(body.orderId || body.order_id || ('ORD' + Date.now() + Math.floor(100 + Math.random() * 900))).trim();

    if (rawAmount < 300 || rawAmount > 50000) {
      return res.status(400).json({
        success: false,
        message: 'টাকার পরিমাণ অবশ্যই ৩০০ থেকে ৫০,০০০ এর মধ্যে হতে হবে।'
      });
    }

    // 1. Record pending order in Supabase
    const supabase = getSupabaseAdminClient();
    if (supabase) {
      try {
        await supabase.from('transactions').insert({
          phone: phone,
          type: 'deposit',
          amount: rawAmount,
          actual: rawAmount,
          ratio: '0%',
          status: 'মুলতবি (Pending)',
          method: payType === 'NAGAD' ? 'নগদ (Nagad)' : 'বিকাশ (bKash)',
          order_id: orderId,
          out_trade_no: orderId,
          date: new Date().toISOString().split('T')[0],
          time: new Date().toTimeString().split(' ')[0],
          created_at: new Date().toISOString()
        });
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
      phone: phone
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
