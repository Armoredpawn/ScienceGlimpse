import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBApcpHIobeNWoYxY1VRDxwLLChoHWSG_c",
  authDomain: "scienceglimpse-8a217.firebaseapp.com",
  projectId: "scienceglimpse-8a217",
  storageBucket: "scienceglimpse-8a217.firebasestorage.app",
  messagingSenderId: "172691694210",
  appId: "1:172691694210:web:357d2d44ba06cd06ffca9b",
  measurementId: "G-Z50WQ4M0LW",
};

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);