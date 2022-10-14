// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'; // linea para tomar la parte de la autenticacion
import { getFirestore } from 'firebase/firestore/lite'; // para la base de datos
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCpddHF2-z-vas2bxUVWg5qN0M-3T8MLc",
  authDomain: "lugares-puntos-ebe05.firebaseapp.com",
  projectId: "lugares-puntos-ebe05",
  storageBucket: "lugares-puntos-ebe05.appspot.com",
  messagingSenderId: "1077525418775",
  appId: "1:1077525418775:web:8d97fd5773358b98e45d52"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(FirebaseApp);
// la parte de la autenticacion nosotos la vamos a tener mediante getAuth
export const FirebaseAuth = getAuth( FirebaseApp );

// para la base de datos
export const FirebaseDB = getFirestore( FirebaseApp );
