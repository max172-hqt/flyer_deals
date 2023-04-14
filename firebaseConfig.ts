import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBITjQBtxws14YaEbv8wpqMVaF60MuRo0U",
  authDomain: "flyerdeals-c6493.firebaseapp.com",
  projectId: "flyerdeals-c6493",
  storageBucket: "flyerdeals-c6493.appspot.com",
  messagingSenderId: "921804239927",
  appId: "1:921804239927:web:6a602e9a968ed5a7b37bb2"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

const db = {
  productsCollection: collection(database, 'products'),
};

export { db };
