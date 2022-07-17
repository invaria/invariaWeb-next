// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRiQkgj41SwnVlchsl161dKmbRhSWIIEo",
  authDomain: "reactform-a757a.firebaseapp.com",
  databaseURL: "https://reactform-a757a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "reactform-a757a",
  storageBucket: "reactform-a757a.appspot.com",
  messagingSenderId: "387652735491",
  appId: "1:387652735491:web:042987a9a61cef021cf436",
  measurementId: "G-EV49MZYV79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
