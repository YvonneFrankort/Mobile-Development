import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbMs-rpCp1cFB_NNRxAMue9WIwD6a_KoU",
  authDomain: "neighborhood-help-7eb08.firebaseapp.com",
  projectId: "neighborhood-help-7eb08",
  storageBucket: "neighborhood-help-7eb08.firebasestorage.app",
  messagingSenderId: "965109654214",
  appId: "1:965109654214:web:0e4fa925e1c697c377adc7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const REQUESTS = "requests";

export {
  firestore,
  collection,
  addDoc,
  REQUESTS,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot
};