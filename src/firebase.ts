// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiCRaVV9J9rybHy_J2Hnal4hO7-M7PQ7A",
  authDomain: "aquaxperts-62883350-a8b46.firebaseapp.com",
  projectId: "aquaxperts-62883350-a8b46",
  storageBucket: "aquaxperts-62883350-a8b46.appspot.com",
  messagingSenderId: "662469003861",
  appId: "1:662469003861:web:2de682121dd65eee6022dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);
export { onAuthStateChanged, db, app };
