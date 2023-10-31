// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBIRjjcxAFerVVe6R2lENjzqn64uUgTI1c",
  authDomain: "dapp-11206.firebaseapp.com",
  projectId: "dapp-11206",
  storageBucket: "dapp-11206.appspot.com",
  messagingSenderId: "700609031454",
  appId: "1:700609031454:web:71f8235ab00e4862046d0f",
  measurementId: "G-RC9JTEFMQW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
