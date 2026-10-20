// Firebase Cloud Firestore Initialization
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

try {
  const firebaseConfig = {
    projectId: "gen-lang-client-0381908388",
    appId: "1:652121147346:web:4ad600d95688f307572a0b",
    apiKey: "AIzaSyBqcvXcnfavlIsX4LGO7XGn2qXIg1DOkTQ",
    authDomain: "gen-lang-client-0381908388.firebaseapp.com",
    firestoreDatabaseId: "ai-studio-codelivepreview-0cfd9c5a-a191-4651-bfc9-466b30db192b",
    storageBucket: "gen-lang-client-0381908388.firebasestorage.app",
    messagingSenderId: "652121147346"
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
} catch (err) {
  console.warn('Firebase init warning:', err);
}
