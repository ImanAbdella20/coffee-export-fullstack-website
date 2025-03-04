// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_rvlWgjLpm0H76zVtOVIzpztLIP0vFVE",
  authDomain: "coffee-export-43344.firebaseapp.com",
  projectId: "coffee-export-43344",
  storageBucket: "coffee-export-43344.firebasestorage.app",
  messagingSenderId: "325626506138",
  appId: "1:325626506138:web:a39897a059fc9a9aef6823",
  measurementId: "G-ZYWNXWB0MD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export  {auth , db};