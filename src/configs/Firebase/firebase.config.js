// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyByvGttbdEyu5fPMHDa7H-eUb2J0FLvrEk",
    authDomain: "my-dream-home-43f47.firebaseapp.com",
    projectId: "my-dream-home-43f47",
    storageBucket: "my-dream-home-43f47.appspot.com",
    messagingSenderId: "492271886780",
    appId: "1:492271886780:web:d797eb4c8f08e1c49ccbb9",
    measurementId: "G-ZVY5R3XSXL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore();