// search with name
// pagination
// auth user
// add to cart for user

import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

export interface Product {
  id: string;
  data: ProductData;
}

interface ProductData {
  name: string;
  salePrice: string | undefined;
  regularPrice: string | undefined;
  imageUrl: string;
}

export async function dbGetProducts(): Promise<Product[]> {
  const products: Product[] = [];

  const snap = await getDocs(db.productsCollection);

  snap.forEach((doc) => {
    const product: Product = {
      id: doc.id,
      data: doc.data() as ProductData,
    };
    products.push(product);
  });

  return products;
}

// export async function dbCreateTask({ description, completed }) {
//   try {
//     const docRef = await addDoc(collection(db, tasksCollection), {
//       description,
//       completed,
//     });
//     return docRef.id;
//   } catch (e) {
//     console.error('Error adding document: ', e);
//     return null;
//   }
// }

// export async function dbDeleteTask(id) {
//   const dbDoc = doc(db, tasksCollection, id);
//   try {
//     await deleteDoc(dbDoc);
//     return true;
//   } catch (e) {
//     throw e;
//   }
// }

// export async function dbUpdateStatus(id) {
//   const docRef = doc(db, tasksCollection, id);
//   try {
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       const completed = docSnap.data().completed;
//       await updateDoc(docRef, {
//         completed: !completed,
//       });
//     }
//   } catch (e) {
//     throw e;
//   }
// }
