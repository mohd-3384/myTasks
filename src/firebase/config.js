// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFXM6dQjGsj27eUBHFeOr_792OMtKa6h4",
  authDomain: "mytasks-project.firebaseapp.com",
  projectId: "mytasks-project",
  storageBucket: "mytasks-project.appspot.com",
  messagingSenderId: "175035728230",
  appId: "1:175035728230:web:b3b1b16670dac84ae6c8a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);