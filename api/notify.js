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
        // Find phone & existing status from transactions to guarantee idempotency
        let targetPhone = phone;
        let matchedTxId = null;
        let alreadyApproved = false;
        if (outTradeNo) {
          try {
            const { data: txRecords } = await supabase
              .from('transactions')
              .select('id, phone, amount, status')
              .eq('type', 'deposit')
              .ilike('method', `%${outTradeNo}%`)
              .limit(1);
            if (Array.isArray(txRecords) && txRecords[0]) {
              matchedTxId = txRecords[0].id;
              const existingStatus = String(txRecords[0].status || '').toLowerCase();
              if (existingStatus.includes('অনুমোদিত') || existingStatus.includes('approv') || existingStatus.includes('success') || existingStatus.includes('complete')) {
                alreadyApproved = true;
              }
              if (!targetPhone && txRecords[0].phone) {
                targetPhone = txRecords[0].phone;
              }
            }
          } catch (lookupErr) {
            console.warn('[WPay Callback] Transaction phone lookup warning:', lookupErr.message);
          }
        }

        if (alreadyApproved) {
          console.log(`[WPay Callback] Order ${outTradeNo} already approved; skipping duplicate credit.`);
          return res.status(200).send('success');
        }

        // Update transaction in Supabase
        const txUpdatePayload = {
          status: 'অনুমোদিত',
          ratio: '100%'
        };
        if (amount > 0) {
          txUpdatePayload.actual = amount;
        }
        try {
          if (matchedTxId) {
            await supabase
              .from('transactions')
              .update(txUpdatePayload)
              .eq('id', matchedTxId);
          } else if (outTradeNo) {
            await supabase
              .from('transactions')
              .update(txUpdatePayload)
              .eq('type', 'deposit')
              .ilike('method', `%${outTradeNo}%`);
          }
        } catch (txUpErr) {
          console.warn('[WPay Callback] Transaction update warning:', txUpErr.message);
        }

        // Credit deposit directly into available balance (only package purchases freeze balance)
        if (targetPhone) {
          try {
            const { data: uData } = await supabase
              .from('users')
              .select('id, balance, phone, bkash_optional')
              .eq('phone', targetPhone)
              .maybeSingle();

            if (uData) {
              let opt = {};
              if (uData.bkash_optional) {
                if (typeof uData.bkash_optional === 'string') {
                  try { opt = JSON.parse(uData.bkash_optional); } catch (e) { opt = {}; }
                } else if (typeof uData.bkash_optional === 'object') {
                  opt = Object.assign({}, uData.bkash_optional);
                }
              }
              const prevBal = parseFloat(uData.balance || 0);
              const nextBal = Number((prevBal + amount).toFixed(2));
              const prevRechargeAmt = parseFloat(opt.recharge_amount || 0);
              opt.recharge_amount = Number((prevRechargeAmt + amount).toFixed(2));
              await supabase
                .from('users')
                .update({
                  balance: nextBal,
                  bkash_optional: JSON.stringify(opt),
                  updated_at: new Date().toISOString()
                })
                .eq('id', uData.id);
              console.log(`[WPay Callback] User ${targetPhone} available balance updated: ${prevBal} -> ${nextBal}`);
            }
          } catch (userErr) {
            console.warn('[WPay Callback] Users table update warning:', userErr.message);
          }

          // Also credit available balance in 'profiles' table if it exists
          try {
            const { data: userProfile } = await supabase
              .from('profiles')
              .select('id, balance')
              .eq('phone', targetPhone)
              .maybeSingle();

            if (userProfile) {
              await supabase
                .from('profiles')
                .update({
                  balance: Number((parseFloat(userProfile.balance || 0) + amount).toFixed(2)),
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
