import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBrxrS_xLhxJmhmplwTTamR2OAv6U4yKas",
  authDomain: "tasks-1bf8b.firebaseapp.com",
  projectId: "tasks-1bf8b",
  storageBucket: "tasks-1bf8b.firebasestorage.app",
  messagingSenderId: "411926214094",
  appId: "1:411926214094:web:448b5cdb321c2b4597679f"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);