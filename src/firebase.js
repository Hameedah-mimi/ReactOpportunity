import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPnjxTGo-xcpeASfJH0YmRl1gPyAjO1TY",
  authDomain: "student-hub-7c523.firebaseapp.com",
  projectId: "student-hub-7c523",
  storageBucket: "student-hub-7c523.firebasestorage.app",
  messagingSenderId: "97978046964",
  appId: "1:97978046964:web:bfa630fb2319959a1101a1",
  measurementId: "G-5LC567FEJH"
};



const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);