import React from 'react';
import { createRoot } from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';
import PromoBanner from './PromoBanner.jsx';

// Expose createClient globally on window.supabase
try {
  window.supabase = { createClient };
} catch (e) {}

// Cloud Firestore is not used (Supabase handles all live cloud persistence)
try {
  window.aloFirebase = null;
} catch (e) {}

// 2. Initialize Supabase (Live Cloud Database & Realtime Sync)
const defaultProject = 'scbpjqsxntqdzwnqyjmi';
const defaultUrl = 'https://scbpjqsxntqdzwnqyjmi.supabase.co';
const defaultKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjYnBqcXN4bnRxZHp3bnF5am1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5OTIyMzQsImV4cCI6MjEwNzU2ODIzNH0.3emtfDdr9SNjRfCb6CVHF0QqfOe_iBvT9rbX_c94ER4';

function initSupabaseInstance(url, key) {
  const activeUrl = url || defaultUrl;
  const activeKey = key || defaultKey;
  const projectRef = (activeUrl.split('//')[1] || '').split('.')[0] || defaultProject;

  try {
    const clientFactory = (window.supabase && typeof window.supabase.createClient === 'function')
      ? window.supabase.createClient
      : createClient;

    const supabase = clientFactory(activeUrl, activeKey, {
      auth: { persistSession: true, autoRefreshToken: true },
      realtime: { params: { eventsPerSecond: 10 } }
    });

    window.aloSupabase = supabase;
    window.aloSupabaseConfig = { projectRef, url: activeUrl, connected: true };
    window.dispatchEvent(new CustomEvent('alo-supabase-ready', { detail: { supabase, projectRef } }));
    console.log('✅ Supabase connected live successfully! Project:', projectRef);
    return supabase;
  } catch (t) {
    console.warn('Supabase initialization warning:', t);
    return null;
  }
}

// Check if user set a custom Supabase URL and Key
let storedUrl = '';
let storedKey = '';
try {
  storedUrl = localStorage.getItem('supabase_custom_url') || '';
  storedKey = localStorage.getItem('supabase_custom_key') || '';
} catch (e) {}

initSupabaseInstance(storedUrl, storedKey);

// Global helper to switch Supabase project dynamically
window.connectCustomSupabase = function(customUrl, customKey) {
  if (!customUrl || !customKey) {
    localStorage.removeItem('supabase_custom_url');
    localStorage.removeItem('supabase_custom_key');
    initSupabaseInstance(defaultUrl, defaultKey);
    console.log('🔄 Reverted to default Supabase project:', defaultProject);
    return;
  }
  localStorage.setItem('supabase_custom_url', customUrl);
  localStorage.setItem('supabase_custom_key', customKey);
  initSupabaseInstance(customUrl, customKey);
  console.log('🔄 Connected to custom Supabase project:', customUrl);
};

function mountInvitePromoBanner() {
  const container = document.getElementById('invite-promo-banner-root');
  if (!container || container.dataset.mounted === 'true') return;
  container.dataset.mounted = 'true';
  createRoot(container).render(React.createElement(PromoBanner));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountInvitePromoBanner, { once: true });
} else {
  mountInvitePromoBanner();
}
