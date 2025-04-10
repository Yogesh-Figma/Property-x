// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyNdkcE2K6NJAAu4xY9nNIZEjezF9F9MA",
  authDomain: "business-management-app-a78a3.firebaseapp.com",
  projectId: "business-management-app-a78a3",
  storageBucket: "business-management-app-a78a3.firebasestorage.app",
  messagingSenderId: "536849535779",
  appId: "1:536849535779:web:40d54d93064643de0c7296",
  measurementId: "G-RHWPMRZGJG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {app,auth};