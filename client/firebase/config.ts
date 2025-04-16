
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJJpwz8T0z_0CLz3I2601Z7aZjl60huWY",
  authDomain: "manime-62f47.firebaseapp.com",
  projectId: "manime-62f47",
  storageBucket: "manime-62f47.firebasestorage.app",
  messagingSenderId: "504476994051",
  appId: "1:504476994051:web:44e4031855b1dbe0e45c36",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
