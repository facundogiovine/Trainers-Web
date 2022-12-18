import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyAEF9Ui-JFKd22XNqlrgySCB5iU1X80JOE",
  authDomain: "trainerschat-ff1ab.firebaseapp.com",
  projectId: "trainerschat-ff1ab",
  storageBucket: "trainerschat-ff1ab.appspot.com",
  messagingSenderId: "1038531470228",
  appId: "1:1038531470228:web:850092d017f09c059e2581"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
