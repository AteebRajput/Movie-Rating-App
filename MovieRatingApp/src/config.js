// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTVRxL29M3OpzY8EisPIPHM7mEoPd7bhs",
  authDomain: "movie-f208a.firebaseapp.com",
  projectId: "movie-f208a",
  storageBucket: "movie-f208a.appspot.com",
  messagingSenderId: "5575408561",
  appId: "1:5575408561:web:54dc654cbce7eb2b155b90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();