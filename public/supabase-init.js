// Supabase Cloud Database Client Initialization
const SUPABASE_PROJECT_REF = 'scbpjqsxntqdzwnqyjmi';
const SUPABASE_URL = 'https://scbpjqsxntqdzwnqyjmi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjYnBqcXN4bnRxZHp3bnF5am1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5OTIyMzQsImV4cCI6MjEwNzU2ODIzNH0.3emtfDdr9SNjRfCb6CVHF0QqfOe_iBvT9rbX_c94ER4';

async function initSupabase() {
  try {
    let createClientFn = null;
    if (window.supabase && typeof window.supabase.createClient === 'function') {
      createClientFn = window.supabase.createClient;
    } else {
      const module = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
      createClientFn = module.createClient;
    }

    const client = createClientFn(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    });

    window.aloSupabase = client;
    window.aloSupabaseConfig = {
      projectRef: SUPABASE_PROJECT_REF,
      url: SUPABASE_URL,
      connected: true
    };

    window.dispatchEvent(new CustomEvent('alo-supabase-ready', { detail: { supabase: client } }));
    console.log('✅ Supabase connected successfully! Project:', SUPABASE_PROJECT_REF);
  } catch (err) {
    console.warn('Supabase initialization warning:', err);
  }
}

initSupabase();
