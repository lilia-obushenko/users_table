import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9C0XsO3I7-cIyFCbBJ100BXi8hEUwRsY",
  authDomain: "users-data-9565f.firebaseapp.com",
  projectId: "users-data-9565f",
  storageBucket: "users-data-9565f.appspot.com",
  messagingSenderId: "854663895212",
  appId: "1:854663895212:web:4b5d243cd574f2885e2709",
  measurementId: "G-S4S27LTTXY"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);