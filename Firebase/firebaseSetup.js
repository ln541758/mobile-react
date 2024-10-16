// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBSt6HZMzYzGejS-RnFl1o_-nyCEHc5ks0",
  authDomain: "mobile-768e7.firebaseapp.com",
  projectId: "mobile-768e7",
  storageBucket: "mobile-768e7.appspot.com",
  messagingSenderId: "897616221263",
  appId: "1:897616221263:web:10194442881d6e005e863a"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);
