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
    apiKey: "AIzaSyCEUeuZeeRKYdfYbEG2dywaSjXo1yY_9y8",
    authDomain: "flyerdeals-36d67.firebaseapp.com",
    projectId: "flyerdeals-36d67",
    storageBucket: "flyerdeals-36d67.appspot.com",
    messagingSenderId: "1072328054162",
    appId: "1:1072328054162:web:0bf4184d9974ac3ef65d4b"
  };


const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

const db = {
    productsCollection: collection(database, 'products')
}

export { db };
