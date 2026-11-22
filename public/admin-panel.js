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
  return '$' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
    accountStatus: opt.account_status || 'active',
    frozenBalance: Number(opt.frozen_balance) || 0
  };
}

function classifyStatus(rawStatus) {
  const s = String(rawStatus || '').trim().toLowerCase();
  if (
    s.includes('অসফল') ||
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

let _isRefreshingData = false;
let _pendingRefreshAfterCurrent = false;
let _realtimeRefreshTimer = null;

function isAdminFormFocused() {
  const active = document.activeElement;
  if (!active) return false;
  const tag = String(active.tagName || '').toUpperCase();
  if (tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT') return false;
  return Boolean(active.closest('#package-controls-form, #platform-controls-form, #salary-page-form, #edit-user-modal, #manual-adjust-modal'));
}

function scheduleRealtimeRefresh() {
  if (_realtimeRefreshTimer) clearTimeout(_realtimeRefreshTimer);
  _realtimeRefreshTimer = setTimeout(() => {
    _realtimeRefreshTimer = null;
    if (!isAuthenticated()) return;
    if (isAdminFormFocused()) return;
    refreshAllData(false);
  }, 1500);
}

function setupRealtimeSubscriptions() {
  if (!supabaseClient) return;
  if (realtimeChannel) {
    try { supabaseClient.removeChannel(realtimeChannel); } catch (e) {}
  }
  try {
    realtimeChannel = supabaseClient
      .channel('admin-live-feed')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, scheduleRealtimeRefresh)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, scheduleRealtimeRefresh)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'deposits' }, scheduleRealtimeRefresh)
      .subscribe();
  } catch (e) {}
}

// ============================================================================
// DATA FETCHING & KPI CALCULATIONS
// ============================================================================
async function refreshAllData(showFeedback = false) {
  if (!supabaseClient) initSupabaseClient();
  if (!supabaseClient) return;
  if (_isRefreshingData) {
    _pendingRefreshAfterCurrent = true;
    return;
  }

  _isRefreshingData = true;
  const icon = document.getElementById('refresh-icon');
  if (icon) icon.classList.add('animate-spin');

  try {
    const [usersRes, sysRes, txRes, depRes] = await Promise.all([
      Promise.resolve(supabaseClient.from('users').select('*').order('created_at', { ascending: false }).limit(2000)).catch(err => ({ data: null, error: err })),
      Promise.resolve(supabaseClient.from('users').select('*').eq('phone', 'SYSTEM_CONFIG').maybeSingle()).catch(() => ({ data: null, error: null })),
      Promise.resolve(supabaseClient.from('transactions').select('*').order('created_at', { ascending: false }).limit(2000)).catch(err => ({ data: null, error: err })),
      Promise.resolve(supabaseClient.from('deposits').select('*').order('created_at', { ascending: false }).limit(500)).catch(() => ({ data: null, error: null }))
    ]);

    if (usersRes.error) {
      console.error('Users fetch error:', usersRes.error);
      showToast('Failed to fetch users: ' + usersRes.error.message, 'error');
    } else {
      const rawUsers = Array.isArray(usersRes.data) ? usersRes.data : [];
      const sysConfigRow = (sysRes && !sysRes.error && sysRes.data)
        ? sysRes.data
        : rawUsers.find(u => String(u.phone) === 'SYSTEM_CONFIG');
      hydratePlatformControlsForm(sysConfigRow);

      allUsers = rawUsers.filter(u => String(u.phone) !== 'SYSTEM_CONFIG');
      usersByPhone = new Map();
      allUsers.forEach(u => {
        const p = normalizePhone(u.phone || u.account_number);
        if (p) usersByPhone.set(p, u);
      });
    }

    if (txRes.error) {
      console.error('Transactions fetch error:', txRes.error);
      showToast('Failed to fetch transactions: ' + txRes.error.message, 'error');
    } else {
      allTransactions = Array.isArray(txRes.data) ? txRes.data : [];
    }

    if (depRes && !depRes.error && Array.isArray(depRes.data)) {
      allExtraDeposits = depRes.data;
    }

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
    _isRefreshingData = false;
    if (_pendingRefreshAfterCurrent) {
      _pendingRefreshAfterCurrent = false;
      setTimeout(() => { if (isAuthenticated()) refreshAllData(false); }, 600);
    }
  }
}

function getRechargeStatusPriority(rawStatus) {
  const k = classifyStatus(rawStatus);
  if (k === 'approved') return 3;
  if (k === 'rejected') return 2;
  return 1;
}

function getRechargeList() {
  const txDeposits = allTransactions.filter(t => String(t.type || '').toLowerCase() === 'deposit');
  // Deduplicate rows sharing the same order_id / out_trade_no, preferring approved > rejected > pending and non-zero amount
  const dedupMap = new Map();
  txDeposits.forEach(t => {
    const key = String(t.order_id || t.out_trade_no || t.id || '');
    if (!key) return;
    const prev = dedupMap.get(key);
    if (!prev) {
      dedupMap.set(key, Object.assign({}, t));
      return;
    }
    const curPrio = getRechargeStatusPriority(t.status);
    const prevPrio = getRechargeStatusPriority(prev.status);
    const pickCur = curPrio > prevPrio || (curPrio === prevPrio && (Number(t.amount) || 0) > (Number(prev.amount) || 0));
    const winner = pickCur ? Object.assign({}, prev, t) : Object.assign({}, t, prev);
    if ((Number(winner.amount) || 0) <= 0) {
      winner.amount = Math.max(Number(t.amount) || 0, Number(prev.amount) || 0);
    }
    dedupMap.set(key, winner);
  });

  const merged = Array.from(dedupMap.values());
  // Merge extra `deposits` rows if any aren't already represented
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
        const isUsdtVerify = (Number(tx.amount) || 0) <= 0 && String(tx.method || '').toLowerCase().includes('usdt');
        const amtLabel = isUsdtVerify ? '<span class="text-xs font-semibold text-amber-600">Verifying USDT...</span>' : `<span class="font-mono text-sm font-bold text-slate-900 tabular-nums">${formatMoney(tx.amount)}</span>`;
        return `
          <div class="p-4 flex items-center justify-between gap-3 hover:bg-slate-50 transition">
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                ${amtLabel}
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
                ${escapeHtml(meta.realName)} · ${escapeHtml(tx.method || 'USDT (BEP20)')}
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
            <td class="py-3 px-4 text-right font-mono tabular-nums">
              <div class="font-semibold text-emerald-700">${formatMoney(u.balance)}</div>
              ${meta.frozenBalance > 0 ? `<div class="text-[11px] font-medium text-sky-700">Frozen: ${formatMoney(meta.frozenBalance)}</div>` : ''}
            </td>
            <td class="py-3 px-4 text-xs text-slate-500 font-mono">${escapeHtml(dateLabel)}</td>
            <td class="py-3 px-4 text-right">
              <div class="inline-flex items-center gap-1">
                <button type="button" onclick="openManualAdjustModal('${escapeHtml(u.phone)}')"
                  class="px-2 py-1 rounded-md bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white text-xs font-semibold cursor-pointer" title="Real-time + / - Balance">
                  ± Bal
                </button>
                <button type="button" onclick="openEditUserModal('${escapeHtml(u.phone)}')"
                  class="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 cursor-pointer">
                  Edit
                </button>
              </div>
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

    const isUsdtVerify = statusKey === 'pending' && (Number(tx.amount) || 0) <= 0 && String(tx.method || '').toLowerCase().includes('usdt');
    const amountCellHtml = isUsdtVerify
      ? `<span class="text-xs font-semibold text-amber-600">Verifying USDT...</span>`
      : formatMoney(tx.amount);

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
        <td class="py-3.5 px-4 text-right font-mono font-semibold text-emerald-700 tabular-nums">${amountCellHtml}</td>
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

const _inFlightTxActions = new Set();

async function handleRechargeAction(txId, targetState) {
  const lockKey = 'rc_' + String(txId);
  if (_inFlightTxActions.has(lockKey)) return;
  const tx = getRechargeList().find(t => String(t.id) === String(txId)) || allTransactions.find(t => String(t.id) === String(txId));
  if (!tx) return;

  _inFlightTxActions.add(lockKey);
  try {
  // Re-fetch authoritative transaction status from DB to prevent stale double-crediting
  let liveTxStatus = tx.status;
  try {
    const { data: liveTxRow } = await supabaseClient
      .from('transactions')
      .select('status')
      .eq('id', tx.id)
      .maybeSingle();
    if (liveTxRow && liveTxRow.status !== undefined) {
      liveTxStatus = liveTxRow.status;
    }
  } catch (e) {}

  const prevState = classifyStatus(liveTxStatus);
  if (prevState === targetState) {
    showToast(`Recharge is already marked as ${targetState}.`);
    return;
  }

  const newStatusStr = targetState === 'approved'
    ? 'অনুমোদিত'
    : (targetState === 'rejected' ? 'অসফল (Failed)' : 'মুলতবি (Pending)');

  const extractOrderToken = str => {
    const s = String(str || '');
    const hashM = s.match(/#([A-Za-z0-9_-]{4,}|0x[a-fA-F0-9]{64})/);
    if (hashM && hashM[1]) return hashM[1];
    const tokM = s.match(/\b((?:ORD|USDT|WD|VIP|ADM)\d+|onchain_\d+|0x[a-fA-F0-9]{64})\b/);
    return tokM ? tokM[1] : '';
  };
  const amt = Number(tx.amount) || 0;
  const normPhone = normalizePhone(tx.phone);
  const orderKey = String(tx.order_id || tx.out_trade_no || extractOrderToken(tx.method || '') || '').trim();
  const txUpdatePayload = {
    status: newStatusStr,
    ratio: targetState === 'approved' ? '100%' : '0%',
    actual: targetState === 'approved' ? amt : 0
  };
    // 1. Update transaction status using real columns only (transactions table has no updated_at/order_id columns)
    const matchingIds = [tx.id];
    if (orderKey) {
      allTransactions.forEach(row => {
        if (!row || String(row.id) === String(tx.id)) return;
        if (String(row.type || '').toLowerCase() !== 'deposit') return;
        if (normalizePhone(row.phone) !== normPhone) return;
        const rowTok = String(row.order_id || row.out_trade_no || extractOrderToken(row.method || '') || '').trim();
        if (rowTok && rowTok === orderKey) matchingIds.push(row.id);
      });
    }
    const txRes = matchingIds.length > 1
      ? await supabaseClient.from('transactions').update(txUpdatePayload).in('id', matchingIds)
      : await supabaseClient.from('transactions').update(txUpdatePayload).eq('id', tx.id);
    const txErr = txRes.error;

    if (txErr) {
      showToast('Failed to update recharge status: ' + txErr.message, 'error');
      return;
    }

    // 2. Balance sync logic (prevent double crediting!)
    let balanceNote = '';
    if (normPhone && amt > 0) {
      const matchedUser = usersByPhone.get(normPhone) || allUsers.find(u => normalizePhone(u.phone || u.account_number) === normPhone);
      const dbPhone = matchedUser ? matchedUser.phone : normPhone;
      const { data: userRow } = await supabaseClient
        .from('users')
        .select('*')
        .eq('phone', dbPhone)
        .maybeSingle();

      if (userRow) {
        const rawOpt = parseRawUserOpt(userRow);
        const curBal = Number(userRow.balance) || 0;
        const curRechargeAmt = Number(rawOpt.recharge_amount) || 0;
        let nextBal = curBal;
        let nextRechargeAmt = curRechargeAmt;
        if (prevState !== 'approved' && targetState === 'approved') {
          nextBal = Number((curBal + amt).toFixed(2));
          nextRechargeAmt = Number((curRechargeAmt + amt).toFixed(2));
          balanceNote = ` (+${formatMoney(amt)} credited to Available balance)`;
        } else if (prevState === 'approved' && targetState !== 'approved') {
          nextBal = Math.max(0, Number((curBal - amt).toFixed(2)));
          nextRechargeAmt = Math.max(0, Number((curRechargeAmt - amt).toFixed(2)));
          balanceNote = ` (-${formatMoney(amt)} reverted from Available balance)`;
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
            .eq('phone', userRow.phone);
        }
      }
    }

    showToast(`Recharge ${targetState.toUpperCase()}${balanceNote}`, 'success');
    await refreshAllData(false);
  } catch (err) {
    showToast('Error updating recharge: ' + (err.message || 'Unknown'), 'error');
  } finally {
    _inFlightTxActions.delete(lockKey);
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
  const methodStr = String(tx.method || 'USDT (BEP20)');
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
  const lockKey = 'wd_' + String(txId);
  if (_inFlightTxActions.has(lockKey)) return;
  const tx = allTransactions.find(t => String(t.id) === String(txId));
  if (!tx) return;

  _inFlightTxActions.add(lockKey);
  try {
    // Re-fetch authoritative status from DB to prevent stale double-refund or double-deduct
    let liveTxStatus = tx.status;
    try {
      const { data: liveTxRow } = await supabaseClient
        .from('transactions')
        .select('status')
        .eq('id', tx.id)
        .maybeSingle();
      if (liveTxRow && liveTxRow.status !== undefined) {
        liveTxStatus = liveTxRow.status;
      }
    } catch (e) {}

    const prevState = classifyStatus(liveTxStatus);
    if (prevState === targetState) {
      showToast(`Withdrawal is already marked as ${targetState}.`);
      return;
    }

    const newStatusStr = targetState === 'approved'
      ? 'অনুমোদিত'
      : (targetState === 'rejected' ? 'বাতিল (Rejected)' : 'মুলতবি (Pending)');

    const amt = Number(tx.amount) || 0;
    const normPhone = normalizePhone(tx.phone);

    const { error: txErr } = await supabaseClient
      .from('transactions')
      .update({ status: newStatusStr })
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
      const matchedUser = usersByPhone.get(normPhone) || allUsers.find(u => normalizePhone(u.phone || u.account_number) === normPhone);
      const dbPhone = matchedUser ? matchedUser.phone : normPhone;
      const { data: userRow } = await supabaseClient
        .from('users')
        .select('*')
        .eq('phone', dbPhone)
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
            .eq('phone', userRow.phone);
        }
      }
    }

    showToast(`Withdrawal marked ${targetState.toUpperCase()}${note}`, 'success');
    closeInspectModal();
    await refreshAllData(false);
  } catch (err) {
    showToast('Error updating withdrawal: ' + (err.message || 'Unknown'), 'error');
  } finally {
    _inFlightTxActions.delete(lockKey);
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
        <div class="flex justify-between text-xs"><span class="text-slate-500">Available User Balance</span><span class="font-mono text-emerald-700 font-semibold">${u ? formatMoney(u.balance) : '-'}</span></div>
        <div class="flex justify-between text-xs"><span class="text-slate-500">Frozen Balance</span><span class="font-mono text-sky-700 font-semibold">${u ? formatMoney(meta.frozenBalance) : '-'}</span></div>
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
        <td class="py-3.5 px-4 text-right font-mono tabular-nums">
          <div class="font-semibold text-emerald-700">${formatMoney(u.balance)}</div>
          ${meta.frozenBalance > 0 ? `<div class="text-[11px] font-medium text-sky-700">Frozen: ${formatMoney(meta.frozenBalance)}</div>` : ''}
        </td>
        <td class="py-3.5 px-4 text-xs text-slate-600 font-mono max-w-[220px] truncate" title="${escapeHtml(payouts)}">${escapeHtml(payouts)}</td>
        <td class="py-3.5 px-4 text-xs text-slate-500 font-mono">${escapeHtml(joinedDate)}</td>
        <td class="py-3.5 px-4 text-right">
          <div class="inline-flex items-center justify-end gap-1.5">
            <button type="button" onclick="openManualAdjustModal('${escapeHtml(u.phone)}')"
              class="px-2.5 py-1 rounded-md bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white text-xs font-semibold transition cursor-pointer" title="Real-Time + Add / - Minus Balance">
              ± Bal
            </button>
            ${meta.frozenBalance > 0 ? `
              <button type="button" onclick="quickUnfreezeAllToAvailable('${escapeHtml(u.phone)}')"
                class="px-2.5 py-1 rounded-md bg-sky-50 hover:bg-sky-600 text-sky-700 hover:text-white text-xs font-semibold transition cursor-pointer" title="Move all frozen balance to available balance">
                Unfreeze
              </button>
            ` : ''}
            <button type="button" onclick="openEditUserModal('${escapeHtml(u.phone)}')"
              class="px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-900 text-slate-700 hover:text-white text-xs font-semibold transition cursor-pointer">
              Control
            </button>
          </div>
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
  const frozenInp = document.getElementById('edit-user-frozen-balance');
  if (frozenInp) frozenInp.value = Number(meta.frozenBalance || 0).toFixed(2);
  const unfreezeInp = document.getElementById('edit-user-unfreeze-amount');
  if (unfreezeInp) {
    unfreezeInp.value = '';
    unfreezeInp.max = Number(meta.frozenBalance || 0).toFixed(2);
  }
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

  resetEditUserDeleteButton();
  const modal = document.getElementById('edit-user-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function resetEditUserDeleteButton() {
  const btn = document.getElementById('edit-user-delete-btn');
  if (!btn) return;
  if (btn._confirmTimer) {
    clearTimeout(btn._confirmTimer);
    btn._confirmTimer = null;
  }
  btn.dataset.confirmPending = '';
  btn.disabled = false;
  btn.textContent = 'Delete Account';
  btn.className = 'px-3.5 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition cursor-pointer';
}

function closeEditUserModal() {
  resetEditUserDeleteButton();
  const modal = document.getElementById('edit-user-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

async function applyRealtimeBalanceDelta(phoneKey, rawDelta, walletType = 'available', options = {}) {
  const norm = normalizePhone(phoneKey);
  const cachedUser = usersByPhone.get(norm) || allUsers.find(x => String(x.phone) === String(phoneKey));
  const lookupPhone = cachedUser ? cachedUser.phone : (norm || String(phoneKey || '').trim());
  const delta = Number(rawDelta) || 0;

  if (!lookupPhone || delta === 0 || isNaN(delta)) {
    showToast('Enter a valid non-zero amount.', 'error');
    return false;
  }

  try {
    let { data: userRow, error: findErr } = await supabaseClient
      .from('users')
      .select('*')
      .eq('phone', lookupPhone)
      .maybeSingle();

    if ((!userRow || findErr) && norm && norm !== lookupPhone) {
      const resAlt = await supabaseClient.from('users').select('*').eq('phone', norm).maybeSingle();
      userRow = resAlt.data;
      findErr = resAlt.error;
    }

    if (findErr || !userRow) {
      showToast(`User ${phoneKey} not found in database.`, 'error');
      return false;
    }

    const now = new Date();
    const rawOpt = parseRawUserOpt(userRow);
    let updatePayload = { updated_at: now.toISOString() };
    let prevVal = 0;
    let nextVal = 0;
    let nextAvail = Number(userRow.balance) || 0;
    let nextFrozen = Number(rawOpt.frozen_balance) || 0;

    const shouldCountAsRecharge = delta > 0 && options.isRechargeCredit !== false;
    const shouldLogDepositTx = delta > 0 && options.logRechargeTx !== false;

    if (walletType === 'frozen') {
      prevVal = nextFrozen;
      nextFrozen = Math.max(0, Number((prevVal + delta).toFixed(2)));
      nextVal = nextFrozen;
      const actualDiff = Number((nextFrozen - prevVal).toFixed(2));
      const curRechargeFrozen = Number(rawOpt.recharge_frozen_balance) || 0;
      rawOpt.frozen_balance = nextFrozen;
      rawOpt.recharge_frozen_balance = Math.max(0, Number((curRechargeFrozen + actualDiff).toFixed(2)));
      if (shouldCountAsRecharge && actualDiff > 0) {
        rawOpt.recharge_amount = Number(((Number(rawOpt.recharge_amount) || 0) + actualDiff).toFixed(2));
      }
      updatePayload.bkash_optional = JSON.stringify(rawOpt);
    } else {
      prevVal = nextAvail;
      nextAvail = Math.max(0, Number((prevVal + delta).toFixed(2)));
      nextVal = nextAvail;
      const actualDiff = Number((nextAvail - prevVal).toFixed(2));
      updatePayload.balance = nextAvail;
      if (shouldCountAsRecharge && actualDiff > 0) {
        rawOpt.recharge_amount = Number(((Number(rawOpt.recharge_amount) || 0) + actualDiff).toFixed(2));
        updatePayload.bkash_optional = JSON.stringify(rawOpt);
      }
    }

    const { error: uErr } = await supabaseClient
      .from('users')
      .update(updatePayload)
      .eq('phone', userRow.phone);

    if (uErr) {
      showToast('Failed to update balance: ' + uErr.message, 'error');
      return false;
    }

    if (shouldLogDepositTx) {
      const orderId = 'ADM' + Date.now();
      const baseMethod = String(options.method || 'Admin Recharge').trim();
      const methodLabel = baseMethod.includes('#') ? baseMethod : `${baseMethod} · #${orderId}`;
      const { error: txInsErr } = await supabaseClient.from('transactions').insert({
        phone: userRow.phone,
        type: 'deposit',
        amount: Number(Math.abs(delta).toFixed(2)),
        actual: Number(Math.abs(delta).toFixed(2)),
        ratio: '100%',
        status: 'অনুমোদিত',
        method: methodLabel,
        date: getTodayDateString(),
        time: now.toTimeString().split(' ')[0],
        created_at: now.toISOString()
      });
      if (txInsErr) {
        console.warn('[Admin] Failed to insert recharge transaction record:', txInsErr.message);
      }
    }

    const editKey = document.getElementById('edit-user-phone-key')?.value;
    if (editKey && normalizePhone(editKey) === normalizePhone(userRow.phone)) {
      const availInp = document.getElementById('edit-user-balance');
      const frozenInp = document.getElementById('edit-user-frozen-balance');
      const unfreezeInp = document.getElementById('edit-user-unfreeze-amount');
      if (availInp) availInp.value = nextAvail.toFixed(2);
      if (frozenInp) frozenInp.value = nextFrozen.toFixed(2);
      if (unfreezeInp) unfreezeInp.max = nextFrozen.toFixed(2);
    }

    const label = walletType === 'frozen' ? 'Frozen' : 'Available';
    const signStr = delta >= 0 ? `+${formatMoney(delta)}` : `-${formatMoney(Math.abs(delta))}`;
    showToast(`Live ${label} ${signStr} for ${userRow.phone}: ${formatMoney(prevVal)} → ${formatMoney(nextVal)}`, 'success');
    await refreshAllData(false);
    return true;
  } catch (err) {
    showToast('Real-time balance update error: ' + (err.message || 'Unknown'), 'error');
    return false;
  }
}

async function quickBumpBalance(delta) {
  const phoneKey = document.getElementById('edit-user-phone-key')?.value;
  const walletType = document.getElementById('edit-live-bal-type')?.value || 'available';
  if (!phoneKey) return;
  await applyRealtimeBalanceDelta(phoneKey, delta, walletType);
}

async function applyCustomLiveModalDelta(sign) {
  const phoneKey = document.getElementById('edit-user-phone-key')?.value;
  const amtEl = document.getElementById('edit-live-delta-amount');
  const walletType = document.getElementById('edit-live-bal-type')?.value || 'available';
  const amt = parseFloat(amtEl?.value || '') || 0;
  if (!phoneKey) return;
  if (amt <= 0) {
    showToast('Enter a positive amount to add or minus.', 'error');
    amtEl?.focus();
    return;
  }
  const ok = await applyRealtimeBalanceDelta(phoneKey, (sign >= 0 ? 1 : -1) * amt, walletType);
  if (ok && amtEl) amtEl.value = '';
}

function fillMaxUnfreezeAmount() {
  const frozenInp = document.getElementById('edit-user-frozen-balance');
  const unfreezeInp = document.getElementById('edit-user-unfreeze-amount');
  if (!frozenInp || !unfreezeInp) return;
  const curFrozen = Math.max(0, parseFloat(frozenInp.value) || 0);
  unfreezeInp.value = curFrozen.toFixed(2);
}

async function applyFrozenToAvailableTransfer(phoneKey, requestedAmt, moveAll) {
  const existing = usersByPhone.get(normalizePhone(phoneKey)) || allUsers.find(x => String(x.phone) === String(phoneKey));
  if (!existing) return false;

  const rawOpt = parseRawUserOpt(existing);
  const curAvail = Number(existing.balance) || 0;
  const curFrozen = Number(rawOpt.frozen_balance) || 0;

  if (curFrozen <= 0) {
    showToast('This user has no frozen balance to move.', 'error');
    return false;
  }

  let transferAmt = moveAll ? curFrozen : (parseFloat(requestedAmt) || 0);
  if (isNaN(transferAmt) || transferAmt <= 0) {
    showToast('Enter a valid frozen amount to move to available balance.', 'error');
    return false;
  }
  if (transferAmt > curFrozen + 0.001) {
    showToast(`Transfer amount exceeds frozen balance (${formatMoney(curFrozen)}).`, 'error');
    return false;
  }
  transferAmt = Number(Math.min(curFrozen, transferAmt).toFixed(2));

  const nextFrozen = Math.max(0, Number((curFrozen - transferAmt).toFixed(2)));
  const nextAvail = Number((curAvail + transferAmt).toFixed(2));
  const curRechargeFrozen = Number(rawOpt.recharge_frozen_balance) || 0;
  const nextRechargeFrozen = Math.max(0, Math.min(nextFrozen, Number((curRechargeFrozen - transferAmt).toFixed(2))));
  const prevAdminUnfrozen = Number(rawOpt.admin_unfrozen_balance) || 0;

  const updatedMeta = Object.assign({}, rawOpt, {
    frozen_balance: nextFrozen,
    recharge_frozen_balance: nextRechargeFrozen,
    admin_unfrozen_balance: Number((prevAdminUnfrozen + transferAmt).toFixed(2))
  });

  try {
    const { error } = await supabaseClient
      .from('users')
      .update({
        balance: nextAvail,
        bkash_optional: JSON.stringify(updatedMeta),
        updated_at: new Date().toISOString()
      })
      .eq('phone', existing.phone);

    if (error) {
      showToast('Failed to move frozen balance: ' + error.message, 'error');
      return false;
    }

    const availInp = document.getElementById('edit-user-balance');
    const frozenInp = document.getElementById('edit-user-frozen-balance');
    const unfreezeInp = document.getElementById('edit-user-unfreeze-amount');
    if (availInp && document.getElementById('edit-user-phone-key')?.value === existing.phone) {
      availInp.value = nextAvail.toFixed(2);
    }
    if (frozenInp && document.getElementById('edit-user-phone-key')?.value === existing.phone) {
      frozenInp.value = nextFrozen.toFixed(2);
    }
    if (unfreezeInp && document.getElementById('edit-user-phone-key')?.value === existing.phone) {
      unfreezeInp.value = '';
      unfreezeInp.max = nextFrozen.toFixed(2);
    }

    showToast(`Moved ${formatMoney(transferAmt)} from Frozen to Available balance for ${existing.phone}.`, 'success');
    await refreshAllData(false);
    return true;
  } catch (err) {
    showToast('Error moving frozen balance: ' + (err.message || 'Unknown'), 'error');
    return false;
  }
}

async function moveUserFrozenToAvailable(moveAll) {
  const phoneKey = document.getElementById('edit-user-phone-key')?.value;
  if (!phoneKey) return;
  const unfreezeInp = document.getElementById('edit-user-unfreeze-amount');
  await applyFrozenToAvailableTransfer(phoneKey, unfreezeInp ? unfreezeInp.value : 0, Boolean(moveAll));
}

async function quickUnfreezeAllToAvailable(phoneKey) {
  if (!phoneKey) return;
  await applyFrozenToAvailableTransfer(phoneKey, 0, true);
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

  const prevAvail = Number(existing.balance) || 0;
  const nextAvail = Math.max(0, parseFloat(document.getElementById('edit-user-balance').value) || 0);
  const prevFrozen = Number(rawOpt.frozen_balance) || 0;
  const frozenInp = document.getElementById('edit-user-frozen-balance');
  const nextFrozen = frozenInp ? Math.max(0, parseFloat(frozenInp.value) || 0) : prevFrozen;
  const frozenReduction = Math.max(0, Number((prevFrozen - nextFrozen).toFixed(2)));
  const availIncrease = Math.max(0, Number((nextAvail - prevAvail).toFixed(2)));
  const unlockedDelta = Math.min(frozenReduction, availIncrease);
  const nextRechargeFrozen = Math.max(0, Math.min(nextFrozen, Number(rawOpt.recharge_frozen_balance || 0) - frozenReduction));

  const nextLevel = document.getElementById('edit-user-level').value || 'LV0';
  const prevLevel = String(existing.package_level || 'LV0').toUpperCase();
  const nextPurchaseDates = Object.assign(
    {},
    (rawOpt.package_purchase_dates && typeof rawOpt.package_purchase_dates === 'object') ? rawOpt.package_purchase_dates : {}
  );
  const nextPurchasedPkgs = Array.isArray(rawOpt.purchased_packages) ? rawOpt.purchased_packages.slice() : ['LV0'];
  if (!nextPurchasedPkgs.includes('LV0')) nextPurchasedPkgs.unshift('LV0');
  if (nextLevel !== 'LV0') {
    if (!nextPurchasedPkgs.includes(nextLevel)) nextPurchasedPkgs.push(nextLevel);
    if (nextLevel !== prevLevel || !nextPurchaseDates[nextLevel]) {
      nextPurchaseDates[nextLevel] = new Date().toISOString();
    }
  }

  const netAddedBalance = Number(Math.max(0, availIncrease - unlockedDelta).toFixed(2));
  const nextRechargeAmount = netAddedBalance > 0
    ? Number(((Number(rawOpt.recharge_amount) || 0) + netAddedBalance).toFixed(2))
    : (Number(rawOpt.recharge_amount) || 0);

  const updatedMeta = Object.assign({}, rawOpt, {
    nagad_name: existingMeta.nagadName || newName,
    nagad_phone: document.getElementById('edit-user-nagad-phone').value.trim(),
    usdt_name: existingMeta.usdtName || newName,
    usdt_address: document.getElementById('edit-user-usdt-address').value.trim(),
    real_name: newName,
    fund_password: document.getElementById('edit-user-fundpass').value.trim(),
    account_status: document.getElementById('edit-user-status').value || 'active',
    frozen_balance: Number(nextFrozen.toFixed(2)),
    recharge_frozen_balance: Number(nextRechargeFrozen.toFixed(2)),
    recharge_amount: nextRechargeAmount,
    admin_unfrozen_balance: Number(((Number(rawOpt.admin_unfrozen_balance) || 0) + unlockedDelta).toFixed(2)),
    purchased_packages: nextPurchasedPkgs,
    package_purchase_dates: nextPurchaseDates
  });

  const payload = {
    name: newName,
    balance: Number(nextAvail.toFixed(2)),
    package_level: nextLevel,
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

    if (netAddedBalance > 0) {
      const nowEdit = new Date();
      const orderIdEdit = 'ADM' + Date.now();
      await supabaseClient.from('transactions').insert({
        phone: existing.phone,
        type: 'deposit',
        amount: netAddedBalance,
        actual: netAddedBalance,
        ratio: '100%',
        status: 'অনুমোদিত',
        method: `Admin Recharge · #${orderIdEdit}`,
        date: getTodayDateString(),
        time: nowEdit.toTimeString().split(' ')[0],
        created_at: nowEdit.toISOString()
      });
    }

    showToast(`Updated account ${existing.phone} successfully.`, 'success');
    closeEditUserModal();
    await refreshAllData(false);
  } catch (err) {
    showToast('Error saving user: ' + (err.message || 'Unknown'), 'error');
  }
}

async function deleteEditedUser() {
  const phoneKey = String(document.getElementById('edit-user-phone-key')?.value || '').trim();
  if (!phoneKey) return;
  if (phoneKey === 'SYSTEM_CONFIG') {
    showToast('System configuration record cannot be deleted.', 'error');
    return;
  }

  const delBtn = document.getElementById('edit-user-delete-btn');
  if (delBtn && delBtn.dataset.confirmPending !== '1') {
    delBtn.dataset.confirmPending = '1';
    delBtn.textContent = 'Click Again to Confirm Delete';
    delBtn.className = 'px-3.5 py-2 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition cursor-pointer';
    if (delBtn._confirmTimer) clearTimeout(delBtn._confirmTimer);
    delBtn._confirmTimer = setTimeout(function() {
      resetEditUserDeleteButton();
    }, 4500);
    return;
  }

  if (delBtn) {
    if (delBtn._confirmTimer) clearTimeout(delBtn._confirmTimer);
    delBtn.disabled = true;
    delBtn.textContent = 'Deleting...';
  }

  const norm = normalizePhone(phoneKey);
  const existing = usersByPhone.get(norm) || allUsers.find(x => String(x.phone) === phoneKey || String(x.account_number) === phoneKey);
  const keySet = new Set([phoneKey]);
  [phoneKey, norm, existing && existing.phone, existing && existing.account_number].forEach(function(val) {
    const raw = String(val || '').trim();
    if (!raw) return;
    keySet.add(raw);
    const n = normalizePhone(raw);
    if (n) {
      keySet.add(n);
      if (/^1[3-9]\d{8}$/.test(n)) {
        keySet.add('0' + n);
        keySet.add('880' + n);
        keySet.add('+880' + n);
      }
    }
  });
  const phoneVariants = Array.from(keySet).filter(Boolean);

  try {
    // 1. Delete primary user record(s) from Supabase users table
    const { data: deletedUsers, error: delErr } = await supabaseClient
      .from('users')
      .delete()
      .in('phone', phoneVariants)
      .select('phone');

    if (delErr) {
      resetEditUserDeleteButton();
      showToast('Delete failed: ' + delErr.message, 'error');
      return;
    }

    // Fallback: also delete by account_number in case phone column differed
    await supabaseClient
      .from('users')
      .delete()
      .in('account_number', phoneVariants);

    // 2. Remove related transactions and team records from server
    await supabaseClient
      .from('transactions')
      .delete()
      .in('phone', phoneVariants);

    await supabaseClient
      .from('team')
      .delete()
      .in('member_phone', phoneVariants);

    const teamSupKeys = Array.from(new Set(phoneVariants.concat([
      existing && existing.invite_code ? String(existing.invite_code).trim() : '',
      existing && existing.member_id ? String(existing.member_id).trim() : ''
    ].filter(Boolean))));

    await supabaseClient
      .from('team')
      .delete()
      .in('superior_phone', teamSupKeys);

    await supabaseClient
      .from('users')
      .update({ superior_id: '11' })
      .in('superior_id', teamSupKeys);

    if (existing && existing.member_id) {
      await supabaseClient
        .from('team')
        .delete()
        .eq('member_id', String(existing.member_id));
    }

    // 3. Verify deletion on server
    const { data: verifyRemaining } = await supabaseClient
      .from('users')
      .select('phone')
      .in('phone', phoneVariants);

    if (Array.isArray(verifyRemaining) && verifyRemaining.length > 0) {
      resetEditUserDeleteButton();
      showToast('Server blocked deletion of this account (check RLS policy).', 'error');
      return;
    }

    allUsers = allUsers.filter(u => !phoneVariants.includes(String(u.phone)) && !phoneVariants.includes(String(u.account_number)));
    phoneVariants.forEach(k => usersByPhone.delete(k));
    if (norm) usersByPhone.delete(norm);

    const countRemoved = Array.isArray(deletedUsers) ? deletedUsers.length : 1;
    showToast(`Account ${phoneKey} permanently deleted from server (${countRemoved} removed).`, 'success');
    closeEditUserModal();
    await refreshAllData(false);
  } catch (err) {
    resetEditUserDeleteButton();
    showToast('Error deleting user: ' + (err.message || 'Unknown'), 'error');
  }
}

// ============================================================================
// REAL-TIME BALANCE ADJUST MODAL (+ ADD / - MINUS)
// ============================================================================
function setManualAdjustOp(op) {
  const isSub = op === 'subtract';
  const hiddenOp = document.getElementById('manual-operation');
  if (hiddenOp) hiddenOp.value = isSub ? 'subtract' : 'add';

  const addBtn = document.getElementById('manual-op-add-btn');
  const subBtn = document.getElementById('manual-op-sub-btn');
  const submitBtn = document.getElementById('manual-adjust-submit-btn');

  if (addBtn) {
    addBtn.className = !isSub
      ? 'py-2 rounded-lg text-xs font-bold border border-emerald-600 bg-emerald-600 text-white transition cursor-pointer'
      : 'py-2 rounded-lg text-xs font-bold border border-slate-200 bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition cursor-pointer';
  }
  if (subBtn) {
    subBtn.className = isSub
      ? 'py-2 rounded-lg text-xs font-bold border border-rose-600 bg-rose-600 text-white transition cursor-pointer'
      : 'py-2 rounded-lg text-xs font-bold border border-slate-200 bg-slate-50 text-slate-700 hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer';
  }
  if (submitBtn) {
    submitBtn.className = isSub
      ? 'px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-xs font-semibold text-white cursor-pointer'
      : 'px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold text-white cursor-pointer';
    submitBtn.textContent = isSub ? '- Minus Balance Live' : '+ Add Balance Live';
  }
}

function updateManualAdjustUserPreview() {
  const rawPhone = document.getElementById('manual-user-phone')?.value || '';
  const preview = document.getElementById('manual-user-preview');
  if (!preview) return;
  const norm = normalizePhone(rawPhone);
  if (!norm) {
    preview.classList.add('hidden');
    preview.innerHTML = '';
    return;
  }
  const u = usersByPhone.get(norm) || allUsers.find(x => normalizePhone(x.phone || x.account_number) === norm);
  if (!u) {
    preview.classList.remove('hidden');
    preview.innerHTML = `<span class="text-slate-400">No user found for ${escapeHtml(norm)}</span>`;
    return;
  }
  const meta = parseUserMeta(u);
  preview.classList.remove('hidden');
  preview.innerHTML = `
    <span class="font-semibold text-slate-800 truncate">${escapeHtml(meta.realName)} (${escapeHtml(u.package_level || 'LV0')})</span>
    <span class="font-mono shrink-0 text-emerald-700 font-bold">Avail: ${formatMoney(u.balance)} <span class="text-sky-700">· Frozen: ${formatMoney(meta.frozenBalance)}</span></span>
  `;
}

function openManualAdjustModal(prefillPhone = '') {
  const modal = document.getElementById('manual-adjust-modal');
  const phoneInp = document.getElementById('manual-user-phone');
  const amtInp = document.getElementById('manual-amount');
  setManualAdjustOp('add');
  if (phoneInp) phoneInp.value = prefillPhone ? String(prefillPhone) : '';
  if (amtInp) amtInp.value = '';
  updateManualAdjustUserPreview();
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
  const op = document.getElementById('manual-operation')?.value === 'subtract' ? 'subtract' : 'add';
  const walletType = document.getElementById('manual-wallet-type')?.value || 'available';
  const amount = parseFloat(document.getElementById('manual-amount').value) || 0;
  const method = document.getElementById('manual-method')?.value || 'Admin Real-Time Credit';

  if (!normPhone || amount <= 0) {
    showToast('Please enter a valid user phone and positive amount.', 'error');
    return;
  }

  const signedDelta = op === 'subtract' ? -Math.abs(amount) : Math.abs(amount);
  const isCreditOp = op === 'add';
  const ok = await applyRealtimeBalanceDelta(normPhone, signedDelta, walletType, {
    logRechargeTx: isCreditOp,
    isRechargeCredit: isCreditOp,
    method: method
  });

  if (ok) {
    document.getElementById('manual-adjust-form')?.reset();
    setManualAdjustOp('add');
    closeManualAdjustModal();
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
  minRecharge: 126,
  usdtRate: 126,
  usdtAddress: '0x74826F93F58Ae127FB6a77bFEFC5841B61bBDb16',
  telegramUrl: 'https://t.me/PW_Official_Manager_BD',
  managerId: '#PW-MANAGER-8802',
  bdRealOtpEnabled: true,
  cpanelOtpUrl: 'https://imcagro.top/send-api/send-otp'
};

const PACKAGE_LEVEL_KEYS = ['LV0', 'LV1', 'LV2', 'LV3', 'LV4', 'LV5', 'LV6'];
const ADMIN_USD_BASE_RATE = 126;

const DEFAULT_PACKAGE_CONFIGS = {
  LV0: { count: 5, rewardUsd: 0.16, priceUsd: 0, reward: 20, price: 0, validityDays: 5, currency: 'USD', nameBn: 'LV0', nameEn: 'LV0', nameAr: 'LV0' },
  LV1: { count: 6, rewardUsd: 0.24, priceUsd: 27.78, reward: 30, price: 3500, validityDays: 30, currency: 'USD', nameBn: 'LV1', nameEn: 'LV1', nameAr: 'LV1' },
  LV2: { count: 12, rewardUsd: 0.32, priceUsd: 59.52, reward: 40, price: 7500, validityDays: 30, currency: 'USD', nameBn: 'LV2', nameEn: 'LV2', nameAr: 'LV2' },
  LV3: { count: 15, rewardUsd: 0.40, priceUsd: 285.71, reward: 50, price: 36000, validityDays: 30, currency: 'USD', nameBn: 'LV3', nameEn: 'LV3', nameAr: 'LV3' },
  LV4: { count: 25, rewardUsd: 0.48, priceUsd: 666.67, reward: 60, price: 84000, validityDays: 30, currency: 'USD', nameBn: 'LV4', nameEn: 'LV4', nameAr: 'LV4' },
  LV5: { count: 35, rewardUsd: 0.56, priceUsd: 1190.48, reward: 70, price: 150000, validityDays: 30, currency: 'USD', nameBn: 'LV5', nameEn: 'LV5', nameAr: 'LV5' },
  LV6: { count: 50, rewardUsd: 0.79, priceUsd: 2380.95, reward: 100, price: 300000, validityDays: 30, currency: 'USD', nameBn: 'LV6', nameEn: 'LV6', nameAr: 'LV6' }
};

const DEFAULT_SALARY_PAGE_CONFIG = {
  titleBn: 'আপনার অর্জন, আপনার সম্মান',
  titleEn: 'Your Achievement, Your Honor',
  titleAr: 'إنجازك هو فخرك',
  subtitleBn: 'নির্ধারিত লক্ষ্য পূরণ করে পদমর্যাদা ও মাসিক বেতন অর্জন করুন।',
  subtitleEn: 'Reach the target milestones to unlock ranks and monthly salary.',
  subtitleAr: 'حقق الأهداف المطلوبة لفتح الرتب والحصول على راتب شهري.',
  activeLabelBn: 'সক্রিয় A-লেভেল সদস্য (প্যাকেজ ক্রয়কৃত):',
  activeLabelEn: 'Active A-Level Members (Paid):',
  activeLabelAr: 'أعضاء المستوى A النشطون (باقة مدفوعة):',
  unitBn: 'জন',
  unitEn: 'Members',
  unitAr: 'عضو',
  badgeLockedBn: '🔒 মাসিক বেতন',
  badgeLockedEn: '🔒 Monthly Salary',
  badgeLockedAr: '🔒 الراتب الشهري',
  badgeClaimBn: 'গ্রহণ করুন',
  badgeClaimEn: 'Claim',
  badgeClaimAr: 'استلام',
  badgeClaimedBn: 'গৃহীত ✓',
  badgeClaimedEn: 'Claimed ✓',
  badgeClaimedAr: 'تم الاستلام ✓',
  modalNoteBn: 'আপনার ইনভাইট লিংক দিয়ে বন্ধুদের জয়েন করান। শুধু ফ্রি রেফার করলে গণ্য হবে না — A-লেভেলের সদস্যরা প্যাকেজ (LV1+) ক্রয় করলেই সক্রিয় হবে এবং বেতন অগ্রগতি বাড়বে।',
  modalNoteEn: 'Invite friends using your link. Free signups do not count — A-Level members become active once they purchase a VIP package (LV1+).',
  modalNoteAr: 'ادعُ أصدقاءك عبر رابط الدعوة. التسجيل المجاني لا يُحتسب — يصبح أعضاء المستوى A نشطين بعد شراء باقة مدفوعة (LV1+).',
  tiers: [
    { id: 'অবস্থান ১', enabled: true, nameBn: 'অবস্থান ১', nameEn: 'Position 1', nameAr: 'المركز 1', req: 3, salaryUsd: 8.00, descBn: 'আপনার প্রথম ৩ জন বা তার বেশি A-লেভেল সক্রিয় সদস্য (রিচার্জ ও প্যাকেজ ক্রয়) থাকলে যোগ্য হবেন।', descEn: 'Qualify when you have 3 or more active A-Level members (with paid package).', descAr: 'تتأهل عندما يكون لديك 3 أعضاء نشطين أو أكثر في المستوى A.' },
    { id: 'অবস্থান ২', enabled: true, nameBn: 'অবস্থান ২', nameEn: 'Position 2', nameAr: 'المركز 2', req: 5, salaryUsd: 15.00, descBn: 'আপনার প্রথম ৫ জন বা তার বেশি A-লেভেল সক্রিয় সদস্য (রিচার্জ ও প্যাকেজ ক্রয়) থাকলে যোগ্য হবেন।', descEn: 'Qualify when you have 5 or more active A-Level members (with paid package).', descAr: 'تتأهل عندما يكون لديك 5 أعضاء نشطين أو أكثر في المستوى A.' },
    { id: 'অবস্থান ৩', enabled: true, nameBn: 'অবস্থান ৩', nameEn: 'Position 3', nameAr: 'المركز 3', req: 8, salaryUsd: 20.00, descBn: 'আপনার প্রথম ৮ জন বা তার বেশি A-লেভেল সক্রিয় সদস্য (রিচার্জ ও প্যাকেজ ক্রয়) থাকলে যোগ্য হবেন।', descEn: 'Qualify when you have 8 or more active A-Level members (with paid package).', descAr: 'تتأهل عندما يكون لديك 8 أعضاء نشطين أو أكثر في المستوى A.' },
    { id: 'অবস্থান ৪', enabled: true, nameBn: 'অবস্থান ৪', nameEn: 'Position 4', nameAr: 'المركز 4', req: 15, salaryUsd: 25.00, descBn: 'আপনার প্রথম ১৫ জন বা তার বেশি A-লেভেল সক্রিয় সদস্য (রিচার্জ ও প্যাকেজ ক্রয়) থাকলে যোগ্য হবেন।', descEn: 'Qualify when you have 15 or more active A-Level members (with paid package).', descAr: 'تتأهل عندما يكون لديك 15 عضوًا نشطًا أو أكثر في المستوى A.' },
    { id: 'অবস্থান ৫', enabled: true, nameBn: 'অবস্থান ৫', nameEn: 'Position 5', nameAr: 'المركز 5', req: 25, salaryUsd: 32.00, descBn: 'আপনার প্রথম ২৫ জন বা তার বেশি A-লেভেল সক্রিয় সদস্য (রিচার্জ ও প্যাকেজ ক্রয়) থাকলে যোগ্য হবেন।', descEn: 'Qualify when you have 25 or more active A-Level members (with paid package).', descAr: 'تتأهل عندما يكون لديك 25 عضوًا نشطًا أو أكثر في المستوى A.' },
    { id: 'অবস্থান ৬', enabled: true, nameBn: 'অবস্থান ৬', nameEn: 'Position 6', nameAr: 'المركز 6', req: 40, salaryUsd: 45.00, descBn: 'আপনার প্রথম ৪০ জন বা তার বেশি A-লেভেল সক্রিয় সদস্য (রিচার্জ ও প্যাকেজ ক্রয়) থাকলে যোগ্য হবেন।', descEn: 'Qualify when you have 40 or more active A-Level members (with paid package).', descAr: 'تتأهل عندما يكون لديك 40 عضوًا نشطًا أو أكثر في المستوى A.' },
    { id: 'অবস্থান ৭', enabled: true, nameBn: 'অবস্থান ৭', nameEn: 'Position 7', nameAr: 'المركز 7', req: 70, salaryUsd: 55.00, descBn: 'আপনার প্রথম ৭০ জন বা তার বেশি A-লেভেল সক্রিয় সদস্য (রিচার্জ ও প্যাকেজ ক্রয়) থাকলে যোগ্য হবেন।', descEn: 'Qualify when you have 70 or more active A-Level members (with paid package).', descAr: 'تتأهل عندما يكون لديك 70 عضوًا نشطًا أو أكثر في المستوى A.' },
    { id: 'অবস্থান ৮', enabled: true, nameBn: 'অবস্থান ৮', nameEn: 'Position 8', nameAr: 'المركز 8', req: 100, salaryUsd: 80.00, descBn: 'আপনার প্রথম ১০০ জন বা তার বেশি A-লেভেল সক্রিয় সদস্য (রিচার্জ ও প্যাকেজ ক্রয়) থাকলে যোগ্য হবেন।', descEn: 'Qualify when you have 100 or more active A-Level members (with paid package).', descAr: 'تتأهل عندما يكون لديك 100 عضو نشط أو أكثر في المستوى A.' }
  ]
};

const ADMIN_SALARY_ICON_SVGS = [
  `<svg viewBox="0 0 48 48" class="w-8 h-8"><circle cx="22" cy="14" r="8" fill="#1877f2"/><path d="M6 42c0-10 7-16 16-16s16 6 16 16z" fill="#1877f2"/><polygon points="38,26 40.6,31.4 46.4,32.2 42.2,36.2 43.2,42 38,39.2 32.8,42 33.8,36.2 29.6,32.2 35.4,31.4" fill="#eab308"/></svg>`,
  `<svg viewBox="0 0 48 48" class="w-8 h-8"><polygon points="13,30 7,45 16,42 20,47 25,31" fill="#0f3d91"/><polygon points="35,30 41,45 32,42 28,47 23,31" fill="#1877f2"/><circle cx="24" cy="18" r="15" fill="#1877f2"/><circle cx="24" cy="18" r="10.5" fill="#0f3d91"/><polygon points="24,10 26.4,15.3 32,16 27.8,19.8 29,25.5 24,22.6 19,25.5 20.2,19.8 16,16 21.6,15.3" fill="#e2e8f0"/></svg>`,
  `<svg viewBox="0 0 48 48" class="w-8 h-8"><path d="M5 36V13l11 11 8-15 8 15 11-11v23z" fill="#1877f2"/><rect x="5" y="38" width="38" height="7" rx="2.5" fill="#1877f2"/><circle cx="5" cy="12" r="3" fill="#eab308"/><circle cx="24" cy="8" r="3" fill="#eab308"/><circle cx="43" cy="12" r="3" fill="#eab308"/></svg>`,
  `<svg viewBox="0 0 48 48" class="w-8 h-8"><polygon points="11,8 37,8 46,19 24,45 2,19" fill="#38bdf8"/><path d="M2 19h44M17 19l7-11 7 11-7 26z" stroke="#fff" stroke-opacity=".55" stroke-width="1.5" fill="none"/></svg>`,
  `<svg viewBox="0 0 48 48" class="w-8 h-8"><g transform="rotate(40 24 24)"><path d="M24 2c8 6 11 16 9 30H15C13 18 16 8 24 2z" fill="#e2e8f0"/><circle cx="24" cy="16" r="4.5" fill="#1877f2"/><path d="M15 24l-7 10 7-2zM33 24l7 10-7-2z" fill="#1877f2"/><path d="M19 32h10l-5 13z" fill="#eab308"/></g></svg>`,
  `<svg viewBox="0 0 48 48" class="w-8 h-8"><path d="M24 3l17 6v13c0 11-7 19-17 23C14 41 7 33 7 22V9z" fill="#1877f2"/><path d="M24 8l12 4.5V22c0 8-5 14-12 17.5C17 36 12 30 12 22v-9.5z" fill="#0f3d91"/><polygon points="24,15 26.4,20.3 32,21 27.8,24.8 29,30.5 24,27.6 19,30.5 20.2,24.8 16,21 21.6,20.3" fill="#e2e8f0"/></svg>`,
  `<svg viewBox="0 0 48 48" class="w-8 h-8"><path d="M14 6h20v13c0 7-4.5 12-10 12s-10-5-10-12z" fill="#eab308"/><path d="M14 10H6c0 8 3 12 9 13M34 10h8c0 8-3 12-9 13" stroke="#d97706" stroke-width="3" fill="none"/><rect x="21" y="31" width="6" height="8" fill="#b45309"/><rect x="14" y="39" width="20" height="6" rx="2" fill="#eab308"/></svg>`,
  `<svg viewBox="0 0 48 48" class="w-8 h-8"><polygon points="12,30 7,46 16,42 21,47 26,31" fill="#0f3d91"/><polygon points="36,30 41,46 32,42 27,47 22,31" fill="#1877f2"/><circle cx="24" cy="18" r="16" fill="#eab308"/><circle cx="24" cy="18" r="11" fill="#0f3d91"/><polygon points="24,10 26.4,15.3 32,16 27.8,19.8 29,25.5 24,22.6 19,25.5 20.2,19.8 16,16 21.6,15.3" fill="#eab308"/></svg>`
];

let salaryEditorLang = 'bn';
let salaryEditorDraft = null;
let salaryBaselineSnapshot = null;
let salaryEditorDirty = false;

function toAdminBanglaDigits(n) {
  const bn = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(n).replace(/\d/g, d => bn[Number(d)] || d);
}

function replaceReqNumberInDesc(desc, oldReq, newReq, isBn) {
  if (!desc || !oldReq || oldReq === newReq) return desc;
  const oldStr = isBn ? toAdminBanglaDigits(oldReq) : String(oldReq);
  const newStr = isBn ? toAdminBanglaDigits(newReq) : String(newReq);
  let next = String(desc);
  if (next.includes(oldStr)) {
    next = next.replace(oldStr, newStr);
  } else if (isBn && next.includes(String(oldReq))) {
    next = next.replace(String(oldReq), newStr);
  }
  return next;
}

function shouldSyncSalaryAcrossLangs() {
  const cb = document.getElementById('sal-sync-all-langs');
  return cb ? Boolean(cb.checked) : true;
}

function applyCrossLangSyncForSalary(draft, baseline, activeLang) {
  if (!draft || !shouldSyncSalaryAcrossLangs()) return draft;
  const base = baseline || cloneDefaultSalaryPage();
  const caps = ['Bn', 'En', 'Ar'];
  const activeCap = activeLang === 'en' ? 'En' : (activeLang === 'ar' ? 'Ar' : 'Bn');
  const orderedCaps = [activeCap].concat(caps.filter(c => c !== activeCap));

  function syncFieldGroup(targetObj, baseObj, prefix) {
    const changedCaps = orderedCaps.filter(c => {
      const curVal = String(targetObj[prefix + c] || '').trim();
      const baseVal = baseObj ? String(baseObj[prefix + c] || '').trim() : '';
      return Boolean(curVal) && curVal !== baseVal;
    });
    if (changedCaps.length === 1) {
      const srcCap = changedCaps[0];
      const srcVal = String(targetObj[prefix + srcCap] || '').trim();
      caps.forEach(c => {
        if (c !== srcCap) {
          targetObj[prefix + c] = srcVal;
        }
      });
    }
  }

  ['title', 'subtitle', 'activeLabel', 'unit', 'badgeLocked', 'badgeClaim', 'badgeClaimed', 'modalNote'].forEach(prefix => {
    syncFieldGroup(draft, base, prefix);
  });

  if (Array.isArray(draft.tiers)) {
    draft.tiers.forEach((tier, idx) => {
      const baseTier = (base.tiers && base.tiers[idx]) || null;
      if (baseTier) {
        syncFieldGroup(tier, baseTier, 'name');
        syncFieldGroup(tier, baseTier, 'desc');
      }
    });
  }
  return draft;
}

function cloneDefaultSalaryPage() {
  return JSON.parse(JSON.stringify(DEFAULT_SALARY_PAGE_CONFIG));
}

function normalizeAdminSalaryPageConfig(raw) {
  const src = (raw && typeof raw === 'object') ? raw : {};
  const strOr = (v, fb) => (typeof v === 'string' && v.trim().length > 0) ? v.trim() : fb;
  const rawTiers = Array.isArray(src.tiers) && src.tiers.length > 0 ? src.tiers : DEFAULT_SALARY_PAGE_CONFIG.tiers;
  const tiers = rawTiers.map((t, idx) => {
    const def = DEFAULT_SALARY_PAGE_CONFIG.tiers[idx] || {
      id: `অবস্থান ${idx + 1}`,
      enabled: true,
      nameBn: `অবস্থান ${idx + 1}`,
      nameEn: `Position ${idx + 1}`,
      nameAr: `المركز ${idx + 1}`,
      req: Math.max(1, (idx + 1) * 10),
      salaryUsd: 10.00,
      descBn: `আপনার প্রথম ${(idx + 1) * 10} জন বা তার বেশি A-লেভেল সক্রিয় সদস্য থাকলে যোগ্য হবেন।`,
      descEn: `Qualify with ${(idx + 1) * 10} or more active A-Level members.`,
      descAr: `تتأهل عند استيفاء عدد الأعضاء النشطين المطلوب.`
    };
    const item = (t && typeof t === 'object') ? t : {};
    const parsedReq = parseInt(item.req, 10);
    const parsedUsd = parseFloat(item.salaryUsd !== undefined ? item.salaryUsd : item.salary);
    const nameBn = strOr(item.nameBn, def.nameBn);
    return {
      id: strOr(item.id, def.id || nameBn),
      enabled: item.enabled !== false,
      nameBn: nameBn,
      nameEn: strOr(item.nameEn, def.nameEn),
      nameAr: strOr(item.nameAr, def.nameAr),
      req: Number.isFinite(parsedReq) && parsedReq >= 1 ? parsedReq : def.req,
      salaryUsd: Number.isFinite(parsedUsd) && parsedUsd >= 0 ? Number(parsedUsd.toFixed(2)) : def.salaryUsd,
      descBn: strOr(item.descBn, def.descBn),
      descEn: strOr(item.descEn, def.descEn),
      descAr: strOr(item.descAr, def.descAr)
    };
  });

  return {
    titleBn: strOr(src.titleBn, DEFAULT_SALARY_PAGE_CONFIG.titleBn),
    titleEn: strOr(src.titleEn, DEFAULT_SALARY_PAGE_CONFIG.titleEn),
    titleAr: strOr(src.titleAr, DEFAULT_SALARY_PAGE_CONFIG.titleAr),
    subtitleBn: strOr(src.subtitleBn, DEFAULT_SALARY_PAGE_CONFIG.subtitleBn),
    subtitleEn: strOr(src.subtitleEn, DEFAULT_SALARY_PAGE_CONFIG.subtitleEn),
    subtitleAr: strOr(src.subtitleAr, DEFAULT_SALARY_PAGE_CONFIG.subtitleAr),
    activeLabelBn: strOr(src.activeLabelBn, DEFAULT_SALARY_PAGE_CONFIG.activeLabelBn),
    activeLabelEn: strOr(src.activeLabelEn, DEFAULT_SALARY_PAGE_CONFIG.activeLabelEn),
    activeLabelAr: strOr(src.activeLabelAr, DEFAULT_SALARY_PAGE_CONFIG.activeLabelAr),
    unitBn: strOr(src.unitBn, DEFAULT_SALARY_PAGE_CONFIG.unitBn),
    unitEn: strOr(src.unitEn, DEFAULT_SALARY_PAGE_CONFIG.unitEn),
    unitAr: strOr(src.unitAr, DEFAULT_SALARY_PAGE_CONFIG.unitAr),
    badgeLockedBn: strOr(src.badgeLockedBn, DEFAULT_SALARY_PAGE_CONFIG.badgeLockedBn),
    badgeLockedEn: strOr(src.badgeLockedEn, DEFAULT_SALARY_PAGE_CONFIG.badgeLockedEn),
    badgeLockedAr: strOr(src.badgeLockedAr, DEFAULT_SALARY_PAGE_CONFIG.badgeLockedAr),
    badgeClaimBn: strOr(src.badgeClaimBn, DEFAULT_SALARY_PAGE_CONFIG.badgeClaimBn),
    badgeClaimEn: strOr(src.badgeClaimEn, DEFAULT_SALARY_PAGE_CONFIG.badgeClaimEn),
    badgeClaimAr: strOr(src.badgeClaimAr, DEFAULT_SALARY_PAGE_CONFIG.badgeClaimAr),
    badgeClaimedBn: strOr(src.badgeClaimedBn, DEFAULT_SALARY_PAGE_CONFIG.badgeClaimedBn),
    badgeClaimedEn: strOr(src.badgeClaimedEn, DEFAULT_SALARY_PAGE_CONFIG.badgeClaimedEn),
    badgeClaimedAr: strOr(src.badgeClaimedAr, DEFAULT_SALARY_PAGE_CONFIG.badgeClaimedAr),
    modalNoteBn: strOr(src.modalNoteBn, DEFAULT_SALARY_PAGE_CONFIG.modalNoteBn),
    modalNoteEn: strOr(src.modalNoteEn, DEFAULT_SALARY_PAGE_CONFIG.modalNoteEn),
    modalNoteAr: strOr(src.modalNoteAr, DEFAULT_SALARY_PAGE_CONFIG.modalNoteAr),
    tiers: tiers
  };
}

let latestSystemConfig = Object.assign({}, DEFAULT_PLATFORM_CONTROLS, {
  packages: cloneDefaultPackages(),
  salaryPage: cloneDefaultSalaryPage()
});

function cloneDefaultPackages() {
  const out = {};
  PACKAGE_LEVEL_KEYS.forEach(lvl => {
    out[lvl] = Object.assign({}, DEFAULT_PACKAGE_CONFIGS[lvl]);
  });
  return out;
}

const LEGACY_ADMIN_PKG_RE = /^(ফ্রি স্তর|বেসিক প্যাকেজ|স্ট্যান্ডার্ড প্যাকেজ|সিলভার প্যাকেজ|গোল্ড প্যাকেজ|প্রিমিয়াম প্যাকেজ|এলিট প্যাকেজ|Free Tier|Basic Package|Standard Package|Silver Package|Gold Package|Premium Package|Elite Package|المستوى المجاني|الباقة الأساسية|الباقة القياسية|الباقة الفضية|الباقة الذهبية|الباقة المميزة|باقة النخبة|(এলিট|Elite|إيليت|एलीट)\s*LV[0-6])$/i;

function normalizePackagesMap(rawPackages) {
  const out = cloneDefaultPackages();
  if (!rawPackages || typeof rawPackages !== 'object') return out;
  PACKAGE_LEVEL_KEYS.forEach(lvl => {
    const src = rawPackages[lvl];
    if (!src || typeof src !== 'object') return;
    const def = DEFAULT_PACKAGE_CONFIGS[lvl];
    const parsedCount = parseInt(src.count, 10);
    const parsedRewardUsd = parseFloat(src.rewardUsd);
    const parsedPriceUsd = parseFloat(src.priceUsd);
    const parsedRewardBdt = parseFloat(src.reward);
    const parsedPriceBdt = parseFloat(src.price);
    const parsedValidity = parseInt(src.validityDays, 10);

    const rewardUsd = Number.isFinite(parsedRewardUsd) && parsedRewardUsd >= 0
      ? Number(parsedRewardUsd.toFixed(2))
      : (Number.isFinite(parsedRewardBdt) && parsedRewardBdt >= 0
          ? Number((parsedRewardBdt / ADMIN_USD_BASE_RATE).toFixed(2))
          : def.rewardUsd);
    const priceUsd = Number.isFinite(parsedPriceUsd) && parsedPriceUsd >= 0
      ? Number(parsedPriceUsd.toFixed(2))
      : (Number.isFinite(parsedPriceBdt) && parsedPriceBdt >= 0
          ? Number((parsedPriceBdt / ADMIN_USD_BASE_RATE).toFixed(2))
          : def.priceUsd);

    const rawBn = String(src.nameBn || '').trim();
    const rawEn = String(src.nameEn || '').trim();
    const rawAr = String(src.nameAr || '').trim();
    out[lvl] = {
      count: Number.isFinite(parsedCount) && parsedCount >= 1 ? parsedCount : def.count,
      rewardUsd: rewardUsd,
      priceUsd: priceUsd,
      reward: Number((rewardUsd * ADMIN_USD_BASE_RATE).toFixed(4)),
      price: Number((priceUsd * ADMIN_USD_BASE_RATE).toFixed(4)),
      validityDays: Number.isFinite(parsedValidity) && parsedValidity >= 1 ? parsedValidity : def.validityDays,
      currency: 'USD',
      nameBn: (rawBn && !LEGACY_ADMIN_PKG_RE.test(rawBn)) ? rawBn : def.nameBn,
      nameEn: (rawEn && !LEGACY_ADMIN_PKG_RE.test(rawEn)) ? rawEn : def.nameEn,
      nameAr: (rawAr && !LEGACY_ADMIN_PKG_RE.test(rawAr)) ? rawAr : def.nameAr
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
    const usdPrice = Number(pkg.priceUsd || 0);
    const priceLabel = usdPrice === 0 ? 'Free' : `$${usdPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
    opt.textContent = `${lvl} (${pkg.nameEn} - ${priceLabel})`;
  });
  if (currentVal) selectEl.value = currentVal;
}

let packageEditorDirty = false;
let platformControlsDirty = false;
let _lastRenderedPackagesJson = '';

function isEditingInsideForm(formId) {
  const active = document.activeElement;
  if (!active) return false;
  const tag = String(active.tagName || '').toUpperCase();
  if (tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT') return false;
  return Boolean(active.closest('#' + formId));
}

function renderPackageConfigEditor(packagesObj, force = false) {
  const container = document.getElementById('package-configs-editor');
  if (!container) return;
  const pkgs = normalizePackagesMap(packagesObj);
  const nextJson = JSON.stringify(pkgs);
  if (!force && (packageEditorDirty || isEditingInsideForm('package-controls-form'))) {
    return;
  }
  if (!force && container.querySelector('.pkg-cfg-input') && nextJson === _lastRenderedPackagesJson) {
    return;
  }
  _lastRenderedPackagesJson = nextJson;

  container.innerHTML = PACKAGE_LEVEL_KEYS.map(lvl => {
    const p = pkgs[lvl];
    const dailyUsd = Number((p.count * p.rewardUsd).toFixed(2));
    const totalValidityUsd = Number((dailyUsd * p.validityDays).toFixed(2));
    const priceUsd = Number(p.priceUsd || 0);
    const priceFmt = priceUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const rewardFmt = Number(p.rewardUsd || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const dailyFmt = dailyUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const totalFmt = totalValidityUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const ctaPreview = priceUsd === 0 ? `$0.00 Free` : `$${priceFmt} USD · Unlock now`;
    const isFreeTier = lvl === 'LV0';

    return `
      <div class="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs" data-pkg-row="${lvl}">
        <!-- VIP-Matched Dark Royal-Blue Live Card Preview -->
        <div class="px-4 py-3 text-white flex flex-col gap-2.5" style="background: linear-gradient(135deg, #071b50 0%, #0d2f7a 60%, #1248a8 100%);">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-md bg-sky-400/20 border border-sky-300/40 text-xs font-extrabold font-mono tracking-wide text-sky-200">${lvl}</span>
              <span class="text-sm font-bold text-white" data-pkg-title-preview="${lvl}">${escapeHtml(p.nameEn)}</span>
              ${isFreeTier ? '<span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">Free Trial</span>' : ''}
            </div>
            <span class="px-3 py-1 rounded-full text-[11px] font-bold font-mono text-white shadow-sm" style="background: linear-gradient(90deg, #1264c9 0%, #168bff 55%, #35c6e7 100%);" data-pkg-cta-preview="${lvl}">
              ${ctaPreview}
            </span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px]">
            <div class="rounded-lg bg-[#051238]/75 border border-sky-400/20 px-2.5 py-1.5">
              <div class="text-sky-200/75 text-[10px]">Daily Tasks</div>
              <div class="font-mono font-bold text-white text-xs mt-0.5" data-pkg-tasks-preview="${lvl}">${p.count}</div>
            </div>
            <div class="rounded-lg bg-[#051238]/75 border border-sky-400/20 px-2.5 py-1.5">
              <div class="text-sky-200/75 text-[10px]">Per Task</div>
              <div class="font-mono font-bold text-sky-300 text-xs mt-0.5" data-pkg-reward-preview="${lvl}">$${rewardFmt} USD</div>
            </div>
            <div class="rounded-lg bg-[#051238]/75 border border-sky-400/20 px-2.5 py-1.5">
              <div class="text-sky-200/75 text-[10px]">Valid Time</div>
              <div class="font-mono font-bold text-white text-xs mt-0.5" data-pkg-validity-preview="${lvl}">${p.validityDays} ${p.validityDays === 1 ? 'Day' : 'Days'}</div>
            </div>
            <div class="rounded-lg bg-[#051238]/75 border border-sky-400/20 px-2.5 py-1.5">
              <div class="text-sky-200/75 text-[10px]">Daily Income</div>
              <div class="font-mono font-bold text-emerald-300 text-xs mt-0.5" data-pkg-income="${lvl}">$${dailyFmt} USD</div>
            </div>
            <div class="rounded-lg bg-[#051238]/75 border border-sky-400/20 px-2.5 py-1.5 col-span-2 sm:col-span-1">
              <div class="text-sky-200/75 text-[10px]">Total (${p.validityDays}d)</div>
              <div class="font-mono font-bold text-amber-300 text-xs mt-0.5" data-pkg-total-income="${lvl}">$${totalFmt} USD</div>
            </div>
          </div>
        </div>

        <!-- Direct USD ($) Editable Inputs -->
        <div class="p-3.5 bg-slate-50/70 space-y-3">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div>
              <label class="block text-[11px] font-semibold text-slate-600 mb-1">Package Price ($ USD)</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">$</span>
                <input type="number" min="0" step="0.01" required
                  data-pkg-level="${lvl}" data-pkg-field="priceUsd" value="${priceUsd.toFixed(2)}"
                  class="pkg-cfg-input w-full pl-6 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-mono font-bold text-slate-900 focus:outline-none focus:border-sky-500" />
              </div>
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-slate-600 mb-1">Daily Tasks (দৈনিক কাজ)</label>
              <input type="number" min="1" step="1" required
                data-pkg-level="${lvl}" data-pkg-field="count" value="${p.count}"
                class="pkg-cfg-input w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-mono font-bold text-slate-900 focus:outline-none focus:border-sky-500" />
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-slate-600 mb-1">Per Task ($ USD)</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">$</span>
                <input type="number" min="0" step="0.01" required
                  data-pkg-level="${lvl}" data-pkg-field="rewardUsd" value="${Number(p.rewardUsd || 0).toFixed(2)}"
                  class="pkg-cfg-input w-full pl-6 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-mono font-bold text-emerald-700 focus:outline-none focus:border-sky-500" />
              </div>
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-slate-600 mb-1">Valid Time / Days (মেয়াদ)</label>
              <input type="number" min="1" step="1" required
                data-pkg-level="${lvl}" data-pkg-field="validityDays" value="${p.validityDays}"
                class="pkg-cfg-input w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-mono font-bold text-sky-700 focus:outline-none focus:border-sky-500" />
            </div>
            <div>
              <label class="block text-[11px] font-semibold text-slate-600 mb-1">VIP Tier Name</label>
              <input type="text" required
                data-pkg-level="${lvl}" data-pkg-field="nameEn" value="${escapeHtml(p.nameEn)}"
                class="pkg-cfg-input w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:outline-none focus:border-sky-500" />
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.pkg-cfg-input').forEach(inp => {
    const onPkgInput = () => {
      packageEditorDirty = true;
      const lvl = inp.dataset.pkgLevel;
      if (!lvl) return;
      const countInp = container.querySelector(`[data-pkg-level="${lvl}"][data-pkg-field="count"]`);
      const rewardInp = container.querySelector(`[data-pkg-level="${lvl}"][data-pkg-field="rewardUsd"]`);
      const priceInp = container.querySelector(`[data-pkg-level="${lvl}"][data-pkg-field="priceUsd"]`);
      const valInp = container.querySelector(`[data-pkg-level="${lvl}"][data-pkg-field="validityDays"]`);
      const nameInp = container.querySelector(`[data-pkg-level="${lvl}"][data-pkg-field="nameEn"]`);

      const c = Math.max(1, parseInt(countInp?.value || '1', 10) || 1);
      const r = Math.max(0, parseFloat(rewardInp?.value || '0') || 0);
      const pr = Math.max(0, parseFloat(priceInp?.value || '0') || 0);
      const v = Math.max(1, parseInt(valInp?.value || '1', 10) || 1);
      const daily = Number((c * r).toFixed(2));
      const totalValid = Number((daily * v).toFixed(2));

      const tasksEl = container.querySelector(`[data-pkg-tasks-preview="${lvl}"]`);
      const rewEl = container.querySelector(`[data-pkg-reward-preview="${lvl}"]`);
      const incEl = container.querySelector(`[data-pkg-income="${lvl}"]`);
      const totEl = container.querySelector(`[data-pkg-total-income="${lvl}"]`);
      const valPrevEl = container.querySelector(`[data-pkg-validity-preview="${lvl}"]`);
      const ctaEl = container.querySelector(`[data-pkg-cta-preview="${lvl}"]`);
      const titleEl = container.querySelector(`[data-pkg-title-preview="${lvl}"]`);

      if (tasksEl) tasksEl.textContent = String(c);
      if (rewEl) rewEl.textContent = `$${r.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
      if (incEl) incEl.textContent = `$${daily.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
      if (totEl) {
        totEl.textContent = `$${totalValid.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
        if (totEl.previousElementSibling) totEl.previousElementSibling.textContent = `Total (${v}d)`;
      }
      if (valPrevEl) valPrevEl.textContent = `${v} ${v === 1 ? 'Day' : 'Days'}`;
      if (ctaEl) {
        ctaEl.textContent = pr === 0
          ? '$0.00 Free'
          : `$${pr.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD · Unlock now`;
      }
      if (titleEl && nameInp) titleEl.textContent = nameInp.value.trim() || lvl;
    };
    inp.addEventListener('input', onPkgInput);
    inp.addEventListener('change', () => { packageEditorDirty = true; });
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
    const rewardUsdVal = parseFloat(getVal('rewardUsd'));
    const priceUsdVal = parseFloat(getVal('priceUsd'));
    const validityVal = parseInt(getVal('validityDays'), 10);
    const cleanName = String(getVal('nameEn')).trim() || def.nameEn;

    const finalCount = Number.isFinite(countVal) && countVal >= 1 ? countVal : def.count;
    const finalRewardUsd = Number.isFinite(rewardUsdVal) && rewardUsdVal >= 0 ? Number(rewardUsdVal.toFixed(2)) : def.rewardUsd;
    const finalPriceUsd = Number.isFinite(priceUsdVal) && priceUsdVal >= 0 ? Number(priceUsdVal.toFixed(2)) : def.priceUsd;
    const finalValidity = Number.isFinite(validityVal) && validityVal >= 1 ? validityVal : def.validityDays;

    out[lvl] = {
      count: finalCount,
      rewardUsd: finalRewardUsd,
      priceUsd: finalPriceUsd,
      dailyIncomeUsd: Number((finalCount * finalRewardUsd).toFixed(2)),
      reward: Number((finalRewardUsd * ADMIN_USD_BASE_RATE).toFixed(4)),
      price: Number((finalPriceUsd * ADMIN_USD_BASE_RATE).toFixed(4)),
      validityDays: finalValidity,
      currency: 'USD',
      nameBn: cleanName,
      nameEn: cleanName,
      nameAr: cleanName
    };
  });
  return out;
}

function resetPackageConfigsToDefault() {
  renderPackageConfigEditor(DEFAULT_PACKAGE_CONFIGS, true);
  packageEditorDirty = true;
  showToast('Default USD VIP package values loaded. Click "Save Package & Task Settings" to sync live.', 'success');
}

function markSalaryEditorDirty(dirty) {
  salaryEditorDirty = Boolean(dirty);
  const badge = document.getElementById('salary-dirty-badge');
  if (badge) badge.classList.toggle('hidden', !salaryEditorDirty);
}

function setSalaryEditorLang(lang) {
  salaryEditorLang = (lang === 'en' || lang === 'ar') ? lang : 'bn';
  document.querySelectorAll('.salary-lang-tab').forEach(btn => {
    const active = btn.dataset.salaryLang === salaryEditorLang;
    btn.className = active
      ? 'salary-lang-tab px-3 py-1 rounded-md text-xs font-semibold bg-white text-slate-900 shadow-xs cursor-pointer'
      : 'salary-lang-tab px-3 py-1 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer';
  });
  document.querySelectorAll('[data-salary-lang-group]').forEach(group => {
    group.classList.toggle('hidden', group.dataset.salaryLangGroup !== salaryEditorLang);
  });
  renderSalaryTiersEditor();
  renderSalaryLivePreview();
}

function hydrateSalaryMetaInputs(cfg) {
  const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
  setVal('sal-title-bn', cfg.titleBn);
  setVal('sal-title-en', cfg.titleEn);
  setVal('sal-title-ar', cfg.titleAr);
  setVal('sal-subtitle-bn', cfg.subtitleBn);
  setVal('sal-subtitle-en', cfg.subtitleEn);
  setVal('sal-subtitle-ar', cfg.subtitleAr);
  setVal('sal-active-label-bn', cfg.activeLabelBn);
  setVal('sal-active-label-en', cfg.activeLabelEn);
  setVal('sal-active-label-ar', cfg.activeLabelAr);
  setVal('sal-unit-bn', cfg.unitBn);
  setVal('sal-unit-en', cfg.unitEn);
  setVal('sal-unit-ar', cfg.unitAr);
  setVal('sal-locked-bn', cfg.badgeLockedBn);
  setVal('sal-locked-en', cfg.badgeLockedEn);
  setVal('sal-locked-ar', cfg.badgeLockedAr);
  setVal('sal-claim-bn', cfg.badgeClaimBn);
  setVal('sal-claim-en', cfg.badgeClaimEn);
  setVal('sal-claim-ar', cfg.badgeClaimAr);
  setVal('sal-claimed-bn', cfg.badgeClaimedBn);
  setVal('sal-claimed-en', cfg.badgeClaimedEn);
  setVal('sal-claimed-ar', cfg.badgeClaimedAr);
  setVal('sal-modal-note-bn', cfg.modalNoteBn);
  setVal('sal-modal-note-en', cfg.modalNoteEn);
  setVal('sal-modal-note-ar', cfg.modalNoteAr);
}

function syncSalaryDraftMetaFromDom() {
  if (!salaryEditorDraft) salaryEditorDraft = normalizeAdminSalaryPageConfig(latestSystemConfig.salaryPage);
  const getVal = id => { const el = document.getElementById(id); return el ? el.value : ''; };
  salaryEditorDraft.titleBn = getVal('sal-title-bn');
  salaryEditorDraft.titleEn = getVal('sal-title-en');
  salaryEditorDraft.titleAr = getVal('sal-title-ar');
  salaryEditorDraft.subtitleBn = getVal('sal-subtitle-bn');
  salaryEditorDraft.subtitleEn = getVal('sal-subtitle-en');
  salaryEditorDraft.subtitleAr = getVal('sal-subtitle-ar');
  salaryEditorDraft.activeLabelBn = getVal('sal-active-label-bn');
  salaryEditorDraft.activeLabelEn = getVal('sal-active-label-en');
  salaryEditorDraft.activeLabelAr = getVal('sal-active-label-ar');
  salaryEditorDraft.unitBn = getVal('sal-unit-bn');
  salaryEditorDraft.unitEn = getVal('sal-unit-en');
  salaryEditorDraft.unitAr = getVal('sal-unit-ar');
  salaryEditorDraft.badgeLockedBn = getVal('sal-locked-bn');
  salaryEditorDraft.badgeLockedEn = getVal('sal-locked-en');
  salaryEditorDraft.badgeLockedAr = getVal('sal-locked-ar');
  salaryEditorDraft.badgeClaimBn = getVal('sal-claim-bn');
  salaryEditorDraft.badgeClaimEn = getVal('sal-claim-en');
  salaryEditorDraft.badgeClaimAr = getVal('sal-claim-ar');
  salaryEditorDraft.badgeClaimedBn = getVal('sal-claimed-bn');
  salaryEditorDraft.badgeClaimedEn = getVal('sal-claimed-en');
  salaryEditorDraft.badgeClaimedAr = getVal('sal-claimed-ar');
  salaryEditorDraft.modalNoteBn = getVal('sal-modal-note-bn');
  salaryEditorDraft.modalNoteEn = getVal('sal-modal-note-en');
  salaryEditorDraft.modalNoteAr = getVal('sal-modal-note-ar');
}

function renderSalaryTiersEditor() {
  const container = document.getElementById('salary-tiers-editor');
  if (!container) return;
  if (!salaryEditorDraft) salaryEditorDraft = normalizeAdminSalaryPageConfig(latestSystemConfig.salaryPage);

  const l = salaryEditorLang;
  const nameKey = l === 'en' ? 'nameEn' : (l === 'ar' ? 'nameAr' : 'nameBn');
  const descKey = l === 'en' ? 'descEn' : (l === 'ar' ? 'descAr' : 'descBn');
  const nameLabel = l === 'en' ? 'Position Name (EN)' : (l === 'ar' ? 'اسم المنصب (AR)' : 'পদের নাম (বাংলা)');
  const descLabel = l === 'en' ? 'Description (EN)' : (l === 'ar' ? 'الوصف (AR)' : 'বিবরণ লেখা (বাংলা)');

  const countBadge = document.getElementById('nav-salary-tiers-count');
  if (countBadge) {
    const enabledCount = salaryEditorDraft.tiers.filter(t => t.enabled !== false).length;
    countBadge.textContent = String(enabledCount);
  }

  container.innerHTML = salaryEditorDraft.tiers.map((tier, idx) => {
    const iconSvg = ADMIN_SALARY_ICON_SVGS[idx % ADMIN_SALARY_ICON_SVGS.length];
    const isEnabled = tier.enabled !== false;
    return `
      <div class="rounded-xl border ${isEnabled ? 'border-slate-200/90 bg-slate-50/70' : 'border-slate-200/50 bg-slate-100/60 opacity-70'} p-3.5 space-y-3" data-sal-tier-idx="${idx}">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-lg bg-[#0b1730] flex items-center justify-center shrink-0">${iconSvg}</div>
            <div>
              <div class="text-xs font-bold text-slate-900" data-sal-tier-title>#${idx + 1} · ${escapeHtml(tier[nameKey] || tier.nameBn)}</div>
              <div class="text-[11px] font-mono text-slate-500" data-sal-tier-meta>Req: ${tier.req} members · <span class="text-emerald-700 font-semibold">$${Number(tier.salaryUsd || 0).toFixed(2)} USD</span></div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <label class="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 cursor-pointer select-none">
              <input type="checkbox" ${isEnabled ? 'checked' : ''} onchange="toggleSalaryTierEnabled(${idx}, this.checked)"
                class="rounded border-slate-300 text-slate-900 focus:ring-slate-500 cursor-pointer" />
              <span>${isEnabled ? 'Visible' : 'Hidden'}</span>
            </label>
            ${salaryEditorDraft.tiers.length > 1 ? `
              <button type="button" onclick="removeSalaryTierRow(${idx})"
                class="px-2 py-1 rounded-md bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white text-[11px] font-semibold transition cursor-pointer">
                Delete
              </button>` : ''}
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-[11px] font-medium text-slate-600 mb-1">${nameLabel}</label>
            <input type="text" required value="${escapeHtml(tier[nameKey] || '')}"
              oninput="updateSalaryTierField(${idx}, '${nameKey}', this.value)"
              class="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-400" />
          </div>
          <div>
            <label class="block text-[11px] font-medium text-slate-600 mb-1">প্রয়োজনীয় সদস্য (Req. Members)</label>
            <input type="number" min="1" step="1" required value="${tier.req}"
              oninput="updateSalaryTierField(${idx}, 'req', this.value)"
              class="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-mono font-semibold text-slate-900 focus:outline-none focus:border-slate-400" />
          </div>
          <div>
            <label class="block text-[11px] font-medium text-slate-600 mb-1">মাসিক বেতন (Amount $ USD)</label>
            <input type="number" min="0" step="0.01" required value="${Number(tier.salaryUsd || 0)}"
              oninput="updateSalaryTierField(${idx}, 'salaryUsd', this.value)"
              class="w-full px-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-sm font-mono font-bold text-emerald-700 focus:outline-none focus:border-emerald-500" />
          </div>
        </div>

        <div>
          <label class="block text-[11px] font-medium text-slate-600 mb-1">${descLabel}</label>
          <input type="text" required data-sal-tier-desc-inp value="${escapeHtml(tier[descKey] || '')}"
            oninput="updateSalaryTierField(${idx}, '${descKey}', this.value)"
            class="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-slate-400" />
        </div>
      </div>
    `;
  }).join('');
}

function renderSalaryLivePreview() {
  const preview = document.getElementById('salary-live-preview');
  if (!preview) return;
  syncSalaryDraftMetaFromDom();
  const cfg = normalizeAdminSalaryPageConfig(salaryEditorDraft);
  const l = salaryEditorLang;
  const pick = (bn, en, ar) => l === 'en' ? en : (l === 'ar' ? ar : bn);
  const title = pick(cfg.titleBn, cfg.titleEn, cfg.titleAr);
  const subtitle = pick(cfg.subtitleBn, cfg.subtitleEn, cfg.subtitleAr);
  const activeLabel = pick(cfg.activeLabelBn, cfg.activeLabelEn, cfg.activeLabelAr);
  const unitTxt = pick(cfg.unitBn, cfg.unitEn, cfg.unitAr);
  const lockedLabel = pick(cfg.badgeLockedBn, cfg.badgeLockedEn, cfg.badgeLockedAr);
  const visibleTiers = cfg.tiers.filter(t => t.enabled !== false);

  preview.innerHTML = `
    <div ${l === 'ar' ? 'dir="rtl"' : ''}>
      <h3 class="text-center text-lg font-bold text-[#f3f4f6] leading-snug">${escapeHtml(title)}</h3>
      <p class="text-center text-xs text-[#cbd5e1] mt-1 mb-3">${escapeHtml(subtitle)}</p>

      <div class="mb-3 rounded-lg bg-[#0d1f47] border border-[#1d3b7a] px-3 py-2 flex items-center justify-between text-[11px]">
        <span class="text-[#cbd5e1]">${escapeHtml(activeLabel)}</span>
        <span class="font-mono font-bold text-[#38bdf8]">0 ${escapeHtml(unitTxt)}</span>
      </div>

      <div class="divide-y divide-slate-400/15">
        ${visibleTiers.length === 0 ? `<div class="py-6 text-center text-xs text-slate-400">No visible positions enabled.</div>` : visibleTiers.map((t, idx) => {
          const iconSvg = ADMIN_SALARY_ICON_SVGS[idx % ADMIN_SALARY_ICON_SVGS.length];
          const posName = pick(t.nameBn, t.nameEn, t.nameAr);
          const desc = pick(t.descBn, t.descEn, t.descAr).replace(/\{req\}/g, String(t.req));
          return `
            <div class="flex items-center gap-2.5 py-2.5">
              <div class="w-9 h-9 flex items-center justify-center shrink-0">${iconSvg}</div>
              <div class="w-16 shrink-0 text-xs font-bold text-[#f3f4f6] truncate">${escapeHtml(posName)}</div>
              <div class="flex-1 min-w-0">
                <div class="text-[11px] leading-snug text-[#e2e8f0]">${escapeHtml(desc)}</div>
                <div class="flex items-center gap-1.5 mt-1.5">
                  <div class="flex-1 h-1.5 rounded-full bg-[#071638] overflow-hidden"><div class="h-full bg-[#1877f2]" style="width: 0%;"></div></div>
                  <span class="text-[10px] font-bold text-slate-300">0%</span>
                </div>
                <div class="text-[10px] font-mono font-semibold text-[#38bdf8] mt-0.5">0 / ${t.req} ${escapeHtml(unitTxt)}</div>
              </div>
              <div class="w-20 shrink-0 rounded-lg bg-[#071638] py-1.5 px-1.5 text-center">
                <div class="text-[9.5px] font-semibold text-[#cbd5e1] truncate">${escapeHtml(lockedLabel)}</div>
                <div class="text-xs font-bold font-mono text-white mt-0.5">$${Number(t.salaryUsd || 0).toFixed(2)}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function updateSalaryTierField(idx, field, value) {
  if (!salaryEditorDraft || !salaryEditorDraft.tiers[idx]) return;
  const tier = salaryEditorDraft.tiers[idx];
  if (field === 'req') {
    const prevReq = Number(tier.req) || 1;
    const n = parseInt(value, 10);
    const nextReq = Number.isFinite(n) && n >= 1 ? n : 1;
    tier.req = nextReq;
    if (prevReq !== nextReq) {
      tier.descBn = replaceReqNumberInDesc(tier.descBn, prevReq, nextReq, true);
      tier.descEn = replaceReqNumberInDesc(tier.descEn, prevReq, nextReq, false);
      tier.descAr = replaceReqNumberInDesc(tier.descAr, prevReq, nextReq, false);
      const cardEl = document.querySelector(`[data-sal-tier-idx="${idx}"]`);
      const descInp = cardEl ? cardEl.querySelector('[data-sal-tier-desc-inp]') : null;
      if (descInp) {
        const l = salaryEditorLang;
        const descKey = l === 'en' ? 'descEn' : (l === 'ar' ? 'descAr' : 'descBn');
        descInp.value = tier[descKey] || '';
      }
    }
  } else if (field === 'salaryUsd') {
    const n = parseFloat(value);
    tier.salaryUsd = Number.isFinite(n) && n >= 0 ? Number(n.toFixed(2)) : 0;
  } else {
    tier[field] = String(value || '');
  }
  const card = document.querySelector(`[data-sal-tier-idx="${idx}"]`);
  if (card) {
    const l = salaryEditorLang;
    const nameKey = l === 'en' ? 'nameEn' : (l === 'ar' ? 'nameAr' : 'nameBn');
    const titleEl = card.querySelector('[data-sal-tier-title]');
    if (titleEl) titleEl.textContent = `#${idx + 1} · ${tier[nameKey] || tier.nameBn}`;
    const metaEl = card.querySelector('[data-sal-tier-meta]');
    if (metaEl) metaEl.innerHTML = `Req: ${tier.req} members · <span class="text-emerald-700 font-semibold">$${Number(tier.salaryUsd || 0).toFixed(2)} USD</span>`;
  }
  markSalaryEditorDirty(true);
  renderSalaryLivePreview();
}

function toggleSalaryTierEnabled(idx, checked) {
  if (!salaryEditorDraft || !salaryEditorDraft.tiers[idx]) return;
  salaryEditorDraft.tiers[idx].enabled = Boolean(checked);
  markSalaryEditorDirty(true);
  renderSalaryTiersEditor();
  renderSalaryLivePreview();
}

function addSalaryTierRow() {
  if (!salaryEditorDraft) salaryEditorDraft = normalizeAdminSalaryPageConfig(latestSystemConfig.salaryPage);
  const nextNum = salaryEditorDraft.tiers.length + 1;
  const lastTier = salaryEditorDraft.tiers[salaryEditorDraft.tiers.length - 1];
  const nextReq = lastTier ? (Number(lastTier.req) + 25) : 10;
  const nextUsd = lastTier ? Number((Number(lastTier.salaryUsd) + 20).toFixed(2)) : 10;
  salaryEditorDraft.tiers.push({
    id: `অবস্থান ${nextNum}`,
    enabled: true,
    nameBn: `অবস্থান ${nextNum}`,
    nameEn: `Position ${nextNum}`,
    nameAr: `المركز ${nextNum}`,
    req: nextReq,
    salaryUsd: nextUsd,
    descBn: `আপনার প্রথম ${nextReq} জন বা তার বেশি A-লেভেল সক্রিয় সদস্য (রিচার্জ ও প্যাকেজ ক্রয়) থাকলে যোগ্য হবেন।`,
    descEn: `Qualify when you have ${nextReq} or more active A-Level members (with paid package).`,
    descAr: `تتأهل عندما يكون لديك ${nextReq} عضوًا نشطًا أو أكثر في المستوى A.`
  });
  markSalaryEditorDirty(true);
  renderSalaryTiersEditor();
  renderSalaryLivePreview();
  showToast(`Added Position #${nextNum}. Click "Save & Sync Live" to publish.`, 'success');
}

function removeSalaryTierRow(idx) {
  if (!salaryEditorDraft || salaryEditorDraft.tiers.length <= 1) return;
  salaryEditorDraft.tiers.splice(idx, 1);
  markSalaryEditorDirty(true);
  renderSalaryTiersEditor();
  renderSalaryLivePreview();
}

function resetSalaryPageDefaults() {
  salaryEditorDraft = cloneDefaultSalaryPage();
  hydrateSalaryMetaInputs(salaryEditorDraft);
  renderSalaryTiersEditor();
  renderSalaryLivePreview();
  markSalaryEditorDirty(true);
  showToast('Default salary page settings loaded. Click "Save & Sync Live" to publish.', 'success');
}

function hydrateSalaryPageEditor(salaryObj, force) {
  if (salaryEditorDirty && !force) return;
  const normalized = normalizeAdminSalaryPageConfig(salaryObj);
  salaryEditorDraft = JSON.parse(JSON.stringify(normalized));
  salaryBaselineSnapshot = JSON.parse(JSON.stringify(normalized));
  hydrateSalaryMetaInputs(salaryEditorDraft);
  renderSalaryTiersEditor();
  renderSalaryLivePreview();
  markSalaryEditorDirty(false);
}

function broadcastSystemConfigUpdate(configObj) {
  try {
    if (configObj && configObj.packages) {
      localStorage.setItem('alo_system_packages_cache', JSON.stringify(configObj.packages));
    }
    if (configObj && configObj.salaryPage) {
      localStorage.setItem('alo_system_salary_cache', JSON.stringify(configObj.salaryPage));
    }
    localStorage.setItem('alo_system_config_updated_at', String(Date.now()));
  } catch (e) {}
  try {
    if (typeof BroadcastChannel !== 'undefined') {
      const ch = new BroadcastChannel('alo_system_config_sync');
      ch.postMessage({ type: 'SYSTEM_CONFIG_UPDATED', config: configObj, ts: Date.now() });
      ch.close();
    }
  } catch (e) {}
}

async function handleSalaryPageSave(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();
  syncSalaryDraftMetaFromDom();
  const syncedDraft = applyCrossLangSyncForSalary(
    JSON.parse(JSON.stringify(salaryEditorDraft)),
    salaryBaselineSnapshot,
    salaryEditorLang
  );
  const normalizedSalary = normalizeAdminSalaryPageConfig(syncedDraft);

  const configObj = Object.assign({}, DEFAULT_PLATFORM_CONTROLS, latestSystemConfig, {
    packages: normalizePackagesMap(latestSystemConfig.packages),
    salaryPage: normalizedSalary
  });

  const saved = await saveSystemConfigPayload(configObj, 'বেতন পেজ সফলভাবে সেভ ও লাইভ ওয়েবসাইটে রিয়েল টাইম সিঙ্ক হয়েছে!');
  if (saved) {
    broadcastSystemConfigUpdate(configObj);
    markSalaryEditorDirty(false);
    hydrateSalaryPageEditor(normalizedSalary, true);
  }
}

function hydratePlatformControlsForm(sysRow, force = false) {
  let parsed = {};
  if (sysRow && sysRow.bkash_optional) {
    try {
      parsed = typeof sysRow.bkash_optional === 'string'
        ? JSON.parse(sysRow.bkash_optional)
        : sysRow.bkash_optional;
    } catch (e) {}
  }
  const normalizedPkgs = normalizePackagesMap(parsed.packages);
  const normalizedSalary = normalizeAdminSalaryPageConfig(parsed.salaryPage);
  const cfg = Object.assign({}, DEFAULT_PLATFORM_CONTROLS, parsed, {
    packages: normalizedPkgs,
    salaryPage: normalizedSalary
  });
  latestSystemConfig = cfg;

  if (force || (!platformControlsDirty && !isEditingInsideForm('platform-controls-form'))) {
    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
    setVal('pc-withdraw-enabled', cfg.withdrawEnabled === false ? 'false' : 'true');
    setVal('pc-min-withdraw', cfg.minWithdraw);
    setVal('pc-withdraw-ratio', cfg.withdrawNetPercent);
    setVal('pc-min-recharge', cfg.minRecharge);
    setVal('pc-usdt-rate', cfg.usdtRate);
    setVal('pc-usdt-address', cfg.usdtAddress);
    setVal('pc-telegram-url', cfg.telegramUrl);
    setVal('pc-manager-id', cfg.managerId);
    setVal('pc-bd-real-otp-enabled', cfg.bdRealOtpEnabled === false ? 'false' : 'true');
    setVal('pc-cpanel-otp-url', cfg.cpanelOtpUrl || '');
  }

  renderPackageConfigEditor(normalizedPkgs, force);
  syncEditUserPackageOptions(normalizedPkgs);
  hydrateSalaryPageEditor(normalizedSalary, force);
}

async function saveSystemConfigPayload(configObj, successMsg) {
  try {
    if (!supabaseClient) initSupabaseClient();
    if (!supabaseClient) {
      showToast('Supabase client is not connected.', 'error');
      return false;
    }

    const payload = {
      phone: 'SYSTEM_CONFIG',
      account_number: 'SYSTEM_CONFIG',
      name: 'Platform Configuration',
      member_id: 'SYSCONFIG',
      package_level: 'LV0',
      balance: 0,
      bkash_optional: JSON.stringify(configObj),
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabaseClient
      .from('users')
      .upsert(payload, { onConflict: 'phone' })
      .select('phone, updated_at')
      .maybeSingle();

    if (error) {
      showToast('Failed to save configuration: ' + error.message, 'error');
      return false;
    }

    if (!data) {
      const updRes = await supabaseClient
        .from('users')
        .update({
          bkash_optional: payload.bkash_optional,
          updated_at: payload.updated_at
        })
        .eq('phone', 'SYSTEM_CONFIG')
        .select('phone, updated_at')
        .maybeSingle();
      if (updRes.error) {
        showToast('Failed to update configuration: ' + updRes.error.message, 'error');
        return false;
      }
    }

    latestSystemConfig = configObj;
    broadcastSystemConfigUpdate(configObj);
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
  const rawOtpUrl = (document.getElementById('pc-cpanel-otp-url')?.value || '').trim().replace(/\/+$/, '');
  const configObj = Object.assign({}, latestSystemConfig, {
    withdrawEnabled: document.getElementById('pc-withdraw-enabled').value !== 'false',
    minWithdraw: parseFloat(document.getElementById('pc-min-withdraw').value) || 700,
    withdrawNetPercent: parseFloat(document.getElementById('pc-withdraw-ratio').value) || 50,
    minRecharge: parseFloat(document.getElementById('pc-min-recharge').value) || 126,
    usdtRate: parseFloat(document.getElementById('pc-usdt-rate').value) || 126,
    usdtAddress: document.getElementById('pc-usdt-address').value.trim(),
    telegramUrl: document.getElementById('pc-telegram-url').value.trim(),
    managerId: document.getElementById('pc-manager-id').value.trim(),
    bdRealOtpEnabled: (document.getElementById('pc-bd-real-otp-enabled')?.value || 'true') !== 'false',
    cpanelOtpUrl: rawOtpUrl,
    packages: normalizePackagesMap(latestSystemConfig.packages),
    salaryPage: normalizeAdminSalaryPageConfig(latestSystemConfig.salaryPage)
  });

  const saved = await saveSystemConfigPayload(configObj, 'Platform rules saved and synced to live website.');
  if (saved) {
    platformControlsDirty = false;
  }
}

async function handlePackageControlsSave(e) {
  e.preventDefault();
  const packagesObj = collectPackagesFromForm();
  const configObj = Object.assign({}, DEFAULT_PLATFORM_CONTROLS, latestSystemConfig, {
    packages: packagesObj,
    salaryPage: normalizeAdminSalaryPageConfig(latestSystemConfig.salaryPage)
  });

  const saved = await saveSystemConfigPayload(configObj, 'VIP Packages (USD price, tasks, reward & validity days) saved and synced live!');
  if (saved) {
    packageEditorDirty = false;
    renderPackageConfigEditor(packagesObj, true);
  }
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
  salary: 'Salary Page Control (বেতন পেজ)',
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

  renderPackageConfigEditor(latestSystemConfig.packages, true);
  syncEditUserPackageOptions(latestSystemConfig.packages);
  hydrateSalaryPageEditor(latestSystemConfig.salaryPage, true);
  initSupabaseClient();
  await refreshAllData(false);

  if (autoRefreshTimer) clearInterval(autoRefreshTimer);
  autoRefreshTimer = setInterval(() => {
    if (document.hidden || !isAuthenticated()) return;
    const editModalOpen = !document.getElementById('edit-user-modal')?.classList.contains('hidden');
    const adjustModalOpen = !document.getElementById('manual-adjust-modal')?.classList.contains('hidden');
    if (editModalOpen || adjustModalOpen || isAdminFormFocused()) return;
    refreshAllData(false);
  }, 45000);
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('admin-login-form')?.addEventListener('submit', handleLoginSubmit);
  document.getElementById('edit-user-form')?.addEventListener('submit', handleSaveUserForm);
  document.getElementById('manual-adjust-form')?.addEventListener('submit', handleManualAdjustSubmit);
  const platformForm = document.getElementById('platform-controls-form');
  platformForm?.addEventListener('submit', handlePlatformControlsSave);
  platformForm?.addEventListener('input', () => { platformControlsDirty = true; });
  platformForm?.addEventListener('change', () => { platformControlsDirty = true; });
  document.getElementById('package-controls-form')?.addEventListener('submit', handlePackageControlsSave);
  document.getElementById('salary-page-form')?.addEventListener('submit', handleSalaryPageSave);
  document.querySelectorAll('.sal-meta-inp').forEach(el => {
    el.addEventListener('input', () => {
      markSalaryEditorDirty(true);
      renderSalaryLivePreview();
    });
  });
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
window.applyCustomLiveModalDelta = applyCustomLiveModalDelta;
window.setManualAdjustOp = setManualAdjustOp;
window.updateManualAdjustUserPreview = updateManualAdjustUserPreview;
window.fillMaxUnfreezeAmount = fillMaxUnfreezeAmount;
window.moveUserFrozenToAvailable = moveUserFrozenToAvailable;
window.quickUnfreezeAllToAvailable = quickUnfreezeAllToAvailable;
window.deleteEditedUser = deleteEditedUser;
window.openManualAdjustModal = openManualAdjustModal;
window.closeManualAdjustModal = closeManualAdjustModal;
window.renderCommissionsTable = renderCommissionsTable;
window.setSalaryEditorLang = setSalaryEditorLang;
window.updateSalaryTierField = updateSalaryTierField;
window.toggleSalaryTierEnabled = toggleSalaryTierEnabled;
window.addSalaryTierRow = addSalaryTierRow;
window.removeSalaryTierRow = removeSalaryTierRow;
window.resetSalaryPageDefaults = resetSalaryPageDefaults;
window.resetPackageConfigsToDefault = resetPackageConfigsToDefault;
window.resetDatabaseDefaults = resetDatabaseDefaults;
window.exportCsv = exportCsv;
window.copyToClipboard = copyToClipboard;
