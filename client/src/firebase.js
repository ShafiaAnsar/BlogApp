// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogapp-dc85f.firebaseapp.com",
  projectId: "blogapp-dc85f",
  storageBucket: "blogapp-dc85f.appspot.com",
  messagingSenderId: "997038331041",
  appId: "1:997038331041:web:bc9c9023e2a656b3930ce0"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);