import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// ─────────────────────────────────────────────────────────────────────────────
// PASTE YOUR FIREBASE CONFIG HERE
// Firebase Console → Project Settings → Your apps → Web app → firebaseConfig
// ─────────────────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyDg-lhl3PtmxQ-5dxfvbyVHMkcLDqvUwbc",
  authDomain: "pranav-renuka-wedding.firebaseapp.com",
  projectId: "pranav-renuka-wedding",
  storageBucket: "pranav-renuka-wedding.firebasestorage.app",
  messagingSenderId: "492732923140",
  appId: "1:492732923140:web:5ea56df01a7b09fefde451",
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
