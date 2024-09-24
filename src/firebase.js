// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const FIREBASE_API = import.meta.env.VITE_BASE_FIREBASEAPI;
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: FIREBASE_API,
    authDomain: "dohabus-3f21a.firebaseapp.com",
    projectId: "dohabus-3f21a",
    storageBucket: "dohabus-3f21a.appspot.com",
    messagingSenderId: "653795460189",
    appId: "1:653795460189:web:0ba5c6f87a674af58d79b4",
    measurementId: "G-TNHFTSPMLS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
