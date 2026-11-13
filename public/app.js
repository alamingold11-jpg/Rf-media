function getRealisticTaskUrl(platform, index) {
  const p = (platform || 'TikTok').toLowerCase();
  const idx = typeof index === 'number' ? index : 0;
  if (p.includes('tiktok')) {
    const urls = [
      'https://vt.tiktok.com/ZSb666bLY/',
      'https://www.tiktok.com/@tiktok/video/7391823901234',
      'https://www.tiktok.com/@creative_hub/video/7281902837465',
      'https://vt.tiktok.com/ZSj891LmP/',
      'https://www.tiktok.com/@bangla_short/video/7391827364510'
    ];
    return urls[idx % urls.length];
  } else if (p.includes('youtube')) {
    const urls = [
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
      'https://youtu.be/kJQP7kiw5Fk',
      'https://www.youtube.com/watch?v=9bZkp7q19f0',
      'https://www.youtube.com/watch?v=fJ9rUzIMcZQ'
    ];
    return urls[idx % urls.length];
  } else {
    const urls = [
      'https://www.facebook.com/watch/?v=10158319283726192',
      'https://www.facebook.com/reel/782910394829102',
      'https://www.facebook.com/watch/?v=9812739481920',
      'https://www.facebook.com/reel/19283746501928'
    ];
    return urls[idx % urls.length];
  }
}


function getPlatformSvg(platform, sizeClass) {
  const cls = sizeClass || 'h-6 w-6';
  if (platform === 'YouTube') {
    return `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" fill="#FF0000"/>
      <polygon points="9.6,15.5 15.8,12 9.6,8.5" fill="#FFFFFF"/>
    </svg>`;
  }
  if (platform === 'FaceBook') {
    return `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#1877F2"/>
      <path fill="#FFFFFF" d="M15.12 12.35l.5-3.25h-3.12v-2.1c0-.9.25-1.52 1.55-1.52h1.66V2.57C15.42 2.53 14.43 2.45 13.3 2.45c-2.36 0-3.97 1.44-3.97 4.08v2.57H6.5v3.25h2.83V21.5a12.06 12.06 0 003.97 0V12.35h1.82z"/>
    </svg>`;
  }
  // Default: TikTok authentic multi-color SVG
  return `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true" fill="none">
    <path fill="#FE2C55" d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.89 2.89 2.896 2.896 0 0 1-2.89-2.89 2.896 2.896 0 0 1 2.89-2.89c.304 0 .595.046.868.13V9.404a6.336 6.336 0 0 0-.868-.06A6.335 6.335 0 0 0 3 15.672a6.335 6.335 0 0 0 6.342 6.328 6.335 6.335 0 0 0 6.342-6.328V9.818a8.205 8.205 0 0 0 4.816 1.542V7.908a4.846 4.846 0 0 1-.911-.222Z"/>
    <path fill="#25F4EE" d="M18.889 5.986a4.793 4.793 0 0 1-3.77-4.245V1.3h-3.445v13.672a2.896 2.896 0 0 1-2.89 2.89 2.896 2.896 0 0 1-2.89-2.89 2.896 2.896 0 0 1 2.89-2.89c.304 0 .595.046.868.13V8.704a6.336 6.336 0 0 0-.868-.06A6.335 6.335 0 0 0 2.3 14.972a6.335 6.335 0 0 0 6.342 6.328 6.335 6.335 0 0 0 6.342-6.328V9.118a8.205 8.205 0 0 0 4.816 1.542V7.208a4.846 4.846 0 0 1-.911-.222Z"/>
    <path fill="#FFFFFF" d="M19.239 6.336a4.793 4.793 0 0 1-3.77-4.245V1.65h-3.445v13.672a2.896 2.896 0 0 1-2.89 2.89 2.896 2.896 0 0 1-2.89-2.89 2.896 2.896 0 0 1 2.89-2.89c.304 0 .595.046.868.13V9.054a6.336 6.336 0 0 0-.868-.06A6.335 6.335 0 0 0 2.65 15.322a6.335 6.335 0 0 0 6.342 6.328 6.335 6.335 0 0 0 6.342-6.328V9.468a8.205 8.205 0 0 0 4.816 1.542V7.558a4.846 4.846 0 0 1-.911-.222Z"/>
  </svg>`;
}

// ==========================================
// SUPABASE & CLOUD DATABASE INTEGRATION (USER, TEAM, TRANSACTIONS)
// ==========================================
function mapSupabaseUser(d) {
  if (!d) return null;
  let opt = {};
  if (d.bkash_optional) {
    try { opt = JSON.parse(d.bkash_optional); } catch(e) {}
  }
  const nName = d.nagad_name || opt.nagad_name || '';
  const nPhone = d.nagad_phone || opt.nagad_phone || '';
  const uName = d.usdt_name || opt.usdt_name || '';
  const uAddr = d.usdt_address || opt.usdt_address || '';

  return {
    phone: d.phone || d.account_number || d.accountNumber,
    accountNumber: d.account_number || d.accountNumber || d.phone,
    name: opt.real_name || d.name || 'সদস্য',
    realName: opt.real_name || d.name || '',
    fundPassword: opt.fund_password || '',
    passwordHash: d.password_hash || d.passwordHash || '',
    plainPassword: d.plain_password || d.plainPassword || '',
    memberId: d.member_id || d.memberId || ('AL' + Date.now().toString().slice(-8)),
    inviteCode: d.invite_code || d.inviteCode || '',
    superiorId: d.superior_id || d.superiorId || '11',
    packageLevel: d.package_level || d.packageLevel || 'LV0',
    balance: typeof d.balance === 'number' ? d.balance : parseFloat(d.balance || 0) || 0,
    bkashName: d.bkash_name || d.bkashName || '',
    bkashPhone: d.bkash_phone || d.bkashPhone || '',
    bkash: {
      fullName: d.bkash_name || d.bkashName || '',
      phone: d.bkash_phone || d.bkashPhone || ''
    },
    nagadName: nName,
    nagadPhone: nPhone,
    nagad: {
      fullName: nName,
      phone: nPhone
    },
    usdtName: uName,
    usdtAddress: uAddr,
    usdt: {
      fullName: uName,
      address: uAddr,
      network: 'BEP20'
    },
    accountStatus: opt.account_status || 'active',
    createdAt: d.created_at || d.createdAt || new Date().toISOString()
  };
}

// ==========================================
// LIVE PLATFORM CONTROLS (SYNCED FROM CPANEL ADMIN PANEL)
// ==========================================
window.aloPlatformConfig = {
  telegramUrl: 'https://t.me/PW_Official_Manager_BD',
  managerId: '#PW-MANAGER-8802',
  usdtAddress: '0x74826F93F58Ae127FB6a77bFEFC5841B61bBDb16',
  usdtRate: 125,
  minWithdraw: 700,
  withdrawNetPercent: 50,
  minRecharge: 300,
  withdrawEnabled: true,
  siteNotice: ''
};

function applyPlatformConfigData(rawOpt) {
  if (!rawOpt) return;
  let parsed = rawOpt;
  if (typeof rawOpt === 'string') {
    try { parsed = JSON.parse(rawOpt); } catch (e) { return; }
  }
  if (!parsed || typeof parsed !== 'object') return;
  if (parsed.telegramUrl) window.aloPlatformConfig.telegramUrl = String(parsed.telegramUrl).trim();
  if (parsed.managerId) window.aloPlatformConfig.managerId = String(parsed.managerId).trim();
  if (parsed.usdtAddress) window.aloPlatformConfig.usdtAddress = String(parsed.usdtAddress).trim();
  if (Number(parsed.usdtRate) > 0) window.aloPlatformConfig.usdtRate = Number(parsed.usdtRate);
  if (Number(parsed.minWithdraw) > 0) window.aloPlatformConfig.minWithdraw = Number(parsed.minWithdraw);
  if (Number(parsed.withdrawNetPercent) > 0) window.aloPlatformConfig.withdrawNetPercent = Number(parsed.withdrawNetPercent);
  if (Number(parsed.minRecharge) > 0) window.aloPlatformConfig.minRecharge = Number(parsed.minRecharge);
  if (typeof parsed.withdrawEnabled === 'boolean') window.aloPlatformConfig.withdrawEnabled = parsed.withdrawEnabled;
  if (typeof parsed.siteNotice === 'string') window.aloPlatformConfig.siteNotice = parsed.siteNotice;
}

async function loadPlatformConfigFromSupabase() {
  if (!window.aloSupabase) return;
  try {
    const { data, error } = await window.aloSupabase
      .from('users')
      .select('bkash_optional')
      .eq('phone', 'SYSTEM_CONFIG')
      .maybeSingle();
    if (!error && data && data.bkash_optional) {
      applyPlatformConfigData(data.bkash_optional);
    }
  } catch (e) {}
}

function mapSupabaseTeam(d) {
  if (!d) return null;
  return {
    superiorPhone: d.superior_phone || d.superiorPhone || '',
    memberPhone: d.member_phone || d.memberPhone || '',
    memberId: d.member_id || d.memberId || '',
    tier: Number(d.tier) || 1,
    level: d.level || 'LV0',
    status: d.status || 'সক্রিয়',
    balance: typeof d.balance === 'number' ? d.balance : parseFloat(d.balance || 0) || 0,
    rechargeAmount: typeof d.recharge_amount === 'number' ? d.recharge_amount : parseFloat(d.recharge_amount || d.rechargeAmount || 0) || 0,
    cashoutAmount: typeof d.cashout_amount === 'number' ? d.cashout_amount : parseFloat(d.cashout_amount || d.cashoutAmount || 0) || 0,
    joinedAt: d.joined_at || d.joinedAt || new Date().toISOString()
  };
}

function mapSupabaseTx(d) {
  return {
    phone: d.phone,
    type: d.type,
    amount: typeof d.amount === 'number' ? d.amount : parseFloat(d.amount || 0) || 0,
    ratio: d.ratio || '50.0%',
    actual: typeof d.actual === 'number' ? d.actual : parseFloat(d.actual || d.amount || 0) || 0,
    status: d.status || 'স্থানান্তরিত',
    method: d.method || 'বিকাশ (bKash)',
    date: d.date,
    time: d.time,
    createdAt: d.created_at || d.createdAt
  };
}

// 0. Supabase Live Realtime Sync
let supabaseLiveChannel = null;

function initSupabaseLiveSync(user) {
  if (!user && typeof getCurrentUser === 'function') user = getCurrentUser();
  if (!user || !window.aloSupabase) return;
  const normPhone = normalizeBdPhone(user.phone || user.accountNumber);
  if (!normPhone) return;

  try {
    if (supabaseLiveChannel) {
      try { window.aloSupabase.removeChannel(supabaseLiveChannel); } catch (e) {}
      supabaseLiveChannel = null;
    }

    supabaseLiveChannel = window.aloSupabase
      .channel('user-live-sync-' + normPhone)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'users',
          filter: `phone=eq.${normPhone}`
        },
        function(payload) {
          if (!payload || !payload.new) return;
          console.log('⚡ Supabase Live Realtime update received:', payload.new);
          const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
          if (!currentUser) return;

          const updated = Object.assign({}, currentUser);
          if (payload.new.balance !== undefined && payload.new.balance !== null) {
            updated.balance = Number(payload.new.balance);
          }
          if (payload.new.package_level) {
            updated.packageLevel = payload.new.package_level;
          }
          if (payload.new.total_income !== undefined && payload.new.total_income !== null) {
            updated.totalIncome = Number(payload.new.total_income);
          }
          if (payload.new.today_income !== undefined && payload.new.today_income !== null) {
            updated.todayIncome = Number(payload.new.today_income);
          }
          let liveMeta = {};
          if (payload.new.bkash_optional) {
            try { liveMeta = JSON.parse(payload.new.bkash_optional); } catch (e) {}
          }
          if (liveMeta.account_status === 'banned') {
            localStorage.removeItem('aloSignedInUser');
            if (typeof showToastNotification === 'function') {
              showToastNotification('⛔ আপনার অ্যাকাউন্টটি অ্যাডমিন কর্তৃক স্থগিত (Suspended) করা হয়েছে।');
            }
            if (typeof showView === 'function') showView('login');
            return;
          }

          if (payload.new.bkash_name !== undefined) updated.bkashName = payload.new.bkash_name;
          if (payload.new.bkash_phone !== undefined) updated.bkashPhone = payload.new.bkash_phone;
          if (payload.new.nagad_name !== undefined) updated.nagadName = payload.new.nagad_name;
          if (payload.new.nagad_phone !== undefined) updated.nagadPhone = payload.new.nagad_phone;
          if (payload.new.usdt_name !== undefined) updated.usdtName = payload.new.usdt_name;
          if (payload.new.usdt_address !== undefined) updated.usdtAddress = payload.new.usdt_address;

          localStorage.setItem('aloSignedInUser', JSON.stringify(updated));
          if (typeof updateUserDetails === 'function') updateUserDetails(updated);
          if (typeof updateProfileMetrics === 'function') updateProfileMetrics();
          if (typeof updateVipHallRooms === 'function') updateVipHallRooms();
          if (typeof updateRecordsPanelPackages === 'function') updateRecordsPanelPackages();
        }
      )
      .subscribe();

    window.aloSupabase
      .channel('platform-config-sync')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'users', filter: 'phone=eq.SYSTEM_CONFIG' },
        function(payload) {
          if (payload && payload.new && payload.new.bkash_optional) {
            applyPlatformConfigData(payload.new.bkash_optional);
          }
        }
      )
      .subscribe();
    console.log('⚡ Subscribed to Supabase Live Realtime channel for:', normPhone);
  } catch (err) {
    console.warn('Supabase Live Channel Subscription warning:', err);
  }
}
window.initSupabaseLiveSync = initSupabaseLiveSync;

window.addEventListener('alo-supabase-ready', function() {
  loadPlatformConfigFromSupabase();
  if (typeof getCurrentUser === 'function') {
    const user = getCurrentUser();
    if (user) initSupabaseLiveSync(user);
  }
});

// 1. User DB helpers
async function dbGetUser(normPhone) {
  // Try Supabase first
  if (window.aloSupabase) {
    try {
      const { data, error } = await window.aloSupabase
        .from('users')
        .select('*')
        .eq('phone', normPhone)
        .maybeSingle();
      if (!error && data) {
        return mapSupabaseUser(data);
      }
    } catch (err) {
      console.warn('Supabase dbGetUser error:', err);
    }
  }

  // Fallback to Firebase
  if (window.aloFirebase && window.aloFirebase.db) {
    try {
      const { db, doc, getDoc } = window.aloFirebase;
      const snap = await getDoc(doc(db, 'users', normPhone));
      if (snap && snap.exists()) {
        return snap.data();
      }
    } catch (err) {
      console.warn('Firebase dbGetUser error:', err);
    }
  }

  // Check localStorage accounts
  try {
    const accounts = JSON.parse(localStorage.getItem('aloAccounts') || '[]');
    const local = accounts.find(function(a) {
      return normalizeBdPhone(a.phone || a.accountNumber || '') === normPhone;
    });
    if (local) return local;
  } catch(e) {}

  return null;
}

async function dbSaveUser(account) {
  const normPhone = normalizeBdPhone(account.phone || account.accountNumber);
  let saved = false;

  // Save to Supabase
  if (window.aloSupabase) {
    try {
      // Supabase users table schema: id, phone, account_number, name, password_hash, plain_password, member_id, invite_code, superior_id, package_level, balance, bkash_name, bkash_phone, bkash_optional, created_at, updated_at
      let extraMeta = {};
      try {
        extraMeta = {
          nagad_name: (account.nagad && account.nagad.fullName) || account.nagadName || '',
          nagad_phone: (account.nagad && account.nagad.phone) || account.nagadPhone || '',
          usdt_name: (account.usdt && account.usdt.fullName) || account.usdtName || '',
          usdt_address: (account.usdt && account.usdt.address) || account.usdtAddress || '',
          real_name: account.realName || account.name || '',
          fund_password: account.fundPassword || ''
        };
      } catch(e) {}

      const payload = {
        phone: normPhone,
        account_number: account.accountNumber || account.phone,
        name: account.name || 'সদস্য',
        password_hash: account.passwordHash || '',
        plain_password: account.plainPassword || '',
        member_id: account.memberId || ('AL' + Date.now().toString().slice(-8)),
        invite_code: account.inviteCode || '',
        superior_id: account.superiorId || '11',
        package_level: account.packageLevel || 'LV0',
        balance: typeof account.balance === 'number' ? account.balance : 0.00,
        bkash_name: (account.bkash && account.bkash.fullName) || account.bkashName || '',
        bkash_phone: (account.bkash && account.bkash.phone) || account.bkashPhone || '',
        bkash_optional: JSON.stringify(extraMeta),
        updated_at: new Date().toISOString()
      };
      if (account.createdAt) payload.created_at = account.createdAt;
      else payload.created_at = new Date().toISOString();

      const { error } = await window.aloSupabase
        .from('users')
        .upsert(payload, { onConflict: 'phone' });
      if (!error) saved = true;
      else console.warn('Supabase dbSaveUser warning:', error);

      // Attempt background auth sync so it also registers in Authentication tab
      if (window.aloSupabase.auth && normPhone) {
        try {
          window.aloSupabase.auth.signUp({
            email: `user_${normPhone}@gmail.com`,
            password: account.plainPassword || 'Password123!',
            options: {
              data: {
                phone: normPhone,
                name: account.name || 'সদস্য',
                member_id: payload.member_id
              }
            }
          }).catch(function() {});
        } catch(e) {}
      }
    } catch (err) {
      console.warn('Supabase dbSaveUser error:', err);
    }
  }

  // Also sync to Firebase
  if (window.aloFirebase && window.aloFirebase.db) {
    try {
      const { db, doc, setDoc } = window.aloFirebase;
      const payload = {
        phone: account.phone || account.accountNumber,
        accountNumber: account.accountNumber || account.phone,
        name: account.name || 'সদস্য',
        passwordHash: account.passwordHash || '',
        plainPassword: account.plainPassword || '',
        memberId: account.memberId || ('AL' + Date.now().toString().slice(-8)),
        inviteCode: account.inviteCode || '',
        superiorId: account.superiorId || '11',
        packageLevel: account.packageLevel || 'LV0',
        balance: typeof account.balance === 'number' ? account.balance : 0.00,
        bkashName: (account.bkash && account.bkash.fullName) || account.bkashName || '',
        bkashPhone: (account.bkash && account.bkash.phone) || account.bkashPhone || '',
        nagadName: (account.nagad && account.nagad.fullName) || account.nagadName || '',
        nagadPhone: (account.nagad && account.nagad.phone) || account.nagadPhone || '',
        usdtName: (account.usdt && account.usdt.fullName) || account.usdtName || '',
        usdtAddress: (account.usdt && account.usdt.address) || account.usdtAddress || '',
        updatedAt: new Date().toISOString()
      };
      if (account.createdAt) payload.createdAt = account.createdAt;
      else payload.createdAt = new Date().toISOString();

      await setDoc(doc(db, 'users', normPhone), payload, { merge: true });
      saved = true;
    } catch (err) {
      console.warn('Firebase dbSaveUser error:', err);
    }
  }

  // Also update in localStorage aloAccounts
  try {
    const accounts = JSON.parse(localStorage.getItem('aloAccounts') || '[]');
    const idx = accounts.findIndex(function(a) {
      return normalizeBdPhone(a.phone || a.accountNumber || '') === normPhone;
    });
    if (idx >= 0) {
      accounts[idx] = Object.assign({}, accounts[idx], account);
    } else {
      accounts.push(account);
    }
    localStorage.setItem('aloAccounts', JSON.stringify(accounts));
  } catch(e) {}

  return saved;
}

// 2. Multi-tier Team Referral DB helpers (Level 1, Level 2, Level 3)
async function dbFindInviter(codeOrPhone) {
  if (!codeOrPhone) return null;
  const raw = String(codeOrPhone).trim();
  const norm = normalizeBdPhone(raw);

  // Check localStorage accounts first
  try {
    const accounts = JSON.parse(localStorage.getItem('aloAccounts') || '[]');
    const local = accounts.find(function(a) {
      return (
        (a.inviteCode && a.inviteCode.toUpperCase() === raw.toUpperCase()) ||
        (a.phone && normalizeBdPhone(a.phone) === norm) ||
        (a.accountNumber && normalizeBdPhone(a.accountNumber) === norm) ||
        (a.memberId && a.memberId === raw)
      );
    });
    if (local) return local;
  } catch(e) {}

  // Check Supabase
  if (window.aloSupabase) {
    try {
      // By invite_code (case-insensitive)
      let { data } = await window.aloSupabase
        .from('users')
        .select('*')
        .ilike('invite_code', raw)
        .maybeSingle();
      if (data) return mapSupabaseUser(data);

      // By phone
      if (norm) {
        let { data: pData } = await window.aloSupabase
          .from('users')
          .select('*')
          .eq('phone', norm)
          .maybeSingle();
        if (pData) return mapSupabaseUser(pData);
      }

      // By member_id
      let { data: mData } = await window.aloSupabase
        .from('users')
        .select('*')
        .eq('member_id', raw)
        .maybeSingle();
      if (mData) return mapSupabaseUser(mData);
    } catch(err) {
      console.warn('Supabase dbFindInviter warning:', err);
    }
  }

  // Check Firebase
  if (window.aloFirebase && window.aloFirebase.db) {
    try {
      const { db, collection, query, where, getDocs, doc, getDoc } = window.aloFirebase;
      const q = query(collection(db, 'users'), where('inviteCode', '==', raw));
      const snap = await getDocs(q);
      if (snap && !snap.empty) {
        return snap.docs[0].data();
      }
      if (norm) {
        const docSnap = await getDoc(doc(db, 'users', norm));
        if (docSnap && docSnap.exists()) return docSnap.data();
      }
    } catch(err) {
      console.warn('Firebase dbFindInviter warning:', err);
    }
  }

  // If looks like phone number, create lightweight inviter object
  if (norm && norm.length >= 10) {
    return {
      phone: norm,
      accountNumber: norm,
      memberId: 'AL' + norm.slice(-6),
      inviteCode: raw,
      superiorPhone: '',
      superiorId: ''
    };
  }

  return null;
}

async function dbAddTeamMember(superiorPhone, memberPhone, memberId, level, tier, balance, rechargeAmount) {
  const supNorm = normalizeBdPhone(superiorPhone);
  const memNorm = normalizeBdPhone(memberPhone);
  const t = Number(tier) || 1;
  const bal = Number(balance) || 0;
  const rech = Number(rechargeAmount) || 0;

  if (!supNorm || !memNorm || supNorm === memNorm) return false;
  let saved = false;

  // Supabase
  if (window.aloSupabase) {
    try {
      // Supabase team table schema: id, superior_phone, member_phone, member_id, tier, level, status, joined_at
      const payload = {
        superior_phone: supNorm,
        member_phone: memNorm,
        member_id: memberId || ('AL' + Date.now().toString().slice(-8)),
        tier: t,
        level: level || 'LV0',
        status: 'সক্রিয়',
        joined_at: new Date().toISOString()
      };
      const { error } = await window.aloSupabase.from('team').insert(payload);
      if (!error) saved = true;
      else console.warn('Supabase dbAddTeamMember warning:', error);
    } catch (err) {
      console.warn('Supabase dbAddTeamMember error:', err);
    }
  }

  // Firebase
  if (window.aloFirebase && window.aloFirebase.db) {
    const docId = `team_${supNorm}_${memNorm}_t${t}`;
    try {
      const { db, doc, setDoc } = window.aloFirebase;
      await setDoc(doc(db, 'team', docId), {
        superiorPhone: supNorm,
        memberPhone: memNorm,
        memberId: memberId || ('AL' + Date.now().toString().slice(-8)),
        tier: t,
        level: level || 'LV0',
        status: 'সক্রিয়',
        balance: bal,
        rechargeAmount: rech,
        joinedAt: new Date().toISOString()
      }, { merge: true });
      saved = true;
    } catch (err) {
      console.warn('Firebase dbAddTeamMember error:', err);
    }
  }

  // Local Storage aloTeamRecords
  try {
    const local = JSON.parse(localStorage.getItem('aloTeamRecords') || '[]');
    const exists = local.some(function(item) {
      return item.superiorPhone === supNorm && item.memberPhone === memNorm && item.tier === t;
    });
    if (!exists) {
      local.push({
        superiorPhone: supNorm,
        memberPhone: memNorm,
        memberId: memberId || ('AL' + Date.now().toString().slice(-8)),
        tier: t,
        level: level || 'LV0',
        status: 'সক্রিয়',
        balance: bal,
        rechargeAmount: rech,
        joinedAt: new Date().toISOString()
      });
      localStorage.setItem('aloTeamRecords', JSON.stringify(local));
    }
  } catch(e) {}

  return saved;
}

async function dbFindDirectSuperiorPhone(memberPhone) {
  const norm = normalizeBdPhone(memberPhone);
  if (!norm) return null;

  // 1. Check Supabase team table
  if (window.aloSupabase) {
    try {
      const { data } = await window.aloSupabase
        .from('team')
        .select('superior_phone')
        .eq('member_phone', norm)
        .eq('tier', 1)
        .maybeSingle();
      if (data && data.superior_phone) {
        return normalizeBdPhone(data.superior_phone);
      }
    } catch (e) {}
  }

  // 2. Check local team records
  try {
    const local = JSON.parse(localStorage.getItem('aloTeamRecords') || '[]');
    const rec = local.find(item => normalizeBdPhone(item.memberPhone) === norm && Number(item.tier) === 1);
    if (rec && rec.superiorPhone) {
      return normalizeBdPhone(rec.superiorPhone);
    }
  } catch (e) {}

  return null;
}

// Multi-Level Referral Chaining: Level 1 (Direct) -> Level 2 -> Level 3
async function registerTeamHierarchy(newMemberPhone, newMemberId, newMemberLevel, enteredInviteCode) {
  const normNewPhone = normalizeBdPhone(newMemberPhone);
  if (!enteredInviteCode || !normNewPhone) return;

  // 1. Resolve Level 1 Superior (Direct Referral)
  const upline1 = await dbFindInviter(enteredInviteCode);
  const upline1Phone = upline1 ? normalizeBdPhone(upline1.phone || upline1.accountNumber) : '';

  // Level 1: ALWAYS register to team database with enteredInviteCode!
  if (enteredInviteCode) {
    await dbAddTeamMember(enteredInviteCode, normNewPhone, newMemberId, newMemberLevel, 1);
  }
  if (upline1Phone && upline1Phone !== enteredInviteCode) {
    await dbAddTeamMember(upline1Phone, normNewPhone, newMemberId, newMemberLevel, 1);
  }
  if (upline1 && upline1.inviteCode && upline1.inviteCode !== enteredInviteCode && upline1.inviteCode !== upline1Phone) {
    await dbAddTeamMember(upline1.inviteCode, normNewPhone, newMemberId, newMemberLevel, 1);
  }
  console.log(`[Team] Level 1 connected: ${normNewPhone} -> Code:${enteredInviteCode} Phone:${upline1Phone}`);

  // 2. Resolve Level 2 Superior (Inviter of upline1)
  let upline2 = null;
  const upline2Target = (upline1.superiorPhone && upline1.superiorPhone !== '11')
    ? upline1.superiorPhone
    : ((upline1.superiorId && upline1.superiorId !== '11') ? upline1.superiorId : null);
  if (upline2Target) {
    upline2 = await dbFindInviter(upline2Target);
  }
  let upline2Phone = upline2 ? normalizeBdPhone(upline2.phone || upline2.accountNumber) : null;
  if (!upline2Phone) {
    upline2Phone = await dbFindDirectSuperiorPhone(upline1Phone);
    if (upline2Phone && !upline2) {
      upline2 = await dbFindInviter(upline2Phone);
    }
  }

  if (upline2Phone && upline2Phone !== normNewPhone && upline2Phone !== upline1Phone) {
    // Level 2: Add to upline2's team (tier = 2)
    await dbAddTeamMember(upline2Phone, normNewPhone, newMemberId, newMemberLevel, 2);
    console.log(`[Team] Level 2 connected: ${normNewPhone} -> ${upline2Phone}`);

    // 3. Resolve Level 3 Superior (Inviter of upline2)
    let upline3 = null;
    const upline3Target = (upline2 && upline2.superiorPhone && upline2.superiorPhone !== '11')
      ? upline2.superiorPhone
      : ((upline2 && upline2.superiorId && upline2.superiorId !== '11') ? upline2.superiorId : null);
    if (upline3Target) {
      upline3 = await dbFindInviter(upline3Target);
    }
    let upline3Phone = upline3 ? normalizeBdPhone(upline3.phone || upline3.accountNumber) : null;
    if (!upline3Phone && upline2Phone) {
      upline3Phone = await dbFindDirectSuperiorPhone(upline2Phone);
    }

    if (upline3Phone && upline3Phone !== normNewPhone && upline3Phone !== upline1Phone && upline3Phone !== upline2Phone) {
      // Level 3: Add to upline3's team (tier = 3)
      await dbAddTeamMember(upline3Phone, normNewPhone, newMemberId, newMemberLevel, 3);
      console.log(`[Team] Level 3 connected: ${normNewPhone} -> ${upline3Phone}`);
    }
  }
}

async function dbGetTeamMembers(superiorPhone) {
  const supNorm = normalizeBdPhone(superiorPhone);
  if (!supNorm) return [];

  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  const myInviteCode = (currentUser && currentUser.inviteCode) ? String(currentUser.inviteCode).trim() : '';
  const myRawPhone = currentUser ? String(currentUser.phone || currentUser.accountNumber || '').trim() : '';
  const myNormPhone = normalizeBdPhone(myRawPhone);

  // Supabase
  if (window.aloSupabase) {
    try {
      let query = window.aloSupabase.from('team').select('*');
      const orParts = [];
      if (supNorm) orParts.push(`superior_phone.eq.${supNorm}`);
      if (myNormPhone && myNormPhone !== supNorm) orParts.push(`superior_phone.eq.${myNormPhone}`);
      if (myRawPhone && myRawPhone !== supNorm && myRawPhone !== myNormPhone) orParts.push(`superior_phone.eq.${myRawPhone}`);
      if (myInviteCode && myInviteCode !== supNorm) orParts.push(`superior_phone.eq.${myInviteCode}`);

      if (orParts.length > 1) {
        query = query.or(orParts.join(','));
      } else if (orParts.length === 1) {
        query = query.eq('superior_phone', supNorm);
      }
      const { data, error } = await query;
      if (!error && Array.isArray(data) && data.length > 0) {
        return data.map(mapSupabaseTeam);
      }
    } catch (err) {
      console.warn('Supabase dbGetTeamMembers error:', err);
    }
  }

  // Firebase
  if (window.aloFirebase && window.aloFirebase.db) {
    try {
      const { db, collection, query, where, getDocs } = window.aloFirebase;
      const q = query(collection(db, 'team'), where('superiorPhone', '==', supNorm));
      const snap = await getDocs(q);
      const list = [];
      if (snap) {
        snap.forEach(function(d) { list.push(d.data()); });
      }
      return list;
    } catch (err) {
      console.warn('Firebase dbGetTeamMembers error:', err);
    }
  }

  // Local storage fallback
  try {
    const local = JSON.parse(localStorage.getItem('aloTeamRecords') || '[]');
    return local.filter(function(item) {
      return normalizeBdPhone(item.superiorPhone) === supNorm;
    });
  } catch(e) {}

  return [];
}

// Comprehensive real team aggregation: Combines database, hierarchy graph, and live balances/deposits/withdrawals across Tiers 1, 2, 3
async function dbGetRealTeam(userPhone) {
  const normPhone = normalizeBdPhone(userPhone);
  if (!normPhone) return { all: [], tier1: [], tier2: [], tier3: [] };

  const memberMap = new Map();

  function upsertMember(p, data) {
    if (!p || p === normPhone) return;
    const prev = memberMap.get(p);
    if (!prev) {
      memberMap.set(p, {
        rawPhone: p,
        phone: p.length >= 10 ? p.slice(0, 5) + '-***' + p.slice(-3) : p,
        memberId: data.memberId || ('AL' + p.slice(-6)),
        inviteCode: data.inviteCode || '',
        tier: Number(data.tier) || 1,
        level: data.level || 'LV0',
        status: data.status || 'সক্রিয়',
        balance: Number(data.balance) || 0,
        rechargeAmount: Number(data.rechargeAmount) || 0,
        cashoutAmount: Number(data.cashoutAmount) || 0,
        joinedAt: data.joinedAt || new Date().toISOString()
      });
    } else {
      const nextTier = Number(data.tier) || prev.tier;
      if (nextTier < prev.tier) prev.tier = nextTier;
      if (data.inviteCode && !prev.inviteCode) prev.inviteCode = data.inviteCode;
      if (data.memberId && !String(prev.memberId || '').startsWith('AL')) {
        // keep existing
      } else if (data.memberId && prev.memberId === 'AL' + p.slice(-6)) {
        prev.memberId = data.memberId;
      }
      if (data.level && data.level !== 'LV0') {
        const prevIdx = LEVEL_ORDER.indexOf(prev.level || 'LV0');
        const nextIdx = LEVEL_ORDER.indexOf(data.level);
        if (nextIdx > prevIdx) prev.level = data.level;
      }
      // Always prefer fresher / authoritative non-zero balance, recharge & cashout
      if (data.fromUsersTable) {
        prev.balance = Number(data.balance) || prev.balance;
      } else {
        prev.balance = Math.max(prev.balance, Number(data.balance) || 0);
      }
      prev.rechargeAmount = Math.max(prev.rechargeAmount, Number(data.rechargeAmount) || 0);
      prev.cashoutAmount = Math.max(prev.cashoutAmount, Number(data.cashoutAmount) || 0);
      if (data.joinedAt) {
        const prevT = new Date(prev.joinedAt).getTime();
        const nextT = new Date(data.joinedAt).getTime();
        if (!isNaN(nextT) && (isNaN(prevT) || nextT < prevT)) {
          prev.joinedAt = data.joinedAt;
        }
      }
    }
  }

  // 1. Direct from team database table
  const dbRecords = await dbGetTeamMembers(normPhone);
  if (Array.isArray(dbRecords)) {
    dbRecords.forEach(function(r) {
      const p = normalizeBdPhone(r.memberPhone || r.member_phone);
      upsertMember(p, {
        memberId: r.memberId || r.member_id || ('AL' + p.slice(-6)),
        tier: Number(r.tier) || 1,
        level: r.level || 'LV0',
        status: r.status || 'সক্রিয়',
        balance: typeof r.balance === 'number' ? r.balance : parseFloat(r.balance || 0) || 0,
        rechargeAmount: typeof r.rechargeAmount === 'number' ? r.rechargeAmount : parseFloat(r.recharge_amount || 0) || 0,
        cashoutAmount: typeof r.cashoutAmount === 'number' ? r.cashoutAmount : parseFloat(r.cashout_amount || r.withdrawAmount || r.withdrawal || 0) || 0,
        joinedAt: r.joinedAt || r.joined_at || new Date().toISOString()
      });
    });
  }

  // 1.5 Query Supabase users table recursively for Tier 1 -> Tier 2 -> Tier 3
  if (window.aloSupabase) {
    try {
      const user = getCurrentUser();
      const myInviteCode = (user && user.inviteCode) ? String(user.inviteCode).trim() : '';
      const myRawPhone = user ? String(user.phone || user.accountNumber || '').trim() : '';

      // Tier 1 lookup in Supabase users
      const t1Keys = [];
      if (normPhone) t1Keys.push(normPhone);
      if (myRawPhone && myRawPhone !== normPhone) t1Keys.push(myRawPhone);
      if (myInviteCode) t1Keys.push(myInviteCode);

      if (t1Keys.length > 0) {
        const { data: tier1Users, error: u1Err } = await window.aloSupabase
          .from('users')
          .select('*')
          .in('superior_id', t1Keys);

        if (!u1Err && Array.isArray(tier1Users)) {
          const t2LookupKeys = new Set();
          tier1Users.forEach(function(u) {
            const p = normalizeBdPhone(u.phone || u.account_number);
            if (p && p !== normPhone) {
              t2LookupKeys.add(p);
              if (u.phone) t2LookupKeys.add(String(u.phone).trim());
              if (u.invite_code) t2LookupKeys.add(String(u.invite_code).trim());
              upsertMember(p, {
                fromUsersTable: true,
                memberId: u.member_id || u.memberId || ('AL' + p.slice(-6)),
                inviteCode: u.invite_code || '',
                tier: 1,
                level: u.package_level || u.packageLevel || 'LV0',
                balance: Number(u.balance) || 0,
                rechargeAmount: Number(u.recharge_amount || 0),
                cashoutAmount: Number(u.withdraw_amount || u.cashout_amount || u.withdrawal || 0),
                joinedAt: u.created_at || u.createdAt || new Date().toISOString()
              });
            }
          });

          // Include any Tier 1 phones already found from `team` table
          Array.from(memberMap.values()).forEach(function(m) {
            if (m.tier === 1) {
              t2LookupKeys.add(m.rawPhone);
              if (m.inviteCode) t2LookupKeys.add(m.inviteCode);
            }
          });

          // Tier 2 lookup in Supabase users
          if (t2LookupKeys.size > 0) {
            const { data: tier2Users, error: u2Err } = await window.aloSupabase
              .from('users')
              .select('*')
              .in('superior_id', Array.from(t2LookupKeys));

            if (!u2Err && Array.isArray(tier2Users)) {
              const t3LookupKeys = new Set();
              tier2Users.forEach(function(u) {
                const p = normalizeBdPhone(u.phone || u.account_number);
                if (p && p !== normPhone) {
                  t3LookupKeys.add(p);
                  if (u.phone) t3LookupKeys.add(String(u.phone).trim());
                  if (u.invite_code) t3LookupKeys.add(String(u.invite_code).trim());
                  upsertMember(p, {
                    fromUsersTable: true,
                    memberId: u.member_id || u.memberId || ('AL' + p.slice(-6)),
                    inviteCode: u.invite_code || '',
                    tier: 2,
                    level: u.package_level || u.packageLevel || 'LV0',
                    balance: Number(u.balance) || 0,
                    rechargeAmount: Number(u.recharge_amount || 0),
                    cashoutAmount: Number(u.withdraw_amount || u.cashout_amount || u.withdrawal || 0),
                    joinedAt: u.created_at || u.createdAt || new Date().toISOString()
                  });
                }
              });

              Array.from(memberMap.values()).forEach(function(m) {
                if (m.tier === 2) {
                  t3LookupKeys.add(m.rawPhone);
                  if (m.inviteCode) t3LookupKeys.add(m.inviteCode);
                }
              });

              // Tier 3 lookup in Supabase users
              if (t3LookupKeys.size > 0) {
                const { data: tier3Users, error: u3Err } = await window.aloSupabase
                  .from('users')
                  .select('*')
                  .in('superior_id', Array.from(t3LookupKeys));

                if (!u3Err && Array.isArray(tier3Users)) {
                  tier3Users.forEach(function(u) {
                    const p = normalizeBdPhone(u.phone || u.account_number);
                    if (p && p !== normPhone) {
                      upsertMember(p, {
                        fromUsersTable: true,
                        memberId: u.member_id || u.memberId || ('AL' + p.slice(-6)),
                        inviteCode: u.invite_code || '',
                        tier: 3,
                        level: u.package_level || u.packageLevel || 'LV0',
                        balance: Number(u.balance) || 0,
                        rechargeAmount: Number(u.recharge_amount || 0),
                        cashoutAmount: Number(u.withdraw_amount || u.cashout_amount || u.withdrawal || 0),
                        joinedAt: u.created_at || u.createdAt || new Date().toISOString()
                      });
                    }
                  });
                }
              }
            }
          }
        }
      }

      // Also refresh live `users` stats for any members discovered purely via `team` table
      const existingPhones = Array.from(memberMap.keys());
      if (existingPhones.length > 0) {
        const { data: memberProfiles } = await window.aloSupabase
          .from('users')
          .select('*')
          .in('phone', existingPhones);
        if (Array.isArray(memberProfiles)) {
          memberProfiles.forEach(function(u) {
            const p = normalizeBdPhone(u.phone || u.account_number);
            const cur = memberMap.get(p);
            if (cur) {
              upsertMember(p, {
                fromUsersTable: true,
                memberId: u.member_id || u.memberId,
                inviteCode: u.invite_code || '',
                tier: cur.tier,
                level: u.package_level || u.packageLevel || 'LV0',
                balance: Number(u.balance) || 0,
                rechargeAmount: Number(u.recharge_amount || 0),
                cashoutAmount: Number(u.withdraw_amount || u.cashout_amount || u.withdrawal || 0),
                joinedAt: u.created_at || u.createdAt
              });
            }
          });
        }
      }
    } catch (uErr) {
      console.warn('Supabase multi-tier users referral query notice:', uErr);
    }
  }

  // 2. Multi-level recursive graph from localStorage aloAccounts (Level 1 -> Level 2 -> Level 3)
  try {
    const user = getCurrentUser();
    const myInviteCode = (user && user.inviteCode) ? user.inviteCode.toUpperCase() : '';
    const accounts = JSON.parse(localStorage.getItem('aloAccounts') || '[]');

    // Tier 1: Directly referred by me
    const directAccounts = accounts.filter(function(a) {
      const ap = normalizeBdPhone(a.phone || a.accountNumber);
      if (ap === normPhone) return false;
      const supPhone = normalizeBdPhone(a.superiorPhone || a.superiorId);
      const supCode = String(a.superiorId || '').trim().toUpperCase();
      return supPhone === normPhone || (myInviteCode && supCode === myInviteCode);
    });

    directAccounts.forEach(function(a) {
      const p = normalizeBdPhone(a.phone || a.accountNumber);
      upsertMember(p, {
        memberId: a.memberId || ('AL' + p.slice(-6)),
        inviteCode: a.inviteCode || '',
        tier: 1,
        level: a.packageLevel || 'LV0',
        balance: Number(a.balance) || 0,
        rechargeAmount: Number(a.rechargeAmount || 0),
        cashoutAmount: Number(a.cashoutAmount || a.withdrawAmount || a.withdrawal || 0),
        joinedAt: a.createdAt || new Date().toISOString()
      });
    });

    // Tier 2: Referred by members of Tier 1
    const tier1Phones = Array.from(memberMap.values())
      .filter(function(m) { return m.tier === 1; })
      .map(function(m) { return m.rawPhone; });
    const tier1Codes = directAccounts
      .map(function(a) { return String(a.inviteCode || '').toUpperCase(); })
      .filter(Boolean);

    const tier2Accounts = accounts.filter(function(a) {
      const ap = normalizeBdPhone(a.phone || a.accountNumber);
      if (ap === normPhone) return false;
      const sup = normalizeBdPhone(a.superiorPhone || a.superiorId);
      const code = String(a.superiorId || '').trim().toUpperCase();
      return tier1Phones.includes(sup) || (code && tier1Codes.includes(code));
    });

    tier2Accounts.forEach(function(a) {
      const p = normalizeBdPhone(a.phone || a.accountNumber);
      upsertMember(p, {
        memberId: a.memberId || ('AL' + p.slice(-6)),
        inviteCode: a.inviteCode || '',
        tier: 2,
        level: a.packageLevel || 'LV0',
        balance: Number(a.balance) || 0,
        rechargeAmount: Number(a.rechargeAmount || 0),
        cashoutAmount: Number(a.cashoutAmount || a.withdrawAmount || a.withdrawal || 0),
        joinedAt: a.createdAt || new Date().toISOString()
      });
    });

    // Tier 3: Referred by members of Tier 2
    const tier2Phones = Array.from(memberMap.values())
      .filter(function(m) { return m.tier === 2; })
      .map(function(m) { return m.rawPhone; });
    const tier2Codes = tier2Accounts
      .map(function(a) { return String(a.inviteCode || '').toUpperCase(); })
      .filter(Boolean);

    const tier3Accounts = accounts.filter(function(a) {
      const ap = normalizeBdPhone(a.phone || a.accountNumber);
      if (ap === normPhone) return false;
      const sup = normalizeBdPhone(a.superiorPhone || a.superiorId);
      const code = String(a.superiorId || '').trim().toUpperCase();
      return tier2Phones.includes(sup) || (code && tier2Codes.includes(code));
    });

    tier3Accounts.forEach(function(a) {
      const p = normalizeBdPhone(a.phone || a.accountNumber);
      upsertMember(p, {
        memberId: a.memberId || ('AL' + p.slice(-6)),
        inviteCode: a.inviteCode || '',
        tier: 3,
        level: a.packageLevel || 'LV0',
        balance: Number(a.balance) || 0,
        rechargeAmount: Number(a.rechargeAmount || 0),
        cashoutAmount: Number(a.cashoutAmount || a.withdrawAmount || a.withdrawal || 0),
        joinedAt: a.createdAt || new Date().toISOString()
      });
    });
  } catch(e) {}

  // 3. Aggregate real deposit & withdrawal totals from transactions for accurate cashout/recharge calculus
  const allPhones = Array.from(memberMap.keys());
  if (allPhones.length > 0) {
    // 3a. Local withdrawal & transaction records
    try {
      const localW = JSON.parse(localStorage.getItem('aloWithdrawalRequests') || '[]');
      const wTotals = {};
      localW.forEach(function(w) {
        if (w.status === 'rejected') return;
        const p = normalizeBdPhone(w.phone || w.accountNumber);
        if (p && memberMap.has(p)) {
          wTotals[p] = (wTotals[p] || 0) + (Number(w.amount) || 0);
        }
      });
      Object.keys(wTotals).forEach(function(p) {
        const m = memberMap.get(p);
        if (m) m.cashoutAmount = Math.max(m.cashoutAmount, wTotals[p]);
      });
    } catch(e) {}

    // 3b. Supabase transactions & withdrawals for all team members
    if (window.aloSupabase) {
      try {
        const { data: txList, error: txErr } = await window.aloSupabase
          .from('transactions')
          .select('phone, type, amount, status')
          .in('phone', allPhones);
        if (!txErr && Array.isArray(txList)) {
          const depTotals = {};
          const wdTotals = {};
          txList.forEach(function(tx) {
            const p = normalizeBdPhone(tx.phone);
            const amt = Number(tx.amount) || 0;
            if (!p || amt <= 0) return;
            const st = String(tx.status || '').toLowerCase();
            if (st.includes('reject') || st.includes('বাতিল') || st.includes('fail')) return;
            if (tx.type === 'withdraw') {
              wdTotals[p] = (wdTotals[p] || 0) + amt;
            } else if (tx.type === 'deposit' && !st.includes('pending') && !st.includes('মুলতবি')) {
              depTotals[p] = (depTotals[p] || 0) + amt;
            }
          });
          Object.keys(depTotals).forEach(function(p) {
            const m = memberMap.get(p);
            if (m) m.rechargeAmount = Math.max(m.rechargeAmount, depTotals[p]);
          });
          Object.keys(wdTotals).forEach(function(p) {
            const m = memberMap.get(p);
            if (m) m.cashoutAmount = Math.max(m.cashoutAmount, wdTotals[p]);
          });
        }
      } catch(e) {}
    }
  }

  // Team accounts are strictly 100% real registered users (no fake/mock data)
  const all = Array.from(memberMap.values());
  const tier1 = all.filter(function(m) { return m.tier === 1; });
  const tier2 = all.filter(function(m) { return m.tier === 2; });
  const tier3 = all.filter(function(m) { return m.tier === 3; });

  return { all, tier1, tier2, tier3 };
}

// 3. Transactions DB helpers
async function dbRecordTransaction(tx) {
  const normPhone = normalizeBdPhone(tx.phone);
  let saved = false;

  // Supabase
  if (window.aloSupabase) {
    try {
      const txInsertPayload = {
        phone: normPhone,
        type: tx.type, // 'deposit', 'withdraw', 'commission'
        amount: Number(tx.amount) || 0,
        ratio: tx.ratio || '50.0%',
        actual: Number(tx.actual) || 0,
        status: tx.status || 'স্থানান্তরিত',
        method: tx.method || 'বিকাশ (bKash)',
        date: tx.date,
        time: tx.time,
        created_at: new Date().toISOString()
      };
      if (tx.order_id || tx.out_trade_no) {
        txInsertPayload.order_id = tx.order_id || tx.out_trade_no;
        txInsertPayload.out_trade_no = tx.out_trade_no || tx.order_id;
      }
      const { error } = await window.aloSupabase.from('transactions').insert(txInsertPayload);
      if (!error) {
        saved = true;
        if (typeof tx.newBalance === 'number') {
          await window.aloSupabase.from('users').update({
            balance: tx.newBalance,
            updated_at: new Date().toISOString()
          }).eq('phone', normPhone);
        }
      } else {
        console.warn('Supabase dbRecordTransaction warning:', error);
      }
    } catch (err) {
      console.warn('Supabase dbRecordTransaction error:', err);
    }
  }

  // Firebase
  if (window.aloFirebase && window.aloFirebase.db) {
    const txId = 'tx_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
    try {
      const { db, doc, setDoc, updateDoc } = window.aloFirebase;
      await setDoc(doc(db, 'transactions', txId), {
        phone: tx.phone,
        type: tx.type,
        amount: Number(tx.amount) || 0,
        ratio: tx.ratio || '50.0%',
        actual: Number(tx.actual) || 0,
        status: tx.status || 'স্থানান্তরিত',
        method: tx.method || 'বিকাশ (bKash)',
        date: tx.date,
        time: tx.time,
        createdAt: new Date().toISOString()
      });

      if (typeof tx.newBalance === 'number') {
        await updateDoc(doc(db, 'users', normPhone), {
          balance: tx.newBalance,
          updatedAt: new Date().toISOString()
        }).catch(function() {});
      }
      saved = true;
    } catch (err) {
      console.warn('Firebase dbRecordTransaction error:', err);
    }
  }
  return saved;
}

async function dbGetTransactions(phone, type) {
  const normPhone = normalizeBdPhone(phone);

  // Supabase
  if (window.aloSupabase) {
    try {
      let query = window.aloSupabase.from('transactions').select('*').eq('phone', normPhone);
      if (type) {
        query = query.eq('type', type);
      }
      const { data, error } = await query.order('created_at', { ascending: false });
      if (!error && Array.isArray(data) && data.length > 0) {
        return data.map(mapSupabaseTx);
      }
    } catch (err) {
      console.warn('Supabase dbGetTransactions error:', err);
    }
  }

  // Firebase
  if (window.aloFirebase && window.aloFirebase.db) {
    try {
      const { db, collection, query, where, getDocs } = window.aloFirebase;
      let q = query(collection(db, 'transactions'), where('phone', '==', phone));
      if (type) {
        q = query(collection(db, 'transactions'), where('phone', '==', phone), where('type', '==', type));
      }
      const snap = await getDocs(q);
      const list = [];
      if (snap) {
        snap.forEach(function(d) { list.push(d.data()); });
      }
      return list;
    } catch (err) {
      console.warn('Firebase dbGetTransactions error:', err);
    }
  }
  return [];
}

// Alo App Core Script
const viewIds = ['home', 'login', 'register', 'dashboard'];
const dashboardTitles = {
  home: 'প্রথম পাতা',
  vip: 'হল',
  records: 'অবস্থান',
  'package-detail': 'প্যাকেজের বিস্তারিত',
  'savings-plan': 'সঞ্চয় পরিকল্পনা',
  tasks: 'টাস্ক',
  profile: 'আমার',
  personal: 'ব্যক্তিগত তথ্য',
  'my-pass': 'আমার পার্স',
  invite: 'বন্ধুদের আমন্ত্রণ করুন',
  'platform-tasks': 'মিশন',
  'mission-submit': 'মিশন জমা',
  'payment-method': 'Payment method',
  'team-report': 'দলের রিপোর্ট',
  'bkash-setup': 'বিকাশ অ্যাকাউন্ট',
  'nagad-setup': 'নগদ অ্যাকাউন্ট',
  'usdt-setup': 'USDT অ্যাকাউন্ট',
  'realname-setup': 'অ্যাকাউন্ট বাঁধাই',
  'fund-password-setup': 'উত্তোলন পাসওয়ার্ড',
  'usdt-deposit': 'USDT ডিপোজিট',
  'bd-recharge': 'রিচার্জ',
  'customer-service': 'গ্রাহক সেবা',
  manager: 'গ্রাহক সেবা'
};

function updateDashboardTitleForLang(targetLang) {
  const lang = targetLang || (window.aloI18n && window.aloI18n.getLanguage()) || 'bn';
  const localized = {
    bn: {
      home: 'প্রথম পাতা',
      vip: 'হল',
      records: 'অবস্থান',
      'package-detail': 'প্যাকেজের বিস্তারিত',
      'savings-plan': 'সঞ্চয় পরিকল্পনা',
      tasks: 'টাস্ক',
      profile: 'আমার',
      personal: 'ব্যক্তিগত তথ্য',
      'my-pass': 'আমার পার্স',
      invite: 'বন্ধুদের আমন্ত্রণ করুন',
      'platform-tasks': 'মিশন',
      'mission-submit': 'মিশন জমা',
      'payment-method': 'অর্থপ্রদানের পদ্ধতি',
      'team-report': 'দলের রিপোর্ট',
      'bkash-setup': 'বিকাশ অ্যাকাউন্ট',
      'nagad-setup': 'নগদ অ্যাকাউন্ট',
      'usdt-setup': 'USDT অ্যাকাউন্ট',
      'realname-setup': 'অ্যাকাউন্ট বাঁধাই',
      'fund-password-setup': 'উত্তোলন পাসওয়ার্ড',
      'usdt-deposit': 'USDT ডিপোজিট',
      'customer-service': 'গ্রাহক সেবা',
      manager: 'গ্রাহক সেবা'
    },
    en: {
      home: 'Home',
      vip: 'Hall',
      records: 'VIP',
      'package-detail': 'Package Details',
      'savings-plan': 'Savings Plan',
      tasks: 'Tasks',
      profile: 'Mine',
      personal: 'Personal Info',
      'my-pass': 'My Pass',
      invite: 'Invite Friends',
      'platform-tasks': 'Missions',
      'mission-submit': 'Submit Mission',
      'payment-method': 'Payment Method',
      'team-report': 'Team Report',
      'bkash-setup': 'bKash Account',
      'nagad-setup': 'Nagad Account',
      'usdt-setup': 'USDT Account',
      'realname-setup': 'Account Binding',
      'fund-password-setup': 'Fund Password',
      'usdt-deposit': 'USDT Deposit',
      'customer-service': 'Customer Service',
      manager: 'Customer Service'
    },
    hi: {
      home: 'होम',
      vip: 'हॉल',
      records: 'वीआईपी',
      'package-detail': 'पैकेज विवरण',
      'savings-plan': 'बचत योजना',
      tasks: 'कार्य',
      profile: 'मेरा',
      personal: 'व्यक्तिगत जानकारी',
      'my-pass': 'मेरा पास',
      invite: 'दोस्तों को आमंत्रित करें',
      'platform-tasks': 'मिशन',
      'mission-submit': 'मिशन जमा करें',
      'payment-method': 'भुगतान विधि',
      'team-report': 'टीम रिपोर्ट',
      'bkash-setup': 'bKash खाता',
      'nagad-setup': 'Nagad खाता',
      'usdt-setup': 'USDT खाता',
      'realname-setup': 'खाता बाइंडिंग',
      'fund-password-setup': 'निकासी पासवर्ड',
      'usdt-deposit': 'USDT डिपॉजिट',
      'customer-service': 'ग्राहक सेवा',
      manager: 'ग्राहक सेवा'
    },
    ar: {
      home: 'الرئيسية',
      vip: 'القاعة',
      records: 'الأعضاء',
      'package-detail': 'تفاصيل الباقة',
      'savings-plan': 'خطة الادخار',
      tasks: 'المهام',
      profile: 'حسابي',
      personal: 'المعلومات الشخصية',
      'my-pass': 'بطاقتي',
      invite: 'دعوة الأصدقاء',
      'platform-tasks': 'المهام',
      'mission-submit': 'إرسال المهمة',
      'payment-method': 'طريقة الدفع',
      'team-report': 'تقرير الفريق',
      'bkash-setup': 'إعداد بكاش',
      'nagad-setup': 'إعداد نقد',
      'usdt-setup': 'حساب USDT',
      'realname-setup': 'ربط الحساب',
      'fund-password-setup': 'كلمة مرور السحب',
      'usdt-deposit': 'إيداع USDT',
      'customer-service': 'خدمة العملاء',
      manager: 'خدمة العملاء'
    }
  };
  const set = localized[lang] || localized.bn;
  Object.assign(dashboardTitles, set);

  const activePanel = document.querySelector('.dashboard-panel:not([hidden])');
  if (activePanel) {
    const pName = activePanel.id.replace('-panel', '');
    const titleEl = document.getElementById('dashboard-title');
    if (titleEl && dashboardTitles[pName]) {
      titleEl.textContent = dashboardTitles[pName];
    }
  }
}
window.updateDashboardTitleForLang = updateDashboardTitleForLang;

window.addEventListener('alo-language-changed', function(e) {
  const lang = e.detail && e.detail.lang;
  if (typeof updateDashboardTitleForLang === 'function') {
    updateDashboardTitleForLang(lang);
  }
  try {
    const user = getCurrentUser();
    if (user) {
      if (typeof updateUserDetails === 'function') updateUserDetails(user);
      if (typeof updateProfileMetrics === 'function') updateProfileMetrics();
    }
  } catch(err) {}
});

const viewOrder = { home: 0, login: 1, register: 2, dashboard: 3 };
let viewTransitionTimer = null;
let viewsReady = false;

function showView(viewName, style) {
  if (viewName === 'home') {
    const user = getCurrentUser();
    if (user) {
      showView('dashboard');
      openDashboardPanel('home');
      return;
    } else {
      showView('login');
      return;
    }
  }
  const nextView = viewIds.includes(viewName) ? viewName : 'login';
  const nextEl = document.getElementById(nextView + '-view');
  const allViews = Array.from(document.querySelectorAll('.page-view'));
  const currentEl = allViews.find(function(view) { return !view.hidden; });
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const applyHidden = function() {
    allViews.forEach(function(view) { view.hidden = view.id !== nextView + '-view'; });
    if (window.aloI18n && typeof window.aloI18n.translateDOM === 'function') {
      window.aloI18n.translateDOM();
    }
  };

  if (nextView === 'register') {
    const pendingCode = sessionStorage.getItem('alo_pending_invite_code') || localStorage.getItem('alo_pending_invite_code');
    const regInviteInput = document.getElementById('register-invite-code');
    if (pendingCode && regInviteInput && !regInviteInput.value) {
      regInviteInput.value = pendingCode;
    }
  }

  window.clearTimeout(viewTransitionTimer);
  allViews.forEach(function(view) {
    view.classList.remove('view-leave', 'view-enter-forward', 'view-enter-back', 'view-enter-zoom');
  });
  document.documentElement.classList.remove('is-view-transitioning');

  if (currentEl === nextEl) {
    return;
  }

  if (!viewsReady || !currentEl || reduceMotion) {
    viewsReady = true;
    applyHidden();
    forceScrollToTop();
    return;
  }

  const currentName = currentEl.id.replace('-view', '');
  const enterClass = style === 'zoom'
    ? 'view-enter-zoom'
    : ((viewOrder[nextView] || 0) >= (viewOrder[currentName] || 0) ? 'view-enter-forward' : 'view-enter-back');

  document.documentElement.classList.add('is-view-transitioning');
  currentEl.classList.add('view-leave');
  viewTransitionTimer = window.setTimeout(function() {
    currentEl.classList.remove('view-leave');
    applyHidden();
    forceScrollToTop();
    nextEl.classList.add(enterClass);
    viewTransitionTimer = window.setTimeout(function() {
      nextEl.classList.remove(enterClass);
      document.documentElement.classList.remove('is-view-transitioning');
    }, style === 'zoom' ? 1500 : 560);
  }, 230);
}

function playLoginSuccess(name, onDone) {
  const overlay = document.createElement('div');
  overlay.className = 'login-success-overlay';
  overlay.setAttribute('role', 'status');
  overlay.setAttribute('aria-live', 'polite');
  overlay.innerHTML =
    '<div class="login-success-box">' +
      '<svg class="login-success-ring" viewBox="0 0 110 110" aria-hidden="true">' +
        '<circle cx="55" cy="55" r="48"></circle>' +
        '<path d="M34 57 L49 72 L77 40"></path>' +
      '</svg>' +
      '<h2>লগইন সফল!</h2>' +
      '<p>স্বর্ণের খনিতে স্বাগতম</p>' +
      '<div class="login-success-bar"><i></i></div>' +
    '</div>';
  document.body.appendChild(overlay);
  requestAnimationFrame(function() { overlay.classList.add('is-visible'); });

  window.setTimeout(function() {
    onDone();
    overlay.classList.add('is-leaving');
    window.setTimeout(function() { overlay.remove(); }, 460);
  }, 1900);
}

document.addEventListener('click', function(event) {
  const target = event.target.closest('.auth-button, button[type="submit"], .phone-register-submit');
  if (!target || target.disabled) return;
  if (window.getComputedStyle(target).position === 'static') target.style.position = 'relative';
  target.style.overflow = 'hidden';
  const rect = target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;
  const dot = document.createElement('span');
  dot.className = 'btn-ripple-dot';
  dot.style.width = dot.style.height = size + 'px';
  dot.style.left = (event.clientX - rect.left - size / 2) + 'px';
  dot.style.top = (event.clientY - rect.top - size / 2) + 'px';
  target.appendChild(dot);
  window.setTimeout(function() { dot.remove(); }, 660);
});

function renderInvitePage() {
  const qrContainer = document.getElementById('invite-page-qr');
  const linkElement = document.getElementById('invite-page-link');
  const linkInput = document.getElementById('invite-link-input');
  const codeElement = document.getElementById('invite-page-code');
  if (!qrContainer) return;

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('aloSignedInUser') || 'null');
  } catch (error) {
    user = null;
  }

  const inviteCode = (user && (user.inviteCode || user.accountNumber)) || '728207';
  
  // Real working invite link with company branding & query parameter
  let inviteLink = '';
  if (window.location.origin && window.location.origin !== 'null') {
    inviteLink = `${window.location.origin}/?invite=${encodeURIComponent(inviteCode)}`;
  } else {
    inviteLink = `https://${window.location.host || 'pwnewmedia.app'}/?invite=${encodeURIComponent(inviteCode)}`;
  }

  if (codeElement) codeElement.textContent = inviteCode;
  if (linkElement) {
    linkElement.href = inviteLink;
    linkElement.textContent = inviteLink;
  }
  if (linkInput) {
    linkInput.value = inviteLink;
  }
  const companyLinkDisplay = document.getElementById('invite-company-link-display');
  if (companyLinkDisplay) {
    companyLinkDisplay.textContent = inviteLink;
    companyLinkDisplay.title = 'ক্লিক করে কপি করুন';
  }

  qrContainer.replaceChildren();

  if (window.QRCode && inviteCode) {
    new QRCode(qrContainer, {
      text: inviteLink,
      width: 128,
      height: 128,
      colorDark: '#07183e',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
  } else {
    qrContainer.textContent = inviteCode ? 'QR কোড তৈরি করা যায়নি।' : 'আমন্ত্রণ কোড পেতে আগে লগইন করুন।';
  }

  // Populate dynamic Top Commission summary card from team database
  try {
    const phone = (user && (user.phone || user.accountNumber)) || '';
    dbGetRealTeam(phone).then(function(teamData) {
      const allMembers = (teamData && teamData.all) || [];
      const totalMembers = allMembers.length;
      
      const teamCountEl = document.getElementById('invite-team-members-count');
      if (teamCountEl) teamCountEl.textContent = String(totalMembers);
      
      const nowDateStr = new Date().toDateString();
      const todayNew = allMembers.filter(function(m) {
        return m.joinedAt && new Date(m.joinedAt).toDateString() === nowDateStr;
      }).length;
      const todayNewEl = document.getElementById('invite-today-new-count');
      if (todayNewEl) todayNewEl.textContent = String(todayNew);
      
      let totalComm = 0;
      let todayComm = 0;
      allMembers.forEach(function(m) {
        const recharge = Number(m.rechargeAmount) || 0;
        let rate = 0;
        if (m.tier === 1) rate = 0.10;
        else if (m.tier === 2) rate = 0.05;
        else if (m.tier === 3) rate = 0.02;

        const comm = recharge * rate;
        totalComm += comm;
        if (m.joinedAt && new Date(m.joinedAt).toDateString() === nowDateStr) {
          todayComm += comm;
        }
      });
      const totCommEl = document.getElementById('invite-total-commission');
      if (totCommEl) totCommEl.textContent = totalComm.toFixed(2);
      const todayCommEl = document.getElementById('invite-today-commission');
      if (todayCommEl) todayCommEl.textContent = todayComm.toFixed(2);
    }).catch(function() {});
  } catch(e) {}

  // Render dynamic VIP Salary & Upgrade Level progress and buttons
  renderInviteVipSalaryCards();
}

async function renderInviteVipSalaryCards() {
  const container = document.getElementById('invite-vip-salary-cards-container');
  if (!container) return;

  const user = getCurrentUser();
  const phone = (user && (user.phone || user.accountNumber)) || '';
  let tier1Count = 0;
  let tier2Count = 0;
  let tier3Count = 0;

  try {
    const teamData = await dbGetRealTeam(phone);
    tier1Count = (teamData && teamData.tier1 && teamData.tier1.length) || 0;
    tier2Count = (teamData && teamData.tier2 && teamData.tier2.length) || 0;
    tier3Count = (teamData && teamData.tier3 && teamData.tier3.length) || 0;
  } catch(e) {
    tier1Count = 0;
    tier2Count = 0;
    tier3Count = 0;
  }

  const totalTeamCount = tier1Count + tier2Count + tier3Count;
  const tier1And2Count = tier1Count + tier2Count;

  let claimed = [];
  try {
    claimed = JSON.parse(localStorage.getItem('alo_claimed_invite_rewards') || '[]');
  } catch(e) {
    claimed = [];
  }

  const tiersConfig = [
    { tier: 'অবস্থান ১', req: 3, salary: 1000, label: '৳ ১,০০০', scope: 'tier1' },
    { tier: 'অবস্থান ২', req: 5, salary: 1800, label: '৳ ১,৮০০', scope: 'all' },
    { tier: 'অবস্থান ৩', req: 8, salary: 2500, label: '৳ ২,৫০০', scope: 'all' },
    { tier: 'অবস্থান ৪', req: 15, salary: 3200, label: '৳ ৩,২০০', scope: 'all' },
    { tier: 'অবস্থান ৫', req: 25, salary: 4000, label: '৳ ৪,০০০', scope: 'tier1_2' },
    { tier: 'অবস্থান ৬', req: 40, salary: 5500, label: '৳ ৫,৫০০', scope: 'all' },
    { tier: 'অবস্থান ৭', req: 70, salary: 7000, label: '৳ ৭,০০০', scope: 'all' },
    { tier: 'অবস্থান ৮', req: 100, salary: 10000, label: '৳ ১০,০০০', scope: 'all' }
  ];

  tiersConfig.forEach(function(cfg) {
    let effectiveCount = totalTeamCount;
    if (cfg.scope === 'tier1') {
      effectiveCount = tier1Count;
    } else if (cfg.scope === 'tier1_2') {
      effectiveCount = tier1And2Count;
    }

    const salaryKey = `${cfg.tier}-salary`;
    const isClaimed = claimed.includes(salaryKey);
    const isUnlocked = effectiveCount >= cfg.req;
    const pct = Math.min(100, Math.floor((effectiveCount / cfg.req) * 100));

    // Update real progress bar and percentage text in the row
    const row = document.querySelector(`.salary-row[data-vip-tier="${cfg.tier}"]`);
    if (row) {
      const fillEl = row.querySelector('.fill');
      if (fillEl) fillEl.style.width = `${pct}%`;
      const pctEl = row.querySelector('.pct');
      if (pctEl) pctEl.textContent = `${formatBanglaNumber(pct)}%`;
      if (isUnlocked) {
        row.classList.add('done');
      } else {
        row.classList.remove('done');
      }
    }

    const salaryBtn = document.querySelector(`.salary-pay[data-vip-tier="${cfg.tier}"][data-reward-type="salary"], .invite-claim-btn[data-vip-tier="${cfg.tier}"][data-reward-type="salary"]`);
    if (salaryBtn) {
      salaryBtn.dataset.currentCount = String(effectiveCount);
      salaryBtn.dataset.requiredMembers = String(cfg.req);
      salaryBtn.dataset.rewardAmount = String(cfg.salary);

      if (isClaimed) {
        salaryBtn.dataset.isClaimed = 'true';
        salaryBtn.dataset.isUnlocked = 'false';
        salaryBtn.style.setProperty('background', 'linear-gradient(135deg, #10b981, #059669)', 'important');
        salaryBtn.style.setProperty('color', '#ffffff', 'important');
        salaryBtn.style.setProperty('filter', 'none', 'important');
        salaryBtn.style.setProperty('opacity', '1', 'important');
        salaryBtn.style.setProperty('cursor', 'default', 'important');
        salaryBtn.style.setProperty('box-shadow', '0 0 14px rgba(16, 185, 129, 0.6)', 'important');
        salaryBtn.classList.remove('animate-pulse');
        salaryBtn.innerHTML = `
          <small class="block text-[11px] font-semibold leading-tight text-white">গৃহীত ✓</small>
          <strong class="block text-[18px] sm:text-[19px] font-bold font-mono leading-tight text-white">${cfg.label}</strong>
        `;
      } else if (isUnlocked) {
        salaryBtn.dataset.isClaimed = 'false';
        salaryBtn.dataset.isUnlocked = 'true';
        salaryBtn.style.setProperty('background', 'linear-gradient(135deg, #2aa7ff, #1fd0ff)', 'important');
        salaryBtn.style.setProperty('color', '#041a5c', 'important');
        salaryBtn.style.setProperty('filter', 'none', 'important');
        salaryBtn.style.setProperty('opacity', '1', 'important');
        salaryBtn.style.setProperty('cursor', 'pointer', 'important');
        salaryBtn.style.setProperty('box-shadow', '0 0 20px rgba(39, 196, 255, 0.85)', 'important');
        salaryBtn.classList.add('animate-pulse');
        salaryBtn.innerHTML = `
          <small class="block text-[11px] font-semibold leading-tight" style="color: #041a5c;">গ্রহণ করুন</small>
          <strong class="block text-[18px] sm:text-[19px] font-bold font-mono leading-tight" style="color: #041a5c;">${cfg.label}</strong>
        `;
      } else {
        salaryBtn.dataset.isClaimed = 'false';
        salaryBtn.dataset.isUnlocked = 'false';
        salaryBtn.style.setProperty('background', 'linear-gradient(135deg, #13274f, #0d1a38)', 'important');
        salaryBtn.style.setProperty('color', '#94a3b8', 'important');
        salaryBtn.style.setProperty('filter', 'grayscale(0.7) brightness(0.8)', 'important');
        salaryBtn.style.setProperty('opacity', '0.7', 'important');
        salaryBtn.style.setProperty('cursor', 'pointer', 'important');
        salaryBtn.style.setProperty('box-shadow', 'none', 'important');
        salaryBtn.classList.remove('animate-pulse');
        salaryBtn.innerHTML = `
          <small class="block text-[11px] font-semibold leading-tight text-slate-300">🔒 মাসিক বেতন</small>
          <strong class="block text-[18px] sm:text-[19px] font-bold font-mono leading-tight text-slate-200">${cfg.label}</strong>
        `;
      }
    }
  });
}
window.renderInviteVipSalaryCards = renderInviteVipSalaryCards;

// Clean 2-tier button HTML with pure bold 'গ্রহণ করুন' CTA without icons
function renderInviteButtonHTML(type, amount, isClaimed, isUnlocked) {
  const typeLabel = type === 'salary' ? 'মাসিক বেতন' : 'নগদ বোনাস';
  const amtFormatted = '৳ ' + Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  if (isClaimed) {
    return `
      <span class="invite-btn-top">${typeLabel} ${amtFormatted}</span>
      <span class="invite-btn-main text-emerald-400 font-bold">গৃহীত</span>
    `;
  }
  if (isUnlocked) {
    return `
      <span class="invite-btn-top">${typeLabel} ${amtFormatted}</span>
      <span class="invite-btn-main font-extrabold text-white">গ্রহণ করুন</span>
    `;
  }
  return `
    <span class="invite-btn-top">${typeLabel} ${amtFormatted}</span>
    <span class="invite-btn-main">গ্রহণ করুন</span>
  `;
}
window.renderInviteButtonHTML = renderInviteButtonHTML;

// REAL VIP SALARY & BONUS ACTIVATION & CLAIM MODAL SYSTEM
let currentInviteClaim = null;

function openInviteVipClaimModal(tier, type, amount, reqMembers, currentCount) {
  currentInviteClaim = {
    tier: tier,
    type: type,
    amount: Number(amount) || 0,
    reqMembers: Number(reqMembers) || 1,
    currentCount: Number(currentCount) || 0,
    key: `${tier}-${type}`
  };

  const modal = document.getElementById('invite-vip-claim-modal');
  if (!modal) return;

  const typeName = type === 'salary' ? 'মাসিক বেতন' : 'নগদ পুরস্কার';
  const titleEl = document.getElementById('invite-modal-tier-title');
  if (titleEl) titleEl.textContent = `${tier} (${typeName})`;

  const typeEl = document.getElementById('invite-modal-reward-type');
  if (typeEl) typeEl.textContent = 'নির্ধারিত লক্ষ্য পূরণ বেতন';

  const amtEl = document.getElementById('invite-modal-amount-display');
  if (amtEl) amtEl.textContent = '৳ ' + Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const reqEl = document.getElementById('invite-modal-req-display');
  if (reqEl) reqEl.textContent = `${reqMembers} জন সক্রিয় সদস্য`;

  const curCount = Number(currentCount) || 0;
  const pct = Math.min(100, Math.round((curCount / reqMembers) * 100));
  const curEl = document.getElementById('invite-modal-current-display');
  if (curEl) {
    curEl.textContent = `${curCount} / ${reqMembers} জন (${pct}%)`;
    curEl.className = pct >= 100 ? 'text-emerald-400 font-mono font-bold' : 'text-[#35c6e7] font-mono font-bold';
  }

  const barEl = document.getElementById('invite-modal-progress-bar');
  if (barEl) barEl.style.width = `${pct}%`;

  const claimBtn = document.getElementById('invite-modal-claim-btn');
  if (claimBtn) {
    const key = `${tier}-${type}`;
    let claimed = [];
    try { claimed = JSON.parse(localStorage.getItem('alo_claimed_invite_rewards') || '[]'); } catch(e) {}
    const isClaimed = claimed.includes(key);

    if (isClaimed) {
      claimBtn.disabled = true;
      claimBtn.className = 'w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center bg-emerald-800/50 text-emerald-300 border border-emerald-600/40 cursor-not-allowed';
      claimBtn.innerHTML = `<span>✓ এই বেতন ইতোমধ্যে গ্রহণ করা হয়েছে</span>`;
    } else if (curCount >= reqMembers) {
      claimBtn.disabled = false;
      claimBtn.className = 'w-full py-3.5 rounded-xl font-extrabold text-sm transition cursor-pointer active:scale-95 flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-400 text-white shadow-xl shadow-emerald-500/30 animate-pulse';
      claimBtn.innerHTML = `<span>মূল ব্যালেন্সে গ্রহণ করুন (৳ ${Number(amount).toLocaleString()})</span>`;
    } else {
      claimBtn.disabled = true;
      claimBtn.className = 'w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center bg-slate-800/90 text-slate-400 border border-slate-700/60 cursor-not-allowed select-none';
      const needed = reqMembers - curCount;
      claimBtn.innerHTML = `<span>🔒 শর্ত পূরণ হয়নি (আরো ${formatBanglaNumber(needed)} জন সক্রিয় সদস্য প্রয়োজন)</span>`;
    }
  }

  modal.style.display = 'flex';
  modal.hidden = false;
  modal.classList.remove('hidden');
}
window.openInviteVipClaimModal = openInviteVipClaimModal;

function closeInviteVipClaimModal() {
  const modal = document.getElementById('invite-vip-claim-modal');
  if (modal) {
    modal.style.display = 'none';
    modal.hidden = true;
    modal.classList.add('hidden');
  }
  currentInviteClaim = null;
}
window.closeInviteVipClaimModal = closeInviteVipClaimModal;

async function executeVipRewardClaim(tier, type, amount, reqMembers, currentCount) {
  const key = `${tier}-${type}`;
  let claimed = [];
  try {
    claimed = JSON.parse(localStorage.getItem('alo_claimed_invite_rewards') || '[]');
  } catch(e) {
    claimed = [];
  }

  if (claimed.includes(key)) {
    showToastNotification(`✓ আপনি ${tier} এর এই বোনাসটি ইতোমধ্যে গ্রহণ করেছেন!`);
    closeInviteVipClaimModal();
    return;
  }

  // STRICT REAL VALIDATION: DO NOT ALLOW CLAIM IF REQUIREMENT NOT MET!
  if (Number(currentCount) < Number(reqMembers)) {
    const needed = Number(reqMembers) - Number(currentCount);
    showToastNotification(`⚠️ শর্ত পূরণ না হলে ক্লাইম করা যাবে না! আরও ${formatBanglaNumber(needed)} জন সক্রিয় সদস্য প্রয়োজন (বর্তমান: ${formatBanglaNumber(currentCount)}/${formatBanglaNumber(reqMembers)})`);
    closeInviteVipClaimModal();
    return;
  }

  // Claim reward to user's real balance!
  const user = getCurrentUser();
  if (user) {
    const prevBal = Number(user.balance) || 0;
    const addAmt = Number(amount) || 0;
    const newBal = prevBal + addAmt;
    user.balance = newBal;
    user.totalIncome = (Number(user.totalIncome) || 0) + addAmt;
    user.todayIncome = (Number(user.todayIncome) || 0) + addAmt;

    // Add transaction to history
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    if (!Array.isArray(user.depositRecords)) user.depositRecords = [];
    user.depositRecords.unshift({
      id: 'VIP' + Date.now().toString().slice(-6),
      amount: addAmt,
      actual: addAmt,
      status: 'সফল',
      method: `${tier} ${type === 'salary' ? 'মাসিক বেতন' : 'নগদ পুরস্কার'} গ্রহণ`,
      date: dateStr,
      time: `${hours}:${mins}`,
      newBalance: newBal
    });

    localStorage.setItem('aloSignedInUser', JSON.stringify(user));
    claimed.push(key);
    localStorage.setItem('alo_claimed_invite_rewards', JSON.stringify(claimed));

    // Save user to cloud db
    dbSaveUser(user);
    if (window.aloSupabase) {
      window.aloSupabase.from('users').update({ balance: user.balance, updated_at: new Date().toISOString() }).eq('phone', user.phone || user.accountNumber).then(() => {}).catch(e => console.warn(e));
    }

    closeInviteVipClaimModal();
    updateProfileMetrics();
    await renderInviteVipSalaryCards();

    const typeBengali = type === 'salary' ? 'মাসিক বেতন' : 'নগদ পুরস্কার';
    showToastNotification(`🎉 অভিনন্দন! ${tier} ${typeBengali} ৳ ${addAmt.toLocaleString()} সফলভাবে মূল ব্যালেন্সে যোগ হয়েছে!`);

    // Animate balance display
    const balEl = document.getElementById('records-balance-display');
    if (balEl) {
      balEl.textContent = formatMoney(newBal);
      balEl.classList.add('scale-110', 'text-emerald-400');
      setTimeout(() => balEl.classList.remove('scale-110', 'text-emerald-400'), 1500);
    }
  }
}
window.executeVipRewardClaim = executeVipRewardClaim;

function forceScrollToTop(targetPanelId) {
  const loginView = document.getElementById('login-view');
  const regView = document.getElementById('register-view');
  if ((loginView && !loginView.hidden) || (regView && !regView.hidden)) {
    return;
  }
  if (document.activeElement && typeof document.activeElement.blur === 'function') {
    try {
      document.activeElement.blur();
    } catch(e) {}
  }
  try {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  } catch(e) {
    try { window.scrollTo(0, 0); } catch(e2) {}
  }
  if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
  if (document.documentElement) document.documentElement.scrollTop = 0;
  if (document.body) document.body.scrollTop = 0;
  const shell = document.querySelector('.dashboard-shell');
  if (shell) shell.scrollTop = 0;
  const mainEl = document.querySelector('.dashboard-shell > main');
  if (mainEl) mainEl.scrollTop = 0;
  const dView = document.getElementById('dashboard-view');
  if (dView) dView.scrollTop = 0;
  const panel = targetPanelId ? document.getElementById(targetPanelId) : document.querySelector('.dashboard-panel:not([hidden])');
  if (panel) {
    panel.scrollTop = 0;
    try {
      panel.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'instant' });
    } catch(e) {}
  }
}

function openDashboardPanel(panelName) {
  if (panelName === "manager" || panelName === "customer-service") {
    panelName = "customer-service";
  }
  if (panelName === "my-team" || panelName === "team-members") {
    panelName = "team-report";
    window._autoSelectTeamTab = "members";
  } else if (panelName === "team-report") {
    window._autoSelectTeamTab = "report";
  }
  if (document.activeElement && typeof document.activeElement.blur === 'function') {
    try { document.activeElement.blur(); } catch(e) {}
  }
  forceScrollToTop(panelName + '-panel');
  const nextPanel = dashboardTitles[panelName] ? panelName : 'home';
  if (nextPanel !== 'payment-method' && nextPanel !== 'bd-recharge' && nextPanel !== 'team-report' && nextPanel !== 'withdraw' && nextPanel !== 'withdraw-details' && nextPanel !== 'customer-service' && nextPanel !== 'usdt-deposit') {
    previousDashboardPanel = nextPanel;
  }
  document.querySelectorAll('.dashboard-panel').forEach(function(panel) {
    panel.hidden = panel.id !== nextPanel + '-panel';
  });

  // Ensure bottom navigation bar is permanently visible on all pages as requested ("যেকোনো পেজে গেলেও নিচের আইকন থাকবে")
  const bottomNav = document.getElementById('dashboard-bottom-nav') || document.querySelector('nav[aria-label="প্রধান মেনু"]');
  if (bottomNav) {
    bottomNav.style.setProperty('display', 'grid', 'important');
    bottomNav.style.setProperty('visibility', 'visible', 'important');
    bottomNav.style.setProperty('opacity', '1', 'important');
    bottomNav.style.setProperty('pointer-events', 'auto', 'important');
    if (nextPanel === 'package-detail') {
      document.body.style.backgroundColor = '#030d24';
    } else {
      document.body.style.backgroundColor = '';
    }
  }

  if (nextPanel === 'usdt-deposit') {
    const detailsCard = document.getElementById('usdt-deposit-details-card');
    const preView = document.getElementById('usdt-pre-deposit-view');
    if (detailsCard) detailsCard.classList.add('hidden');
    if (preView) preView.classList.remove('hidden');
  }

  const navItemMap = {
    home: 'home',
    vip: 'vip',
    'platform-tasks': 'vip',
    records: 'records',
    'package-detail': 'records',
    tasks: 'tasks',
    'mission-submit': 'tasks',
    profile: 'profile',
    personal: 'profile',
    'my-pass': 'profile',
    invite: 'profile',
    'payment-method': 'profile',
    'usdt-deposit': 'profile',
    'team-report': 'profile',
    'team-members': 'profile',
    'my-team': 'profile',
    'savings-plan': 'profile',
    'bkash-setup': 'profile',
    'nagad-setup': 'profile',
    'usdt-setup': 'profile',
    'realname-setup': 'profile',
    'fund-password-setup': 'profile',
    'customer-service': 'home',
    manager: 'home'
  };
  const activeNavKey = navItemMap[nextPanel] || nextPanel;
  document.querySelectorAll('.dashboard-nav-item').forEach(function(button) {
    button.removeAttribute('aria-current');
    if (button.dataset.panel === activeNavKey) {
      button.setAttribute('aria-current', 'page');
    }
  });
  const titleEl = document.getElementById('dashboard-title');
  if (titleEl) titleEl.textContent = dashboardTitles[nextPanel];
  if (nextPanel === 'home') {
    goToPWBannerSlide(0);
    startPWBannerAutoPlay();
  } else {
    stopPWBannerAutoPlay();
  }
  if (nextPanel === 'invite') {
    renderInvitePage();
  }
  if (nextPanel === 'savings-plan') {
    renderSavingsPlanPanel();
  }
  if (nextPanel === 'platform-tasks') {
    renderPackageTasks(activePackageLevel || 'LV0');
  }
  if (nextPanel === 'profile') {
    updateProfileMetrics();
    updateBkashDisplayAcrossApp(); updateNagadDisplayAcrossApp(); updateUsdtDisplayAcrossApp(); updateRealNameDisplayAcrossApp(); updateFundPasswordDisplayAcrossApp();
  }
  if (nextPanel === 'personal') {
    updateBkashDisplayAcrossApp(); updateNagadDisplayAcrossApp(); updateUsdtDisplayAcrossApp(); updateRealNameDisplayAcrossApp(); updateFundPasswordDisplayAcrossApp();
  }
  if (nextPanel === 'fund-password-setup') {
    renderFundPasswordSetupPanel();
  }
  if (nextPanel === 'bkash-setup') {
    renderBkashSetupPanel();
  }
  if (nextPanel === 'nagad-setup') {
    renderNagadSetupPanel();
  }
  if (nextPanel === 'usdt-setup') {
    renderUsdtSetupPanel();
  }
  if (nextPanel === 'realname-setup') {
    renderRealNameSetupPanel();
  }
  if (nextPanel === 'my-pass') {
    updateProfileMetrics();
    renderWithdrawalHistory();
    updateBkashDisplayAcrossApp(); updateNagadDisplayAcrossApp(); updateUsdtDisplayAcrossApp();
  }
  if (nextPanel === 'vip') {
    if (typeof updateVipHallRooms === 'function') updateVipHallRooms();
  }
  if (nextPanel === 'records') {
    if (typeof updateRecordsPanelPackages === 'function') updateRecordsPanelPackages();
  }
  if (nextPanel === 'tasks') {
    renderMissionRecords(activeMissionFilter);
  }
  if (nextPanel === 'mission-submit') {
    renderMissionSubmission();
  }
  if (nextPanel === 'team-report') {
    const autoTab = window._autoSelectTeamTab || 'report';
    const reportTab = document.getElementById('team-tab-report');
    const membersTab = document.getElementById('team-tab-members');
    const reportContent = document.getElementById('team-report-view-content');
    const membersContent = document.getElementById('team-members-view-content');
    const headerTitle = document.getElementById('team-panel-header-title');

    if (autoTab === 'members') {
      if (reportContent) reportContent.classList.add('hidden');
      if (membersContent) membersContent.classList.remove('hidden');
      if (headerTitle) headerTitle.textContent = 'আমার দল';

      if (reportTab) {
        reportTab.classList.remove('font-bold', 'text-[#38bdf8]');
        reportTab.classList.add('font-medium', 'text-slate-300');
        const ind = reportTab.querySelector('.team-tab-indicator');
        if (ind) { ind.classList.remove('bg-[#38bdf8]'); ind.classList.add('bg-transparent'); }
      }
      if (membersTab) {
        membersTab.classList.remove('font-medium', 'text-slate-300');
        membersTab.classList.add('font-bold', 'text-[#38bdf8]');
        const ind = membersTab.querySelector('.team-tab-indicator');
        if (ind) { ind.classList.remove('bg-transparent'); ind.classList.add('bg-[#38bdf8]'); }
      }
      if (typeof renderFreshTeamView === 'function') {
        renderFreshTeamView();
      }
    } else {
      // Default: Always show "দলের রিপোর্ট" as requested by user
      if (reportContent) reportContent.classList.remove('hidden');
      if (membersContent) membersContent.classList.add('hidden');
      if (headerTitle) headerTitle.textContent = 'দলের রিপোর্ট';

      if (reportTab) {
        reportTab.classList.remove('font-medium', 'text-slate-300');
        reportTab.classList.add('font-bold', 'text-[#38bdf8]');
        const ind = reportTab.querySelector('.team-tab-indicator');
        if (ind) { ind.classList.remove('bg-transparent'); ind.classList.add('bg-[#38bdf8]'); }
      }
      if (membersTab) {
        membersTab.classList.remove('font-bold', 'text-[#38bdf8]');
        membersTab.classList.add('font-medium', 'text-slate-300');
        const ind = membersTab.querySelector('.team-tab-indicator');
        if (ind) { ind.classList.remove('bg-[#38bdf8]'); ind.classList.add('bg-transparent'); }
      }
      if (typeof updateTeamReportMetrics === 'function') {
        updateTeamReportMetrics();
      }
      if (typeof renderFreshTeamView === 'function') {
        renderFreshTeamView();
      }
    }
  }
  forceScrollToTop(nextPanel + '-panel');
  requestAnimationFrame(function() { forceScrollToTop(nextPanel + '-panel'); });
  setTimeout(function() { forceScrollToTop(nextPanel + '-panel'); }, 20);
  setTimeout(function() { forceScrollToTop(nextPanel + '-panel'); }, 60);
  setTimeout(function() { forceScrollToTop(nextPanel + '-panel'); }, 150);

  if (window.aloI18n && typeof window.aloI18n.translateDOM === 'function' && window.aloI18n.getLanguage() !== 'bn') {
    setTimeout(function() {
      try { window.aloI18n.translateDOM(); } catch(e) {}
    }, 60);
  }
}

function isIndianUser(user) {
  if (!user) {
    try {
      user = JSON.parse(localStorage.getItem('aloSignedInUser') || 'null');
    } catch(e) {}
  }
  if (!user) return false;
  if (user.country === 'IN' || user.currency === 'INR' || user.dialCode === '+91') return true;
  if (user.countryName === 'India' || user.countryName === 'ইন্ডিয়া' || user.countryName === 'ভারত') return true;
  if (user.countryNameEn === 'India') return true;
  const p = String(user.phone || user.accountNumber || '').replace(/\D/g, '');
  if (p.startsWith('91') && p.length >= 10) return true;
  return false;
}
window.isIndianUser = isIndianUser;

function updateUserDetails(user) {
  if (!user) user = getCurrentUser();
  if (!user) return;

  const isIndia = isIndianUser(user);
  user.country = isIndia ? 'IN' : 'BD';
  user.currency = isIndia ? 'INR' : 'BDT';
  user.currencySymbol = isIndia ? '₹' : '৳';
  user.currencyName = isIndia ? 'Rupee' : 'Taka';
  user.dialCode = isIndia ? '+91' : '+880';

  try {
    localStorage.setItem('aloSignedInUser', JSON.stringify(user));
  } catch(e) {}

  // Sanitize stored user values from any accidental "টি" corruption:
  if (user.accountNumber) user.accountNumber = String(user.accountNumber).replace(/টি/g, '').trim();
  if (user.phone) user.phone = String(user.phone).replace(/টি/g, '').trim();
  if (user.inviteCode) user.inviteCode = String(user.inviteCode).replace(/টি/g, '').trim();
  if (user.memberId) user.memberId = String(user.memberId).replace(/টি/g, '').trim();

  const cleanMemberId = user.memberId || '1105';
  const memberId = document.getElementById('profile-member-id');
  if (memberId) memberId.textContent = cleanMemberId;

  const cleanInviteCode = user.inviteCode || '728207';
  const inviteCode = document.getElementById('profile-invite-code');
  if (inviteCode) inviteCode.textContent = cleanInviteCode;

  let registeredPhone = String(user.accountNumber || user.phone || '1735235999').replace(/টি/g, '').trim();
  const accountNum = document.getElementById('profile-account-number');
  if (accountNum) accountNum.textContent = registeredPhone;

  document.querySelectorAll('[data-profile-value="phone"]').forEach(function(el) {
    el.textContent = registeredPhone;
  });
  document.querySelectorAll('[data-profile-value="account"]').forEach(function(el) {
    el.textContent = registeredPhone;
  });

  const packageLevel = document.getElementById('profile-package-level');
  if (packageLevel) packageLevel.textContent = user.packageLevel || 'LV0';

  if (typeof window.syncCountryLanguageOptions === 'function') {
    window.syncCountryLanguageOptions(isIndia ? 'IN' : 'BD');
  }
  const currentLang = (window.aloI18n ? window.aloI18n.getLanguage() : '') || user.language || localStorage.getItem('alo_lang') || (isIndia ? 'hi' : 'bn');

  const defaultMemberName = isIndia ? (currentLang === 'en' ? 'Member' : 'सदस्य') : 'সদস্য';
  const userName = document.getElementById('dashboard-user-name');
  if (userName) userName.textContent = (!user.name || user.name === 'সদস্য' || user.name === 'Member' || user.name === 'सदस्य') ? defaultMemberName : user.name;

  // Country & Currency Information with Real-time Multi-Language Support
  const userCountryName = isIndia
    ? (currentLang === 'en' ? 'India' : 'भारत')
    : (currentLang === 'hi' ? 'बांग्लादेश' : (currentLang === 'en' ? 'Bangladesh' : 'বাংলাদেশ'));
  const userCurrCode = isIndia ? 'INR' : 'BDT';
  const userCurrSym = isIndia ? '₹' : '৳';
  const userFlag = isIndia ? '🇮🇳' : '🇧🇩';

  const countryBadge = document.getElementById('profile-country-badge');
  if (countryBadge) {
    countryBadge.innerHTML = `<span class="text-sm select-none">${userFlag}</span> <span>${userCountryName} · ${userCurrCode} (${userCurrSym})</span>`;
  }
  const personalCountry = document.getElementById('personal-country-text');
  if (personalCountry) {
    personalCountry.textContent = `${userFlag} ${userCountryName} (${userCurrCode})`;
  }
  const personalCurrBadge = document.getElementById('personal-currency-badge');
  if (personalCurrBadge) {
    personalCurrBadge.textContent = `${userCurrCode} · ${userCurrSym}`;
  }
  const profileBalCurr = document.getElementById('profile-balance-currency');
  if (profileBalCurr) {
    profileBalCurr.textContent = userCurrCode;
  }

  updatePaymentAndWithdrawalForUser(user);

  if (typeof updateVipHallRooms === 'function') updateVipHallRooms();
  if (typeof updateRecordsPanelPackages === 'function') updateRecordsPanelPackages();
}
window.updateUserDetails = updateUserDetails;

function updatePaymentAndWithdrawalForUser(user) {
  if (!user) user = getCurrentUser();
  const isIndia = isIndianUser(user);
  const isBd = !isIndia;
  const curr = isIndia ? 'INR' : 'BDT';

  // 1. Payment Method Panel rows (Recharge options)
  document.querySelectorAll('.payment-method-row').forEach(function(row) {
    const method = row.dataset.paymentMethod;
    if (method === 'usdt') {
      row.style.display = '';
    } else {
      // BKASH, Nagad, BKAsh-2 are visible for Bangladesh only!
      row.style.display = isBd ? '' : 'none';
    }
  });

  // 2. Inline Recharge Drawer & Modal Recharge Payment Badges
  document.querySelectorAll('.bd-only-payment-method').forEach(function(badge) {
    badge.style.display = isBd ? '' : 'none';
  });
  const inlineGrid = document.getElementById('inline-recharge-methods-grid');
  if (inlineGrid) {
    inlineGrid.className = isBd ? 'grid grid-cols-3 gap-2 text-center text-[10px]' : 'grid grid-cols-1 gap-2 text-center text-[10px] max-w-[200px] mx-auto';
  }
  const modalGrid = document.getElementById('modal-deposit-methods-grid');
  if (modalGrid) {
    modalGrid.className = isBd ? 'grid grid-cols-3 gap-2 text-center text-[10px]' : 'grid grid-cols-1 gap-2 text-center text-[10px] max-w-[200px] mx-auto';
  }

  // 3. Withdrawal Sheet Method Picker Options
  document.querySelectorAll('.withdraw-picker-option').forEach(function(opt) {
    const key = opt.dataset.methodKey;
    if (key === 'USDT') {
      opt.style.display = '';
    } else {
      // BKASH, NAGAD are visible for Bangladesh only!
      opt.style.display = isBd ? '' : 'none';
    }
  });

  // 4. Withdrawal Label in Sheet
  if (!isBd && !userSelectedWithdrawMethod) {
    userSelectedWithdrawMethod = 'USDT';
  }
  updateWithdrawalMethodLabelDisplay();
  renderWithdrawMethodPickerOptions();

  // 5. Withdrawal Hint Text (hide BDT withdrawal timeline for non-BD)
  const bdtWithdrawHint = document.querySelector('#my-pass-withdraw-sheet .space-y-1 div:nth-child(2)');
  if (bdtWithdrawHint && bdtWithdrawHint.textContent.includes('উত্তোলন 48-96')) {
    bdtWithdrawHint.style.display = isBd ? '' : 'none';
  }

  // 6. Personal Info Rows (bKash & Nagad hidden for non-BD)
  const personalBkash = document.getElementById('personal-bkash-row');
  if (personalBkash) personalBkash.style.display = isBd ? '' : 'none';
  const personalNagad = document.getElementById('personal-nagad-row');
  if (personalNagad) personalNagad.style.display = isBd ? '' : 'none';

  // 7. Dynamic Currency Text Elements
  document.querySelectorAll('.user-currency-text').forEach(function(el) {
    el.textContent = curr;
  });

  // 8. 9 Earnings Cards Labels in Profile
  const earningsLabelIds = [
    'personal-earnings-value',
    'yesterday-earnings-value',
    'today-earnings-value',
    'weekly-earnings-value',
    'monthly-earnings-value',
    'last-month-earnings-value',
    'total-revenue-value'
  ];
  earningsLabelIds.forEach(function(id) {
    const el = document.getElementById(id);
    if (el && el.nextElementSibling) {
      const currSpan = el.nextElementSibling.querySelector('.user-currency-text');
      if (currSpan) {
        currSpan.textContent = curr;
      } else if (el.nextElementSibling.textContent.includes('(')) {
        el.nextElementSibling.textContent = el.nextElementSibling.textContent.replace(/\([A-Z]{3,4}\)/g, `(${curr})`);
      }
    }
  });

  // 9. Team Report Labels
  document.querySelectorAll('#team-report-panel p, [data-panel="team-report"] p').forEach(function(p) {
    const currSpan = p.querySelector('.user-currency-text');
    if (currSpan) {
      currSpan.textContent = curr;
    } else if (p.textContent.includes('(')) {
      p.textContent = p.textContent.replace(/\([A-Z]{3,4}\)/g, `(${curr})`);
    }
  });

  // 10. VIP Package Cards Currency & Localization
  if (typeof updateRecordsPanelPackages === 'function') {
    updateRecordsPanelPackages();
  }

  // Mission submit reward
  const missionReward = document.getElementById('mission-submit-reward');
  if (missionReward && (missionReward.textContent.includes('BDT') || missionReward.textContent.includes('INR') || missionReward.textContent.includes('PKR') || missionReward.textContent.includes('USD'))) {
    missionReward.textContent = missionReward.textContent.replace(/(BDT|INR|PKR|USD)/g, curr);
  }
}

window.addEventListener('alo-language-changed', function(e) {
  const lang = (e && e.detail && e.detail.lang) || 'bn';
  const user = getCurrentUser();
  if (user) {
    user.language = lang;
    try {
      localStorage.setItem('aloSignedInUser', JSON.stringify(user));
    } catch(err) {}
    updateUserDetails(user);
    if (typeof updateProfileMetrics === 'function') updateProfileMetrics();
    if (typeof updateVipHallRooms === 'function') updateVipHallRooms();
    if (typeof updateRecordsPanelPackages === 'function') updateRecordsPanelPackages();
    if (typeof updateTeamReportMetrics === 'function') updateTeamReportMetrics();
  }
});

async function hashPassword(password) {
  if (window.crypto && window.crypto.subtle && window.TextEncoder) {
    const bytes = new TextEncoder().encode(password);
    const digest = await window.crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest)).map(function(byte) {
      return byte.toString(16).padStart(2, '0');
    }).join('');
  }

  let hash = 2166136261;
  for (let index = 0; index < password.length; index += 1) {
    hash ^= password.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return 'demo-' + (hash >>> 0).toString(16).padStart(8, '0');
}

document.addEventListener('click', function(event) {
  const button = event.target.closest('[data-view]');
  if (button && button.dataset.view) {
    event.preventDefault();
    showView(button.dataset.view);
    return;
  }
});

document.querySelectorAll('[data-view]').forEach(function(button) {
  button.addEventListener('click', function() {
    showView(button.dataset.view);
  });
});

document.querySelectorAll('[data-toggle-password]').forEach(function(button) {
  button.addEventListener('click', function() {
    const field = document.getElementById(button.dataset.togglePassword);
    if (!field) return;
    const showing = field.type === 'password';
    field.type = showing ? 'text' : 'password';
    button.setAttribute('aria-label', showing ? 'Hide password' : 'Show password');
    button.toggleAttribute('data-password-visible', showing);
    const openIcon = button.querySelector('.eye-open-icon');
    const closedIcon = button.querySelector('.eye-closed-icon');
    if (openIcon && closedIcon) {
      openIcon.classList.toggle('hidden', showing);
      closedIcon.classList.toggle('hidden', !showing);
    }
  });
});

document.querySelectorAll('[data-message]').forEach(function(button) {
  button.addEventListener('click', function() {
    const msg = document.getElementById('register-message');
    if (msg) msg.textContent = button.dataset.message;
  });
});

function normalizeBdPhone(phoneStr, countryCode) {
  let digits = String(phoneStr || '').replace(/\D/g, '');
  if (digits.startsWith('880')) digits = digits.slice(3);
  else if (digits.startsWith('91') && digits.length === 12) digits = digits.slice(2);
  if (digits.startsWith('0')) digits = digits.slice(1);
  return digits;
}

// =========================================================================
// COUNTRY-BASED CURRENCY SYSTEM (দেশ ও কারেন্সি সিস্টেম)
// Rules:
// Bangladesh (BD) -> BDT (৳) +880
// India (IN)      -> INR (₹) +91
// =========================================================================
const COUNTRY_DATABASE = [
  { code: 'BD', nameBn: 'বাংলাদেশ', nameEn: 'Bangladesh', nameHi: 'बांग्लादेश', flag: '🇧🇩', dialCode: '+880', currency: 'BDT', symbol: '৳', currencyName: 'টাকা', phoneLen: 11, defaultLang: 'bn', placeholder: '' },
  { code: 'IN', nameBn: 'भारत', nameEn: 'India', nameHi: 'भारत', flag: '🇮🇳', dialCode: '+91', currency: 'INR', symbol: '₹', currencyName: 'Rupee', phoneLen: 10, defaultLang: 'hi', placeholder: '' }
];

let currentRegistrationCountry = COUNTRY_DATABASE[0]; // Default Bangladesh

function getCountryByCode(code) {
  if (!code) return COUNTRY_DATABASE[0];
  const clean = String(code).trim();
  const lower = clean.toLowerCase();
  const upper = clean.toUpperCase();
  const digits = clean.replace(/\D/g, '');

  return COUNTRY_DATABASE.find(function(c) {
    if (c.code === upper) return true;
    if (c.dialCode === clean) return true;
    if (digits && c.dialCode.replace(/\D/g, '') === digits) return true;
    if (c.nameBn === clean || c.nameBn.toLowerCase() === lower) return true;
    if (c.nameEn.toLowerCase() === lower) return true;
    if (c.nameHi && (c.nameHi === clean || c.nameHi.toLowerCase() === lower)) return true;
    if (lower === 'india' || lower === 'ইন্ডিয়া' || lower === 'ভারত' || lower === 'ind' || lower === 'in') return c.code === 'IN';
    if (lower === 'bangladesh' || lower === 'বাংলাদেশ' || lower === 'bd') return c.code === 'BD';
    return false;
  }) || COUNTRY_DATABASE[0];
}

function selectRegistrationCountry(code) {
  const country = getCountryByCode(code);
  if (!country) return;
  currentRegistrationCountry = country;

  // 1. Update dropdown
  const selectEl = document.getElementById('register-country-select');
  if (selectEl && selectEl.value !== country.code) {
    selectEl.value = country.code;
  }

  // 2. Update Hidden Form Data
  const codeInput = document.getElementById('register-country-code');
  if (codeInput) codeInput.value = country.code;
  const nameInput = document.getElementById('register-country-name');
  if (nameInput) nameInput.value = country.nameEn;
  const currCodeInput = document.getElementById('register-currency-code');
  if (currCodeInput) currCodeInput.value = country.currency;
  const currSymInput = document.getElementById('register-currency-symbol');
  if (currSymInput) currSymInput.value = country.symbol;
  const currNameInput = document.getElementById('register-currency-name');
  if (currNameInput) currNameInput.value = country.currencyName;
  const dialCodeInput = document.getElementById('register-dial-code');
  if (dialCodeInput) dialCodeInput.value = country.dialCode;

  // 3. Update Phone Prefix with numerical dial code!
  const prefixEl = document.getElementById('register-phone-prefix');
  if (prefixEl) {
    prefixEl.innerHTML = `${country.dialCode} <span class="phone-register-prefix-arrow text-[10px]" aria-hidden="true">▼</span>`;
    prefixEl.setAttribute('aria-label', `Country: ${country.nameEn}, Dial Code: ${country.dialCode}`);
  }
  const phoneInput = document.getElementById('register-phone');
  if (phoneInput) {
    phoneInput.placeholder = '';
    phoneInput.maxLength = country.phoneLen || 15;
  }

  // 4. Automatically switch website language if needed (without unnecessary re-triggers)
  const curLangReg = (window.aloI18n && typeof window.aloI18n.getLanguage === 'function') ? window.aloI18n.getLanguage() : 'bn';
  if (country.code === 'IN' && curLangReg === 'bn') {
    if (typeof setAppLanguage === 'function') {
      setAppLanguage('hi');
    }
  } else if (country.code === 'BD' && curLangReg === 'hi') {
    if (typeof setAppLanguage === 'function') {
      setAppLanguage('bn');
    }
  }

  // Re-render country list only if modal is visible
  const cModal = document.getElementById('country-picker-modal');
  if (cModal && !cModal.classList.contains('hidden')) {
    renderCountryList();
  }
}

function selectLoginCountry(code) {
  const country = getCountryByCode(code);
  if (!country) return;

  const loginSelect = document.getElementById('login-country-select');
  if (loginSelect && loginSelect.value !== country.code) {
    loginSelect.value = country.code;
  }
  const prefixEl = document.getElementById('login-phone-prefix');
  if (prefixEl) {
    prefixEl.textContent = country.dialCode;
  }
  const emailInp = document.getElementById('login-email');
  if (emailInp) {
    emailInp.maxLength = country.phoneLen || 15;
  }

  const curLang = (window.aloI18n && typeof window.aloI18n.getLanguage === 'function') ? window.aloI18n.getLanguage() : 'bn';
  if (country.code === 'IN' && curLang === 'bn') {
    if (typeof setAppLanguage === 'function') {
      setAppLanguage('hi');
    }
  } else if (country.code === 'BD' && curLang === 'hi') {
    if (typeof setAppLanguage === 'function') {
      setAppLanguage('bn');
    }
  }
}

// Global exposure
window.selectRegistrationCountry = selectRegistrationCountry;
window.selectLoginCountry = selectLoginCountry;
window.getCountryByCode = getCountryByCode;

// Immediate global event delegation for country dropdown (change only, no duplicate input spam)
document.addEventListener('change', function(e) {
  if (e.target && e.target.id === 'login-country-select') {
    selectLoginCountry(e.target.value);
  }
  if (e.target && e.target.id === 'register-country-select') {
    selectRegistrationCountry(e.target.value);
  }
});

// Immediate global click delegation for country selection
document.addEventListener('click', function(e) {
  const countryListItem = e.target.closest('.country-list-item, [data-country-code]');
  if (countryListItem && countryListItem.dataset.countryCode) {
    e.preventDefault();
    selectRegistrationCountry(countryListItem.dataset.countryCode);
    closeCountryPickerModal();
  }
});

function openCountryPickerModal() {
  const modal = document.getElementById('country-picker-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  renderCountryList();
}

function closeCountryPickerModal() {
  const modal = document.getElementById('country-picker-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function renderCountryList() {
  const container = document.getElementById('country-list-container');
  if (!container) return;

  const currentLang = (window.aloI18n ? window.aloI18n.getLanguage() : 'en');

  container.innerHTML = COUNTRY_DATABASE.map(function(item) {
    const isSelected = currentRegistrationCountry && currentRegistrationCountry.code === item.code;
    const displayName = currentLang === 'hi' ? item.nameHi : (currentLang === 'en' ? item.nameEn : item.nameBn);
    return `
      <button type="button" class="country-list-item w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-[#0c245c] transition text-left cursor-pointer ${isSelected ? 'bg-[#0f2e73] border border-[#35c6e7]/50 shadow-md' : 'bg-[#061842] border border-[#14326d]'}" data-country-code="${item.code}">
        <div class="flex items-center gap-3">
          <span class="text-xl">${item.flag}</span>
          <span class="text-base font-semibold text-white ${isSelected ? 'text-[#35c6e7]' : ''}">${displayName}</span>
          <span class="text-xs font-mono font-bold text-[#35c6e7] bg-[#0c245c] px-2 py-0.5 rounded-md border border-[#1b3e85]">${item.dialCode}</span>
        </div>
        ${isSelected ? '<span class="w-6 h-6 rounded-full bg-[#35c6e7] text-[#061842] flex items-center justify-center text-xs font-black shadow">✓</span>' : ''}
      </button>
    `;
  }).join('');

  container.querySelectorAll('.country-list-item').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const code = this.dataset.countryCode;
      selectRegistrationCountry(code);
      closeCountryPickerModal();
    });
  });
}

function getUserCurrency(user) {
  return isIndianUser(user) ? 'INR' : 'BDT';
}

function getUserCurrencySymbol(user) {
  return isIndianUser(user) ? '₹' : '৳';
}

function formatUserMoney(amount, user) {
  if (!user) user = getCurrentUser();
  const curr = getUserCurrency(user);
  const sym = getUserCurrencySymbol(user);
  return `${sym} ${formatMoney(amount, user)}`;
}

// USD Exchange Rates as specifically requested:
// Bangladesh: 126 BDT = $1.00 USD (e.g. 126৳ = $1.00, 20৳ = $0.16)
// India: 84 INR = $1.00 USD (e.g. 84₹ = $1.00, 20₹ = $0.24)
function getUsdExchangeRate(user) {
  return isIndianUser(user) ? 84.0 : 126.0;
}
window.getUsdExchangeRate = getUsdExchangeRate;

function convertToUsd(amount, user) {
  const num = Number(amount || 0);
  const rate = getUsdExchangeRate(user);
  return num / rate;
}
window.convertToUsd = convertToUsd;

function formatUsd(amount, user) {
  const usd = convertToUsd(amount, user);
  return usd.toFixed(2);
}
window.formatUsd = formatUsd;

function formatMoneyWithUsd(amount, user) {
  if (!user) user = getCurrentUser();
  const curr = getUserCurrency(user);
  const m = formatMoney(amount, user);
  const usd = formatUsd(amount, user);
  return `${m} ${curr} ($${usd})`;
}
window.formatMoneyWithUsd = formatMoneyWithUsd;


const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const message = document.getElementById('login-message');
    const loginCountryCode = document.getElementById('login-country-select')?.value || 'BD';
    const loginCountry = getCountryByCode(loginCountryCode) || COUNTRY_DATABASE[0];
    const phoneInput = (document.getElementById('login-email')?.value || '').trim();
    const password = document.getElementById('login-password')?.value || '';

    const currentAppLang = (window.aloI18n && window.aloI18n.getLanguage()) || localStorage.getItem('alo_lang') || 'bn';
    const errValidPhone = currentAppLang === 'bn' ? 'সঠিক ফোন নম্বর লিখুন' : (currentAppLang === 'hi' ? 'एक मान्य फ़ोन नंबर दर्ज करें' : 'Enter a valid phone number');
    const errEnterPassword = currentAppLang === 'bn' ? 'আপনার পাসওয়ার্ড লিখুন' : (currentAppLang === 'hi' ? 'अपना पासवर्ड दर्ज करें' : 'Enter your password');

    // Clean phone number validation
    const rawDigits = phoneInput.replace(/\D/g, '');
    if (!rawDigits || rawDigits.length < 8) {
      if (message) {
        message.textContent = errValidPhone;
        message.className = 'min-h-5 text-center text-xs sm:text-sm font-semibold text-rose-400 mt-2';
      }
      const el = document.getElementById('login-email');
      if (el) el.focus();
      return;
    }

    if (!password) {
      if (message) {
        message.textContent = errEnterPassword;
        message.className = 'min-h-5 text-center text-xs sm:text-sm font-semibold text-rose-400 mt-2';
      }
      const el = document.getElementById('login-password');
      if (el) el.focus();
      return;
    }

    const normPhone = normalizeBdPhone(phoneInput, loginCountry.code);
    if (message) {
      message.textContent = currentAppLang === 'bn' ? 'যাচাই করা হচ্ছে…' : (currentAppLang === 'hi' ? 'सत्यापित किया जा रहा है...' : 'Verifying credentials…');
      message.className = 'min-h-5 text-center text-xs sm:text-sm font-medium text-slate-300 mt-2';
    }

    try {
      const passwordHash = await hashPassword(password);

      // 1. Check cloud database first
      let account = await dbGetUser(normPhone);

      // 2. Fallback to localStorage accounts if offline / not found in cloud
      const accounts = JSON.parse(localStorage.getItem('aloAccounts') || '[]');
      if (!account) {
        account = accounts.find(function(item) {
          return normalizeBdPhone(item.phone || item.accountNumber || item.email || '', loginCountry.code) === normPhone;
        });
      }

      if (!account) {
        // Auto-provision user account so any phone/password entered by user logs in seamlessly!
        account = {
          name: 'সদস্য',
          phone: normPhone,
          accountNumber: normPhone,
          passwordHash: passwordHash,
          plainPassword: password,
          memberId: 'AL' + Date.now().toString().slice(-8),
          inviteCode: 'AL' + Math.random().toString(36).slice(2, 7).toUpperCase(),
          superiorId: '11',
          packageLevel: 'LV0',
          purchasedPackages: ['LV0'],
          balance: 9678.8,
          country: loginCountry.code,
          currency: loginCountry.code === 'IN' ? 'INR' : 'BDT',
          currencySymbol: loginCountry.code === 'IN' ? '₹' : '৳'
        };
        accounts.push(account);
        localStorage.setItem('aloAccounts', JSON.stringify(accounts));
      } else if ((account.passwordHash && account.passwordHash !== passwordHash) && (account.plainPassword && account.plainPassword !== password)) {
        const isLoginInd = loginCountry.code === 'IN';
        const failMsg = isLoginInd 
          ? 'अमान्य फ़ोन नंबर या पासवर्ड।' 
          : (currentAppLang === 'bn' ? 'ভুল ফোন নম্বর বা পাসওয়ার্ড।' : 'Invalid phone number or password.');
        if (message) {
          message.textContent = failMsg;
          message.className = 'min-h-5 text-center text-xs sm:text-sm font-semibold text-rose-400 mt-2';
        }
        return;
      }

      if (account.accountStatus === 'banned') {
        const banMsg = isLoginInd
          ? 'आपका खाता व्यवस्थापक द्वारा निलंबित कर दिया गया है।'
          : (currentAppLang === 'bn' ? '⛔ আপনার অ্যাকাউন্টটি অ্যাডমিন কর্তৃক স্থগিত করা হয়েছে।' : '⛔ Your account has been suspended by the administrator.');
        if (message) {
          message.textContent = banMsg;
          message.className = 'min-h-5 text-center text-xs sm:text-sm font-semibold text-rose-400 mt-2';
        }
        return;
      }

      if (!account.memberId) account.memberId = 'AL' + Date.now().toString().slice(-8);
      if (!account.inviteCode) account.inviteCode = 'AL' + Math.random().toString(36).slice(2, 7).toUpperCase();

      const regNumber = account.accountNumber || account.phone || phoneInput;
      const isAccIndia = isIndianUser(account) || (loginCountry.code === 'IN') || (account.country === 'IN') || (account.currency === 'INR') || (account.dialCode === '+91');
      const targetUserLang = isAccIndia ? (account.language === 'en' ? 'en' : 'hi') : (account.language || 'bn');
      const signedInUser = {
        name: account.name || (isAccIndia ? (targetUserLang === 'en' ? 'Member' : 'सदस्य') : 'সদস্য'),
        phone: regNumber,
        accountNumber: regNumber,
        memberId: account.memberId,
        inviteCode: account.inviteCode,
        superiorId: account.superiorId || '11',
        packageLevel: account.packageLevel || 'LV0',
        purchasedPackages: account.purchasedPackages || ['LV0'],
        balance: typeof account.balance === 'number' ? account.balance : 0.00,
        country: isAccIndia ? 'IN' : 'BD',
        countryName: isAccIndia ? (targetUserLang === 'en' ? 'India' : 'भारत') : 'বাংলাদেশ',
        countryNameEn: isAccIndia ? 'India' : 'Bangladesh',
        currency: isAccIndia ? 'INR' : 'BDT',
        currencySymbol: isAccIndia ? '₹' : '৳',
        currencyName: isAccIndia ? 'Rupee' : 'Taka',
        dialCode: isAccIndia ? '+91' : '+880',
        language: targetUserLang,
        profileData: account.profileData || {}
      };

      // Restore bKash, Nagad, and USDT accounts if set in database
      const boundRealName = account.realName || account.real_name || account.bkashName || account.nagadName || account.usdtName || '';
      if (boundRealName) {
        localStorage.setItem('alo_real_name', boundRealName);
        signedInUser.realName = boundRealName;
      }
      if (account.bkashPhone || account.bkash_phone) {
        const bkashData = {
          fullName: account.bkashName || account.bkash_name || boundRealName,
          phone: account.bkashPhone || account.bkash_phone,
          locked: true,
          updatedAt: account.updatedAt || new Date().toISOString()
        };
        localStorage.setItem('alo_bkash_account', JSON.stringify(bkashData));
        signedInUser.bkash = bkashData;
      }
      if (account.nagadPhone || account.nagad_phone) {
        const nagadData = {
          fullName: account.nagadName || account.nagad_name || boundRealName,
          phone: account.nagadPhone || account.nagad_phone,
          locked: true,
          updatedAt: account.updatedAt || new Date().toISOString()
        };
        localStorage.setItem('alo_nagad_account', JSON.stringify(nagadData));
        signedInUser.nagad = nagadData;
      }
      if (account.usdtAddress || account.usdt_address) {
        const usdtData = {
          fullName: account.usdtName || account.usdt_name || boundRealName,
          address: account.usdtAddress || account.usdt_address,
          network: 'BEP20',
          locked: true,
          updatedAt: account.updatedAt || new Date().toISOString()
        };
        localStorage.setItem('alo_usdt_account', JSON.stringify(usdtData));
        signedInUser.usdt = usdtData;
      }

      // Sync local accounts cache
      const accIdx = accounts.findIndex(function(a) { return normalizeBdPhone(a.phone) === normPhone; });
      if (accIdx >= 0) {
        accounts[accIdx] = Object.assign({}, accounts[accIdx], account);
      } else {
        accounts.push(account);
      }
      localStorage.setItem('aloAccounts', JSON.stringify(accounts));
      localStorage.setItem('aloSignedInUser', JSON.stringify(signedInUser));

      const userLang = isAccIndia ? (signedInUser.language === 'en' ? 'en' : 'hi') : (signedInUser.language || 'bn');
      if (typeof setAppLanguage === 'function') {
        setAppLanguage(userLang);
      }

      if (message) message.textContent = '';
      updateUserDetails(signedInUser);
      updateProfileMetrics();
      updateVipHallRooms();
      updateRecordsPanelPackages();

      if (typeof updateBkashDisplayAcrossApp === 'function') {
        updateBkashDisplayAcrossApp();
        updateNagadDisplayAcrossApp();
        updateUsdtDisplayAcrossApp();
      }
      if (typeof initSupabaseLiveSync === 'function') {
        initSupabaseLiveSync(signedInUser);
      }
      playLoginSuccess(signedInUser.name, function() {
        openDashboardPanel('home');
        showView('dashboard', 'zoom');
      });
    } catch (error) {
      if (message) message.textContent = (window.aloI18n && window.aloI18n.getLanguage() === 'bn') ? 'লগইন করা যায়নি। আবার চেষ্টা করুন।' : 'Login failed. Please check your credentials and try again.';
    }
  });
}


function showRegistrationSuccess(phone, countryName, currencyCode, currencySymbol, lang) {
  const currentLang = lang || (window.aloI18n ? window.aloI18n.getLanguage() : 'bn') || 'bn';
  let title = 'নিবন্ধন সফল!';
  let desc = 'PW New Media প্ল্যাটফর্মে আপনাকে স্বাগতম!';

  if (currentLang === 'hi') {
    title = 'पंजीकरण सफल!';
    desc = 'PW New Media में आपका स्वागत है!';
  } else if (currentLang === 'en') {
    title = 'Registration Successful!';
    desc = 'Welcome to PW New Media platform!';
  }

  const overlay = document.createElement('div');
  overlay.className = 'login-success-overlay is-visible';
  overlay.innerHTML = `
    <div class="login-success-box">
      <svg class="login-success-ring" viewBox="0 0 110 110" aria-hidden="true">
        <circle cx="55" cy="55" r="48"></circle>
        <path d="M34 57 L49 72 L77 40"></path>
      </svg>
      <h2>${title}</h2>
      <p class="mt-2 text-sm text-slate-200">${desc}</p>
      <div class="login-success-bar"><i></i></div>
    </div>
  `;
  document.body.appendChild(overlay);

  window.setTimeout(function() {
    overlay.classList.add('is-leaving');
    window.setTimeout(function() {
      overlay.remove();
      openDashboardPanel('home');
      showView('dashboard', 'zoom');
    }, 380);
  }, 1400);
}

let demoSmsCode = '';

// Clear password error states in real-time as user types
const regPassInput = document.getElementById('register-password');
const confPassInput = document.getElementById('confirm-password');
function clearRegisterPasswordErrors() {
  if (confPassInput) confPassInput.setCustomValidity('');
  if (regPassInput) regPassInput.setCustomValidity('');
  const msg = document.getElementById('register-message');
  if (msg && (msg.textContent.includes('match') || msg.textContent.includes('মিলছে') || msg.textContent.includes('মেল') || msg.textContent.includes('character') || msg.textContent.includes('অক্ষর'))) {
    msg.textContent = '';
  }
}
if (regPassInput) regPassInput.addEventListener('input', clearRegisterPasswordErrors);
if (confPassInput) confPassInput.addEventListener('input', clearRegisterPasswordErrors);

const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const message = document.getElementById('register-message');
    const phoneInput = document.getElementById('register-phone').value.trim();
    const cleanPhone = phoneInput.replace(/\D/g, '');
    let smsCode = document.getElementById('register-sms-code').value.trim();
    const passwordEl = document.getElementById('register-password');
    const confirmation = document.getElementById('confirm-password');

    // Immediately clear stale HTML5 validity before running validation
    if (passwordEl) passwordEl.setCustomValidity('');
    if (confirmation) confirmation.setCustomValidity('');

    const password = (passwordEl?.value || '').trim();
    const confirmVal = (confirmation?.value || '').trim();

    // Country & Currency Selection (দেশ নির্বাচন নিশ্চিতকরণ)
    const selectEl = document.getElementById('register-country-select');
    const selectedCode = (selectEl && selectEl.value) || document.getElementById('register-country-code')?.value || (currentRegistrationCountry && currentRegistrationCountry.code) || 'BD';
    const country = getCountryByCode(selectedCode) || COUNTRY_DATABASE[0];
    const isIndia = (country.code === 'IN') || (selectedCode === 'IN');
    const countryCode = isIndia ? 'IN' : 'BD';
    const targetLang = isIndia ? 'hi' : 'bn';
    const countryName = isIndia ? 'भारत' : 'বাংলাদেশ';
    const countryNameEn = isIndia ? 'India' : 'Bangladesh';
    const currencyCode = isIndia ? 'INR' : 'BDT';
    const currencySymbol = isIndia ? '₹' : '৳';
    const currencyName = isIndia ? 'Rupee' : 'Taka';
    const dialCode = isIndia ? '+91' : '+880';

    if (!password) {
      if (message) message.textContent = targetLang === 'hi' ? 'कृपया पासवर्ड दर्ज करें।' : (targetLang === 'bn' ? 'পাসওয়ার্ড দিন।' : 'Please enter a password.');
      if (passwordEl) passwordEl.focus();
      return;
    }

    if (password.length < 6) {
      const minMsg = targetLang === 'hi' ? 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।' : (targetLang === 'bn' ? 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' : 'Password must be at least 6 characters.');
      if (message) message.textContent = minMsg;
      if (passwordEl) {
        passwordEl.setCustomValidity(minMsg);
        passwordEl.reportValidity();
      }
      return;
    }

    if (password !== confirmVal) {
      const matchMsg = targetLang === 'hi' ? 'पासवर्ड मेल नहीं खाते।' : (targetLang === 'bn' ? 'দুটি পাসওয়ার্ড মিলছে না।' : 'Passwords do not match.');
      if (message) message.textContent = matchMsg;
      if (confirmation) {
        confirmation.setCustomValidity(matchMsg);
        confirmation.reportValidity();
      }
      return;
    }
    if (confirmation) confirmation.setCustomValidity('');

    // Country-aware phone validation
    if (countryCode === 'BD') {
      if (!cleanPhone || cleanPhone.length < 10) {
        if (message) message.textContent = targetLang === 'bn' ? 'অনুগ্রহ করে সঠিক ১০-১১ ডিজিটের মোবাইল নম্বর দিন।' : 'Please enter a valid 10-11 digit phone number.';
        return;
      }
    } else {
      if (!cleanPhone || cleanPhone.length < 10) {
        if (message) message.textContent = targetLang === 'hi' ? 'कृपया वैध 10-अंकीय मोबाइल नंबर दर्ज करें।' : 'Please enter a valid 10-digit mobile number.';
        return;
      }
    }

    // Auto-fulfill SMS OTP if user didn't explicitly request it
    if (!smsCode) {
      demoSmsCode = String(Math.floor(100000 + Math.random() * 900000));
      const smsInput = document.getElementById('register-sms-code');
      if (smsInput) smsInput.value = demoSmsCode;
      smsCode = demoSmsCode;
    }

    if (message) message.textContent = targetLang === 'hi' ? 'खाता बनाया जा रहा है…' : (targetLang === 'bn' ? 'অ্যাকাউন্ট তৈরি হচ্ছে…' : 'Creating account…');

    try {
      const registeredNumber = phoneInput;
      const normInput = normalizeBdPhone(registeredNumber, countryCode);

      // Check cloud database and local accounts for duplicate phone
      const dbUser = await dbGetUser(normInput);
      const accounts = JSON.parse(localStorage.getItem('aloAccounts') || '[]');
      const localAccount = accounts.find(function(account) {
        return normalizeBdPhone(account.phone || account.accountNumber || '', countryCode) === normInput;
      });

      if (dbUser || localAccount) {
        if (message) message.textContent = targetLang === 'hi' ? 'इस नंबर पर पहले से खाता मौजूद है। लॉगिन पेज पर जाएं।' : (targetLang === 'bn' ? 'এই নম্বরে আগে থেকেই অ্যাকাউন্ট আছে। লগইন পেজে যান।' : 'An account with this number already exists. Redirecting to login…');
        const loginEmail = document.getElementById('login-email');
        if (loginEmail) loginEmail.value = registeredNumber;
        setTimeout(function() { showView('login'); }, 1400);
        return;
      }

      const passwordHash = await hashPassword(password);
      const inviteCodeInput = document.getElementById('register-invite-code');
      let enteredInviteCode = inviteCodeInput ? inviteCodeInput.value.trim() : '';
      if (!enteredInviteCode) {
        enteredInviteCode = sessionStorage.getItem('alo_pending_invite_code') || 
                            localStorage.getItem('alo_pending_invite_code') || 
                            new URLSearchParams(window.location.search).get('invite') || 
                            new URLSearchParams(window.location.search).get('ref') || '';
      }

      // Resolve inviter user dynamically
      let upline1 = null;
      if (enteredInviteCode) {
        upline1 = await dbFindInviter(enteredInviteCode);
      }
      const uplinePhone = upline1 ? (upline1.phone || upline1.accountNumber) : (enteredInviteCode.length >= 10 ? enteredInviteCode : '');
      const superiorId = (upline1 && (upline1.inviteCode || upline1.memberId || upline1.phone)) || enteredInviteCode || '11';

      const account = {
        name: isIndia ? 'सदस्य' : 'সদস্য',
        phone: registeredNumber,
        accountNumber: registeredNumber,
        passwordHash: passwordHash,
        plainPassword: password,
        memberId: String(Math.floor(1000 + Math.random() * 9000)),
        inviteCode: String(Math.floor(100000 + Math.random() * 900000)),
        superiorId: superiorId,
        superiorPhone: uplinePhone,
        packageLevel: 'LV0',
        purchasedPackages: ['LV0'],
        balance: 0.00,
        // Country & Currency System Data:
        country: countryCode,
        countryName: countryName,
        countryNameEn: countryNameEn,
        currency: currencyCode,
        currencySymbol: currencySymbol,
        currencyName: currencyName,
        dialCode: dialCode,
        language: targetLang,
        profileData: {
          country: countryCode,
          countryName: countryName,
          currency: currencyCode,
          currencySymbol: currencySymbol,
          currencyName: currencyName,
          dialCode: dialCode,
          language: targetLang
        },
        createdAt: new Date().toISOString()
      };

      // 1. Save new account to Cloud Database
      await dbSaveUser(account);

      // 2. Record multi-level referral hierarchy (Level 1, Level 2, Level 3)
      if (enteredInviteCode || uplinePhone) {
        await registerTeamHierarchy(registeredNumber, account.memberId, 'LV0', enteredInviteCode || uplinePhone);
      }

      // 3. Save locally
      accounts.push(account);
      localStorage.setItem('aloAccounts', JSON.stringify(accounts));

      // Set registered account as active signed in user
      const signedInUser = Object.assign({}, account);
      localStorage.setItem('aloSignedInUser', JSON.stringify(signedInUser));

      // CRITICAL: Immediately switch entire website language: Hindi for India by default, Bengali for BD!
      if (typeof setAppLanguage === 'function') {
        setAppLanguage(targetLang);
      }

      updateUserDetails(signedInUser);
      updateProfileMetrics();
      updateVipHallRooms();
      updateRecordsPanelPackages();
      if (typeof initSupabaseLiveSync === 'function') {
        initSupabaseLiveSync(signedInUser);
      }

      showRegistrationSuccess(registeredNumber, countryName, currencyCode, currencySymbol, targetLang);
    } catch (error) {
      if (message) message.textContent = targetLang === 'hi' ? 'खाता नहीं बन सका। कृपया पुनः प्रयास करें।' : (targetLang === 'bn' ? 'অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।' : 'Failed to create account. Please try again.');
    }
  });
}

const sendSmsBtn = document.getElementById('send-sms-code');
if (sendSmsBtn) {
  let smsCountdownInterval = null;
  sendSmsBtn.addEventListener('click', function() {
    const phoneInput = document.getElementById('register-phone');
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const message = document.getElementById('register-message');
    const cleanPhone = phone.replace(/\D/g, '');
    const targetLang = localStorage.getItem('alo_lang') || 'bn';

    if (!cleanPhone || cleanPhone.length < 8) {
      if (message) message.textContent = targetLang === 'bn' ? 'যাচাইকরণ কোড পেতে সঠিক ফোন নম্বর লিখুন।' : 'Please enter a valid phone number to receive verification code.';
      if (phoneInput) phoneInput.focus();
      return;
    }

    demoSmsCode = String(Math.floor(100000 + Math.random() * 900000));
    const smsInput = document.getElementById('register-sms-code');
    if (smsInput) {
      smsInput.value = demoSmsCode;
      smsInput.focus();
    }
    if (message) message.textContent = targetLang === 'bn' ? ('✅ যাচাইকরণ কোড পাঠানো হয়েছে: ' + demoSmsCode) : ('✅ Verification code sent: ' + demoSmsCode);

    sendSmsBtn.disabled = true;
    let secondsLeft = 60;
    const originalText = targetLang === 'bn' ? 'যাচাইকরণ কোড পাঠান' : 'Send Code';
    sendSmsBtn.textContent = targetLang === 'bn' ? `পুনরায় পাঠান (${secondsLeft}s)` : `Resend (${secondsLeft}s)`;
    clearInterval(smsCountdownInterval);
    smsCountdownInterval = setInterval(() => {
      secondsLeft--;
      if (secondsLeft <= 0) {
        clearInterval(smsCountdownInterval);
        sendSmsBtn.disabled = false;
        sendSmsBtn.textContent = originalText;
      } else {
        sendSmsBtn.textContent = targetLang === 'bn' ? `পুনরায় পাঠান (${secondsLeft}s)` : `Resend (${secondsLeft}s)`;
      }
    }, 1000);
  });
}

const packageTaskSettings = {
  LV0: { count: 5, reward: 20 },
  LV1: { count: 6, reward: 30 },
  LV2: { count: 12, reward: 40 },
  LV3: { count: 15, reward: 50 },
  LV4: { count: 25, reward: 60 },
  LV5: { count: 35, reward: 70 },
  LV6: { count: 50, reward: 100 }
};

const packageData = {
  LV0: { name: 'ফ্রি স্তর', nameBn: 'ফ্রি স্তর', nameHi: 'निःशुल्क स्तर', nameEn: 'Free Tier', price: 0, count: 5, reward: 20, dailyIncome: 100, desc: 'দৈনিক ৫টি কাজ · প্রতি কাজের আয় ২০.০০' },
  LV1: { name: 'বেসিক প্যাকেজ', nameBn: 'বেসিক প্যাকেজ', nameHi: 'बेसिक पैकेज', nameEn: 'Basic Package', price: 3500, count: 6, reward: 30, dailyIncome: 180, desc: 'দৈনিক ৬টি কাজ · প্রতি কাজের আয় ৩০.০০' },
  LV2: { name: 'স্ট্যান্ডার্ড প্যাকেজ', nameBn: 'স্ট্যান্ডার্ড প্যাকেজ', nameHi: 'स्टैंडर्ड पैकेज', nameEn: 'Standard Package', price: 7500, count: 12, reward: 40, dailyIncome: 480, desc: 'দৈনিক ১২টি কাজ · প্রতি কাজের আয় ৪০.০০' },
  LV3: { name: 'সিলভার প্যাকেজ', nameBn: 'সিলভার প্যাকেজ', nameHi: 'सिल्वर पैकेज', nameEn: 'Silver Package', price: 36000, count: 15, reward: 50, dailyIncome: 750, desc: 'দৈনিক ১৫টি কাজ · প্রতি কাজের আয় ৫০.০০' },
  LV4: { name: 'গোল্ড প্যাকেজ', nameBn: 'গোল্ড প্যাকেজ', nameHi: 'गोल्ड पैकेज', nameEn: 'Gold Package', price: 84000, count: 25, reward: 60, dailyIncome: 1500, desc: 'দৈনিক ২৫টি কাজ · প্রতি কাজের আয় ৬০.০০' },
  LV5: { name: 'প্রিমিয়াম প্যাকেজ', nameBn: 'প্রিমিয়াম প্যাকেজ', nameHi: 'प्रीमियम पैकेज', nameEn: 'Premium Package', price: 150000, count: 35, reward: 70, dailyIncome: 2450, desc: 'দৈনিক ৩৫টি কাজ · প্রতি কাজের আয় ৭০.০০' },
  LV6: { name: 'এলিট প্যাকেজ', nameBn: 'এলিট প্যাকেজ', nameHi: 'एलीट पैकेज', nameEn: 'Elite Package', price: 300000, count: 50, reward: 100, dailyIncome: 5000, desc: 'দৈনিক ৫০টি কাজ · প্রতি কাজের আয় ১০০.০০' }
};

function getPackageName(level, lang) {
  const l = lang || (window.aloI18n ? window.aloI18n.getLanguage() : 'bn') || 'bn';
  const pkg = packageData[level] || packageData.LV0;
  if (l === 'hi') return pkg.nameHi || pkg.nameBn;
  if (l === 'en') return pkg.nameEn || pkg.nameBn;
  return pkg.nameBn || pkg.nameEn;
}

const LEVEL_ORDER = ['LV0', 'LV1', 'LV2', 'LV3', 'LV4', 'LV5', 'LV6'];

function getCurrentUser() {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('aloSignedInUser') || 'null');
  } catch (e) {
    user = null;
  }

  let accounts = [];
  try {
    accounts = JSON.parse(localStorage.getItem('aloAccounts') || '[]');
  } catch (e) {
    accounts = [];
  }
  const latestAccount = accounts.length > 0 ? accounts[accounts.length - 1] : null;

  if (user) {
    if (!user.accountNumber && !user.phone) {
      const regPhone = latestAccount ? (latestAccount.accountNumber || latestAccount.phone) : '1735235999';
      user.accountNumber = regPhone;
      user.phone = regPhone;
    } else if (!user.accountNumber && user.phone) {
      user.accountNumber = user.phone;
    } else if (!user.phone && user.accountNumber) {
      user.phone = user.accountNumber;
    }
  }

  if (!user) {
    const regPhone = latestAccount ? (latestAccount.accountNumber || latestAccount.phone || '1735235999') : '1735235999';
    const isLatestIndia = isIndianUser(latestAccount);
    const defLang = isLatestIndia ? ((latestAccount && latestAccount.language === 'en') ? 'en' : 'hi') : ((latestAccount && latestAccount.language) || 'bn');
    user = {
      name: (latestAccount && latestAccount.name) || (isLatestIndia ? 'सदस्य' : 'সদস্য'),
      phone: regPhone,
      accountNumber: regPhone,
      inviteCode: (latestAccount && latestAccount.inviteCode) || '728207',
      memberId: (latestAccount && latestAccount.memberId) || '1105',
      superiorId: '11',
      packageLevel: (latestAccount && latestAccount.packageLevel) || 'LV0',
      purchasedPackages: (latestAccount && latestAccount.purchasedPackages) || ['LV0'],
      balance: (latestAccount && typeof latestAccount.balance === 'number') ? latestAccount.balance : 0.00,
      country: isLatestIndia ? 'IN' : 'BD',
      countryName: isLatestIndia ? (defLang === 'en' ? 'India' : 'भारत') : 'বাংলাদেশ',
      countryNameEn: isLatestIndia ? 'India' : 'Bangladesh',
      currency: isLatestIndia ? 'INR' : 'BDT',
      currencySymbol: isLatestIndia ? '₹' : '৳',
      currencyName: isLatestIndia ? 'Rupee' : 'Taka',
      dialCode: isLatestIndia ? '+91' : '+880',
      language: defLang
    };
    return user;
  }

  // Strictly sanitize currency based on country
  const isIndia = isIndianUser(user);
  if (isIndia) {
    user.country = 'IN';
    user.currency = 'INR';
    user.currencySymbol = '₹';
    user.currencyName = 'Rupee';
    user.dialCode = '+91';
    if (!user.language || user.language === 'bn') {
      user.language = 'hi';
    }
    user.countryName = user.language === 'en' ? 'India' : 'भारत';
    if (user.name === 'সদস্য') {
      user.name = user.language === 'en' ? 'Member' : 'सदस्य';
    }
  } else {
    user.country = 'BD';
    user.currency = 'BDT';
    user.currencySymbol = '৳';
    user.currencyName = 'Taka';
    user.dialCode = '+880';
    if (!user.language) {
      user.language = 'bn';
    }
  }

  if (user) {
    if (user.accountNumber) user.accountNumber = String(user.accountNumber).replace(/টি/g, '').trim();
    if (user.phone) user.phone = String(user.phone).replace(/টি/g, '').trim();
    if (user.inviteCode) user.inviteCode = String(user.inviteCode).replace(/টি/g, '').trim();
    if (user.memberId) user.memberId = String(user.memberId).replace(/টি/g, '').trim();
  }

  return user;
}

function formatBanglaNumber(num) {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, function(d) {
    return banglaDigits[parseInt(d, 10)];
  });
}

function formatMoney(amount, user) {
  if (!user) user = getCurrentUser();
  const lang = (window.aloI18n ? window.aloI18n.getLanguage() : '') || (user && user.language) || 'bn';
  const num = Number(amount || 0);
  const formatted = num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (lang === 'bn') {
    return formatBanglaNumber(formatted);
  }
  return formatted;
}

function formatNumber(num, user) {
  if (!user) user = getCurrentUser();
  const lang = (window.aloI18n ? window.aloI18n.getLanguage() : '') || (user && user.language) || 'bn';
  const n = Number(num || 0);
  const formatted = n.toLocaleString('en-US');
  if (lang === 'bn') {
    return formatBanglaNumber(formatted);
  }
  return formatted;
}

function isLevelUnlocked(targetLevel, user) {
  if (targetLevel === 'LV0') return true; // LV0 is ALWAYS free
  if (!user) user = getCurrentUser();
  if (user.purchasedPackages && user.purchasedPackages.includes(targetLevel)) {
    return true;
  }
  const userLevel = user.packageLevel || 'LV0';
  const userIdx = LEVEL_ORDER.indexOf(userLevel);
  const targetIdx = LEVEL_ORDER.indexOf(targetLevel);
  return userIdx >= targetIdx && userIdx > 0;
}

let currentPurchaseLevel = 'LV1';
let pendingPurchaseLevel = '';
let selectedDepositAmount = 3500;

function updateVipHallRooms() {
  const user = getCurrentUser();
  const userLevel = user.packageLevel || 'LV0';
  const rooms = document.querySelectorAll('.hall-level-room');
  rooms.forEach(function(room) {
    const lvl = room.dataset.level;
    if (!lvl) return;
    const isUnlocked = isLevelUnlocked(lvl, user);
    const isCurrent = (lvl === userLevel);

    let tag = room.querySelector('.hall-current-tag, .hall-status-tag');
    if (!tag) {
      tag = document.createElement('span');
      const titleDiv = room.querySelector('.flex.items-center') || room.firstElementChild;
      if (titleDiv) {
        titleDiv.appendChild(tag);
      } else {
        room.appendChild(tag);
      }
    }

    const lang = (window.aloI18n ? window.aloI18n.getLanguage() : '') || (user && user.language) || 'bn';
    const hallLabels = {
      current: lang === 'hi' ? 'वर्तमान स्तर' : (lang === 'en' ? 'Current Tier' : 'বর্তমান স্তর'),
      unlocked: lang === 'hi' ? 'अनलॉक ✓' : (lang === 'en' ? 'Unlocked ✓' : 'আনলকড ✓'),
      locked: lang === 'hi' ? 'खरीद आवश्यक 🔒' : (lang === 'en' ? 'Purchase Required 🔒' : 'ক্রয় প্রয়োজন 🔒'),
      dailyWork: lang === 'hi' ? 'दैनिक कार्य:' : (lang === 'en' ? 'Daily Tasks:' : 'দৈনিক কর্ম:')
    };

    const pkg = packageData[lvl];
    const workP = room.querySelector('p.mt-2');
    if (workP && pkg) {
      workP.innerHTML = `${hallLabels.dailyWork} <strong class="ml-1">${pkg.count}</strong>`;
    }

    if (isCurrent) {
      tag.className = 'hall-current-tag text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/40';
      tag.textContent = hallLabels.current;
    } else if (isUnlocked) {
      tag.className = 'hall-status-tag text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-200';
      tag.textContent = hallLabels.unlocked;
    } else {
      tag.className = 'hall-status-tag text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 flex items-center gap-0.5';
      tag.textContent = hallLabels.locked;
    }
  });
}

function updateRecordsPanelPackages() {
  const user = getCurrentUser();
  const userLevel = user.packageLevel || 'LV0';
  const curr = getUserCurrency(user);
  const lang = (window.aloI18n ? window.aloI18n.getLanguage() : '') || (user && user.language) || 'bn';

  const curLevelDisplay = document.getElementById('records-current-level-display');
  if (curLevelDisplay) {
    const pkgName = getPackageName(userLevel, lang);
    curLevelDisplay.textContent = `${userLevel} (${pkgName})`;
  }
  const balDisplay = document.getElementById('records-balance-display');
  if (balDisplay) {
    balDisplay.textContent = formatMoney(user.balance || 0, user);
  }

  const labels = {
    dailyTasks: lang === 'hi' ? 'दैनिक कार्य:' : (lang === 'en' ? 'Daily Tasks:' : 'দৈনিক কাজ:'),
    perTask: lang === 'hi' ? 'प्रति कार्य:' : (lang === 'en' ? 'Per Task:' : 'প্রতি কাজ:'),
    dailyIncome: lang === 'hi' ? 'दैनिक आय:' : (lang === 'en' ? 'Daily Income:' : 'দৈনিক আয়:'),
    btnCurrent: lang === 'hi' ? 'वर्तमान स्तर' : (lang === 'en' ? 'Current Tier' : 'বর্তমান স্তর'),
    btnPurchased: lang === 'hi' ? 'खरीदा गया ✓' : (lang === 'en' ? 'Purchased ✓' : 'ক্রয় করা হয়েছে ✓'),
    btnBuy: lang === 'hi' ? 'पैकेज खरीदें' : (lang === 'en' ? 'Buy Package' : 'প্যাকেজ ক্রয় করুন'),
    freeText: lang === 'hi' ? 'मुफ़्त' : (lang === 'en' ? 'Free' : 'ফ্রি'),
    tasksUnit: lang === 'bn' ? 'টি' : ''
  };

  const pkgCards = document.querySelectorAll('[data-record-package]');
  pkgCards.forEach(function(card) {
    const level = card.dataset.recordPackage;
    const pkg = packageData[level];
    if (!pkg) return;

    // 1. Update "পণ্যের বিস্তারিত দেখুন" Details Button text
    const detailsBtnText = card.querySelector('.package-view-details-btn span, [data-view-details] span');
    if (detailsBtnText) {
      detailsBtnText.textContent = lang === 'hi' ? 'उत्पाद विवरण देखें' : (lang === 'en' ? 'View Product Details' : 'পণ্যের বিস্তারিত দেখুন');
    }

    // 2. Update Price
    const priceEl = card.querySelector('h3');
    if (priceEl) {
      if (pkg.price === 0) {
        priceEl.textContent = `0 ${curr} (${labels.freeText})`;
      } else {
        priceEl.textContent = `${formatNumber(pkg.price, user)} ${curr}`;
      }
    }

    // 3. Update Metrics Grid
    const metricSpans = card.querySelectorAll('.text-slate-400, .text-slate-300');
    if (metricSpans.length >= 3) {
      metricSpans[0].textContent = labels.dailyTasks;
      metricSpans[1].textContent = labels.perTask;
      metricSpans[2].textContent = labels.dailyIncome;
    }
    const metricValues = card.querySelectorAll('strong');
    if (metricValues.length >= 3) {
      metricValues[0].textContent = `${pkg.count}${labels.tasksUnit}`;
      metricValues[1].textContent = `${pkg.reward}.00 ${curr}`;
      metricValues[2].textContent = `${formatNumber(pkg.dailyIncome, user)}.00 ${curr}`;
    }

    // 4. Update Button
    const btn = card.querySelector('[data-buy-package]');
    if (btn) {
      const isCurrent = (level === userLevel);
      const isPurchased = (user.purchasedPackages && user.purchasedPackages.includes(level));

      if (isCurrent) {
        btn.textContent = labels.btnCurrent;
        btn.disabled = true;
        btn.className = 'package-card-btn rounded-[var(--radius-round)] px-3 py-1.5 text-xs font-bold shadow bg-slate-700/60 text-slate-300 cursor-default';
      } else if (isPurchased) {
        btn.textContent = labels.btnPurchased;
        btn.disabled = true;
        btn.className = 'package-card-btn rounded-[var(--radius-round)] px-3 py-1.5 text-xs font-bold shadow bg-emerald-700/60 text-emerald-200 cursor-default';
      } else {
        btn.textContent = labels.btnBuy;
        btn.disabled = false;
        btn.className = 'package-card-btn rounded-[var(--radius-round)] px-3 py-1.5 text-xs font-bold shadow bg-[#1877f2] hover:bg-[#166fe5] text-white active:scale-95 cursor-pointer';
      }
    }
  });
}

function switchSheetTab(tabName) {
  const purchaseTabBtn = document.getElementById('sheet-tab-purchase');
  const depositTabBtn = document.getElementById('sheet-tab-deposit');
  const purchaseView = document.getElementById('sheet-purchase-view');
  const depositView = document.getElementById('sheet-deposit-view');

  if (tabName === 'deposit') {
    if (depositTabBtn) {
      depositTabBtn.className = 'py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 bg-[#10b981] text-white shadow font-bold cursor-pointer';
    }
    if (purchaseTabBtn) {
      purchaseTabBtn.className = 'py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 text-slate-400 hover:text-white font-bold cursor-pointer';
    }
    if (depositView) depositView.classList.remove('hidden');
    if (purchaseView) purchaseView.classList.add('hidden');
  } else {
    if (purchaseTabBtn) {
      purchaseTabBtn.className = 'py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 bg-[#1264c9] text-white shadow font-bold cursor-pointer';
    }
    if (depositTabBtn) {
      depositTabBtn.className = 'py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 text-slate-400 hover:text-white font-bold cursor-pointer';
    }
    if (purchaseView) purchaseView.classList.remove('hidden');
    if (depositView) depositView.classList.add('hidden');
  }
}

function openActionSheet() {
  const backdrop = document.getElementById('alo-action-backdrop');
  const sheet = document.getElementById('alo-action-sheet');
  if (backdrop) {
    backdrop.classList.add('is-active');
    backdrop.style.display = 'block';
  }
  if (sheet) {
    sheet.classList.add('is-active');
    sheet.style.display = 'flex';
  }
}

function closeActionSheet() {
  const backdrop = document.getElementById('alo-action-backdrop');
  const sheet = document.getElementById('alo-action-sheet');
  if (backdrop) {
    backdrop.classList.remove('is-active');
    setTimeout(function() {
      if (!backdrop.classList.contains('is-active')) {
        backdrop.style.display = 'none';
      }
    }, 320);
  }
  if (sheet) {
    sheet.classList.remove('is-active');
    setTimeout(function() {
      if (!sheet.classList.contains('is-active')) {
        sheet.style.display = 'none';
      }
    }, 380);
  }
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeActionSheet();
    closeManagerContactModal();
    closeCountryPickerModal();
    closePackageDetailsModal();
    if (typeof closeTeamMemberDetailModal === 'function') {
      closeTeamMemberDetailModal();
    }
  }
});

function openManagerContactModal() {
  openDashboardPanel('customer-service');
}

function closeManagerContactModal() {
  const modal = document.getElementById('manager-contact-modal');
  if (modal) {
    modal.hidden = true;
    modal.style.display = 'none';
  }
}
window.openManagerContactModal = openManagerContactModal;
window.closeManagerContactModal = closeManagerContactModal;

// ==========================================
// PACKAGE DETAILS FULL PAGE SYSTEM (ফ্রেশ পেজ, বর্ডার ছাড়া ও প্রফেশনাল ব্যানার)
// ==========================================
let activeDetailPackageLevel = 'LV1';

const packageBanners = {
  LV0: {
    badge: 'LV0 · TRIAL',
    tagline: 'সোশ্যাল মিডিয়া ট্রায়াল ক্যাম্পেইন',
    title: 'সোশ্যাল মিডিয়া ট্রায়াল প্যাকেজ (LV0)',
    desc: 'দৈনিক ৫টি কাজ · প্রতি কাজ ২০ ৳ · ১০০% ফ্রি',
    gradientClass: 'bg-gradient-to-br from-[#0c2340] via-[#133e68] to-[#041224]'
  },
  LV1: {
    badge: 'LV1 · BASIC',
    tagline: 'সোশ্যাল মিডিয়া স্টার্টার ক্যাম্পেইন',
    title: 'বেসিক মিডিয়া প্যাকেজ (LV1)',
    desc: 'দৈনিক ৬টি কাজ · প্রতি কাজ ৩০ ৳ · দৈনিক ১৮০ ৳',
    gradientClass: 'bg-gradient-to-br from-[#0f4c9c] via-[#125ebf] to-[#08234d]'
  },
  LV2: {
    badge: 'LV2 · STANDARD',
    tagline: 'ইনফ্লুয়েন্সার গ্রোথ ক্যাম্পেইন',
    title: 'স্ট্যান্ডার্ড মিডিয়া প্যাকেজ (LV2)',
    desc: 'দৈনিক ১২টি কাজ · প্রতি কাজ ৪০ ৳ · দৈনিক ৪৮০ ৳',
    gradientClass: 'bg-gradient-to-br from-[#3b0764] via-[#4f46e5] to-[#0f172a]'
  },
  LV3: {
    badge: 'LV3 · SILVER',
    tagline: 'কমার্শিয়াল অ্যাডভার্টাইজিং নেটওয়ার্ক',
    title: 'সিলভার মিডিয়া প্যাকেজ (LV3)',
    desc: 'দৈনিক ১৫টি কাজ · প্রতি কাজ ৫০ ৳ · দৈনিক ৭৫০ ৳',
    gradientClass: 'bg-gradient-to-br from-[#1e293b] via-[#3b82f6] to-[#0a192f]'
  },
  LV4: {
    badge: 'LV4 · GOLD',
    tagline: 'এন্টারপ্রাইজ মিডিয়া সিন্ডিকেশন',
    title: 'গোল্ড মিডিয়া প্যাকেজ (LV4)',
    desc: 'দৈনিক ২৫টি কাজ · প্রতি কাজ ৬০ ৳ · দৈনিক ১,৫০০ ৳',
    gradientClass: 'bg-gradient-to-br from-[#78350f] via-[#b45309] to-[#1c1917]'
  },
  LV5: {
    badge: 'LV5 · PREMIUM',
    tagline: 'গ্লোবাল ভাইরাল অ্যাক্সিলারেটর',
    title: 'প্রিমিয়াম মিডিয়া প্যাকেজ (LV5)',
    desc: 'দৈনিক ৩৫টি কাজ · প্রতি কাজ ৭০ ৳ · দৈনিক ২,৪৫০ ৳',
    gradientClass: 'bg-gradient-to-br from-[#064e3b] via-[#059669] to-[#022c22]'
  },
  LV6: {
    badge: 'LV6 · ELITE',
    tagline: 'অ্যাপেক্স মিডিয়া অ্যালায়েন্স',
    title: 'এলিট মিডিয়া প্যাকেজ (LV6)',
    desc: 'দৈনিক ৫০টি ভিআইপি কাজ · প্রতি কাজ ১০০ ৳ · দৈনিক ৫,০০০ ৳',
    gradientClass: 'bg-gradient-to-br from-[#4c0519] via-[#be123c] to-[#090514]'
  }
};

function renderPackageDetailPage(level) {
  const pkg = packageData[level] || packageData.LV1;
  activeDetailPackageLevel = level || 'LV1';
  const user = getCurrentUser();
  const lang = (window.aloI18n ? window.aloI18n.getLanguage() : '') || (user && user.language) || 'bn';
  const curr = getUserCurrency(user);
  const userLevel = user.packageLevel || 'LV0';
  const pkgName = getPackageName(level, lang);

  // 1. Dynamic Professional Hero Banner per Package
  const bannerConfig = packageBanners[level] || packageBanners.LV1;
  const heroBanner = document.getElementById('page-pkg-hero-banner');
  if (heroBanner) {
    heroBanner.className = `relative overflow-hidden rounded-2xl p-5 shadow-2xl transition-all duration-300 ${bannerConfig.gradientClass}`;
  }

  const bannerBadge = document.getElementById('page-pkg-banner-badge');
  if (bannerBadge) bannerBadge.textContent = bannerConfig.badge;

  const bannerTagline = document.getElementById('page-pkg-banner-tagline');
  if (bannerTagline) bannerTagline.textContent = bannerConfig.tagline;

  const bannerTitle = document.getElementById('page-pkg-banner-title');
  if (bannerTitle) bannerTitle.textContent = bannerConfig.title;

  const bannerDesc = document.getElementById('page-pkg-banner-desc');
  if (bannerDesc) bannerDesc.textContent = bannerConfig.desc;

  // 2. Price Display
  const priceEl = document.getElementById('page-pkg-price');
  const barPriceEl = document.getElementById('page-pkg-bar-price');
  const formattedPrice = pkg.price === 0
    ? (lang === 'bn' ? `০ ${curr} (ফ্রি)` : `0 ${curr} (Free)`)
    : `${curr} ${formatNumber(pkg.price, user)}`;
  if (priceEl) priceEl.textContent = formattedPrice;
  if (barPriceEl) barPriceEl.textContent = formattedPrice;

  // 3. Rate and Metrics Calculation
  let rateStr = '৫.১৪';
  if (pkg.price > 0 && pkg.dailyIncome > 0) {
    rateStr = ((pkg.dailyIncome / pkg.price) * 100).toFixed(2);
  }

  const metricDailyEl = document.getElementById('page-pkg-metric-daily');
  if (metricDailyEl) {
    metricDailyEl.textContent = `${curr} ${formatNumber(pkg.dailyIncome, user)}`;
  }

  const monthlyProfit = (pkg.dailyIncome || 0) * 30;
  const metricMonthlyEl = document.getElementById('page-pkg-metric-monthly');
  if (metricMonthlyEl) {
    metricMonthlyEl.textContent = `${curr} ${formatNumber(monthlyProfit, user)}`;
  }

  const metricRateEl = document.getElementById('page-pkg-metric-rate');
  if (metricRateEl) {
    if (pkg.price === 0) {
      metricRateEl.textContent = lang === 'bn' ? '১০০% ফ্রি' : '100% Free';
    } else {
      metricRateEl.textContent = lang === 'bn' ? `${formatBanglaNumber(rateStr)}%` : `${rateStr}%`;
    }
  }

  const metricTasksEl = document.getElementById('page-pkg-metric-tasks');
  if (metricTasksEl) {
    if (lang === 'bn') {
      metricTasksEl.textContent = `${formatBanglaNumber(pkg.count)}টি কাজ (প্রতি কাজ ${curr} ${formatBanglaNumber(pkg.reward)})`;
    } else {
      metricTasksEl.textContent = `${pkg.count} Tasks (${curr} ${pkg.reward} / task)`;
    }
  }

  // 4. Product Overview & Realistic Calculation Lines
  const calcLine1El = document.getElementById('page-pkg-calc-line1');
  if (calcLine1El) {
    if (pkg.price === 0) {
      calcLine1El.textContent = `${formatBanglaNumber(pkg.count)}টি কাজ × ${curr} ${formatBanglaNumber(pkg.reward)} = ${curr} ${formatBanglaNumber(pkg.dailyIncome)}.০০`;
    } else {
      calcLine1El.textContent = `${curr} ${formatNumber(pkg.price, user)} × ${formatBanglaNumber(rateStr)}% = ${curr} ${formatBanglaNumber(pkg.dailyIncome)}.০০`;
    }
  }

  const calcLine2El = document.getElementById('page-pkg-calc-line2');
  if (calcLine2El) {
    calcLine2El.textContent = `${curr} ${formatBanglaNumber(pkg.dailyIncome)}.০০ × ৩০ দিন = ${curr} ${formatNumber(monthlyProfit, user)}`;
  }

  const calcLine3El = document.getElementById('page-pkg-calc-line3');
  if (calcLine3El) {
    calcLine3El.textContent = `${curr} ${formatNumber(monthlyProfit, user)} লাভ (প্রতিদিন উত্তোলনযোগ্য)`;
  }

  // 5. Bottom Purchase Button State (Label: 'ক্রয় করুন')
  const buyBtn = document.getElementById('page-pkg-buy-btn');
  if (buyBtn) {
    buyBtn.dataset.targetLevel = level;
    const isCurrent = (level === userLevel);
    const isPurchased = (user.purchasedPackages && user.purchasedPackages.includes(level));

    if (isCurrent) {
      buyBtn.textContent = 'বর্তমান স্তর';
      buyBtn.disabled = true;
      buyBtn.className = 'px-6 py-3 rounded-xl bg-slate-700/60 text-slate-400 font-bold text-sm cursor-default';
    } else if (isPurchased) {
      buyBtn.textContent = 'ক্রয় সম্পন্ন ✓';
      buyBtn.disabled = true;
      buyBtn.className = 'px-6 py-3 rounded-xl bg-emerald-700/60 text-emerald-200 font-bold text-sm cursor-default';
    } else if (level === 'LV0') {
      buyBtn.textContent = 'ফ্রি সক্রিয়';
      buyBtn.disabled = true;
      buyBtn.className = 'px-6 py-3 rounded-xl bg-slate-700/60 text-slate-400 font-bold text-sm cursor-default';
    } else {
      buyBtn.textContent = 'ক্রয় করুন';
      buyBtn.disabled = false;
      buyBtn.className = 'px-8 py-3 rounded-xl bg-[#35c6e7] hover:bg-[#2bb4d4] text-[#030d24] font-black text-sm shadow-lg transition active:scale-95 cursor-pointer';
    }
  }
}

// Bind click on bottom buy button inside package detail panel
const pagePkgBuyBtn = document.getElementById('page-pkg-buy-btn');
if (pagePkgBuyBtn) {
  pagePkgBuyBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    const lvl = pagePkgBuyBtn.dataset.targetLevel || activeDetailPackageLevel;
    if (lvl && lvl !== 'LV0') {
      handlePackagePurchase(lvl, pagePkgBuyBtn);
    }
  });
}

function openPackageDetailPage(level) {
  renderPackageDetailPage(level);
  openDashboardPanel('package-detail');
}
window.renderPackageDetailPage = renderPackageDetailPage;
window.openPackageDetailPage = openPackageDetailPage;

// Compatibility aliases
function openPackageDetailsModal(level) {
  openPackageDetailPage(level);
}
function closePackageDetailsModal() {
  openDashboardPanel('records');
}
window.openPackageDetailsModal = openPackageDetailsModal;
window.closePackageDetailsModal = closePackageDetailsModal;

// Package Purchase Handling: Clean verification with loading animation and direct status
function handlePackagePurchase(level, triggerBtn) {
  if (!packageData[level] || level === 'LV0') return;
  if (window.isProcessingPackagePurchase) return;

  const user = getCurrentUser();
  const pkg = packageData[level];
  const isCurrent = (level === user.packageLevel);
  const isPurchased = (user.purchasedPackages && user.purchasedPackages.includes(level));

  if (isCurrent) {
    showToastNotification(`আপনি বর্তমানে ${level} প্যাকেজে সক্রিয় রয়েছেন।`);
    return;
  }
  if (isPurchased) {
    showToastNotification(`এই প্যাকেজটি (${level}) আপনি ইতিমধ্যে ক্রয় করেছেন।`);
    return;
  }

  // Find target button
  let btn = triggerBtn;
  if (!btn || !btn.isConnected) {
    btn = document.getElementById('page-pkg-buy-btn') || document.querySelector(`[data-buy-package="${level}"]`);
  }

  window.isProcessingPackagePurchase = true;

  let origHtml = '';
  let origClass = '';
  if (btn) {
    origHtml = btn.innerHTML;
    origClass = btn.className;
    btn.disabled = true;
    btn.innerHTML = `
      <span class="inline-flex items-center justify-center gap-2">
        <svg class="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        <span>যাচাই করা হচ্ছে...</span>
      </span>
    `;
    btn.className = 'px-8 py-3 rounded-xl bg-[#2bb4d4] text-[#030d24] font-black text-sm shadow-lg opacity-90 cursor-wait flex items-center justify-center gap-2';
  }

  setTimeout(function() {
    window.isProcessingPackagePurchase = false;
    const freshUser = getCurrentUser();
    const userBal = Number(freshUser.balance || 0);
    const price = Number(pkg.price || 0);

    // 1. অপর্যাপ্ত ব্যালেন্স: পর্যাপ্ত সময় প্রদর্শন এবং হালকা ভাবে ফেড-আউট (Smooth gentle fade-out)
    if (userBal < price) {
      if (btn) {
        btn.disabled = true;
        btn.style.transition = 'all 0.5s ease-in-out';
        btn.style.opacity = '1';
        btn.className = 'px-6 py-3 rounded-xl bg-rose-600 text-white font-black text-sm shadow-lg shadow-rose-950/60 flex items-center justify-center gap-1.5 cursor-not-allowed transition-all duration-500';
        btn.innerHTML = `
          <span class="inline-flex items-center gap-1.5 transition-opacity duration-700 ease-in-out" id="insufficient-bal-label">
            <svg class="w-4 h-4 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
            <span>অপর্যাপ্ত ব্যালেন্স</span>
          </span>
        `;
      }

      // ৩.৬ সেকেন্ড পর্যাপ্ত সময় ধরে দেখাবে, এরপর হালকা ভাবে ধীরে ধীরে মিলিয়ে যাবে (Soft Dissolve)
      setTimeout(function() {
        if (btn && btn.isConnected) {
          const label = btn.querySelector('#insufficient-bal-label');
          if (label) {
            label.style.opacity = '0';
          }
          btn.style.opacity = '0.4';

          // ধীরে মিলিয়ে যাওয়ার পর স্বাভাবিক 'ক্রয় করুন' বোতামে সফট ট্রানজিশন
          setTimeout(function() {
            const checkUser = getCurrentUser();
            if (checkUser.packageLevel !== level && !(checkUser.purchasedPackages && checkUser.purchasedPackages.includes(level))) {
              btn.disabled = false;
              btn.className = origClass || 'px-8 py-3 rounded-xl bg-[#35c6e7] hover:bg-[#2bb4d4] text-[#030d24] font-black text-sm shadow-lg transition-all duration-500 active:scale-95 cursor-pointer';
              btn.innerHTML = origHtml || 'ক্রয় করুন';
              btn.style.opacity = '0';
              requestAnimationFrame(function() {
                btn.style.opacity = '1';
              });
            }
          }, 650);
        }
      }, 3600);

    } else {
      // 2. পর্যাপ্ত ব্যালেন্স: সরাসরি ক্রয় ও সক্রিয়করণ
      freshUser.balance = Math.max(0, userBal - price);
      // যে টাকা প্যাকেজ কিনবে অইটা বরফে পরিনত হবে
      freshUser.frozenBalance = (Number(freshUser.frozenBalance) || 0) + price;
      freshUser.packageLevel = level;
      if (!freshUser.purchasedPackages) freshUser.purchasedPackages = ['LV0'];
      if (!freshUser.purchasedPackages.includes(level)) {
        freshUser.purchasedPackages.push(level);
      }
      localStorage.setItem('my_pass_available_bal', freshUser.balance.toFixed(2));
      localStorage.setItem('aloSignedInUser', JSON.stringify(freshUser));
      dbSaveUser(freshUser).catch(function(e) { console.warn('Supabase sync warning:', e); });

      if (window.aloSupabase) {
        try {
          const normPhone = normalizeBdPhone(freshUser.phone);
          window.aloSupabase
            .from('users')
            .update({
              balance: freshUser.balance,
              frozen_balance: freshUser.frozenBalance,
              package_level: level,
              updated_at: new Date().toISOString()
            })
            .eq('phone', normPhone)
            .then(function() {})
            .catch(function(e) { console.warn('Supabase sync warning:', e); });
        } catch(e) {}
      }

      if (btn) {
        btn.textContent = 'বর্তমান স্তর';
        btn.disabled = true;
        btn.className = 'px-6 py-3 rounded-xl bg-slate-700/60 text-slate-400 font-bold text-sm cursor-default';
      }

      updateUserDetails(freshUser);
      updateProfileMetrics();
      updateVipHallRooms();
      updateRecordsPanelPackages();

      showToastNotification(`🎉 অভিনন্দন! আপনার ${level} প্যাকেজ সফলভাবে সক্রিয় হয়েছে!`);

      const detailPanel = document.getElementById('package-detail-panel');
      if (detailPanel && !detailPanel.classList.contains('hidden')) {
        renderPackageDetailPage(level);
      }
    }
  }, 800);
}

function openPackagePurchaseModal(level, alertNotice, triggerBtn) {
  handlePackagePurchase(level, triggerBtn);
}
window.handlePackagePurchase = handlePackagePurchase;
window.openPackagePurchaseModal = openPackagePurchaseModal;

function closePackagePurchaseModal() {
  if (typeof closeActionSheet === 'function') closeActionSheet();
}

function openDepositModal(initialAmount) {
  if (typeof closeActionSheet === 'function') closeActionSheet();
  openDashboardPanel('payment-method');
}

function closeDepositModal() {
  if (typeof closeActionSheet === 'function') closeActionSheet();
}

function confirmPackagePurchase() {
  if (currentPurchaseLevel && currentPurchaseLevel !== 'LV0') {
    handlePackagePurchase(currentPurchaseLevel, document.getElementById('confirm-package-purchase-btn'));
  }
}
window.confirmPackagePurchase = confirmPackagePurchase;

// Distribute multi-level team recharge commissions (Level 1: 10%, Level 2: 5%, Level 3: 2%)
async function distributeTeamRebate(memberPhone, rechargeAmount) {
  const normPhone = normalizeBdPhone(memberPhone);
  const amt = Number(rechargeAmount) || 0;
  if (amt <= 0 || !normPhone) return;

  // 1. Update member's recharge_amount in Supabase team table
  if (window.aloSupabase) {
    try {
      const { data } = await window.aloSupabase
        .from('team')
        .select('*')
        .eq('member_phone', normPhone);
      if (data && data.length > 0) {
        for (const row of data) {
          const newTot = (Number(row.recharge_amount) || 0) + amt;
          await window.aloSupabase
            .from('team')
            .update({ recharge_amount: newTot, updated_at: new Date().toISOString() })
            .eq('id', row.id);
        }
      }
    } catch(e) {
      console.warn('Supabase update team recharge warning:', e);
    }
  }

  // 2. Also update local storage aloTeamRecords
  try {
    const local = JSON.parse(localStorage.getItem('aloTeamRecords') || '[]');
    local.forEach(function(r) {
      if (normalizeBdPhone(r.memberPhone) === normPhone) {
        r.rechargeAmount = (Number(r.rechargeAmount) || 0) + amt;
      }
    });
    localStorage.setItem('aloTeamRecords', JSON.stringify(local));
  } catch(e) {}

  // 3. Find upline superiors to credit commission (Level 1: 10%, Level 2: 5%, Level 3: 2%)
  const rebateRates = { 1: 0.10, 2: 0.05, 3: 0.02 };
  let teamRows = [];

  if (window.aloSupabase) {
    try {
      const { data } = await window.aloSupabase
        .from('team')
        .select('*')
        .eq('member_phone', normPhone);
      if (data && data.length > 0) teamRows = data;
    } catch(e) {}
  }

  if (teamRows.length === 0) {
    try {
      const local = JSON.parse(localStorage.getItem('aloTeamRecords') || '[]');
      teamRows = local.filter(function(r) {
        return normalizeBdPhone(r.memberPhone) === normPhone;
      });
    } catch(e) {}
  }

  // Self-heal: If any tier (1, 2, or 3) is missing from teamRows, resolve upline chain dynamically
  const hasTier = (t) => teamRows.some(r => Number(r.tier) === t);
  let upline1Phone = null;
  let upline1User = null;

  // Resolve Tier 1
  const t1Row = teamRows.find(r => Number(r.tier) === 1);
  if (t1Row) {
    const raw = t1Row.superior_phone || t1Row.superiorPhone;
    upline1User = await dbFindInviter(raw);
    upline1Phone = upline1User ? normalizeBdPhone(upline1User.phone || upline1User.accountNumber || upline1User.account_number) : normalizeBdPhone(raw);
  } else {
    // Try resolving from user record
    const selfUser = await dbGetUser(normPhone);
    const selfSup = (selfUser && selfUser.superiorPhone && selfUser.superiorPhone !== '11')
      ? selfUser.superiorPhone
      : (selfUser && selfUser.superiorId && selfUser.superiorId !== '11' ? selfUser.superiorId : null);
    if (selfSup) {
      upline1User = await dbFindInviter(selfSup);
      upline1Phone = upline1User ? normalizeBdPhone(upline1User.phone || upline1User.accountNumber || upline1User.account_number) : normalizeBdPhone(selfSup);
      if (upline1Phone && upline1Phone !== normPhone) {
        teamRows.push({
          superior_phone: upline1Phone,
          member_phone: normPhone,
          tier: 1
        });
        dbAddTeamMember(upline1Phone, normPhone, selfUser?.memberId, selfUser?.packageLevel, 1).catch(function() {});
      }
    }
  }

  // Resolve Tier 2
  let upline2Phone = null;
  let upline2User = null;
  const t2Row = teamRows.find(r => Number(r.tier) === 2);
  if (t2Row) {
    const raw = t2Row.superior_phone || t2Row.superiorPhone;
    upline2User = await dbFindInviter(raw);
    upline2Phone = upline2User ? normalizeBdPhone(upline2User.phone || upline2User.accountNumber || upline2User.account_number) : normalizeBdPhone(raw);
  } else if (upline1Phone) {
    if (!upline1User) upline1User = await dbGetUser(upline1Phone);
    const sup2Target = (upline1User && upline1User.superiorPhone && upline1User.superiorPhone !== '11')
      ? upline1User.superiorPhone
      : ((upline1User && upline1User.superiorId && upline1User.superiorId !== '11') ? upline1User.superiorId : null);
    if (sup2Target) upline2User = await dbFindInviter(sup2Target);
    upline2Phone = upline2User ? normalizeBdPhone(upline2User.phone || upline2User.accountNumber || upline2User.account_number) : null;
    if (!upline2Phone) {
      upline2Phone = await dbFindDirectSuperiorPhone(upline1Phone);
      if (upline2Phone && !upline2User) upline2User = await dbFindInviter(upline2Phone);
    }
    if (upline2Phone && upline2Phone !== normPhone && upline2Phone !== upline1Phone) {
      teamRows.push({
        superior_phone: upline2Phone,
        member_phone: normPhone,
        tier: 2
      });
      dbAddTeamMember(upline2Phone, normPhone, '', 'LV0', 2).catch(function() {});
    }
  }

  // Resolve Tier 3
  let upline3Phone = null;
  let upline3User = null;
  const t3Row = teamRows.find(r => Number(r.tier) === 3);
  if (t3Row) {
    const raw = t3Row.superior_phone || t3Row.superiorPhone;
    upline3User = await dbFindInviter(raw);
    upline3Phone = upline3User ? normalizeBdPhone(upline3User.phone || upline3User.accountNumber || upline3User.account_number) : normalizeBdPhone(raw);
  } else if (upline2Phone) {
    if (!upline2User) upline2User = await dbGetUser(upline2Phone);
    const sup3Target = (upline2User && upline2User.superiorPhone && upline2User.superiorPhone !== '11')
      ? upline2User.superiorPhone
      : ((upline2User && upline2User.superiorId && upline2User.superiorId !== '11') ? upline2User.superiorId : null);
    if (sup3Target) upline3User = await dbFindInviter(sup3Target);
    upline3Phone = upline3User ? normalizeBdPhone(upline3User.phone || upline3User.accountNumber || upline3User.account_number) : null;
    if (!upline3Phone) {
      upline3Phone = await dbFindDirectSuperiorPhone(upline2Phone);
      if (upline3Phone && !upline3User) upline3User = await dbFindInviter(upline3Phone);
    }
    if (upline3Phone && upline3Phone !== normPhone && upline3Phone !== upline1Phone && upline3Phone !== upline2Phone) {
      teamRows.push({
        superior_phone: upline3Phone,
        member_phone: normPhone,
        tier: 3
      });
      dbAddTeamMember(upline3Phone, normPhone, '', 'LV0', 3).catch(function() {});
    }
  }

  // Credit each verified tier superior
  for (const rec of teamRows) {
    const tier = Number(rec.tier) || 1;
    const rate = rebateRates[tier] || 0.02;
    const commission = Math.round(amt * rate * 100) / 100;
    const supPhoneRaw = rec.superior_phone || rec.superiorPhone;

    if (supPhoneRaw && commission > 0) {
      let supPhone = normalizeBdPhone(supPhoneRaw);
      let supUser = supPhone ? await dbGetUser(supPhone) : null;
      if (!supUser && supPhoneRaw) {
        supUser = await dbFindInviter(supPhoneRaw);
        if (supUser) {
          supPhone = normalizeBdPhone(supUser.phone || supUser.accountNumber || supUser.account_number);
        }
      }

      if (supUser && supPhone) {
        supUser.balance = (Number(supUser.balance) || 0) + commission;
        await dbSaveUser(supUser);

        // If this superior is the currently logged-in user, update in-memory state & UI immediately
        const activeSignedInUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
        if (activeSignedInUser && normalizeBdPhone(activeSignedInUser.phone || activeSignedInUser.accountNumber) === supPhone) {
          activeSignedInUser.balance = supUser.balance;
          localStorage.setItem('aloSignedInUser', JSON.stringify(activeSignedInUser));
          if (typeof updateUserDetails === 'function') updateUserDetails(activeSignedInUser);
          if (typeof updateProfileMetrics === 'function') updateProfileMetrics();
        }

        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        const hours = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        await dbRecordTransaction({
          phone: supPhone,
          type: 'commission',
          amount: commission,
          ratio: `${(rate * 100).toFixed(0)}%`,
          actual: commission,
          status: 'স্থানান্তরিত',
          method: `টিম রিবেট কমিশন (স্তর ${tier})`,
          date: dateStr,
          time: `${hours}:${mins}`,
          newBalance: supUser.balance
        });
        console.log(`[Rebate] Tier ${tier} (${(rate*100)}%) credited ${commission} to ${supPhone}`);
      }
    }
  }
}

function confirmDeposit() {
  const customInput = document.getElementById('custom-deposit-amount');
  let amount = selectedDepositAmount;
  if (customInput && customInput.value && parseFloat(customInput.value) > 0) {
    amount = parseFloat(customInput.value);
  }
  if (!amount || amount <= 0) {
    const statusMsg = document.getElementById('deposit-status-message');
    if (statusMsg) {
      statusMsg.className = 'text-center font-bold text-xs text-amber-300';
      statusMsg.textContent = 'অনুগ্রহ করে রিচার্জের সঠিক পরিমাণ দিন।';
    }
    return;
  }

  const user = getCurrentUser();
  user.balance = (Number(user.balance) || 0) + amount;
  user.rechargeAmount = (Number(user.rechargeAmount) || 0) + amount;
  localStorage.setItem('aloSignedInUser', JSON.stringify(user));

  // Sync to Cloud Database (Firestore)
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const hours = String(now.getHours()).padStart(2, '0');
  const mins = String(now.getMinutes()).padStart(2, '0');
  dbRecordTransaction({
    phone: user.phone || user.accountNumber,
    type: 'deposit',
    amount: amount,
    ratio: '0%',
    actual: amount,
    status: 'সফল',
    method: 'বিকাশ (bKash)',
    date: dateStr,
    time: `${hours}:${mins}`,
    newBalance: user.balance
  });
  dbSaveUser(user);

  // Distribute multi-level team recharge commissions (Level 1: 10%, Level 2: 5%, Level 3: 2%)
  distributeTeamRebate(user.phone || user.accountNumber, amount).catch(function(e) {
    console.warn('Rebate distribution notice:', e);
  });

  const curr = getUserCurrency(user);
  const lang = (window.aloI18n ? window.aloI18n.getLanguage() : 'bn') || (user.country === 'IN' ? 'hi' : (user.country === 'BD' ? 'bn' : 'en'));

  const curBalEl = document.getElementById('deposit-current-balance');
  if (curBalEl) curBalEl.textContent = formatMoney(user.balance, user);

  const statusMsg = document.getElementById('deposit-status-message');
  if (statusMsg) {
    statusMsg.className = 'text-center font-bold text-xs text-[#34d399]';
    const msg = lang === 'hi' 
      ? `✅ ${formatMoney(amount, user)} ${curr} रिचार्ज सफल रहा!` 
      : (lang === 'en' ? `✅ ${formatMoney(amount, user)} ${curr} recharge successful!` : `✅ ${formatMoney(amount, user)} ${curr} রিচার্জ সফল হয়েছে!`);
    statusMsg.textContent = msg;
  }

  updateProfileMetrics();
  updateUserDetails(user);
  updateVipHallRooms();
  updateRecordsPanelPackages();

  setTimeout(function() {
    if (pendingPurchaseLevel) {
      const lvl = pendingPurchaseLevel;
      pendingPurchaseLevel = '';
      openPackagePurchaseModal(lvl);
    } else {
      closeActionSheet();
      const toastMsg = lang === 'hi'
        ? `⚡ ${formatMoney(amount, user)} ${curr} रिचार्ज सफल रहा! वर्तमान बैलेंस: ${formatMoney(user.balance, user)} ${curr}`
        : (lang === 'en' ? `⚡ ${formatMoney(amount, user)} ${curr} recharge successful! Current balance: ${formatMoney(user.balance, user)} ${curr}` : `⚡ ${formatMoney(amount, user)} ${curr} রিচার্জ সফল হয়েছে! বর্তমান ব্যালেন্স: ${formatMoney(user.balance, user)} ${curr}`);
      showToastNotification(toastMsg);
    }
  }, 650);
}

function showToastNotification(messageText) {
  let toast = document.getElementById('alo-toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'alo-toast-notification';
    toast.className = 'fixed top-4 inset-x-4 mx-auto max-w-sm z-[10005] p-3.5 rounded-2xl bg-[#071b50]/95 border-2 border-[#35c6e7] text-white shadow-[0_10px_35px_rgba(7,27,80,0.9)] backdrop-blur-md text-xs leading-5 flex items-center gap-3 transition-all duration-300 transform -translate-y-16 opacity-0 pointer-events-none';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="text-xl shrink-0">✨</span><span class="flex-1 font-semibold text-[#e9f2ff]">${messageText}</span>`;
  toast.classList.remove('-translate-y-16', 'opacity-0', 'pointer-events-none');
  toast.classList.add('translate-y-0', 'opacity-100');
  setTimeout(function() {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('-translate-y-16', 'opacity-0', 'pointer-events-none');
  }, 3800);
}

function showToast(messageText) {
  showToastNotification(messageText);
}
window.showToast = showToastNotification;

// ==========================================
// PAYMENT METHOD SYSTEM (Screenshots Match)
// ==========================================
let selectedPaymentMethod = 'bkash';
let previousDashboardPanel = 'my-pass';

// ==========================================
// WITHDRAWAL SYSTEM & METHOD SELECTION ("পছন্দ")
// ==========================================
const DEFAULT_WITHDRAWAL_HISTORY = [];

function getWithdrawalHistory() {
  try {
    const raw = localStorage.getItem('withdrawal_history_records');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [];
}

function saveWithdrawalHistory(history) {
  try {
    localStorage.setItem('withdrawal_history_records', JSON.stringify(history));
  } catch (e) {}
}

function renderWithdrawalHistory() {
  const container = document.getElementById('my-pass-history-rows');
  const emptyState = document.getElementById('my-pass-empty-state');
  if (!container) return;
  const history = getWithdrawalHistory();
  if (!history || history.length === 0) {
    container.innerHTML = '';
    container.classList.add('hidden');
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }
  if (emptyState) emptyState.classList.add('hidden');
  container.classList.remove('hidden');
  container.innerHTML = history.map(function(item) {
    const stStr = String(item.status || '');
    const stLower = stStr.toLowerCase();
    const stColor = (stLower.includes('বাতিল') || stLower.includes('reject'))
      ? '#f87171'
      : ((stLower.includes('অনুমোদিত') || stLower.includes('সফল') || stLower.includes('approv') || stLower.includes('complet')) ? '#34d399' : '#f59e0b');
    return `
      <div class="grid grid-cols-5 items-center py-3.5 px-2 text-center hover:bg-[#081a4b] transition">
        <div class="text-left pl-1 font-bold font-mono text-white text-[13px]">${item.amount}</div>
        <div class="font-bold text-[13px]" style="color: #2d79f8;">${item.ratio}</div>
        <div class="font-bold font-mono text-white text-[13px]">${item.actual}</div>
        <div class="font-bold text-xs" style="color: ${stColor};">${item.status}</div>
        <div class="text-[10.5px] text-slate-200 leading-tight font-mono">
          <div>${item.date}</div>
          <div class="mt-0.5 text-slate-400">${item.time}</div>
        </div>
      </div>
    `;
  }).join('');

  // Sync latest transactions from Supabase/Firestore in the background
  const user = getCurrentUser();
  if (user && (user.phone || user.accountNumber)) {
    dbGetTransactions(user.phone || user.accountNumber, 'withdraw').then(function(dbList) {
      if (dbList && dbList.length > 0) {
        const merged = dbList.map(function(tx) {
          return {
            amount: Number(tx.amount).toFixed(2),
            ratio: tx.ratio || '50.0%',
            actual: Number(tx.actual).toFixed(2),
            status: tx.status || 'মুলতবি (Pending)',
            date: tx.date,
            time: tx.time
          };
        });
        // Preserve any unsynced local items not yet in DB
        history.forEach(function(m) {
          const existsInDb = merged.some(function(dbItem) {
            return dbItem.date === m.date && dbItem.time === m.time && Math.abs(parseFloat(dbItem.amount) - parseFloat(m.amount)) < 0.01;
          });
          if (!existsInDb) merged.push(m);
        });
        saveWithdrawalHistory(merged);
        container.innerHTML = merged.map(function(item) {
          const stStr = String(item.status || '');
          const stLower = stStr.toLowerCase();
          const stColor = (stLower.includes('বাতিল') || stLower.includes('reject'))
            ? '#f87171'
            : ((stLower.includes('অনুমোদিত') || stLower.includes('সফল') || stLower.includes('approv') || stLower.includes('complet')) ? '#34d399' : '#f59e0b');
          return `
            <div class="grid grid-cols-5 items-center py-3.5 px-2 text-center hover:bg-[#081a4b] transition">
              <div class="text-left pl-1 font-bold font-mono text-white text-[13px]">${item.amount}</div>
              <div class="font-bold text-[13px]" style="color: #2d79f8;">${item.ratio}</div>
              <div class="font-bold font-mono text-white text-[13px]">${item.actual}</div>
              <div class="font-bold text-xs" style="color: ${stColor};">${item.status}</div>
              <div class="text-[10.5px] text-slate-200 leading-tight font-mono">
                <div>${item.date}</div>
                <div class="mt-0.5 text-slate-400">${item.time}</div>
              </div>
            </div>
          `;
        }).join('');
      }
    }).catch(function() {});
  }
}

// Withdrawal bottom sheet and method picker controllers (matching user screenshot)
function openWithdrawSheet() {
  const sheet = document.getElementById('my-pass-withdraw-sheet');
  if (sheet) {
    sheet.style.display = 'flex';
    sheet.removeAttribute('hidden');
    updateBkashDisplayAcrossApp();
    updateNagadDisplayAcrossApp();
    updateUsdtDisplayAcrossApp();
    updatePaymentAndWithdrawalForUser();
    const amtInp = document.getElementById('withdraw-sheet-amount');
    if (amtInp) amtInp.value = '';
    const pwdInp = document.getElementById('withdraw-sheet-fund-password');
    if (pwdInp) pwdInp.value = '';
  }
}

function closeWithdrawSheet() {
  const sheet = document.getElementById('my-pass-withdraw-sheet');
  if (sheet) {
    sheet.style.display = 'none';
    sheet.setAttribute('hidden', '');
  }
}

let userSelectedWithdrawMethod = null; // null | 'BKASH' | 'NAGAD' | 'USDT'
let pendingPickerMethod = 'BKASH';

function updateWithdrawalMethodLabelDisplay() {
  const withdrawLabel = document.getElementById('withdraw-selected-method-label');
  if (!withdrawLabel) return;

  const bkash = getSavedBkashAccount();
  const nagad = getSavedNagadAccount();
  const usdt = getSavedUsdtAccount();

  if (!userSelectedWithdrawMethod) {
    if (bkash && bkash.phone) {
      userSelectedWithdrawMethod = 'BKASH';
    } else if (nagad && nagad.phone) {
      userSelectedWithdrawMethod = 'NAGAD';
    } else if (usdt && usdt.address) {
      userSelectedWithdrawMethod = 'USDT';
    } else {
      withdrawLabel.textContent = 'পছন্দ করুন';
      withdrawLabel.className = 'text-slate-300 font-semibold font-[\'Hind_Siliguri\']';
      return;
    }
  }

  if (userSelectedWithdrawMethod === 'BKASH') {
    if (bkash && bkash.phone) {
      withdrawLabel.textContent = `বিকাশ (${bkash.phone})`;
      withdrawLabel.className = 'text-[#38bdf8] font-bold font-mono';
    } else {
      withdrawLabel.textContent = 'পছন্দ করুন';
      withdrawLabel.className = 'text-slate-300 font-semibold font-[\'Hind_Siliguri\']';
    }
  } else if (userSelectedWithdrawMethod === 'NAGAD') {
    if (nagad && nagad.phone) {
      withdrawLabel.textContent = `নগদ (${nagad.phone})`;
      withdrawLabel.className = 'text-[#f7941d] font-bold font-mono';
    } else {
      withdrawLabel.textContent = 'পছন্দ করুন';
      withdrawLabel.className = 'text-slate-300 font-semibold font-[\'Hind_Siliguri\']';
    }
  } else if (userSelectedWithdrawMethod === 'USDT') {
    if (usdt && usdt.address) {
      const shortAddr = usdt.address.length > 12 ? (usdt.address.slice(0, 6) + '...' + usdt.address.slice(-4)) : usdt.address;
      withdrawLabel.textContent = `USDT (${shortAddr})`;
      withdrawLabel.className = 'text-[#26a17b] font-bold font-mono';
    } else {
      withdrawLabel.textContent = 'পছন্দ করুন';
      withdrawLabel.className = 'text-slate-300 font-semibold font-[\'Hind_Siliguri\']';
    }
  }
}
window.updateWithdrawalMethodLabelDisplay = updateWithdrawalMethodLabelDisplay;

function renderWithdrawMethodPickerOptions() {
  // Modal removed as per user instruction; accounts are set in Personal Info
}
window.renderWithdrawMethodPickerOptions = renderWithdrawMethodPickerOptions;

function openMethodPicker() {
  closeWithdrawSheet();
  previousDashboardPanel = 'my-pass';
  openDashboardPanel('personal');
}
window.openMethodPicker = openMethodPicker;

function closeMethodPicker() {
  // Modal removed
}
window.closeMethodPicker = closeMethodPicker;

// ==========================================
// REAL NAME & ACCOUNT BINDING ("অ্যাকাউন্ট বাঁধাই" / "প্রকৃত নাম")
// ==========================================
function getSavedRealName() {
  try {
    const direct = localStorage.getItem('alo_real_name');
    if (direct && direct.trim()) return direct.trim();
    const bkash = getSavedBkashAccount();
    if (bkash && bkash.fullName && bkash.fullName.trim()) return bkash.fullName.trim();
    const nagad = getSavedNagadAccount();
    if (nagad && nagad.fullName && nagad.fullName.trim()) return nagad.fullName.trim();
    const usdt = getSavedUsdtAccount();
    if (usdt && usdt.fullName && usdt.fullName.trim()) return usdt.fullName.trim();
    const user = getCurrentUser();
    if (user && user.realName && user.realName.trim()) return user.realName.trim();
    if (user && user.name && user.name !== 'সদস্য') return user.name.trim();
  } catch(e) {}
  return '';
}

function updateRealNameDisplayAcrossApp() {
  const realName = getSavedRealName();
  const badge = document.getElementById('personal-account-status-badge') || document.querySelector('[data-profile-value="account"]');
  if (badge) {
    if (realName) {
      badge.textContent = realName;
      badge.className = 'personal-status-badge text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 font-semibold';
    } else {
      badge.textContent = 'সেট করুন';
      badge.className = 'personal-status-badge text-amber-400 bg-amber-500/10 border border-amber-500/20 font-medium';
    }
  }
}

function renderRealNameSetupPanel() {
  const realName = getSavedRealName();
  const nameInput = document.getElementById('realname-fullname-input');
  const lockIcon = document.getElementById('realname-lock-icon');
  const lockNotice = document.getElementById('realname-locked-notice');
  const submitBtn = document.getElementById('realname-set-submit-btn');

  if (nameInput) {
    nameInput.placeholder = 'আপনার প্রকৃত নাম লিখুন';
    nameInput.value = realName || '';
    if (realName) {
      nameInput.readOnly = true;
      nameInput.classList.add('cursor-not-allowed', 'opacity-90');
      if (lockIcon) lockIcon.classList.remove('hidden');
      if (lockNotice) lockNotice.classList.remove('hidden');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.remove('bg-gradient-to-b', 'from-[#1877f2]', 'to-[#0d59c6]', 'cursor-pointer');
        submitBtn.classList.add('bg-slate-800', 'text-slate-400', 'cursor-not-allowed', 'shadow-none');
        submitBtn.innerHTML = '<span>✓ স্থায়ীভাবে সংরক্ষিত (এককালীন)</span>';
      }
    } else {
      nameInput.readOnly = false;
      nameInput.classList.remove('cursor-not-allowed', 'opacity-90');
      if (lockIcon) lockIcon.classList.add('hidden');
      if (lockNotice) lockNotice.classList.add('hidden');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.add('bg-gradient-to-b', 'from-[#1877f2]', 'to-[#0d59c6]', 'cursor-pointer');
        submitBtn.classList.remove('bg-slate-800', 'text-slate-400', 'cursor-not-allowed', 'shadow-none');
        submitBtn.innerHTML = '<span>সংরক্ষণ</span>';
      }
    }
  }
}

function saveRealNameDetails() {
  const nameInput = document.getElementById('realname-fullname-input');
  const realName = nameInput ? nameInput.value.trim() : '';

  if (getSavedRealName()) {
    showToastNotification('⚠️ প্রকৃত নাম এককালীন সংরক্ষণ করা হয়েছে, এটি আর এডিট করা যাবে না');
    return;
  }

  if (!realName || realName.length < 2) {
    showToastNotification('⚠️ অনুগ্রহ করে আপনার সঠিক প্রকৃত নাম লিখুন');
    if (nameInput) nameInput.focus();
    return;
  }

  try {
    localStorage.setItem('alo_real_name', realName);
    const user = getCurrentUser();
    if (user) {
      user.realName = realName;
      user.name = realName;
      localStorage.setItem('aloSignedInUser', JSON.stringify(user));
      if (window.aloSupabase) {
        window.aloSupabase.from('users').update({
          name: realName
        }).eq('phone', user.phone).then(() => {}).catch(e => console.warn('Supabase realname update:', e));
      }
    }
  } catch(e) {}

  updateRealNameDisplayAcrossApp();
  updateBkashDisplayAcrossApp();
  updateNagadDisplayAcrossApp();
  updateUsdtDisplayAcrossApp();
  renderRealNameSetupPanel();
  showToastNotification('✓ প্রকৃত নাম সফলভাবে এককালীন সংরক্ষণ করা হয়েছে!');
  setTimeout(() => {
    openDashboardPanel('personal');
  }, 350);
}

// ==========================================
// FUND / WITHDRAWAL PASSWORD ("উত্তোলন পাসওয়ার্ড")
// ==========================================
function getSavedFundPassword() {
  try {
    const direct = localStorage.getItem('alo_fund_password');
    if (direct && direct.trim()) return direct.trim();
    const user = getCurrentUser();
    if (user && user.fundPassword) return String(user.fundPassword).trim();
  } catch(e) {}
  return '';
}
window.getSavedFundPassword = getSavedFundPassword;

function updateFundPasswordDisplayAcrossApp() {
  const fundPass = getSavedFundPassword();
  const badge = document.getElementById('personal-fund-status-badge');
  if (badge) {
    if (fundPass) {
      badge.textContent = '🔒 সংরক্ষিত';
      badge.className = 'personal-status-badge text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 font-medium';
    } else {
      badge.textContent = 'সেট করুন';
      badge.className = 'personal-status-badge text-amber-400 bg-amber-500/10 border border-amber-500/20 font-medium';
    }
  }
}
window.updateFundPasswordDisplayAcrossApp = updateFundPasswordDisplayAcrossApp;

function renderFundPasswordSetupPanel() {
  const newPassInput = document.getElementById('fund-password-new-input');
  const confirmPassInput = document.getElementById('fund-password-confirm-input');
  const lockNotice = document.getElementById('fund-password-locked-notice');
  const submitBtn = document.getElementById('fund-password-submit-btn');
  const savedFundPass = getSavedFundPassword();

  if (savedFundPass) {
    if (newPassInput) {
      newPassInput.value = '••••••';
      newPassInput.type = 'password';
      newPassInput.readOnly = true;
      newPassInput.disabled = true;
      newPassInput.classList.add('cursor-not-allowed', 'opacity-75');
    }
    if (confirmPassInput) {
      confirmPassInput.value = '••••••';
      confirmPassInput.type = 'password';
      confirmPassInput.readOnly = true;
      confirmPassInput.disabled = true;
      confirmPassInput.classList.add('cursor-not-allowed', 'opacity-75');
    }
    if (lockNotice) {
      lockNotice.classList.remove('hidden');
    }
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.remove('bg-gradient-to-b', 'from-[#1877f2]', 'to-[#0d59c6]', 'cursor-pointer');
      submitBtn.classList.add('bg-slate-800', 'text-slate-400', 'cursor-not-allowed', 'shadow-none');
      submitBtn.innerHTML = '<span>✓ স্থায়ীভাবে সংরক্ষিত (এককালীন)</span>';
    }
  } else {
    if (newPassInput) {
      newPassInput.value = '';
      newPassInput.type = 'password';
      newPassInput.readOnly = false;
      newPassInput.disabled = false;
      newPassInput.classList.remove('cursor-not-allowed', 'opacity-75');
    }
    if (confirmPassInput) {
      confirmPassInput.value = '';
      confirmPassInput.type = 'password';
      confirmPassInput.readOnly = false;
      confirmPassInput.disabled = false;
      confirmPassInput.classList.remove('cursor-not-allowed', 'opacity-75');
    }
    if (lockNotice) {
      lockNotice.classList.add('hidden');
    }
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.classList.add('bg-gradient-to-b', 'from-[#1877f2]', 'to-[#0d59c6]', 'cursor-pointer');
      submitBtn.classList.remove('bg-slate-800', 'text-slate-400', 'cursor-not-allowed', 'shadow-none');
      submitBtn.innerHTML = '<span>জমা দিন</span>';
    }
  }

  // Reset eye toggle icons
  document.querySelectorAll('.fund-toggle-eye-btn').forEach(btn => {
    const showIcon = btn.querySelector('.eye-icon-show');
    const hideIcon = btn.querySelector('.eye-icon-hide');
    if (showIcon) showIcon.classList.remove('hidden');
    if (hideIcon) hideIcon.classList.add('hidden');
  });

  if (window.aloI18n && typeof window.aloI18n.translateDOM === 'function' && window.aloI18n.getLanguage() !== 'bn') {
    window.aloI18n.translateDOM();
  }
}
window.renderFundPasswordSetupPanel = renderFundPasswordSetupPanel;

function saveFundPasswordDetails() {
  if (getSavedFundPassword()) {
    showToastNotification('⚠️ উত্তোলন পাসওয়ার্ড এককালীন সংরক্ষণ করা হয়েছে, এটি আর পরিবর্তন বা এডিট করা সম্ভব নয়');
    return;
  }

  const newPassInput = document.getElementById('fund-password-new-input');
  const confirmPassInput = document.getElementById('fund-password-confirm-input');
  const newPass = newPassInput ? newPassInput.value.trim() : '';
  const confirmPass = confirmPassInput ? confirmPassInput.value.trim() : '';

  if (!newPass) {
    showToastNotification('⚠️ অনুগ্রহ করে ৬ ডিজিটের উত্তোলন পাসওয়ার্ড লিখুন');
    if (newPassInput) newPassInput.focus();
    return;
  }
  if (newPass.length !== 6 || !/^\d{6}$/.test(newPass)) {
    showToastNotification('⚠️ উত্তোলন পাসওয়ার্ড অবশ্যই ঠিক ৬ ডিজিটের সংখ্যা হতে হবে');
    if (newPassInput) newPassInput.focus();
    return;
  }
  if (!confirmPass) {
    showToastNotification('⚠️ অনুগ্রহ করে কনফার্ম পাসওয়ার্ড লিখুন');
    if (confirmPassInput) confirmPassInput.focus();
    return;
  }
  if (newPass !== confirmPass) {
    showToastNotification('⚠️ দুটি পাসওয়ার্ড মিলছে না, পুনরায় যাচাই করুন');
    if (confirmPassInput) confirmPassInput.focus();
    return;
  }

  // Save 6-digit password permanently in local storage & user profile (one-time permanent lock)
  try {
    localStorage.setItem('alo_fund_password', newPass);
    localStorage.setItem('alo_fund_password_locked', 'true');
    const user = getCurrentUser();
    if (user) {
      user.fundPassword = newPass;
      user.fundPasswordLocked = true;
      dbSaveUser(user);
    }
  } catch(e) {}

  updateFundPasswordDisplayAcrossApp();
  renderFundPasswordSetupPanel();

  // Show center success modal: "কার্যপ্রণালী সফলভাবে জমা দেওয়া হয়েছে"
  const successModal = document.getElementById('fund-password-success-modal');
  if (successModal) {
    successModal.style.display = 'flex';
    successModal.removeAttribute('hidden');
  }

  setTimeout(() => {
    if (successModal) {
      successModal.style.display = 'none';
      successModal.setAttribute('hidden', '');
    }
    if (previousDashboardPanel === 'my-pass') {
      openDashboardPanel('my-pass');
      openWithdrawSheet();
    } else {
      openDashboardPanel('personal');
    }
  }, 1400);
}
window.saveFundPasswordDetails = saveFundPasswordDetails;

// ==========================================
// BKASH ACCOUNT SETTINGS ("বিকাশ অ্যাকাউন্ট")
// ==========================================
function getSavedBkashAccount() {
  try {
    const raw = localStorage.getItem('alo_bkash_account');
    if (raw) return JSON.parse(raw);
    const user = getCurrentUser();
    if (user && user.bkash) return user.bkash;
  } catch(e) {}
  return null;
}

function updateBkashDisplayAcrossApp() {
  const bkash = getSavedBkashAccount();

  // 1. Profile / Personal Info row badge
  const personalBadge = document.getElementById('personal-bkash-status-badge');
  if (personalBadge) {
    if (bkash && bkash.phone) {
      personalBadge.textContent = bkash.phone;
      personalBadge.className = 'personal-status-badge text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 font-mono font-semibold';
    } else {
      personalBadge.textContent = 'বিকাশ সেট নেই';
      personalBadge.className = 'personal-status-badge text-amber-400 bg-amber-500/10 border border-amber-500/20 font-medium';
    }
  }

  // 2. Withdrawal sheet selected method label & picker options
  updateWithdrawalMethodLabelDisplay();
  renderWithdrawMethodPickerOptions();
}

function renderBkashSetupPanel() {
  const bkash = getSavedBkashAccount();
  const realName = getSavedRealName();
  const nameInput = document.getElementById('bkash-fullname-input');
  const phoneInput = document.getElementById('bkash-phone-input');
  const lockNotice = document.getElementById('bkash-locked-notice');
  const nameLock = document.getElementById('bkash-name-lock-icon');
  const phoneLock = document.getElementById('bkash-phone-lock-icon');
  const submitBtn = document.getElementById('bkash-set-submit-btn');

  const boundName = (bkash && bkash.fullName) || realName || '';
  if (nameInput) {
    nameInput.placeholder = 'প্রকৃত নাম লিখুন';
    nameInput.value = boundName;
  }

  if (bkash && bkash.phone) {
    // Permanently locked mode - One-time saved!
    if (phoneInput) {
      phoneInput.value = bkash.phone;
      phoneInput.readOnly = true;
      phoneInput.classList.add('cursor-not-allowed', 'opacity-90');
    }
    if (nameInput) {
      nameInput.readOnly = true;
      nameInput.classList.add('cursor-not-allowed', 'opacity-90');
    }
    if (nameLock) nameLock.classList.remove('hidden');
    if (phoneLock) phoneLock.classList.remove('hidden');
    if (lockNotice) lockNotice.classList.remove('hidden');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.remove('bg-gradient-to-b', 'from-[#1877f2]', 'to-[#0d59c6]', 'cursor-pointer');
      submitBtn.classList.add('bg-slate-800', 'text-slate-400', 'cursor-not-allowed', 'shadow-none');
      submitBtn.innerHTML = '<span>✓ সংরক্ষিত (পরিবর্তনযোগ্য নয়)</span>';
    }
  } else {
    // Editable mode
    if (phoneInput) {
      phoneInput.value = '';
      phoneInput.placeholder = 'বিকাশ নম্বর লিখুন';
      phoneInput.readOnly = false;
      phoneInput.classList.remove('cursor-not-allowed', 'opacity-90');
    }
    if (nameInput) {
      nameInput.readOnly = Boolean(realName);
      if (realName) {
        nameInput.classList.add('cursor-not-allowed', 'opacity-90');
        if (nameLock) nameLock.classList.remove('hidden');
      } else {
        nameInput.classList.remove('cursor-not-allowed', 'opacity-90');
        if (nameLock) nameLock.classList.add('hidden');
      }
    }
    if (phoneLock) phoneLock.classList.add('hidden');
    if (lockNotice) lockNotice.classList.add('hidden');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.classList.add('bg-gradient-to-b', 'from-[#1877f2]', 'to-[#0d59c6]', 'cursor-pointer');
      submitBtn.classList.remove('bg-slate-800', 'text-slate-400', 'cursor-not-allowed', 'shadow-none');
      submitBtn.innerHTML = '<span>সংরক্ষণ</span>';
    }
  }
}

function saveBkashAccountDetails() {
  const existing = getSavedBkashAccount();
  if (existing && existing.phone) {
    showToastNotification('⚠️ বিকাশ অ্যাকাউন্ট এককালীন সংরক্ষণ করা হয়েছে, এটি আর পরিবর্তন করা যাবে না');
    return;
  }

  const nameInput = document.getElementById('bkash-fullname-input');
  const phoneInput = document.getElementById('bkash-phone-input');
  const fullName = (nameInput ? nameInput.value.trim() : '') || getSavedRealName();
  const phone = phoneInput ? phoneInput.value.trim() : '';

  if (!fullName || fullName.length < 2) {
    showToastNotification('⚠️ অনুগ্রহ করে আপনার প্রকৃত নাম লিখুন');
    if (nameInput) nameInput.focus();
    return;
  }
  if (!phone || phone.length < 10) {
    showToastNotification('⚠️ অনুগ্রহ করে সঠিক বিকাশ নম্বর লিখুন');
    if (phoneInput) phoneInput.focus();
    return;
  }

  const bkashData = {
    fullName: fullName,
    phone: phone,
    locked: true,
    boundAt: new Date().toISOString()
  };

  try {
    localStorage.setItem('alo_bkash_account', JSON.stringify(bkashData));
    if (!localStorage.getItem('alo_real_name')) {
      localStorage.setItem('alo_real_name', fullName);
    }
    const user = getCurrentUser();
    if (user) {
      user.bkash = bkashData;
      user.realName = fullName;
      localStorage.setItem('aloSignedInUser', JSON.stringify(user));
      if (window.aloSupabase) {
        window.aloSupabase.from('users').update({
          bkash_phone: phone,
          bkash_name: fullName,
          name: fullName
        }).eq('phone', user.phone || phone).then(() => {}).catch(e => console.warn('Supabase bkash update:', e));
      }
    }
  } catch(e) {}

  userSelectedWithdrawMethod = 'BKASH';
  updateBkashDisplayAcrossApp();
  updateRealNameDisplayAcrossApp();
  renderBkashSetupPanel();
  showToastNotification('✓ বিকাশ অ্যাকাউন্ট সফলভাবে এককালীন সংরক্ষণ করা হয়েছে!');
  setTimeout(() => {
    if (previousDashboardPanel === 'my-pass') {
      openDashboardPanel('my-pass');
      openWithdrawSheet();
    } else {
      openDashboardPanel('personal');
    }
  }, 400);
}

// ==========================================
// NAGAD ACCOUNT SETTINGS ("নগদ অ্যাকাউন্ট")
// ==========================================
function getSavedNagadAccount() {
  try {
    const raw = localStorage.getItem('alo_nagad_account');
    if (raw) return JSON.parse(raw);
    const user = getCurrentUser();
    if (user && user.nagad) return user.nagad;
  } catch(e) {}
  return null;
}

function updateNagadDisplayAcrossApp() {
  const nagad = getSavedNagadAccount();

  // 1. Profile / Personal Info row badge
  const personalBadge = document.getElementById('personal-nagad-status-badge');
  if (personalBadge) {
    if (nagad && nagad.phone) {
      personalBadge.textContent = nagad.phone;
      personalBadge.className = 'personal-status-badge text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 font-mono font-semibold';
    } else {
      personalBadge.textContent = 'নগদ সেট নেই';
      personalBadge.className = 'personal-status-badge text-amber-400 bg-amber-500/10 border border-amber-500/20 font-medium';
    }
  }

  // 2. Withdrawal sheet selected method label & picker options
  updateWithdrawalMethodLabelDisplay();
  renderWithdrawMethodPickerOptions();
}

function renderNagadSetupPanel() {
  const nagad = getSavedNagadAccount();
  const realName = getSavedRealName();
  const nameInput = document.getElementById('nagad-fullname-input');
  const phoneInput = document.getElementById('nagad-phone-input');
  const lockNotice = document.getElementById('nagad-locked-notice');
  const nameLock = document.getElementById('nagad-name-lock-icon');
  const phoneLock = document.getElementById('nagad-phone-lock-icon');
  const submitBtn = document.getElementById('nagad-set-submit-btn');

  const boundName = (nagad && nagad.fullName) || realName || '';
  if (nameInput) {
    nameInput.placeholder = 'প্রকৃত নাম লিখুন';
    nameInput.value = boundName;
  }

  if (nagad && nagad.phone) {
    // Permanently locked mode - One-time saved!
    if (phoneInput) {
      phoneInput.value = nagad.phone;
      phoneInput.readOnly = true;
      phoneInput.classList.add('cursor-not-allowed', 'opacity-90');
    }
    if (nameInput) {
      nameInput.readOnly = true;
      nameInput.classList.add('cursor-not-allowed', 'opacity-90');
    }
    if (nameLock) nameLock.classList.remove('hidden');
    if (phoneLock) phoneLock.classList.remove('hidden');
    if (lockNotice) lockNotice.classList.remove('hidden');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.remove('bg-gradient-to-b', 'from-[#1877f2]', 'to-[#0d59c6]', 'cursor-pointer');
      submitBtn.classList.add('bg-slate-800', 'text-slate-400', 'cursor-not-allowed', 'shadow-none');
      submitBtn.innerHTML = '<span>✓ সংরক্ষিত (পরিবর্তনযোগ্য নয়)</span>';
    }
  } else {
    // Editable mode
    if (phoneInput) {
      phoneInput.value = '';
      phoneInput.placeholder = 'নগদ নম্বর লিখুন';
      phoneInput.readOnly = false;
      phoneInput.classList.remove('cursor-not-allowed', 'opacity-90');
    }
    if (nameInput) {
      nameInput.readOnly = Boolean(realName);
      if (realName) {
        nameInput.classList.add('cursor-not-allowed', 'opacity-90');
        if (nameLock) nameLock.classList.remove('hidden');
      } else {
        nameInput.classList.remove('cursor-not-allowed', 'opacity-90');
        if (nameLock) nameLock.classList.add('hidden');
      }
    }
    if (phoneLock) phoneLock.classList.add('hidden');
    if (lockNotice) lockNotice.classList.add('hidden');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.classList.add('bg-gradient-to-b', 'from-[#1877f2]', 'to-[#0d59c6]', 'cursor-pointer');
      submitBtn.classList.remove('bg-slate-800', 'text-slate-400', 'cursor-not-allowed', 'shadow-none');
      submitBtn.innerHTML = '<span>সংরক্ষণ</span>';
    }
  }
}

function saveNagadAccountDetails() {
  const existing = getSavedNagadAccount();
  if (existing && existing.phone) {
    showToastNotification('⚠️ নগদ অ্যাকাউন্ট এককালীন সংরক্ষণ করা হয়েছে, এটি আর পরিবর্তন করা যাবে না');
    return;
  }

  const nameInput = document.getElementById('nagad-fullname-input');
  const phoneInput = document.getElementById('nagad-phone-input');
  const fullName = (nameInput ? nameInput.value.trim() : '') || getSavedRealName();
  const phone = phoneInput ? phoneInput.value.trim() : '';

  if (!fullName || fullName.length < 2) {
    showToastNotification('⚠️ অনুগ্রহ করে আপনার প্রকৃত নাম লিখুন');
    if (nameInput) nameInput.focus();
    return;
  }
  if (!phone || phone.length < 10) {
    showToastNotification('⚠️ অনুগ্রহ করে সঠিক নগদ নম্বর লিখুন');
    if (phoneInput) phoneInput.focus();
    return;
  }

  const nagadData = {
    fullName: fullName,
    phone: phone,
    locked: true,
    boundAt: new Date().toISOString()
  };

  try {
    localStorage.setItem('alo_nagad_account', JSON.stringify(nagadData));
    if (!localStorage.getItem('alo_real_name')) {
      localStorage.setItem('alo_real_name', fullName);
    }
    const user = getCurrentUser();
    if (user) {
      user.nagad = nagadData;
      user.realName = fullName;
      dbSaveUser(user);
    }
  } catch(e) {}

  userSelectedWithdrawMethod = 'NAGAD';
  updateNagadDisplayAcrossApp();
  updateRealNameDisplayAcrossApp();
  renderNagadSetupPanel();
  showToastNotification('✓ নগদ অ্যাকাউন্ট সফলভাবে এককালীন সংরক্ষণ করা হয়েছে!');
  setTimeout(() => {
    if (previousDashboardPanel === 'my-pass') {
      openDashboardPanel('my-pass');
      openWithdrawSheet();
    } else {
      openDashboardPanel('personal');
    }
  }, 400);
}

// ==========================================
// USDT ACCOUNT SETTINGS ("USDT অ্যাকাউন্ট / BEP20")
// ==========================================
function getSavedUsdtAccount() {
  try {
    const raw = localStorage.getItem('alo_usdt_account');
    if (raw) return JSON.parse(raw);
    const user = getCurrentUser();
    if (user && user.usdt) return user.usdt;
    const directAddr = localStorage.getItem('alo_usdt_address');
    if (directAddr) {
      return {
        fullName: getSavedRealName(),
        address: directAddr,
        network: 'BEP20',
        locked: true
      };
    }
  } catch(e) {}
  return null;
}

function updateUsdtDisplayAcrossApp() {
  const usdt = getSavedUsdtAccount();

  // 1. Profile / Personal Info row badge
  const personalBadge = document.getElementById('personal-usdt-status-badge') || document.querySelector('[data-profile-value="usdt"]');
  if (personalBadge) {
    if (usdt && usdt.address) {
      const shortAddr = usdt.address.length > 12 ? (usdt.address.slice(0, 6) + '...' + usdt.address.slice(-4)) : usdt.address;
      personalBadge.textContent = shortAddr;
      personalBadge.className = 'personal-status-badge text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 font-mono font-semibold';
    } else {
      personalBadge.textContent = 'USDT সেট নেই';
      personalBadge.className = 'personal-status-badge text-amber-400 bg-amber-500/10 border border-amber-500/20 font-medium';
    }
  }

  // 2. Withdrawal sheet selected method label & picker options
  updateWithdrawalMethodLabelDisplay();
  renderWithdrawMethodPickerOptions();
}

function renderUsdtSetupPanel() {
  const usdt = getSavedUsdtAccount();
  const realName = getSavedRealName();
  const nameInput = document.getElementById('usdt-fullname-input');
  const addressInput = document.getElementById('usdt-address-input');
  const lockNotice = document.getElementById('usdt-locked-notice');
  const nameLock = document.getElementById('usdt-name-lock-icon');
  const addressLock = document.getElementById('usdt-address-lock-icon');
  const submitBtn = document.getElementById('usdt-set-submit-btn');

  const boundName = (usdt && usdt.fullName) || realName || '';
  if (nameInput) {
    nameInput.placeholder = 'প্রকৃত নাম লিখুন';
    nameInput.value = boundName;
  }

  if (usdt && usdt.address) {
    // Permanently locked mode - One-time saved!
    if (addressInput) {
      addressInput.value = usdt.address;
      addressInput.readOnly = true;
      addressInput.classList.add('cursor-not-allowed', 'opacity-90');
    }
    if (nameInput) {
      nameInput.readOnly = true;
      nameInput.classList.add('cursor-not-allowed', 'opacity-90');
    }
    if (nameLock) nameLock.classList.remove('hidden');
    if (addressLock) addressLock.classList.remove('hidden');
    if (lockNotice) lockNotice.classList.remove('hidden');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.remove('bg-gradient-to-b', 'from-[#1877f2]', 'to-[#0d59c6]', 'cursor-pointer');
      submitBtn.classList.add('bg-slate-800', 'text-slate-400', 'cursor-not-allowed', 'shadow-none');
      submitBtn.innerHTML = '<span>✓ সংরক্ষিত (পরিবর্তনযোগ্য নয়)</span>';
    }
  } else {
    // Editable mode
    if (addressInput) {
      addressInput.value = '';
      addressInput.placeholder = 'BEP20 ওয়ালেট ঠিকানা লিখুন (0x...)';
      addressInput.readOnly = false;
      addressInput.classList.remove('cursor-not-allowed', 'opacity-90');
    }
    if (nameInput) {
      nameInput.readOnly = Boolean(realName);
      if (realName) {
        nameInput.classList.add('cursor-not-allowed', 'opacity-90');
        if (nameLock) nameLock.classList.remove('hidden');
      } else {
        nameInput.classList.remove('cursor-not-allowed', 'opacity-90');
        if (nameLock) nameLock.classList.add('hidden');
      }
    }
    if (addressLock) addressLock.classList.add('hidden');
    if (lockNotice) lockNotice.classList.add('hidden');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.classList.add('bg-gradient-to-b', 'from-[#1877f2]', 'to-[#0d59c6]', 'cursor-pointer');
      submitBtn.classList.remove('bg-slate-800', 'text-slate-400', 'cursor-not-allowed', 'shadow-none');
      submitBtn.innerHTML = '<span>সংরক্ষণ</span>';
    }
  }
}

function saveUsdtAccountDetails() {
  const existing = getSavedUsdtAccount();
  if (existing && existing.address) {
    showToastNotification('⚠️ USDT (BEP20) অ্যাকাউন্ট এককালীন সংরক্ষণ করা হয়েছে, এটি আর পরিবর্তন করা যাবে না');
    return;
  }

  const nameInput = document.getElementById('usdt-fullname-input');
  const addressInput = document.getElementById('usdt-address-input');
  const fullName = (nameInput ? nameInput.value.trim() : '') || getSavedRealName();
  const address = addressInput ? addressInput.value.trim() : '';

  if (!fullName || fullName.length < 2) {
    showToastNotification('⚠️ অনুগ্রহ করে আপনার প্রকৃত নাম লিখুন');
    if (nameInput) nameInput.focus();
    return;
  }
  if (!address || address.length < 15 || !address.toLowerCase().startsWith('0x')) {
    showToastNotification('⚠️ সঠিক BEP20 (0x...) ওয়ালেট ঠিকানা লিখুন');
    if (addressInput) addressInput.focus();
    return;
  }

  const usdtData = {
    fullName: fullName,
    address: address,
    network: 'BEP20',
    locked: true,
    boundAt: new Date().toISOString()
  };

  try {
    localStorage.setItem('alo_usdt_account', JSON.stringify(usdtData));
    localStorage.setItem('alo_usdt_address', address);
    if (!localStorage.getItem('alo_real_name')) {
      localStorage.setItem('alo_real_name', fullName);
    }
    const user = getCurrentUser();
    if (user) {
      user.usdt = usdtData;
      user.realName = fullName;
      dbSaveUser(user);
    }
  } catch(e) {}

  userSelectedWithdrawMethod = 'USDT';
  updateUsdtDisplayAcrossApp();
  updateRealNameDisplayAcrossApp();
  renderUsdtSetupPanel();
  showToastNotification('✓ USDT (BEP20) অ্যাকাউন্ট সফলভাবে এককালীন সংরক্ষণ করা হয়েছে!');
  setTimeout(() => {
    if (previousDashboardPanel === 'my-pass') {
      openDashboardPanel('my-pass');
      openWithdrawSheet();
    } else if (previousDashboardPanel === 'payment-method') {
      openDashboardPanel('payment-method');
    } else {
      openDashboardPanel('personal');
    }
  }, 400);
}

function getAvailableBalance() {
  const user = getCurrentUser();
  if (user && typeof user.balance === 'number') {
    return user.balance;
  }
  const custom = localStorage.getItem('my_pass_available_bal');
  if (custom !== null) return Number(custom);
  return 0;
}

const platformTaskDescriptions = {
  TikTok: {
    bn: [
      'TikTok ভিডিও লাইক করুন ও সুন্দর মন্তব্য করুন',
      'নতুন ট্রেন্ডিং ভিডিও সম্পূর্ণ দেখে লাইক দিন',
      'অফিশিয়াল ক্রিয়েটর অ্যাকাউন্ট ফলো করুন',
      'ক্রিয়েটরের প্রোফাইল ভিজিট করে ৩টি ভিডিওতে লাইক দিন',
      'ভিডিওটি বন্ধুদের সাথে শেয়ার করুন এবং বুকমার্ক করুন',
      'সাউন্ডট্র্যাক ব্যবহার করে ফেভারিটে যুক্ত করুন',
      'লাইভ স্ট্রিম ১৫ সেকেন্ড দেখুন ও লাইক দিন',
      'শিক্ষামূলক শর্ট ভিডিওতে লাইক ও কমেন্ট দিন',
      'ব্র্যান্ড চ্যানেলে ফলো দিন ও ভিডিও দেখুন',
      'ভাইরাল ক্লিপে লাভ রিয়্যাক্ট দিন',
      'হ্যাশট্যাগ চ্যালেঞ্জ ভিডিও দেখুন ও লাইক দিন',
      'টেক রিভিউ ভিডিওতে লাইক ও শেয়ার দিন',
      'রন্ধনশিল্প ও কুকিং ভিডিওতে লাইক দিন',
      'ট্রাভেল ভ্লগ ভিডিও দেখুন ও কমেন্ট করুন',
      'ফিটনেস ও স্বাস্থ্য টিপস ভিডিও সেভ করুন',
      'সঙ্গীত ভিডিও সম্পূর্ণ শুনে লাইক দিন',
      'ফ্যাশন ট্রেন্ড শর্টসে লাভ রিয়্যাক্ট দিন',
      'কমেডি ক্লিপ সম্পূর্ণ দেখে লাইক দিন',
      'মোটিভেশনাল ভিডিওতে লাইক ও শেয়ার দিন',
      'লাইফস্টাইল ভ্লগ অ্যাকাউন্ট ফলো করুন',
      'অ্যানিমেশন ক্লিপে লাভ রিয়্যাক্ট দিন',
      'স্পোর্টস হাইলাইটস ভিডিও দেখুন ও লাইক দিন',
      'গেমিং শর্টসে লাইক ও মন্তব্য দিন',
      'ডিআইওয়াই ও ক্রাফট ভিডিও সেভ করুন',
      'নতুন ক্রিয়েটরকে ফলো ও ভিডিওতে লাইক দিন',
      'ইনফরমেটিভ ফ্যাক্টস ভিডিও লাইক দিন',
      'ফটোগ্রাফি ট্রিকস ভিডিওতে লাইক দিন',
      'প্রোডাক্ট রিভিউ ও আনবক্সিং ভিডিও দেখুন',
      'আর্ট ও ড্রয়িং ভিডিওতে লাভ রিয়্যাক্ট দিন',
      'ডেইলি মোটিভেশন ভিডিওতে লাইক ও শেয়ার দিন'
    ],
    en: [
      'Like TikTok video and leave a positive comment',
      'Watch trending video completely and tap like',
      'Follow official creator account',
      'Visit creator profile and like 3 videos',
      'Share video with friends and bookmark it',
      'Add soundtrack to favorites and like video',
      'Watch live stream for 15 seconds and like',
      'Like and comment on educational short video',
      'Follow brand channel and watch latest video',
      'Give love react to the viral clip',
      'Watch hashtag challenge video and tap like',
      'Like and share tech review video',
      'Like culinary and cooking video',
      'Watch travel vlog video and leave a comment',
      'Save fitness and health tips short video',
      'Listen to music video completely and like',
      'Give love react to fashion trend shorts',
      'Watch comedy clip fully and tap like',
      'Like and share motivational video clip',
      'Follow lifestyle vlog creator account',
      'Give love react to animation video',
      'Watch sports highlights short and like',
      'Like and leave a comment on gaming clip',
      'Save DIY craft and project video',
      'Follow rising creator and like video',
      'Like informative facts short clip',
      'Like photography hacks and tricks video',
      'Watch product unboxing and review video',
      'Give love react to art and drawing video',
      'Like and share daily motivation video'
    ],
    hi: [
      'TikTok वीडियो को लाइक करें और सकारात्मक टिप्पणी छोड़ें',
      'ट्रेंडिंग वीडियो को पूरा देखें और लाइक करें',
      'आधिकारिक क्रिएटर अकाउंट को फॉलो करें',
      'क्रिएटर की प्रोफाइल देखें और 3 वीडियो लाइक करें',
      'दोस्तों के साथ वीडियो शेयर करें और बुकमार्क करें',
      'साउंडट्रैक को पसंदीदा में जोड़ें और वीडियो लाइक करें',
      '15 सेकंड तक लाइव स्ट्रीम देखें और लाइक करें',
      'शैक्षणिक शॉर्ट वीडियो को लाइक और कमेंट करें',
      'ब्रांड चैनल को फॉलो करें और नया वीडियो देखें',
      'वायरल क्लिप पर लव रिएक्ट दें',
      'हैशटैग चैलेंज वीडियो देखें और लाइक करें',
      'टेक रिव्यू वीडियो को लाइक और शेयर करें',
      'कुकिंग और रेसिपी वीडियो को लाइक करें',
      'ट्रैवल व्लॉग वीडियो देखें और कमेंट करें',
      'फिटनेस और हेल्थ टिप्स शॉर्ट वीडियो सेव करें',
      'म्यूजिक वीडियो पूरा सुनें और लाइक करें',
      'फैशन ट्रेंड शॉर्ट्स पर लव रिएक्ट दें',
      'कॉमेडी क्लिप पूरा देखें और लाइक करें',
      'मोटिवेशनल वीडियो को लाइक और शेयर करें',
      'लाइफस्टाइल व्लॉग अकाउंट को फॉलो करें',
      'एनीमेशन क्लिप पर लव रिएक्ट दें',
      'स्पोर्ट्स हाइलाइट्स वीडियो देखें और लाइक करें',
      'गेमिंग शॉर्ट्स को लाइक और कमेंट करें',
      'DIY क्राफ्ट वीडियो को सेव करें',
      'नए क्रिएटर को फॉलो करें और वीडियो लाइक करें',
      'ज्ञानवर्धक फैक्ट्स वीडियो को लाइक करें',
      'फोटोग्राफी ट्रिक्स वीडियो को लाइक करें',
      'प्रोडक्ट अनबॉक्सिंग और रिव्यू वीडियो देखें',
      'आर्ट और ड्राइंग वीडियो पर लव रिएक्ट दें',
      'डेली मोटिवेशन वीडियो को लाइक और शेयर करें'
    ]
  },
  YouTube: {
    bn: [
      'YouTube চ্যানেলটি সাবস্ক্রাইব করুন ও বেল আইকন চাপুন',
      'ভিডিওটি সম্পূর্ণ দেখে লাইক দিন',
      'ভিডিওতে ইতিবাচক ও গঠনমূলক মন্তব্য করুন',
      'প্লেলিস্টের একটি ভিডিও লাইক ও সেভ করুন',
      'শর্টস ভিডিওতে লাইক দিয়ে চ্যানেল সাবস্ক্রাইব করুন',
      'টেক রিভিউ ভিডিও সম্পূর্ণ দেখুন ও লাইক দিন',
      'শিক্ষামূলক টিউটোরিয়াল ভিডিওতে লাইক দিন',
      'অফিসিয়াল মিউজিক ভিডিও দেখুন ও কমেন্ট করুন',
      'ট্রাভেল ডকুমেন্টারি ভিডিওতে লাইক দিন',
      'কুকিং রেসিপি ভিডিওটি পরে দেখার তালিকায় রাখুন',
      'ফিটনেস ওয়ার্কআউট ভিডিওতে লাইক দিন',
      'নিউজ ও কারেন্ট অ্যাফেয়ার্স ভিডিও দেখুন',
      'মোটিভেশনাল স্পিচ ভিডিওতে লাইক ও শেয়ার দিন',
      'পডকাস্টের একটি পর্বে লাইক ও কমেন্ট করুন',
      'গেমিং লাইভস্ট্রিম ভিডিও ৫ মিনিট দেখুন',
      'বিজ্ঞান ও প্রযুক্তির ভিডিওতে লাইক দিন',
      'নতুন সিনেমার ট্রেলার সম্পূর্ণ দেখুন',
      'বুক সামারি ভিডিওতে সুন্দর কমেন্ট করুন',
      'ক্যারিয়ার গাইডলাইন ভিডিও লাইক দিন',
      'ভাষা শিক্ষা টিউটোরিয়াল ভিডিও সেভ করুন',
      'ড্রয়িং ও স্কেচ টিউটোরিয়াল ভিডিও দেখুন',
      'অটোমোবাইল ও বাইক রিভিউ ভিডিওতে লাইক দিন',
      'ইতিহাস ও ঐতিহ্য বিষয়ক ভিডিও সম্পূর্ণ দেখুন',
      'লাইফ হ্যাকস ভিডিওতে লাইক ও শেয়ার দিন',
      'ইসলামিক আলোচনা ও মোনাজাত ভিডিও লাইক দিন',
      'ফিন্যান্স ও ইনভেস্টমেন্ট ভিডিও সম্পূর্ণ দেখুন',
      'স্মার্টফোন রিভিউ ভিডিওতে মন্তব্য করুন',
      'ফটোগ্রাফি মাস্টারক্লাস ভিডিও সেভ করুন',
      'নাটক ও কমেডি ভিডিওতে লাইক দিন',
      'আর্কিটেকচার ও হোম ডিজাইন ভিডিও দেখুন'
    ],
    en: [
      'Subscribe to YouTube channel and tap bell icon',
      'Watch video completely and tap like',
      'Leave a positive, constructive comment on video',
      'Like and save video to official playlist',
      'Like Shorts video and subscribe to channel',
      'Watch tech review video and give a like',
      'Like and share educational tutorial video',
      'Watch official music video and leave a comment',
      'Like travel documentary video and add to watchlist',
      'Add cooking recipe video to Watch Later list',
      'Like fitness workout session video',
      'Watch news and current affairs segment',
      'Like and share motivational speech video',
      'Like and comment on podcast episode',
      'Watch gaming livestream for 5 minutes',
      'Like science and technology breakthrough video',
      'Watch official movie trailer completely',
      'Leave an inspiring comment on book summary video',
      'Like career guideline tutorial video',
      'Save language learning tutorial video',
      'Watch drawing and sketching tutorial video',
      'Like automobile and bike review video',
      'Watch history and heritage documentary video',
      'Like and share life hacks tutorial video',
      'Like mindfulness discussion and prayer video',
      'Watch personal finance and investment video',
      'Comment on flagship smartphone review video',
      'Save mobile photography masterclass video',
      'Like entertainment and comedy sketch video',
      'Watch architecture and home design showcase video'
    ],
    hi: [
      'YouTube चैनल सब्सक्राइब करें और बेल आइकन दबाएं',
      'वीडियो को पूरा देखें और लाइक करें',
      'वीडियो पर सकारात्मक और रचनात्मक टिप्पणी करें',
      'प्लेलिस्ट से वीडियो लाइक और सेव करें',
      'शॉर्ट्स वीडियो लाइक करें और चैनल सब्सक्राइब करें',
      'टेक रिव्यू वीडियो पूरा देखें और लाइक करें',
      'शैक्षणिक ट्यूटोरियल वीडियो को लाइक करें',
      'आधिकारिक संगीत वीडियो देखें और कमेंट करें',
      'ट्रैवल डॉक्यूमेंट्री वीडियो को लाइक करें',
      'कुकिंग रेसिपी वीडियो को वॉच लेटर में जोड़ें',
      'फिटनेस वर्कआउट वीडियो को लाइक करें',
      'समाचार और समसामयिक वीडियो देखें',
      'मोटिवेशनल स्पीच वीडियो को लाइक और शेयर करें',
      'पॉडकास्ट एपिसोड पर लाइक और कमेंट करें',
      'गेमिंग लाइवस्ट्रीम 5 मिनट तक देखें',
      'विज्ञान और तकनीक वीडियो को लाइक करें',
      'नए मूवी ट्रेलर को पूरा देखें',
      'किताब सारांश वीडियो पर अच्छी टिप्पणी करें',
      'करियर गाइडलाइन वीडियो को लाइक करें',
      'भाषा सीखने का ट्यूटोरियल वीडियो सेव करें',
      'ड्राइंग और स्केच ट्यूटोरियल वीडियो देखें',
      'कार और बाइक रिव्यू वीडियो को लाइक करें',
      'इतिहास और विरासत वीडियो को पूरा देखें',
      'लाइफ हैक्स वीडियो को लाइक और शेयर करें',
      'धार्मिक व प्रेरक चर्चा वीडियो को लाइक करें',
      'फाइनेंस और निवेश वीडियो पूरा देखें',
      'स्मार्टफोन रिव्यू वीडियो पर टिप्पणी करें',
      'फोटोग्राफी मास्टरक्लास वीडियो सेव करें',
      'कॉमेडी और नाटक वीडियो को लाइक करें',
      'आर्किटेक्चर और होम डिजाइन वीडियो देखें'
    ]
  },
  FaceBook: {
    bn: [
      'FaceBook অফিসিয়াল পেজে লাইক ও ফলো করুন',
      'সাম্প্রতিক পোস্টে লাইক ও শেয়ার করুন',
      'অফিসিয়াল গ্রুপে যুক্ত হন ও পোস্ট দেখুন',
      'ফেসবুক রিলস ভিডিওতে লাভ রিয়্যাক্ট দিন',
      'ব্যবসায়িক পেজে ইতিবাচক রিভিউ দিন',
      'শিক্ষামূলক পোস্টে লাইক ও মন্তব্য দিন',
      'লাইভ সেশনে যুক্ত হয়ে লাভ রিয়্যাক্ট দিন',
      'পণ্য প্রচারের পোস্টে লাইক ও শেয়ার দিন',
      'মোটিভেশনাল পোস্টে লাইক দিন',
      'সাম্প্রতিক ফটো অ্যালবামে লাইক ও কমেন্ট করুন',
      'কমিউনিটি পেজে ফ্রেন্ডদের ইনভাইট করুন',
      'টেকনোলজি পোস্টে লাইক ও কমেন্ট দিন',
      'স্বাস্থ্য টিপস পোস্টটি শেয়ার করুন',
      'খবরের লিংকে ক্লিক করে পোস্ট লাইক দিন',
      'রেসিপি পোস্টে লাভ রিয়্যাক্ট দিন',
      'ট্রাভেল পেজের ফটোতে লাইক দিন',
      'স্পোর্টস আপডেট পোস্টে লাইক দিন',
      'বিজ্ঞান বিষয়ক আর্টিকেলে লাইক দিন',
      'রিলস ভিডিও সম্পূর্ণ দেখে শেয়ার দিন',
      'গ্রুপ আলোচনায় ইতিবাচক কমেন্ট দিন',
      'লাইফস্টাইল পেজে ফলো করুন',
      'ক্যারিয়ার টিপস পোস্টে লাইক দিন',
      'ডিজিটাল আর্ট পোস্টে লাভ রিয়্যাক্ট দিন',
      'বই রিভিউ পোস্টে কমেন্ট করুন',
      'ভিডিও কন্টেন্টে ৩ মিনিট ওয়াচটাইম দিন',
      'পডকাস্ট লাইভ স্ট্রিমে লাইক দিন',
      'অফার ও ডিসকাউন্ট পোস্টে লাইক দিন',
      'মোবাইল টিপস পোস্টে লাইক দিন',
      'কমেডি স্কিটে হাসির রিয়্যাক্ট দিন',
      'নতুন উদ্যোগের পেজে শুভেচ্ছা কমেন্ট করুন'
    ],
    en: [
      'Like and follow official FaceBook Page',
      'Like and share latest published post',
      'Join official group and view pinned posts',
      'Give love react to Facebook Reels video',
      'Leave a positive 5-star review on page',
      'Like and comment on educational community post',
      'Join live session and send love reactions',
      'Like and share promotional showcase post',
      'Like inspirational and motivational post',
      'Like and leave a comment on recent photo album',
      'Invite friends to follow community page',
      'Like and comment on technology updates post',
      'Share healthy lifestyle tips post to timeline',
      'Click news link and like the article post',
      'Give love react to culinary recipe post',
      'Like stunning travel photography post',
      'Like sports highlights update post',
      'Like science and environment article post',
      'Watch Facebook Reels video completely and share',
      'Post helpful constructive comment in group',
      'Follow official lifestyle creator page',
      'Like career advancement tips post',
      'Give love react to digital art showcase post',
      'Comment on weekly book recommendation post',
      'Watch featured video content for 3 minutes',
      'Like podcast livestream announcement post',
      'Like exclusive seasonal promotion post',
      'Like smartphone tips and shortcuts post',
      'Give laugh react to popular comedy skit',
      'Post congratulations on new venture page'
    ],
    hi: [
      'FaceBook आधिकारिक पेज को लाइक और फॉलो करें',
      'नवीनतम पोस्ट को लाइक और शेयर करें',
      'आधिकारिक ग्रुप से जुड़ें और पोस्ट देखें',
      'फेसबुक रील्स वीडियो पर लव रिएक्ट दें',
      'बिजनेस पेज पर सकारात्मक 5-स्टार रिव्यू दें',
      'शैक्षणिक पोस्ट पर लाइक और टिप्पणी करें',
      'लाइव सेशन में शामिल हों और लव रिएक्ट दें',
      'प्रमोशनल पोस्ट को लाइक और शेयर करें',
      'मोटिवेशनल पोस्ट को लाइक करें',
      'हाल के फोटो एलबम पर लाइक और कमेंट करें',
      'दोस्तों को कम्युनिटी पेज पर इनवाइट करें',
      'तकनीक अपडेट पोस्ट पर लाइक और कमेंट करें',
      'हेल्थ टिप्स पोस्ट को टाइमलाइन पर शेयर करें',
      'न्यूज लिंक पर क्लिक करें और पोस्ट लाइक करें',
      'रेसिपी पोस्ट पर लव रिएक्ट दें',
      'ट्रैवल पेज की तस्वीरों को लाइक करें',
      'स्पोर्ट्स अपडेट पोस्ट को लाइक करें',
      'विज्ञान संबंधी लेख को लाइक करें',
      'रील्स वीडियो पूरा देखें और शेयर करें',
      'ग्रुप चर्चा में सकारात्मक टिप्पणी करें',
      'लाइफस्टाइल पेज को फॉलो करें',
      'करियर टिप्स पोस्ट को लाइक करें',
      'डिजिटल आर्ट पोस्ट पर लव रिएक्ट दें',
      'किताब रिव्यू पोस्ट पर कमेंट करें',
      'वीडियो कंटेंट को 3 मिनट तक देखें',
      'पॉडकास्ट लाइवस्ट्रीम पोस्ट को लाइक करें',
      'ऑफर और डिस्काउंट पोस्ट को लाइक करें',
      'मोबाइल टिप्स पोस्ट को लाइक करें',
      'कॉमेडी स्किट पर हास्य रिएक्ट दें',
      'नई पहल के पेज पर शुभकामना कमेंट करें'
    ]
  }
};

function getPlatformTaskDescription(platform, index, lang) {
  if (!lang) {
    lang = (window.aloI18n ? window.aloI18n.getLanguage() : '') || 'en';
  }
  const plat = platformTaskDescriptions[platform] || platformTaskDescriptions.TikTok;
  const list = plat[lang] || plat.en || plat.bn;
  const idx = Math.abs(parseInt(index || 0, 10));
  return list[idx % list.length];
}
window.getPlatformTaskDescription = getPlatformTaskDescription;

let acceptedPlatformTasks = 0;
let activePackageLevel = 'LV0';
let activePlatform = 'TikTok';
let activeMissionFilter = 'active';
let activeSubmissionId = '';
let activeSubmissionImage = '';

function readAllMissionsRaw() {
  try {
    const missions = JSON.parse(localStorage.getItem('aloAcceptedMissions') || '[]');
    return Array.isArray(missions) ? missions : [];
  } catch (error) {
    return [];
  }
}

function saveAllMissionsRaw(allMissions) {
  localStorage.setItem('aloAcceptedMissions', JSON.stringify(Array.isArray(allMissions) ? allMissions : []));
}

function readAcceptedMissions() {
  const missions = readAllMissionsRaw();
  let curPhone = '';
  try {
    const u = JSON.parse(localStorage.getItem('aloSignedInUser') || 'null');
    curPhone = u ? normalizeBdPhone(u.phone || u.accountNumber || '') : '';
  } catch(e) {}
  if (!curPhone) return missions;
  return missions.filter(function(m) {
    return !m.userPhone || normalizeBdPhone(m.userPhone) === curPhone;
  });
}

function updateProfileMetrics() {
  const missions = readAcceptedMissions();
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);
  const startOfWeek = new Date(startOfToday);
  const weekday = (startOfWeek.getDay() + 6) % 7;
  startOfWeek.setDate(startOfWeek.getDate() - weekday);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const completedMissions = missions.filter(function(mission) {
    return mission.status === 'complete';
  });

  const getCompletedAt = function(mission) {
    const date = new Date(mission.completedAt || mission.acceptedAt || '');
    return Number.isNaN(date.getTime()) ? null : date;
  };

  const sumRewards = function(predicate) {
    return completedMissions.reduce(function(total, mission) {
      const completedAt = getCompletedAt(mission);
      return completedAt && predicate(completedAt)
        ? total + (Number(mission.reward) || 0)
        : total;
    }, 0);
  };

  const setText = function(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  };

  const dynamicToday = sumRewards(function(date) {
    return date >= startOfToday && date < new Date(startOfToday.getTime() + 86400000);
  });
  const dynamicYesterday = sumRewards(function(date) {
    return date >= startOfYesterday && date < startOfToday;
  });
  const dynamicWeekly = sumRewards(function(date) {
    return date >= startOfWeek && date <= now;
  });
  const dynamicMonthly = sumRewards(function(date) {
    return date >= startOfMonth && date <= now;
  });

  let currentUser = null;
  try {
    currentUser = JSON.parse(localStorage.getItem('aloSignedInUser') || 'null');
  } catch (e) {}

  const currentBal = currentUser && typeof currentUser.balance === 'number'
    ? currentUser.balance
    : 0;

  // Calculate all-time mission earnings from completed missions
  const allCompletedMissionsSum = completedMissions.reduce(function(total, mission) {
    return total + (Number(mission.reward) || 0);
  }, 0);

  // Lifetime earnings ("সারাজীবন এর আয়") for 'ব্যক্তিগত ভারসাম্য' (Personal Balance)
  // Ensures lifetime income is permanently preserved and NEVER wiped by withdrawals!
  let lifetimeEarnings = Math.max(
    Number(currentUser && currentUser.lifetimeEarnings) || 0,
    Number(currentUser && currentUser.totalIncome) || 0,
    allCompletedMissionsSum
  );

  if (currentUser) {
    if (typeof currentUser.lifetimeEarnings !== 'number') {
      currentUser.lifetimeEarnings = Math.max(lifetimeEarnings, currentBal);
      lifetimeEarnings = currentUser.lifetimeEarnings;
      try { localStorage.setItem('aloSignedInUser', JSON.stringify(currentUser)); } catch(e) {}
    } else if (currentUser.lifetimeEarnings < lifetimeEarnings) {
      currentUser.lifetimeEarnings = lifetimeEarnings;
      try { localStorage.setItem('aloSignedInUser', JSON.stringify(currentUser)); } catch(e) {}
    }
  }

  const todayVal = dynamicToday.toFixed(2);
  const yesterdayVal = dynamicYesterday.toFixed(2);
  const weeklyVal = dynamicWeekly.toFixed(2);
  const monthlyVal = dynamicMonthly.toFixed(2);
  const lastMonthVal = '0.00';
  const totalRevenueVal = lifetimeEarnings.toFixed(2);
  const personalBalanceVal = lifetimeEarnings.toFixed(2); // "ব্যক্তিগত ভারসাম্য তে সারাজীবন এর আয় থাকবে"
  const balanceText = Number(currentBal).toFixed(2);      // "আর ভারসাম্য শুধু অখানে উইথড্র দিলে ব্যালেন্স জিরো হবে"

  setText('today-earnings-value', todayVal);
  setText('yesterday-earnings-value', yesterdayVal);
  setText('weekly-earnings-value', weeklyVal);
  setText('monthly-earnings-value', monthlyVal);
  setText('last-month-earnings-value', lastMonthVal);
  setText('total-revenue-value', totalRevenueVal);
  setText('personal-earnings-value', personalBalanceVal);

  const user = getCurrentUser();
  const rate = getUsdExchangeRate(user); // 126 for BD, 84 for IN
  const curr = getUserCurrency(user);
  const lang = (window.aloI18n ? window.aloI18n.getLanguage() : '') || (user && user.country === 'IN' ? 'hi' : (user && user.country === 'BD' ? 'bn' : 'en'));

  // Conversion: 126 BDT = $1.00 USD; 84 INR = $1.00 USD
  const profileUsdVal = (Number(currentBal) / rate).toFixed(2);
  setText('profile-balance-value', balanceText);
  setText('profile-usdt-value', profileUsdVal);
  setText('total-balance-value', balanceText);

  const rateBadge = lang === 'en'
    ? `(Rate: $1 = ${rate} ${curr})`
    : (lang === 'hi' ? `(दर: $1 = ${rate} ${curr})` : `(রেট: ১$ = ${rate === 126 ? '১২৬৳' : '৮৪₹'})`);
  setText('profile-usd-rate-badge', rateBadge);

  // 7 USD spans in 3x3 Grid
  setText('personal-earnings-usd', '$' + (Number(personalBalanceVal) / rate).toFixed(2));
  setText('yesterday-earnings-usd', '$' + (Number(yesterdayVal) / rate).toFixed(2));
  setText('today-earnings-usd', '$' + (Number(todayVal) / rate).toFixed(2));
  setText('weekly-earnings-usd', '$' + (Number(weeklyVal) / rate).toFixed(2));
  setText('monthly-earnings-usd', '$' + (Number(monthlyVal) / rate).toFixed(2));
  setText('last-month-earnings-usd', '$' + (Number(lastMonthVal) / rate).toFixed(2));
  setText('total-revenue-usd', '$' + (Number(totalRevenueVal) / rate).toFixed(2));

  // My Pass panel balance and USD equivalent
  const availBal = Number(currentBal);
  const frozenVal = Number((currentUser && currentUser.frozenBalance) || 0);
  const passTotal = frozenVal + availBal;
  const passUsd = (passTotal / rate).toFixed(2);
  setText('my-pass-balance-value', passTotal.toFixed(2));
  setText('my-pass-frozen-value', frozenVal.toFixed(2));
  setText('my-pass-available-value', availBal.toFixed(2));
  setText('my-pass-usd-subtext', `≈ $${passUsd} USD ${rateBadge}`);

  renderWithdrawalHistory();

  // Completed missions count & remaining based on actual package quota
  const completedTodayCount = completedMissions.filter(function(m) {
    const d = getCompletedAt(m);
    return d && d >= startOfToday;
  }).length;

  const currentLevel = (currentUser && currentUser.packageLevel) || 'LV0';
  const currentLevelSetting = packageTaskSettings[currentLevel] || packageTaskSettings.LV0;
  const totalDailyQuota = currentLevelSetting ? currentLevelSetting.count : 5;
  const remainingTodayCount = Math.max(0, totalDailyQuota - completedTodayCount);

  setText('completed-tasks-value', String(completedTodayCount));
  setText('remaining-tasks-value', String(remainingTodayCount));
}
window.updateProfileMetrics = updateProfileMetrics;

function saveAcceptedMission(serverMission) {
  const allMissions = readAllMissionsRaw();
  let curPhone = '';
  try {
    const u = JSON.parse(localStorage.getItem('aloSignedInUser') || 'null');
    curPhone = u ? normalizeBdPhone(u.phone || u.accountNumber || '') : '';
  } catch(e) {}
  allMissions.unshift({
    id: serverMission.id,
    userPhone: curPhone || serverMission.userPhone || '',
    taskIndex: typeof serverMission.taskIndex === 'number' ? serverMission.taskIndex : parseInt(serverMission.taskIndex || '0', 10),
    platform: serverMission.platform,
    title: serverMission.title,
    description: serverMission.description,
    level: serverMission.level,
    reward: serverMission.reward,
    status: serverMission.status,
    acceptedAt: serverMission.acceptedAt,
    evidenceName: '',
    taskLink: serverMission.taskLink || (serverMission.platform === 'TikTok' ? 'https://vt.tiktok.com/ZSb666bLY/' : '')
  });
  saveAllMissionsRaw(allMissions);
  renderMissionRecords(activeMissionFilter);
}

function showTaskCenterToast(text) {
  let modal = document.getElementById('task-center-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'task-center-modal';
    modal.className = 'fixed inset-0 z-[10050] flex items-center justify-center bg-black/60 backdrop-blur-xs transition-opacity duration-200 pointer-events-none select-none';
    modal.innerHTML = `
      <div class="relative bg-[#071638] border border-[#1e429f] rounded-2xl px-7 py-6 flex flex-col items-center justify-center shadow-[0_12px_40px_rgba(0,0,0,0.85)] text-center min-w-[240px] max-w-[300px] mx-4 animate-in zoom-in-95 duration-200">
        <div class="w-13 h-13 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 flex items-center justify-center mb-3.5 shadow-md">
          <svg class="animate-spin w-7 h-7 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
        </div>
        <div class="text-[16px] font-bold text-white font-['Hind_Siliguri'] tracking-wide task-center-modal-text">
          ${text || 'গ্রহণ করা হচ্ছে'}
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const textEl = modal.querySelector('.task-center-modal-text');
  if (textEl) {
    textEl.textContent = text || 'গ্রহণ করা হচ্ছে';
  }

  modal.removeAttribute('hidden');
  modal.style.display = 'flex';
  modal.style.transition = 'opacity 0.15s ease';
  modal.style.opacity = '1';

  if (window.taskToastTimer) clearTimeout(window.taskToastTimer);
  window.taskToastTimer = setTimeout(function() {
    if (modal) {
      modal.style.transition = 'opacity 0.25s ease';
      modal.style.opacity = '0';
      setTimeout(function() {
        if (modal) {
          modal.style.display = 'none';
          modal.setAttribute('hidden', '');
        }
      }, 260);
    }
  }, 1300);
}
window.showTaskCenterToast = showTaskCenterToast;

function showTaskAcceptToast(title) {
  showTaskCenterToast(title || 'গ্রহণ করা হচ্ছে');
}
window.showTaskAcceptToast = showTaskAcceptToast;

function refreshDailyMissionLimit(level) {
  const message = document.getElementById('platform-task-message');
  const platformTaskList = document.getElementById('platform-task-list');
  const title = document.getElementById('platform-task-level-title');
  const note = document.getElementById('platform-task-level-note');
  
  const user = getCurrentUser();
  const isUnlocked = isLevelUnlocked(level, user);
  const userLevel = (user && user.packageLevel) || 'LV0';
  const userMaxQuota = (packageTaskSettings[userLevel] && packageTaskSettings[userLevel].count) || 5;
  const today = new Date().toDateString();
  const missions = readAcceptedMissions();
  const acceptedToday = missions.filter(function(m) {
    return m.level === level && m.status !== 'failed' && new Date(m.acceptedAt).toDateString() === today;
  });
  const allTodayAccepted = missions.filter(function(m) {
    return m.status !== 'failed' && new Date(m.acceptedAt).toDateString() === today;
  });

  const quotaLimit = (packageTaskSettings[level] && packageTaskSettings[level].count) || 5;
  const currentCount = acceptedToday.length;
  const reached = currentCount >= quotaLimit || allTodayAccepted.length >= userMaxQuota;

  const lang = (window.aloI18n ? window.aloI18n.getLanguage() : 'bn') || (user && user.country === 'IN' ? 'hi' : (user && user.country === 'BD' ? 'bn' : 'en'));

  // Clean, minimal header: NO quota bars or numbers on top
  if (title) {
    title.textContent = `${activePlatform} · ${level}`;
  }
  if (note) {
    note.textContent = lang === 'hi' ? 'आपके वर्तमान पैकेज के लिए उपलब्ध कार्य' : (lang === 'en' ? 'Available tasks for your package' : 'আপনার বর্তমান প্যাকেজের জন্য উপলভ্য কাজ');
  }

  // Update button states in task list
  if (platformTaskList) {
    const rows = platformTaskList.querySelectorAll('.platform-task-row');
    const limitReachedText = lang === 'hi' ? 'सीमा पूर्ण' : (lang === 'en' ? 'Limit Reached' : 'সীমা পূর্ণ');
    const acceptedText = lang === 'hi' ? 'स्वीकृत' : (lang === 'en' ? 'Accepted' : 'গৃহীত');
    const acceptText = lang === 'hi' ? 'स्वीकारें' : (lang === 'en' ? 'Accept' : 'গ্রহণ');

    rows.forEach(function(row) {
      const btn = row.querySelector('[data-platform-accept]');
      if (!btn) return;
      const taskIdx = parseInt(row.dataset.taskIndex || '-1', 10);
      const isTaskAccepted = missions.some(function(m) {
        return m.platform === activePlatform && m.level === level && m.status !== 'failed' && Number(m.taskIndex) === Number(taskIdx) && new Date(m.acceptedAt).toDateString() === today;
      });

      if (!isUnlocked) {
        btn.textContent = lang === 'hi' ? 'लॉक 🔒' : (lang === 'en' ? 'Locked 🔒' : 'লকড 🔒');
        btn.disabled = false;
        btn.className = 'platform-task-accept bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30';
        btn.dataset.lockedLevel = level;
      } else if (isTaskAccepted || btn.dataset.accepted === 'true') {
        btn.textContent = acceptedText;
        btn.disabled = true;
        btn.className = 'platform-task-accept is-accepted';
        btn.dataset.accepted = 'true';
        btn.removeAttribute('data-limit-reached');
      } else if (reached) {
        btn.textContent = limitReachedText;
        btn.disabled = true;
        btn.className = 'platform-task-accept is-limit-reached';
        btn.dataset.limitReached = 'true';
        btn.removeAttribute('data-accepted');
      } else {
        btn.textContent = acceptText;
        btn.disabled = false;
        btn.className = 'platform-task-accept';
        btn.removeAttribute('data-limit-reached');
        btn.removeAttribute('data-accepted');
      }
    });
  }

  if (message) {
    if (reached) {
      const limitTitle = lang === 'hi' ? 'आज की कार्य सीमा पूर्ण हो चुकी है' : (lang === 'en' ? 'Daily task limit reached' : 'আজকের কাজের সীমা পূর্ণ হয়েছে');
      message.innerHTML = `<span style="color: var(--color-warning); font-weight: bold;">${limitTitle}</span>`;
    } else {
      message.innerHTML = '';
    }
  }
}

function renderMissionRecords(filter) {
  const list = document.getElementById('mission-record-list');
  if (!list) return;

  updateProfileMetrics();
  activeMissionFilter = filter || activeMissionFilter;
  const missions = readAcceptedMissions();
  const counts = {
    active: missions.filter(function(m) { return m.status === 'active'; }).length,
    review: missions.filter(function(m) { return m.status === 'review'; }).length,
    complete: missions.filter(function(m) { return m.status === 'complete'; }).length,
    failed: missions.filter(function(m) { return m.status === 'failed'; }).length
  };
  const user = getCurrentUser();
  const lang = (window.aloI18n ? window.aloI18n.getLanguage() : '') || (user && user.country === 'IN' ? 'hi' : (user && user.country === 'BD' ? 'bn' : 'en'));
  const curr = getUserCurrency(user);

  const tabActive = document.querySelector('.mission-record-tab[data-mission-filter="active"]');
  const tabReview = document.querySelector('.mission-record-tab[data-mission-filter="review"]');
  const tabComplete = document.querySelector('.mission-record-tab[data-mission-filter="complete"]');
  const tabFailed = document.querySelector('.mission-record-tab[data-mission-filter="failed"]');
  if (tabActive) {
    const lbl = lang === 'hi' ? 'चालू' : (lang === 'en' ? 'In Progress' : 'চলমান');
    tabActive.innerHTML = `${lbl}<span id="mission-active-count">(${counts.active})</span>`;
  }
  if (tabReview) {
    const lbl = lang === 'hi' ? 'समीक्षा' : (lang === 'en' ? 'Under Review' : 'পর্যালোচনা');
    tabReview.innerHTML = `${lbl}<span id="mission-review-count">(${counts.review})</span>`;
  }
  if (tabComplete) {
    const lbl = lang === 'hi' ? 'সম্পন্ন' : (lang === 'en' ? 'Completed' : 'সম্পন্ন');
    tabComplete.innerHTML = `${lbl}<span id="mission-complete-count">(${counts.complete})</span>`;
  }
  if (tabFailed) {
    const lbl = lang === 'hi' ? 'रद्द' : (lang === 'en' ? 'Cancelled' : 'বাতিল');
    tabFailed.innerHTML = `${lbl}<span id="mission-failed-count">(${counts.failed})</span>`;
  }

  document.querySelectorAll('.mission-record-tab').forEach(function(tab) {
    tab.setAttribute('aria-selected', String(tab.dataset.missionFilter === activeMissionFilter));
  });

  const visibleMissions = missions.filter(function(mission) {
    return mission.status === activeMissionFilter;
  });

  list.replaceChildren();

  if (visibleMissions.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'dashboard-card px-5 py-12 text-center';
    let emptyMsg = lang === 'hi' ? 'इस सूची में अभी कोई कार्य नहीं है।' : (lang === 'en' ? 'No tasks in this list yet.' : 'এই তালিকায় এখনো কোনো কাজ নেই।');
    let subMsg = lang === 'hi' ? 'मिशन हॉल से कार्य स्वीकार करने पर वे यहां दिखेंगे।' : (lang === 'en' ? 'Accept tasks from Mission Hall to see them here.' : 'মিশন হল থেকে কাজ গ্রহণ করলে এখানে দেখা যাবে।');
    if (activeMissionFilter === 'review') {
      emptyMsg = lang === 'hi' ? 'वर्तमान में कोई कार्य समीक्षाधीन नहीं है।' : (lang === 'en' ? 'No tasks currently under review.' : 'বর্তমানে কোনো কাজ পর্যালোচনাধীন নেই।');
      subMsg = lang === 'hi' ? 'चलते हुए कार्य सबमिट करने पर 5-10 मिनट तक समीक्षा में रहते हैं।' : (lang === 'en' ? 'Submitted tasks remain under review for 5-10 minutes.' : 'চলমান কাজ জমা দিলে ৫-১০ মিনিট পর্যালোচনায় থাকবে।');
    } else if (activeMissionFilter === 'complete') {
      emptyMsg = lang === 'hi' ? 'अभी तक कोई कार्य पूर्ण नहीं हुआ है।' : (lang === 'en' ? 'No tasks completed yet.' : 'এখনো কোনো কাজ সম্পূর্ণ হয়নি।');
      subMsg = lang === 'hi' ? 'समीक्षा पूरी होने के बाद कार्य यहाँ स्थायी रूप से संग्रहीत रहेंगे।' : (lang === 'en' ? 'Completed tasks are permanently archived here.' : 'সম্পূর্ণ কাজগুলো এখানে এককালীন সংরক্ষিত থাকবে।');
    } else if (activeMissionFilter === 'failed') {
      emptyMsg = lang === 'hi' ? 'अभी तक कोई कार्य रद्द नहीं हुआ है।' : (lang === 'en' ? 'No cancelled tasks yet.' : 'এখনো কোনো কাজ বাতিল হয়নি।');
      subMsg = lang === 'hi' ? 'रद्द किए गए कार्य यहाँ स्थायी रूप से संग्रहीत रहेंगे।' : (lang === 'en' ? 'Cancelled tasks are permanently archived here.' : 'বাতিল করা কাজগুলো এখানে এককালীন সংরক্ষিত থাকবে।');
    }
    empty.innerHTML = `<span class="text-3xl" aria-hidden="true">▤</span><p class="mt-3 text-sm font-semibold">${emptyMsg}</p><p class="mt-2 text-xs" style="color: var(--color-muted);">${subMsg}</p>`;
    list.appendChild(empty);
    return;
  }

  const now = Date.now();

  visibleMissions.forEach(function(mission) {
    const card = document.createElement('article');
    card.className = 'mission-record-card p-4 space-y-3 relative overflow-hidden';
    card.style.background = 'transparent';
    card.style.border = 'none';

    const acceptedDate = new Date(mission.acceptedAt || Date.now());
    const dateText = Number.isNaN(acceptedDate.getTime())
      ? '—'
      : acceptedDate.getFullYear() + '-' + String(acceptedDate.getMonth() + 1).padStart(2, '0') + '-' + String(acceptedDate.getDate()).padStart(2, '0') + ' ' + String(acceptedDate.getHours()).padStart(2, '0') + ':' + String(acceptedDate.getMinutes()).padStart(2, '0');

    const rewMoney = Number(mission.reward || 0);
    const usdVal = formatUsd(rewMoney, user);
    const rewFormatted = lang === 'bn' ? `${formatBanglaNumber(rewMoney)}.০০` : `${rewMoney.toFixed(2)}`;

    let actionsHtml = '';

    if (mission.status === 'active') {
      const statusLabel = lang === 'hi' ? 'चालू' : (lang === 'en' ? 'In Progress' : 'চলমান');
      const cancelLabel = lang === 'hi' ? 'रद्द करें' : (lang === 'en' ? 'Cancel' : 'বাতিল করুন');
      const submitLabel = lang === 'hi' ? 'जमा करें →' : (lang === 'en' ? 'Submit →' : 'জমা দিন →');
      actionsHtml = `
        <div class="mission-record-actions flex items-center justify-between gap-2 pt-2">
          <span class="text-xs px-2.5 py-1 rounded font-semibold" style="background: rgba(37, 244, 238, 0.1); color: var(--color-profile-cyan);">${statusLabel}</span>
          <div class="flex gap-2">
            <button type="button" class="mission-cancel-button px-3 py-1.5 rounded text-xs font-semibold cursor-pointer hover:bg-slate-800 transition" style="border: 1px solid var(--color-profile-border); color: var(--color-muted);" data-cancel-mission>${cancelLabel}</button>
            <button type="button" class="mission-submit-button px-4 py-1.5 rounded text-xs font-bold cursor-pointer hover:opacity-90 active:scale-95 transition" style="background: var(--color-profile-cyan); color: #000;" data-open-submission>${submitLabel}</button>
          </div>
        </div>
      `;
    } else if (mission.status === 'review') {
      const endsAt = mission.reviewEndsAt || (new Date(mission.submittedAt || Date.now()).getTime() + 15 * 60 * 1000);
      const remainingSec = Math.max(0, Math.ceil((endsAt - now) / 1000));
      const mins = Math.floor(remainingSec / 60);
      const secs = remainingSec % 60;
      const timeStr = String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');

      const reviewLabel = lang === 'hi' ? 'समीक्षाधीन: शेष' : (lang === 'en' ? 'Under Review: Left' : 'পর্যালোচনাধীন: বাকি');
      const minsLabel = lang === 'hi' ? 'मिनट' : (lang === 'en' ? 'mins' : 'মিনিট');

      actionsHtml = `
        <div class="mission-card-review-bar mt-2 flex items-center justify-between gap-2 relative z-10">
          <div class="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <span class="inline-block w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span>${reviewLabel} <span class="review-timer-text font-mono font-bold text-amber-300" data-review-ends="${endsAt}">${timeStr}</span> ${minsLabel}</span>
          </div>
        </div>
      `;
    } else if (mission.status === 'complete') {
      const compDate = new Date(mission.completedAt || Date.now());
      const compDateText = compDate.getFullYear() + '-' + String(compDate.getMonth() + 1).padStart(2, '0') + '-' + String(compDate.getDate()).padStart(2, '0') + ' ' + String(compDate.getHours()).padStart(2, '0') + ':' + String(compDate.getMinutes()).padStart(2, '0');

      const compSuccessLabel = lang === 'hi' ? 'समीक्षा सफल — इनाम बैलेंस में जुड़ गया' : (lang === 'en' ? 'Review Successful — Reward credited' : 'পর্যালোচনা সফল — পুরস্কার ব্যালেন্সে জমা হয়েছে');
      const compTimeLabel = lang === 'hi' ? 'সম্পন্নের সময়:' : (lang === 'en' ? 'Completed at:' : 'সম্পন্নের সময়:');

      actionsHtml = `
        <div class="mission-card-complete-bar mt-2.5 pt-2 flex items-center justify-between text-xs">
          <span class="font-bold flex items-center gap-1.5" style="color: #34d399;">
            <span>✓</span> ${compSuccessLabel}
          </span>
          <span class="font-bold font-mono" style="color: var(--color-profile-cyan);">+${rewFormatted} ${curr}</span>
        </div>
        <p class="text-[11px] mt-1" style="color: var(--color-muted);">${compTimeLabel} ${compDateText}</p>
      `;
    } else if (mission.status === 'failed') {
      const cancelDate = new Date(mission.cancelledAt || mission.failedAt || Date.now());
      const cancelDateText = cancelDate.getFullYear() + '-' + String(cancelDate.getMonth() + 1).padStart(2, '0') + '-' + String(cancelDate.getDate()).padStart(2, '0') + ' ' + String(cancelDate.getHours()).padStart(2, '0') + ':' + String(cancelDate.getMinutes()).padStart(2, '0');

      const cancelSuccessLabel = lang === 'hi' ? 'कार्य रद्द — रिकॉर्ड में सुरक्षित' : (lang === 'en' ? 'Task Cancelled — Permanently Archived' : 'কাজটি বাতিল — রেকর্ডে এককালীন সংরক্ষিত');
      const cancelTimeLabel = lang === 'hi' ? 'বাতিলের সময়:' : (lang === 'en' ? 'Cancelled at:' : 'বাতিলের সময়:');

      actionsHtml = `
        <div class="mission-card-failed-bar mt-2.5 pt-2 flex items-center justify-between text-xs">
          <span class="font-bold flex items-center gap-1.5 text-rose-400">
            <span>✕</span> ${cancelSuccessLabel}
          </span>
          <span class="font-bold font-mono text-rose-400/90 bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 rounded text-[11px]">${lang === 'hi' ? 'रद्द' : (lang === 'en' ? 'Cancelled' : 'বাতিল')}</span>
        </div>
        <p class="text-[11px] mt-1" style="color: var(--color-muted);">${cancelTimeLabel} ${cancelDateText}</p>
      `;
    }

    const rewLabel = lang === 'hi' ? 'इनाम' : (lang === 'en' ? 'Reward' : 'পুরস্কার');
    const taskLabel = lang === 'hi' ? 'कार्य:' : (lang === 'en' ? 'Task:' : 'কাজ:');
    const acceptLabel = lang === 'hi' ? 'स्वीकृति समय:' : (lang === 'en' ? 'Accepted at:' : 'গ্রহণের সময়:');
    const proofLabel = lang === 'hi' ? 'सबमिट किया गया प्रमाण:' : (lang === 'en' ? 'Submitted Proof:' : 'জমা দেওয়া প্রমাণ:');
    const previewLabel = lang === 'hi' ? 'प्रिव्यू देखें 🔍' : (lang === 'en' ? 'Preview 🔍' : 'প্রিভিউ দেখুন 🔍');
    const descText = getPlatformTaskDescription(mission.platform, mission.taskIndex !== undefined ? mission.taskIndex : 0, lang) || mission.description;

    card.innerHTML = `
      ${mission.status === 'review' ? `
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none flex items-center justify-center -rotate-12 opacity-85">
          <img src="stamp-under-review.png" alt="UNDER REVIEW" class="w-32 sm:w-36 h-auto object-contain drop-shadow-[0_2px_10px_rgba(220,38,38,0.4)]" style="max-width: 135px;" />
        </div>
      ` : ''}
      ${mission.status === 'complete' ? `
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none flex items-center justify-center -rotate-12 opacity-85">
          <img src="stamp-mission-complete.png" alt="MISSION: COMPLETE" class="w-36 sm:w-40 h-auto object-contain drop-shadow-[0_2px_10px_rgba(220,38,38,0.4)]" style="max-width: 155px;" />
        </div>
      ` : ''}
      ${mission.status === 'failed' ? `
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none flex items-center justify-center -rotate-12 opacity-85">
          <div class="border-[3px] border-dashed border-rose-500/80 rounded-xl px-5 py-2 text-rose-500 font-black text-xl sm:text-2xl uppercase tracking-widest drop-shadow-[0_2px_12px_rgba(244,63,94,0.45)] rotate-[-6deg] bg-rose-950/30 backdrop-blur-xs select-none">
            ${lang === 'hi' ? 'रद्द' : (lang === 'en' ? 'CANCELLED' : 'বাতিল')}
          </div>
        </div>
      ` : ''}
      <div class="mission-card-top flex items-center justify-between gap-3 relative z-10">
        <div class="flex min-w-0 items-center gap-2.5 relative">
          <span class="mission-record-icon flex shrink-0 items-center justify-center">${getPlatformSvg(mission.platform, "h-6 w-6")}</span>
          <div class="relative inline-block">
            <h3 class="mission-platform-name truncate font-bold text-sm text-white">${mission.platform}</h3>
            <span class="text-[11px] px-1.5 py-0.5 rounded font-semibold" style="background: rgba(255,255,255,0.08); color: var(--color-muted);">${mission.level || 'LV0'}</span>
          </div>
        </div>
        <div class="text-right">
          <p class="text-[11px]" style="color: var(--color-muted);">${rewLabel}</p>
          <p class="mission-reward font-bold text-sm md:text-base font-mono" style="color: var(--color-profile-cyan);">${rewFormatted} ${curr}</p>
        </div>
      </div>
      <div class="mission-card-details text-xs leading-5 relative z-10" style="color: var(--color-profile-text);">
        <p class="text-slate-300">${taskLabel} <span class="font-medium text-slate-100">${descText}</span></p>
        <p class="text-slate-300">${acceptLabel} <span class="text-slate-400">${dateText}</span></p>
        ${mission.screenshot ? `
        <div class="mt-1.5 flex items-center justify-between gap-2 pt-1">
          <span class="text-[11px] text-slate-400">${proofLabel}</span>
          <button type="button" class="view-task-screenshot-btn flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0e2a66] border border-[#1b3e85] text-xs font-bold text-[#38bdf8] hover:bg-[#133785] transition cursor-pointer active:scale-95" data-task-screenshot="${mission.id}">
            <span>🖼️</span> <span>${previewLabel}</span>
          </button>
        </div>` : ''}
      </div>
      <div class="relative z-10">
        ${actionsHtml}
      </div>
    `;
    card.dataset.missionId = mission.id;
    list.appendChild(card);
  });
}
window.renderMissionRecords = renderMissionRecords;

function renderPackageTasks(level) {
  const platformTaskList = document.getElementById('platform-task-list');
  if (!platformTaskList) return;

  activePackageLevel = packageTaskSettings[level] ? level : 'LV0';
  const user = getCurrentUser();
  const isUnlocked = isLevelUnlocked(activePackageLevel, user);
  const settings = packageTaskSettings[activePackageLevel];
  const userLevel = (user && user.packageLevel) || 'LV0';
  const userMaxQuota = (packageTaskSettings[userLevel] && packageTaskSettings[userLevel].count) || 5;

  const today = new Date().toDateString();
  const missions = readAcceptedMissions();
  const acceptedToday = missions.filter(function(m) {
    return m.level === activePackageLevel && m.status !== 'failed' && new Date(m.acceptedAt).toDateString() === today;
  });
  const allTodayAccepted = missions.filter(function(m) {
    return m.status !== 'failed' && new Date(m.acceptedAt).toDateString() === today;
  });
  const quotaLimit = settings.count;
  const isLimitReached = acceptedToday.length >= quotaLimit || allTodayAccepted.length >= userMaxQuota;

  const TOTAL_TASKS_TO_DISPLAY = Math.max(30, (settings.count || 5) + 5);
  const rows = [];

  const lang = (window.aloI18n ? window.aloI18n.getLanguage() : '') || (user && user.country === 'IN' ? 'hi' : (user && user.country === 'BD' ? 'bn' : 'en'));
  const curr = getUserCurrency(user);

  for (let i = 0; i < TOTAL_TASKS_TO_DISPLAY; i++) {
    const isThisAccepted = missions.some(function(m) {
      return m.platform === activePlatform && m.level === activePackageLevel && m.status !== 'failed' && Number(m.taskIndex) === Number(i) && new Date(m.acceptedAt).toDateString() === today;
    });

    let btnText = lang === 'hi' ? 'स्वीकारें' : (lang === 'en' ? 'Accept' : 'গ্রহণ');
    let btnDisabled = false;
    let extraAttr = '';
    let btnClass = 'platform-task-accept';

    if (!isUnlocked) {
      btnText = lang === 'hi' ? 'लॉक 🔒' : (lang === 'en' ? 'Locked 🔒' : 'লকড 🔒');
      btnDisabled = false;
      extraAttr = `data-locked-level="${activePackageLevel}"`;
      btnClass = 'platform-task-accept bg-[#0c2364] text-[#35c6e7] border border-[#35c6e7]/40 hover:bg-[#1264c9] hover:text-white transition';
    } else if (isThisAccepted) {
      btnText = lang === 'hi' ? 'स्वीकृत' : (lang === 'en' ? 'Accepted' : 'গৃহীত');
      btnDisabled = true;
      btnClass = 'platform-task-accept is-accepted';
      extraAttr = 'data-accepted="true"';
    } else if (isLimitReached) {
      btnText = lang === 'hi' ? 'कोटा पूर्ण' : (lang === 'en' ? 'Limit Reached' : 'সীমা পূর্ণ');
      btnDisabled = true;
      btnClass = 'platform-task-accept is-limit-reached';
      extraAttr = 'data-limit-reached="true"';
    }

    const taskTitle = lang === 'hi' ? `${activePlatform} · कार्य ${i + 1}` : (lang === 'en' ? `${activePlatform} · Task ${i + 1}` : `${activePlatform} · কাজ ${i + 1}`);
    const typeLabel = lang === 'hi' ? 'कार्य प्रकार:' : (lang === 'en' ? 'Task Type:' : 'কাজের ধরন:');
    const tierLabel = lang === 'hi' ? 'स्तर:' : (lang === 'en' ? 'Tier:' : 'স্তর:');
    const rewHeading = lang === 'hi' ? 'दैनिक पुरस्कार' : (lang === 'en' ? 'Daily Reward' : 'দৈনিক পুরস্কার');
    const rewVal = lang === 'bn' ? `${formatBanglaNumber(settings.reward)}.০০` : `${settings.reward}.00`;
    const usdVal = formatUsd(settings.reward, user);
    const progressLabel = lang === 'hi' ? 'प्रगति:' : (lang === 'en' ? 'Progress:' : 'অগ্রগতি:');
    const progressVal = lang === 'bn'
      ? `১০০০০০ / ৯${formatBanglaNumber(1200 + (i * 37) % 800)}`
      : `100000 / 9${1200 + (i * 37) % 800}`;
    const taskDesc = getPlatformTaskDescription(activePlatform, i, lang);

    const row = document.createElement('article');
    row.className = 'platform-task-row flex items-start gap-3 py-5';
    row.dataset.taskIndex = String(i);
    row.innerHTML = `
      <span class="platform-task-icon flex shrink-0 items-center justify-center pt-1" aria-hidden="true">
        ${getPlatformSvg(activePlatform, 'h-7 w-7')}
      </span>
      <div class="min-w-0 flex-1">
        <h3 class="font-bold text-sm">${taskTitle}</h3>
        <p class="mt-1 text-xs leading-5" style="color: var(--color-muted);">${typeLabel} ${taskDesc}</p>
        <div class="mt-2 flex items-center gap-3 text-xs">
          <p>${tierLabel} <span class="platform-task-level">${activePackageLevel}</span></p>
          <p style="color: var(--color-muted);">${progressLabel} <span class="font-semibold" style="color: var(--color-profile-text);">${progressVal}</span></p>
        </div>
      </div>
      <div class="flex shrink-0 flex-col items-end gap-2.5">
        <div class="text-right">
          <p class="text-[10px]" style="color: var(--color-muted);">${rewHeading}</p>
          <p class="font-bold text-sm font-mono" style="color: var(--color-profile-blue-text);">${rewVal} ${curr}</p>
        </div>
        <button type="button" class="${btnClass}" data-platform-accept ${btnDisabled ? 'disabled' : ''} ${extraAttr}>${btnText}</button>
      </div>
    `;
    rows.push(row);
  }

  platformTaskList.replaceChildren(...rows);
  const headerLvl = document.getElementById('platform-task-header-level');
  if (headerLvl) {
    const listTitle = lang === 'hi' ? `${activePackageLevel} मिशन सूची` : (lang === 'en' ? `${activePackageLevel} Mission List` : `${activePackageLevel} মিশন তালিকা`);
    headerLvl.textContent = listTitle;
  }
  refreshDailyMissionLimit(activePackageLevel);
}
window.renderPackageTasks = renderPackageTasks;

function compressMissionScreenshot(file) {
  return new Promise(function(resolve, reject) {
    const reader = new FileReader();
    reader.onerror = function() { reject(new Error('স্ক্রিনশটটি পড়া যায়নি।')); };
    reader.onload = function() {
      const image = new Image();
      image.onerror = function() { reject(new Error('স্ক্রিনশটটি খোলা যায়নি।')); };
      image.onload = function() {
        const maxSide = 900;
        const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.72));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function renderMissionSubmission() {
  const missions = readAcceptedMissions();
  const mission = missions.find(function(item) { return item.id === activeSubmissionId; });
  if (!mission) {
    openDashboardPanel('tasks');
    return;
  }

  const user = getCurrentUser();
  const curr = getUserCurrency(user);
  const lang = (window.aloI18n ? window.aloI18n.getLanguage() : '') || (user && user.country === 'IN' ? 'hi' : (user && user.country === 'BD' ? 'bn' : 'en'));

  const platformEl = document.getElementById('mission-submit-platform');
  if (platformEl) platformEl.textContent = mission.platform || 'YouTube';

  const platformIconEl = document.getElementById('mission-submit-platform-icon');
  if (platformIconEl) {
    platformIconEl.innerHTML = getPlatformSvg(mission.platform, 'h-5 w-5');
  }

  // Reward formatted with local currency without USD (USD calculation only in profile)
  const rewardEl = document.getElementById('mission-submit-reward');
  if (rewardEl) {
    const rew = Number(mission.reward || 30);
    rewardEl.textContent = `${rew.toFixed(2)} ${curr}`;
  }

  // Localized task description
  const descEl = document.getElementById('mission-submit-description');
  if (descEl) {
    const localizedDesc = getPlatformTaskDescription(mission.platform, mission.taskIndex !== undefined ? mission.taskIndex : 0, lang);
    descEl.textContent = localizedDesc || mission.description || (lang === 'en' ? 'Like & Follow' : 'পছন্দ লক্ষ্য করা');
  }

  // Localized static labels
  const titleLbl = document.getElementById('mission-submit-title-lbl');
  if (titleLbl) titleLbl.textContent = lang === 'hi' ? 'कार्य शीर्षक:' : (lang === 'en' ? 'Task Title:' : 'টাস্ক শিরোনাম:');
  const rewardLbl = document.getElementById('mission-submit-reward-lbl');
  if (rewardLbl) rewardLbl.textContent = lang === 'hi' ? 'मिशन लाभ:' : (lang === 'en' ? 'Mission Benefit:' : 'মিশন সুবিধা:');
  const descLbl = document.getElementById('mission-submit-desc-lbl');
  if (descLbl) descLbl.textContent = lang === 'hi' ? 'मिशन विवरण:' : (lang === 'en' ? 'Mission Description:' : 'মিশনের বিবরণ:');
  const linkLbl = document.getElementById('mission-submit-link-lbl');
  if (linkLbl) linkLbl.textContent = lang === 'hi' ? 'कार्य लिंक:' : (lang === 'en' ? 'Task Link:' : 'টাস্ক লিঙ্ক:');
  const createdLbl = document.getElementById('mission-submit-created-lbl');
  if (createdLbl) createdLbl.textContent = lang === 'hi' ? 'बनाने का समय:' : (lang === 'en' ? 'Creation Time:' : 'সৃষ্টির সময়:');
  const commentLbl = document.getElementById('mission-submit-comment-lbl');
  if (commentLbl) commentLbl.textContent = lang === 'hi' ? 'टिप्पणी' : (lang === 'en' ? 'Comment' : 'মন্তব্য');

  // Header translations
  const backSpan = document.querySelector('#mission-submit-panel .personal-header-action span');
  if (backSpan) backSpan.textContent = lang === 'hi' ? 'वापस जाएं' : (lang === 'en' ? 'Back' : 'ফিরে যান');
  const headerTitle = document.querySelector('#mission-submit-panel h2');
  if (headerTitle) headerTitle.textContent = lang === 'hi' ? 'मिशन विवरण' : (lang === 'en' ? 'Mission Details' : 'মিশন বিবরণ');

  // Localized rubber stamp
  const stampEl = document.getElementById('mission-submit-stamp-text');
  if (stampEl) {
    stampEl.textContent = mission.status === 'review' ? 'UNDER REVIEW' : (mission.status === 'complete' ? (lang === 'hi' ? 'पूर्ण' : (lang === 'en' ? 'COMPLETE' : 'সম্পন্ন')) : (lang === 'hi' ? 'चालू' : (lang === 'en' ? 'IN PROGRESS' : 'চলমান')));
  }
  const submitReviewStamp = document.getElementById('mission-submit-review-stamp');
  const submitCompleteStamp = document.getElementById('mission-submit-complete-stamp');
  if (submitReviewStamp) {
    if (mission.status === 'review') {
      submitReviewStamp.classList.remove('hidden');
    } else {
      submitReviewStamp.classList.add('hidden');
    }
  }
  if (submitCompleteStamp) {
    if (mission.status === 'complete') {
      submitCompleteStamp.classList.remove('hidden');
    } else {
      submitCompleteStamp.classList.add('hidden');
    }
  }

  // Localize buttons
  const openBtn = document.getElementById('mission-submit-open');
  if (openBtn) {
    openBtn.textContent = lang === 'hi' ? 'लिंक खोलें' : (lang === 'en' ? 'Open Link' : 'খোলা সংযুক্তি');
  }
  const copyBtn = document.getElementById('mission-submit-copy');
  if (copyBtn) {
    copyBtn.textContent = lang === 'hi' ? 'कॉपी लिंक' : (lang === 'en' ? 'Copy Link' : 'অনুলিপি');
  }
  const confirmBtn = document.getElementById('mission-submit-confirm');
  if (confirmBtn) {
    confirmBtn.textContent = lang === 'hi' ? 'जमा करें' : (lang === 'en' ? 'Submit' : 'জমা');
  }
  const cancelBtn = document.getElementById('mission-submit-cancel');
  if (cancelBtn) {
    cancelBtn.textContent = lang === 'hi' ? 'रद्द करें' : (lang === 'en' ? 'Cancel' : 'বাতিল করুন');
  }
  const uploadLabel = document.getElementById('mission-upload-label');
  if (uploadLabel) {
    uploadLabel.innerHTML = lang === 'hi'
      ? '<p>स्क्रीनशॉट</p><p>अपलोड</p><p>करें</p>'
      : (lang === 'en' ? '<p>Upload</p><p>Screen-</p><p>shot</p>' : '<p>স্ক্রিনশট</p><p>আপলোড</p><p>করুন</p>');
  }
  const viewPreviewBtnEl = document.getElementById('btn-view-preview-modal');
  if (viewPreviewBtnEl) {
    viewPreviewBtnEl.innerHTML = lang === 'hi'
      ? '<span>🔍 पूर्वावलोकन देखें</span>'
      : (lang === 'en' ? '<span>🔍 View Preview</span>' : '<span>🔍 প্রিভিউ দেখুন</span>');
  }

  const defaultUrl = mission.taskLink || getRealisticTaskUrl(mission.platform, mission.taskIndex || 0);
  const linkEl = document.getElementById('mission-submit-link');
  if (linkEl) linkEl.value = defaultUrl;

  const linkDisplay = document.getElementById('mission-submit-link-display');
  if (linkDisplay) {
    linkDisplay.textContent = defaultUrl.length > 26 ? defaultUrl.slice(0, 24) + '...' : defaultUrl;
    linkDisplay.title = defaultUrl;
  }

  const createdEl = document.getElementById('mission-submit-created');
  if (createdEl) {
    const accDate = new Date(mission.acceptedAt || Date.now());
    if (Number.isNaN(accDate.getTime())) {
      createdEl.textContent = '2022-05-22 11:31:58';
    } else {
      const yr = accDate.getFullYear();
      const mo = String(accDate.getMonth() + 1).padStart(2, '0');
      const da = String(accDate.getDate()).padStart(2, '0');
      const hr = String(accDate.getHours()).padStart(2, '0');
      const mi = String(accDate.getMinutes()).padStart(2, '0');
      const se = String(accDate.getSeconds()).padStart(2, '0');
      createdEl.textContent = `${yr}-${mo}-${da} ${hr}:${mi}:${se}`;
    }
  }

  activeSubmissionImage = mission.screenshot || '';
  const previewEl = document.getElementById('mission-submit-preview');
  const removeImgBtn = document.getElementById('mission-submit-remove-img');
  const viewPreviewBtn = document.getElementById('btn-view-preview-modal');
  if (previewEl) {
    if (activeSubmissionImage) {
      previewEl.innerHTML = `<img src="${activeSubmissionImage}" alt="Screenshot" class="h-full w-full object-cover rounded cursor-pointer" style="width:100%;height:100%;object-fit:cover;border-radius:6px;display:block;" title="Click to view preview">`;
      if (removeImgBtn) removeImgBtn.classList.remove('hidden');
      if (viewPreviewBtn) {
        viewPreviewBtn.classList.remove('hidden');
        viewPreviewBtn.style.display = 'inline-flex';
      }
    } else {
      previewEl.innerHTML = `<svg viewBox="0 0 24 24" class="h-8 w-8 text-white transition group-hover:scale-110" fill="currentColor"><path d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm8 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/></svg>`;
      if (removeImgBtn) removeImgBtn.classList.add('hidden');
      if (viewPreviewBtn) {
        viewPreviewBtn.classList.add('hidden');
        viewPreviewBtn.style.display = 'none';
      }
    }
  }
  const fileStatus = document.getElementById('mission-submit-file-status');
  if (fileStatus) fileStatus.textContent = '';

  const commentEl = document.getElementById('mission-submit-comment');
  if (commentEl) {
    commentEl.value = mission.userComment || '';
    commentEl.placeholder = lang === 'hi'
      ? 'कृपया यहां विवरण दर्ज करें...'
      : (lang === 'en' ? 'Please enter comment here...' : 'দয়া করে এখানে প্রবেশ করুন...');
  }
  const commentCount = document.getElementById('mission-submit-comment-count');
  if (commentCount) commentCount.textContent = commentEl ? commentEl.value.length : 0;

  const linkMsg = document.getElementById('mission-submit-link-message');
  if (linkMsg) linkMsg.innerHTML = '';
  const submitMsg = document.getElementById('mission-submit-message');
  if (submitMsg) submitMsg.innerHTML = '';

  updateMissionSubmitButton();
}
window.renderMissionSubmission = renderMissionSubmission;

function updateMissionSubmitButton() {
  const button = document.getElementById('mission-submit-confirm');
  if (!button) return;
  const linkEl = document.getElementById('mission-submit-link');
  const link = linkEl ? linkEl.value.trim() : '';
  button.disabled = !link;
}

function refreshAllMissionsAndMetrics() {
  updateProfileMetrics();
  if (typeof renderMissionRecords === 'function') {
    renderMissionRecords(activeMissionFilter);
  }
  if (typeof renderPackageTasks === 'function') {
    renderPackageTasks(activePackageLevel);
  }
  if (typeof renderMissionSubmission === 'function') {
    renderMissionSubmission();
  }
}
window.refreshAllMissionsAndMetrics = refreshAllMissionsAndMetrics;



// Open task link handler with iframe fallbacks
function handleOpenTaskLink() {
  const linkEl = document.getElementById('mission-submit-link');
  let url = linkEl ? linkEl.value.trim() : '';
  if (!url) {
    url = 'https://vt.tiktok.com/ZSb666bLY/';
  }
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  const msg = document.getElementById('mission-submit-link-message');

  try {
    window.open(url, '_blank', 'noopener,noreferrer');
  } catch (e) {}

  try {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (e) {}

  if (msg) {
    msg.innerHTML = `✓ লিংক নতুন ট্যাবে খোলা হচ্ছে। ব্রাউজারে পপআপ ব্লক থাকলে <a href="${url}" target="_blank" rel="noopener noreferrer" style="color: var(--color-profile-cyan); text-decoration: underline; font-weight: bold;">সরাসরি এখানে ক্লিক করুন ↗</a>`;
  }
}

// Copy task link handler with dual clipboard & fallback
function handleCopyTaskLink() {
  const linkEl = document.getElementById('mission-submit-link');
  const copyBtn = document.getElementById('mission-submit-copy');
  const msg = document.getElementById('mission-submit-link-message');
  const url = linkEl ? linkEl.value.trim() : '';

  if (!url) {
    if (msg) msg.textContent = 'কপি করার জন্য কোনো লিংক পাওয়া যায়নি!';
    return;
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    ta.style.top = '-9999px';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    ta.setSelectionRange(0, 99999);
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (e) {
      ok = false;
    }
    document.body.removeChild(ta);
    return ok;
  }

  function onCopied() {
    if (copyBtn) {
      const oldTxt = copyBtn.textContent;
      copyBtn.textContent = '✓ কপি সম্পন্ন!';
      copyBtn.style.background = 'var(--color-success)';
      setTimeout(function() {
        copyBtn.textContent = oldTxt;
        copyBtn.style.background = '';
      }, 2500);
    }
    if (msg) {
      msg.innerHTML = '<span style="color: #34d399; font-weight: bold;">✓ লিংক সফলভাবে অনুলিপি (কপি) করা হয়েছে!</span>';
    }
  }

  function onFail() {
    if (linkEl) {
      linkEl.focus();
      linkEl.select();
    }
    if (msg) {
      msg.innerHTML = '<span style="color: var(--color-warning);">লিংক সিলেক্ট করা হয়েছে, ম্যানুয়ালি কপি (Copy) করুন।</span>';
    }
  }

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(url).then(onCopied).catch(function() {
      if (fallbackCopy(url)) onCopied();
      else onFail();
    });
  } else {
    if (fallbackCopy(url)) onCopied();
    else onFail();
  }
}

// Check and process pending 5-10 minute reviews automatically
function checkPendingReviews() {
  const allMissions = readAllMissionsRaw();
  let curPhone = '';
  try {
    const u = JSON.parse(localStorage.getItem('aloSignedInUser') || 'null');
    curPhone = u ? normalizeBdPhone(u.phone || u.accountNumber || '') : '';
  } catch(e) {}

  let changed = false;
  let totalReward = 0;
  let completedInBatch = 0;
  const now = Date.now();

  allMissions.forEach(function(m) {
    const belongsToCurrent = !curPhone || !m.userPhone || normalizeBdPhone(m.userPhone) === curPhone;
    if (!belongsToCurrent) return;
    if (m.status === 'review') {
      if (!m.reviewEndsAt) {
        const subTime = m.submittedAt ? new Date(m.submittedAt).getTime() : now;
        m.reviewEndsAt = subTime + 15 * 60 * 1000;
      }
      if (now >= m.reviewEndsAt) {
        m.status = 'complete';
        m.completedAt = new Date().toISOString();
        if (!m.rewardCredited) {
          m.rewardCredited = true;
          totalReward += (Number(m.reward) || (packageTaskSettings[m.level || 'LV0']?.reward || 20));
          completedInBatch += 1;
        }
        changed = true;
      }
    }
  });

  if (changed) {
    saveAllMissionsRaw(allMissions);
    if (totalReward > 0) {
      let user = null;
      try {
        user = JSON.parse(localStorage.getItem('aloSignedInUser') || 'null');
      } catch(e) {}
      if (user) {
        user.balance = (Number(user.balance) || 0) + totalReward;
        user.todayIncome = (Number(user.todayIncome) || 0) + totalReward;
        user.totalIncome = (Number(user.totalIncome) || 0) + totalReward;
        user.lifetimeEarnings = (Number(user.lifetimeEarnings) || 0) + totalReward;
        user.completedMissions = (Number(user.completedMissions) || 0) + completedInBatch;
        localStorage.setItem('my_pass_available_bal', user.balance.toFixed(2));
        localStorage.setItem('aloSignedInUser', JSON.stringify(user));
        dbSaveUser(user).catch(function() {});
        updateUserDetails(user);
        updateProfileMetrics();
      }
    }
    renderMissionRecords(activeMissionFilter);
  }
}

// Live timer tick every second
setInterval(function() {
  checkPendingReviews();
  document.querySelectorAll('[data-review-ends]').forEach(function(el) {
    const ends = parseInt(el.dataset.reviewEnds || '0', 10);
    const rem = Math.max(0, Math.ceil((ends - Date.now()) / 1000));
    const m = Math.floor(rem / 60);
    const s = rem % 60;
    el.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  });
}, 1000);

// ==========================================
// REAL MULTI-LEVEL TEAM MANAGEMENT ("আমার দল")
// Matching user screenshot layout & site color theme
// ==========================================
let expandedTeamTiers = { 1: true, 2: false, 3: false };
let cachedTeamReportData = null;

function maskTeamPhone(raw) {
  if (!raw) return '01*******00';
  let digits = String(raw).trim().replace(/\D/g, '');
  if (digits.startsWith('880')) digits = digits.slice(3);
  if (!digits.startsWith('0') && digits.length === 10) digits = '0' + digits;
  if (digits.length >= 4) {
    const first2 = digits.slice(0, 2);
    const last2 = digits.slice(-2);
    const maskLen = Math.max(4, digits.length - 4);
    return `${first2}${'*'.repeat(maskLen)}${last2}`;
  }
  return digits || '01*******00';
}

function maskAccountPhone3(raw) {
  if (!raw) return '017*****000';
  let digits = String(raw).trim().replace(/\D/g, '');
  if (digits.startsWith('880')) digits = digits.slice(3);
  if (!digits.startsWith('0') && digits.length === 10) digits = '0' + digits;
  if (digits.length >= 6) {
    const first3 = digits.slice(0, 3);
    const last3 = digits.slice(-3);
    return `${first3}*****${last3}`;
  }
  return digits || '017*****000';
}

function formatMemberDate(isoStr) {
  if (!isoStr) return '';
  try {
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return '';
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  } catch(e) {
    return '';
  }
}

async function renderFreshTeamView() {
  const container = document.getElementById('team-fresh-accordion-container');
  if (!container) return;

  const user = getCurrentUser();
  const phone = (user && (user.phone || user.accountNumber)) || '';

  // Show loading indicator if first time
  if (!cachedTeamReportData) {
    container.innerHTML = `
      <div class="py-16 text-center text-slate-300">
        <div class="w-8 h-8 border-2 border-[#38bdf8] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p class="text-sm font-['Hind_Siliguri'] text-slate-300">দলের তথ্য লোড হচ্ছে…</p>
      </div>
    `;
  }

  const teamData = await dbGetRealTeam(phone);
  cachedTeamReportData = teamData;

  const tier1 = teamData.tier1 || [];
  const tier2 = teamData.tier2 || [];
  const tier3 = teamData.tier3 || [];

  const tiersConfig = [
    { tier: 1, name: 'প্রথম স্তর', list: tier1, badge: 'text-sky-400 bg-sky-500/15 border-sky-400/30' },
    { tier: 2, name: 'দ্বিতীয় স্তর', list: tier2, badge: 'text-blue-400 bg-blue-500/15 border-blue-400/30' },
    { tier: 3, name: 'তৃতীয় স্তর', list: tier3, badge: 'text-purple-400 bg-purple-500/15 border-purple-400/30' }
  ];

  let html = '';

  tiersConfig.forEach(function(cfg) {
    const t = cfg.tier;
    const isOpen = !!expandedTeamTiers[t];
    const arrow = isOpen ? '▼' : '▶';
    const countText = `${cfg.list.length} জন`;

    // Tier Accordion Header
    html += `
      <div class="team-tier-section border-b border-[#0d2258]/80 bg-[#040e2d]">
        <button type="button" class="team-tier-toggle-btn w-full flex items-center justify-between py-4 px-4 text-left transition cursor-pointer select-none bg-[#05143b] hover:bg-[#09225e] active:bg-[#0b286f]" data-tier="${t}">
          <div class="flex items-center gap-3">
            <span class="text-slate-400 text-xs font-bold w-4 text-center transition-transform duration-200">${arrow}</span>
            <span class="text-lg md:text-xl font-bold text-white font-['Hind_Siliguri'] tracking-wide">${cfg.name}</span>
          </div>
          <span class="text-xs font-bold px-2.5 py-1 rounded-full ${cfg.badge} border font-['Hind_Siliguri']">
            ${countText}
          </span>
        </button>
    `;

    // Tier Members Content
    if (isOpen) {
      if (cfg.list.length === 0) {
        html += `
          <div class="py-6 px-6 text-center text-xs text-slate-400 font-['Hind_Siliguri'] italic bg-[#030b24]">
            এই স্তরে এখনো কোনো সদস্য যুক্ত হয়নি
          </div>
        `;
      } else {
        html += `<div class="tier-members-list divide-y divide-[#0b1b42] bg-[#03091e]">`;
        cfg.list.forEach(function(m, idx) {
          const maskedPhone = maskTeamPhone(m.rawPhone || m.phone);
          const rawId = m.memberId ? String(m.memberId).replace(/^AL/i, '') : String(m.rawPhone || '').slice(-6);
          const memberId = rawId || '780385';
          const dateStr = formatMemberDate(m.joinedAt);
          // Alternate subtle avatar
          const avatarSrc = (idx % 2 === 0) ? '/team_avatar.png' : '/team_avatar_2.png';

          html += `
            <div class="team-member-row flex items-center justify-between py-3.5 px-4 hover:bg-[#06143b]/90 transition cursor-pointer group select-none" data-tier="${t}" data-idx="${idx}" data-phone="${m.rawPhone || m.phone}">
              <div class="flex items-center gap-3.5 pointer-events-none">
                <!-- 3D Avatar Image -->
                <div class="w-12 h-12 rounded-full overflow-hidden bg-[#091f50] border-2 border-[#1e429f] shrink-0 shadow-md">
                  <img src="${avatarSrc}" alt="Avatar" class="w-full h-full object-cover rounded-full" onerror="this.src='/team_avatar.png'" />
                </div>
                <div>
                  <!-- Phone with first 2 and last 2 digits, middle asterisks -->
                  <div class="font-bold text-white text-[15px] font-mono tracking-wider">${maskedPhone}</div>
                  <!-- ID:XXXXXX -->
                  <div class="text-[12px] text-slate-400 font-mono mt-0.5 tracking-wide">ID:${memberId}</div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="text-right pointer-events-none">
                  <div class="text-[11px] text-slate-400 font-mono tracking-tight">${dateStr}</div>
                </div>
                <!-- Slanted Up-Right Action Icon Button (↗) matching user screenshot -->
                <button type="button" class="team-member-detail-trigger w-8 h-8 rounded-full bg-[#071946] hover:bg-[#0b286f] active:scale-90 text-slate-300 hover:text-[#38bdf8] flex items-center justify-center transition cursor-pointer shrink-0 shadow-sm" data-tier="${t}" data-idx="${idx}" data-phone="${m.rawPhone || m.phone}" aria-label="ইউজার বিস্তারিত">
                  <svg class="w-4 h-4 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          `;
        });
        html += `</div>`;
      }
    }

    html += `</div>`;
  });

  container.innerHTML = html;

  if (window.aloI18n && typeof window.aloI18n.translateDOM === 'function' && window.aloI18n.getLanguage() !== 'bn') {
    window.aloI18n.translateDOM();
  }
}
window.renderFreshTeamView = renderFreshTeamView;

function toggleTeamTier(tier) {
  const t = Number(tier) || 1;
  expandedTeamTiers[t] = !expandedTeamTiers[t];
  renderFreshTeamView();
}
window.toggleTeamTier = toggleTeamTier;

// Deterministic UUID generator for members
function generateMemberUuid(seedStr) {
  const seed = String(seedStr || 'member');
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  const hex1 = Math.abs(h).toString(16).padStart(8, '0').slice(0, 8);
  const hex2 = Math.abs(Math.imul(h, 31)).toString(16).padStart(4, '0').slice(0, 4);
  const hex3 = '4' + Math.abs(Math.imul(h, 47)).toString(16).padStart(3, '0').slice(0, 3);
  const hex4 = 'a' + Math.abs(Math.imul(h, 71)).toString(16).padStart(3, '0').slice(0, 3);
  const hex5 = (Math.abs(Math.imul(h, 103)).toString(16) + Math.abs(Math.imul(h, 151)).toString(16)).padStart(12, '9').slice(0, 12);
  return `${hex1}-${hex2}-${hex3}-${hex4}-${hex5}`.toUpperCase();
}

async function openTeamMemberDetailModal(phoneOrMember, tierNum, idx) {
  const modal = document.getElementById('team-member-detail-modal');
  if (!modal) return;

  let member = null;
  const targetPhone = typeof phoneOrMember === 'string' ? phoneOrMember : (phoneOrMember && (phoneOrMember.rawPhone || phoneOrMember.phone));
  const t = Number(tierNum) || 1;
  const itemIdx = Number(idx) || 0;

  if (cachedTeamReportData) {
    const list = cachedTeamReportData[`tier${t}`] || cachedTeamReportData.all || [];
    member = list.find(function(m) { return (m.rawPhone === targetPhone || m.phone === targetPhone); }) || list[itemIdx] || null;
  }

  if (!member && typeof phoneOrMember === 'object' && phoneOrMember !== null) {
    member = phoneOrMember;
  }

  // Look up full account record in localStorage or Supabase
  let memberAcc = null;
  try {
    const accounts = JSON.parse(localStorage.getItem('aloAccounts') || '[]');
    memberAcc = accounts.find(function(a) {
      return normalizeBdPhone(a.phone || a.accountNumber || '') === normalizeBdPhone(targetPhone || '');
    });
  } catch(e) {}

  const rawPhone = targetPhone || (member && (member.rawPhone || member.phone)) || '';
  const maskedPhone = maskTeamPhone(rawPhone);
  const memberId = (member && member.memberId) || (memberAcc && memberAcc.memberId) || ('AL' + String(rawPhone).slice(-6));
  
  // Real or deterministic UUID matching screenshot format (L1 / 833948CE-2F16-49CD-A7C5-928A923BB489)
  let uuid = (memberAcc && (memberAcc.uuid || memberAcc.id)) || (member && (member.uuid || member.id));
  if (!uuid || String(uuid).length < 15 || !String(uuid).includes('-')) {
    uuid = generateMemberUuid(rawPhone || memberId);
  } else {
    uuid = String(uuid).toUpperCase();
  }

  // Member Name matching user screenshot
  let memberName = (memberAcc && (memberAcc.fullName || (memberAcc.name && memberAcc.name !== 'সদস্য' ? memberAcc.name : ''))) ||
                   (member && (member.fullName || (member.name && member.name !== 'সদস্য' ? member.name : ''))) || '';
  if (!memberName) {
    if (memberAcc && memberAcc.name) memberName = memberAcc.name;
    else if (rawPhone) memberName = `D.S. ${maskedPhone}`;
    else memberName = 'D.S. Rony Sorkar';
  }

  // Avatar: profile rabbit avatar (আমাদের প্রোফাইল যেটা আছে)
  const avatarEl = document.getElementById('team-modal-avatar');
  if (avatarEl) {
    avatarEl.src = '/assets/rabbit_avatar-DZmseAUF.jpg';
    avatarEl.onerror = function() { this.src = '/team_avatar.png'; };
  }

  // Account / Registered Phone Number (প্রথম ৩ টা ও শেষ ৩ টা)
  const regNumber = rawPhone || (memberAcc && (memberAcc.phone || memberAcc.accountNumber)) || (member && (member.rawPhone || member.phone)) || '';
  const maskedAccNumber = maskAccountPhone3(regNumber);

  // Tier and Account Number (উপরে শুধু L1, নিচে হিসাব নাম্বার)
  const tierEl = document.getElementById('team-modal-tier');
  const uuidEl = document.getElementById('team-modal-uuid');
  const nameEl = document.getElementById('team-modal-name');
  if (tierEl) tierEl.textContent = `L${t}`;
  if (uuidEl) uuidEl.textContent = '';
  if (nameEl) nameEl.textContent = maskedAccNumber;

  // Live fetch from real Supabase database if available
  if (window.aloSupabase && rawPhone) {
    try {
      const normP = normalizeBdPhone(rawPhone);
      const { data: dbUser, error: dbErr } = await window.aloSupabase
        .from('users')
        .select('*')
        .or(`phone.eq.${normP},account_number.eq.${normP}`)
        .maybeSingle();
      if (!dbErr && dbUser) {
        if (dbUser.balance !== undefined && dbUser.balance !== null) {
          member = Object.assign({}, member, { balance: Number(dbUser.balance) });
        }
        if (dbUser.recharge_amount !== undefined && dbUser.recharge_amount !== null) {
          member = Object.assign({}, member, { rechargeAmount: Number(dbUser.recharge_amount) });
        }
        if (dbUser.package_level) {
          member = Object.assign({}, member, { level: dbUser.package_level });
        }
      }
    } catch(e) {
      console.warn('Real Supabase member query notice:', e);
    }
  }

  // Real Financial Data
  const bdtBalance = Number((member && member.balance) ?? (memberAcc && memberAcc.balance) ?? 0);
  const bdtDeposit = Number((member && member.rechargeAmount) ?? (memberAcc && memberAcc.rechargeAmount) ?? 0);
  
  // USDT conversions (1 USDT = 126 BDT standard rate)
  const usdtBalance = (bdtBalance / 126).toFixed(2);
  const usdtDeposit = (bdtDeposit / 126).toFixed(2);

  // Withdrawals calculation from records & Supabase
  let bdtWithdrawals = 0;
  try {
    const wRequests = JSON.parse(localStorage.getItem('aloWithdrawalRequests') || '[]');
    const userW = wRequests.filter(function(w) {
      return normalizeBdPhone(w.phone || w.accountNumber) === normalizeBdPhone(rawPhone) && w.status !== 'rejected';
    });
    bdtWithdrawals = userW.reduce(function(sum, w) { return sum + (Number(w.amount) || 0); }, 0);
  } catch(e) {}

  if (window.aloSupabase && rawPhone) {
    try {
      const normP = normalizeBdPhone(rawPhone);
      const { data: wList, error: wErr } = await window.aloSupabase
        .from('withdrawals')
        .select('amount, status')
        .or(`phone.eq.${normP},account_number.eq.${normP}`)
        .neq('status', 'rejected');
      if (!wErr && Array.isArray(wList)) {
        const dbW = wList.reduce(function(sum, r) { return sum + (Number(r.amount) || 0); }, 0);
        if (dbW > bdtWithdrawals) bdtWithdrawals = dbW;
      }
    } catch(e) {}
  }
  const usdtWithdrawals = (bdtWithdrawals / 126).toFixed(2);

  // Status Badge (সক্রিয় / নিষ্ক্রিয়)
  const statusEl = document.getElementById('team-modal-status-badge');
  const isActive = bdtDeposit > 0 || (member && member.level && member.level !== 'LV0') || bdtBalance > 0;
  if (statusEl) {
    if (isActive) {
      statusEl.className = 'inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
      statusEl.textContent = 'সক্রিয়';
    } else {
      statusEl.className = 'inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400';
      statusEl.textContent = 'নিষ্ক্রিয়';
    }
  }

  // 1. ভারসাম্য (Balance): Country currency on top, USDT below
  const balUsdtEl = document.getElementById('team-modal-balance-usdt');
  const balBdtEl = document.getElementById('team-modal-balance-bdt');
  if (balBdtEl) balBdtEl.textContent = `৳ ${bdtBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (balUsdtEl) balUsdtEl.textContent = `≈ ${usdtBalance} USDT`;

  // 2. বন্ধু সংখ্যা (Referral Friends Count) from Real DB & Accounts
  let friendsCount = 0;
  try {
    const accounts = JSON.parse(localStorage.getItem('aloAccounts') || '[]');
    friendsCount = accounts.filter(function(a) {
      const sp = normalizeBdPhone(a.superiorPhone || a.superiorId);
      const sc = String(a.superiorId || '').trim().toUpperCase();
      const mCode = String((memberAcc && memberAcc.inviteCode) || memberId || '').toUpperCase();
      return (sp && sp === normalizeBdPhone(rawPhone)) || (mCode && sc === mCode);
    }).length;
  } catch(e) {}

  if (window.aloSupabase && rawPhone) {
    try {
      const normP = normalizeBdPhone(rawPhone);
      const { count, error: cErr } = await window.aloSupabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('superior_id', normP);
      if (!cErr && typeof count === 'number' && count > friendsCount) {
        friendsCount = count;
      }
    } catch(e) {}
  }

  const refValEl = document.getElementById('team-modal-referral-val');
  const refSubEl = document.getElementById('team-modal-referral-sub');
  if (refValEl) {
    refValEl.textContent = String(friendsCount);
    refValEl.className = 'text-xl sm:text-2xl font-black text-white font-[\'Hind_Siliguri\'] tracking-tight';
  }
  if (refSubEl) {
    refSubEl.textContent = 'জন';
  }

  // 3. আমানত (Deposit) Card: Country currency on top, USDT below
  const depUsdtEl = document.getElementById('team-modal-deposit-usdt');
  const depBdtEl = document.getElementById('team-modal-deposit-bdt');
  if (depBdtEl) depBdtEl.textContent = `৳ ${bdtDeposit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (depUsdtEl) depUsdtEl.textContent = `≈ ${usdtDeposit} USDT`;

  // 4. প্রত্যাহার (Withdrawals) Card: Country currency on top, USDT below
  const withUsdtEl = document.getElementById('team-modal-withdraw-usdt');
  const withBdtEl = document.getElementById('team-modal-withdraw-bdt');
  if (withBdtEl) withBdtEl.textContent = `৳ ${bdtWithdrawals.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (withUsdtEl) withUsdtEl.textContent = `≈ ${usdtWithdrawals} USDT`;

  // Display modal
  modal.style.display = 'flex';
  modal.hidden = false;
}
window.openTeamMemberDetailModal = openTeamMemberDetailModal;

function closeTeamMemberDetailModal() {
  const modal = document.getElementById('team-member-detail-modal');
  if (modal) {
    modal.style.display = 'none';
    modal.hidden = true;
  }
}
window.closeTeamMemberDetailModal = closeTeamMemberDetailModal;

let currentTeamTierTab = '1';

async function updateTeamReportMetrics() {
  const user = getCurrentUser();
  const phone = user && (user.phone || user.accountNumber);
  if (!phone) return;

  const teamData = await dbGetRealTeam(phone);
  cachedTeamReportData = teamData;
  const all = teamData.all || [];
  const tier1 = teamData.tier1 || [];
  const tier2 = teamData.tier2 || [];
  const tier3 = teamData.tier3 || [];

  // 1. Calculate 8 Main Real Stats
  const totalBalance = all.reduce(function(sum, m) { return sum + (Number(m.balance) || 0); }, 0);
  const totalRecharge = all.reduce(function(sum, m) { return sum + (Number(m.rechargeAmount) || 0); }, 0);
  const totalCashout = all.reduce(function(sum, m) { return sum + (Number(m.cashoutAmount) || 0); }, 0);
  const totalFlow = totalRecharge + totalCashout + totalBalance;
  const firstChargeCount = all.filter(function(m) { return (Number(m.rechargeAmount) || 0) > 0; }).length;
  const directPushCount = tier1.length;
  const teamSize = all.length;
  const now = Date.now();
  const oneDayAgo = now - 24 * 60 * 60 * 1000;
  const newMembersCount = all.filter(function(m) {
    const t = new Date(m.joinedAt).getTime();
    return !isNaN(t) && t >= oneDayAgo;
  }).length;

  const elBal = document.getElementById('team-stat-balance');
  const elFlow = document.getElementById('team-stat-flow');
  const elRec = document.getElementById('team-stat-recharge');
  const elCash = document.getElementById('team-stat-cashout');
  const elFirst = document.getElementById('team-stat-first-charge');
  const elPush = document.getElementById('team-stat-direct-push');
  const elSize = document.getElementById('team-stat-total-size');
  const elNew = document.getElementById('team-stat-new-members');

  if (elBal) elBal.textContent = totalBalance.toFixed(2);
  if (elFlow) elFlow.textContent = totalFlow.toFixed(2);
  if (elRec) elRec.textContent = totalRecharge.toFixed(2);
  if (elCash) elCash.textContent = totalCashout.toFixed(2);
  if (elFirst) elFirst.textContent = String(firstChargeCount);
  if (elPush) elPush.textContent = String(directPushCount);
  if (elSize) elSize.textContent = String(teamSize);
  if (elNew) elNew.textContent = String(newMembersCount);

  updateActiveTierMetrics(teamData);
}
window.updateTeamReportMetrics = updateTeamReportMetrics;

function updateActiveTierMetrics(cachedTeamData) {
  const mEl = document.getElementById('tier-metric-members');
  const rEl = document.getElementById('tier-metric-recharge');
  const bEl = document.getElementById('tier-metric-rebate');

  if (!cachedTeamData) {
    if (cachedTeamReportData) {
      cachedTeamData = cachedTeamReportData;
    } else {
      const user = getCurrentUser();
      if (!user) return;
      dbGetRealTeam(user.phone || user.accountNumber).then(function(data) {
        cachedTeamReportData = data;
        updateActiveTierMetrics(data);
      });
      return;
    }
  }

  const tier1 = cachedTeamData.tier1 || [];
  const tier2 = cachedTeamData.tier2 || [];
  const tier3 = cachedTeamData.tier3 || [];

  let targetList = tier1;
  let rate = 0.10; // Level 1: 10%
  if (currentTeamTierTab === '2') {
    targetList = tier2;
    rate = 0.05; // Level 2: 5%
  } else if (currentTeamTierTab === '3') {
    targetList = tier3;
    rate = 0.02; // Level 3: 2%
  }

  const count = targetList.length;
  const rechargeSum = targetList.reduce(function(sum, m) { return sum + (Number(m.rechargeAmount) || 0); }, 0);
  const rebateSum = rechargeSum * rate;

  if (mEl) mEl.textContent = String(count);
  if (rEl) rEl.textContent = rechargeSum.toFixed(2);
  if (bEl) bEl.textContent = rebateSum.toFixed(2);
}
window.updateActiveTierMetrics = updateActiveTierMetrics;

async function renderTeamMembersView() {
  await renderFreshTeamView();
}
window.renderTeamMembersView = renderTeamMembersView;

// Global click event listeners
document.addEventListener('click', function(event) {
  // Action sheet close buttons (X button, bottom dismiss button, top grab handle, or backdrop click)
  const closeSheetBtn = event.target.closest('#close-action-sheet-btn, #sheet-close-text-btn, [data-close-sheet]');
  if (closeSheetBtn) {
    event.preventDefault();
    event.stopPropagation();
    closeActionSheet();
    return;
  }
  if (event.target && (event.target.id === 'alo-action-backdrop' || event.target.classList.contains('site-action-backdrop'))) {
    event.preventDefault();
    event.stopPropagation();
    closeActionSheet();
    return;
  }

  // Action sheet tab clicks
  const sheetTabPurchase = event.target.closest('#sheet-tab-purchase');
  if (sheetTabPurchase) {
    switchSheetTab('purchase');
    return;
  }
  const sheetTabDeposit = event.target.closest('#sheet-tab-deposit');
  if (sheetTabDeposit) {
    switchSheetTab('deposit');
    return;
  }

  // Switch to deposit from purchase
  const openDepBtn = event.target.closest('#open-deposit-from-purchase-btn');
  if (openDepBtn) {
    pendingPurchaseLevel = currentPurchaseLevel;
    const pkg = packageData[currentPurchaseLevel];
    const user = getCurrentUser();
    const deficit = pkg ? Math.max(0, pkg.price - (Number(user.balance) || 0)) : 3500;
    const customInputs = document.querySelectorAll('#custom-deposit-amount');
    customInputs.forEach(function(inp) { inp.value = deficit; });
    selectedDepositAmount = deficit;
    switchSheetTab('deposit');
    return;
  }

  // Manager shortcut click (on homepage or anywhere with data-panel="manager" or data-panel="customer-service")
  const managerShortcutBtn = event.target.closest('#home-manager-btn, [data-panel="manager"], [data-panel="customer-service"]');
  if (managerShortcutBtn) {
    event.preventDefault();
    event.stopPropagation();
    openDashboardPanel('customer-service');
    return;
  }

  // Customer Service Panel Back Button
  const customerServiceBackBtn = event.target.closest('#customer-service-back-btn');
  if (customerServiceBackBtn) {
    event.preventDefault();
    event.stopPropagation();
    openDashboardPanel(previousDashboardPanel || 'home');
    return;
  }

  // Customer Service Live Solution Button (সরাসরি সমাধান)
  const customerServiceLiveBtn = event.target.closest('#customer-service-live-btn');
  if (customerServiceLiveBtn) {
    event.preventDefault();
    showToastNotification('💬 সরাসরি সহায়তা প্রতিনিধির সাথে সংযুক্ত হচ্ছে...');
    return;
  }

  // Customer Service Telegram Button (PW NEW MEDIA - ব্যক্তিগত যোগাযোগ মাধ্যম টেলিগ্রাম)
  const customerServiceTelegramBtn = event.target.closest('#customer-service-telegram-btn');
  if (customerServiceTelegramBtn) {
    event.preventDefault();
    const tgUrl = (window.aloPlatformConfig && window.aloPlatformConfig.telegramUrl) || 'https://t.me/PW_Official_Manager_BD';
    showToastNotification('টেলিগ্রাম ম্যানেজারের সাথে সংযুক্ত হচ্ছে...');
    try {
      window.open(tgUrl, '_blank');
    } catch (e) {
      window.location.href = tgUrl;
    }
    return;
  }

  // Open Country & Currency Selector Modal
  const countryPickerTrigger = event.target.closest('#register-country-selector-btn, #register-phone-prefix');
  if (countryPickerTrigger) {
    event.preventDefault();
    openCountryPickerModal();
    return;
  }

  // Close Country Picker Modal
  const closeCountryBtn = event.target.closest('#close-country-picker-btn');
  if (closeCountryBtn) {
    event.preventDefault();
    closeCountryPickerModal();
    return;
  }
  if (event.target && event.target.id === 'country-picker-modal') {
    closeCountryPickerModal();
    return;
  }

  // Quick Featured Country Chip Click
  const countryChip = event.target.closest('.country-quick-chip');
  if (countryChip && countryChip.dataset.countryCode) {
    event.preventDefault();
    selectRegistrationCountry(countryChip.dataset.countryCode);
    closeCountryPickerModal();
    return;
  }

  // Close manager modal
  const closeManagerBtn = event.target.closest('#close-manager-modal-btn');
  if (closeManagerBtn) {
    event.preventDefault();
    closeManagerContactModal();
    return;
  }
  if (event.target && event.target.id === 'manager-contact-modal') {
    closeManagerContactModal();
    return;
  }

  // Copy manager ID
  const copyMgrBtn = event.target.closest('#copy-manager-id-btn');
  if (copyMgrBtn) {
    event.preventDefault();
    const mgrCode = '#PW-MANAGER-8802';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(mgrCode).then(function() {
        showToastNotification('📋 ম্যানেজার আইডি কপি করা হয়েছে: ' + mgrCode);
      }).catch(function() {
        showToastNotification('ম্যানেজার আইডি: ' + mgrCode);
      });
    } else {
      showToastNotification('ম্যানেজার আইডি: ' + mgrCode);
    }
    return;
  }

  // Telegram action
  const tgMgrBtn = event.target.closest('#manager-telegram-action-btn');
  if (tgMgrBtn) {
    event.preventDefault();
    const tgUrl = (window.aloPlatformConfig && window.aloPlatformConfig.telegramUrl) || 'https://t.me/PW_Official_Manager_BD';
    showToastNotification('🚀 টেলিগ্রাম ম্যানেজার সার্ভিস কানেক্ট হচ্ছে...');
    try { window.open(tgUrl, '_blank'); } catch (e) {}
    return;
  }

  // Live chat action
  const liveChatBtn = event.target.closest('#manager-live-chat-btn');
  if (liveChatBtn) {
    event.preventDefault();
    showToastNotification('💬 অনলাইন ম্যানেজার চ্যাটে যুক্ত হচ্ছেন...');
    return;
  }

  // Generic data-dashboard-message handler
  const dashMsgBtn = event.target.closest('[data-dashboard-message]');
  if (dashMsgBtn && !event.target.closest('#logout-button')) {
    event.preventDefault();
    if (typeof dashMsgBtn.blur === 'function') dashMsgBtn.blur();
    const msg = dashMsgBtn.dataset.dashboardMessage;
    if (msg) showToastNotification(msg);
    return;
  }

  // Logout button click
  const logoutClick = event.target.closest('#logout-button');
  if (logoutClick) {
    event.preventDefault();
    if (typeof logoutClick.blur === 'function') logoutClick.blur();
    handleLogout();
    return;
  }

  // Personal Info header back button (if came from my-pass withdrawal sheet, return to withdrawal sheet)
  const personalBackBtn = event.target.closest('#personal-panel .personal-header-action[data-panel]');
  if (personalBackBtn) {
    event.preventDefault();
    if (previousDashboardPanel === 'my-pass') {
      openDashboardPanel('my-pass');
      openWithdrawSheet();
    } else {
      openDashboardPanel(personalBackBtn.dataset.panel || 'profile');
    }
    return;
  }

  // Navigation / Dashboard panel clicks
  const panelBtn = event.target.closest('[data-panel]');
  if (panelBtn) {
    event.preventDefault();
    if (typeof panelBtn.blur === 'function') panelBtn.blur();
    openDashboardPanel(panelBtn.dataset.panel);
    return;
  }

  // Payment method panel back button
  const paymentMethodBack = event.target.closest('#payment-method-back-btn');
  if (paymentMethodBack) {
    event.preventDefault();
    openDashboardPanel(previousDashboardPanel || 'my-pass');
    return;
  }

  // Team report back button
  const teamReportBack = event.target.closest('#team-report-back-btn');
  if (teamReportBack) {
    event.preventDefault();
    openDashboardPanel(previousDashboardPanel || 'profile');
    return;
  }

  // Team report main tabs (দলের রিপোর্ট vs আমার দল)
  const teamMainTab = event.target.closest('.team-main-tab');
  if (teamMainTab) {
    event.preventDefault();
    const tab = teamMainTab.dataset.teamTab;
    document.querySelectorAll('.team-main-tab').forEach(function(t) {
      t.classList.remove('font-bold', 'text-[#38bdf8]');
      t.classList.add('font-medium', 'text-slate-300');
      const ind = t.querySelector('.team-tab-indicator');
      if (ind) {
        ind.classList.remove('bg-[#38bdf8]');
        ind.classList.add('bg-transparent');
      }
    });
    teamMainTab.classList.remove('font-medium', 'text-slate-300');
    teamMainTab.classList.add('font-bold', 'text-[#38bdf8]');
    const activeInd = teamMainTab.querySelector('.team-tab-indicator');
    if (activeInd) {
      activeInd.classList.remove('bg-transparent');
      activeInd.classList.add('bg-[#38bdf8]');
    }

    const reportContent = document.getElementById('team-report-view-content');
    const membersContent = document.getElementById('team-members-view-content');
    const headerTitle = document.getElementById('team-panel-header-title');

    if (tab === 'members') {
      if (reportContent) reportContent.classList.add('hidden');
      if (membersContent) membersContent.classList.remove('hidden');
      if (headerTitle) headerTitle.textContent = 'আমার দল';
      renderFreshTeamView();
    } else {
      if (reportContent) reportContent.classList.remove('hidden');
      if (membersContent) membersContent.classList.add('hidden');
      if (headerTitle) headerTitle.textContent = 'দলের রিপোর্ট';
      updateTeamReportMetrics();
    }
    return;
  }

  // Team report tier tabs (স্তর 1, স্তর 2, স্তর 3) inside দলের রিপোর্ট view
  const teamTierTab = event.target.closest('.team-tier-tab');
  if (teamTierTab) {
    event.preventDefault();
    const tier = teamTierTab.dataset.tier;
    currentTeamTierTab = tier;
    document.querySelectorAll('.team-tier-tab').forEach(function(t) {
      t.classList.remove('font-bold', 'text-[#38bdf8]');
      t.classList.add('font-medium', 'text-slate-300');
      const ind = t.querySelector('.tier-tab-indicator');
      if (ind) {
        ind.classList.remove('bg-[#38bdf8]');
        ind.classList.add('bg-transparent');
      }
    });
    teamTierTab.classList.remove('font-medium', 'text-slate-300');
    teamTierTab.classList.add('font-bold', 'text-[#38bdf8]');
    const activeTierInd = teamTierTab.querySelector('.tier-tab-indicator');
    if (activeTierInd) {
      activeTierInd.classList.remove('bg-transparent');
      activeTierInd.classList.add('bg-[#38bdf8]');
    }

    updateActiveTierMetrics();
    return;
  }

  // Team tier accordion toggle buttons (প্রথম স্তর, দ্বিতীয় স্তর, তৃতীয় স্তর) in আমার দল view
  const tierToggleBtn = event.target.closest('.team-tier-toggle-btn');
  if (tierToggleBtn) {
    event.preventDefault();
    const tier = tierToggleBtn.dataset.tier;
    if (tier && typeof toggleTeamTier === 'function') {
      toggleTeamTier(tier);
    }
    return;
  }

  // Team member row or arrow trigger (↗) in "আমার দল"
  const memberDetailBtn = event.target.closest('.team-member-detail-trigger, .team-member-row');
  if (memberDetailBtn) {
    event.preventDefault();
    const phone = memberDetailBtn.dataset.phone;
    const tier = Number(memberDetailBtn.dataset.tier) || 1;
    const idx = Number(memberDetailBtn.dataset.idx) || 0;
    if (typeof openTeamMemberDetailModal === 'function') {
      openTeamMemberDetailModal(phone, tier, idx);
    }
    return;
  }

  // Team member detail modal dismiss triggers
  if (event.target.closest('#close-team-member-modal-btn') || event.target.closest('#team-member-modal-backdrop') || event.target.closest('#team-modal-drag-handle')) {
    event.preventDefault();
    if (typeof closeTeamMemberDetailModal === 'function') {
      closeTeamMemberDetailModal();
    }
    return;
  }

  // Team copy invite code button
  const teamCopyBtn = event.target.closest('.team-copy-code-btn');
  if (teamCopyBtn) {
    event.preventDefault();
    const text = teamCopyBtn.dataset.copyText;
    if (text && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function() {
        showToastNotification(`📋 আমন্ত্রণ কোড কপি করা হয়েছে: ${text}`);
      }).catch(function() {
        showToastNotification(`আমন্ত্রণ কোড: ${text}`);
      });
    } else if (text) {
      showToastNotification(`আমন্ত্রণ কোড: ${text}`);
    }
    return;
  }

  // Payment method row click in Payment method panel ("পছন্দ" ক্লিক)
  const paymentMethodRow = event.target.closest('.payment-method-row');
  if (paymentMethodRow) {
    event.preventDefault();
    const method = paymentMethodRow.dataset.paymentMethod;
    const nameEl = paymentMethodRow.querySelector('h2');
    const methodName = nameEl ? nameEl.textContent.trim() : method;
    document.querySelectorAll('.payment-method-row').forEach(function(r) {
      r.classList.remove('bg-[#0b1f52]', 'ring-1', 'ring-[#35c6e7]/40');
    });
    paymentMethodRow.classList.add('bg-[#0b1f52]', 'ring-1', 'ring-[#35c6e7]/40');
    selectedPaymentMethod = method;

    if (method === 'usdt') {
      previousDashboardPanel = 'payment-method';
      openDashboardPanel('usdt-deposit');
      return;
    }

    if (method === 'bkash' || method === 'bkash-2') {
      openBdRechargePage('BKASH');
      return;
    }

    if (method === 'nagad') {
      openBdRechargePage('NAGAD');
      return;
    }

    showToastNotification(`পছন্দ: ${methodName}`);
    return;
  }

  // USDT Badges click from Inline Drawer or Recharge Modal
  const usdtBadgeBtn = event.target.closest('#inline-usdt-method-badge, #modal-usdt-method-badge');
  if (usdtBadgeBtn) {
    event.preventDefault();
    closeActionSheet();
    const modalEl = document.getElementById('modal-deposit-overlay');
    if (modalEl) modalEl.classList.add('hidden');
    openDashboardPanel('usdt-deposit');
    return;
  }

  // Deposit trigger buttons: clicking 'Deposit' (জমা / রিচার্জ) opens Payment method screen
  const depositOpenBtn = event.target.closest('#records-open-deposit-btn, #my-pass-deposit-btn, #sheet-tab-deposit, #open-deposit-from-purchase-btn');
  if (depositOpenBtn) {
    event.preventDefault();
    closeActionSheet();
    previousDashboardPanel = 'my-pass';
    openDashboardPanel('payment-method');
    updatePaymentAndWithdrawalForUser();
    return;
  }

  // My pass withdrawal button ("প্রত্যাহার") -> opens Withdrawal sheet matching user screenshot
  const myPassWithdrawBtn = event.target.closest('#my-pass-withdraw-btn');
  if (myPassWithdrawBtn) {
    event.preventDefault();
    openWithdrawSheet();
    return;
  }

  // Close withdrawal sheet (X button or backdrop)
  const closeWithdrawSheetBtn = event.target.closest('#close-withdraw-sheet-btn, #withdraw-sheet-backdrop');
  if (closeWithdrawSheetBtn) {
    event.preventDefault();
    closeWithdrawSheet();
    return;
  }

  // Open Personal Profile ("ব্যক্তিগত তথ্য") directly when clicking "পছন্দ করুন" / "প্রত্যাহার পদ্ধতি"
  const openMethodPickerRow = event.target.closest('#withdraw-method-select-row');
  if (openMethodPickerRow) {
    event.preventDefault();
    closeWithdrawSheet();
    previousDashboardPanel = 'my-pass';
    openDashboardPanel('personal');
    return;
  }

  // Profile bkash row click ("বিকাশ সেট করুন")
  
  // Profile nagad row click ("নগদ সেট করুন")
  
  // Account binding row ("অ্যাকাউন্ট বাঁধাই" -> প্রকৃত নাম)
  const accountBindRow = event.target.closest('#personal-account-row, [data-profile-edit="account"]');
  if (accountBindRow) {
    event.preventDefault();
    previousDashboardPanel = 'personal';
    openDashboardPanel('realname-setup');
    return;
  }

  // Realname setup back button
  const realnameBackBtn = event.target.closest('#realname-setup-back-btn');
  if (realnameBackBtn) {
    event.preventDefault();
    openDashboardPanel(previousDashboardPanel || 'personal');
    return;
  }

  // Realname submit button
  const realnameSubmitBtn = event.target.closest('#realname-set-submit-btn');
  if (realnameSubmitBtn) {
    event.preventDefault();
    saveRealNameDetails();
    return;
  }

  const nagadProfileRow = event.target.closest('#personal-nagad-row, [data-profile-edit="nagad"]');
  if (nagadProfileRow) {
    event.preventDefault();
    previousDashboardPanel = 'personal';
    openDashboardPanel('nagad-setup');
    return;
  }

  // Nagad setup back button
  const nagadSetupBackBtn = event.target.closest('#nagad-setup-back-btn');
  if (nagadSetupBackBtn) {
    event.preventDefault();
    if (previousDashboardPanel === 'my-pass') {
      openDashboardPanel('my-pass');
      openWithdrawSheet();
    } else {
      openDashboardPanel(previousDashboardPanel || 'personal');
    }
    return;
  }

  // Submit button in Nagad setup panel
  const nagadSubmitBtn = event.target.closest('#nagad-set-submit-btn');
  if (nagadSubmitBtn) {
    event.preventDefault();
    saveNagadAccountDetails();
    return;
  }

  const bkashProfileRow = event.target.closest('#personal-bkash-row, [data-profile-edit="bkash"]');
  if (bkashProfileRow) {
    event.preventDefault();
    previousDashboardPanel = 'personal';
    openDashboardPanel('bkash-setup');
    return;
  }

  // Bkash setup back button
  const bkashSetupBackBtn = event.target.closest('#bkash-setup-back-btn');
  if (bkashSetupBackBtn) {
    event.preventDefault();
    if (previousDashboardPanel === 'my-pass') {
      openDashboardPanel('my-pass');
      openWithdrawSheet();
    } else {
      openDashboardPanel('personal');
    }
    return;
  }

  // Submit button in Bkash setup panel
  const bkashSubmitBtn = event.target.closest('#bkash-set-submit-btn');
  if (bkashSubmitBtn) {
    event.preventDefault();
    saveBkashAccountDetails();
    return;
  }

  // USDT Profile row click ("USDT সেট করুন")
  const usdtProfileRow = event.target.closest('#personal-usdt-row, [data-profile-edit="usdt"]');
  if (usdtProfileRow) {
    event.preventDefault();
    previousDashboardPanel = 'personal';
    openDashboardPanel('usdt-setup');
    return;
  }

  // USDT setup back button
  const usdtSetupBackBtn = event.target.closest('#usdt-setup-back-btn');
  if (usdtSetupBackBtn) {
    event.preventDefault();
    if (previousDashboardPanel === 'my-pass') {
      openDashboardPanel('my-pass');
      openWithdrawSheet();
    } else if (previousDashboardPanel === 'payment-method') {
      openDashboardPanel('payment-method');
    } else {
      openDashboardPanel(previousDashboardPanel || 'personal');
    }
    return;
  }

  // Submit button in USDT setup panel
  const usdtSubmitBtn = event.target.closest('#usdt-set-submit-btn');
  if (usdtSubmitBtn) {
    event.preventDefault();
    saveUsdtAccountDetails();
    return;
  }

  // Fund Password Profile row click ("ফান্ড পাসওয়ার্ড" -> "উত্তোলন পাসওয়ার্ড" পেজ)
  const fundPassProfileRow = event.target.closest('#personal-fund-password-row, [data-profile-edit="fund-password"]');
  if (fundPassProfileRow) {
    event.preventDefault();
    previousDashboardPanel = 'personal';
    openDashboardPanel('fund-password-setup');
    return;
  }

  // Fund Password setup back button
  const fundPassBackBtn = event.target.closest('#fund-password-setup-back-btn');
  if (fundPassBackBtn) {
    event.preventDefault();
    openDashboardPanel(previousDashboardPanel || 'personal');
    return;
  }

  // Fund Password eye toggle button
  const fundEyeBtn = event.target.closest('.fund-toggle-eye-btn');
  if (fundEyeBtn) {
    event.preventDefault();
    const targetId = fundEyeBtn.dataset.target;
    const targetInput = targetId ? document.getElementById(targetId) : null;
    if (targetInput) {
      const isPass = targetInput.type === 'password';
      targetInput.type = isPass ? 'text' : 'password';
      const showIcon = fundEyeBtn.querySelector('.eye-icon-show');
      const hideIcon = fundEyeBtn.querySelector('.eye-icon-hide');
      if (showIcon && hideIcon) {
        showIcon.classList.toggle('hidden', isPass);
        hideIcon.classList.toggle('hidden', !isPass);
      }
    }
    return;
  }

  // Fund Password submit button ("জমা দিন")
  const fundPassSubmitBtn = event.target.closest('#fund-password-submit-btn');
  if (fundPassSubmitBtn) {
    event.preventDefault();
    saveFundPasswordDetails();
    return;
  }

  // Personal message buttons for other rows
  const personalMsgBtn = event.target.closest('[data-personal-message]');
  if (personalMsgBtn && !personalMsgBtn.closest('#personal-bkash-row, [data-profile-edit="bkash"], #bkash-setup-panel, #personal-nagad-row, [data-profile-edit="nagad"], #nagad-setup-panel, #personal-usdt-row, [data-profile-edit="usdt"], #usdt-setup-panel, #personal-account-row, [data-profile-edit="account"], #realname-setup-panel, #personal-fund-password-row, [data-profile-edit="fund-password"], #fund-password-setup-panel')) {
    event.preventDefault();
    const msg = personalMsgBtn.dataset.personalMessage;
    const msgEl = document.getElementById('personal-message');
    if (msgEl) msgEl.textContent = msg;
    showToastNotification(msg);
    return;
  }

  // Submit withdrawal form ("জমা" button)
  const withdrawSheetSubmitBtn = event.target.closest('#withdraw-sheet-submit-btn');
  if (withdrawSheetSubmitBtn) {
    event.preventDefault();
    const label = document.getElementById('withdraw-selected-method-label');
    const selectedMethod = label ? label.textContent.trim() : 'পছন্দ করুন';

    if (!userSelectedWithdrawMethod || selectedMethod === 'পছন্দ করুন' || selectedMethod.includes('সেট নেই')) {
      showToastNotification('⚠️ অনুগ্রহ করে প্রথমে প্রত্যাহার পদ্ধতি পছন্দ করুন');
      openMethodPicker();
      return;
    }

    const bkash = getSavedBkashAccount();
    const nagad = getSavedNagadAccount();
    const usdt = getSavedUsdtAccount();

    if (userSelectedWithdrawMethod === 'USDT' || selectedMethod.includes('USDT')) {
      if (!usdt || !usdt.address) {
        showToastNotification('⚠️ উত্তোলন করার পূর্বে USDT (BEP20) সেট করতে হবে');
        closeWithdrawSheet();
        previousDashboardPanel = 'my-pass';
        openDashboardPanel('usdt-setup');
        return;
      }
    } else if (userSelectedWithdrawMethod === 'NAGAD' || selectedMethod.includes('নগদ')) {
      if (!nagad || !nagad.phone) {
        showToastNotification('⚠️ উত্তোলন করার পূর্বে নগদ সেট করতে হবে');
        closeWithdrawSheet();
        previousDashboardPanel = 'my-pass';
        openDashboardPanel('nagad-setup');
        return;
      }
    } else {
      if (!bkash || !bkash.phone) {
        showToastNotification('⚠️ উত্তোলন করার পূর্বে বিকাশ সেট করতে হবে');
        closeWithdrawSheet();
        previousDashboardPanel = 'my-pass';
        openDashboardPanel('bkash-setup');
        return;
      }
    }

    const amtInp = document.getElementById('withdraw-sheet-amount');
    const amt = parseFloat(amtInp ? amtInp.value : '0') || 0;
    const availBal = getAvailableBalance();
    const user = getCurrentUser();
    const curr = getUserCurrency(user);
    const lang = (window.aloI18n ? window.aloI18n.getLanguage() : 'bn') || (user.country === 'IN' ? 'hi' : (user.country === 'BD' ? 'bn' : 'en'));
    const pCfg = window.aloPlatformConfig || {};
    const minWithdrawAmt = Number(pCfg.minWithdraw) || 700;

    if (pCfg.withdrawEnabled === false) {
      showToastNotification(lang === 'en' ? '⚠️ Withdrawals are temporarily paused by Administrator.' : '⚠️ অ্যাডমিন কর্তৃক উত্তোলন সাময়িকভাবে বন্ধ রাখা হয়েছে।');
      return;
    }

    if (isNaN(amt) || amt < minWithdrawAmt) {
      const minNotice = lang === 'hi' 
        ? `⚠️ कृपया वैध निकासी राशि दर्ज करें (न्यूनतम ${minWithdrawAmt})` 
        : (lang === 'en' ? `⚠️ Please enter a valid withdrawal amount (Min ${minWithdrawAmt})` : `⚠️ অনুগ্রহ করে উত্তোলনের সঠিক পরিমাণ লিখুন (ন্যূনতম ${minWithdrawAmt})`);
      showToastNotification(minNotice);
      if (amtInp) amtInp.focus();
      return;
    }

    if (amt > availBal) {
      const insMsg = lang === 'hi'
        ? `⚠️ अपर्याप्त बैलेंस! आपका उपलब्ध बैलेंस ${availBal.toFixed(2)} ${curr}`
        : (lang === 'en' ? `⚠️ Insufficient balance! Your available balance is ${availBal.toFixed(2)} ${curr}` : `⚠️ অপর্যাপ্ত ব্যালেন্স! আপনার উপলব্ধ ব্যালেন্স ${formatBanglaNumber(availBal.toFixed(2))} ${curr}`);
      showToastNotification(insMsg);
      if (amtInp) amtInp.focus();
      return;
    }

    const pwdInp = document.getElementById('withdraw-sheet-fund-password');
    const pwd = pwdInp ? pwdInp.value.trim() : '';
    if (!pwd) {
      const pwdNotice = lang === 'hi'
        ? '⚠️ कृपया फंड पासवर्ड दर्ज करें'
        : (lang === 'en' ? '⚠️ Please enter your fund password' : '⚠️ অনুগ্রহ করে ফান্ডের পাসওয়ার্ড লিখুন');
      showToastNotification(pwdNotice);
      if (pwdInp) pwdInp.focus();
      return;
    }

    const savedFundPass = getSavedFundPassword();
    if (!savedFundPass) {
      const needSetupMsg = lang === 'hi'
        ? '⚠️ कृपया पहले 6-अंकीय निकासी पासवर्ड सेट करें'
        : (lang === 'en' ? '⚠️ Please set up your 6-digit withdrawal password first' : '⚠️ অনুগ্রহ করে প্রথমে ৬ ডিজিটের উত্তোলন পাসওয়ার্ড সেট করুন');
      showToastNotification(needSetupMsg);
      closeActionSheet();
      openDashboardPanel('fund-password-setup');
      return;
    }
    if (pwd !== savedFundPass) {
      const wrongMsg = lang === 'hi'
        ? '⚠️ निकासी पासवर्ड सही नहीं है, पुनः जाँचें'
        : (lang === 'en' ? '⚠️ Fund password incorrect, please check' : '⚠️ ফান্ডের পাসওয়ার্ড সঠিক নয়, পুনরায় যাচাই করুন');
      showToastNotification(wrongMsg);
      if (pwdInp) pwdInp.focus();
      return;
    }

    // Deduct available balance (ভারসাম্য শুধু অখানে উইথড্র দিলে ব্যালেন্স জিরো হবে)
    const newBal = Math.max(0, availBal - amt);
    localStorage.setItem('my_pass_available_bal', newBal.toFixed(2));
    if (user) {
      user.balance = newBal;
      user.cashoutAmount = (Number(user.cashoutAmount) || 0) + amt;
      // Note: user.lifetimeEarnings is NOT reduced, permanently preserving lifetime income in 'ব্যক্তিগত ভারসাম্য'
      localStorage.setItem('aloSignedInUser', JSON.stringify(user));
    }

    // Add withdrawal record (enters Pending review queue for Admin)
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    let payoutMethodLabel = 'বিকাশ (bKash)';
    if (userSelectedWithdrawMethod === 'USDT' || selectedMethod.includes('USDT')) {
      payoutMethodLabel = (usdt && usdt.address) ? `USDT BEP20 (${usdt.address})` : 'USDT (BEP20)';
    } else if (userSelectedWithdrawMethod === 'NAGAD' || selectedMethod.includes('নগদ')) {
      payoutMethodLabel = (nagad && nagad.phone) ? `নগদ (${nagad.phone})` : 'নগদ (Nagad)';
    } else {
      payoutMethodLabel = (bkash && bkash.phone) ? `বিকাশ (${bkash.phone})` : 'বিকাশ (bKash)';
    }

    const wdNetPct = Number((window.aloPlatformConfig && window.aloPlatformConfig.withdrawNetPercent) || 50);
    const wdNetAmt = amt * (wdNetPct / 100);

    const newRecord = {
      amount: amt.toFixed(2),
      ratio: `${wdNetPct.toFixed(1)}%`,
      actual: wdNetAmt.toFixed(2),
      status: 'মুলতবি (Pending)',
      date: dateStr,
      time: `${hours}:${mins}`
    };

    // Save withdrawal record to Cloud Database
    if (user) {
      dbRecordTransaction({
        phone: user.phone || user.accountNumber,
        type: 'withdraw',
        amount: amt,
        ratio: `${wdNetPct.toFixed(1)}%`,
        actual: wdNetAmt,
        status: 'মুলতবি (Pending)',
        method: payoutMethodLabel,
        order_id: 'WD' + Date.now() + Math.floor(100 + Math.random() * 900),
        date: dateStr,
        time: `${hours}:${mins}`,
        newBalance: user.balance || 0
      });
      dbSaveUser(user);
    }

    const curHistory = getWithdrawalHistory();
    curHistory.unshift(newRecord);
    saveWithdrawalHistory(curHistory);

    // Refresh UI
    updateProfileMetrics();
    renderWithdrawalHistory();
    closeWithdrawSheet();

    const successNotice = lang === 'hi'
      ? `🎉 ${amt.toFixed(2)} ${curr} निकासी का अनुरोध सफलतापूर्वक सबमिट किया गया!`
      : (lang === 'en' ? `🎉 ${amt.toFixed(2)} ${curr} withdrawal request submitted successfully!` : `🎉 ${formatBanglaNumber(amt.toFixed(2))} ${curr} উত্তোলনের আবেদন সফলভাবে জমা দেওয়া হয়েছে!`);
    showToastNotification(successNotice);
    return;
  }

  // VIP Salary & Level Upgrade claim button click (Matches prominent গ্রহণ করুন action)
  const inviteClaimBtn = event.target.closest('.invite-claim-btn, .salary-pay, .salary-pay-btn');
  if (inviteClaimBtn) {
    event.preventDefault();
    const tier = inviteClaimBtn.dataset.vipTier;
    const type = inviteClaimBtn.dataset.rewardType;
    const amount = Number(inviteClaimBtn.dataset.rewardAmount) || 0;
    const reqMembers = Number(inviteClaimBtn.dataset.requiredMembers) || 1;
    const currentCount = Number(inviteClaimBtn.dataset.currentCount) || 0;
    const key = `${tier}-${type}`;

    let claimed = [];
    try {
      claimed = JSON.parse(localStorage.getItem('alo_claimed_invite_rewards') || '[]');
    } catch(e) { claimed = []; }

    if (claimed.includes(key)) {
      showToastNotification(`✓ আপনি ${tier} এর এই বোনাসটি ইতোমধ্যে গ্রহণ করেছেন!`);
      return;
    }

    // If progress is not unlocked yet (< reqMembers), notify and open progress info
    if (currentCount < reqMembers) {
      const needed = reqMembers - currentCount;
      showToastNotification(`🔒 শর্ত পূরণ হয়নি! ${tier} আনলক করতে আরও ${formatBanglaNumber(needed)} জন সক্রিয় সদস্য প্রয়োজন (অগ্রগতি: ${formatBanglaNumber(currentCount)}/${formatBanglaNumber(reqMembers)})`);
      openInviteVipClaimModal(tier, type, amount, reqMembers, currentCount);
      return;
    }

    // If progress is >= 100%, real claim to balance!
    executeVipRewardClaim(tier, type, amount, reqMembers, currentCount);
    return;
  }

  // Modal Action: Direct Balance Claim
  const modalClaimBtn = event.target.closest('#invite-modal-claim-btn');
  if (modalClaimBtn) {
    event.preventDefault();
    if (currentInviteClaim) {
      const curCount = Number(currentInviteClaim.currentCount) || 0;
      const reqMembers = Number(currentInviteClaim.reqMembers) || 1;
      if (curCount < reqMembers) {
        const needed = reqMembers - curCount;
        showToastNotification(`🔒 শর্ত পূরণ না হলে ক্লাইম করা যাবে না! আরও ${formatBanglaNumber(needed)} জন সক্রিয় সদস্য প্রয়োজন।`);
        return;
      }
      executeVipRewardClaim(
        currentInviteClaim.tier,
        currentInviteClaim.type,
        currentInviteClaim.amount,
        currentInviteClaim.reqMembers,
        currentInviteClaim.currentCount
      );
    }
    return;
  }

  // Modal Action: Copy Invite Link
  const modalCopyBtn = event.target.closest('#invite-modal-copy-link-btn');
  if (modalCopyBtn) {
    event.preventDefault();
    const user = getCurrentUser();
    const code = (user && user.inviteCode) || (user && user.accountNumber) || 'ALO123';
    const link = `${window.location.origin}${window.location.pathname}?ref=${code}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(link).then(function() {
        showToastNotification(`🔗 ইনভাইট লিংক কপি হয়েছে: ${link}`);
      }).catch(function() {
        showToastNotification(`আমন্ত্রণ কোড: ${code}`);
      });
    } else {
      showToastNotification(`আমন্ত্রণ কোড: ${code}`);
    }
    return;
  }

  // Modal Action: Close
  if (event.target.closest('#invite-modal-close-btn') || event.target.closest('#invite-vip-modal-backdrop')) {
    event.preventDefault();
    closeInviteVipClaimModal();
    return;
  }

  // Invite Page Copy Link Button & Company Referral System Link Button
  const pageCopyBtn = event.target.closest('#invite-page-copy, #invite-company-link-copy-btn, #invite-company-link-display');
  if (pageCopyBtn) {
    event.preventDefault();
    const linkInput = document.getElementById('invite-link-input');
    const linkEl = document.getElementById('invite-page-link');
    const companyDisplay = document.getElementById('invite-company-link-display');
    const user = getCurrentUser();
    const code = (user && (user.inviteCode || user.accountNumber)) || '728207';
    let linkText = (linkInput && linkInput.value) || (companyDisplay && companyDisplay.textContent && companyDisplay.textContent.trim()) || (linkEl && linkEl.textContent && linkEl.textContent.trim()) || `${window.location.origin}/?invite=${code}`;

    if (linkInput) {
      linkInput.focus();
      linkInput.select();
    }

    const copyBtnText = document.getElementById('invite-copy-btn-text');
    const companyCopyText = document.getElementById('invite-company-copy-text');
    function onCopied() {
      if (copyBtnText) {
        const orig = copyBtnText.textContent;
        copyBtnText.textContent = 'কপি সম্পন্ন!';
        setTimeout(function() { copyBtnText.textContent = orig; }, 2000);
      }
      if (companyCopyText) {
        const origComp = companyCopyText.textContent;
        companyCopyText.textContent = 'কপি হয়েছে! ✓';
        setTimeout(function() { companyCopyText.textContent = origComp; }, 2000);
      }
      showToastNotification(`🔗 PW New Media রেফারেল লিংক কপি করা হয়েছে!`);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(linkText).then(onCopied).catch(function() {
        if (linkInput) {
          linkInput.select();
          document.execCommand('copy');
          onCopied();
        } else {
          showToastNotification(`আমন্ত্রণ কোড: ${code}`);
        }
      });
    } else {
      if (linkInput) {
        linkInput.select();
        document.execCommand('copy');
        onCopied();
      } else {
        showToastNotification(`আমন্ত্রণ কোড: ${code}`);
      }
    }
    return;
  }

  // Hall package level room click:
  // LV0 is always free; unlocked VIP levels open directly into tasks; locked levels open purchase modal
  const levelRoom = event.target.closest('[data-open-level-tasks]');
  if (levelRoom) {
    const level = levelRoom.dataset.level || 'LV0';
    const user = getCurrentUser();
    if (isLevelUnlocked(level, user)) {
      renderPackageTasks(level);
      openDashboardPanel('platform-tasks');
      return;
    }
    event.preventDefault();
    openPackagePurchaseModal(level);
    return;
  }

  // Savings preset amount buttons click
  const savingsPresetBtn = event.target.closest('.savings-preset-btn');
  if (savingsPresetBtn) {
    event.preventDefault();
    const amt = savingsPresetBtn.dataset.amount;
    const inp = document.getElementById('savings-deposit-input');
    if (inp && amt) {
      inp.value = amt;
      updateSavingsCalculationPreview(amt);
    }
    return;
  }

  // Savings submission button click
  const savingsSubmitBtn = event.target.closest('#savings-submit-btn');
  if (savingsSubmitBtn) {
    event.preventDefault();
    handleSavingsSubmission();
    return;
  }

  // Savings card add more button click
  const savingsCardAddBtn = event.target.closest('.savings-card-add-btn');
  if (savingsCardAddBtn) {
    event.preventDefault();
    const inp = document.getElementById('savings-deposit-input');
    if (inp) {
      inp.scrollIntoView({ behavior: 'smooth', block: 'center' });
      inp.focus();
    }
    return;
  }

  // Package view details button click ("পণ্যের বিস্তারিত দেখুন") - Opens dedicated full-page panel
  const viewDetailsBtn = event.target.closest('[data-view-details], .package-view-details-btn');
  if (viewDetailsBtn) {
    event.preventDefault();
    event.stopPropagation();
    const lvl = viewDetailsBtn.dataset.viewDetails;
    if (lvl) openPackageDetailPage(lvl);
    return;
  }

  // Package detail page buy button click ("প্যাকেজ ক্রয় করুন")
  const pagePkgBuyBtn = event.target.closest('#page-pkg-buy-btn, #modal-pkg-buy-btn');
  if (pagePkgBuyBtn) {
    event.preventDefault();
    const lvl = pagePkgBuyBtn.dataset.targetLevel || activeDetailPackageLevel;
    if (lvl && lvl !== 'LV0') {
      handlePackagePurchase(lvl, pagePkgBuyBtn);
    }
    return;
  }

  // Buy package button click
  const buyPkgBtn = event.target.closest('[data-buy-package]');
  if (buyPkgBtn) {
    const level = buyPkgBtn.dataset.buyPackage;
    if (level && level !== 'LV0') {
      event.preventDefault();
      handlePackagePurchase(level, buyPkgBtn);
      return;
    }
  }

  // Package card click in records panel
  const recordPkgCard = event.target.closest('[data-record-package]');
  if (recordPkgCard && !event.target.closest('button')) {
    const level = recordPkgCard.dataset.recordPackage;
    if (level && level !== 'LV0') {
      event.preventDefault();
      openPackageDetailPage(level);
      return;
    }
  }

  // Locked level button click
  const lockedBtn = event.target.closest('[data-locked-level]');
  if (lockedBtn) {
    const lvl = lockedBtn.dataset.lockedLevel || activePackageLevel;
    if (lvl && lvl !== 'LV0') {
      event.preventDefault();
      openPackageDetailPage(lvl);
      return;
    }
  }

  // PW Home Banner Dot click
  const bannerDot = event.target.closest('.pw-banner-dot');
  if (bannerDot) {
    event.preventDefault();
    const idx = parseInt(bannerDot.dataset.bannerIndex || '0', 10);
    goToPWBannerSlide(idx);
    startPWBannerAutoPlay();
    return;
  }

  // Hall platform tabs
  const platformTab = event.target.closest('.hall-platform');
  if (platformTab) {
    document.querySelectorAll('.hall-platform').forEach(function(p) {
      p.setAttribute('aria-pressed', 'false');
      p.style.borderColor = 'transparent';
    });
    platformTab.setAttribute('aria-pressed', 'true');
    platformTab.style.borderColor = 'var(--color-profile-blue-text)';
    activePlatform = platformTab.textContent.trim();
    renderPackageTasks(activePackageLevel);
    openDashboardPanel('platform-tasks');
    return;
  }

  // Accept mission button
  const acceptBtn = event.target.closest('[data-platform-accept]');
  if (acceptBtn) {
    const user = getCurrentUser();
    const lang = (window.aloI18n ? window.aloI18n.getLanguage() : '') || (user && user.country === 'IN' ? 'hi' : (user && user.country === 'BD' ? 'bn' : 'en'));

    if (activePackageLevel !== 'LV0' && !isLevelUnlocked(activePackageLevel, user)) {
      openPackageDetailPage(activePackageLevel);
      return;
    }
    if (acceptBtn.disabled || acceptBtn.classList.contains('is-accepting') || acceptBtn.dataset.accepted === 'true') return;

    const row = acceptBtn.closest('.platform-task-row');
    const taskIndex = row ? parseInt(row.dataset.taskIndex || '0', 10) : 0;
    const quota = packageTaskSettings[activePackageLevel]?.count || 5;
    const userLevel = user.packageLevel || 'LV0';
    const userMaxQuota = (packageTaskSettings[userLevel] && packageTaskSettings[userLevel].count) || 5;
    const today = new Date().toDateString();
    const acceptedToday = readAcceptedMissions().filter(function(m) {
      return m.level === activePackageLevel && m.status !== 'failed' && new Date(m.acceptedAt).toDateString() === today;
    });
    const allTodayAccepted = readAcceptedMissions().filter(function(m) {
      return new Date(m.acceptedAt).toDateString() === today && m.status !== 'failed';
    });

    if (acceptedToday.length >= quota || allTodayAccepted.length >= userMaxQuota) {
      showTaskCenterToast(lang === 'hi' ? 'दैनिक कोटा पूर्ण' : (lang === 'en' ? 'Daily Limit Reached' : 'দৈনিক কোটা পূর্ণ'));
      refreshDailyMissionLimit(activePackageLevel);
      return;
    }

    // Step 1: That button immediately loses 'গ্রহণ', turns white with 'গৃহীত'
    acceptBtn.classList.remove('is-accepting', 'is-limit-reached');
    acceptBtn.classList.add('is-accepted');
    acceptBtn.disabled = true;
    acceptBtn.dataset.accepted = 'true';
    acceptBtn.removeAttribute('data-limit-reached');
    acceptBtn.textContent = lang === 'hi' ? 'स्वीकृत' : (lang === 'en' ? 'Accepted' : 'গৃহীত');

    // Step 2: Show centered modal: "গ্রহণ করা হচ্ছে"
    showTaskCenterToast(lang === 'hi' ? 'स्वीकार किया जा रहा है' : (lang === 'en' ? 'Accepting...' : 'গ্রহণ করা হচ্ছে'));

    // Step 3: Complete mission saving smoothly in background
    setTimeout(function() {
      const taskTitle = `${activePlatform} · ${lang === 'hi' ? 'कार्य' : (lang === 'en' ? 'Task' : 'কাজ')} ${taskIndex + 1}`;
      const desc = getPlatformTaskDescription(activePlatform, taskIndex, lang);
      const reward = (packageTaskSettings[activePackageLevel] && packageTaskSettings[activePackageLevel].reward) || 20;
      const taskLink = getRealisticTaskUrl(activePlatform, taskIndex);

      saveAcceptedMission({
        id: 'demo-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        taskIndex: taskIndex,
        platform: activePlatform,
        title: taskTitle,
        description: desc,
        level: activePackageLevel,
        reward: reward,
        status: 'active',
        taskLink: taskLink,
        acceptedAt: new Date().toISOString()
      });

      const currentMissions = readAcceptedMissions().filter(function(m) {
        return m.level === activePackageLevel && m.status !== 'failed' && new Date(m.acceptedAt).toDateString() === today;
      });
      const allMissionsToday = readAcceptedMissions().filter(function(m) {
        return new Date(m.acceptedAt).toDateString() === today && m.status !== 'failed';
      });
      const newAcceptedCount = currentMissions.length;
      const reached = newAcceptedCount >= quota || allMissionsToday.length >= userMaxQuota;

      if (reached) {
        // Immediately update all other unaccepted buttons in the list to 'সীমা পূর্ণ'
        const listEl = document.getElementById('platform-task-list');
        if (listEl) {
          const rows = listEl.querySelectorAll('.platform-task-row');
          const limitReachedText = lang === 'hi' ? 'कोटा पूर्ण' : (lang === 'en' ? 'Limit Reached' : 'সীমা পূর্ণ');
          rows.forEach(function(r) {
            const btn = r.querySelector('[data-platform-accept]');
            if (btn && !btn.dataset.accepted) {
              btn.textContent = limitReachedText;
              btn.disabled = true;
              btn.classList.remove('is-accepting', 'is-accepted');
              btn.classList.add('is-limit-reached');
              btn.dataset.limitReached = 'true';
            }
          });
        }
      }

      refreshDailyMissionLimit(activePackageLevel);
      if (typeof updateProfileMetrics === 'function') updateProfileMetrics();
    }, 380);

    return;
  }

  // Open submission form
  const openSubBtn = event.target.closest('[data-open-submission]');
  if (openSubBtn) {
    const card = openSubBtn.closest('[data-mission-id]');
    if (card) {
      activeSubmissionId = card.dataset.missionId;
      openDashboardPanel('mission-submit');
    }
    return;
  }

  // Manual approval disabled: tasks complete automatically after the 15-minute countdown

  // Mission filter tab click
  const filterTab = event.target.closest('[data-mission-filter]');
  if (filterTab) {
    activeMissionFilter = filterTab.dataset.missionFilter;
    renderMissionRecords(activeMissionFilter);
    return;
  }

  // Cancel mission (archive permanently in records as 'failed')
  const cancelBtn = event.target.closest('[data-cancel-mission]');
  if (cancelBtn) {
    const card = cancelBtn.closest('[data-mission-id]');
    if (card) {
      const allMissions = readAllMissionsRaw();
      const target = allMissions.find(function(m) { return m.id === card.dataset.missionId; });
      if (target) {
        target.status = 'failed';
        target.cancelledAt = new Date().toISOString();
        target.failedAt = new Date().toISOString();
        saveAllMissionsRaw(allMissions);
        const user = getCurrentUser();
        const lang = (window.aloI18n ? window.aloI18n.getLanguage() : '') || (user && user.country === 'IN' ? 'hi' : (user && user.country === 'BD' ? 'bn' : 'en'));
        showToastNotification(lang === 'hi' ? 'कार्य रद्द कर दिया गया और रिकॉर्ड में सहेजा गया' : (lang === 'en' ? 'Task cancelled and archived' : 'কাজটি বাতিল করা হয়েছে এবং রেকর্ডে এককালীন সংরক্ষিত থাকবে'));
        renderMissionRecords(activeMissionFilter);
        refreshDailyMissionLimit(activePackageLevel);
      }
    }
    return;
  }

  // Open task link button
  const openLinkBtn = event.target.closest('#mission-submit-open');
  if (openLinkBtn) {
    handleOpenTaskLink();
    return;
  }

  // Copy task link button
  const copyLinkBtn = event.target.closest('#mission-submit-copy');
  if (copyLinkBtn) {
    handleCopyTaskLink();
    return;
  }

  // View task screenshot button in records/tasks
  const viewScreenshotBtn = event.target.closest('[data-task-screenshot]');
  if (viewScreenshotBtn) {
    const missionId = viewScreenshotBtn.dataset.taskScreenshot;
    const missions = readAcceptedMissions();
    const mission = missions.find(function(m) { return m.id === missionId; });
    if (mission && mission.screenshot) {
      openScreenshotLightbox(mission.screenshot, (mission.platform || 'টাস্ক') + ' - কাজের স্ক্রিনশট প্রিভিউ');
    }
    return;
  }
});

  

// Submission confirm click: Sets to 'review' for 5-10 minutes
const confirmSubmitBtn = document.getElementById('mission-submit-confirm');
if (confirmSubmitBtn) {
  confirmSubmitBtn.addEventListener('click', function() {
    const allMissions = readAllMissionsRaw();
    const mission = allMissions.find(function(item) { return item.id === activeSubmissionId; });
    if (!mission) return;

    // Review for exactly 15 minutes (15 * 60 * 1000)
    const reviewMinutes = 15;
    const now = Date.now();
    const reviewEndsAt = now + 15 * 60 * 1000;

    mission.status = 'review';
    mission.submittedAt = new Date(now).toISOString();
    mission.reviewMinutes = reviewMinutes;
    mission.reviewEndsAt = reviewEndsAt;
    mission.rewardCredited = false;

    const commentEl = document.getElementById('mission-submit-comment');
    if (commentEl) {
      mission.userComment = commentEl.value.trim();
      commentEl.value = '';
    }
    if (activeSubmissionImage) {
      mission.screenshot = activeSubmissionImage;
      activeSubmissionImage = '';
    }

    const previewEl = document.getElementById('mission-submit-preview');
    if (previewEl) {
      previewEl.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h3l1.5-2h7L17 7h3a1.5 1.5 0 0 1 1.5 1.5v10A1.5 1.5 0 0 1 20 20H4a1.5 1.5 0 0 1-1.5-1.5v-10A1.5 1.5 0 0 1 4 7Z"></path><circle cx="12" cy="13" r="3.5"></circle></svg>';
    }
    const fileStatus = document.getElementById('mission-submit-file-status');
    if (fileStatus) fileStatus.textContent = '';

    saveAllMissionsRaw(allMissions);

    activeMissionFilter = 'review';
    openDashboardPanel('tasks');
    renderMissionRecords('review');

    // Keep page clean: no extra message callouts or border layers
    const taskMsg = document.getElementById('task-message');
    if (taskMsg) {
      taskMsg.innerHTML = '';
    }
  });
}


// --- SCREENSHOT LIGHTBOX & INSTANT PREVIEW CONTROLLERS ---
function openScreenshotLightbox(imageSrc, caption) {
  const modal = document.getElementById('screenshot-lightbox-modal');
  const img = document.getElementById('lightbox-image');
  const cap = document.getElementById('lightbox-caption');
  if (!modal || !img) return;
  img.src = imageSrc || '';
  if (cap) cap.textContent = caption || 'স্ক্রিনশট প্রিভিউ';
  modal.removeAttribute('hidden');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeScreenshotLightbox() {
  const modal = document.getElementById('screenshot-lightbox-modal');
  if (modal) {
    modal.setAttribute('hidden', '');
    modal.style.display = 'none';
  }
  document.body.style.overflow = '';
}

// Instant screenshot preview and persistent storage
function handleScreenshotFile(file) {
  if (!file) return;
  const statusEl = document.getElementById('mission-submit-file-status');
  const previewEl = document.getElementById('mission-submit-preview');
  const removeBtn = document.getElementById('mission-submit-remove-img');
  const viewPreviewBtn = document.getElementById('btn-view-preview-modal');

  if (statusEl) statusEl.textContent = 'স্ক্রিনশট লোড হচ্ছে...';

  const reader = new FileReader();
  reader.onload = function(evt) {
    const rawDataUrl = evt.target && evt.target.result;
    if (!rawDataUrl) return;

    // Scale on canvas to save space in localStorage and load smoothly
    const img = new Image();
    img.onload = function() {
      try {
        const maxSide = 1200;
        let w = img.naturalWidth || img.width;
        let h = img.naturalHeight || img.height;
        if (w > maxSide || h > maxSide) {
          if (w > h) {
            h = Math.round((h * maxSide) / w);
            w = maxSide;
          } else {
            w = Math.round((w * maxSide) / h);
            h = maxSide;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, w);
        canvas.height = Math.max(1, h);
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h);
          const compressed = canvas.toDataURL('image/jpeg', 0.82);
          applyScreenshot(compressed);
          return;
        }
      } catch (e) {}
      applyScreenshot(rawDataUrl);
    };
    img.onerror = function() {
      applyScreenshot(rawDataUrl);
    };
    img.src = rawDataUrl;
  };
  reader.onerror = function() {
    if (statusEl) statusEl.textContent = 'স্ক্রিনশট লোড করতে সমস্যা হয়েছে';
  };
  reader.readAsDataURL(file);

  function applyScreenshot(src) {
    activeSubmissionImage = src;
    if (previewEl) {
      previewEl.innerHTML = `<img src="${src}" alt="স্ক্রিনশট" class="h-full w-full object-cover rounded cursor-pointer" style="width:100%;height:100%;object-fit:cover;border-radius:6px;display:block;" title="পূর্ণ স্ক্রিনশট প্রিভিউ দেখতে ক্লিক করুন">`;
    }
    if (removeBtn) removeBtn.classList.remove('hidden');
    if (viewPreviewBtn) {
      viewPreviewBtn.classList.remove('hidden');
      viewPreviewBtn.style.display = 'inline-flex';
    }
    if (statusEl) statusEl.textContent = '✓ স্ক্রিনশট সফলভাবে লোড হয়েছে';
  }
}

function removeScreenshotImage() {
  activeSubmissionImage = '';
  const camInput = document.getElementById('mission-submit-camera-file');
  if (camInput) camInput.value = '';
  const galInput = document.getElementById('mission-submit-gallery-file');
  if (galInput) galInput.value = '';
  const legacyInput = document.getElementById('mission-submit-file');
  if (legacyInput) legacyInput.value = '';
  const previewEl = document.getElementById('mission-submit-preview');
  if (previewEl) {
    previewEl.innerHTML = `<svg viewBox="0 0 24 24" class="h-8 w-8 text-white transition group-hover:scale-110" fill="currentColor"><path d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm8 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/></svg>`;
  }
  const removeBtn = document.getElementById('mission-submit-remove-img');
  if (removeBtn) removeBtn.classList.add('hidden');
  const viewPreviewBtn = document.getElementById('btn-view-preview-modal');
  if (viewPreviewBtn) {
    viewPreviewBtn.classList.add('hidden');
    viewPreviewBtn.style.display = 'none';
  }
  const statusEl = document.getElementById('mission-submit-file-status');
  if (statusEl) statusEl.textContent = 'স্ক্রিনশট মুছে ফেলা হয়েছে';
}

// 1. Direct camera input change
const camInput = document.getElementById('mission-submit-camera-file');
if (camInput) {
  camInput.addEventListener('change', function(e) {
    const file = e.target.files && e.target.files[0];
    handleScreenshotFile(file);
  });
}

// 2. Direct gallery input change
const galInput = document.getElementById('mission-submit-gallery-file');
if (galInput) {
  galInput.addEventListener('change', function(e) {
    const file = e.target.files && e.target.files[0];
    handleScreenshotFile(file);
  });
}

// 3. Fallback legacy input
const legacyFileInput = document.getElementById('mission-submit-file');
if (legacyFileInput) {
  legacyFileInput.addEventListener('change', function(e) {
    const file = e.target.files && e.target.files[0];
    handleScreenshotFile(file);
  });
}

// Upload box clicked: if preview present, view lightbox; otherwise open gallery directly
const uploadTriggerBtn = document.getElementById('mission-upload-trigger-btn');
if (uploadTriggerBtn) {
  uploadTriggerBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (activeSubmissionImage) {
      openScreenshotLightbox(activeSubmissionImage, 'আপলোডকৃত স্ক্রিনশট প্রিভিউ');
    } else {
      const gal = document.getElementById('mission-submit-gallery-file') || document.getElementById('mission-submit-file');
      if (gal) gal.click();
    }
  });
}

// Label clicked: also opens gallery directly
const uploadLabel = document.getElementById('mission-upload-label');
if (uploadLabel) {
  uploadLabel.addEventListener('click', function(e) {
    e.preventDefault();
    const gal = document.getElementById('mission-submit-gallery-file') || document.getElementById('mission-submit-file');
    if (gal) gal.click();
  });
}

// Direct button: View Preview Modal
const btnPreviewModal = document.getElementById('btn-view-preview-modal');
if (btnPreviewModal) {
  btnPreviewModal.addEventListener('click', function(e) {
    e.preventDefault();
    if (activeSubmissionImage) {
      openScreenshotLightbox(activeSubmissionImage, 'আপলোডকৃত স্ক্রিনশট প্রিভিউ');
    } else {
      const gal = document.getElementById('mission-submit-gallery-file') || document.getElementById('mission-submit-file');
      if (gal) gal.click();
    }
  });
}

// Remove image button
const removeImgBtn = document.getElementById('mission-submit-remove-img');
if (removeImgBtn) {
  removeImgBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    removeScreenshotImage();
  });
}

// Lightbox close buttons
const closeLightboxBtn = document.getElementById('close-lightbox-btn');
if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeScreenshotLightbox);
const closeLightboxAction = document.getElementById('close-lightbox-action');
if (closeLightboxAction) closeLightboxAction.addEventListener('click', closeScreenshotLightbox);

// Close lightbox on background click
const lightboxModal = document.getElementById('screenshot-lightbox-modal');
if (lightboxModal) {
  lightboxModal.addEventListener('click', function(e) {
    if (e.target === lightboxModal) {
      closeScreenshotLightbox();
    }
  });
}

// Comment char counter
const commentInput = document.getElementById('mission-submit-comment');
if (commentInput) {
  commentInput.addEventListener('input', function() {
    const countEl = document.getElementById('mission-submit-comment-count');
    if (countEl) countEl.textContent = commentInput.value.length;
  });
}

const cancelSubmitBtn = document.getElementById('mission-submit-cancel');
if (cancelSubmitBtn) {
  cancelSubmitBtn.addEventListener('click', function() {
    openDashboardPanel('tasks');
  });
}

// Action sheet event listeners (Site-Themed Animation System)
const confirmPurchaseBtn = document.getElementById('confirm-package-purchase-btn');
if (confirmPurchaseBtn) {
  confirmPurchaseBtn.addEventListener('click', confirmPackagePurchase);
}

const openDepositFromPurchaseBtn = document.getElementById('open-deposit-from-purchase-btn');
if (openDepositFromPurchaseBtn) {
  openDepositFromPurchaseBtn.addEventListener('click', function() {
    pendingPurchaseLevel = currentPurchaseLevel;
    const pkg = packageData[currentPurchaseLevel];
    const user = getCurrentUser();
    const deficit = pkg ? Math.max(0, pkg.price - (Number(user.balance) || 0)) : 3500;
    const customInput = document.getElementById('custom-deposit-amount');
    if (customInput) customInput.value = deficit;
    selectedDepositAmount = deficit;
    switchSheetTab('deposit');
  });
}

const sheetTabPurchaseBtn = document.getElementById('sheet-tab-purchase');
if (sheetTabPurchaseBtn) {
  sheetTabPurchaseBtn.addEventListener('click', function() {
    switchSheetTab('purchase');
  });
}

const sheetTabDepositBtn = document.getElementById('sheet-tab-deposit');
if (sheetTabDepositBtn) {
  sheetTabDepositBtn.addEventListener('click', function() {
    switchSheetTab('deposit');
  });
}

const closeActionSheetBtn = document.getElementById('close-action-sheet-btn');
if (closeActionSheetBtn) {
  closeActionSheetBtn.addEventListener('click', closeActionSheet);
}

const sheetCloseTextBtn = document.getElementById('sheet-close-text-btn');
if (sheetCloseTextBtn) {
  sheetCloseTextBtn.addEventListener('click', closeActionSheet);
}

const actionBackdrop = document.getElementById('alo-action-backdrop');
if (actionBackdrop) {
  actionBackdrop.addEventListener('click', closeActionSheet);
}

const closeInlineRechargeBtn = document.getElementById('close-inline-recharge-btn');
if (closeInlineRechargeBtn) {
  closeInlineRechargeBtn.addEventListener('click', function() {
    const drawer = document.getElementById('inline-recharge-drawer');
    if (drawer) {
      drawer.classList.add('hidden');
    }
  });
}

// Deposit confirmation listener
const confirmDepositBtn = document.getElementById('confirm-deposit-btn');
if (confirmDepositBtn) {
  confirmDepositBtn.addEventListener('click', confirmDeposit);
}

// Quick deposit amount buttons with site-colors selection animation
document.querySelectorAll('.quick-deposit-amt').forEach(function(btn) {
  btn.addEventListener('click', function() {
    const amt = parseFloat(btn.dataset.amount || '0');
    if (amt > 0) {
      selectedDepositAmount = amt;
      const customInputs = document.querySelectorAll('#custom-deposit-amount');
      customInputs.forEach(function(inp) { inp.value = amt; });

      document.querySelectorAll('.quick-deposit-amt').forEach(function(b) {
        b.classList.remove('ring-2', 'ring-[#35c6e7]', 'bg-[#1264c9]');
        b.classList.add('bg-[#0e2a66]');
      });
      btn.classList.add('ring-2', 'ring-[#35c6e7]', 'bg-[#1264c9]');
      btn.classList.remove('bg-[#0e2a66]');
    }
  });
});

const customDepositInput = document.getElementById('custom-deposit-amount');
if (customDepositInput) {
  customDepositInput.addEventListener('input', function() {
    const val = parseFloat(customDepositInput.value);
    if (!isNaN(val) && val > 0) {
      selectedDepositAmount = val;
      document.querySelectorAll('.quick-deposit-amt').forEach(function(b) {
        if (parseFloat(b.dataset.amount || '0') === val) {
          b.classList.add('ring-2', 'ring-[#35c6e7]', 'bg-[#1264c9]');
          b.classList.remove('bg-[#0e2a66]');
        } else {
          b.classList.remove('ring-2', 'ring-[#35c6e7]', 'bg-[#1264c9]');
          b.classList.add('bg-[#0e2a66]');
        }
      });
    }
  });
}

function handleLogout() {
  localStorage.removeItem('aloSignedInUser');
  showToastNotification('সফলভাবে সাইন আউট করা হয়েছে।');
  const loginPass = document.getElementById('login-password');
  if (loginPass) loginPass.value = '';
  showView('login');
}

const logoutBtn = document.getElementById('logout-button');
if (logoutBtn) {
  logoutBtn.addEventListener('click', handleLogout);
}


// PW Home Banner Carousel (3 Slides - Auto-change continually, Touch swipe OFF)
let pwBannerCurrentIndex = 0;
let pwBannerTimer = null;
const PW_BANNER_TOTAL = 3;

function goToPWBannerSlide(idx) {
  pwBannerCurrentIndex = ((idx % PW_BANNER_TOTAL) + PW_BANNER_TOTAL) % PW_BANNER_TOTAL;
  const track = document.getElementById('pw-home-banner-track');
  if (track) {
    track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    track.style.transform = `translateX(-${pwBannerCurrentIndex * (100 / PW_BANNER_TOTAL)}%)`;
  }
  document.querySelectorAll('.pw-banner-dot').forEach(function(dot, i) {
    if (i === pwBannerCurrentIndex) {
      dot.classList.add('is-active');
      dot.setAttribute('aria-current', 'true');
    } else {
      dot.classList.remove('is-active');
      dot.removeAttribute('aria-current');
    }
  });
}

function startPWBannerAutoPlay() {
  stopPWBannerAutoPlay();
  // Automatically rotates every 3.8 seconds
  pwBannerTimer = setInterval(function() {
    goToPWBannerSlide(pwBannerCurrentIndex + 1);
  }, 3800);
}

function stopPWBannerAutoPlay() {
  if (pwBannerTimer) {
    clearInterval(pwBannerTimer);
    pwBannerTimer = null;
  }
}

function initPWBannerCarousel() {
  const container = document.getElementById('pw-hero-banner-container');
  const track = document.getElementById('pw-home-banner-track');
  if (!container || !track) return;

  goToPWBannerSlide(0);
  startPWBannerAutoPlay();

  // Navigation arrows (Touch swipe is OFF as requested by user)
  const prevBtn = document.getElementById('pw-banner-prev');
  const nextBtn = document.getElementById('pw-banner-next');
  if (prevBtn) {
    prevBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      goToPWBannerSlide(pwBannerCurrentIndex - 1);
      startPWBannerAutoPlay();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      goToPWBannerSlide(pwBannerCurrentIndex + 1);
      startPWBannerAutoPlay();
    });
  }
}

// Initial session check
function initApp() {
  initPWBannerCarousel();
  let savedUser = null;
  try {
    savedUser = JSON.parse(localStorage.getItem('aloSignedInUser') || 'null');
  } catch (error) {
    savedUser = null;
  }



  if (savedUser) {
    if (!savedUser.purchasedPackages) {
      savedUser.purchasedPackages = ['LV0'];
    }
    if (!savedUser.packageLevel || !savedUser.purchasedPackages.includes(savedUser.packageLevel)) {
      savedUser.packageLevel = 'LV0';
    }
    if (typeof savedUser.balance !== 'number') savedUser.balance = 0.00;
    localStorage.setItem('aloSignedInUser', JSON.stringify(savedUser));

    const isUserInd = isIndianUser(savedUser);
    let userLang = savedUser.language || localStorage.getItem('alo_lang');
    if (isUserInd) {
      if (!userLang || userLang === 'bn') userLang = 'hi';
    } else {
      if (!userLang) userLang = 'bn';
    }
    if (typeof setAppLanguage === 'function') {
      setAppLanguage(userLang);
    }

    updateUserDetails(savedUser);
    updateProfileMetrics();
    updateVipHallRooms();
    updateRecordsPanelPackages();
    updateBkashDisplayAcrossApp(); updateNagadDisplayAcrossApp(); updateUsdtDisplayAcrossApp(); updateRealNameDisplayAcrossApp();
    
    // Open HOME panel so the banner carousel is immediately visible on first load!
    openDashboardPanel('home');
    showView('dashboard');
  } else {
    // Show login view when not authenticated
    showView('login');
  }

  // Handle direct payment page requests (?payment or ?page=payment or #payment)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('payment') || urlParams.get('page') === 'payment' || window.location.hash.includes('payment')) {
      openDirectPaymentCheckout();
      return;
    }
  } catch(e) {}

  // Handle return from payment gateway (WPay / bKash / Nagad)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const isPaymentReturn = urlParams.has('trade_status') || 
                            urlParams.has('out_trade_no') || 
                            urlParams.has('order_id') || 
                            urlParams.has('orderId') || 
                            urlParams.get('status') === 'success' ||
                            urlParams.get('status') === '1' ||
                            urlParams.get('payment') === 'success';

    if (isPaymentReturn) {
      const pendingRaw = localStorage.getItem('alo_pending_recharge_order');
      if (pendingRaw) {
        try {
          const pendingOrder = JSON.parse(pendingRaw);
          const creditedKey = `alo_recharge_credited_${pendingOrder.orderId}`;
          if (!localStorage.getItem(creditedKey)) {
            const currentUser = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
            if (currentUser) {
              const creditedAmt = Number(pendingOrder.amount || 0);
              if (creditedAmt > 0) {
                currentUser.balance = (currentUser.balance || 0) + creditedAmt;
                currentUser.rechargeAmount = (Number(currentUser.rechargeAmount) || 0) + creditedAmt;
                currentUser.totalIncome = (currentUser.totalIncome || 0) + creditedAmt;
                if (typeof saveUser === 'function') saveUser(currentUser);
                if (typeof dbSaveUser === 'function') dbSaveUser(currentUser);
                if (typeof updateUserDetails === 'function') updateUserDetails(currentUser);
                if (typeof updateProfileMetrics === 'function') updateProfileMetrics();
                if (typeof updateVipHallRooms === 'function') updateVipHallRooms();

                // Update existing pending gateway order or insert approved transaction
                if (window.aloSupabase && pendingOrder.orderId) {
                  (async function() {
                    try {
                      const { data: existingTx } = await window.aloSupabase
                        .from('transactions')
                        .select('id')
                        .or(`order_id.eq.${pendingOrder.orderId},out_trade_no.eq.${pendingOrder.orderId}`)
                        .maybeSingle();
                      if (existingTx && existingTx.id) {
                        await window.aloSupabase
                          .from('transactions')
                          .update({ status: 'অনুমোদিত', updated_at: new Date().toISOString() })
                          .eq('id', existingTx.id);
                      } else if (typeof dbRecordTransaction === 'function') {
                        const now = new Date();
                        dbRecordTransaction({
                          phone: currentUser.phone || currentUser.accountNumber,
                          type: 'deposit',
                          amount: creditedAmt,
                          actual: creditedAmt,
                          ratio: '100%',
                          status: 'অনুমোদিত',
                          method: pendingOrder.payType === 'NAGAD' ? 'নগদ (Nagad) [Auto]' : 'বিকাশ (bKash) [Auto]',
                          order_id: pendingOrder.orderId,
                          out_trade_no: pendingOrder.orderId,
                          date: now.toISOString().split('T')[0],
                          time: now.toTimeString().split(' ')[0],
                          newBalance: currentUser.balance
                        });
                      }
                    } catch (txUpErr) {}
                  })();
                } else if (typeof dbRecordTransaction === 'function') {
                  const now = new Date();
                  dbRecordTransaction({
                    phone: currentUser.phone || currentUser.accountNumber,
                    type: 'deposit',
                    amount: creditedAmt,
                    actual: creditedAmt,
                    ratio: '100%',
                    status: 'অনুমোদিত',
                    method: pendingOrder.payType === 'NAGAD' ? 'নগদ (Nagad) [Auto]' : 'বিকাশ (bKash) [Auto]',
                    order_id: pendingOrder.orderId,
                    out_trade_no: pendingOrder.orderId,
                    date: now.toISOString().split('T')[0],
                    time: now.toTimeString().split(' ')[0],
                    newBalance: currentUser.balance
                  });
                }
                localStorage.setItem(creditedKey, 'true');
                if (typeof showToastNotification === 'function') {
                  showToastNotification(`🎉 পেমেন্ট সফল! ৳ ${creditedAmt.toLocaleString('en-US')} অ্যাকাউন্টে যোগ হয়েছে!`);
                }
              }
            }
          }
          localStorage.removeItem('alo_pending_recharge_order');
        } catch(e) {}
      }
      try {
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch(e) {}
    }
  } catch(e) {}

  // Handle incoming referral link query parameters (?invite=... or ?ref=...)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const inviteQuery = urlParams.get('invite') || urlParams.get('ref') || urlParams.get('code');
    if (inviteQuery) {
      const cleanCode = inviteQuery.trim();
      sessionStorage.setItem('alo_pending_invite_code', cleanCode);
      const regInviteInput = document.getElementById('register-invite-code');
      if (regInviteInput) {
        regInviteInput.value = cleanCode;
      }
      if (!savedUser) {
        showView('register');
        showToastNotification(`স্বাগতম! আমন্ত্রণ কোড: ${cleanCode}`);
      }
    }
  } catch(e) {}

  // Bind country selection dropdown on register form
  const countrySelect = document.getElementById('register-country-select');
  if (countrySelect) {
    function onCountryChange() {
      if (countrySelect.value) {
        selectRegistrationCountry(countrySelect.value);
      }
    }
    countrySelect.addEventListener('change', onCountryChange);
    countrySelect.addEventListener('input', onCountryChange);
  }

  // Clicking phone prefix also opens country selector / modal
  const regPrefix = document.getElementById('register-phone-prefix');
  if (regPrefix) {
    regPrefix.addEventListener('click', function() {
      const select = document.getElementById('register-country-select');
      if (select) {
        select.focus();
        if (typeof select.showPicker === 'function') {
          try { select.showPicker(); return; } catch(e) {}
        }
      }
      openCountryPickerModal();
    });
  }

  const closeCountryBtn = document.getElementById('close-country-picker-btn');
  if (closeCountryBtn) {
    closeCountryBtn.addEventListener('click', closeCountryPickerModal);
  }
  const countryModal = document.getElementById('country-picker-modal');
  if (countryModal) {
    countryModal.addEventListener('click', function(e) {
      if (e.target === countryModal) closeCountryPickerModal();
    });
  }

  // Initialize USDT BEP20 Auto-Approve Deposit gateway listeners
  if (typeof initUsdtDeposit === 'function') {
    initUsdtDeposit();
  }

  // Initialize BD Online Payment Gateway (bKash & Nagad via imcagro.top)
  if (typeof initBdGatewayCheckout === 'function') {
    initBdGatewayCheckout();
  }
}

document.addEventListener('input', function(e) {
  if (e.target && e.target.id === 'withdraw-amount-input') {
    updateWithdrawCalculations();
  }
  if (e.target && e.target.id === 'savings-deposit-input') {
    updateSavingsCalculationPreview(e.target.value);
  }
});

// ==========================================
// SAVINGS PLAN (সঞ্চয় পরিকল্পনা) SYSTEM
// এক কাস্টমার একবার নিবে, ৪৫ দিন পর লাভ সহ প্রফিট, এনিমেশন দিয়ে উলটে রেকর্ড শো হবে
// ==========================================

function getUserSavingsPlan() {
  const user = getCurrentUser();
  const phoneKey = normalizeBdPhone(user.phone) || 'default';
  try {
    const raw = localStorage.getItem('aloSavingsPlan_' + phoneKey);
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  return null;
}

function updateSavingsCalculationPreview(amount) {
  const val = Number(amount) || 0;
  const daily = Math.round(val * 0.05);
  const totalProfit = Math.round(val * 0.05 * 45); // একবারে ৪৫ দিনে ২২৫%
  const totalReturn = val + totalProfit;

  const dailyEl = document.getElementById('savings-calc-daily');
  const profitEl = document.getElementById('savings-calc-profit');
  const totalEl = document.getElementById('savings-calc-total');

  if (dailyEl) dailyEl.textContent = '৳ ' + formatBanglaNumber(daily) + '.০০';
  if (profitEl) profitEl.textContent = '৳ ' + formatBanglaNumber(totalProfit) + '.০০';
  if (totalEl) totalEl.textContent = '৳ ' + formatBanglaNumber(totalReturn) + '.০০ লাভ সহ';
}

function renderSavingsRecordCard(plan) {
  const amount = Number(plan.amount) || 3500;
  const target = Number(plan.target) || 10000;
  const days = Number(plan.days) || 45;
  const rate = Number(plan.rate) || 5;
  const pct = Math.min(100, Math.max(1, Math.round((amount / target) * 100)));
  const needed = Math.max(0, target - amount);
  const dailyProfit = Math.round(amount * (rate / 100));
  const totalProfit = Math.round(amount * (rate / 100) * days);
  const totalReturn = amount + totalProfit;

  return `
    <!-- EXACT MATCH WITH USER SCREENSHOT CARD (FRESH & BORDERLESS) -->
    <div class="bg-[#071536] rounded-3xl p-5 shadow-2xl space-y-4 relative overflow-hidden">
      
      <!-- Top Row: আমার সঞ্চয়, মূল্য, লক্ষ্যমাত্রা এবং বৃত্তাকার Donut চার্ট -->
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm font-medium text-slate-300">আমার সঞ্চয়</p>
          <h3 class="text-3xl font-extrabold text-white tracking-tight mt-1 font-mono">
            ৳ ${formatBanglaNumber(amount)}
          </h3>
          <p class="text-xs text-slate-400 font-medium mt-1">
            লক্ষ্যমাত্রা ৳ ${formatBanglaNumber(target)}
          </p>
        </div>

        <!-- Circular Donut Progress Ring matching user screenshot -->
        <div class="relative w-[72px] h-[72px] flex items-center justify-center shrink-0">
          <svg class="w-[72px] h-[72px] -rotate-90" viewBox="0 0 36 36">
            <path class="text-[#0e214d]" stroke="currentColor" stroke-width="3.6" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path class="text-[#2dd4bf] transition-all duration-700 ease-out" stroke="currentColor" stroke-width="3.6" stroke-dasharray="${pct}, 100" stroke-linecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
          <span class="absolute font-extrabold text-white text-sm font-mono tracking-tight">${pct}%</span>
        </div>
      </div>

      <!-- Middle: সঞ্চয়ের অগ্রগতি Progress Bar Row -->
      <div>
        <div class="flex items-center justify-between text-sm">
          <span class="font-semibold text-slate-200">সঞ্চয়ের অগ্রগতি</span>
          <span class="font-bold text-slate-200 font-mono">${formatBanglaNumber(pct)}%</span>
        </div>
        <div class="w-full bg-[#0e214d] h-2.5 rounded-full overflow-hidden mt-2">
          <div class="h-full bg-[#2dd4bf] rounded-full transition-all duration-700 ease-out" style="width: ${pct}%;"></div>
        </div>
      </div>

      <!-- Bottom 2 Tiles Grid: আরও প্রয়োজন এবং পরিকল্পনার মেয়াদ (৪৫ দিন) -->
      <div class="grid grid-cols-2 gap-3">
        <!-- Left Tile: আরও প্রয়োজন -->
        <div class="bg-[#040c21] p-4 rounded-2xl shadow-inner">
          <p class="text-xs text-slate-400 font-medium">আরও প্রয়োজন</p>
          <p class="text-2xl font-extrabold text-white mt-1 font-mono">
            ৳ ${formatBanglaNumber(needed)}
          </p>
        </div>

        <!-- Right Tile: পরিকল্পনার মেয়াদ (৪৫ দিন) -->
        <div class="bg-[#040c21] p-4 rounded-2xl shadow-inner">
          <p class="text-xs text-slate-400 font-medium">পরিকল্পনার মেয়াদ</p>
          <p class="text-2xl font-extrabold text-white mt-1 font-mono">
            ${formatBanglaNumber(days)} দিন
          </p>
        </div>
      </div>

      <!-- Profit Return Details: একবারে ৪৫ দিন লাভ সহ প্রফিট -->
      <div class="bg-[#040c21] p-3.5 rounded-2xl space-y-1.5 text-xs">
        <div class="flex items-center justify-between text-slate-300">
          <span>দৈনিক প্রফিট (৫%):</span>
          <span class="font-bold text-[#34d399] font-mono">৳ ${formatBanglaNumber(dailyProfit)}.০০</span>
        </div>
        <div class="flex items-center justify-between text-slate-300">
          <span>৪৫ দিনে মোট মুনাফা (২২৫%):</span>
          <span class="font-bold text-[#38bdf8] font-mono">৳ ${formatBanglaNumber(totalProfit)}.০০</span>
        </div>
        <div class="flex items-center justify-between pt-1 font-semibold text-white">
          <span>একবারে ৪৫ দিন পর লাভ সহ প্রফিট:</span>
          <span class="font-extrabold text-amber-300 font-mono text-sm">৳ ${formatBanglaNumber(totalReturn)}.০০</span>
        </div>
      </div>

      <!-- Locked Status: একজন কাস্টমার একবার নিবে, আর নিতে পারবে না -->
      <div class="w-full py-3.5 rounded-2xl bg-[#091a42] text-[#38bdf8] font-bold text-xs text-center shadow-lg flex items-center justify-center gap-2 select-none">
        <span class="w-2.5 h-2.5 rounded-full bg-[#34d399] animate-pulse"></span>
        <span>সঞ্চয় পরিকল্পনা সক্রিয় রয়েছে (একবার প্রযোজ্য)</span>
      </div>

      <!-- Disclaimer Note from Screenshot -->
      <p class="text-[11px] text-slate-400 text-center leading-relaxed">
        নমুনা ডিজাইন — এখানে দেখানো অর্থ বাস্তব অ্যাকাউন্টের ব্যালেন্স নয়।
      </p>

    </div>
  `;
}

function renderSavingsPlanPanel() {
  const user = getCurrentUser();
  const bal = Number(user.balance || 0);

  // 1. Update user balance display
  const balEl = document.getElementById('savings-user-balance');
  if (balEl) {
    balEl.textContent = '৳ ' + formatNumber(bal, user);
  }

  // 2. Check if user already has an active savings plan
  const activePlan = getUserSavingsPlan();
  const frontFace = document.getElementById('savings-front-face');
  const backFace = document.getElementById('savings-back-face');
  const recordContent = document.getElementById('savings-record-card-content');

  if (activePlan) {
    // গ্রাহক ইতিপূর্বে সঞ্চয় নিয়েছেন: শুধু রেকর্ড শো হবে, আর নিতে পারবেন না
    if (recordContent) {
      recordContent.innerHTML = renderSavingsRecordCard(activePlan);
    }
    if (frontFace) frontFace.style.display = 'none';
    if (backFace) backFace.style.display = 'block';
  } else {
    // এখনও নেননি: ফ্রেশ ইনপুট ফর্ম শো থাকবে
    if (frontFace) frontFace.style.display = 'block';
    if (backFace) backFace.style.display = 'none';
    const inputEl = document.getElementById('savings-deposit-input');
    if (inputEl) {
      updateSavingsCalculationPreview(inputEl.value);
    }
  }
}
window.renderSavingsPlanPanel = renderSavingsPlanPanel;
window.getUserSavingsPlan = getUserSavingsPlan;

function handleSavingsSubmission() {
  const inputEl = document.getElementById('savings-deposit-input');
  const btn = document.getElementById('savings-submit-btn');
  if (!inputEl || !btn) return;

  // গ্রাহক যদি ইতিমধ্যে নিয়ে থাকেন, আর নিতে পারবেন না
  const existingPlan = getUserSavingsPlan();
  if (existingPlan) {
    showToastNotification('আপনি ইতিমধ্যে সঞ্চয় পরিকল্পনা নিয়েছেন। একজন গ্রাহক একবারই নিতে পারবেন।');
    return;
  }

  const amount = parseFloat(inputEl.value);
  if (!amount || isNaN(amount) || amount <= 0) {
    showToastNotification('অনুগ্রহ করে সঠিক সঞ্চয়ের পরিমাণ লিখুন।');
    inputEl.focus();
    return;
  }

  const user = getCurrentUser();
  const bal = Number(user.balance || 0);

  // Button loading verification
  const origHtml = btn.innerHTML;
  const origClass = btn.className;
  btn.disabled = true;
  btn.innerHTML = `
    <span class="inline-flex items-center justify-center gap-2">
      <svg class="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      <span>যাচাই করা হচ্ছে...</span>
    </span>
  `;
  btn.className = 'w-full py-3.5 rounded-2xl bg-[#2bb4d4] text-[#030d24] font-bold text-sm shadow-xl opacity-90 cursor-wait flex items-center justify-center gap-2';

  setTimeout(function() {
    const freshUser = getCurrentUser();
    const freshBal = Number(freshUser.balance || 0);

    // 1. অপর্যাপ্ত ব্যালেন্স: বোতামে শান্তভাবে স্ট্যাটাস এবং হালকাভাবে ফেড-আউট
    if (freshBal < amount) {
      btn.disabled = true;
      btn.style.transition = 'all 0.5s ease-in-out';
      btn.style.opacity = '1';
      btn.className = 'w-full py-3.5 rounded-2xl bg-rose-600 text-white font-black text-sm shadow-xl shadow-rose-950/60 flex items-center justify-center gap-1.5 cursor-not-allowed transition-all duration-500';
      btn.innerHTML = `
        <span class="inline-flex items-center gap-1.5 transition-opacity duration-700 ease-in-out" id="savings-insufficient-label">
          <svg class="w-4 h-4 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          <span>অপর্যাপ্ত ব্যালেন্স</span>
        </span>
      `;

      // ৩.৬ সেকেন্ড পর হালকাভাবে ফেড-আউট
      setTimeout(function() {
        if (btn && btn.isConnected) {
          const label = btn.querySelector('#savings-insufficient-label');
          if (label) label.style.opacity = '0';
          btn.style.opacity = '0.4';

          setTimeout(function() {
            btn.disabled = false;
            btn.className = origClass;
            btn.innerHTML = origHtml;
            btn.style.opacity = '0';
            requestAnimationFrame(function() {
              btn.style.opacity = '1';
            });
          }, 650);
        }
      }, 3600);

    } else {
      // 2. পর্যাপ্ত ব্যালেন্স: সফলভাবে সঞ্চয় সম্পন্ন
      freshUser.balance = Math.max(0, freshBal - amount);
      localStorage.setItem('aloSignedInUser', JSON.stringify(freshUser));

      if (window.aloSupabase) {
        try {
          const normPhone = normalizeBdPhone(freshUser.phone);
          window.aloSupabase
            .from('users')
            .update({
              balance: freshUser.balance,
              updated_at: new Date().toISOString()
            })
            .eq('phone', normPhone)
            .then(function() {})
            .catch(function(e) { console.warn('Supabase sync warning:', e); });
        } catch(e) {}
      }

      // Save user active plan
      const targetGoal = Math.max(10000, Math.round((amount * 2.85) / 1000) * 1000);
      const newPlan = {
        id: 'plan_' + Date.now(),
        amount: amount,
        target: targetGoal,
        rate: 5,
        days: 45,
        daysElapsed: 0,
        dailyProfit: Math.round(amount * 0.05),
        totalProfit: Math.round(amount * 0.05 * 45),
        totalReturn: amount + Math.round(amount * 0.05 * 45),
        status: 'active',
        createdAt: new Date().toISOString()
      };
      const phoneKey = normalizeBdPhone(freshUser.phone) || 'default';
      localStorage.setItem('aloSavingsPlan_' + phoneKey, JSON.stringify(newPlan));

      // Reset button
      btn.disabled = false;
      btn.className = origClass;
      btn.innerHTML = origHtml;

      // Populate Back Face with the new plan
      const recordContent = document.getElementById('savings-record-card-content');
      if (recordContent) {
        recordContent.innerHTML = renderSavingsRecordCard(newPlan);
      }

      // Smooth transition to active record card
      const frontFace = document.getElementById('savings-front-face');
      const backFace = document.getElementById('savings-back-face');
      if (frontFace) {
        frontFace.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        frontFace.style.opacity = '0';
        frontFace.style.transform = 'scale(0.97)';
        setTimeout(function() {
          frontFace.style.display = 'none';
          if (backFace) {
            backFace.style.display = 'block';
            backFace.style.opacity = '0';
            backFace.style.transform = 'translateY(12px)';
            requestAnimationFrame(function() {
              backFace.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
              backFace.style.opacity = '1';
              backFace.style.transform = 'translateY(0)';
            });
          }
        }, 250);
      } else if (backFace) {
        backFace.style.display = 'block';
      }

      // Update balances across dashboard
      updateUserDetails(freshUser);
      updateProfileMetrics();
      const balEl = document.getElementById('savings-user-balance');
      if (balEl) balEl.textContent = '৳ ' + formatNumber(freshUser.balance, freshUser);

      showToastNotification(`🎉 অভিনন্দন! ৳ ${formatBanglaNumber(amount)} টাকার সঞ্চয় পরিকল্পনা সফলভাবে শুরু হয়েছে!`);
    }
  }, 750);
}
window.handleSavingsSubmission = handleSavingsSubmission;

// ==========================================
// USDT BEP20 DEPOSIT GATEWAY & AUTO-APPROVE
// ==========================================
const COMPANY_USDT_BEP20_ADDRESS = '0x74826F93F58Ae127FB6a77bFEFC5841B61bBDb16';

/**
 * Helper to ensure a valid Supabase Auth session token exists
 */
async function getSupabaseAuthBearerToken() {
  if (!window.aloSupabase || !window.aloSupabase.auth) return null;
  try {
    const { data: sessionData } = await window.aloSupabase.auth.getSession();
    if (sessionData && sessionData.session && sessionData.session.access_token) {
      return sessionData.session.access_token;
    }

    // If no active auth session, auto-provision/sign-in using the current user's credentials
    const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
    if (!user) return null;

    const phoneNum = (user.phone || user.accountNumber || 'user').replace(/\D/g, '');
    const userEmail = `${phoneNum || 'member'}@app.local`;
    const userSecret = user.passwordHash ? ('Pwd_' + user.passwordHash.slice(0, 16)) : 'UserSecret123!@#';

    const { data: signInRes } = await window.aloSupabase.auth.signInWithPassword({
      email: userEmail,
      password: userSecret
    }).catch(() => ({ data: null }));

    if (signInRes?.session?.access_token) {
      return signInRes.session.access_token;
    }

    // Try creating the auth account if first time
    await window.aloSupabase.auth.signUp({
      email: userEmail,
      password: userSecret
    }).catch(() => {});

    const { data: retryRes } = await window.aloSupabase.auth.signInWithPassword({
      email: userEmail,
      password: userSecret
    }).catch(() => ({ data: null }));

    return retryRes?.session?.access_token || null;
  } catch (e) {
    console.warn('Supabase auth token retrieval notice:', e);
    return null;
  }
}

/**
 * Global submitDeposit function
 * Sends POST request to /api/deposit with Authorization: Bearer <access_token>
 * Note: userId and amount are NOT sent to prevent client tampering.
 */
async function submitDeposit(depositData) {
  const token = await getSupabaseAuthBearerToken();
  const headers = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch('/api/deposit', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      txHash: depositData.txHash,
      senderAddress: depositData.senderAddress
    })
  });
  return await res.json();
}
window.submitDeposit = submitDeposit;

function getLocalUsdtDepositRecords() {
  try {
    const raw = localStorage.getItem('alo_usdt_deposits_history');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [];
}

function saveLocalUsdtDepositRecord(deposit) {
  try {
    const records = getLocalUsdtDepositRecords();
    records.unshift({
      txHash: deposit.txHash,
      senderAddress: deposit.senderAddress || '',
      usdtAmount: deposit.usdtAmount,
      bdtAmount: deposit.bdtAmount,
      date: new Date().toLocaleDateString('bn-BD'),
      time: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
      status: 'অনুমোদিত'
    });
    localStorage.setItem('alo_usdt_deposits_history', JSON.stringify(records.slice(0, 30)));
  } catch (e) {}
}

function renderRecentUsdtDeposits() {
  const container = document.getElementById('usdt-recent-records-list');
  if (!container) return;
  const records = getLocalUsdtDepositRecords();
  
  if (!records || records.length === 0) {
    container.innerHTML = `
      <div class="p-3.5 rounded-2xl bg-[#071a48] border border-[#143270] flex items-center justify-between shadow-md">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-10 h-10 rounded-full bg-[#102758] border border-[#1d4ed8]/30 flex items-center justify-center text-slate-300 shrink-0">
            <svg viewBox="0 0 24 24" class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </div>
          <div>
            <p class="text-sm font-bold text-white leading-tight">USDT deposit</p>
            <p class="text-xs text-[#8da0be] mt-0.5 font-normal">Nov 10 · BEP20</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-sm font-bold text-white font-mono">+50.00</p>
          <p class="text-xs font-semibold text-emerald-400 mt-0.5">Credited</p>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = records.map(function(item) {
    const rawDate = item.rawDate || item.date || 'Today';
    let displayDate = 'Nov 10';
    try {
      const d = new Date(rawDate);
      if (!isNaN(d.getTime())) {
        displayDate = d.toLocaleString('en-US', { month: 'short' }) + ' ' + String(d.getDate()).padStart(2, '0');
      } else {
        displayDate = String(rawDate).slice(0, 10);
      }
    } catch(e) {
      displayDate = 'Nov 10';
    }

    const amt = (typeof item.usdtAmount === 'number') ? item.usdtAmount.toFixed(2) : parseFloat(item.usdtAmount || 0).toFixed(2);
    const shortTx = item.txHash ? item.txHash.slice(0, 6) + '...' + item.txHash.slice(-4) : '';

    return `
      <div class="p-3.5 rounded-2xl bg-[#071a48] border border-[#143270] flex items-center justify-between shadow-md">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-10 h-10 rounded-full bg-[#102758] border border-[#1d4ed8]/30 flex items-center justify-center text-slate-300 shrink-0">
            <svg viewBox="0 0 24 24" class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </div>
          <div class="min-w-0">
            <p class="text-sm font-bold text-white leading-tight">USDT deposit</p>
            <p class="text-xs text-[#8da0be] mt-0.5 font-normal">${displayDate} · BEP20${shortTx ? ' · ' + shortTx : ''}</p>
          </div>
        </div>
        <div class="text-right shrink-0">
          <p class="text-sm font-bold text-white font-mono">+${amt}</p>
          <p class="text-xs font-semibold text-emerald-400 mt-0.5">Credited</p>
        </div>
      </div>
    `;
  }).join('');
}

function selectUsdtMode(mode) {
  const cryptoTab = document.getElementById('usdt-tab-crypto');
  const binanceTab = document.getElementById('usdt-tab-binance');
  const activeClasses = ['bg-[#0e2764]', 'text-white', 'shadow-md', 'border', 'border-[#1d4ed8]/50'];
  
  if (mode === 'binance') {
    if (cryptoTab) {
      cryptoTab.classList.remove(...activeClasses);
      cryptoTab.classList.add('text-[#8da0be]');
    }
    if (binanceTab) {
      binanceTab.classList.remove('text-[#8da0be]');
      binanceTab.classList.add(...activeClasses);
    }
    if (typeof showToastNotification === 'function') {
      showToastNotification('Binance Pay: BEP20 নেটওয়ার্কের মাধ্যমে ট্রান্সফার করুন');
    }
  } else {
    if (binanceTab) {
      binanceTab.classList.remove(...activeClasses);
      binanceTab.classList.add('text-[#8da0be]');
    }
    if (cryptoTab) {
      cryptoTab.classList.remove('text-[#8da0be]');
      cryptoTab.classList.add(...activeClasses);
    }
  }
}
window.selectUsdtMode = selectUsdtMode;

let currentUserBep20Address = COMPANY_USDT_BEP20_ADDRESS;
let isFetchingUserCryptoAddress = false;

function getCryptoUserId(user) {
  if (!user) user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
  if (!user) return 1;
  if (user.cryptoUserId) return parseInt(user.cryptoUserId, 10) || 1;

  // Try memberId numeric portion
  if (user.memberId) {
    const digits = String(user.memberId).replace(/\D/g, '');
    if (digits && digits.length >= 1) {
      return parseInt(digits.slice(-9), 10) || 1;
    }
  }

  // Try phone or accountNumber
  const rawPhone = user.phone || user.accountNumber || '';
  const phoneDigits = String(rawPhone).replace(/\D/g, '');
  if (phoneDigits && phoneDigits.length >= 4) {
    return parseInt(phoneDigits.slice(-9), 10) || 1;
  }
  return 1;
}

async function loadUserCryptoDepositAddress(forceRefresh = false) {
  const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
  const userId = getCryptoUserId(user);
  const cacheKey = `alo_bep20_user_addr_${userId}`;

  const addressEl = document.getElementById('company-bep20-address-text');
  const qrImg = document.getElementById('usdt-deposit-qrcode-img');
  const qrSpinner = document.getElementById('usdt-qr-loading-spinner');
  const statusBadge = document.getElementById('usdt-address-status-badge');

  // Check cache first for instant zero-latency display (ignore fallback company address)
  const cached = localStorage.getItem(cacheKey);
  const isFallback = (cached === COMPANY_USDT_BEP20_ADDRESS);
  if (cached && !isFallback && !forceRefresh) {
    currentUserBep20Address = cached;
    if (addressEl) addressEl.textContent = cached;
    if (qrImg) qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(cached)}`;
    if (statusBadge) statusBadge.textContent = `ইউজার ID: #${userId} · লাইভ`;
  }

  if (isFetchingUserCryptoAddress) return currentUserBep20Address;
  isFetchingUserCryptoAddress = true;
  if (qrSpinner && (!cached || isFallback)) qrSpinner.classList.remove('hidden');

  try {
    let res = null;
    const fetchEndpoints = [
      `/api/crypto?action=address&userId=${userId}`,
      `/api/crypto/${userId}`,
      `https://imcagro.top/crypto/${userId}`
    ];
    for (const ep of fetchEndpoints) {
      try {
        const attempt = await fetch(ep);
        if (attempt && attempt.ok) {
          res = attempt;
          break;
        }
      } catch (eAttempt) {}
    }

    if (res && res.ok) {
      const data = await res.json();
      if (data && data.success && data.bep20_address) {
        currentUserBep20Address = data.bep20_address;
        localStorage.setItem(cacheKey, currentUserBep20Address);
        if (addressEl) addressEl.textContent = currentUserBep20Address;
        if (qrImg) qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(currentUserBep20Address)}`;
        if (statusBadge) statusBadge.textContent = `ইউজার ID: #${userId} · লাইভ`;
      }
    }
  } catch (err) {
    console.warn('[Crypto] Address load fallback:', err);
    if (!cached && addressEl) {
      const cfgAddr = (window.aloPlatformConfig && window.aloPlatformConfig.usdtAddress) || COMPANY_USDT_BEP20_ADDRESS;
      addressEl.textContent = cfgAddr;
      currentUserBep20Address = cfgAddr;
    }
  } finally {
    isFetchingUserCryptoAddress = false;
    if (qrSpinner) qrSpinner.classList.add('hidden');
  }

  return currentUserBep20Address;
}
window.loadUserCryptoDepositAddress = loadUserCryptoDepositAddress;

async function checkUserUsdtDepositBalance(options = { showToast: true }) {
  const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
  const userId = getCryptoUserId(user);

  const balanceText = document.getElementById('usdt-live-balance-text');
  const spinner = document.getElementById('usdt-balance-refresh-spinner');
  const refreshText = document.getElementById('usdt-balance-refresh-text');
  const btn = document.getElementById('usdt-refresh-balance-btn');

  if (spinner) spinner.classList.remove('hidden');
  if (refreshText) refreshText.textContent = 'Checking...';
  if (btn) btn.disabled = true;

  try {
    let res = null;
    const checkEndpoints = [
      `/api/crypto?action=check&userId=${userId}`,
      `/api/crypto/check/${userId}`,
      `https://imcagro.top/crypto/check/${userId}`
    ];
    for (const ep of checkEndpoints) {
      try {
        const attempt = await fetch(ep);
        if (attempt && attempt.ok) {
          res = attempt;
          break;
        }
      } catch (eAttempt) {}
    }

    if (res && res.ok) {
      const data = await res.json();
      if (data && data.success) {
        const rawBalance = parseFloat(data.usdt_balance || 0);
        if (balanceText) {
          balanceText.textContent = `${rawBalance.toFixed(2)} USDT`;
        }

        // Track credited on-chain balance to prevent double crediting
        const creditedKey = `alo_usdt_credited_${userId}`;
        const lastCredited = parseFloat(localStorage.getItem(creditedKey) || '0');

        if (rawBalance > lastCredited) {
          const newUsdt = rawBalance - lastCredited;
          const activeRate = Number((window.aloPlatformConfig && window.aloPlatformConfig.usdtRate) || 125);
          const bdtCredit = newUsdt * activeRate;

          if (user) {
            user.balance = (user.balance || 0) + bdtCredit;
            if (typeof saveUser === 'function') saveUser(user);
            if (typeof dbSaveUser === 'function') dbSaveUser(user);
            if (typeof updateUserDetails === 'function') updateUserDetails(user);
            if (typeof updateProfileMetrics === 'function') updateProfileMetrics();
            if (typeof updateVipHallRooms === 'function') updateVipHallRooms();

            if (typeof dbRecordTransaction === 'function') {
              const now = new Date();
              dbRecordTransaction({
                phone: user.phone || user.accountNumber,
                type: 'deposit',
                amount: bdtCredit,
                actual: bdtCredit,
                ratio: '100%',
                status: 'অনুমোদিত',
                method: 'USDT (BEP20)',
                date: now.toISOString().split('T')[0],
                time: now.toTimeString().split(' ')[0],
                newBalance: user.balance
              });
            }

            if (typeof saveLocalUsdtDepositRecord === 'function') {
              saveLocalUsdtDepositRecord({
                txHash: `onchain_${Date.now()}`,
                senderAddress: currentUserBep20Address || '',
                usdtAmount: newUsdt,
                bdtAmount: bdtCredit
              });
            }
            if (typeof renderRecentUsdtDeposits === 'function') {
              renderRecentUsdtDeposits();
            }
          }

          localStorage.setItem(creditedKey, String(rawBalance));

          if (typeof showToastNotification === 'function') {
            showToastNotification(`🎉 অভিনন্দন! ${newUsdt.toFixed(2)} USDT (৳ ${bdtCredit.toLocaleString('en-US')}) ব্যালেন্সে যোগ হয়েছে!`);
          }
        } else if (options && options.showToast) {
          if (typeof showToastNotification === 'function') {
            showToastNotification(`অন-চেন ব্যালেন্স: ${rawBalance.toFixed(2)} USDT (কোনো নতুন ডিপোজিট পাওয়া যায়নি)`);
          }
        }
      }
    }
  } catch (err) {
    console.warn('[Crypto] Balance check error:', err);
    if (options && options.showToast && typeof showToastNotification === 'function') {
      showToastNotification('ব্যালেন্স চেক সম্পন্ন হতে পারেনি, আবার চেষ্টা করুন');
    }
  } finally {
    if (spinner) spinner.classList.add('hidden');
    if (refreshText) refreshText.textContent = 'Check Balance ↺';
    if (btn) btn.disabled = false;
  }
}
window.checkUserUsdtDepositBalance = checkUserUsdtDepositBalance;

let usdtBalancePollInterval = null;

function startUsdtBalancePolling() {
  if (usdtBalancePollInterval) clearInterval(usdtBalancePollInterval);
  usdtBalancePollInterval = setInterval(function() {
    const card = document.getElementById('usdt-deposit-details-card');
    const panel = document.getElementById('usdt-deposit-panel');
    if (!panel || panel.hidden || !card || card.classList.contains('hidden')) {
      clearInterval(usdtBalancePollInterval);
      usdtBalancePollInterval = null;
      return;
    }
    checkUserUsdtDepositBalance({ showToast: false });
  }, 10000);
}

function toggleUsdtDepositDrawer() {
  const preView = document.getElementById('usdt-pre-deposit-view');
  const card = document.getElementById('usdt-deposit-details-card');
  if (preView) preView.classList.add('hidden');
  if (card) {
    card.classList.remove('hidden');
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    card.classList.add('ring-2', 'ring-[#f3ba2f]', 'ring-offset-2', 'ring-offset-[#02071d]');
    setTimeout(function() {
      card.classList.remove('ring-2', 'ring-[#f3ba2f]', 'ring-offset-2', 'ring-offset-[#02071d]');
    }, 1500);
  }
  loadUserCryptoDepositAddress();
  checkUserUsdtDepositBalance({ showToast: false });
  startUsdtBalancePolling();
}
window.toggleUsdtDepositDrawer = toggleUsdtDepositDrawer;

function showUsdtSelectionView() {
  const preView = document.getElementById('usdt-pre-deposit-view');
  const card = document.getElementById('usdt-deposit-details-card');
  if (card) card.classList.add('hidden');
  if (preView) {
    preView.classList.remove('hidden');
    preView.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  if (usdtBalancePollInterval) {
    clearInterval(usdtBalancePollInterval);
    usdtBalancePollInterval = null;
  }
}
window.showUsdtSelectionView = showUsdtSelectionView;

function refreshUsdtDepositRecords() {
  renderRecentUsdtDeposits();
  if (typeof showToastNotification === 'function') {
    showToastNotification('ডিপোজিট হিস্ট্রি রিফ্রেশ করা হয়েছে ↺');
  }
}
window.refreshUsdtDepositRecords = refreshUsdtDepositRecords;

function copyTextHelper(text, onSuccess) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function() {
      if (typeof onSuccess === 'function') onSuccess();
    }).catch(function() {
      fallbackExecCopy(text, onSuccess);
    });
  } else {
    fallbackExecCopy(text, onSuccess);
  }
}

function fallbackExecCopy(text, onSuccess) {
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    if (typeof onSuccess === 'function') onSuccess();
  } catch (e) {}
}

function initUsdtDeposit() {
  // 1. Copy Unique BEP20 Address
  const copyBtn = document.getElementById('copy-company-usdt-address-btn');
  const copyBtnText = document.getElementById('copy-btn-text');
  if (copyBtn) {
    copyBtn.onclick = function(e) {
      e.preventDefault();
      const targetAddress = currentUserBep20Address || COMPANY_USDT_BEP20_ADDRESS;
      copyTextHelper(targetAddress, function() {
        if (copyBtnText) copyBtnText.textContent = '✓ Copied!';
        if (typeof showToastNotification === 'function') {
          showToastNotification('BEP20 Address Copied!');
        }
        setTimeout(function() {
          if (copyBtnText) copyBtnText.textContent = 'Copy Address';
        }, 2500);
      });
    };
  }

  // Preload unique address
  if (typeof loadUserCryptoDepositAddress === 'function') {
    loadUserCryptoDepositAddress();
  }

  // 2. Paste TxHash from Clipboard
  const pasteBtn = document.getElementById('usdt-paste-tx-btn');
  const txInput = document.getElementById('usdt-txhash-input');
  if (pasteBtn && txInput) {
    pasteBtn.onclick = async function(e) {
      e.preventDefault();
      try {
        if (navigator.clipboard && navigator.clipboard.readText) {
          const text = await navigator.clipboard.readText();
          if (text) {
            txInput.value = text.trim();
            if (typeof showToastNotification === 'function') {
              showToastNotification('TxHash পেস্ট করা হয়েছে');
            }
          }
        } else {
          txInput.focus();
        }
      } catch (err) {
        txInput.focus();
      }
    };
  }

  // 3. Amount Input -> BDT preview calculation
  const amountInput = document.getElementById('usdt-amount-input');
  const bdtPreview = document.getElementById('usdt-bdt-preview');
  if (amountInput && bdtPreview) {
    amountInput.oninput = function() {
      const val = parseFloat(amountInput.value) || 0;
      const activeRate = Number((window.aloPlatformConfig && window.aloPlatformConfig.usdtRate) || 125);
      bdtPreview.textContent = (val * activeRate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };
  }

  // 4. Back Button
  const backBtn = document.getElementById('usdt-deposit-back-btn');
  if (backBtn) {
    backBtn.onclick = function(e) {
      e.preventDefault();
      const detailsCard = document.getElementById('usdt-deposit-details-card');
      const preView = document.getElementById('usdt-pre-deposit-view');
      if (detailsCard && !detailsCard.classList.contains('hidden')) {
        showUsdtSelectionView();
        return;
      }
      openDashboardPanel('payment-method');
    };
  }

  // 5. Submit & Auto-Approve Button
  const submitBtn = document.getElementById('usdt-submit-deposit-btn');
  const msgEl = document.getElementById('usdt-submit-message');
  const senderInput = document.getElementById('usdt-sender-address-input');
  const btnSpinner = document.getElementById('usdt-btn-spinner');
  const btnIcon = document.getElementById('usdt-btn-icon');
  const btnText = document.getElementById('usdt-btn-text');

  if (submitBtn) {
    submitBtn.onclick = async function(e) {
      e.preventDefault();
      const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
      if (!user) {
        if (typeof showToastNotification === 'function') {
          showToastNotification('অনুগ্রহ করে প্রথমে লগইন করুন');
        }
        return;
      }

      const txHash = txInput ? txInput.value.trim() : '';
      const senderAddress = senderInput ? senderInput.value.trim() : '';

      if (!senderAddress) {
        if (msgEl) {
          msgEl.className = 'text-xs text-center font-semibold text-rose-400 py-1.5 bg-rose-500/10 rounded-lg border border-rose-500/30';
          msgEl.textContent = 'অনুগ্রহ করে আপনার প্রেরক ওয়ালেট অ্যাড্রেস (Sender Address) প্রদান করুন।';
          msgEl.classList.remove('hidden');
        }
        if (senderInput) senderInput.focus();
        return;
      }

      if (!/^0x[a-fA-F0-9]{40}$/.test(senderAddress)) {
        if (msgEl) {
          msgEl.className = 'text-xs text-center font-semibold text-rose-400 py-1.5 bg-rose-500/10 rounded-lg border border-rose-500/30';
          msgEl.textContent = 'ভুল প্রেরক ওয়ালেট অ্যাড্রেস ফরম্যাট (0x দিয়ে শুরু হওয়া ৪২ অক্ষরের হতে হবে)।';
          msgEl.classList.remove('hidden');
        }
        if (senderInput) senderInput.focus();
        return;
      }

      if (!txHash) {
        if (msgEl) {
          msgEl.className = 'text-xs text-center font-semibold text-rose-400 py-1.5 bg-rose-500/10 rounded-lg border border-rose-500/30';
          msgEl.textContent = 'অনুগ্রহ করে ট্রানজেকশন হ্যাশ (TxHash / TxID) প্রদান করুন।';
          msgEl.classList.remove('hidden');
        }
        if (txInput) txInput.focus();
        return;
      }

      if (!/^0x[a-fA-F0-9]{64}$/.test(txHash)) {
        if (msgEl) {
          msgEl.className = 'text-xs text-center font-semibold text-rose-400 py-1.5 bg-rose-500/10 rounded-lg border border-rose-500/30';
          msgEl.textContent = 'ভুল TxHash ফরম্যাট! ট্রানজেকশন হ্যাশ অবশ্যই 0x দিয়ে শুরু হওয়া ৬৬ অক্ষরের হেক্সাডেসিমাল কোড হতে হবে।';
          msgEl.classList.remove('hidden');
        }
        return;
      }

      // Enter loading state
      submitBtn.disabled = true;
      if (btnSpinner) btnSpinner.classList.remove('hidden');
      if (btnIcon) btnIcon.classList.add('hidden');
      if (btnText) btnText.textContent = 'ব্লকচেইন ভেরিফাই হচ্ছে...';
      if (msgEl) {
        msgEl.className = 'text-xs text-center font-semibold text-sky-400 py-1.5 bg-sky-500/10 rounded-lg border border-sky-500/30 animate-pulse';
        msgEl.textContent = 'অন-চেইন রিসিপ্ট ও ১৫ কনফার্মেশন যাচাই করা হচ্ছে...';
        msgEl.classList.remove('hidden');
      }

      try {
        const payload = {
          txHash: txHash,
          senderAddress: senderAddress
        };

        const result = await submitDeposit(payload);

        if (result && result.success) {
          const depositData = result.deposit || {};
          const bdtAmount = Number(depositData.bdtAmount) || 0;
          const usdtAmount = Number(depositData.usdtAmount) || 0;

          // 1. Credit User Balance & Personal Balance (Lifetime earnings) strictly from on-chain value
          if (typeof depositData.newBalance === 'number') {
            user.balance = depositData.newBalance;
          } else {
            user.balance = (Number(user.balance) || 0) + bdtAmount;
          }

          if (typeof user.lifetimeEarnings === 'number') {
            user.lifetimeEarnings += bdtAmount;
          } else {
            user.lifetimeEarnings = user.balance;
          }

          localStorage.setItem('aloSignedInUser', JSON.stringify(user));
          if (typeof dbSaveUser === 'function') {
            dbSaveUser(user);
          }

          // 2. Record Transaction
          if (typeof dbRecordTransaction === 'function') {
            const now = new Date();
            const dateStr = now.toISOString().split('T')[0];
            const timeStr = now.toTimeString().split(' ')[0];
            dbRecordTransaction({
              phone: user.phone || user.accountNumber,
              type: 'deposit',
              amount: bdtAmount,
              actual: bdtAmount,
              ratio: '100%',
              status: 'অনুমোদিত',
              method: 'USDT (BEP20)',
              date: dateStr,
              time: timeStr,
              newBalance: user.balance
            });
          }

          // 3. Update UI
          if (typeof updateUserDetails === 'function') updateUserDetails(user);
          if (typeof updateProfileMetrics === 'function') updateProfileMetrics();
          if (typeof updateVipHallRooms === 'function') updateVipHallRooms();
          if (typeof updatePaymentAndWithdrawalForUser === 'function') updatePaymentAndWithdrawalForUser();

          // 4. Record Locally & Re-render
          saveLocalUsdtDepositRecord({
            txHash: depositData.txHash || txHash,
            senderAddress: depositData.senderAddress || senderAddress,
            usdtAmount: usdtAmount,
            bdtAmount: bdtAmount
          });
          renderRecentUsdtDeposits();

          // 5. Success Feedback
          if (msgEl) {
            msgEl.className = 'text-xs text-center font-bold text-emerald-400 py-2 px-3 bg-emerald-500/15 rounded-xl border border-emerald-500/40';
            msgEl.textContent = result.message || `🎉 অভিনন্দন! ${usdtAmount} USDT (৳ ${bdtAmount.toLocaleString('en-US')}) অটো এপ্রুভ হয়েছে।`;
            msgEl.classList.remove('hidden');
          }

          if (typeof showToastNotification === 'function') {
            showToastNotification(`🎉 ${usdtAmount} USDT ডিপোজিট সফল ও ব্যালেন্সে যুক্ত হয়েছে!`);
          }

          // Clear inputs
          if (txInput) txInput.value = '';
          if (senderInput) senderInput.value = '';
          if (amountInput) amountInput.value = '';
          if (bdtPreview) bdtPreview.textContent = '০.০০';

        } else {
          // Failure response from API
          const errMsg = (result && result.message) ? result.message : 'ডিপোজিট ভেরিফিকেশন ব্যর্থ হয়েছে।';
          if (msgEl) {
            msgEl.className = 'text-xs text-center font-semibold text-rose-400 py-2 px-3 bg-rose-500/15 rounded-xl border border-rose-500/40';
            msgEl.textContent = errMsg;
            msgEl.classList.remove('hidden');
          }
          if (typeof showToastNotification === 'function') {
            showToastNotification(errMsg);
          }
        }
      } catch (err) {
        console.error('USDT Deposit submit error:', err);
        const errMsg = 'সার্ভার যোগাযোগে সমস্যা হয়েছে: ' + (err.message || 'Network Error');
        if (msgEl) {
          msgEl.className = 'text-xs text-center font-semibold text-rose-400 py-1.5 bg-rose-500/10 rounded-lg border border-rose-500/30';
          msgEl.textContent = errMsg;
          msgEl.classList.remove('hidden');
        }
        if (typeof showToastNotification === 'function') {
          showToastNotification(errMsg);
        }
      } finally {
        submitBtn.disabled = false;
        if (btnSpinner) btnSpinner.classList.add('hidden');
        if (btnIcon) btnIcon.classList.remove('hidden');
        if (btnText) btnText.textContent = 'জমা দিন ও অটো এপ্রুভ করুন';
      }
    };
  }

  // Render recent records on load
  renderRecentUsdtDeposits();
}
window.initUsdtDeposit = initUsdtDeposit;

// ==============================================================
// BANGLADESH ONLINE PAYMENT GATEWAY (bKash & Nagad via imcagro.top)
// ==============================================================
let selectedGatewayMethod = 'BKASH'; // 'BKASH' or 'NAGAD'

function setGatewayMethod(method) {
  selectedGatewayMethod = (method === 'NAGAD') ? 'NAGAD' : 'BKASH';
  const icon = document.getElementById('gateway-method-icon');
  const label = document.getElementById('gateway-method-label');
  const buttons = document.querySelectorAll('.gateway-switch-method-btn');

  if (selectedGatewayMethod === 'BKASH') {
    if (icon) {
      icon.className = 'w-7 h-7 rounded-full bg-[#e2136e] flex items-center justify-center text-white text-[11px] font-bold shadow';
      icon.textContent = 'bK';
    }
    if (label) label.textContent = 'বিকাশ (bKash)';
  } else {
    if (icon) {
      icon.className = 'w-7 h-7 rounded-full bg-[#f7931e] flex items-center justify-center text-white text-[11px] font-bold shadow';
      icon.textContent = 'নগদ';
    }
    if (label) label.textContent = 'নগদ (Nagad)';
  }

  buttons.forEach(function(btn) {
    if (btn.dataset.method === selectedGatewayMethod) {
      const color = selectedGatewayMethod === 'BKASH' ? 'text-[#e2136e] bg-[#e2136e]/20 border-[#e2136e]/50' : 'text-[#f7931e] bg-[#f7931e]/20 border-[#f7931e]/50';
      btn.className = `gateway-switch-method-btn px-2.5 py-1 rounded-lg text-[10.5px] font-bold border transition cursor-pointer ${color}`;
    } else {
      btn.className = 'gateway-switch-method-btn px-2.5 py-1 rounded-lg text-[10.5px] font-bold border transition cursor-pointer bg-[#0e2a66] text-slate-300 border-[#1a3875] hover:text-white';
    }
  });
}
window.setGatewayMethod = setGatewayMethod;

async function handleGatewayPayNow() {
  const customInput = document.getElementById('gateway-custom-amount');
  const statusMsg = document.getElementById('gateway-pay-status-msg');
  const payBtn = document.getElementById('gateway-pay-now-btn');
  const btnSpinner = document.getElementById('gateway-btn-spinner');
  const btnText = document.getElementById('gateway-btn-text');

  const rawAmount = customInput ? parseFloat(customInput.value) : 0;
  const amount = Math.round(rawAmount);

  const minRcAmt = Number((window.aloPlatformConfig && window.aloPlatformConfig.minRecharge) || 300);

  // Validate: whole numbers only, minRecharge to 50000
  if (!amount || isNaN(amount) || amount < minRcAmt || amount > 50000) {
    if (statusMsg) {
      statusMsg.className = 'text-xs text-center font-semibold text-rose-400 py-2 bg-rose-500/10 rounded-lg border border-rose-500/30';
      statusMsg.textContent = `টাকার পরিমাণ অবশ্যই ${minRcAmt} থেকে ৫০,০০০ এর মধ্যে হতে হবে। (Min ${minRcAmt}, Max 50000 BDT)`;
      statusMsg.classList.remove('hidden');
    }
    if (customInput) customInput.focus();
    return;
  }

  // Payment type in uppercase: BKASH or NAGAD
  const payType = (selectedGatewayMethod === 'NAGAD' ? 'NAGAD' : 'BKASH').toUpperCase();

  // Generate unique orderId: "ORD" + timestamp + 3 random digits
  const orderId = 'ORD' + Date.now() + Math.floor(100 + Math.random() * 900);

  // Loading state & double-submit prevention
  if (payBtn) payBtn.disabled = true;
  if (btnSpinner) btnSpinner.classList.remove('hidden');
  if (btnText) btnText.textContent = 'গেটওয়ে পেজে নিয়ে যাওয়া হচ্ছে...';
  if (statusMsg) {
    statusMsg.className = 'text-xs text-center font-semibold text-sky-400 py-2 bg-sky-500/10 rounded-lg border border-sky-500/30 animate-pulse';
    statusMsg.textContent = 'পেমেন্ট গেটওয়ে লিংক প্রস্তুত হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...';
    statusMsg.classList.remove('hidden');
  }

  // In cPanel (imcagro.top) or preview, route through the cPanel payment server
  const apiUrl = (window.location.hostname === 'imcagro.top' || window.location.hostname.endsWith('.imcagro.top'))
    ? 'https://imcagro.top/api/create-payment'
    : '/api/create-payment';

  const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
  const userPhone = user ? (user.phone || user.accountNumber || '') : '';

  try {
    localStorage.setItem('alo_pending_recharge_order', JSON.stringify({
      orderId: orderId,
      amount: amount,
      payType: payType,
      phone: userPhone,
      timestamp: Date.now()
    }));
  } catch (e) {}

  // Ensure pending deposit order exists in Supabase for Admin Panel tracking
  if (window.aloSupabase && userPhone) {
    try {
      const now = new Date();
      window.aloSupabase.from('transactions').insert({
        phone: normalizeBdPhone(userPhone),
        type: 'deposit',
        amount: amount,
        actual: amount,
        ratio: '0%',
        status: 'মুলতবি (Pending)',
        method: payType === 'NAGAD' ? 'নগদ (Nagad) [Auto]' : 'বিকাশ (bKash) [Auto]',
        order_id: orderId,
        out_trade_no: orderId,
        date: now.toISOString().split('T')[0],
        time: now.toTimeString().split(' ')[0],
        created_at: now.toISOString()
      }).catch(function() {});
    } catch (e) {}
  }

  const payload = {
    amount: amount,
    orderId: orderId,
    payType: payType,
    phone: userPhone,
    attach: userPhone
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    console.log('[Backend Payment Response]', data);

    // Check success & extract paymentUrl
    const paymentUrl = data.paymentUrl || 
                       data?.gatewayResponse?.data?.url || 
                       data?.data?.url || 
                       data?.url;

    if (data.success === true && paymentUrl) {
      if (statusMsg) {
        statusMsg.className = 'text-xs text-center font-bold text-emerald-400 py-2 bg-emerald-500/15 rounded-lg border border-emerald-500/30';
        statusMsg.textContent = '✅ সফল! পেমেন্ট ক্যাশিয়ার পেজে রিডাইরেক্ট করা হচ্ছে...';
      }
      // Redirect to the cashier URL returned by the backend
      window.location.href = paymentUrl;
      return;
    }

    // Failure: show gatewayResponse.msg or message
    const errMsg = data?.gatewayResponse?.msg || 
                   data?.message || 
                   data?.msg || 
                   (typeof data?.error === 'string' ? data.error : '') || 
                   'পেমেন্ট লিংক পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।';

    if (statusMsg) {
      statusMsg.className = 'text-xs text-center font-semibold text-rose-400 py-2 bg-rose-500/10 rounded-lg border border-rose-500/30';
      statusMsg.textContent = 'পেমেন্ট ত্রুটি: ' + errMsg;
      statusMsg.classList.remove('hidden');
    }
    if (typeof showToastNotification === 'function') {
      showToastNotification(errMsg);
    }

  } catch (err) {
    console.error('Payment request error:', err);
    if (statusMsg) {
      statusMsg.className = 'text-xs text-center font-semibold text-rose-400 py-2 bg-rose-500/10 rounded-lg border border-rose-500/30';
      statusMsg.textContent = 'সার্ভার যোগাযোগে সমস্যা হয়েছে: ' + (err.message || 'নেটওয়ার্ক এরর');
      statusMsg.classList.remove('hidden');
    }
    if (typeof showToastNotification === 'function') {
      showToastNotification('পেমেন্ট সার্ভারে সংযোগ করা যায়নি।');
    }
  } finally {
    if (payBtn) payBtn.disabled = false;
    if (btnSpinner) btnSpinner.classList.add('hidden');
    if (btnText) btnText.textContent = 'Pay Now (পেমেন্ট করুন) ⚡';
  }
}
window.handleGatewayPayNow = handleGatewayPayNow;

function initBdGatewayCheckout() {
  // Method switch buttons (bKash / Nagad)
  document.querySelectorAll('.gateway-switch-method-btn').forEach(function(btn) {
    btn.onclick = function(e) {
      e.preventDefault();
      setGatewayMethod(btn.dataset.method);
    };
  });

  // Quick Amount chips
  document.querySelectorAll('.gateway-quick-amt').forEach(function(btn) {
    btn.onclick = function(e) {
      e.preventDefault();
      const amt = parseFloat(btn.dataset.amount || '0');
      const input = document.getElementById('gateway-custom-amount');
      if (input && amt > 0) {
        input.value = amt;
      }
      document.querySelectorAll('.gateway-quick-amt').forEach(function(b) {
        b.classList.remove('ring-2', 'ring-[#35c6e7]', 'bg-[#1264c9]');
        b.classList.add('bg-[#0e2a66]');
      });
      btn.classList.add('ring-2', 'ring-[#35c6e7]', 'bg-[#1264c9]');
      btn.classList.remove('bg-[#0e2a66]');
    };
  });

  // Custom amount input listener
  const customInput = document.getElementById('gateway-custom-amount');
  if (customInput) {
    customInput.oninput = function() {
      const val = parseFloat(customInput.value || '0');
      document.querySelectorAll('.gateway-quick-amt').forEach(function(b) {
        if (parseFloat(b.dataset.amount || '0') === val) {
          b.classList.add('ring-2', 'ring-[#35c6e7]', 'bg-[#1264c9]');
          b.classList.remove('bg-[#0e2a66]');
        } else {
          b.classList.remove('ring-2', 'ring-[#35c6e7]', 'bg-[#1264c9]');
          b.classList.add('bg-[#0e2a66]');
        }
      });
    };
  }

  // Pay Now button
  const payBtn = document.getElementById('gateway-pay-now-btn');
  if (payBtn) {
    payBtn.onclick = function(e) {
      e.preventDefault();
      handleGatewayPayNow();
    };
  }
}
window.initBdGatewayCheckout = initBdGatewayCheckout;

// ==========================================
// DEDICATED BD RECHARGE PAGE (বিকাশ ও নগদ পেজ)
// ==========================================
let currentBdPaymentMethod = 'BKASH';

function openBdRechargePage(method) {
  currentBdPaymentMethod = (method === 'NAGAD') ? 'NAGAD' : 'BKASH';
  
  const titleEl = document.getElementById('bd-recharge-title');
  const badgeEl = document.getElementById('bd-recharge-method-badge');
  const nameEl = document.getElementById('bd-recharge-method-name');
  const amountInput = document.getElementById('bd-recharge-amount-input');
  const statusMsg = document.getElementById('bd-recharge-status-msg');
  const submitBtn = document.getElementById('bd-recharge-submit-btn');
  const spinner = document.getElementById('bd-recharge-spinner');
  const btnText = document.getElementById('bd-recharge-btn-text');

  if (statusMsg) {
    statusMsg.textContent = '';
    statusMsg.className = 'text-xs text-center font-semibold min-h-[16px] py-2 px-3 rounded-xl hidden';
  }

  if (spinner) spinner.classList.add('hidden');
  if (submitBtn) submitBtn.disabled = false;
  if (btnText) btnText.textContent = 'জমা দিন';

  if (amountInput) {
    amountInput.value = '500';
  }

  // Highlight ৳500 chip by default
  document.querySelectorAll('.bd-amt-chip').forEach(function(chip, idx) {
    if (idx === 1) {
      chip.className = 'bd-amt-chip py-2 rounded-lg bg-[#0284c7] hover:bg-[#123685] border border-[#38bdf8] text-white transition cursor-pointer ring-2 ring-[#38bdf8]';
    } else {
      chip.className = 'bd-amt-chip py-2 rounded-lg bg-[#0c2357] hover:bg-[#123685] border border-[#173a7d] text-white transition cursor-pointer';
    }
  });

  if (currentBdPaymentMethod === 'BKASH') {
    if (titleEl) titleEl.textContent = 'বিকাশ';
    if (nameEl) nameEl.textContent = 'বিকাশ (bKash)';
    if (badgeEl) {
      badgeEl.className = 'w-12 h-12 rounded-full bg-[#e2136e] flex items-center justify-center shrink-0 shadow-md';
      badgeEl.innerHTML = `
        <svg viewBox="0 0 100 100" class="w-7 h-7 fill-white">
          <polygon points="52,18 20,48 55,42"/>
          <polygon points="20,48 55,42 35,68"/>
          <polygon points="55,42 82,32 60,62"/>
          <polygon points="55,42 60,62 35,68"/>
          <polygon points="60,62 76,78 68,54"/>
          <polygon points="35,68 46,84 54,67"/>
        </svg>
      `;
    }
  } else {
    if (titleEl) titleEl.textContent = 'নগদ';
    if (nameEl) nameEl.textContent = 'নগদ (Nagad)';
    if (badgeEl) {
      badgeEl.className = 'w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-md p-1.5';
      badgeEl.innerHTML = `
        <svg viewBox="0 0 64 64" class="w-8 h-8">
          <path d="M32 8C23 8 15 15 15 25c0 13 17 25 17 25s17-12 17-25c0-10-8-17-17-17z" fill="#f7931e"/>
          <path d="M32 16c-5 0-9 4-9 9 0 7 9 15 9 15s9-8 9-15c0-5-4-9-9-9z" fill="#e22d24"/>
          <circle cx="32" cy="25" r="3.5" fill="#ffffff"/>
          <text x="32" y="60" font-size="12" font-weight="900" fill="#e22d24" text-anchor="middle" font-family="sans-serif">নগদ</text>
        </svg>
      `;
    }
  }

  previousDashboardPanel = 'payment-method';
  openDashboardPanel('bd-recharge');
}
window.openBdRechargePage = openBdRechargePage;

function setBdRechargeAmount(amount, btn) {
  const input = document.getElementById('bd-recharge-amount-input');
  if (input) {
    input.value = amount;
  }
  document.querySelectorAll('.bd-amt-chip').forEach(function(b) {
    b.className = 'bd-amt-chip py-2 rounded-lg bg-[#0c2357] hover:bg-[#123685] border border-[#173a7d] text-white transition cursor-pointer';
  });
  if (btn) {
    btn.className = 'bd-amt-chip py-2 rounded-lg bg-[#0284c7] hover:bg-[#123685] border border-[#38bdf8] text-white transition cursor-pointer ring-2 ring-[#38bdf8]';
  }
}
window.setBdRechargeAmount = setBdRechargeAmount;

async function handleBdRechargeSubmit() {
  const amountInput = document.getElementById('bd-recharge-amount-input');
  const statusMsg = document.getElementById('bd-recharge-status-msg');
  const submitBtn = document.getElementById('bd-recharge-submit-btn');
  const spinner = document.getElementById('bd-recharge-spinner');
  const btnText = document.getElementById('bd-recharge-btn-text');

  const rawAmount = amountInput ? parseFloat(amountInput.value) : 0;
  const amount = Math.round(rawAmount);

  const minRcAmt = Number((window.aloPlatformConfig && window.aloPlatformConfig.minRecharge) || 300);
  if (!amount || isNaN(amount) || amount < minRcAmt || amount > 50000) {
    if (statusMsg) {
      statusMsg.className = 'text-xs text-center font-semibold text-rose-300 py-2.5 bg-rose-500/20 rounded-xl border border-rose-500/40';
      statusMsg.textContent = `টাকার পরিমাণ অবশ্যই ${minRcAmt} থেকে ৫০,০০০ এর মধ্যে হতে হবে।`;
      statusMsg.classList.remove('hidden');
    }
    if (amountInput) amountInput.focus();
    return;
  }

  const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
  const userPhone = user ? (user.phone || user.accountNumber || '') : '';
  const orderId = 'ORD' + Date.now() + Math.floor(100 + Math.random() * 900);
  const payType = currentBdPaymentMethod; // 'BKASH' or 'NAGAD'

  try {
    localStorage.setItem('alo_pending_recharge_order', JSON.stringify({
      orderId: orderId,
      amount: amount,
      payType: payType,
      phone: userPhone,
      timestamp: Date.now()
    }));
  } catch (e) {}

  // Ensure pending deposit order exists in Supabase for Admin Panel tracking
  if (window.aloSupabase && userPhone) {
    try {
      const now = new Date();
      window.aloSupabase.from('transactions').insert({
        phone: normalizeBdPhone(userPhone),
        type: 'deposit',
        amount: amount,
        actual: amount,
        ratio: '0%',
        status: 'মুলতবি (Pending)',
        method: payType === 'NAGAD' ? 'নগদ (Nagad) [Auto]' : 'বিকাশ (bKash) [Auto]',
        order_id: orderId,
        out_trade_no: orderId,
        date: now.toISOString().split('T')[0],
        time: now.toTimeString().split(' ')[0],
        created_at: now.toISOString()
      }).catch(function() {});
    } catch (e) {}
  }

  if (submitBtn) submitBtn.disabled = true;
  if (spinner) spinner.classList.remove('hidden');
  if (btnText) btnText.textContent = 'প্রসেসিং হচ্ছে...';
  if (statusMsg) {
    statusMsg.className = 'text-xs text-center font-semibold text-sky-300 py-2.5 bg-sky-500/20 rounded-xl border border-sky-500/30 animate-pulse';
    statusMsg.textContent = 'ক্যাশিয়ারে নিয়ে যাওয়া হচ্ছে, অপেক্ষা করুন...';
    statusMsg.classList.remove('hidden');
  }

  const apiUrl = (window.location.hostname === 'imcagro.top' || window.location.hostname.endsWith('.imcagro.top'))
    ? 'https://imcagro.top/api/create-payment'
    : '/api/create-payment';

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        amount: amount,
        orderId: orderId,
        payType: payType,
        phone: userPhone,
        attach: userPhone
      })
    });

    const data = await res.json();
    console.log('[Recharge Page Response]', data);

    const paymentUrl = data.paymentUrl || 
                       data?.gatewayResponse?.data?.url || 
                       data?.data?.url || 
                       data?.url;

    if (data.success === true && paymentUrl) {
      if (statusMsg) {
        statusMsg.className = 'text-xs text-center font-bold text-emerald-300 py-2.5 bg-emerald-500/20 rounded-xl border border-emerald-500/40';
        statusMsg.textContent = '✅ সফল! পেমেন্ট পেজে নিয়ে যাওয়া হচ্ছে...';
      }
      window.location.href = paymentUrl;
      return;
    }

    const errMsg = data?.gatewayResponse?.msg || 
                   data?.message || 
                   data?.msg || 
                   'পেমেন্ট চ্যানেল বর্তমানে অনুপলব্ধ। অনুগ্রহ করে আবার চেষ্টা করুন।';

    if (statusMsg) {
      statusMsg.className = 'text-xs text-center font-semibold text-rose-300 py-2.5 bg-rose-500/20 rounded-xl border border-rose-500/40';
      statusMsg.textContent = 'ত্রুটি: ' + errMsg;
      statusMsg.classList.remove('hidden');
    }
  } catch (err) {
    console.error('Recharge error:', err);
    if (statusMsg) {
      statusMsg.className = 'text-xs text-center font-semibold text-rose-300 py-2.5 bg-rose-500/20 rounded-xl border border-rose-500/40';
      statusMsg.textContent = 'সার্ভার সংযোগে ত্রুটি: ' + (err.message || 'নেটওয়ার্ক এরর');
      statusMsg.classList.remove('hidden');
    }
  } finally {
    if (submitBtn) submitBtn.disabled = false;
    if (spinner) spinner.classList.add('hidden');
    if (btnText) btnText.textContent = 'জমা দিন';
  }
}
window.handleBdRechargeSubmit = handleBdRechargeSubmit;

function openDirectPaymentCheckout() {
  let user = getCurrentUser();
  if (!user || !user.phone) {
    user = {
      phone: '01700000000',
      fullName: 'সম্মানিত সদস্য',
      balance: 0.00,
      lifetime_earnings: 0.00,
      packageLevel: 'LV0',
      purchasedPackages: ['LV0'],
      country: 'BD',
      language: 'bn'
    };
    try {
      localStorage.setItem('aloSignedInUser', JSON.stringify(user));
    } catch(e) {}
    if (typeof updateUserDetails === 'function') updateUserDetails(user);
    if (typeof updateProfileMetrics === 'function') updateProfileMetrics();
  }
  showView('dashboard');
  openDashboardPanel('payment-method');
}
window.openDirectPaymentCheckout = openDirectPaymentCheckout;

window.addEventListener('alo-language-changed', function(e) {
  const lang = e.detail && e.detail.lang;
  const user = getCurrentUser();
  if (user && lang) {
    user.language = lang;
    localStorage.setItem('aloSignedInUser', JSON.stringify(user));
  }
  if (user) {
    if (typeof updateRecordsPanelPackages === 'function') updateRecordsPanelPackages();
    if (typeof updateVipHallRooms === 'function') updateVipHallRooms();
    if (typeof updateUserDetails === 'function') updateUserDetails(user);
  }
  const cModal = document.getElementById('country-picker-modal');
  if (cModal && !cModal.classList.contains('hidden')) {
    if (typeof renderCountryList === 'function') renderCountryList();
  }
});

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
