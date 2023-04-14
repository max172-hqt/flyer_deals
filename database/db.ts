// search with name
// pagination
// auth user
// add to cart for user

import {
  getDocs,
  query,
  limit,
  QueryDocumentSnapshot,
  DocumentData,
  Query,
  startAfter,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

export interface Product {
  id: string;
  data: ProductData;
}

export interface ProductData {
  name: string;
  salePrice: string | undefined;
  regularPrice: string | undefined;
  imageUrl: string;
  description: string;
  tags: string[];
}

export async function dbGetProducts(
  numberOfItems: number,
  lastVisible?: QueryDocumentSnapshot<DocumentData>
): Promise<[Product[], QueryDocumentSnapshot<DocumentData>, boolean]> {
  console.log(lastVisible);
  const products: Product[] = [];
  let getDataQuery: Query<DocumentData>;
  let ended = false;

  if (lastVisible) {
    getDataQuery = query(
      db.productsCollection,
      orderBy('name'),
      startAfter(lastVisible),
      limit(numberOfItems),
    );
  } else {
    getDataQuery = query(db.productsCollection, orderBy('name'), limit(numberOfItems));
  }

  const snaps = await getDocs(getDataQuery);

  snaps.forEach((doc) => {
    const product: Product = {
      id: doc.id,
      data: doc.data() as ProductData,
    };
    products.push(product);
  });

  const nextLast = snaps.docs[snaps.docs.length - 1];

  if (!nextLast) {
    ended = true;
  }

  return [products, nextLast, ended];
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
