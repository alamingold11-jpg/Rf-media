import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { createClient } from '@supabase/supabase-js';

// Expose createClient globally on window.supabase
try {
  window.supabase = { createClient };
} catch (e) {}

// 1. Initialize Firebase (Offline-safe, bundled locally)
try {
  const firebaseConfig = {
    projectId: 'gen-lang-client-0381908388',
    appId: '1:652121147346:web:4ad600d95688f307572a0b',
    apiKey: 'AIzaSyBqcvXcnfavlIsX4LGO7XGn2qXIg1DOkTQ',
    authDomain: 'gen-lang-client-0381908388.firebaseapp.com',
    firestoreDatabaseId: 'ai-studio-codelivepreview-0cfd9c5a-a191-4651-bfc9-466b30db192b',
    storageBucket: 'gen-lang-client-0381908388.firebasestorage.app',
    messagingSenderId: '652121147346'
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
  window.aloFirebase = {
    app,
    db,
    doc,
    setDoc,
    getDoc,
    getDocs,
    collection,
    query,
    where,
    orderBy,
    limit,
    serverTimestamp,
    updateDoc
  };
  window.dispatchEvent(new CustomEvent('alo-firebase-ready', { detail: { db } }));
} catch (t) {
  console.warn('Firebase init warning:', t);
}

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
