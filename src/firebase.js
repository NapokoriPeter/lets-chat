// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBELh6Og7FblcbzKAFpkLDMKWakUUW9Ftg",
  authDomain: "chatapp-d3c3d.firebaseapp.com",
  projectId: "chatapp-d3c3d",
  storageBucket: "chatapp-d3c3d.appspot.com",
  messagingSenderId: "178842422489",
  appId: "1:178842422489:web:6275f6291923e79a6882c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

// Export functions and variables
const login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

const register = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

const loginWithGoogle = async () => {
  return await signInWithPopup(auth, googleProvider);
};

export { auth, googleProvider, db, login, register, loginWithGoogle, signInWithRedirect, getRedirectResult };
