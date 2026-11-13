'use strict';

// ============================================================================
// DEFAULT SUPABASE CONFIGURATION (Pre-configured for live project)
// ============================================================================
const DEFAULT_SUPABASE_URL = 'https://scbpjqsxntqdzwnqyjmi.supabase.co';
const DEFAULT_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjYnBqcXN4bnRxZHp3bnF5am1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5OTIyMzQsImV4cCI6MjEwNzU2ODIzNH0.3emtfDdr9SNjRfCb6CVHF0QqfOe_iBvT9rbX_c94ER4';

const STORAGE_KEYS = {
  AUTH_SESSION: 'cpanel_admin_session_v1',
  ADMIN_CREDS: 'cpanel_admin_creds_v1',
  SB_CONFIG: 'cpanel_admin_sb_config_v1'
};

// State store
let supabaseClient = null;
let realtimeChannel = null;
let allUsers = [];
let allTransactions = [];
let allExtraDeposits = [];
let usersByPhone = new Map();
let currentSection = 'overview';
let rechargeFilter = 'all';
let withdrawFilter = 'all';
let autoRefreshTimer = null;

// ============================================================================
// UTILITIES
// ============================================================================
function normalizePhone(raw) {
  if (!raw) return '';
  let s = String(raw).replace(/\D/g, '');
  if (s.startsWith('880') && s.length >= 13) s = '0' + s.slice(3);
  if (s.startsWith('91') && s.length === 12) return s;
  if (s.length === 10 && s.startsWith('1')) s = '0' + s;
  return s;
}

function escapeHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatMoney(val) {
  const num = Number(val) || 0;
  return '৳' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function getTodayDateString() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function isSameLocalDay(isoOrDateStr) {
  if (!isoOrDateStr) return false;
  const s = String(isoOrDateStr).trim();
  const todayStr = getTodayDateString();
  if (s.startsWith(todayStr)) return true;
  const parsed = new Date(s);
  if (isNaN(parsed.getTime())) return false;
  const now = new Date();
  return (
    parsed.getFullYear() === now.getFullYear() &&
    parsed.getMonth() === now.getMonth() &&
    parsed.getDate() === now.getDate()
  );
}

function parseRawUserOpt(userRow) {
  let opt = {};
  if (userRow && userRow.bkash_optional) {
    try {
      const parsed = typeof userRow.bkash_optional === 'string'
        ? JSON.parse(userRow.bkash_optional)
        : userRow.bkash_optional;
      if (parsed && typeof parsed === 'object') opt = parsed;
    } catch (e) {
      opt = {};
    }
  }
  return opt;
}

function parseUserMeta(userRow) {
  const opt = parseRawUserOpt(userRow);
  return {
    realName: opt.real_name || userRow?.name || 'Member',
    fundPassword: opt.fund_password || '',
    nagadName: userRow?.nagad_name || opt.nagad_name || '',
    nagadPhone: userRow?.nagad_phone || opt.nagad_phone || '',
    usdtName: userRow?.usdt_name || opt.usdt_name || '',
    usdtAddress: userRow?.usdt_address || opt.usdt_address || '',
    accountStatus: opt.account_status || 'active'
  };
}

function classifyStatus(rawStatus) {
  const s = String(rawStatus || '').trim().toLowerCase();
  if (
    s.includes('বাতিল') ||
    s.includes('reject') ||
    s.includes('cancel') ||
    s.includes('fail') ||
    s.includes('declin')
  ) {
    return 'rejected';
  }
  if (
    s.includes('অনুমোদিত') ||
    s.includes('সফল') ||
    s.includes('approv') ||
    s.includes('complet') ||
    s.includes('success') ||
    s.includes('paid') ||
    s === 'স্থানান্তরিত'
  ) {
    return 'approved';
  }
  return 'pending';
}

function isAutoPaymentTx(tx) {
  const m = String(tx?.method || '').toLowerCase();
  const oid = String(tx?.order_id || tx?.out_trade_no || '').toLowerCase();
  return (
    m.includes('[auto]') ||
    m.includes('usdt') ||
    m.includes('gateway') ||
    oid.startsWith('ord')
  );
}

function renderStatusBadge(statusKey, isAuto = false) {
  if (statusKey === 'approved') {
    const label = isAuto ? 'Approved · Auto' : 'Approved';
    return `<span class="text-xs font-semibold text-emerald-700">${label}</span>`;
  }
  if (statusKey === 'rejected') {
    return `<span class="text-xs font-semibold text-rose-600">Rejected</span>`;
  }
  return `<span class="text-xs font-semibold text-amber-600">Pending</span>`;
}

let toastTimer = null;
function showToast(msg, type = 'info') {
  const el = document.getElementById('admin-toast');
  if (!el) return;
  const bgClass = type === 'error'
    ? 'bg-rose-600 text-white'
    : (type === 'success' ? 'bg-slate-900 text-white' : 'bg-slate-800 text-white');
  el.className = `fixed bottom-5 right-5 z-[60] max-w-sm ${bgClass} px-4 py-2.5 rounded-lg shadow-lg text-xs font-medium`;
  el.textContent = msg;
  el.classList.remove('hidden');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.classList.add('hidden');
  }, 3500);
}

function copyToClipboard(text, label = 'Copied') {
  if (!text) return;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => showToast(`${label}: ${text}`, 'success')).catch(() => {});
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); showToast(`${label}: ${text}`, 'success'); } catch (e) {}
    document.body.removeChild(ta);
  }
}

// ============================================================================
// CRYPTO HASH & ADMIN AUTHENTICATION
// ============================================================================
async function sha256(str) {
  if (window.crypto && window.crypto.subtle) {
    const buf = new TextEncoder().encode(str);
    const hashBuf = await window.crypto.subtle.digest('SHA-256', buf);
    return Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }
  return str;
}

async function getStoredAdminCreds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_CREDS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.username && parsed.passwordHash) return parsed;
    }
  } catch (e) {}
  const fileCfg = window.CPANEL_ADMIN_CONFIG || {};
  return {
    username: fileCfg.ADMIN_USERNAME || 'admin',
    passwordHash: await sha256(fileCfg.ADMIN_PASSWORD || 'Admin@2026')
  };
}

function isAuthenticated() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.AUTH_SESSION) || localStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
    if (!raw) return false;
    const sess = JSON.parse(raw);
    return Boolean(sess && sess.loggedIn && sess.username);
  } catch (e) {
    return false;
  }
}

async function handleLoginSubmit(e) {
  e.preventDefault();
  const userInp = document.getElementById('login-username');
  const passInp = document.getElementById('login-password');
  const errBox = document.getElementById('login-error-box');

  const u = (userInp?.value || '').trim();
  const p = passInp?.value || '';
  const creds = await getStoredAdminCreds();
  const inputHash = await sha256(p);

  if (u === creds.username && (inputHash === creds.passwordHash || p === creds.passwordHash)) {
    if (errBox) errBox.classList.add('hidden');
    const sess = { loggedIn: true, username: u, loginAt: Date.now() };
    localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(sess));
    sessionStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(sess));
    enterAdminShell(u);
  } else {
    if (errBox) {
      errBox.textContent = 'Invalid administrator username or password.';
      errBox.classList.remove('hidden');
    }
  }
}

function adminSignOut() {
  localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
  sessionStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
  if (autoRefreshTimer) clearInterval(autoRefreshTimer);
  if (realtimeChannel && supabaseClient) {
    try { supabaseClient.removeChannel(realtimeChannel); } catch (e) {}
  }
  document.getElementById('admin-app-shell')?.classList.add('hidden');
  document.getElementById('admin-login-screen')?.classList.remove('hidden');
}

// ============================================================================
// SUPABASE CONNECTION
// ============================================================================
function getDbConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SB_CONFIG);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.url && parsed.key) return parsed;
    }
  } catch (e) {}
  const fileCfg = window.CPANEL_ADMIN_CONFIG || {};
  return {
    url: fileCfg.SUPABASE_URL || DEFAULT_SUPABASE_URL,
    key: fileCfg.SUPABASE_KEY || DEFAULT_SUPABASE_KEY
  };
}

function initSupabaseClient() {
  const cfg = getDbConfig();
  if (!window.supabase || !window.supabase.createClient) {
    showToast('Supabase SDK failed to load. Check internet connection.', 'error');
    return null;
  }
  supabaseClient = window.supabase.createClient(cfg.url, cfg.key, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  // Populate settings inputs
  const urlEl = document.getElementById('settings-sb-url');
  const keyEl = document.getElementById('settings-sb-key');
  if (urlEl) urlEl.value = cfg.url;
  if (keyEl) keyEl.value = cfg.key;

  setupRealtimeSubscriptions();
  return supabaseClient;
}

function setupRealtimeSubscriptions() {
  if (!supabaseClient) return;
  if (realtimeChannel) {
    try { supabaseClient.removeChannel(realtimeChannel); } catch (e) {}
  }
  try {
    realtimeChannel = supabaseClient
      .channel('admin-live-feed')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, () => {
        refreshAllData(false);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, () => {
        refreshAllData(false);
      })
      .subscribe();
  } catch (e) {}
}

// ============================================================================
// DATA FETCHING & KPI CALCULATIONS
// ============================================================================
async function refreshAllData(showFeedback = false) {
  if (!supabaseClient) initSupabaseClient();
  if (!supabaseClient) return;

  const icon = document.getElementById('refresh-icon');
  if (icon) icon.classList.add('animate-spin');

  try {
    // 1. Fetch users
    const { data: usersData, error: usersErr } = await supabaseClient
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5000);

    if (usersErr) {
      console.error('Users fetch error:', usersErr);
      showToast('Failed to fetch users: ' + usersErr.message, 'error');
    } else {
      const rawUsers = Array.isArray(usersData) ? usersData : [];
      const sysConfigRow = rawUsers.find(u => String(u.phone) === 'SYSTEM_CONFIG');
      hydratePlatformControlsForm(sysConfigRow);

      allUsers = rawUsers.filter(u => String(u.phone) !== 'SYSTEM_CONFIG');
      usersByPhone = new Map();
      allUsers.forEach(u => {
        const p = normalizePhone(u.phone || u.account_number);
        if (p) usersByPhone.set(p, u);
      });
    }

    // 2. Fetch transactions
    const { data: txData, error: txErr } = await supabaseClient
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5000);

    if (txErr) {
      console.error('Transactions fetch error:', txErr);
      showToast('Failed to fetch transactions: ' + txErr.message, 'error');
    } else {
      allTransactions = Array.isArray(txData) ? txData : [];
    }

    // 3. Optionally fetch deposits table (USDT on-chain automated deposits if RLS allows)
    try {
      const { data: depData, error: depErr } = await supabaseClient
        .from('deposits')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1000);
      if (!depErr && Array.isArray(depData)) {
        allExtraDeposits = depData;
      }
    } catch (e) {}

    // Update sync timestamp
    const syncEl = document.getElementById('last-sync-time');
    if (syncEl) syncEl.textContent = new Date().toTimeString().split(' ')[0];

    renderEverything();
    if (showFeedback) showToast('Database synchronized successfully.', 'success');
  } catch (err) {
    console.error('Refresh error:', err);
    if (showFeedback) showToast('Sync error: ' + (err.message || 'Unknown'), 'error');
  } finally {
    if (icon) icon.classList.remove('animate-spin');
  }
}

function getRechargeList() {
  const txDeposits = allTransactions.filter(t => String(t.type || '').toLowerCase() === 'deposit');
  // Merge extra `deposits` rows if any aren't already represented
  const merged = txDeposits.slice();
  if (allExtraDeposits && allExtraDeposits.length > 0) {
    allExtraDeposits.forEach(d => {
      const hash = String(d.tx_hash || '');
      const dup = merged.some(m => String(m.order_id || m.out_trade_no || '') === hash);
      if (!dup) {
        merged.push({
          id: 'dep_' + d.id,
          _sourceTable: 'deposits',
          _rawId: d.id,
          phone: d.user_id ? String(d.user_id).slice(0, 12) : 'USDT User',
          type: 'deposit',
          amount: Number(d.amount_bdt || 0),
          actual: Number(d.amount_bdt || 0),
          ratio: '100%',
          status: d.status || 'approved',
          method: `USDT (BEP20) · ${d.amount_usdt || 0} USDT`,
          order_id: d.tx_hash || '',
          date: (d.created_at || '').split('T')[0],
          time: (d.created_at || '').split('T')[1]?.slice(0, 8) || '',
          created_at: d.created_at
        });
      }
    });
  }
  return merged.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
}

function getWithdrawalList() {
  return allTransactions
    .filter(t => String(t.type || '').toLowerCase() === 'withdraw')
    .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
}

function getCommissionList() {
  return allTransactions
    .filter(t => String(t.type || '').toLowerCase() === 'commission')
    .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
}

// ============================================================================
// RENDERING
// ============================================================================
function renderEverything() {
  updateKpiMetrics();
  renderOverviewQueues();
  renderRechargesTable();
  renderWithdrawalsTable();
  renderUsersTable();
  renderCommissionsTable();
}

function updateKpiMetrics() {
  const totalUsers = allUsers.length;
  const todayUsers = allUsers.filter(u => isSameLocalDay(u.created_at)).length;
  const paidVips = allUsers.filter(u => u.package_level && u.package_level !== 'LV0').length;
  const freeUsers = Math.max(0, totalUsers - paidVips);

  const recharges = getRechargeList();
  const approvedRecharges = recharges.filter(r => classifyStatus(r.status) === 'approved');
  const pendingRecharges = recharges.filter(r => classifyStatus(r.status) === 'pending');
  const todayApprovedRecharges = approvedRecharges.filter(r => isSameLocalDay(r.created_at || r.date));

  const totalRechargeSum = approvedRecharges.reduce((s, r) => s + (Number(r.amount) || 0), 0);
  const todayRechargeSum = todayApprovedRecharges.reduce((s, r) => s + (Number(r.amount) || 0), 0);

  const withdrawals = getWithdrawalList();
  const nonRejectedWithdrawals = withdrawals.filter(w => classifyStatus(w.status) !== 'rejected');
  const pendingWithdrawals = withdrawals.filter(w => classifyStatus(w.status) === 'pending');
  const todayWithdrawals = nonRejectedWithdrawals.filter(w => isSameLocalDay(w.created_at || w.date));

  const totalWithdrawSum = nonRejectedWithdrawals.reduce((s, w) => s + (Number(w.amount) || 0), 0);
  const todayWithdrawSum = todayWithdrawals.reduce((s, w) => s + (Number(w.amount) || 0), 0);

  // Update DOM KPIs
  const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  setText('kpi-total-users', totalUsers.toLocaleString('en-US'));
  setText('kpi-active-vips', paidVips.toLocaleString('en-US'));
  setText('kpi-free-users', freeUsers.toLocaleString('en-US'));
  setText('kpi-today-users', todayUsers.toLocaleString('en-US'));
  setText('kpi-today-date-label', getTodayDateString());

  setText('kpi-total-recharge', formatMoney(totalRechargeSum));
  setText('kpi-total-recharge-count', approvedRecharges.length.toLocaleString('en-US'));
  setText('kpi-pending-recharge-count', pendingRecharges.length.toLocaleString('en-US'));
  setText('kpi-today-recharge', formatMoney(todayRechargeSum));
  setText('kpi-today-recharge-count', todayApprovedRecharges.length.toLocaleString('en-US'));

  setText('kpi-total-withdraw', formatMoney(totalWithdrawSum));
  setText('kpi-total-withdraw-count', nonRejectedWithdrawals.length.toLocaleString('en-US'));
  setText('kpi-pending-withdraw-count', pendingWithdrawals.length.toLocaleString('en-US'));
  setText('kpi-today-withdraw', formatMoney(todayWithdrawSum));
  setText('kpi-today-withdraw-count', todayWithdrawals.length.toLocaleString('en-US'));

  // Sidebar counters
  setText('nav-pending-recharges', pendingRecharges.length);
  setText('nav-pending-withdrawals', pendingWithdrawals.length);
  setText('nav-total-users', totalUsers);
}

function renderOverviewQueues() {
  const recharges = getRechargeList().filter(r => classifyStatus(r.status) === 'pending').slice(0, 8);
  const rcBox = document.getElementById('overview-pending-recharges');
  if (rcBox) {
    if (recharges.length === 0) {
      rcBox.innerHTML = `<div class="p-6 text-center text-xs text-slate-400">All recharges processed. No pending orders.</div>`;
    } else {
      rcBox.innerHTML = recharges.map(tx => {
        const u = usersByPhone.get(normalizePhone(tx.phone));
        const meta = parseUserMeta(u);
        return `
          <div class="p-4 flex items-center justify-between gap-3 hover:bg-slate-50 transition">
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <span class="font-mono text-sm font-bold text-slate-900 tabular-nums">${formatMoney(tx.amount)}</span>
                <span class="text-xs text-slate-400">·</span>
                <span class="font-mono text-xs text-slate-600">${escapeHtml(tx.phone || '-')}</span>
              </div>
              <div class="text-xs text-slate-500 mt-0.5 truncate">
                ${escapeHtml(meta.realName)} · ${escapeHtml(tx.method || 'Deposit')} · ${escapeHtml(tx.date || '')} ${escapeHtml(tx.time || '')}
              </div>
            </div>
            <div class="flex items-center gap-1.5 shrink-0">
              <button type="button" onclick="handleRechargeAction('${tx.id}', 'approved')"
                class="px-2.5 py-1 rounded-md bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white text-xs font-semibold transition cursor-pointer">
                Approve
              </button>
              <button type="button" onclick="handleRechargeAction('${tx.id}', 'rejected')"
                class="px-2.5 py-1 rounded-md bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white text-xs font-semibold transition cursor-pointer">
                Reject
              </button>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  const withdrawals = getWithdrawalList().filter(w => classifyStatus(w.status) === 'pending').slice(0, 8);
  const wdBox = document.getElementById('overview-pending-withdrawals');
  if (wdBox) {
    if (withdrawals.length === 0) {
      wdBox.innerHTML = `<div class="p-6 text-center text-xs text-slate-400">All withdrawal requests processed. Queue empty.</div>`;
    } else {
      wdBox.innerHTML = withdrawals.map(tx => {
        const u = usersByPhone.get(normalizePhone(tx.phone));
        const meta = parseUserMeta(u);
        return `
          <div class="p-4 flex items-center justify-between gap-3 hover:bg-slate-50 transition">
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <span class="font-mono text-sm font-bold text-slate-900 tabular-nums">${formatMoney(tx.amount)}</span>
                <span class="text-xs text-slate-500">Net: <span class="font-mono text-emerald-700 font-semibold">${formatMoney(tx.actual || tx.amount * 0.5)}</span></span>
                <span class="text-xs text-slate-400">·</span>
                <span class="font-mono text-xs text-slate-600">${escapeHtml(tx.phone || '-')}</span>
              </div>
              <div class="text-xs text-slate-500 mt-0.5 truncate">
                ${escapeHtml(meta.realName)} · ${escapeHtml(tx.method || 'bKash')}
              </div>
            </div>
            <div class="flex items-center gap-1.5 shrink-0">
              <button type="button" onclick="openInspectModal('${tx.id}')"
                class="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer">
                Inspect
              </button>
              <button type="button" onclick="handleWithdrawAction('${tx.id}', 'approved')"
                class="px-2.5 py-1 rounded-md bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white text-xs font-semibold transition cursor-pointer">
                Approve
              </button>
              <button type="button" onclick="handleWithdrawAction('${tx.id}', 'rejected')"
                class="px-2.5 py-1 rounded-md bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white text-xs font-semibold transition cursor-pointer">
                Reject
              </button>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // Recent users table on overview
  const recentUsersBody = document.getElementById('overview-recent-users-body');
  if (recentUsersBody) {
    const topUsers = allUsers.slice(0, 8);
    if (topUsers.length === 0) {
      recentUsersBody.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-xs text-slate-400">No users registered yet.</td></tr>`;
    } else {
      recentUsersBody.innerHTML = topUsers.map(u => {
        const meta = parseUserMeta(u);
        const dateLabel = u.created_at ? new Date(u.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-';
        return `
          <tr class="hover:bg-slate-50 transition">
            <td class="py-3 px-4">
              <div class="font-semibold text-slate-900 text-sm">${escapeHtml(meta.realName)}</div>
              <div class="font-mono text-xs text-slate-500">${escapeHtml(u.phone || u.account_number || '-')}</div>
            </td>
            <td class="py-3 px-4 font-mono text-xs text-slate-600">
              ${escapeHtml(u.member_id || '-')} · <span class="text-slate-900 font-semibold">${escapeHtml(u.package_level || 'LV0')}</span>
            </td>
            <td class="py-3 px-4 text-right font-mono font-semibold text-emerald-700 tabular-nums">${formatMoney(u.balance)}</td>
            <td class="py-3 px-4 text-xs text-slate-500 font-mono">${escapeHtml(dateLabel)}</td>
            <td class="py-3 px-4 text-right">
              <button type="button" onclick="openEditUserModal('${escapeHtml(u.phone)}')"
                class="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 cursor-pointer">
                Edit
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }
}

// ============================================================================
// RECHARGES SECTION
// ============================================================================
function setRechargeFilter(filter) {
  rechargeFilter = filter;
  document.querySelectorAll('.rc-filter-btn').forEach(btn => {
    const active = btn.dataset.filter === filter;
    btn.className = active
      ? 'rc-filter-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white cursor-pointer'
      : 'rc-filter-btn px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 cursor-pointer';
  });
  renderRechargesTable();
}

function renderRechargesTable() {
  const tbody = document.getElementById('recharges-table-body');
  if (!tbody) return;
  const q = (document.getElementById('recharge-search-input')?.value || '').trim().toLowerCase();

  let list = getRechargeList();
  if (rechargeFilter === 'pending') list = list.filter(r => classifyStatus(r.status) === 'pending');
  else if (rechargeFilter === 'approved') list = list.filter(r => classifyStatus(r.status) === 'approved');
  else if (rechargeFilter === 'rejected') list = list.filter(r => classifyStatus(r.status) === 'rejected');
  else if (rechargeFilter === 'today') list = list.filter(r => isSameLocalDay(r.created_at || r.date));

  if (q) {
    list = list.filter(r => {
      const u = usersByPhone.get(normalizePhone(r.phone));
      const meta = parseUserMeta(u);
      return (
        String(r.phone || '').toLowerCase().includes(q) ||
        String(r.order_id || r.out_trade_no || '').toLowerCase().includes(q) ||
        String(r.method || '').toLowerCase().includes(q) ||
        String(meta.realName || '').toLowerCase().includes(q)
      );
    });
  }

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="py-10 text-center text-xs text-slate-400">No recharge records found for this filter.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(tx => {
    const statusKey = classifyStatus(tx.status);
    const isAuto = isAutoPaymentTx(tx);
    const u = usersByPhone.get(normalizePhone(tx.phone));
    const meta = parseUserMeta(u);
    const orderRef = tx.order_id || tx.out_trade_no || `#${tx.id}`;
    const isExtraDeposit = tx._sourceTable === 'deposits';

    return `
      <tr class="hover:bg-slate-50 transition">
        <td class="py-3.5 px-4">
          <div class="font-mono text-xs font-semibold text-slate-900">${escapeHtml(orderRef)}</div>
          <div class="font-mono text-[11px] text-slate-400 mt-0.5">${escapeHtml(tx.date || (tx.created_at || '').split('T')[0])} · ${escapeHtml(tx.time || '')}</div>
        </td>
        <td class="py-3.5 px-4">
          <div class="font-semibold text-slate-900 text-sm">${escapeHtml(meta.realName)}</div>
          <div class="font-mono text-xs text-slate-500">${escapeHtml(tx.phone || '-')} ${u ? `· ${escapeHtml(u.package_level || 'LV0')}` : ''}</div>
        </td>
        <td class="py-3.5 px-4">
          <div class="text-xs font-medium text-slate-700">${escapeHtml(tx.method || 'Deposit')}</div>
          <div class="text-[11px] text-slate-400">${isAuto ? 'Automated Gateway' : 'Manual / Standard'}</div>
        </td>
        <td class="py-3.5 px-4 text-right font-mono font-semibold text-emerald-700 tabular-nums">${formatMoney(tx.amount)}</td>
        <td class="py-3.5 px-4">${renderStatusBadge(statusKey, isAuto && statusKey === 'approved')}</td>
        <td class="py-3.5 px-4 text-right">
          ${isExtraDeposit ? `<span class="text-[11px] font-mono text-slate-400">On-Chain Auto</span>` : `
          <div class="inline-flex items-center gap-1">
            <button type="button" onclick="handleRechargeAction('${tx.id}', 'approved')"
              class="px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${statusKey === 'approved' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'}">
              Approve
            </button>
            <button type="button" onclick="handleRechargeAction('${tx.id}', 'pending')"
              class="px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${statusKey === 'pending' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-700'}">
              Pending
            </button>
            <button type="button" onclick="handleRechargeAction('${tx.id}', 'rejected')"
              class="px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${statusKey === 'rejected' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-600'}">
              Reject
            </button>
          </div>`}
        </td>
      </tr>
    `;
  }).join('');
}

async function handleRechargeAction(txId, targetState) {
  const tx = allTransactions.find(t => String(t.id) === String(txId));
  if (!tx) return;

  const prevState = classifyStatus(tx.status);
  if (prevState === targetState) {
    showToast(`Recharge is already marked as ${targetState}.`);
    return;
  }

  const newStatusStr = targetState === 'approved'
    ? 'অনুমোদিত'
    : (targetState === 'rejected' ? 'বাতিল (Rejected)' : 'মুলতবি (Pending)');

  const amt = Number(tx.amount) || 0;
  const normPhone = normalizePhone(tx.phone);

  try {
    // 1. Update transaction status
    const { error: txErr } = await supabaseClient
      .from('transactions')
      .update({ status: newStatusStr, updated_at: new Date().toISOString() })
      .eq('id', tx.id);

    if (txErr) {
      showToast('Failed to update recharge status: ' + txErr.message, 'error');
      return;
    }

    // 2. Balance sync logic (prevent double crediting!)
    let balanceNote = '';
    if (normPhone && amt > 0) {
      const { data: userRow } = await supabaseClient
        .from('users')
        .select('*')
        .eq('phone', normPhone)
        .maybeSingle();

      if (userRow) {
        const curBal = Number(userRow.balance) || 0;
        const rawOpt = parseRawUserOpt(userRow);
        const curRechargeAmt = Number(rawOpt.recharge_amount) || 0;
        let nextBal = curBal;
        let nextRechargeAmt = curRechargeAmt;
        if (prevState !== 'approved' && targetState === 'approved') {
          nextBal = Number((curBal + amt).toFixed(2));
          nextRechargeAmt = Number((curRechargeAmt + amt).toFixed(2));
          balanceNote = ` (+${formatMoney(amt)} credited to user)`;
        } else if (prevState === 'approved' && targetState !== 'approved') {
          nextBal = Math.max(0, Number((curBal - amt).toFixed(2)));
          nextRechargeAmt = Math.max(0, Number((curRechargeAmt - amt).toFixed(2)));
          balanceNote = ` (-${formatMoney(amt)} reverted from balance)`;
        }

        if (nextBal !== curBal || nextRechargeAmt !== curRechargeAmt) {
          rawOpt.recharge_amount = nextRechargeAmt;
          await supabaseClient
            .from('users')
            .update({
              balance: nextBal,
              bkash_optional: JSON.stringify(rawOpt),
              updated_at: new Date().toISOString()
            })
            .eq('phone', normPhone);
        }
      }
    }

    showToast(`Recharge ${targetState.toUpperCase()}${balanceNote}`, 'success');
    await refreshAllData(false);
  } catch (err) {
    showToast('Error updating recharge: ' + (err.message || 'Unknown'), 'error');
  }
}

// ============================================================================
// WITHDRAWALS SECTION
// ============================================================================
function setWithdrawFilter(filter) {
  withdrawFilter = filter;
  document.querySelectorAll('.wd-filter-btn').forEach(btn => {
    const active = btn.dataset.filter === filter;
    btn.className = active
      ? 'wd-filter-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white cursor-pointer'
      : 'wd-filter-btn px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 cursor-pointer';
  });
  renderWithdrawalsTable();
}

function getUserPayoutSummary(tx, u) {
  const meta = parseUserMeta(u);
  const methodStr = String(tx.method || 'bKash');
  let targetWallet = '';
  let holderName = meta.realName;

  if (methodStr.toLowerCase().includes('usdt')) {
    targetWallet = meta.usdtAddress || '';
    holderName = meta.usdtName || meta.realName;
  } else if (methodStr.includes('নগদ') || methodStr.toLowerCase().includes('nagad')) {
    targetWallet = meta.nagadPhone || '';
    holderName = meta.nagadName || meta.realName;
  } else {
    targetWallet = u?.bkash_phone || '';
    holderName = u?.bkash_name || meta.realName;
  }

  // Extract inline account from tx.method if present e.g. "বিকাশ (017...)"
  const parenMatch = methodStr.match(/\(([^)]+)\)/);
  if (!targetWallet && parenMatch && parenMatch[1]) {
    targetWallet = parenMatch[1];
  }

  return { methodStr, targetWallet, holderName, meta };
}

function renderWithdrawalsTable() {
  const tbody = document.getElementById('withdrawals-table-body');
  if (!tbody) return;
  const q = (document.getElementById('withdraw-search-input')?.value || '').trim().toLowerCase();

  let list = getWithdrawalList();
  if (withdrawFilter === 'pending') list = list.filter(w => classifyStatus(w.status) === 'pending');
  else if (withdrawFilter === 'approved') list = list.filter(w => classifyStatus(w.status) === 'approved');
  else if (withdrawFilter === 'rejected') list = list.filter(w => classifyStatus(w.status) === 'rejected');
  else if (withdrawFilter === 'today') list = list.filter(w => isSameLocalDay(w.created_at || w.date));

  if (q) {
    list = list.filter(w => {
      const u = usersByPhone.get(normalizePhone(w.phone));
      const { targetWallet, holderName } = getUserPayoutSummary(w, u);
      return (
        String(w.phone || '').toLowerCase().includes(q) ||
        String(w.method || '').toLowerCase().includes(q) ||
        String(targetWallet || '').toLowerCase().includes(q) ||
        String(holderName || '').toLowerCase().includes(q)
      );
    });
  }

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="py-10 text-center text-xs text-slate-400">No withdrawal requests match this filter.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(tx => {
    const statusKey = classifyStatus(tx.status);
    const u = usersByPhone.get(normalizePhone(tx.phone));
    const { methodStr, targetWallet, holderName } = getUserPayoutSummary(tx, u);
    const netAmount = Number(tx.actual) || (Number(tx.amount) * 0.5);

    return `
      <tr class="hover:bg-slate-50 transition">
        <td class="py-3.5 px-4">
          <div class="font-mono text-xs text-slate-900">${escapeHtml(tx.date || (tx.created_at || '').split('T')[0])}</div>
          <div class="font-mono text-[11px] text-slate-400 mt-0.5">${escapeHtml(tx.time || '')}</div>
        </td>
        <td class="py-3.5 px-4">
          <div class="font-semibold text-slate-900 text-sm">${escapeHtml(holderName)}</div>
          <div class="font-mono text-xs text-slate-500">
            ${escapeHtml(tx.phone || '-')} ${u ? `· ${escapeHtml(u.package_level || 'LV0')} · Bal: ${formatMoney(u.balance)}` : ''}
          </div>
        </td>
        <td class="py-3.5 px-4">
          <div class="text-xs font-semibold text-slate-700">${escapeHtml(methodStr)}</div>
          <div class="flex items-center gap-1.5 mt-0.5">
            <span class="font-mono text-xs text-slate-700">${escapeHtml(targetWallet || 'Not bound')}</span>
            ${targetWallet ? `<button type="button" onclick="copyToClipboard('${escapeHtml(targetWallet)}', 'Wallet')" class="text-[11px] font-medium text-slate-500 hover:text-slate-900 underline cursor-pointer">Copy</button>` : ''}
          </div>
        </td>
        <td class="py-3.5 px-4 text-right">
          <div class="font-mono font-semibold text-slate-900 tabular-nums">${formatMoney(tx.amount)}</div>
          <div class="font-mono text-[11px] text-emerald-700 tabular-nums">Net: ${formatMoney(netAmount)} (${escapeHtml(tx.ratio || '50%')})</div>
        </td>
        <td class="py-3.5 px-4">${renderStatusBadge(statusKey)}</td>
        <td class="py-3.5 px-4 text-right">
          <div class="inline-flex items-center gap-1">
            <button type="button" onclick="openInspectModal('${tx.id}')"
              class="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 cursor-pointer">
              Info
            </button>
            <button type="button" onclick="handleWithdrawAction('${tx.id}', 'approved')"
              class="px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${statusKey === 'approved' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'}">
              Approve
            </button>
            <button type="button" onclick="handleWithdrawAction('${tx.id}', 'pending')"
              class="px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${statusKey === 'pending' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-700'}">
              Pending
            </button>
            <button type="button" onclick="handleWithdrawAction('${tx.id}', 'rejected')"
              class="px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${statusKey === 'rejected' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-600'}">
              Reject
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

async function handleWithdrawAction(txId, targetState) {
  const tx = allTransactions.find(t => String(t.id) === String(txId));
  if (!tx) return;

  const prevState = classifyStatus(tx.status);
  if (prevState === targetState) {
    showToast(`Withdrawal is already marked as ${targetState}.`);
    return;
  }

  const newStatusStr = targetState === 'approved'
    ? 'অনুমোদিত'
    : (targetState === 'rejected' ? 'বাতিল (Rejected)' : 'মুলতবি (Pending)');

  const amt = Number(tx.amount) || 0;
  const normPhone = normalizePhone(tx.phone);

  try {
    const { error: txErr } = await supabaseClient
      .from('transactions')
      .update({ status: newStatusStr, updated_at: new Date().toISOString() })
      .eq('id', tx.id);

    if (txErr) {
      showToast('Failed to update withdrawal: ' + txErr.message, 'error');
      return;
    }

    // Balance refund / re-deduct safety:
    // User balance was deducted upon withdrawal request submission.
    // Transitioning non-rejected -> rejected refunds `amt` back to user balance.
    // Transitioning rejected -> pending/approved re-deducts `amt`.
    let note = '';
    if (normPhone && amt > 0) {
      const { data: userRow } = await supabaseClient
        .from('users')
        .select('*')
        .eq('phone', normPhone)
        .maybeSingle();

      if (userRow) {
        const curBal = Number(userRow.balance) || 0;
        const rawOpt = parseRawUserOpt(userRow);
        const curCashoutAmt = Number(rawOpt.cashout_amount) || 0;
        let nextBal = curBal;
        let nextCashoutAmt = curCashoutAmt;
        if (prevState !== 'rejected' && targetState === 'rejected') {
          nextBal = Number((curBal + amt).toFixed(2));
          nextCashoutAmt = Math.max(0, Number((curCashoutAmt - amt).toFixed(2)));
          note = ` (+${formatMoney(amt)} refunded to user)`;
        } else if (prevState === 'rejected' && targetState !== 'rejected') {
          nextBal = Math.max(0, Number((curBal - amt).toFixed(2)));
          nextCashoutAmt = Number((curCashoutAmt + amt).toFixed(2));
          note = ` (-${formatMoney(amt)} re-deducted)`;
        }
        if (nextBal !== curBal || nextCashoutAmt !== curCashoutAmt) {
          rawOpt.cashout_amount = nextCashoutAmt;
          await supabaseClient
            .from('users')
            .update({
              balance: nextBal,
              bkash_optional: JSON.stringify(rawOpt),
              updated_at: new Date().toISOString()
            })
            .eq('phone', normPhone);
        }
      }
    }

    showToast(`Withdrawal marked ${targetState.toUpperCase()}${note}`, 'success');
    closeInspectModal();
    await refreshAllData(false);
  } catch (err) {
    showToast('Error updating withdrawal: ' + (err.message || 'Unknown'), 'error');
  }
}

function openInspectModal(txId) {
  const tx = allTransactions.find(t => String(t.id) === String(txId));
  if (!tx) return;
  const u = usersByPhone.get(normalizePhone(tx.phone));
  const { methodStr, targetWallet, holderName, meta } = getUserPayoutSummary(tx, u);
  const statusKey = classifyStatus(tx.status);
  const netAmount = Number(tx.actual) || (Number(tx.amount) * 0.5);

  const sub = document.getElementById('inspect-wd-subtitle');
  const body = document.getElementById('inspect-wd-body');
  if (sub) sub.textContent = `Tx #${tx.id} · ${tx.date || ''} ${tx.time || ''}`;
  if (body) {
    body.innerHTML = `
      <div class="grid grid-cols-2 gap-3 bg-slate-50 rounded-lg p-3.5">
        <div>
          <div class="text-[11px] uppercase text-slate-500 font-medium">Requested Amount</div>
          <div class="text-lg font-bold font-mono text-slate-900 tabular-nums mt-0.5">${formatMoney(tx.amount)}</div>
        </div>
        <div>
          <div class="text-[11px] uppercase text-slate-500 font-medium">Net Payable (${escapeHtml(tx.ratio || '50%')})</div>
          <div class="text-lg font-bold font-mono text-emerald-700 tabular-nums mt-0.5">${formatMoney(netAmount)}</div>
        </div>
      </div>

      <div class="space-y-2.5 rounded-lg p-3.5 bg-slate-50">
        <div class="flex justify-between text-xs"><span class="text-slate-500">Account Phone</span><span class="font-mono text-slate-900 font-semibold">${escapeHtml(tx.phone || '-')}</span></div>
        <div class="flex justify-between text-xs"><span class="text-slate-500">Full / Real Name</span><span class="text-slate-900 font-semibold">${escapeHtml(holderName)}</span></div>
        <div class="flex justify-between text-xs"><span class="text-slate-500">Member ID / Level</span><span class="font-mono text-slate-700">${escapeHtml(u?.member_id || '-')} · ${escapeHtml(u?.package_level || 'LV0')}</span></div>
        <div class="flex justify-between text-xs"><span class="text-slate-500">Current User Balance</span><span class="font-mono text-emerald-700 font-semibold">${u ? formatMoney(u.balance) : '-'}</span></div>
        <div class="flex justify-between text-xs"><span class="text-slate-500">Payout Channel</span><span class="text-slate-900 font-semibold">${escapeHtml(methodStr)}</span></div>
        <div class="flex justify-between items-center text-xs pt-2 border-t border-slate-200/70">
          <span class="text-slate-500">Destination Wallet</span>
          <span class="flex items-center gap-2 font-mono text-slate-900 font-bold">
            ${escapeHtml(targetWallet || 'Not Set')}
            ${targetWallet ? `<button type="button" onclick="copyToClipboard('${escapeHtml(targetWallet)}', 'Payout Account')" class="px-2 py-0.5 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-sans font-semibold cursor-pointer">Copy</button>` : ''}
          </span>
        </div>
        <div class="flex justify-between text-xs"><span class="text-slate-500">Bound bKash</span><span class="font-mono text-slate-700">${escapeHtml(u?.bkash_phone || '-')}</span></div>
        <div class="flex justify-between text-xs"><span class="text-slate-500">Bound Nagad</span><span class="font-mono text-slate-700">${escapeHtml(meta.nagadPhone || '-')}</span></div>
        <div class="flex justify-between text-xs"><span class="text-slate-500">Bound USDT BEP20</span><span class="font-mono text-slate-700 truncate max-w-[230px]">${escapeHtml(meta.usdtAddress || '-')}</span></div>
        <div class="flex justify-between text-xs"><span class="text-slate-500">Current Status</span><span>${renderStatusBadge(statusKey)}</span></div>
      </div>

      <div class="flex flex-wrap items-center justify-end gap-2 pt-2">
        <button type="button" onclick="handleWithdrawAction('${tx.id}', 'rejected')"
          class="px-3.5 py-2 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white text-xs font-semibold cursor-pointer">
          Reject &amp; Refund
        </button>
        <button type="button" onclick="handleWithdrawAction('${tx.id}', 'pending')"
          class="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer">
          Set Pending
        </button>
        <button type="button" onclick="handleWithdrawAction('${tx.id}', 'approved')"
          class="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer">
          Approve Payout
        </button>
      </div>
    `;
  }

  const modal = document.getElementById('inspect-withdraw-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeInspectModal() {
  const modal = document.getElementById('inspect-withdraw-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// ============================================================================
// USERS & BALANCES SECTION
// ============================================================================
function renderUsersTable() {
  const tbody = document.getElementById('users-table-body');
  if (!tbody) return;

  const q = (document.getElementById('user-search-input')?.value || '').trim().toLowerCase();
  const lvlFilter = document.getElementById('user-level-filter')?.value || 'ALL';

  let list = allUsers.slice();
  if (lvlFilter === 'TODAY') {
    list = list.filter(u => isSameLocalDay(u.created_at));
  } else if (lvlFilter !== 'ALL') {
    list = list.filter(u => String(u.package_level || 'LV0').toUpperCase() === lvlFilter);
  }

  if (q) {
    list = list.filter(u => {
      const meta = parseUserMeta(u);
      return (
        String(u.phone || '').toLowerCase().includes(q) ||
        String(u.account_number || '').toLowerCase().includes(q) ||
        String(u.member_id || '').toLowerCase().includes(q) ||
        String(u.invite_code || '').toLowerCase().includes(q) ||
        String(u.superior_id || '').toLowerCase().includes(q) ||
        String(meta.realName || '').toLowerCase().includes(q)
      );
    });
  }

  const countEl = document.getElementById('users-showing-count');
  if (countEl) countEl.textContent = list.length.toLocaleString('en-US');

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="py-10 text-center text-xs text-slate-400">No users matched your search.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(u => {
    const meta = parseUserMeta(u);
    const joinedDate = u.created_at ? new Date(u.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-';
    const payouts = [
      u.bkash_phone ? `bKash: ${u.bkash_phone}` : '',
      meta.nagadPhone ? `Nagad: ${meta.nagadPhone}` : '',
      meta.usdtAddress ? `USDT: ${meta.usdtAddress.slice(0, 8)}...` : ''
    ].filter(Boolean).join(' · ') || 'None';

    const isBanned = meta.accountStatus === 'banned';
    return `
      <tr class="hover:bg-slate-50 transition">
        <td class="py-3.5 px-4">
          <div class="flex items-center gap-2">
            <span class="font-semibold text-slate-900 text-sm">${escapeHtml(meta.realName)}</span>
            ${isBanned ? `<span class="text-[11px] font-semibold text-rose-600">Suspended</span>` : ''}
          </div>
          <div class="font-mono text-xs text-slate-500">${escapeHtml(u.phone || u.account_number || '-')}</div>
        </td>
        <td class="py-3.5 px-4 font-mono text-xs text-slate-600">
          <div>ID: <span class="text-slate-900 font-medium">${escapeHtml(u.member_id || '-')}</span></div>
          <div class="text-[11px] text-slate-400">Ref: ${escapeHtml(u.invite_code || '-')} · Sup: ${escapeHtml(u.superior_id || '11')}</div>
        </td>
        <td class="py-3.5 px-4">
          <span class="font-mono text-xs font-semibold ${u.package_level && u.package_level !== 'LV0' ? 'text-slate-900' : 'text-slate-400'}">${escapeHtml(u.package_level || 'LV0')}</span>
        </td>
        <td class="py-3.5 px-4 text-right font-mono font-semibold text-emerald-700 tabular-nums">${formatMoney(u.balance)}</td>
        <td class="py-3.5 px-4 text-xs text-slate-600 font-mono max-w-[220px] truncate" title="${escapeHtml(payouts)}">${escapeHtml(payouts)}</td>
        <td class="py-3.5 px-4 text-xs text-slate-500 font-mono">${escapeHtml(joinedDate)}</td>
        <td class="py-3.5 px-4 text-right">
          <button type="button" onclick="openEditUserModal('${escapeHtml(u.phone)}')"
            class="px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-900 text-slate-700 hover:text-white text-xs font-semibold transition cursor-pointer">
            Control
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function openEditUserModal(phoneKey) {
  const norm = normalizePhone(phoneKey);
  const u = usersByPhone.get(norm) || allUsers.find(x => String(x.phone) === String(phoneKey));
  if (!u) return;

  const meta = parseUserMeta(u);
  document.getElementById('edit-user-phone-key').value = u.phone;
  document.getElementById('edit-user-subtitle').textContent = `Phone: ${u.phone} · Member ID: ${u.member_id || '-'}`;
  document.getElementById('edit-user-balance').value = Number(u.balance || 0).toFixed(2);
  document.getElementById('edit-user-level').value = u.package_level || 'LV0';
  document.getElementById('edit-user-name').value = meta.realName || u.name || '';
  document.getElementById('edit-user-superior').value = u.superior_id || '';
  document.getElementById('edit-user-status').value = meta.accountStatus || 'active';
  document.getElementById('edit-user-password').value = u.plain_password || '';
  document.getElementById('edit-user-fundpass').value = meta.fundPassword || '';
  document.getElementById('edit-user-bkash-phone').value = u.bkash_phone || '';
  document.getElementById('edit-user-bkash-name').value = u.bkash_name || '';
  document.getElementById('edit-user-nagad-phone').value = meta.nagadPhone || '';
  document.getElementById('edit-user-usdt-address').value = meta.usdtAddress || '';

  const modal = document.getElementById('edit-user-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeEditUserModal() {
  const modal = document.getElementById('edit-user-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function quickBumpBalance(delta) {
  const inp = document.getElementById('edit-user-balance');
  if (!inp) return;
  const cur = parseFloat(inp.value) || 0;
  inp.value = Math.max(0, cur + delta).toFixed(2);
}

async function handleSaveUserForm(e) {
  e.preventDefault();
  const phoneKey = document.getElementById('edit-user-phone-key').value;
  const existing = usersByPhone.get(normalizePhone(phoneKey)) || allUsers.find(x => x.phone === phoneKey);
  if (!existing) return;

  const existingMeta = parseUserMeta(existing);
  const rawOpt = parseRawUserOpt(existing);
  const newName = document.getElementById('edit-user-name').value.trim() || 'Member';
  const newPlainPass = document.getElementById('edit-user-password').value.trim();

  const updatedMeta = Object.assign({}, rawOpt, {
    nagad_name: existingMeta.nagadName || newName,
    nagad_phone: document.getElementById('edit-user-nagad-phone').value.trim(),
    usdt_name: existingMeta.usdtName || newName,
    usdt_address: document.getElementById('edit-user-usdt-address').value.trim(),
    real_name: newName,
    fund_password: document.getElementById('edit-user-fundpass').value.trim(),
    account_status: document.getElementById('edit-user-status').value || 'active'
  });

  const payload = {
    name: newName,
    balance: parseFloat(document.getElementById('edit-user-balance').value) || 0,
    package_level: document.getElementById('edit-user-level').value || 'LV0',
    superior_id: document.getElementById('edit-user-superior').value.trim() || '11',
    plain_password: newPlainPass,
    bkash_phone: document.getElementById('edit-user-bkash-phone').value.trim(),
    bkash_name: document.getElementById('edit-user-bkash-name').value.trim(),
    bkash_optional: JSON.stringify(updatedMeta),
    updated_at: new Date().toISOString()
  };

  // Update password_hash too if admin changed plain_password
  if (newPlainPass && newPlainPass !== existing.plain_password) {
    payload.password_hash = await sha256(newPlainPass);
  }

  try {
    const { error } = await supabaseClient
      .from('users')
      .update(payload)
      .eq('phone', existing.phone);

    if (error) {
      showToast('Failed to update user: ' + error.message, 'error');
      return;
    }

    showToast(`Updated account ${existing.phone} successfully.`, 'success');
    closeEditUserModal();
    await refreshAllData(false);
  } catch (err) {
    showToast('Error saving user: ' + (err.message || 'Unknown'), 'error');
  }
}

async function deleteEditedUser() {
  const phoneKey = document.getElementById('edit-user-phone-key').value;
  if (!phoneKey) return;
  if (!confirm(`Permanently delete user account ${phoneKey}? This cannot be undone.`)) return;

  try {
    const { error } = await supabaseClient
      .from('users')
      .delete()
      .eq('phone', phoneKey);

    if (error) {
      showToast('Delete failed: ' + error.message, 'error');
      return;
    }

    showToast(`Account ${phoneKey} deleted.`, 'success');
    closeEditUserModal();
    await refreshAllData(false);
  } catch (err) {
    showToast('Error deleting user: ' + (err.message || 'Unknown'), 'error');
  }
}

// ============================================================================
// MANUAL RECHARGE / CREDIT MODAL
// ============================================================================
function openManualAdjustModal() {
  const modal = document.getElementById('manual-adjust-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeManualAdjustModal() {
  const modal = document.getElementById('manual-adjust-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

async function handleManualAdjustSubmit(e) {
  e.preventDefault();
  const rawPhone = document.getElementById('manual-user-phone').value.trim();
  const normPhone = normalizePhone(rawPhone);
  const amount = parseFloat(document.getElementById('manual-amount').value) || 0;
  const method = document.getElementById('manual-method').value;

  if (!normPhone || amount <= 0) {
    showToast('Please enter a valid user phone and positive amount.', 'error');
    return;
  }

  try {
    const { data: userRow, error: findErr } = await supabaseClient
      .from('users')
      .select('*')
      .eq('phone', normPhone)
      .maybeSingle();

    if (findErr || !userRow) {
      showToast(`User ${normPhone} not found in database.`, 'error');
      return;
    }

    const nextBalance = (Number(userRow.balance) || 0) + amount;
    const now = new Date();
    const orderId = 'ADM' + Date.now();

    const { error: uErr } = await supabaseClient
      .from('users')
      .update({ balance: nextBalance, updated_at: now.toISOString() })
      .eq('phone', normPhone);

    if (uErr) {
      showToast('Failed to update balance: ' + uErr.message, 'error');
      return;
    }

    await supabaseClient.from('transactions').insert({
      phone: normPhone,
      type: 'deposit',
      amount: amount,
      actual: amount,
      ratio: '100%',
      status: 'অনুমোদিত',
      method: method,
      order_id: orderId,
      out_trade_no: orderId,
      date: getTodayDateString(),
      time: now.toTimeString().split(' ')[0],
      created_at: now.toISOString()
    });

    showToast(`Credited ${formatMoney(amount)} to ${normPhone}.`, 'success');
    document.getElementById('manual-adjust-form').reset();
    closeManualAdjustModal();
    await refreshAllData(false);
  } catch (err) {
    showToast('Manual recharge error: ' + (err.message || 'Unknown'), 'error');
  }
}

// ============================================================================
// COMMISSIONS / REBATES SECTION
// ============================================================================
function renderCommissionsTable() {
  const tbody = document.getElementById('commissions-table-body');
  if (!tbody) return;
  const q = (document.getElementById('commission-search-input')?.value || '').trim().toLowerCase();

  let list = getCommissionList();
  if (q) {
    list = list.filter(c =>
      String(c.phone || '').toLowerCase().includes(q) ||
      String(c.method || '').toLowerCase().includes(q)
    );
  }

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="py-10 text-center text-xs text-slate-400">No commission records found.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(tx => `
    <tr class="hover:bg-slate-50 transition">
      <td class="py-3 px-4 font-mono text-xs text-slate-500">${escapeHtml(tx.date || '')} · ${escapeHtml(tx.time || '')}</td>
      <td class="py-3 px-4 font-mono text-xs font-semibold text-slate-900">${escapeHtml(tx.phone || '-')}</td>
      <td class="py-3 px-4 text-xs text-slate-600">${escapeHtml(tx.method || 'Team Commission')}</td>
      <td class="py-3 px-4 text-right font-mono font-semibold text-emerald-700 tabular-nums">${formatMoney(tx.amount)}</td>
      <td class="py-3 px-4">${renderStatusBadge(classifyStatus(tx.status))}</td>
    </tr>
  `).join('');
}

// ============================================================================
// SETTINGS & CSV EXPORTS
// ============================================================================
async function handleCredentialsSave(e) {
  e.preventDefault();
  const username = document.getElementById('settings-admin-username').value.trim();
  const newPass = document.getElementById('settings-admin-password').value;
  if (!username) return;

  const existing = await getStoredAdminCreds();
  const updated = {
    username: username,
    passwordHash: newPass ? await sha256(newPass) : existing.passwordHash
  };
  localStorage.setItem(STORAGE_KEYS.ADMIN_CREDS, JSON.stringify(updated));
  document.getElementById('settings-admin-password').value = '';
  document.getElementById('sidebar-admin-name').textContent = username;
  showToast('Admin credentials updated.', 'success');
}

function handleDbConfigSave(e) {
  e.preventDefault();
  const url = document.getElementById('settings-sb-url').value.trim();
  const key = document.getElementById('settings-sb-key').value.trim();
  if (!url || !key) return;
  localStorage.setItem(STORAGE_KEYS.SB_CONFIG, JSON.stringify({ url, key }));
  initSupabaseClient();
  refreshAllData(true);
}

function resetDatabaseDefaults() {
  localStorage.removeItem(STORAGE_KEYS.SB_CONFIG);
  initSupabaseClient();
  refreshAllData(true);
}

function exportCsv(kind) {
  let rows = [];
  let filename = 'export.csv';

  if (kind === 'users') {
    filename = `users-${getTodayDateString()}.csv`;
    rows.push(['Phone', 'Name', 'MemberID', 'PackageLevel', 'Balance', 'InviteCode', 'SuperiorID', 'bKash', 'Nagad', 'USDT', 'JoinedAt']);
    allUsers.forEach(u => {
      const m = parseUserMeta(u);
      rows.push([u.phone, m.realName, u.member_id, u.package_level, u.balance, u.invite_code, u.superior_id, u.bkash_phone || '', m.nagadPhone || '', m.usdtAddress || '', u.created_at]);
    });
  } else {
    const typeFilter = kind === 'withdraw' ? 'withdraw' : 'deposit';
    filename = `${typeFilter}s-${getTodayDateString()}.csv`;
    rows.push(['ID', 'Phone', 'Type', 'Amount', 'Net', 'Method', 'OrderID', 'Status', 'Date', 'Time']);
    const list = typeFilter === 'withdraw' ? getWithdrawalList() : getRechargeList();
    list.forEach(tx => {
      rows.push([tx.id, tx.phone, tx.type, tx.amount, tx.actual, tx.method, tx.order_id || '', tx.status, tx.date || '', tx.time || '']);
    });
  }

  const csvContent = rows.map(r => r.map(v => `"${String(v == null ? '' : v).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

// ============================================================================
// PLATFORM CONTROLS (SYNCED TO LIVE WEBSITE)
// ============================================================================
const DEFAULT_PLATFORM_CONTROLS = {
  withdrawEnabled: true,
  minWithdraw: 700,
  withdrawNetPercent: 50,
  minRecharge: 300,
  usdtRate: 125,
  usdtAddress: '0x74826F93F58Ae127FB6a77bFEFC5841B61bBDb16',
  telegramUrl: 'https://t.me/PW_Official_Manager_BD',
  managerId: '#PW-MANAGER-8802'
};

const PACKAGE_LEVEL_KEYS = ['LV0', 'LV1', 'LV2', 'LV3', 'LV4', 'LV5', 'LV6'];

const DEFAULT_PACKAGE_CONFIGS = {
  LV0: { count: 5, reward: 20, price: 0, nameBn: 'ফ্রি স্তর', nameEn: 'Free Tier', nameHi: 'निःशुल्क स्तर' },
  LV1: { count: 6, reward: 30, price: 3500, nameBn: 'বেসিক প্যাকেজ', nameEn: 'Basic Package', nameHi: 'बेसिक पैकेज' },
  LV2: { count: 12, reward: 40, price: 7500, nameBn: 'স্ট্যান্ডার্ড প্যাকেজ', nameEn: 'Standard Package', nameHi: 'स्टैंडर्ड पैकेज' },
  LV3: { count: 15, reward: 50, price: 36000, nameBn: 'সিলভার প্যাকেজ', nameEn: 'Silver Package', nameHi: 'सिल्वर पैकेज' },
  LV4: { count: 25, reward: 60, price: 84000, nameBn: 'গোল্ড প্যাকেজ', nameEn: 'Gold Package', nameHi: 'गोल्ड पैकेज' },
  LV5: { count: 35, reward: 70, price: 150000, nameBn: 'প্রিমিয়াম প্যাকেজ', nameEn: 'Premium Package', nameHi: 'प्रीमियम पैकेज' },
  LV6: { count: 50, reward: 100, price: 300000, nameBn: 'এলিট প্যাকেজ', nameEn: 'Elite Package', nameHi: 'एलीट पैकेज' }
};

let latestSystemConfig = Object.assign({}, DEFAULT_PLATFORM_CONTROLS, {
  packages: cloneDefaultPackages()
});

function cloneDefaultPackages() {
  const out = {};
  PACKAGE_LEVEL_KEYS.forEach(lvl => {
    out[lvl] = Object.assign({}, DEFAULT_PACKAGE_CONFIGS[lvl]);
  });
  return out;
}

function normalizePackagesMap(rawPackages) {
  const out = cloneDefaultPackages();
  if (!rawPackages || typeof rawPackages !== 'object') return out;
  PACKAGE_LEVEL_KEYS.forEach(lvl => {
    const src = rawPackages[lvl];
    if (!src || typeof src !== 'object') return;
    const def = DEFAULT_PACKAGE_CONFIGS[lvl];
    const parsedCount = parseInt(src.count, 10);
    const parsedReward = parseFloat(src.reward);
    const parsedPrice = parseFloat(src.price);
    out[lvl] = {
      count: Number.isFinite(parsedCount) && parsedCount >= 1 ? parsedCount : def.count,
      reward: Number.isFinite(parsedReward) && parsedReward >= 0 ? parsedReward : def.reward,
      price: Number.isFinite(parsedPrice) && parsedPrice >= 0 ? parsedPrice : def.price,
      nameBn: String(src.nameBn || '').trim() || def.nameBn,
      nameEn: String(src.nameEn || '').trim() || def.nameEn,
      nameHi: String(src.nameHi || '').trim() || def.nameHi
    };
  });
  return out;
}

function syncEditUserPackageOptions(packagesObj) {
  const selectEl = document.getElementById('edit-user-level');
  if (!selectEl) return;
  const currentVal = selectEl.value;
  const pkgs = normalizePackagesMap(packagesObj);
  PACKAGE_LEVEL_KEYS.forEach(lvl => {
    const opt = selectEl.querySelector(`option[value="${lvl}"]`);
    if (!opt) return;
    const pkg = pkgs[lvl];
    const priceLabel = Number(pkg.price) === 0 ? 'Free' : `৳${Number(pkg.price).toLocaleString()}`;
    opt.textContent = `${lvl} (${pkg.nameEn} - ${priceLabel})`;
  });
  if (currentVal) selectEl.value = currentVal;
}

function renderPackageConfigEditor(packagesObj) {
  const container = document.getElementById('package-configs-editor');
  if (!container) return;
  const pkgs = normalizePackagesMap(packagesObj);

  container.innerHTML = PACKAGE_LEVEL_KEYS.map(lvl => {
    const p = pkgs[lvl];
    const dailyIncome = Number((p.count * p.reward).toFixed(2));
    const badgeColor = lvl === 'LV0'
      ? 'bg-sky-50 text-sky-700 border-sky-200'
      : 'bg-slate-100 text-slate-800 border-slate-200';

    return `
      <div class="rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5 space-y-3" data-pkg-row="${lvl}">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-md border text-xs font-bold font-mono ${badgeColor}">${lvl}</span>
            <span class="text-xs font-semibold text-slate-700">${escapeHtml(p.nameBn)} · ${escapeHtml(p.nameEn)}</span>
          </div>
          <div class="text-xs font-medium text-slate-500">
            দৈনিক আয় (Daily Income):
            <span class="font-mono font-bold text-emerald-700" data-pkg-income="${lvl}">৳${dailyIncome.toLocaleString('en-US', { minimumFractionDigits: dailyIncome % 1 ? 2 : 0, maximumFractionDigits: 2 })}</span>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-[11px] font-medium text-slate-600 mb-1">দৈনিক কর্ম (Daily Tasks)</label>
            <input type="number" min="1" step="1" required
              data-pkg-level="${lvl}" data-pkg-field="count" value="${p.count}"
              class="pkg-cfg-input w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-mono font-semibold text-slate-900 focus:outline-none focus:border-slate-400" />
          </div>
          <div>
            <label class="block text-[11px] font-medium text-slate-600 mb-1">প্রতি কাজের এমাউন্ট (Per-Task Amount ৳)</label>
            <input type="number" min="0" step="0.01" required
              data-pkg-level="${lvl}" data-pkg-field="reward" value="${p.reward}"
              class="pkg-cfg-input w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-mono font-semibold text-slate-900 focus:outline-none focus:border-slate-400" />
          </div>
          <div>
            <label class="block text-[11px] font-medium text-slate-600 mb-1">প্যাকেজ দাম (Package Price ৳)</label>
            <input type="number" min="0" step="1" required
              data-pkg-level="${lvl}" data-pkg-field="price" value="${p.price}"
              class="pkg-cfg-input w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-mono font-semibold text-slate-900 focus:outline-none focus:border-slate-400" />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-[11px] font-medium text-slate-600 mb-1">বাংলা নাম (Bangla)</label>
            <input type="text" required
              data-pkg-level="${lvl}" data-pkg-field="nameBn" value="${escapeHtml(p.nameBn)}"
              class="pkg-cfg-input w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-slate-400" />
          </div>
          <div>
            <label class="block text-[11px] font-medium text-slate-600 mb-1">English Name</label>
            <input type="text" required
              data-pkg-level="${lvl}" data-pkg-field="nameEn" value="${escapeHtml(p.nameEn)}"
              class="pkg-cfg-input w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-slate-400" />
          </div>
          <div>
            <label class="block text-[11px] font-medium text-slate-600 mb-1">हिन्दी नाम (Hindi)</label>
            <input type="text" required
              data-pkg-level="${lvl}" data-pkg-field="nameHi" value="${escapeHtml(p.nameHi)}"
              class="pkg-cfg-input w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-slate-400" />
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.pkg-cfg-input').forEach(inp => {
    inp.addEventListener('input', () => {
      const lvl = inp.dataset.pkgLevel;
      if (!lvl) return;
      const countInp = container.querySelector(`[data-pkg-level="${lvl}"][data-pkg-field="count"]`);
      const rewardInp = container.querySelector(`[data-pkg-level="${lvl}"][data-pkg-field="reward"]`);
      const incEl = container.querySelector(`[data-pkg-income="${lvl}"]`);
      if (incEl && countInp && rewardInp) {
        const c = Math.max(0, parseInt(countInp.value || '0', 10) || 0);
        const r = Math.max(0, parseFloat(rewardInp.value || '0') || 0);
        const inc = Number((c * r).toFixed(2));
        incEl.textContent = `৳${inc.toLocaleString('en-US', { minimumFractionDigits: inc % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;
      }
    });
  });
}

function collectPackagesFromForm() {
  const container = document.getElementById('package-configs-editor');
  if (!container) return latestSystemConfig.packages || cloneDefaultPackages();
  const out = {};
  PACKAGE_LEVEL_KEYS.forEach(lvl => {
    const def = DEFAULT_PACKAGE_CONFIGS[lvl];
    const getVal = field => {
      const el = container.querySelector(`[data-pkg-level="${lvl}"][data-pkg-field="${field}"]`);
      return el ? el.value : '';
    };
    const countVal = parseInt(getVal('count'), 10);
    const rewardVal = parseFloat(getVal('reward'));
    const priceVal = parseFloat(getVal('price'));
    out[lvl] = {
      count: Number.isFinite(countVal) && countVal >= 1 ? countVal : def.count,
      reward: Number.isFinite(rewardVal) && rewardVal >= 0 ? rewardVal : def.reward,
      price: Number.isFinite(priceVal) && priceVal >= 0 ? priceVal : def.price,
      nameBn: String(getVal('nameBn')).trim() || def.nameBn,
      nameEn: String(getVal('nameEn')).trim() || def.nameEn,
      nameHi: String(getVal('nameHi')).trim() || def.nameHi
    };
  });
  return out;
}

function resetPackageConfigsToDefault() {
  renderPackageConfigEditor(DEFAULT_PACKAGE_CONFIGS);
  showToast('Default package values loaded in form. Click "Save Package & Task Settings" to apply live.', 'success');
}

function hydratePlatformControlsForm(sysRow) {
  let parsed = {};
  if (sysRow && sysRow.bkash_optional) {
    try {
      parsed = typeof sysRow.bkash_optional === 'string'
        ? JSON.parse(sysRow.bkash_optional)
        : sysRow.bkash_optional;
    } catch (e) {}
  }
  const normalizedPkgs = normalizePackagesMap(parsed.packages);
  const cfg = Object.assign({}, DEFAULT_PLATFORM_CONTROLS, parsed, { packages: normalizedPkgs });
  latestSystemConfig = cfg;

  const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
  setVal('pc-withdraw-enabled', cfg.withdrawEnabled === false ? 'false' : 'true');
  setVal('pc-min-withdraw', cfg.minWithdraw);
  setVal('pc-withdraw-ratio', cfg.withdrawNetPercent);
  setVal('pc-min-recharge', cfg.minRecharge);
  setVal('pc-usdt-rate', cfg.usdtRate);
  setVal('pc-usdt-address', cfg.usdtAddress);
  setVal('pc-telegram-url', cfg.telegramUrl);
  setVal('pc-manager-id', cfg.managerId);

  renderPackageConfigEditor(normalizedPkgs);
  syncEditUserPackageOptions(normalizedPkgs);
}

async function saveSystemConfigPayload(configObj, successMsg) {
  try {
    const { error } = await supabaseClient.from('users').upsert({
      phone: 'SYSTEM_CONFIG',
      account_number: 'SYSTEM_CONFIG',
      name: 'Platform Configuration',
      member_id: 'SYSCONFIG',
      package_level: 'LV0',
      balance: 0,
      bkash_optional: JSON.stringify(configObj),
      updated_at: new Date().toISOString()
    }, { onConflict: 'phone' });

    if (error) {
      showToast('Failed to save configuration: ' + error.message, 'error');
      return false;
    }

    latestSystemConfig = configObj;
    showToast(successMsg, 'success');
    await refreshAllData(false);
    return true;
  } catch (err) {
    showToast('Error saving configuration: ' + (err.message || 'Unknown'), 'error');
    return false;
  }
}

async function handlePlatformControlsSave(e) {
  e.preventDefault();
  const configObj = Object.assign({}, latestSystemConfig, {
    withdrawEnabled: document.getElementById('pc-withdraw-enabled').value !== 'false',
    minWithdraw: parseFloat(document.getElementById('pc-min-withdraw').value) || 700,
    withdrawNetPercent: parseFloat(document.getElementById('pc-withdraw-ratio').value) || 50,
    minRecharge: parseFloat(document.getElementById('pc-min-recharge').value) || 300,
    usdtRate: parseFloat(document.getElementById('pc-usdt-rate').value) || 125,
    usdtAddress: document.getElementById('pc-usdt-address').value.trim(),
    telegramUrl: document.getElementById('pc-telegram-url').value.trim(),
    managerId: document.getElementById('pc-manager-id').value.trim(),
    packages: normalizePackagesMap(latestSystemConfig.packages)
  });

  await saveSystemConfigPayload(configObj, 'Platform rules saved and synced to live website.');
}

async function handlePackageControlsSave(e) {
  e.preventDefault();
  const packagesObj = collectPackagesFromForm();
  const configObj = Object.assign({}, DEFAULT_PLATFORM_CONTROLS, latestSystemConfig, {
    packages: packagesObj
  });

  await saveSystemConfigPayload(configObj, 'Packages, daily tasks, amounts & language names saved live!');
}

// ============================================================================
// NAVIGATION & INIT
// ============================================================================
const SECTION_TITLES = {
  overview: 'Overview Dashboard',
  recharges: 'Recharge Control & Auto-Payments',
  withdrawals: 'Withdrawal Requests & Payouts',
  users: 'User Directory & Balance Control',
  commissions: 'Team Rebates & Commissions',
  platform: 'Platform Rules & Packages',
  settings: 'System & Connection Settings'
};

function switchSection(section) {
  currentSection = section;
  Object.keys(SECTION_TITLES).forEach(key => {
    const el = document.getElementById(`section-${key}`);
    if (el) el.classList.toggle('hidden', key !== section);
  });

  document.querySelectorAll('.nav-item').forEach(btn => {
    const active = btn.dataset.nav === section;
    btn.className = active
      ? 'nav-item w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold text-slate-900 bg-slate-100 transition cursor-pointer'
      : 'nav-item w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition cursor-pointer';
  });

  const titleEl = document.getElementById('topbar-title');
  if (titleEl) titleEl.textContent = SECTION_TITLES[section] || 'Admin Console';

  toggleMobileSidebar(false);
}

function toggleMobileSidebar(open) {
  const sidebar = document.getElementById('admin-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (!sidebar || !backdrop) return;
  if (open) {
    sidebar.classList.remove('-translate-x-full');
    backdrop.classList.remove('hidden');
  } else {
    sidebar.classList.add('-translate-x-full');
    backdrop.classList.add('hidden');
  }
}

async function enterAdminShell(username) {
  document.getElementById('admin-login-screen')?.classList.add('hidden');
  document.getElementById('admin-app-shell')?.classList.remove('hidden');

  const creds = await getStoredAdminCreds();
  const displayUser = username || creds.username || 'admin';
  const sideName = document.getElementById('sidebar-admin-name');
  if (sideName) sideName.textContent = displayUser;
  const setUserInp = document.getElementById('settings-admin-username');
  if (setUserInp) setUserInp.value = creds.username;

  renderPackageConfigEditor(latestSystemConfig.packages);
  syncEditUserPackageOptions(latestSystemConfig.packages);
  initSupabaseClient();
  await refreshAllData(false);

  if (autoRefreshTimer) clearInterval(autoRefreshTimer);
  autoRefreshTimer = setInterval(() => {
    if (isAuthenticated()) refreshAllData(false);
  }, 15000);
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('admin-login-form')?.addEventListener('submit', handleLoginSubmit);
  document.getElementById('edit-user-form')?.addEventListener('submit', handleSaveUserForm);
  document.getElementById('manual-adjust-form')?.addEventListener('submit', handleManualAdjustSubmit);
  document.getElementById('platform-controls-form')?.addEventListener('submit', handlePlatformControlsSave);
  document.getElementById('package-controls-form')?.addEventListener('submit', handlePackageControlsSave);
  document.getElementById('settings-credentials-form')?.addEventListener('submit', handleCredentialsSave);
  document.getElementById('settings-db-form')?.addEventListener('submit', handleDbConfigSave);

  if (isAuthenticated()) {
    try {
      const sess = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.AUTH_SESSION) || localStorage.getItem(STORAGE_KEYS.AUTH_SESSION));
      enterAdminShell(sess.username);
    } catch (e) {
      enterAdminShell('admin');
    }
  }
});

// Expose inline handlers on window cleanly
window.switchSection = switchSection;
window.toggleMobileSidebar = toggleMobileSidebar;
window.refreshAllData = refreshAllData;
window.adminSignOut = adminSignOut;
window.setRechargeFilter = setRechargeFilter;
window.renderRechargesTable = renderRechargesTable;
window.handleRechargeAction = handleRechargeAction;
window.setWithdrawFilter = setWithdrawFilter;
window.renderWithdrawalsTable = renderWithdrawalsTable;
window.handleWithdrawAction = handleWithdrawAction;
window.openInspectModal = openInspectModal;
window.closeInspectModal = closeInspectModal;
window.renderUsersTable = renderUsersTable;
window.openEditUserModal = openEditUserModal;
window.closeEditUserModal = closeEditUserModal;
window.quickBumpBalance = quickBumpBalance;
window.deleteEditedUser = deleteEditedUser;
window.openManualAdjustModal = openManualAdjustModal;
window.closeManualAdjustModal = closeManualAdjustModal;
window.renderCommissionsTable = renderCommissionsTable;
window.resetPackageConfigsToDefault = resetPackageConfigsToDefault;
window.resetDatabaseDefaults = resetDatabaseDefaults;
window.exportCsv = exportCsv;
window.copyToClipboard = copyToClipboard;
