// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBs5O4p5tk-X8Jg1fETzxkieRbFrk-dGo",
  authDomain: "coinspark-prod.firebaseapp.com",
  projectId: "coinspark-prod",
  storageBucket: "coinspark-prod.firebasestorage.app",
  messagingSenderId: "1007660164079",
  appId: "1:1007660164079:web:0b2385a419bc8d97534c1a",
  measurementId: "G-T61C195X6E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;