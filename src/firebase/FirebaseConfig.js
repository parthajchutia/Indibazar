import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgLtZMsoh0hDFnlV3ngEJCm71KPUHNiqk",
  authDomain: "indibazar-7e932.firebaseapp.com",
  projectId: "indibazar-7e932",
  storageBucket: "indibazar-7e932.appspot.com",
  messagingSenderId: "685966847466",
  appId: "1:685966847466:web:9c0121c34ca536c8cf9693"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB, auth}
