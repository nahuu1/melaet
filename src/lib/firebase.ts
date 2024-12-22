import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyADVa7uL8p8TPSUdT7Lz5JGPyw568TFpCk",
  authDomain: "mella-49485.firebaseapp.com",
  projectId: "mella-49485",
  storageBucket: "mella-49485.appspot.com",
  messagingSenderId: "741486843182",
  appId: "1:741486843182:web:c883f79d15a4a1c45a56bf",
  measurementId: "G-KRN1BDJSVW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);