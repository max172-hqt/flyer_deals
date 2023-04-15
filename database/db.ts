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
  or,
  where,
  and,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

export interface Product {
  id: string;
  data: ProductData;
}

export interface ProductData {
  name: string;
  salePrice: string | null | undefined;
  regularPrice: string | null | undefined;
  imageUrl: string;
  description: string;
  tags: string[];
}

export async function dbGetProducts(
  numberOfItems: number,
  lastVisible?: QueryDocumentSnapshot<DocumentData>
): Promise<[Product[], QueryDocumentSnapshot<DocumentData>, boolean]> {
  console.log('calling api', lastVisible);
  const products: Product[] = [];
  let getDataQuery: Query<DocumentData>;
  let ended = false;

  if (lastVisible) {
    getDataQuery = query(
      db.productsCollection,
      // orderBy('name'),
      startAfter(lastVisible),
      limit(numberOfItems)
    );
  } else {
    getDataQuery = query(
      db.productsCollection,
      // orderBy('name'),
      limit(numberOfItems)
    );
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

  console.log('getting ', snaps.size);

  return [products, nextLast, ended];
}

export async function dbSearchProductsByPrefix(
  prefix: string = '',
  numberOfItems: number
): Promise<Product[]> {
  const products: Product[] = [];
  const capitalizedPrefix = prefix.charAt(0).toUpperCase() + prefix.slice(1);
  console.log(capitalizedPrefix);

  const getDataQuery = query(
    db.productsCollection,
    or(
      where('tags', 'array-contains', prefix),
      where('tags', 'array-contains', prefix.toLowerCase()),
      and(
        where('name', '>=', capitalizedPrefix),
        where('name', '<=', capitalizedPrefix + '\uf8ff')
      )
    ),
    limit(numberOfItems)
  );

  const snaps = await getDocs(getDataQuery);

  snaps.forEach((doc) => {
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
