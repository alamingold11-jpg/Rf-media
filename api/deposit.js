import { ethers } from 'ethers';
import { createClient } from '@supabase/supabase-js';

// 1. Official BSC BEP20 USDT (Binance-Peg BSC-USD) Contract Address
const BSC_USDT_CONTRACT = '0x55d398326f99059ff775485246999027b3197955'.toLowerCase();

// 2. Company BEP20 Deposit Address
const COMPANY_BEP20_ADDRESS = '0x74826f93f58ae127fb6a77bfefc5841b61bbdb16'.toLowerCase();

// 3. ERC20 Transfer Event Signature: Transfer(address from, address to, uint256 value)
const TRANSFER_EVENT_TOPIC = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

// 4. Required Minimum On-chain Confirmations
const MIN_CONFIRMATIONS = 15;

// 5. Conversion Rate (1 USDT = 125 BDT)
const USDT_TO_BDT_RATE = 125;

// Public high-reliability BSC RPC endpoints
const BSC_RPC_URLS = [
  'https://bsc-dataseed.binance.org/',
  'https://bsc.publicnode.com',
  'https://binance.llamarpc.com',
  'https://bsc-dataseed1.defibit.io/',
  'https://bsc-dataseed1.ninicoin.io/'
];

// Initialize Provider with fallback
async function getBscProvider() {
  for (const url of BSC_RPC_URLS) {
    try {
      const provider = new ethers.JsonRpcProvider(url, undefined, {
        staticNetwork: ethers.Network.from({ name: 'binance', chainId: 56 })
      });
      await provider.getBlockNumber();
      return provider;
    } catch (e) {
      console.warn(`[Deposit API] RPC ${url} unavailable, trying next...`);
    }
  }
  return new ethers.JsonRpcProvider(BSC_RPC_URLS[0]);
}

// Server-side Supabase Admin Client using SUPABASE_SERVICE_ROLE_KEY
function getSupabaseAdminClient() {
  const supabaseUrl = process.env.SUPABASE_URL || 'https://scbpjqsxntqdzwnqyjmi.supabase.co';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    console.error('[Deposit API] CRITICAL: SUPABASE_SERVICE_ROLE_KEY is not defined in server environment!');
    return null;
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}

/**
 * Vercel Serverless Function Handler
 * POST /api/deposit
 */
export default async function handler(req, res) {
  // CORS Configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'শুধুমাত্র POST মেথড গ্রহণযোগ্য।' });
  }

  try {
    // ------------------------------------------------------------------------
    // Rule 3: userId ফ্রন্টএন্ড থেকে নেবে না।
    // Authorization: Bearer <access_token> থেকে supabase.auth.getUser(token) দিয়ে সার্ভারে বের করবে।
    // ------------------------------------------------------------------------
    const authHeader = req.headers['authorization'] || req.headers['Authorization'] || '';
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'অননুমোদিত অনুরোধ! Authorization Bearer টোকেন পাওয়া যায়নি।'
      });
    }

    const accessToken = authHeader.replace(/^Bearer\s+/i, '').trim();
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: 'অবৈধ Authorization টোকেন।'
      });
    }

    const supabaseAdmin = getSupabaseAdminClient();
    if (!supabaseAdmin) {
      return res.status(500).json({
        success: false,
        message: 'সার্ভার কনফিগারেশন ত্রুটি: SUPABASE_SERVICE_ROLE_KEY পাওয়া যায়নি।'
      });
    }

    const { data: authData, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
    if (authError || !authData || !authData.user) {
      return res.status(401).json({
        success: false,
        message: 'ব্যবহারকারীর সেশন মেয়াদোত্তীর্ণ বা অবৈধ। পুনরায় লগইন করে চেষ্টা করুন।'
      });
    }

    const verifiedUserId = authData.user.id;

    // ------------------------------------------------------------------------
    // Parse & Validate Request Body
    // NOTE: Form "amount" is completely ignored on server (Rule 1).
    // ------------------------------------------------------------------------
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) { body = {}; }
    }
    body = body || {};

    const rawTxHash = body.txHash || body.txid;
    const rawSender = body.senderAddress || body.sender;

    if (!rawTxHash) {
      return res.status(400).json({
        success: false,
        message: 'অনুগ্রহ করে Transaction Hash (TxHash / TxID) প্রদান করুন।'
      });
    }

    const cleanTxHash = String(rawTxHash).trim().toLowerCase();
    if (!/^0x[a-f0-9]{64}$/.test(cleanTxHash)) {
      return res.status(400).json({
        success: false,
        message: 'ভুল TxHash ফরম্যাট! ট্রানজেকশন হ্যাশ অবশ্যই 0x দিয়ে শুরু হওয়া ৬৬ অক্ষরের হেক্সাডেসিমাল কোড হতে হবে।'
      });
    }

    if (!rawSender) {
      return res.status(400).json({
        success: false,
        message: 'অনুগ্রহ করে আপনার প্রেরক ওয়ালেট অ্যাড্রেস (Sender Address) প্রদান করুন।'
      });
    }

    const cleanSender = String(rawSender).trim().toLowerCase();
    if (!ethers.isAddress(cleanSender)) {
      return res.status(400).json({
        success: false,
        message: 'ভুল প্রেরক ওয়ালেট অ্যাড্রেস (Sender Address) ফরম্যাট।'
      });
    }

    // ------------------------------------------------------------------------
    // Rule 6: Transaction receipt status = 1 এবং কমপক্ষে ১৫ কনফার্মেশন
    // ------------------------------------------------------------------------
    const provider = await getBscProvider();
    let receipt = null;
    let latestBlock = 0;

    try {
      [receipt, latestBlock] = await Promise.all([
        provider.getTransactionReceipt(cleanTxHash),
        provider.getBlockNumber()
      ]);
    } catch (rpcErr) {
      console.error('[Deposit API] BSC RPC fetch error:', rpcErr);
      return res.status(502).json({
        success: false,
        message: 'ব্লকচেইন নোডের সাথে সংযোগ করা যায়নি। অনুগ্রহ করে কয়েক সেকেন্ড পর আবার চেষ্টা করুন।'
      });
    }

    if (!receipt) {
      return res.status(404).json({
        success: false,
        message: 'ট্রানজেকশনটি এখনো ব্লকচেইনে মাইন বা অন্তর্ভুক্ত হয়নি। অনুগ্রহ করে ১-২ মিনিট অপেক্ষা করে পুনরায় চেষ্টা করুন।'
      });
    }

    if (receipt.status !== 1) {
      return res.status(400).json({
        success: false,
        message: 'এই ট্রানজেকশনটি ব্লকচেইনে বাতিল (Failed / Reverted) হয়েছে।'
      });
    }

    const confirmations = latestBlock - receipt.blockNumber;
    if (confirmations < MIN_CONFIRMATIONS) {
      return res.status(400).json({
        success: false,
        message: `ট্রানজেকশনটি এখনো পর্যাপ্ত কনফার্মেশন পায়নি (বর্তমান কনফার্মেশন: ${Math.max(0, confirmations)}/${MIN_CONFIRMATIONS})। ব্লকচেইন সুরক্ষার জন্য কমপক্ষে ১৫ কনফার্মেশন প্রয়োজন। অনুগ্রহ করে আরও কিছুক্ষণ অপেক্ষা করুন।`,
        confirmations: Math.max(0, confirmations),
        requiredConfirmations: MIN_CONFIRMATIONS
      });
    }

    // ------------------------------------------------------------------------
    // Rule 1 & Rule 2:
    // - ব্লকচেইন লগের from অবশ্যই ইউজারের দেওয়া Sender Address এর সাথে মিলতে হবে, আর to কোম্পানি অ্যাড্রেসের সাথে।
    // - ব্যালেন্সে যোগ হবে শুধু ব্লকচেইনের Transfer ইভেন্টের value (÷10^18)।
    // ------------------------------------------------------------------------
    const iface = new ethers.Interface([
      'event Transfer(address indexed from, address indexed to, uint256 value)'
    ]);

    let matchedTransfer = null;

    for (const log of receipt.logs) {
      // Must be the official BSC USDT contract
      if (log.address.toLowerCase() !== BSC_USDT_CONTRACT) {
        continue;
      }

      // Must be Transfer event
      if (!log.topics || log.topics[0] !== TRANSFER_EVENT_TOPIC) {
        continue;
      }

      try {
        const parsed = iface.parseLog({ topics: log.topics, data: log.data });
        if (!parsed || !parsed.args) continue;

        const logFrom = parsed.args[0].toLowerCase();
        const logTo = parsed.args[1].toLowerCase();
        const logRawValue = parsed.args[2]; // uint256 (BigInt)

        // Strict address matching:
        // from === cleanSender AND to === COMPANY_BEP20_ADDRESS
        if (logFrom === cleanSender && logTo === COMPANY_BEP20_ADDRESS) {
          // Rule 1: strictly value / 10^18
          const actualUsdt = parseFloat(ethers.formatUnits(logRawValue, 18));
          if (actualUsdt > 0) {
            matchedTransfer = {
              logIndex: Number(log.index ?? log.logIndex ?? 0),
              from: logFrom,
              to: logTo,
              usdtAmount: actualUsdt,
              blockNumber: receipt.blockNumber
            };
            break;
          }
        }
      } catch (parseError) {
        // Skip unparseable log
      }
    }

    if (!matchedTransfer) {
      return res.status(400).json({
        success: false,
        message: `ব্লকচেইন রেকর্ডে আপনার প্রেরক অ্যাড্রেস (${cleanSender}) থেকে কোম্পানির ডিপোজিট ওয়ালেটে (${COMPANY_BEP20_ADDRESS}) কোনো অনুমোদিত USDT (BEP20) Transfer ইভেন্ট পাওয়া যায়নি।`
      });
    }

    const verifiedUsdt = matchedTransfer.usdtAmount;
    const verifiedBdt = Math.round(verifiedUsdt * USDT_TO_BDT_RATE);

    // ------------------------------------------------------------------------
    // Rule 4 & 5:
    // Supabase এ deposits টেবিলে UNIQUE (tx_hash, log_index) থাকবে।
    // ডিপোজিট রেকর্ড আর profiles.balance যোগ একটাই ডাটাবেস ফাংশনে (atomic) হবে,
    // যেটা শুধু service_role কল করতে পারবে।
    // ------------------------------------------------------------------------
    const { data: rpcResult, error: rpcError } = await supabaseAdmin.rpc('credit_usdt_deposit', {
      p_user_id: verifiedUserId,
      p_tx_hash: cleanTxHash,
      p_log_index: matchedTransfer.logIndex,
      p_sender_address: cleanSender,
      p_amount_usdt: verifiedUsdt,
      p_amount_bdt: verifiedBdt,
      p_rate: USDT_TO_BDT_RATE,
      p_block_number: matchedTransfer.blockNumber
    });

    if (rpcError) {
      console.error('[Deposit API] credit_usdt_deposit RPC error:', rpcError);
      // Handle unique constraint duplicate error gracefully
      if (rpcError.message && (rpcError.message.includes('unique') || rpcError.code === '23505')) {
        return res.status(400).json({
          success: false,
          message: 'এই ট্রানজেকশনটি (TxHash ও log_index) ইতিপূর্বে সিস্টেমে অনুমোদিত হয়ে গেছে!'
        });
      }
      return res.status(400).json({
        success: false,
        message: rpcError.message || 'ডাটাবেসে ডিপোজিট প্রসেস করার সময় ত্রুটি ঘটেছে।'
      });
    }

    return res.status(200).json({
      success: true,
      message: `অভিনন্দন! আপনার ${verifiedUsdt} USDT (৳ ${verifiedBdt.toLocaleString('en-US')}) ডিপোজিট সফলভাবে ব্লকচেইনে ভেরিফাই ও ব্যালেন্সে যুক্ত হয়েছে!`,
      deposit: {
        txHash: cleanTxHash,
        logIndex: matchedTransfer.logIndex,
        senderAddress: cleanSender,
        companyAddress: COMPANY_BEP20_ADDRESS,
        usdtAmount: verifiedUsdt,
        bdtAmount: verifiedBdt,
        rate: USDT_TO_BDT_RATE,
        confirmations: confirmations,
        newBalance: rpcResult?.new_balance,
        approvedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('[Deposit API] Unhandled server error:', error);
    return res.status(500).json({
      success: false,
      message: 'অভ্যন্তরীণ সার্ভার ত্রুটি: ' + (error.message || 'Unknown error')
    });
  }
}
