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
  return {
    phone: d.phone || d.account_number || d.accountNumber,
    accountNumber: d.account_number || d.accountNumber || d.phone,
    name: d.name || 'সদস্য',
    passwordHash: d.password_hash || d.passwordHash || '',
    plainPassword: d.plain_password || d.plainPassword || '',
    memberId: d.member_id || d.memberId || ('AL' + Date.now().toString().slice(-8)),
    inviteCode: d.invite_code || d.inviteCode || '',
    superiorId: d.superior_id || d.superiorId || '11',
    packageLevel: d.package_level || d.packageLevel || 'LV0',
    balance: typeof d.balance === 'number' ? d.balance : parseFloat(d.balance || 0) || 0,
    bkashName: d.bkash_name || d.bkashName || '',
    bkashPhone: d.bkash_phone || d.bkashPhone || '',
    bkashOptional: d.bkash_optional || d.bkashOptional || '',
    bkash: {
      fullName: d.bkash_name || d.bkashName || '',
      phone: d.bkash_phone || d.bkashPhone || '',
      room: d.bkash_optional || d.bkashOptional || ''
    },
    createdAt: d.created_at || d.createdAt || new Date().toISOString()
  };
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
        bkash_optional: (account.bkash && account.bkash.room) || account.bkashOptional || '',
        updated_at: new Date().toISOString()
      };
      if (account.createdAt) payload.created_at = account.createdAt;
      else payload.created_at = new Date().toISOString();

      const { error } = await window.aloSupabase
        .from('users')
        .upsert(payload, { onConflict: 'phone' });
      if (!error) saved = true;
      else console.warn('Supabase dbSaveUser warning:', error);
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
        bkashOptional: (account.bkash && account.bkash.room) || account.bkashOptional || '',
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
      // By invite_code
      let { data } = await window.aloSupabase
        .from('users')
        .select('*')
        .eq('invite_code', raw)
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
      const payload = {
        superior_phone: supNorm,
        member_phone: memNorm,
        member_id: memberId || ('AL' + Date.now().toString().slice(-8)),
        tier: t,
        level: level || 'LV0',
        status: 'সক্রিয়',
        balance: bal,
        recharge_amount: rech,
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

// Multi-Level Referral Chaining: Level 1 (Direct) -> Level 2 -> Level 3
async function registerTeamHierarchy(newMemberPhone, newMemberId, newMemberLevel, enteredInviteCode) {
  const normNewPhone = normalizeBdPhone(newMemberPhone);
  if (!enteredInviteCode || !normNewPhone) return;

  // 1. Resolve Level 1 Superior (Direct Referral)
  const upline1 = await dbFindInviter(enteredInviteCode);
  if (!upline1) {
    console.log('No registered upline found for invite code:', enteredInviteCode);
    return;
  }
  const upline1Phone = normalizeBdPhone(upline1.phone || upline1.accountNumber);
  if (!upline1Phone || upline1Phone === normNewPhone) return;

  // Level 1: Add to upline1's team (tier = 1)
  await dbAddTeamMember(upline1Phone, normNewPhone, newMemberId, newMemberLevel, 1);
  console.log(`[Team] Level 1 connected: ${normNewPhone} -> ${upline1Phone}`);

  // 2. Resolve Level 2 Superior (Inviter of upline1)
  const upline2Target = upline1.superiorPhone || upline1.superiorId;
  let upline2 = null;
  if (upline2Target) {
    upline2 = await dbFindInviter(upline2Target);
  }
  if (upline2) {
    const upline2Phone = normalizeBdPhone(upline2.phone || upline2.accountNumber);
    if (upline2Phone && upline2Phone !== normNewPhone && upline2Phone !== upline1Phone) {
      // Level 2: Add to upline2's team (tier = 2)
      await dbAddTeamMember(upline2Phone, normNewPhone, newMemberId, newMemberLevel, 2);
      console.log(`[Team] Level 2 connected: ${normNewPhone} -> ${upline2Phone}`);

      // 3. Resolve Level 3 Superior (Inviter of upline2)
      const upline3Target = upline2.superiorPhone || upline2.superiorId;
      let upline3 = null;
      if (upline3Target) {
        upline3 = await dbFindInviter(upline3Target);
      }
      if (upline3) {
        const upline3Phone = normalizeBdPhone(upline3.phone || upline3.accountNumber);
        if (upline3Phone && upline3Phone !== normNewPhone && upline3Phone !== upline1Phone && upline3Phone !== upline2Phone) {
          // Level 3: Add to upline3's team (tier = 3)
          await dbAddTeamMember(upline3Phone, normNewPhone, newMemberId, newMemberLevel, 3);
          console.log(`[Team] Level 3 connected: ${normNewPhone} -> ${upline3Phone}`);
        }
      }
    }
  }
}

async function dbGetTeamMembers(superiorPhone) {
  const supNorm = normalizeBdPhone(superiorPhone);
  if (!supNorm) return [];

  // Supabase
  if (window.aloSupabase) {
    try {
      const { data, error } = await window.aloSupabase
        .from('team')
        .select('*')
        .eq('superior_phone', supNorm);
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

// Comprehensive real team aggregation: Combines database, hierarchy graph, and live balances
async function dbGetRealTeam(userPhone) {
  const normPhone = normalizeBdPhone(userPhone);
  if (!normPhone) return { all: [], tier1: [], tier2: [], tier3: [] };

  const memberMap = new Map();

  // 1. Direct from team database table
  const dbRecords = await dbGetTeamMembers(normPhone);
  if (Array.isArray(dbRecords)) {
    dbRecords.forEach(function(r) {
      const p = normalizeBdPhone(r.memberPhone || r.member_phone);
      if (p && p !== normPhone) {
        memberMap.set(p, {
          rawPhone: p,
          phone: p.length >= 10 ? p.slice(0, 5) + '-***' + p.slice(-3) : p,
          memberId: r.memberId || r.member_id || ('AL' + p.slice(-6)),
          tier: Number(r.tier) || 1,
          level: r.level || 'LV0',
          status: r.status || 'সক্রিয়',
          balance: typeof r.balance === 'number' ? r.balance : parseFloat(r.balance || 0) || 0,
          rechargeAmount: typeof r.rechargeAmount === 'number' ? r.rechargeAmount : parseFloat(r.recharge_amount || 0) || 0,
          joinedAt: r.joinedAt || r.joined_at || new Date().toISOString()
        });
      }
    });
  }

  // 2. Multi-level recursive graph from accounts (Level 1 -> Level 2 -> Level 3)
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
      if (!memberMap.has(p)) {
        memberMap.set(p, {
          rawPhone: p,
          phone: p.length >= 10 ? p.slice(0, 5) + '-***' + p.slice(-3) : p,
          memberId: a.memberId || ('AL' + p.slice(-6)),
          tier: 1,
          level: a.packageLevel || 'LV0',
          status: 'সক্রিয়',
          balance: Number(a.balance) || 0,
          rechargeAmount: Number(a.rechargeAmount || 0),
          joinedAt: a.createdAt || new Date().toISOString()
        });
      }
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
      if (ap === normPhone || memberMap.has(ap)) return false;
      const sup = normalizeBdPhone(a.superiorPhone || a.superiorId);
      const code = String(a.superiorId || '').trim().toUpperCase();
      return tier1Phones.includes(sup) || (code && tier1Codes.includes(code));
    });

    tier2Accounts.forEach(function(a) {
      const p = normalizeBdPhone(a.phone || a.accountNumber);
      if (!memberMap.has(p)) {
        memberMap.set(p, {
          rawPhone: p,
          phone: p.length >= 10 ? p.slice(0, 5) + '-***' + p.slice(-3) : p,
          memberId: a.memberId || ('AL' + p.slice(-6)),
          tier: 2,
          level: a.packageLevel || 'LV0',
          status: 'সক্রিয়',
          balance: Number(a.balance) || 0,
          rechargeAmount: Number(a.rechargeAmount || 0),
          joinedAt: a.createdAt || new Date().toISOString()
        });
      }
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
      if (ap === normPhone || memberMap.has(ap)) return false;
      const sup = normalizeBdPhone(a.superiorPhone || a.superiorId);
      const code = String(a.superiorId || '').trim().toUpperCase();
      return tier2Phones.includes(sup) || (code && tier2Codes.includes(code));
    });

    tier3Accounts.forEach(function(a) {
      const p = normalizeBdPhone(a.phone || a.accountNumber);
      if (!memberMap.has(p)) {
        memberMap.set(p, {
          rawPhone: p,
          phone: p.length >= 10 ? p.slice(0, 5) + '-***' + p.slice(-3) : p,
          memberId: a.memberId || ('AL' + p.slice(-6)),
          tier: 3,
          level: a.packageLevel || 'LV0',
          status: 'সক্রিয়',
          balance: Number(a.balance) || 0,
          rechargeAmount: Number(a.rechargeAmount || 0),
          joinedAt: a.createdAt || new Date().toISOString()
        });
      }
    });
  } catch(e) {}

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
      const { error } = await window.aloSupabase.from('transactions').insert({
        phone: normPhone,
        type: tx.type, // 'deposit' or 'withdraw'
        amount: Number(tx.amount) || 0,
        ratio: tx.ratio || '50.0%',
        actual: Number(tx.actual) || 0,
        status: tx.status || 'স্থানান্তরিত',
        method: tx.method || 'বিকাশ (bKash)',
        date: tx.date,
        time: tx.time,
        created_at: new Date().toISOString()
      });
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
  records: 'সদস্য',
  tasks: 'টাস্ক',
  profile: 'আমার',
  personal: 'ব্যক্তিগত তথ্য',
  'my-pass': 'আমার পার্স',
  invite: 'বন্ধুদের আমন্ত্রণ করুন',
  'platform-tasks': 'মিশন',
  'mission-submit': 'মিশন জমা',
  'payment-method': 'Payment method',
  'team-report': 'দলের রিপোর্ট',
  'bkash-setup': 'বিকাশ সেট করুন'
};

const viewOrder = { home: 0, login: 1, register: 2, dashboard: 3 };
let viewTransitionTimer = null;
let viewsReady = false;

function showView(viewName, style) {
  const nextView = viewIds.includes(viewName) ? viewName : 'home';
  const nextEl = document.getElementById(nextView + '-view');
  const allViews = Array.from(document.querySelectorAll('.page-view'));
  const currentEl = allViews.find(function(view) { return !view.hidden; });
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const applyHidden = function() {
    allViews.forEach(function(view) { view.hidden = view.id !== nextView + '-view'; });
  };

  window.clearTimeout(viewTransitionTimer);
  allViews.forEach(function(view) {
    view.classList.remove('view-leave', 'view-enter-forward', 'view-enter-back', 'view-enter-zoom');
  });
  document.documentElement.classList.remove('is-view-transitioning');

  if (!viewsReady || !currentEl || currentEl === nextEl || reduceMotion) {
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
  if (getComputedStyle(target).position === 'static') target.style.position = 'relative';
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
  const codeElement = document.getElementById('invite-page-code');
  if (!qrContainer || !linkElement || !codeElement) return;

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('aloSignedInUser') || 'null');
  } catch (error) {
    user = null;
  }

  const inviteCode = user && user.inviteCode ? user.inviteCode : '';
  const relativeLink = '/?invite=' + encodeURIComponent(inviteCode);
  let inviteLink = relativeLink;

  if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
    try {
      const inviteUrl = new URL(window.location.href);
      inviteUrl.searchParams.set('invite', inviteCode);
      inviteLink = inviteUrl.href;
    } catch (error) {
      inviteLink = relativeLink;
    }
  }

  codeElement.textContent = inviteCode || '—';
  linkElement.href = inviteLink;
  linkElement.textContent = inviteLink;
  qrContainer.replaceChildren();

  if (window.QRCode && inviteCode) {
    new QRCode(qrContainer, {
      text: inviteLink,
      width: 208,
      height: 208,
      colorDark: getComputedStyle(document.documentElement).getPropertyValue('--color-profile-bg').trim(),
      colorLight: getComputedStyle(document.documentElement).getPropertyValue('--color-primary-contrast').trim(),
      correctLevel: QRCode.CorrectLevel.H
    });
  } else {
    qrContainer.textContent = inviteCode ? 'QR কোড তৈরি করা যায়নি।' : 'আমন্ত্রণ কোড পেতে আগে লগইন করুন।';
  }
}

function forceScrollToTop() {
  try {
    window.scrollTo(0, 0);
  } catch(e) {}
  try {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  } catch(e) {}
  if (document.documentElement) document.documentElement.scrollTop = 0;
  if (document.body) document.body.scrollTop = 0;
  const shell = document.querySelector('.dashboard-shell');
  if (shell) shell.scrollTop = 0;
  const mainEl = document.querySelector('.dashboard-shell > main');
  if (mainEl) mainEl.scrollTop = 0;
  const dView = document.getElementById('dashboard-view');
  if (dView) dView.scrollTop = 0;
}

function openDashboardPanel(panelName) {
  forceScrollToTop();
  const nextPanel = dashboardTitles[panelName] ? panelName : 'profile';
  if (nextPanel !== 'payment-method' && nextPanel !== 'team-report' && nextPanel !== 'withdraw' && nextPanel !== 'withdraw-details') {
    previousDashboardPanel = nextPanel;
  }
  document.querySelectorAll('.dashboard-panel').forEach(function(panel) {
    panel.hidden = panel.id !== nextPanel + '-panel';
  });
  const navItemMap = {
    home: 'home',
    vip: 'vip',
    'platform-tasks': 'vip',
    records: 'records',
    tasks: 'tasks',
    'mission-submit': 'tasks',
    profile: 'profile',
    personal: 'profile',
    'my-pass': 'profile',
    invite: 'profile',
    'payment-method': previousDashboardPanel || 'profile',
    'team-report': 'profile',
    'bkash-setup': 'profile'
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
  if (nextPanel === 'invite') {
    renderInvitePage();
  }
  if (nextPanel === 'profile') {
    updateProfileMetrics();
    updateBkashDisplayAcrossApp();
  }
  if (nextPanel === 'personal') {
    updateBkashDisplayAcrossApp();
  }
  if (nextPanel === 'bkash-setup') {
    renderBkashSetupPanel();
  }
  if (nextPanel === 'my-pass') {
    updateProfileMetrics();
    renderWithdrawalHistory();
    updateBkashDisplayAcrossApp();
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
  forceScrollToTop();
  requestAnimationFrame(forceScrollToTop);
  setTimeout(forceScrollToTop, 30);
  setTimeout(forceScrollToTop, 100);
}

function updateUserDetails(user) {
  if (!user) return;
  const memberId = document.getElementById('profile-member-id');
  if (memberId) memberId.textContent = user.memberId || '1105';

  const inviteCode = document.getElementById('profile-invite-code');
  if (inviteCode) inviteCode.textContent = user.inviteCode || '728207';

  const registeredPhone = user.accountNumber || user.phone || '1735235999';
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

  const superiorId = document.getElementById('profile-superior-id');
  if (superiorId) superiorId.textContent = user.superiorId || '11';

  const userName = document.getElementById('dashboard-user-name');
  if (userName) userName.textContent = user.name || 'সদস্য';

  if (typeof updateVipHallRooms === 'function') updateVipHallRooms();
  if (typeof updateRecordsPanelPackages === 'function') updateRecordsPanelPackages();
}

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

// data-view বাটনগুলো একটাই ডেলিগেটেড লিসেনারে হ্যান্ডেল হয় (আগে ডুপ্লিকেট লিসেনার ছিল)
document.addEventListener('click', function(event) {
  const button = event.target.closest('[data-view]');
  if (button && button.dataset.view) {
    showView(button.dataset.view);
  }
});

document.querySelectorAll('[data-toggle-password]').forEach(function(button) {
  button.addEventListener('click', function() {
    const field = document.getElementById(button.dataset.togglePassword);
    if (!field) return;
    const showing = field.type === 'password';
    field.type = showing ? 'text' : 'password';
    button.setAttribute('aria-label', showing ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখান');
    button.toggleAttribute('data-password-visible', showing);
  });
});

document.querySelectorAll('[data-message]').forEach(function(button) {
  button.addEventListener('click', function() {
    const msg = document.getElementById('register-message');
    if (msg) msg.textContent = button.dataset.message;
  });
});

function normalizeBdPhone(phoneStr) {
  let digits = String(phoneStr || '').replace(/\D/g, '');
  if (digits.startsWith('880')) digits = digits.slice(3);
  if (digits.startsWith('0')) digits = digits.slice(1);
  return digits;
}

const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const message = document.getElementById('login-message');
    const phoneInput = document.getElementById('login-email').value.trim();
    const normPhone = normalizeBdPhone(phoneInput);
    const password = document.getElementById('login-password').value;
    if (message) message.textContent = 'ডাটাবেজে তথ্য যাচাই করা হচ্ছে…';

    try {
      const passwordHash = await hashPassword(password);

      // 1. Check cloud database first
      let account = await dbGetUser(normPhone);

      // 2. Fallback to localStorage accounts if offline / not found in cloud
      const accounts = JSON.parse(localStorage.getItem('aloAccounts') || '[]');
      if (!account) {
        account = accounts.find(function(item) {
          return normalizeBdPhone(item.phone || item.accountNumber || item.email || '') === normPhone;
        });
      }

      // Support demo login if default demo account is entered or testing
      if (!account && (normPhone === '1735235999' || accounts.length === 0)) {
        account = {
          name: 'সদস্য',
          phone: phoneInput || '01735235999',
          accountNumber: phoneInput || '01735235999',
          memberId: '1105',
          inviteCode: '728207',
          superiorId: '11',
          packageLevel: 'LV0',
          purchasedPackages: ['LV0'],
          balance: 0.00
        };
        // Save demo account to DB as well
        dbSaveUser(account).catch(function() {});
      } else if (!account || ((account.passwordHash && account.passwordHash !== passwordHash) && (account.plainPassword && account.plainPassword !== password))) {
        if (message) message.textContent = 'ফোন নম্বর অথবা পাসওয়ার্ড সঠিক নয়।';
        return;
      }

      if (!account.memberId) account.memberId = 'AL' + Date.now().toString().slice(-8);
      if (!account.inviteCode) account.inviteCode = 'AL' + Math.random().toString(36).slice(2, 7).toUpperCase();

      const regNumber = account.accountNumber || account.phone || phoneInput;
      const signedInUser = {
        name: account.name || 'সদস্য',
        phone: regNumber,
        accountNumber: regNumber,
        memberId: account.memberId,
        inviteCode: account.inviteCode,
        superiorId: account.superiorId || '11',
        packageLevel: account.packageLevel || 'LV0',
        purchasedPackages: account.purchasedPackages || ['LV0'],
        balance: typeof account.balance === 'number' ? account.balance : 0.00,
        profileData: account.profileData || {}
      };

      // Restore bKash account if set in database
      if (account.bkashPhone) {
        const bkashData = {
          fullName: account.bkashName || '',
          phone: account.bkashPhone,
          room: account.bkashOptional || '',
          updatedAt: account.updatedAt || new Date().toISOString()
        };
        localStorage.setItem('alo_bkash_account', JSON.stringify(bkashData));
        signedInUser.bkash = bkashData;
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

      if (message) message.textContent = '';
      updateUserDetails(signedInUser);
      if (typeof updateBkashDisplayAcrossApp === 'function') updateBkashDisplayAcrossApp();
      playLoginSuccess(signedInUser.name, function() {
        openDashboardPanel('profile');
        showView('dashboard', 'zoom');
      });
    } catch (error) {
      console.error('Login error:', error);
      if (message) message.textContent = 'লগইন করা যায়নি। আবার চেষ্টা করুন।';
    }
  });
}

function showRegistrationSuccess(phone) {
  const overlay = document.createElement('div');
  overlay.className = 'login-success-overlay is-visible';
  overlay.innerHTML = `
    <div class="login-success-box">
      <svg class="login-success-ring" viewBox="0 0 110 110" aria-hidden="true">
        <circle cx="55" cy="55" r="48"></circle>
        <path d="M34 57 L49 72 L77 40"></path>
      </svg>
      <h2>নিবন্ধন সফল!</h2>
      <p>আপনার অ্যাকাউন্ট তৈরি হয়েছে (হিসাব নাম্বার: <strong>${phone}</strong>)। স্বাগতম!</p>
    </div>
  `;
  document.body.appendChild(overlay);

  window.setTimeout(function() {
    overlay.remove();
    openDashboardPanel('profile');
    showView('dashboard', 'zoom');
    showToastNotification(`🎉 স্বাগতম! আপনার অ্যাকাউন্ট (${phone}) ডাটাবেজে সফলভাবে তৈরি হয়েছে।`);
  }, 1600);
}

let demoSmsCode = '';

const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const message = document.getElementById('register-message');
    const phoneInput = document.getElementById('register-phone').value.trim();
    const cleanPhone = phoneInput.replace(/\D/g, '');
    let smsCode = document.getElementById('register-sms-code').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmation = document.getElementById('confirm-password');

    if (password !== confirmation.value) {
      confirmation.setCustomValidity('দুটি পাসওয়ার্ড মিলছে না।');
      confirmation.reportValidity();
      if (message) message.textContent = 'দুটি পাসওয়ার্ড মিলছে না।';
      return;
    }
    confirmation.setCustomValidity('');

    if (!cleanPhone || cleanPhone.length < 10) {
      if (message) message.textContent = 'সঠিক বাংলাদেশি ফোন নম্বর লিখুন (উদাঃ 017xxxxxxxx বা 17xxxxxxxx)।';
      return;
    }

    // Auto-fulfill SMS OTP if user didn't explicitly request it
    if (!smsCode) {
      demoSmsCode = String(Math.floor(100000 + Math.random() * 900000));
      const smsInput = document.getElementById('register-sms-code');
      if (smsInput) smsInput.value = demoSmsCode;
      smsCode = demoSmsCode;
    }

    if (message) message.textContent = 'ডাটাবেজে নিবন্ধন যাচাই করা হচ্ছে…';

    try {
      const registeredNumber = phoneInput;
      const normInput = normalizeBdPhone(registeredNumber);

      // Check cloud database and local accounts for duplicate phone
      const dbUser = await dbGetUser(normInput);
      const accounts = JSON.parse(localStorage.getItem('aloAccounts') || '[]');
      const localAccount = accounts.find(function(account) {
        return normalizeBdPhone(account.phone || account.accountNumber || '') === normInput;
      });

      if (dbUser || localAccount) {
        if (message) message.textContent = 'এই নম্বরে আগে থেকেই অ্যাকাউন্ট আছে। লগইন পেজে যান।';
        const loginEmail = document.getElementById('login-email');
        if (loginEmail) loginEmail.value = registeredNumber;
        setTimeout(function() { showView('login'); }, 1400);
        return;
      }

      const passwordHash = await hashPassword(password);
      const inviteCodeInput = document.getElementById('register-invite-code');
      const enteredInviteCode = inviteCodeInput ? inviteCodeInput.value.trim() : '';

      // Resolve inviter user dynamically
      let upline1 = null;
      if (enteredInviteCode) {
        upline1 = await dbFindInviter(enteredInviteCode);
      }
      const uplinePhone = upline1 ? (upline1.phone || upline1.accountNumber) : (enteredInviteCode.length >= 10 ? enteredInviteCode : '');
      const superiorId = (upline1 && (upline1.inviteCode || upline1.memberId || upline1.phone)) || enteredInviteCode || '11';

      const account = {
        name: 'সদস্য',
        phone: registeredNumber,
        accountNumber: registeredNumber,
        passwordHash: passwordHash,
        plainPassword: password,
        memberId: 'AL' + Date.now().toString().slice(-8),
        inviteCode: 'AL' + Math.random().toString(36).slice(2, 7).toUpperCase(),
        superiorId: superiorId,
        superiorPhone: uplinePhone,
        packageLevel: 'LV0',
        purchasedPackages: ['LV0'],
        balance: 0.00,
        profileData: {},
        createdAt: new Date().toISOString()
      };

      // 1. Save new account to Cloud Database
      await dbSaveUser(account);

      // 2. Record multi-level referral hierarchy (Level 1, Level 2, Level 3)
      if (enteredInviteCode || uplinePhone) {
        await registerTeamHierarchy(registeredNumber, account.memberId, 'LV0', enteredInviteCode || uplinePhone);
      }

      // 3. Save locally (dbSaveUser আগেই লোকালে সেভ করে, তাই ডুপ্লিকেট এড়াতে চেক করা হলো)
      const freshAccounts = JSON.parse(localStorage.getItem('aloAccounts') || '[]');
      const alreadySaved = freshAccounts.some(function(a) {
        return normalizeBdPhone(a.phone || a.accountNumber || '') === normInput;
      });
      if (!alreadySaved) {
        freshAccounts.push(account);
        localStorage.setItem('aloAccounts', JSON.stringify(freshAccounts));
      }

      // Set registered account as active signed in user
      const signedInUser = {
        name: account.name,
        phone: registeredNumber,
        accountNumber: registeredNumber,
        memberId: account.memberId,
        inviteCode: account.inviteCode,
        superiorId: superiorId,
        superiorPhone: uplinePhone,
        packageLevel: 'LV0',
        purchasedPackages: ['LV0'],
        balance: 0.00,
        profileData: {}
      };
      localStorage.setItem('aloSignedInUser', JSON.stringify(signedInUser));
      updateUserDetails(signedInUser);
      updateProfileMetrics();
      updateVipHallRooms();
      updateRecordsPanelPackages();

      showRegistrationSuccess(registeredNumber);
    } catch (error) {
      console.error('Register error:', error);
      if (message) message.textContent = 'অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।';
    }
  });
}

const sendSmsBtn = document.getElementById('send-sms-code');
if (sendSmsBtn) {
  sendSmsBtn.addEventListener('click', function() {
    const phoneInput = document.getElementById('register-phone');
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const message = document.getElementById('register-message');
    const cleanPhone = phone.replace(/\D/g, '');

    if (!cleanPhone || cleanPhone.length < 10) {
      if (message) message.textContent = 'যাচাইকরণ কোড পেতে সঠিক ফোন নম্বর লিখুন (উদাঃ 017xxxxxxxx)।';
      if (phoneInput) phoneInput.focus();
      return;
    }

    demoSmsCode = String(Math.floor(100000 + Math.random() * 900000));
    const smsInput = document.getElementById('register-sms-code');
    if (smsInput) smsInput.value = demoSmsCode;
    if (message) message.textContent = '✅ যাচাইকরণ কোড পাঠানো হয়েছে: ' + demoSmsCode;
  });
}

const packageTaskSettings = {
  LV0: { count: 5, reward: 20 },
  LV1: { count: 6, reward: 30 },
  LV2: { count: 12, reward: 40 },
  LV3: { count: 15, reward: 50 },
  LV4: { count: 25, reward: 60 },
  LV5: { count: 35, reward: 70 },
  LV6: { count: 25, reward: 80 }
};

const packageData = {
  LV0: { name: 'ফ্রি স্তর', price: 0, count: 5, reward: 20, dailyIncome: 100, desc: 'দৈনিক ৫টি কাজ · প্রতি কাজের আয় ২০.০০ BDT' },
  LV1: { name: 'বেসিক প্যাকেজ', price: 3500, count: 6, reward: 30, dailyIncome: 180, desc: 'দৈনিক ৬টি কাজ · প্রতি কাজের আয় ৩০.০০ BDT' },
  LV2: { name: 'স্ট্যান্ডার্ড প্যাকেজ', price: 7500, count: 12, reward: 40, dailyIncome: 480, desc: 'দৈনিক ১২টি কাজ · প্রতি কাজের আয় ৪০.০০ BDT' },
  LV3: { name: 'সিলভার প্যাকেজ', price: 36000, count: 15, reward: 50, dailyIncome: 750, desc: 'দৈনিক ১৫টি কাজ · প্রতি কাজের আয় ৫০.০০ BDT' },
  LV4: { name: 'গোল্ড প্যাকেজ', price: 84000, count: 25, reward: 60, dailyIncome: 1500, desc: 'দৈনিক ২৫টি কাজ · প্রতি কাজের আয় ৬০.০০ BDT' },
  LV5: { name: 'প্রিমিয়াম প্যাকেজ', price: 150000, count: 35, reward: 70, dailyIncome: 2450, desc: 'দৈনিক ৩৫টি কাজ · প্রতি কাজের আয় ৭০.০০ BDT' },
  LV6: { name: 'এলিট প্যাকেজ', price: 300000, count: 25, reward: 80, dailyIncome: 2000, desc: 'দৈনিক ২৫টি কাজ · প্রতি কাজের আয় ৮০.০০ BDT' }
};

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

  if (latestAccount && (latestAccount.accountNumber || latestAccount.phone)) {
    const regPhone = latestAccount.accountNumber || latestAccount.phone;
    if (user) {
      user.accountNumber = regPhone;
      user.phone = regPhone;
    }
  }

  if (!user) {
    const regPhone = latestAccount ? (latestAccount.accountNumber || latestAccount.phone || '1735235999') : '1735235999';
    return {
      name: (latestAccount && latestAccount.name) || 'সদস্য',
      phone: regPhone,
      accountNumber: regPhone,
      inviteCode: (latestAccount && latestAccount.inviteCode) || '728207',
      memberId: (latestAccount && latestAccount.memberId) || '1105',
      superiorId: '11',
      packageLevel: (latestAccount && latestAccount.packageLevel) || 'LV0',
      purchasedPackages: (latestAccount && latestAccount.purchasedPackages) || ['LV0'],
      balance: (latestAccount && typeof latestAccount.balance === 'number') ? latestAccount.balance : 0.00
    };
  }
  return user;
}

function formatBanglaNumber(num) {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, function(d) {
    return banglaDigits[parseInt(d, 10)];
  });
}

function formatMoney(amount) {
  const num = Number(amount || 0);
  const formatted = num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return formatBanglaNumber(formatted);
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
    if (isCurrent) {
      tag.className = 'hall-current-tag text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/40';
      tag.textContent = 'বর্তমান স্তর';
    } else if (isUnlocked) {
      tag.className = 'hall-status-tag text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-200';
      tag.textContent = 'আনলকড ✓';
    } else {
      tag.className = 'hall-status-tag text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 flex items-center gap-0.5';
      tag.textContent = 'ক্রয় প্রয়োজন 🔒';
    }
  });
}

function updateRecordsPanelPackages() {
  const user = getCurrentUser();
  const userLevel = user.packageLevel || 'LV0';
  const curLevelDisplay = document.getElementById('records-current-level-display');
  if (curLevelDisplay) {
    const pkgName = packageData[userLevel]?.name || 'ফ্রি স্তর';
    curLevelDisplay.textContent = `${userLevel} (${pkgName})`;
  }
  const balDisplay = document.getElementById('records-balance-display');
  if (balDisplay) {
    balDisplay.textContent = formatMoney(user.balance || 0);
  }

  const pkgCards = document.querySelectorAll('[data-record-package]');
  pkgCards.forEach(function(card) {
    const level = card.dataset.recordPackage;
    const btn = card.querySelector('[data-buy-package]');
    if (!btn) return;
    const isCurrent = (level === userLevel);
    const isPurchased = (user.purchasedPackages && user.purchasedPackages.includes(level));

    if (isCurrent) {
      btn.textContent = 'বর্তমান স্তর';
      btn.disabled = true;
      btn.className = 'package-card-btn rounded-[var(--radius-round)] px-3 py-1.5 text-xs font-bold shadow bg-slate-700/60 text-slate-300 cursor-default';
    } else if (isPurchased) {
      btn.textContent = 'ক্রয় করা হয়েছে ✓';
      btn.disabled = true;
      btn.className = 'package-card-btn rounded-[var(--radius-round)] px-3 py-1.5 text-xs font-bold shadow bg-emerald-700/60 text-emerald-200 cursor-default';
    } else {
      btn.textContent = 'প্যাকেজ ক্রয় করুন';
      btn.disabled = false;
      btn.className = 'package-card-btn rounded-[var(--radius-round)] px-3 py-1.5 text-xs font-bold shadow bg-[#1877f2] hover:bg-[#166fe5] text-white active:scale-95 cursor-pointer';
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
  }
});

function openPackagePurchaseModal(level, alertNotice) {
  if (!packageData[level] || level === 'LV0') return;
  currentPurchaseLevel = level;
  const pkg = packageData[level];
  const user = getCurrentUser();
  const userBal = Number(user.balance || 0);
  const price = pkg.price;
  const isSufficient = userBal >= price;

  const titleEl = document.getElementById('sheet-header-title');
  if (titleEl) titleEl.textContent = `${level} প্যাকেজ ক্রয় ও ব্যালেন্স`;

  const badgeEl = document.getElementById('purchase-modal-badge');
  if (badgeEl) badgeEl.textContent = `${level} · ${pkg.name}`;

  const priceEl = document.getElementById('purchase-modal-price');
  if (priceEl) priceEl.textContent = formatBanglaNumber(price.toLocaleString('en-US'));

  const detailsEl = document.getElementById('purchase-modal-details');
  if (detailsEl) detailsEl.textContent = pkg.desc;

  const userLevelEl = document.getElementById('purchase-modal-user-level');
  if (userLevelEl) {
    const userPkgName = packageData[user.packageLevel]?.name || 'ফ্রি স্তর';
    userLevelEl.textContent = `${user.packageLevel || 'LV0'} (${userPkgName})`;
  }

  const userBalEl = document.getElementById('purchase-modal-user-balance');
  if (userBalEl) userBalEl.textContent = formatMoney(userBal);

  const costEl = document.getElementById('purchase-modal-cost');
  if (costEl) costEl.textContent = formatMoney(price) + ' BDT';

  const statusBox = document.getElementById('purchase-modal-status-box');
  const confirmBtn = document.getElementById('confirm-package-purchase-btn');
  const depositBtn = document.getElementById('open-deposit-from-purchase-btn');

  if (statusBox) {
    if (isSufficient) {
      statusBox.className = 'p-3 rounded-xl text-xs leading-5 bg-[#051c4a] border border-[#34d399]/40 text-[#34d399] shadow';
      statusBox.innerHTML = `
        <div class="flex items-start gap-2">
          <span class="text-base text-[#34d399] font-bold">✓</span>
          <div>
            <p class="font-bold text-white">পর্যাপ্ত ব্যালেন্স বিদ্যমান রয়েছে</p>
            <p class="mt-0.5 text-slate-300">আপনার অ্যাকাউন্টে পর্যাপ্ত ব্যালেন্স আছে। নিচে 'ব্যালেন্স দিয়ে প্যাকেজ ক্রয় করুন' বাটনে চাপ দিয়ে এখনই প্যাকেজটি চালু করুন।</p>
          </div>
        </div>
      `;
    } else {
      const deficit = price - userBal;
      statusBox.className = 'p-3 rounded-xl text-xs leading-5 bg-[#211504] border border-amber-500/50 text-amber-200 shadow';
      statusBox.innerHTML = `
        <div class="flex items-start gap-2">
          <span class="text-base text-amber-400 font-bold">⚠️</span>
          <div>
            <p class="font-bold text-amber-300">ফ্রিতে শুধু LV0 কাজ করতে পারবেন!</p>
            <p class="mt-0.5 text-slate-300 text-[11px] leading-4">${alertNotice || `${level} প্যাকেজের কাজ করতে ব্যালেন্স দিয়ে প্যাকেজ ক্রয় করতে হবে।`}</p>
            <p class="mt-1.5 font-bold text-amber-300">আপনার আরও <strong class="text-white">${formatMoney(deficit)} BDT</strong> ব্যালেন্স রিচার্জ (জমা) করতে হবে।</p>
          </div>
        </div>
      `;
    }
  }

  if (confirmBtn) {
    if (isSufficient) {
      confirmBtn.disabled = false;
      confirmBtn.innerHTML = `<span>💎</span> <span>ব্যালেন্স দিয়ে ${level} প্যাকেজ ক্রয় করুন</span>`;
      confirmBtn.className = 'w-full py-3 rounded-xl bg-[#1264c9] hover:bg-[#1877f2] text-white text-xs font-bold transition shadow-lg cursor-pointer active:scale-95 flex items-center justify-center gap-2';
    } else {
      confirmBtn.disabled = true;
      confirmBtn.innerHTML = `<span>🔒</span> <span>ব্যালেন্স অপর্যাপ্ত (${formatMoney(price - userBal)} BDT ঘাটতি)</span>`;
      confirmBtn.className = 'w-full py-3 rounded-xl bg-[#0a1838] text-slate-400 text-xs font-bold border border-[#1b3b80] cursor-not-allowed opacity-80 flex items-center justify-center gap-2';
    }
  }

  if (depositBtn) {
    if (isSufficient) {
      depositBtn.classList.add('hidden');
    } else {
      depositBtn.classList.remove('hidden');
      depositBtn.innerHTML = `<span>⚡</span> <span>ব্যালেন্স রিচার্জ ট্যাবে যান (${formatMoney(price - userBal)} BDT ঘাটতি)</span>`;
    }
  }

  switchSheetTab('purchase');
  openActionSheet();
}

function closePackagePurchaseModal() {
  closeActionSheet();
}

function openDepositModal(initialAmount) {
  closeActionSheet();
  openDashboardPanel('payment-method');
}

function closeDepositModal() {
  closeActionSheet();
}

function confirmPackagePurchase() {
  const level = currentPurchaseLevel;
  const pkg = packageData[level];
  if (!pkg) return;
  const user = getCurrentUser();
  const userBal = Number(user.balance || 0);
  const cost = pkg.price;

  if (userBal < cost) {
    const deficit = cost - userBal;
    pendingPurchaseLevel = level;
    openDepositModal(deficit);
    return;
  }

  user.balance = Math.max(0, userBal - cost);
  user.packageLevel = level;
  if (!user.purchasedPackages) user.purchasedPackages = ['LV0'];
  if (!user.purchasedPackages.includes(level)) {
    user.purchasedPackages.push(level);
  }
  localStorage.setItem('aloSignedInUser', JSON.stringify(user));

  closeActionSheet();
  updateUserDetails(user);
  updateProfileMetrics();
  updateVipHallRooms();
  updateRecordsPanelPackages();

  showToastNotification(`🎉 অভিনন্দন! আপনার ${level} (${pkg.name}) সফলভাবে সক্রিয় হয়েছে! এখন আপনি ${level}-এর সমস্ত কাজ করতে পারবেন।`);

  renderPackageTasks(level);
  openDashboardPanel('platform-tasks');
} // ✅ FIX #1: confirmPackagePurchase-এর এই closing brace আগে ছিল না

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

  for (const rec of teamRows) {
    const tier = Number(rec.tier) || 1;
    const rate = rebateRates[tier] || 0.02;
    const commission = Math.round(amt * rate * 100) / 100;
    const supPhone = normalizeBdPhone(rec.superior_phone || rec.superiorPhone);

    if (supPhone && commission > 0) {
      const supUser = await dbGetUser(supPhone);
      if (supUser) {
        supUser.balance = (Number(supUser.balance) || 0) + commission;
        await dbSaveUser(supUser);

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

  const curBalEl = document.getElementById('deposit-current-balance');
  if (curBalEl) curBalEl.textContent = formatMoney(user.balance);

  const statusMsg = document.getElementById('deposit-status-message');
  if (statusMsg) {
    statusMsg.className = 'text-center font-bold text-xs text-[#34d399]';
    statusMsg.textContent = `✅ ${formatMoney(amount)} BDT রিচার্জ সফল হয়েছে!`;
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
      showToastNotification(`⚡ ${formatMoney(amount)} BDT রিচার্জ সফল হয়েছে! বর্তমান ব্যালেন্স: ${formatMoney(user.balance)} BDT`);
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
    return `
      <div class="grid grid-cols-5 items-center py-3.5 px-2 text-center hover:bg-[#081a4b] transition">
        <div class="text-left pl-1 font-bold font-mono text-white text-[13px]">${item.amount}</div>
        <div class="font-bold text-[13px]" style="color: #2d79f8;">${item.ratio}</div>
        <div class="font-bold font-mono text-white text-[13px]">${item.actual}</div>
        <div class="font-bold text-xs" style="color: #2d79f8;">${item.status}</div>
        <div class="text-[10.5px] text-slate-200 leading-tight font-mono">
          <div>${item.date}</div>
          <div class="mt-0.5 text-slate-400">${item.time}</div>
        </div>
      </div>
    `;
  }).join('');

  // Sync latest transactions from Firestore in the background
  const user = getCurrentUser();
  if (user && (user.phone || user.accountNumber)) {
    dbGetTransactions(user.phone || user.accountNumber, 'withdraw').then(function(dbList) {
      if (dbList && dbList.length > 0) {
        const merged = [].concat(history);
        let updated = false;
        dbList.forEach(function(tx) {
          const exists = merged.some(function(m) {
            return m.date === tx.date && m.time === tx.time && Math.abs(parseFloat(m.amount) - tx.amount) < 0.01;
          });
          if (!exists) {
            merged.unshift({
              amount: Number(tx.amount).toFixed(2),
              ratio: tx.ratio || '50.0%',
              actual: Number(tx.actual).toFixed(2),
              status: tx.status || 'স্থানান্তরিত',
              date: tx.date,
              time: tx.time
            });
            updated = true;
          }
        });
        if (updated) {
          saveWithdrawalHistory(merged);
          container.innerHTML = merged.map(function(item) {
            return `
              <div class="grid grid-cols-5 items-center py-3.5 px-2 text-center hover:bg-[#081a4b] transition">
                <div class="text-left pl-1 font-bold font-mono text-white text-[13px]">${item.amount}</div>
                <div class="font-bold text-[13px]" style="color: #2d79f8;">${item.ratio}</div>
                <div class="font-bold font-mono text-white text-[13px]">${item.actual}</div>
                <div class="font-bold text-xs" style="color: #2d79f8;">${item.status}</div>
                <div class="text-[10.5px] text-slate-200 leading-tight font-mono">
                  <div>${item.date}</div>
                  <div class="mt-0.5 text-slate-400">${item.time}</div>
                </div>
              </div>
            `;
          }).join('');
        }
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

let pendingPickerMethod = 'BKASH';
let pendingPickerDisplay = 'বিকাশ সেট নেই';

function openMethodPicker() {
  const picker = document.getElementById('withdraw-method-picker-modal');
  if (picker) {
    picker.style.display = 'flex';
    picker.removeAttribute('hidden');
    updatePickerOptionHighlight();
  }
}

function updatePickerOptionHighlight() {
  document.querySelectorAll('.withdraw-picker-option').forEach(function(opt) {
    if (opt.dataset.methodKey === pendingPickerMethod) {
      opt.className = 'withdraw-picker-option py-2 px-5 rounded-xl text-[14.5px] transition cursor-pointer text-white font-bold bg-[#0d2358]/80 ring-1 ring-[#38bdf8]/40 shadow-sm text-center';
    } else {
      opt.className = 'withdraw-picker-option py-2 px-5 rounded-xl text-[14.5px] transition cursor-pointer text-slate-300 font-medium hover:text-white text-center';
    }
  });
}

function closeMethodPicker() {
  const picker = document.getElementById('withdraw-method-picker-modal');
  if (picker) {
    picker.style.display = 'none';
    picker.setAttribute('hidden', '');
  }
}

// ✅ FIX #3: আগে এই ফাংশনটা কোথাও ডিফাইন করা ছিল না
function updateWithdrawCalculations() {
  const input = document.getElementById('withdraw-amount-input');
  if (!input) return;
  const amt = parseFloat(input.value) || 0;
  const actualEl = document.getElementById('withdraw-actual-amount');
  if (actualEl) actualEl.textContent = (amt * 0.5).toFixed(2);
}

// ==========================================
// BKASH ACCOUNT SETTINGS ("বিকাশ সেট করুন")
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

  // 2. Withdrawal sheet selected method label
  const withdrawLabel = document.getElementById('withdraw-selected-method-label');
  if (withdrawLabel) {
    if (bkash && bkash.phone) {
      withdrawLabel.textContent = `বিকাশ (${bkash.phone})`;
      withdrawLabel.className = 'text-[#38bdf8] font-bold font-mono';
    } else {
      withdrawLabel.textContent = 'বিকাশ সেট নেই';
      withdrawLabel.className = 'text-white font-semibold';
    }
  }

  // 3. Method picker options
  const bkashPickerOpt = document.querySelector('.withdraw-picker-option[data-method-key="BKASH"]');
  if (bkashPickerOpt) {
    if (bkash && bkash.phone) {
      bkashPickerOpt.textContent = `বিকাশ: ${bkash.phone}`;
      bkashPickerOpt.dataset.displayText = `বিকাশ (${bkash.phone})`;
    } else {
      bkashPickerOpt.textContent = 'বিকাশ সেট নেই';
      bkashPickerOpt.dataset.displayText = 'বিকাশ সেট নেই';
    }
  }

  // 4. Bkash setup panel status pill
  const setupPill = document.getElementById('bkash-setup-status-pill');
  if (setupPill) {
    if (bkash && bkash.phone) {
      setupPill.textContent = '✓ বিকাশ সেট করা আছে';
      setupPill.className = 'px-2.5 py-1 rounded-full text-[11px] font-bold border border-emerald-500/40 bg-emerald-500/20 text-emerald-400';
    } else {
      setupPill.textContent = 'বিকাশ সেট নেই';
      setupPill.className = 'px-2.5 py-1 rounded-full text-[11px] font-bold border border-amber-500/40 bg-amber-500/20 text-amber-400';
    }
  }
}

function renderBkashSetupPanel() {
  const bkash = getSavedBkashAccount();
  const nameInput = document.getElementById('bkash-fullname-input');
  const phoneInput = document.getElementById('bkash-phone-input');
  const roomInput = document.getElementById('bkash-room-input');
  const submitBtn = document.getElementById('bkash-set-submit-btn');

  if (bkash) {
    if (nameInput) nameInput.value = bkash.fullName || '';
    if (phoneInput) phoneInput.value = bkash.phone || '';
    if (roomInput) roomInput.value = bkash.room || '';
    if (submitBtn) {
      const span = submitBtn.querySelector('span');
      if (span) span.textContent = 'তথ্য আপডেট করুন';
    }
  } else {
    const user = getCurrentUser();
    if (nameInput) nameInput.value = (user && user.name && user.name !== 'সদস্য') ? user.name : '';
    if (phoneInput) phoneInput.value = (user && user.phone) ? user.phone : '';
    if (roomInput) roomInput.value = '';
    if (submitBtn) {
      const span = submitBtn.querySelector('span');
      if (span) span.textContent = 'বিকাশ সেট করুন';
    }
  }
  updateBkashDisplayAcrossApp();
}

function saveBkashAccountDetails() {
  const nameInput = document.getElementById('bkash-fullname-input');
  const phoneInput = document.getElementById('bkash-phone-input');
  const roomInput = document.getElementById('bkash-room-input');

  const fullName = nameInput ? nameInput.value.trim() : '';
  const phone = phoneInput ? phoneInput.value.trim() : '';
  const room = roomInput ? roomInput.value.trim() : '';

  if (!fullName) {
    showToastNotification('⚠️ অনুগ্রহ করে সম্পুর্ন নাম লিখুন');
    if (nameInput) nameInput.focus();
    return;
  }

  if (!phone) {
    showToastNotification('⚠️ অনুগ্রহ করে মোবাইল ব্যাংক নাম্বার লিখুন');
    if (phoneInput) phoneInput.focus();
    return;
  }

  const cleanDigits = phone.replace(/\D/g, '');
  if (cleanDigits.length < 10 || cleanDigits.length > 14) {
    showToastNotification('⚠️ সঠিক বিকাশ মোবাইল ব্যাংক নম্বর লিখুন');
    if (phoneInput) phoneInput.focus();
    return;
  }

  const bkashData = {
    fullName: fullName,
    phone: phone,
    room: room,
    updatedAt: new Date().toISOString()
  };

  localStorage.setItem('alo_bkash_account', JSON.stringify(bkashData));

  // Sync with current signed in user and Firestore Cloud Database
  const user = getCurrentUser();
  if (user) {
    user.bkash = bkashData;
    localStorage.setItem('aloSignedInUser', JSON.stringify(user));
    dbSaveUser(user);
  }

  updateBkashDisplayAcrossApp();
  showToastNotification('🎉 বিকাশ সফলভাবে সেট করা হয়েছে!');

  setTimeout(function() {
    if (previousDashboardPanel === 'my-pass') {
      openDashboardPanel('my-pass');
      openWithdrawSheet();
    } else {
      openDashboardPanel('personal');
    }
  }, 450);
}

function getAvailableBalance() {
  const custom = localStorage.getItem('my_pass_available_bal');
  if (custom !== null) return Number(custom);
  const user = getCurrentUser();
  return Number((user && user.balance) || 0);
}

const platformTaskDescriptions = {
  TikTok: [
    'TikTok ভিডিও লাইক করুন ও সুন্দর মন্তব্য করুন',
    'নতুন ট্রেন্ডিং ভিডিও সম্পূর্ণ দেখে লাইক দিন',
    'অফিশিয়াল ক্রিয়েটর অ্যাকাউন্ট ফলো করুন',
    'ক্রিয়েটরের প্রোফাইল ভিজিট করে ৩টি ভিডিওতে লাইক দিন',
    'ভিডিওটি বন্ধুদের সাথে শেয়ার করুন এবং বুকমার্ক করুন',
    'সাউন্ডট্র্যাক ব্যবহার করে ফেভারিটে যুক্ত করুন',
    'লাইভ স্ট্রিম ১৫ সেকেন্ড দেখুন ও লাইক দিন',
    'শিক্ষামূলক শর্ট ভিডিওতে লাইক ও কমেন্ট দিন',
    'ব্র্যান্ড চ্যানেলে ফলো দিন ও ভিডিও দেখুন',
    'ভাইরাল ক্লিপে লাভ রিয়্যাক্ট দিন',
    'হ্যাশট্যাগ চ্যালেঞ্জ ভিডিও দেখুন ও লাইক দিন',
    'টেক রিভিউ ভিডিওতে লাইক ও শেয়ার দিন',
    'রন্ধনশিল্প ও কুকিং ভিডিওতে লাইক দিন',
    'ট্রাভেল ভ্লগ ভিডিও দেখুন ও কমেন্ট করুন',
    'ফিটনেস ও স্বাস্থ্য টিপস ভিডিও সেভ করুন',
    'সঙ্গীত ভিডিও সম্পূর্ণ শুনে লাইক দিন',
    'ফ্যাশন ট্রেন্ড শর্টসে লাভ রিয়্যাক্ট দিন',
    'কমেডি ক্লিপ সম্পূর্ণ দেখে লাইক দিন',
    'মোটিভেশনাল ভিডিওতে লাইক ও শেয়ার দিন',
    'লাইফস্টাইল ভ্লগ অ্যাকাউন্ট ফলো করুন',
    'অ্যানিমেশন ক্লিপে লাভ রিয়্যাক্ট দিন',
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
  YouTube: [
    'YouTube চ্যানেলটি সাবস্ক্রাইব করুন ও বেল আইকন চাপুন',
    'ভিডিওটি সম্পূর্ণ দেখে লাইক দিন',
    'ভিডিওতে ইতিবাচক ও গঠনমূলক মন্তব্য করুন',
    'প্লেলিস্টের একটি ভিডিও লাইক ও সেভ করুন',
    'শর্টস ভিডিওতে লাইক দিয়ে চ্যানেল সাবস্ক্রাইব করুন',
    'টেক রিভিউ ভিডিও সম্পূর্ণ দেখুন ও লাইক দিন',
    'শিক্ষামূলক টিউটোরিয়াল ভিডিওতে লাইক দিন',
    'অফিসিয়াল মিউজিক ভিডিও দেখুন ও কমেন্ট করুন',
    'ট্রাভেল ডকুমেন্টারি ভিডিওতে লাইক দিন',
    'কুকিং রেসিপি ভিডিওটি পরে দেখার তালিকায় রাখুন',
    'ফিটনেস ওয়ার্কআউট ভিডিওতে লাইক দিন',
    'নিউজ ও কারেন্ট অ্যাফেয়ার্স ভিডিও দেখুন',
    'মোটিভেশনাল স্পিচ ভিডিওতে লাইক ও শেয়ার দিন',
    'পডকাস্টের একটি পর্বে লাইক ও কমেন্ট করুন',
    'গেমিং লাইভস্ট্রিম ভিডিও ৫ মিনিট দেখুন',
    'বিজ্ঞান ও প্রযুক্তির ভিডিওতে লাইক দিন',
    'নতুন সিনেমার ট্রেলার সম্পূর্ণ দেখুন',
    'বুক সামারি ভিডিওতে সুন্দর কমেন্ট করুন',
    'ক্যারিয়ার গাইডলাইন ভিডিও লাইক দিন',
    'ভাষা শিক্ষা টিউটোরিয়াল ভিডিও সেভ করুন',
    'ড্রয়িং ও স্কেচ টিউটোরিয়াল ভিডিও দেখুন',
    'অটোমোবাইল ও বাইক রিভিউ ভিডিওতে লাইক দিন',
    'ইতিহাস ও ঐতিহ্য বিষয়ক ভিডিও সম্পূর্ণ দেখুন',
    'লাইফ হ্যাকস ভিডিওতে লাইক ও শেয়ার দিন',
    'ইসলামিক আলোচনা ও মোনাজাত ভিডিও লাইক দিন',
    'ফিন্যান্স ও ইনভেস্টমেন্ট ভিডিও সম্পূর্ণ দেখুন',
    'স্মার্টফোন রিভিউ ভিডিওতে মন্তব্য করুন',
    'ফটোগ্রাফি মাস্টারক্লাস ভিডিও সেভ করুন',
    'নাটক ও কমেডি ভিডিওতে লাইক দিন',
    'আর্কিটেকচার ও হোম ডিজাইন ভিডিও দেখুন'
  ],
  FaceBook: [
    'FaceBook অফিসিয়াল পেজে লাইক ও ফলো করুন',
    'সাম্প্রতিক পোস্টে লাইক ও শেয়ার করুন',
    'অফিসিয়াল গ্রুপে যুক্ত হন ও পোস্ট দেখুন',
    'ফেসবুক রিলস ভিডিওতে লাভ রিয়্যাক্ট দিন',
    'ব্যবসায়িক পেজে ইতিবাচক রিভিউ দিন',
    'শিক্ষামূলক পোস্টে লাইক ও মন্তব্য দিন',
    'লাইভ সেশনে যুক্ত হয়ে লাভ রিয়্যাক্ট দিন',
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
    'ক্যারিয়ার টিপস পোস্টে লাইক দিন',
    'ডিজিটাল আর্ট পোস্টে লাভ রিয়্যাক্ট দিন',
    'বই রিভিউ পোস্টে কমেন্ট করুন',
    'ভিডিও কন্টেন্টে ৩ মিনিট ওয়াচটাইম দিন',
    'পডকাস্ট লাইভ স্ট্রিমে লাইক দিন',
    'অফার ও ডিসকাউন্ট পোস্টে লাইক দিন',
    'মোবাইল টিপস পোস্টে লাইক দিন',
    'কমেডি স্কিটে হাসির রিয়্যাক্ট দিন',
    'নতুন উদ্যোগের পেজে শুভেচ্ছা কমেন্ট করুন'
  ]
};

let acceptedPlatformTasks = 0;
let activePackageLevel = 'LV0';
let activePlatform = 'TikTok';
let activeMissionFilter = 'active';
let activeSubmissionId = '';
let activeSubmissionImage = '';

function readAcceptedMissions() {
  try {
    const missions = JSON.parse(localStorage.getItem('aloAcceptedMissions') || '[]');
    return Array.isArray(missions) ? missions : [];
  } catch (error) {
    return [];
  }
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

  // Calculation initialized to 0.00 as requested: "ক্যালকুলেশন ০০ করো"
  let currentUser = null;
  try {
    currentUser = JSON.parse(localStorage.getItem('aloSignedInUser') || 'null');
  } catch (e) {}

  const currentBal = currentUser && typeof currentUser.balance === 'number'
    ? currentUser.balance
    : 0;

  const todayVal = dynamicToday.toFixed(2);
  const yesterdayVal = dynamicYesterday.toFixed(2);
  const weeklyVal = dynamicWeekly.toFixed(2);
  const monthlyVal = dynamicMonthly.toFixed(2);
  const lastMonthVal = '0.00';
  const totalRevenueVal = (Number(currentBal) + dynamicToday).toFixed(2);
  const personalBalanceVal = Number(currentBal).toFixed(2);
  const balanceText = Number(currentBal).toFixed(2);

  setText('today-earnings-value', todayVal);
  setText('yesterday-earnings-value', yesterdayVal);
  setText('weekly-earnings-value', weeklyVal);
  setText('monthly-earnings-value', monthlyVal);
  setText('last-month-earnings-value', lastMonthVal);
  setText('total-revenue-value', totalRevenueVal);
  setText('personal-earnings-value', personalBalanceVal);

  setText('profile-balance-value', balanceText);
  setText('profile-usdt-value', '0.000');
  setText('total-balance-value', balanceText);
  const user = getCurrentUser();
  const availBal = getAvailableBalance();
  const frozenVal = 0.00;
  setText('my-pass-balance-value', (frozenVal + availBal).toFixed(2));
  setText('my-pass-frozen-value', frozenVal.toFixed(2));
  setText('my-pass-available-value', availBal.toFixed(2));
  renderWithdrawalHistory();

  // Completed missions count & remaining
  const completedTodayCount = completedMissions.filter(function(m) {
    const d = getCompletedAt(m);
    return d && d >= startOfToday;
  }).length;

  const remainingCount = missions.filter(function(m) {
    return m.status === 'active' || m.status === 'review';
  }).length;

  setText('completed-tasks-value', String(completedTodayCount));
  setText('remaining-tasks-value', String(remainingCount));
}

function saveAcceptedMission(serverMission) {
  const missions = readAcceptedMissions();
  missions.unshift({
    id: serverMission.id,
    taskIndex: serverMission.taskIndex,
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
  localStorage.setItem('aloAcceptedMissions', JSON.stringify(missions));
  renderMissionRecords(activeMissionFilter);
}

function refreshDailyMissionLimit(level) {
  const message = document.getElementById('platform-task-message');
  const platformTaskList = document.getElementById('platform-task-list');
  const title = document.getElementById('platform-task-level-title');
  const note = document.getElementById('platform-task-level-note');
  
  const user = getCurrentUser();
  const isUnlocked = isLevelUnlocked(level, user);
  const today = new Date().toDateString();
  const missions = readAcceptedMissions();
  const acceptedToday = missions.filter(function(m) {
    return m.level === level && new Date(m.acceptedAt).toDateString() === today;
  });
  
  const quotaLimit = packageTaskSettings[level]?.count || 5;
  const currentCount = acceptedToday.length;
  const reached = currentCount >= quotaLimit;

  if (title) {
    if (!isUnlocked) {
      title.innerHTML = `${activePlatform} · <strong style="color: var(--color-warning);">${level} 🔒 (লকড)</strong>`;
    } else {
      title.innerHTML = `${activePlatform} · <strong style="color: var(--color-primary-contrast);">${level}</strong> (দৈনিক কোটা: ${quotaLimit}টি)`;
    }
  }
  if (note) {
    if (!isUnlocked) {
      note.innerHTML = `
        <div class="rounded-xl p-3 bg-amber-950/80 border border-amber-500/50 text-amber-200 text-xs shadow-md">
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="font-bold text-white flex items-center gap-1.5"><span class="text-base text-amber-400">🔒</span> এই প্যাকেজটি আনলক করা নেই</p>
              <p class="text-[11px] text-amber-200/90 mt-1">ফ্রিতে শুধু LV0 কাজ করতে পারবেন। ${level}-এর কাজ করতে আপনার ব্যালেন্স দিয়ে প্যাকেজ ক্রয় করতে হবে।</p>
            </div>
            <button type="button" class="shrink-0 px-3.5 py-1.5 rounded-lg bg-[#1877f2] hover:bg-[#166fe5] text-white font-bold text-xs shadow transition active:scale-95 cursor-pointer" data-buy-package="${level}">
              প্যাকেজ ক্রয়
            </button>
          </div>
        </div>
      `;
    } else {
      const remaining = Math.max(0, quotaLimit - currentCount);
      note.innerHTML = `
        <div class="flex items-center justify-between text-xs mt-1" style="color: var(--color-profile-text);">
          <span>দৈনিক কাজের কোটা: <strong>${quotaLimit}টি</strong></span>
          <span class="font-bold" style="color: ${reached ? 'var(--color-warning)' : 'var(--color-profile-cyan)'};">
            গৃহীত: ${currentCount}/${quotaLimit} ${reached ? '(সীমা পূর্ণ)' : `(বাকি ${remaining}টি)`}
          </span>
        </div>
        <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.12); border-radius: 9999px; margin-top: 6px; overflow: hidden;">
          <div style="width: ${Math.min(100, (currentCount / quotaLimit) * 100)}%; height: 100%; background: ${reached ? 'var(--color-warning)' : 'var(--color-profile-cyan)'}; transition: width 300ms ease;"></div>
        </div>
        <p style="font-size: 11px; color: var(--color-muted); margin-top: 6px;">
          প্রতি কাজে ${packageTaskSettings[level]?.reward || 20}.০০ BDT · প্যাকেজে মোট ২৫টি উপলব্ধ কাজের তালিকা
        </p>
      `;
    }
  }

  if (platformTaskList) {
    const rows = platformTaskList.querySelectorAll('.platform-task-row');
    rows.forEach(function(row) {
      const btn = row.querySelector('[data-platform-accept]');
      if (!btn) return;
      const taskIdx = parseInt(row.dataset.taskIndex || '-1', 10);
      const isTaskAccepted = missions.some(function(m) {
        return m.platform === activePlatform && m.level === level && m.taskIndex === taskIdx && new Date(m.acceptedAt).toDateString() === today;
      });

      if (!isUnlocked) {
        btn.textContent = 'লকড 🔒';
        btn.disabled = false;
        btn.className = 'platform-task-accept bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30';
        btn.dataset.lockedLevel = level;
      } else if (isTaskAccepted) {
        btn.textContent = 'গৃহীত';
        btn.disabled = true;
        btn.dataset.accepted = 'true';
        btn.removeAttribute('data-limit-reached');
      } else if (reached) {
        btn.textContent = 'সীমা পূর্ণ';
        btn.disabled = true;
        btn.dataset.limitReached = 'true';
        btn.removeAttribute('data-accepted');
      } else {
        btn.textContent = 'গ্রহণ';
        btn.disabled = false;
        btn.removeAttribute('data-limit-reached');
        btn.removeAttribute('data-accepted');
      }
    });
  }

  if (message) {
    if (!isUnlocked) {
      message.innerHTML = `<span style="color: var(--color-warning); font-weight: bold;">⚠️ ফ্রিতে শুধু LV0 কাজ করতে পারবেন। ${level}-এর কাজ করতে ব্যালেন্স দিয়ে প্যাকেজ ক্রয় করতে হবে।</span>`;
    } else if (reached) {
      message.innerHTML = `<span style="color: var(--color-warning); font-weight: bold;">⚠️ আজকের ${level} প্যাকেজের ${quotaLimit}টি কাজের সীমা পূর্ণ হয়েছে!</span> <br><small style="color: var(--color-muted);">টাস্ক মেনুতে গিয়ে কাজ জমা দিন। আগামীকাল আবার নতুন কোটা চালু হবে।</small>`;
    } else {
      message.innerHTML = `আজকের বাকি কাজ: <strong style="color: var(--color-profile-cyan);">${quotaLimit - currentCount}টি</strong> (মোট কোটা ${quotaLimit}টি)`;
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
  const activeCount = document.getElementById('mission-active-count');
  if (activeCount) activeCount.textContent = '(' + counts.active + ')';
  const reviewCount = document.getElementById('mission-review-count');
  if (reviewCount) reviewCount.textContent = '(' + counts.review + ')';
  const completeCount = document.getElementById('mission-complete-count');
  if (completeCount) completeCount.textContent = '(' + counts.complete + ')';
  const failedCount = document.getElementById('mission-failed-count');
  if (failedCount) failedCount.textContent = '(' + counts.failed + ')';

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
    let emptyMsg = 'এই তালিকায় এখনো কোনো কাজ নেই।';
    let subMsg = 'মিশন হল থেকে কাজ গ্রহণ করলে এখানে দেখা যাবে।';
    if (activeMissionFilter === 'review') {
      emptyMsg = 'বর্তমানে কোনো কাজ পর্যালোচনাধীন নেই।';
      subMsg = 'চলমান কাজ জমা দিলে ৫-১০ মিনিট পর্যালোচনায় থাকবে।';
    } else if (activeMissionFilter === 'complete') {
      emptyMsg = 'এখনো কোনো কাজ সম্পূর্ণ হয়নি।';
      subMsg = 'পর্যালোচনা শেষ হলে কাজগুলো এখানে সম্পন্ন হিসেবে দেখা যাবে।';
    }
    empty.innerHTML = `<span class="text-3xl" aria-hidden="true">▤</span><p class="mt-3 text-sm font-semibold">${emptyMsg}</p><p class="mt-2 text-xs" style="color: var(--color-muted);">${subMsg}</p>`;
    list.appendChild(empty);
    return;
  }

  const now = Date.now();

  visibleMissions.forEach(function(mission) {
    const card = document.createElement('article');
    card.className = 'mission-record-card rounded-[var(--radius)] p-4 space-y-3';
    card.style.background = 'var(--color-profile-card)';
    card.style.border = '1px solid var(--color-profile-border)';

    const acceptedDate = new Date(mission.acceptedAt || Date.now());
    const dateText = Number.isNaN(acceptedDate.getTime())
      ? '—'
      : acceptedDate.getFullYear() + '-' + String(acceptedDate.getMonth() + 1).padStart(2, '0') + '-' + String(acceptedDate.getDate()).padStart(2, '0') + ' ' + String(acceptedDate.getHours()).padStart(2, '0') + ':' + String(acceptedDate.getMinutes()).padStart(2, '0');

    let actionsHtml = '';

    if (mission.status === 'active') {
      actionsHtml = `
        <div class="mission-record-actions flex items-center justify-between gap-2 pt-2 border-t" style="border-color: var(--color-profile-border);">
          <span class="text-xs px-2.5 py-1 rounded" style="background: rgba(37, 244, 238, 0.1); color: var(--color-profile-cyan);">চলমান</span>
          <div class="flex gap-2">
            <button type="button" class="mission-cancel-button px-3 py-1.5 rounded text-xs font-semibold" style="border: 1px solid var(--color-profile-border); color: var(--color-muted);" data-cancel-mission>বাতিল করুন</button>
            <button type="button" class="mission-submit-button px-4 py-1.5 rounded text-xs font-bold" style="background: var(--color-profile-cyan); color: #000;" data-open-submission>জমা দিন →</button>
          </div>
        </div>
      `;
    } else if (mission.status === 'review') {
      const endsAt = mission.reviewEndsAt || (new Date(mission.submittedAt || Date.now()).getTime() + 5 * 60 * 1000);
      const remainingSec = Math.max(0, Math.ceil((endsAt - now) / 1000));
      const mins = Math.floor(remainingSec / 60);
      const secs = remainingSec % 60;
      const timeStr = String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');

      actionsHtml = `
        <div class="mission-card-review-bar mt-2 pt-2.5 border-t flex flex-wrap items-center justify-between gap-2" style="border-color: var(--color-profile-border);">
          <div class="flex items-center gap-2 text-xs font-semibold" style="color: #fbbf24;">
            <span class="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span>পর্যালোচনাধীন: বাকি <span class="review-timer-text font-mono font-bold" data-review-ends="${endsAt}">${timeStr}</span> মিনিট</span>
          </div>
          <button type="button" class="fast-approve-btn text-[11px] font-bold px-2.5 py-1 rounded transition cursor-pointer hover:opacity-90 active:scale-95" data-fast-approve="${mission.id}" style="background: rgba(37, 244, 238, 0.15); color: var(--color-profile-cyan); border: 1px solid rgba(37, 244, 238, 0.35);" title="পরীক্ষার জন্য এখনই সম্পন্ন করুন">
            অনুমোদন সম্পন্ন করুন ⚡
          </button>
        </div>
      `;
    } else if (mission.status === 'complete') {
      const compDate = new Date(mission.completedAt || Date.now());
      const compDateText = compDate.getFullYear() + '-' + String(compDate.getMonth() + 1).padStart(2, '0') + '-' + String(compDate.getDate()).padStart(2, '0') + ' ' + String(compDate.getHours()).padStart(2, '0') + ':' + String(compDate.getMinutes()).padStart(2, '0');

      actionsHtml = `
        <div class="mission-card-complete-bar mt-2 pt-2.5 border-t flex items-center justify-between text-xs" style="border-color: var(--color-profile-border);">
          <span class="font-bold flex items-center gap-1.5" style="color: #34d399;">
            <span>✓</span> পর্যালোচনা সফল — পুরস্কার ব্যালেন্সে জমা হয়েছে
          </span>
          <span class="font-bold" style="color: var(--color-profile-cyan);">+${mission.reward}.০০ BDT</span>
        </div>
        <p class="text-[11px]" style="color: var(--color-muted);">সম্পন্নের সময়: ${compDateText}</p>
      `;
    }

    card.innerHTML = `
      <div class="mission-card-top flex items-center justify-between gap-3">
        <div class="flex min-w-0 items-center gap-2.5">
          <span class="mission-record-icon flex shrink-0 items-center justify-center">${getPlatformSvg(mission.platform, "h-6 w-6")}</span>
          <div>
            <h3 class="mission-platform-name truncate font-bold text-sm">${mission.platform}</h3>
            <span class="text-[11px] px-1.5 py-0.5 rounded font-semibold" style="background: rgba(255,255,255,0.08); color: var(--color-muted);">${mission.level || 'LV0'}</span>
          </div>
        </div>
        <div class="text-right">
          <p class="text-[11px]" style="color: var(--color-muted);">পুরস্কার</p>
          <p class="mission-reward font-bold text-base" style="color: var(--color-profile-cyan);">${mission.reward}.০০ BDT</p>
        </div>
      </div>
      <div class="mission-card-details text-xs leading-5" style="color: var(--color-profile-text);">
        <p>কাজ: <span class="font-medium">${mission.description}</span></p>
        <p>গ্রহণের সময়: <span style="color: var(--color-muted);">${dateText}</span></p>
        ${mission.screenshot ? `
        <div class="mt-1.5 flex items-center justify-between gap-2 pt-1 border-t" style="border-color: rgba(255,255,255,0.06);">
          <span class="text-[11px] text-slate-400">জমা দেওয়া প্রমাণ:</span>
          <button type="button" class="view-task-screenshot-btn flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0e2a66] border border-[#1b3e85] text-xs font-bold text-[#38bdf8] hover:bg-[#133785] transition cursor-pointer active:scale-95" data-task-screenshot="${mission.id}">
            <span>🖼️</span> <span>প্রিভিউ দেখুন 🔍</span>
          </button>
        </div>` : ''}
      </div>
      ${actionsHtml}
    `;
    card.dataset.missionId = mission.id;
    list.appendChild(card);
  });
}

function renderPackageTasks(level) {
  const platformTaskList = document.getElementById('platform-task-list');
  if (!platformTaskList) return;

  activePackageLevel = packageTaskSettings[level] ? level : 'LV0';
  const user = getCurrentUser();
  const isUnlocked = isLevelUnlocked(activePackageLevel, user);
  const settings = packageTaskSettings[activePackageLevel];
  const descriptions = platformTaskDescriptions[activePlatform] || platformTaskDescriptions.TikTok;

  const today = new Date().toDateString();
  const missions = readAcceptedMissions();
  const acceptedToday = missions.filter(function(m) {
    return m.level === activePackageLevel && new Date(m.acceptedAt).toDateString() === today;
  });
  const quotaLimit = settings.count;
  const isLimitReached = acceptedToday.length >= quotaLimit;

  const TOTAL_TASKS_TO_DISPLAY = 25; // 25-30 tasks per package according to function
  const rows = [];

  if (!isUnlocked) {
    const banner = document.createElement('div');
    banner.className = 'mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-[#0c2364] to-[#071b50] border-2 border-[#35c6e7]/60 text-white text-xs shadow-xl flex items-center justify-between gap-3 glow-pulse-cyan';
    banner.innerHTML = `
      <div class="min-w-0 flex-1">
        <p class="font-bold text-[#35c6e7] flex items-center gap-1.5"><span class="text-base">🔒</span> প্যাকেজ ক্রয় প্রয়োজন</p>
        <p class="mt-1 text-[11px] text-slate-200 leading-4">ফ্রিতে শুধু LV0 কাজ করতে পারবেন। ${activePackageLevel}-এর কাজ করতে আপনার ব্যালেন্স দিয়ে প্যাকেজ ক্রয় করতে হবে।</p>
      </div>
      <button type="button" class="shrink-0 px-3.5 py-2 rounded-xl bg-[#1264c9] hover:bg-[#1877f2] text-white font-bold text-xs shadow-lg transition active:scale-95 cursor-pointer flex items-center gap-1" data-buy-package="${activePackageLevel}">
        <span>💎</span> <span>প্যাকেজ ক্রয়</span>
      </button>
    `;
    rows.push(banner);
  }

  for (let i = 0; i < TOTAL_TASKS_TO_DISPLAY; i++) {
    const isThisAccepted = missions.some(function(m) {
      return m.platform === activePlatform && m.level === activePackageLevel && m.taskIndex === i && new Date(m.acceptedAt).toDateString() === today;
    });

    let btnText = 'গ্রহণ';
    let btnDisabled = false;
    let extraAttr = '';
    let btnClass = 'platform-task-accept';

    if (!isUnlocked) {
      btnText = 'লকড 🔒';
      btnDisabled = false;
      extraAttr = `data-locked-level="${activePackageLevel}"`;
      btnClass = 'platform-task-accept bg-[#0c2364] text-[#35c6e7] border border-[#35c6e7]/40 hover:bg-[#1264c9] hover:text-white transition';
    } else if (isThisAccepted) {
      btnText = 'গৃহীত';
      btnDisabled = true;
      extraAttr = 'data-accepted="true"';
    } else if (isLimitReached) {
      btnText = 'সীমা পূর্ণ';
      btnDisabled = true;
      extraAttr = 'data-limit-reached="true"';
    }

    const row = document.createElement('article');
    row.className = 'platform-task-row flex items-start gap-3 py-5';
    row.dataset.taskIndex = String(i);
    row.innerHTML = `
      <span class="platform-task-icon flex shrink-0 items-center justify-center pt-1" aria-hidden="true">
        ${getPlatformSvg(activePlatform, 'h-7 w-7')}
      </span>
      <div class="min-w-0 flex-1">
        <h3 class="font-bold text-sm">${activePlatform} · কাজ ${i + 1}</h3>
        <p class="mt-1 text-xs leading-5" style="color: var(--color-muted);">কাজের ধরন: ${descriptions[i % descriptions.length]}</p>
        <div class="mt-2 flex items-center gap-3 text-xs">
          <p>স্তর: <span class="platform-task-level">${activePackageLevel}</span></p>
          <p style="color: var(--color-muted);">অগ্রগতি: <span class="font-semibold" style="color: var(--color-profile-text);">১০০০০০ / ৯${1200 + (i * 37) % 800}</span></p>
        </div>
      </div>
      <div class="flex shrink-0 flex-col items-end gap-2.5">
        <div class="text-right">
          <p class="text-[10px]" style="color: var(--color-muted);">দৈনিক পুরস্কার</p>
          <p class="font-bold text-sm" style="color: var(--color-profile-blue-text);">${settings.reward}.০০ BDT</p>
        </div>
        <button type="button" class="${btnClass}" data-platform-accept ${btnDisabled ? 'disabled' : ''} ${extraAttr}>${btnText}</button>
      </div>
    `;
    rows.push(row);
  }

  const bottomExitBtn = document.createElement('div');
  bottomExitBtn.className = 'pt-6 pb-14 text-center';
  bottomExitBtn.innerHTML = `
    <button type="button" class="w-full py-3.5 px-4 rounded-xl bg-[#0c2364] hover:bg-[#123185] border-2 border-[#35c6e7]/50 text-white font-bold text-xs shadow-lg transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer" data-panel="vip">
      <svg viewBox="0 0 24 24" class="h-4 w-4 text-red-400" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
      <span>এই স্তর থেকে কেটে বের হন (ভিআইপি হলে ফিরে যান)</span>
    </button>
  `;
  rows.push(bottomExitBtn);

  platformTaskList.replaceChildren(...rows);
  const headerLvl = document.getElementById('platform-task-header-level');
  if (headerLvl) headerLvl.textContent = `${activePackageLevel} মিশন তালিকা`;
  refreshDailyMissionLimit(activePackageLevel);
}

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

  const platformEl = document.getElementById('mission-submit-platform');
  if (platformEl) platformEl.textContent = mission.platform || 'YouTube';

  const platformIconEl = document.getElementById('mission-submit-platform-icon');
  if (platformIconEl) {
    platformIconEl.innerHTML = getPlatformSvg(mission.platform, 'h-5 w-5');
  }

  const rewardEl = document.getElementById('mission-submit-reward');
  if (rewardEl) {
    const rew = Number(mission.reward || 30).toFixed(2);
    rewardEl.textContent = rew + 'BDT';
  }

  const descEl = document.getElementById('mission-submit-description');
  if (descEl) descEl.textContent = mission.description || 'পছন্দ লক্ষ্য করা';

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
      previewEl.innerHTML = `<img src="${activeSubmissionImage}" alt="স্ক্রিনশট" class="h-full w-full object-cover rounded cursor-pointer" style="width:100%;height:100%;object-fit:cover;border-radius:6px;display:block;" title="পূর্ণ স্ক্রিনশট প্রিভিউ দেখতে ক্লিক করুন">`;
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
  if (commentEl) commentEl.value = mission.userComment || '';
  const commentCount = document.getElementById('mission-submit-comment-count');
  if (commentCount) commentCount.textContent = commentEl ? commentEl.value.length : 0;

  const linkMsg = document.getElementById('mission-submit-link-message');
  if (linkMsg) linkMsg.innerHTML = '';
  const submitMsg = document.getElementById('mission-submit-message');
  if (submitMsg) submitMsg.innerHTML = '';

  updateMissionSubmitButton();
}

function updateMissionSubmitButton() {
  const button = document.getElementById('mission-submit-confirm');
  if (!button) return;
  const linkEl = document.getElementById('mission-submit-link');
  const link = linkEl ? linkEl.value.trim() : '';
  button.disabled = !link;
}

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
  const missions = readAcceptedMissions();
  let changed = false;
  let totalReward = 0;
  let completedCount = 0;
  const now = Date.now();

  missions.forEach(function(m) {
    if (m.status === 'review') {
      if (!m.reviewEndsAt) {
        const subTime = m.submittedAt ? new Date(m.submittedAt).getTime() : now;
        m.reviewEndsAt = subTime + 5 * 60 * 1000;
      }
      if (now >= m.reviewEndsAt) {
        m.status = 'complete';
        m.completedAt = new Date().toISOString();
        if (!m.rewardCredited) {
          m.rewardCredited = true;
          totalReward += (Number(m.reward) || 30);
          completedCount += 1;
        }
        changed = true;
      }
    }
  });

  if (changed) {
    localStorage.setItem('aloAcceptedMissions', JSON.stringify(missions));
    if (totalReward > 0) {
      let user = null;
      try {
        user = JSON.parse(localStorage.getItem('aloSignedInUser') || 'null');
      } catch(e) {}
      if (user) {
        user.balance = (Number(user.balance) || 0) + totalReward;
        user.todayIncome = (Number(user.todayIncome) || 0) + totalReward;
        user.totalIncome = (Number(user.totalIncome) || 0) + totalReward;
        user.completedMissions = (Number(user.completedMissions) || 0) + completedCount;
        localStorage.setItem('aloSignedInUser', JSON.stringify(user));
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

// ✅ FIX #2: এই ফাংশনটা আগে click listener-এর ভেতরে ঢুকে ছিল। এখন টপ-লেভেলে।
async function renderTeamMembersView() {
  const membersContent = document.getElementById('team-members-view-content');
  if (!membersContent) return;
  const user = getCurrentUser();
  const phone = (user && (user.phone || user.accountNumber)) || '';

  const defaultMembers = [
    { phone: '01718-***892', level: 'LV1', status: 'সক্রিয়' },
    { phone: '01824-***103', level: 'LV2', status: 'সক্রিয়' },
    { phone: '01955-***447', level: 'LV1', status: 'সক্রিয়' }
  ];

  let dbMembers = [];
  if (phone) {
    try {
      dbMembers = await dbGetTeamMembers(phone);
    } catch (e) {}
  }

  const allMembers = [];
  if (dbMembers && dbMembers.length > 0) {
    dbMembers.forEach(function(m) {
      let p = m.memberPhone || '';
      if (p.length >= 10) {
        p = p.slice(0, 5) + '-***' + p.slice(-3);
      }
      allMembers.push({
        phone: p,
        level: m.level || 'LV0',
        status: m.status || 'সক্রিয়'
      });
    });
  }
  defaultMembers.forEach(function(dm) {
    allMembers.push(dm);
  });

  const memberRows = allMembers.map(function(m) {
    return `
      <div class="flex items-center justify-between p-2.5 rounded-lg bg-[#040e29] border border-[#0d1e45] hover:border-[#1d4ed8] transition">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
          <span class="font-mono text-white text-xs tracking-wider">${m.phone}</span>
        </div>
        <span class="text-[#38bdf8] font-bold text-xs bg-[#0b2460] px-2 py-0.5 rounded border border-[#1b3d8a]">${m.level} · ${m.status}</span>
      </div>
    `;
  }).join('');

  membersContent.innerHTML = `
    <div class="p-4 rounded-xl bg-[#06143b] border border-[#0f245a] text-center text-slate-300 text-xs shadow-xl">
      <div class="flex items-center justify-between border-b border-[#0f245a] pb-3 mb-3">
        <p class="font-bold text-white text-sm">সরাসরি যুক্ত সদস্য তালিকা (${allMembers.length} জন)</p>
        <span class="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">ক্লাউড ডাটাবেজ</span>
      </div>
      <div class="space-y-2 text-left max-h-[360px] overflow-y-auto pr-1">
        ${memberRows}
      </div>
    </div>
  `;
}

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

  // Logout button click
  const logoutClick = event.target.closest('#logout-button');
  if (logoutClick) {
    event.preventDefault();
    handleLogout();
    return;
  }

  // Navigation / Dashboard panel clicks
  const panelBtn = event.target.closest('[data-panel]');
  if (panelBtn) {
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
    if (tab === 'members') {
      if (reportContent) reportContent.classList.add('hidden');
      if (membersContent) {
        membersContent.classList.remove('hidden');
        renderTeamMembersView();
      }
    } else {
      if (reportContent) reportContent.classList.remove('hidden');
      if (membersContent) membersContent.classList.add('hidden');
    }
    return;
  }

  // Team report tier tabs (স্তর 1, স্তর 2, স্তর 3)
  const teamTierTab = event.target.closest('.team-tier-tab');
  if (teamTierTab) {
    event.preventDefault();
    const tier = teamTierTab.dataset.tier;
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

    const tierData = {
      '1': { members: '17', recharge: '94800.00', rebate: '10048.00' },
      '2': { members: '42', recharge: '48000.00', rebate: '3840.00' },
      '3': { members: '75', recharge: '57900.00', rebate: '2316.00' }
    };
    const cur = tierData[tier] || tierData['1'];
    const mEl = document.getElementById('tier-metric-members');
    const rEl = document.getElementById('tier-metric-recharge');
    const bEl = document.getElementById('tier-metric-rebate');
    if (mEl) mEl.textContent = cur.members;
    if (rEl) rEl.textContent = cur.recharge;
    if (bEl) bEl.textContent = cur.rebate;
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
    showToastNotification(`পছন্দ: ${methodName}`);
    return;
  }

  // Deposit trigger buttons: clicking 'Deposit' (জমা / রিচার্জ) opens Payment method screen
  const depositOpenBtn = event.target.closest('#records-open-deposit-btn, #my-pass-deposit-btn, #sheet-tab-deposit, #open-deposit-from-purchase-btn');
  if (depositOpenBtn) {
    event.preventDefault();
    closeActionSheet();
    previousDashboardPanel = 'my-pass';
    openDashboardPanel('payment-method');
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

  // Open method picker row ("পছন্দ কর" / "বিকাশ সেট নেই")
  const openMethodPickerRow = event.target.closest('#withdraw-method-select-row');
  if (openMethodPickerRow) {
    event.preventDefault();
    const bkash = getSavedBkashAccount();
    if (!bkash || !bkash.phone) {
      closeWithdrawSheet();
      previousDashboardPanel = 'my-pass';
      openDashboardPanel('bkash-setup');
      showToastNotification('বিকাশ সেট নেই! অনুগ্রহ করে বিকাশ তথ্য সেট করুন');
      return;
    }
    openMethodPicker();
    return;
  }

  // Close method picker modal (Cancel button or backdrop)
  const closeMethodPickerBtn = event.target.closest('#withdraw-picker-cancel-btn, #withdraw-picker-backdrop');
  if (closeMethodPickerBtn) {
    event.preventDefault();
    closeMethodPicker();
    return;
  }

  // Option selection in wheel picker
  const pickerOption = event.target.closest('.withdraw-picker-option');
  if (pickerOption) {
    event.preventDefault();
    const methodKey = pickerOption.dataset.methodKey || 'BKASH';
    const bkash = getSavedBkashAccount();
    if (methodKey === 'BKASH' && (!bkash || !bkash.phone)) {
      closeMethodPicker();
      closeWithdrawSheet();
      previousDashboardPanel = 'my-pass';
      openDashboardPanel('bkash-setup');
      showToastNotification('বিকাশ সেট নেই! অনুগ্রহ করে বিকাশ তথ্য সেট করুন');
      return;
    }
    pendingPickerMethod = methodKey;
    pendingPickerDisplay = pickerOption.dataset.displayText || pickerOption.textContent.trim();
    updatePickerOptionHighlight();
    return;
  }

  // Confirm method selection ("নিশ্চিত করুন")
  const confirmPickerBtn = event.target.closest('#withdraw-picker-confirm-btn');
  if (confirmPickerBtn) {
    event.preventDefault();
    const label = document.getElementById('withdraw-selected-method-label');
    if (label) {
      label.textContent = pendingPickerDisplay;
      label.classList.add('text-[#38bdf8]', 'font-bold');
      label.classList.remove('text-slate-300');
    }
    closeMethodPicker();
    showToastNotification(`পদ্ধতি নির্বাচন: ${pendingPickerDisplay}`);
    return;
  }

  // Profile bkash row click ("বিকাশ সেট করুন")
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

  // Personal message buttons for other rows
  const personalMsgBtn = event.target.closest('[data-personal-message]');
  if (personalMsgBtn && !personalMsgBtn.closest('#personal-bkash-row, [data-profile-edit="bkash"], #bkash-setup-panel')) {
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
    const bkash = getSavedBkashAccount();
    const label = document.getElementById('withdraw-selected-method-label');
    const selectedMethod = label ? label.textContent.trim() : 'বিকাশ সেট নেই';
    
    if (!bkash || !bkash.phone || selectedMethod === 'বিকাশ সেট নেই') {
      showToastNotification('⚠️ উত্তোলন করার পূর্বে বিকাশ সেট করতে হবে');
      closeWithdrawSheet();
      previousDashboardPanel = 'my-pass';
      openDashboardPanel('bkash-setup');
      return;
    }

    const amtInp = document.getElementById('withdraw-sheet-amount');
    const amt = parseFloat(amtInp ? amtInp.value : '0') || 0;
    const availBal = getAvailableBalance();

    if (amt <= 0) {
      showToastNotification('⚠️ অনুগ্রহ করে উত্তোলনের সঠিক পরিমাণ লিখুন');
      if (amtInp) amtInp.focus();
      return;
    }

    if (amt > availBal) {
      showToastNotification(`⚠️ অপর্যাপ্ত ব্যালেন্স! আপনার উপলব্ধ ব্যালেন্স ${availBal.toFixed(2)} BDT`);
      if (amtInp) amtInp.focus();
      return;
    }

    const pwdInp = document.getElementById('withdraw-sheet-fund-password');
    const pwd = pwdInp ? pwdInp.value.trim() : '';
    if (!pwd) {
      showToastNotification('⚠️ অনুগ্রহ করে ফান্ডের পাসওয়ার্ড লিখুন');
      if (pwdInp) pwdInp.focus();
      return;
    }

    // Deduct available balance
    const newBal = Math.max(0, availBal - amt);
    localStorage.setItem('my_pass_available_bal', newBal.toFixed(2));
    const user = getCurrentUser();
    if (user && user.balance) {
      user.balance = Math.max(0, Number(user.balance) - amt);
      localStorage.setItem('aloSignedInUser', JSON.stringify(user));
    }

    // Add withdrawal record
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const newRecord = {
      amount: amt.toFixed(2),
      ratio: '50.0%',
      actual: (amt * 0.5).toFixed(2),
      status: 'স্থানান্তরিত',
      date: dateStr,
      time: `${hours}:${mins}`
    };

    // Save withdrawal record to Cloud Database
    if (user) {
      dbRecordTransaction({
        phone: user.phone || user.accountNumber,
        type: 'withdraw',
        amount: amt,
        ratio: '50.0%',
        actual: amt * 0.5,
        status: 'স্থানান্তরিত',
        method: (bkash && bkash.phone) ? `বিকাশ (${bkash.phone})` : 'বিকাশ',
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

    showToastNotification(`🎉 ${amt.toFixed(2)} BDT উত্তোলনের আবেদন সফলভাবে জমা দেওয়া হয়েছে!`);
    return;
  }

  // Hall package level room click:
  // LV0 is free; selecting any package other than LV0 opens package modal
  const levelRoom = event.target.closest('[data-open-level-tasks]');
  if (levelRoom) {
    const level = levelRoom.dataset.level || 'LV0';
    if (level === 'LV0') {
      renderPackageTasks(level);
      openDashboardPanel('platform-tasks');
      return;
    }
    event.preventDefault();
    openPackagePurchaseModal(level);
    return;
  }

  // Buy package button click
  const buyPkgBtn = event.target.closest('[data-buy-package]');
  if (buyPkgBtn) {
    const level = buyPkgBtn.dataset.buyPackage;
    if (level && level !== 'LV0') {
      event.preventDefault();
      openPackagePurchaseModal(level);
      return;
    }
  }

  // Package card click in records panel
  const recordPkgCard = event.target.closest('[data-record-package]');
  if (recordPkgCard && !event.target.closest('button')) {
    const level = recordPkgCard.dataset.recordPackage;
    if (level && level !== 'LV0') {
      event.preventDefault();
      openPackagePurchaseModal(level);
      return;
    }
  }

  // Locked level button click
  const lockedBtn = event.target.closest('[data-locked-level]');
  if (lockedBtn) {
    const lvl = lockedBtn.dataset.lockedLevel || activePackageLevel;
    if (lvl && lvl !== 'LV0') {
      event.preventDefault();
      openPackagePurchaseModal(lvl);
      return;
    }
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
    if (activePackageLevel !== 'LV0' && !isLevelUnlocked(activePackageLevel, user)) {
      openPackagePurchaseModal(activePackageLevel, 'ফ্রিতে শুধু LV0 কাজ করতে পারবেন। ' + activePackageLevel + ' কাজ করতে ব্যালেন্স দিয়ে প্যাকেজ ক্রয় করুন।');
      return;
    }
    if (acceptBtn.disabled) return;
    const row = acceptBtn.closest('.platform-task-row');
    const taskIndex = row ? parseInt(row.dataset.taskIndex || '0', 10) : 0;
    const quota = packageTaskSettings[activePackageLevel]?.count || 5;
    const today = new Date().toDateString();
    const acceptedToday = readAcceptedMissions().filter(function(m) {
      return m.level === activePackageLevel && new Date(m.acceptedAt).toDateString() === today;
    });

    if (acceptedToday.length >= quota) {
      const msg = document.getElementById('platform-task-message');
      if (msg) msg.innerHTML = `<span style="color: var(--color-warning);">আজকের ${activePackageLevel} স্তরের ${quota}টি কাজের সীমা পূর্ণ হয়েছে!</span>`;
      refreshDailyMissionLimit(activePackageLevel);
      return;
    }

    const title = row ? row.querySelector('h3').textContent : (activePlatform + ' · কাজ');
    const desc = row ? row.querySelector('p').textContent.replace('কাজের ধরন: ', '') : '';
    const reward = packageTaskSettings[activePackageLevel].reward;
    const taskLink = getRealisticTaskUrl(activePlatform, taskIndex);

    saveAcceptedMission({
      id: 'demo-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      taskIndex: taskIndex,
      platform: activePlatform,
      title: title,
      description: desc,
      level: activePackageLevel,
      reward: reward,
      status: 'active',
      taskLink: taskLink,
      acceptedAt: new Date().toISOString()
    });

    acceptBtn.textContent = 'গৃহীত';
    acceptBtn.disabled = true;
    acceptBtn.dataset.accepted = 'true';
    acceptBtn.removeAttribute('data-limit-reached');

    const newAcceptedCount = acceptedToday.length + 1;
    const msg = document.getElementById('platform-task-message');
    if (newAcceptedCount >= quota) {
      if (msg) msg.innerHTML = `<span style="color: var(--color-warning); font-weight: bold;">অভিনন্দন! আজকের ${activePackageLevel} স্তরের ${quota}টি কাজের সীমা পূর্ণ হয়েছে।</span><br><small style="color: var(--color-muted);">টাস্ক মেনুতে গিয়ে কাজ জমা দিন।</small>`;
    } else {
      if (msg) msg.innerHTML = `কাজ গৃহীত হয়েছে! (আজকের বাকি কাজ: <strong style="color: var(--color-profile-cyan);">${quota - newAcceptedCount}টি</strong>)`;
    }

    refreshDailyMissionLimit(activePackageLevel);
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

  // Fast approve button (instant approval for demo/speed)
  const fastBtn = event.target.closest('[data-fast-approve]');
  if (fastBtn) {
    const mId = fastBtn.dataset.fastApprove;
    const missions = readAcceptedMissions();
    const m = missions.find(function(item) { return item.id === mId; });
    if (m) {
      m.reviewEndsAt = Date.now() - 1000;
      localStorage.setItem('aloAcceptedMissions', JSON.stringify(missions));
      checkPendingReviews();
    }
    return;
  }

  // Mission filter tab click
  const filterTab = event.target.closest('[data-mission-filter]');
  if (filterTab) {
    activeMissionFilter = filterTab.dataset.missionFilter;
    renderMissionRecords(activeMissionFilter);
    return;
  }

  // Cancel mission
  const cancelBtn = event.target.closest('[data-cancel-mission]');
  if (cancelBtn) {
    const card = cancelBtn.closest('[data-mission-id]');
    if (card) {
      const missions = readAcceptedMissions().filter(function(m) { return m.id !== card.dataset.missionId; });
      localStorage.setItem('aloAcceptedMissions', JSON.stringify(missions));
      renderMissionRecords(activeMissionFilter);
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
    const missions = readAcceptedMissions();
    const mission = missions.find(function(item) { return item.id === activeSubmissionId; });
    if (!mission) return;

    // Review for 5-10 minutes (300 to 600 seconds)
    const reviewMinutes = Math.floor(Math.random() * 6) + 5;
    const now = Date.now();
    const reviewEndsAt = now + reviewMinutes * 60 * 1000;

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

    localStorage.setItem('aloAcceptedMissions', JSON.stringify(missions));

    activeMissionFilter = 'review';
    openDashboardPanel('tasks');
    renderMissionRecords('review');

    const taskMsg = document.getElementById('task-message');
    if (taskMsg) {
      taskMsg.innerHTML = `<div class="rounded-lg p-3 my-2 text-center" style="background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.3); color: #fbbf24;">
        <p class="font-bold text-sm">✓ কাজ পর্যালোচনায় জমা হয়েছে!</p>
        <p class="text-xs mt-1">এটি আগামী <strong>${reviewMinutes} মিনিট</strong> পর্যালোচনাধীন থাকবে। পর্যালোচনা শেষ হলে সম্পূর্ণ হয়ে <strong>${mission.reward}.০০ BDT</strong> স্বয়ংক্রিয়ভাবে যুক্ত হবে।</p>
      </div>`;
      setTimeout(function() {
        if (taskMsg) taskMsg.innerHTML = '';
      }, 8000);
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
  showToastNotification('সফলভাবে সাইন আউট করা হয়েছে।');
  const loginPass = document.getElementById('login-password');
  if (loginPass) loginPass.value = '';
  showView('login');
}

const demoLoginBtn = document.getElementById('quick-demo-login-btn');
if (demoLoginBtn) {
  demoLoginBtn.addEventListener('click', function() {
    let accounts = [];
    try { accounts = JSON.parse(localStorage.getItem('aloAccounts') || '[]'); } catch(e) {}
    const latest = accounts.length > 0 ? accounts[accounts.length - 1] : null;
    const regPhone = latest ? (latest.accountNumber || latest.phone || '01735235999') : '01735235999';
    const demoUser = {
      name: (latest && latest.name) || 'সদস্য',
      phone: regPhone,
      accountNumber: regPhone,
      inviteCode: (latest && latest.inviteCode) || '728207',
      memberId: (latest && latest.memberId) || '1105',
      superiorId: '11',
      packageLevel: (latest && latest.packageLevel) || 'LV0',
      purchasedPackages: (latest && latest.purchasedPackages) || ['LV0'],
      balance: (latest && typeof latest.balance === 'number') ? latest.balance : 0.00
    };
    localStorage.setItem('aloSignedInUser', JSON.stringify(demoUser));
    updateUserDetails(demoUser);
    updateProfileMetrics();
    updateVipHallRooms();
    updateRecordsPanelPackages();
    playLoginSuccess(demoUser.name, function() {
      openDashboardPanel('profile');
      showView('dashboard', 'zoom');
    });
  });
}

// Initial session check
function initApp() {
  let savedUser = null;
  try {
    savedUser = JSON.parse(localStorage.getItem('aloSignedInUser') || 'null');
  } catch (error) {
    savedUser = null;
  }

  let accounts = [];
  try {
    accounts = JSON.parse(localStorage.getItem('aloAccounts') || '[]');
  } catch (e) {
    accounts = [];
  }
  const latestAccount = accounts.length > 0 ? accounts[accounts.length - 1] : null;

  if (savedUser) {
    if (latestAccount && (latestAccount.accountNumber || latestAccount.phone)) {
      savedUser.accountNumber = latestAccount.accountNumber || latestAccount.phone;
      savedUser.phone = latestAccount.phone || latestAccount.accountNumber;
    }
    if (!savedUser.purchasedPackages) {
      savedUser.purchasedPackages = ['LV0'];
    }
    if (!savedUser.packageLevel || !savedUser.purchasedPackages.includes(savedUser.packageLevel)) {
      savedUser.packageLevel = 'LV0';
    }
    if (typeof savedUser.balance !== 'number') savedUser.balance = 0.00;
    localStorage.setItem('aloSignedInUser', JSON.stringify(savedUser));

    updateUserDetails(savedUser);
    updateProfileMetrics();
    updateVipHallRooms();
    updateRecordsPanelPackages();
    updateBkashDisplayAcrossApp();
    openDashboardPanel('profile');
    showView('dashboard');
  } else {
    // If not logged in, show login page so user can login or register
    if (latestAccount && (latestAccount.accountNumber || latestAccount.phone)) {
      const loginEmail = document.getElementById('login-email');
      if (loginEmail) loginEmail.value = latestAccount.accountNumber || latestAccount.phone;
    }
    showView('login');
  }
}

document.addEventListener('input', function(e) {
  if (e.target && e.target.id === 'withdraw-amount-input') {
    updateWithdrawCalculations();
  }
});

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
