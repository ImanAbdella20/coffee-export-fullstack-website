import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_rvlWgjLpm0H76zVtOVIzpztLIP0vFVE",
  authDomain: "coffee-export-43344.firebaseapp.com",
  projectId: "coffee-export-43344",
  storageBucket: "coffee-export-43344.firebaseapp.com",
  messagingSenderId: "325626506138",
  appId: "1:325626506138:web:a39897a059fc9a9aef6823",
  measurementId: "G-ZYWNXWB0MD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
