import crypto from 'node:crypto';
import { createClient } from '@supabase/supabase-js';

const MCH_KEY = process.env.WPAY_MCH_KEY || 'd8490b215ef5248d7fb693a101f9898d';

function getSupabaseAdminClient() {
  const supabaseUrl = process.env.SUPABASE_URL || 'https://scbpjqsxntqdzwnqyjmi.supabase.co';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;
  if (!serviceRoleKey) return null;
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}

function verifyWPaySign(params, secretKey) {
  const sortedKeys = Object.keys(params).sort();
  const pairs = [];
  for (const k of sortedKeys) {
    if (k !== 'sign' && params[k] !== undefined && params[k] !== null && String(params[k]).trim() !== '') {
      pairs.push(`${k}=${params[k]}`);
    }
  }
  const stringA = pairs.join('&');
  const stringSignTemp = `${stringA}&key=${secretKey}`;
  const calculated = crypto.createHash('md5').update(stringSignTemp, 'utf8').digest('hex').toLowerCase();
  return calculated === String(params.sign || '').toLowerCase();
}

/**
 * WPay Callback Webhook Handler
 * POST /api/notify
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('fail');
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) {
        // try URLSearchParams
        const parsed = Object.fromEntries(new URLSearchParams(body));
        if (Object.keys(parsed).length > 0) body = parsed;
      }
    }
    body = body || {};

    console.log('[WPay Callback Received]', body);

    const outTradeNo = body.out_trade_no || body.orderId;
    const status = parseInt(body.status, 10);
    const amount = parseFloat(body.money || body.amount || '0');
    const phone = body.attach || body.phone;

    // Verify signature
    const isValidSign = verifyWPaySign(body, MCH_KEY);
    if (!isValidSign) {
      console.warn('[WPay Callback] Invalid signature!');
      return res.status(400).send('fail: sign error');
    }

    if (status === 1) {
      // Payment Successful!
      const supabase = getSupabaseAdminClient();
      if (supabase) {
        // Find phone from transactions if not present in callback attach
        let targetPhone = phone;
        if (!targetPhone && outTradeNo) {
          try {
            const { data: txRecord } = await supabase
              .from('transactions')
              .select('phone, amount')
              .or(`out_trade_no.eq.${outTradeNo},order_id.eq.${outTradeNo}`)
              .maybeSingle();
            if (txRecord && txRecord.phone) {
              targetPhone = txRecord.phone;
            }
          } catch (lookupErr) {
            console.warn('[WPay Callback] Transaction phone lookup warning:', lookupErr.message);
          }
        }

        // Update transaction in Supabase
        await supabase
          .from('transactions')
          .update({
            status: 'অনুমোদিত',
            updated_at: new Date().toISOString()
          })
          .or(`out_trade_no.eq.${outTradeNo},order_id.eq.${outTradeNo}`)
          .catch(() => {});

        // Increment user balance in 'users' table
        if (targetPhone) {
          try {
            const { data: uData } = await supabase
              .from('users')
              .select('id, balance, phone')
              .eq('phone', targetPhone)
              .maybeSingle();

            if (uData) {
              const currentBal = parseFloat(uData.balance || 0);
              await supabase
                .from('users')
                .update({
                  balance: (currentBal + amount),
                  updated_at: new Date().toISOString()
                })
                .eq('id', uData.id);
              console.log(`[WPay Callback] User ${targetPhone} balance updated: ${currentBal} -> ${currentBal + amount}`);
            }
          } catch (userErr) {
            console.warn('[WPay Callback] Users table update warning:', userErr.message);
          }

          // Also update 'profiles' table if it exists
          try {
            const { data: userProfile } = await supabase
              .from('profiles')
              .select('id, balance, lifetime_earnings')
              .eq('phone', targetPhone)
              .maybeSingle();

            if (userProfile) {
              await supabase
                .from('profiles')
                .update({
                  balance: (parseFloat(userProfile.balance || 0) + amount),
                  lifetime_earnings: (parseFloat(userProfile.lifetime_earnings || 0) + amount),
                  updated_at: new Date().toISOString()
                })
                .eq('id', userProfile.id);
            }
          } catch (pErr) {}
        }
      }
      console.log(`[WPay Callback] Order ${outTradeNo} successfully credited ${amount} BDT!`);
      // Crucial: Respond 'success' to notify gateway not to retry
      return res.status(200).send('success');
    }

    return res.status(200).send('success');

  } catch (error) {
    console.error('[WPay Callback Error]', error);
    return res.status(500).send('fail');
  }
}
