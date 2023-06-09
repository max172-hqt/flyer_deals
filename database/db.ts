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
  or,
  where,
  and,
  addDoc,
  deleteDoc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import type { CartItem, Product, ProductData, User } from '../types';

export async function dbGetProducts(
  numberOfItems: number,
  lastVisible?: QueryDocumentSnapshot<DocumentData>
): Promise<[Product[], QueryDocumentSnapshot<DocumentData>, boolean]> {
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

  if (snaps.size < numberOfItems) {
    ended = true;
  }

  return [products, nextLast, ended];
}

export async function dbSearchProductsByPrefix(
  prefix = '',
  numberOfItems: number
): Promise<Product[]> {
  const products: Product[] = [];
  const capitalizedPrefix = prefix.charAt(0).toUpperCase() + prefix.slice(1);

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

export async function dbAddToCart(
  user: User,
  product: Product
): Promise<string> {
  const docRef = await addDoc(db.cartsCollection, {
    product,
    userId: user.uid,
  });
  return docRef.id;
}

export async function dbRemoveFromCart(id: string) {
  const dbDoc = db.getCartItem(id);
  try {
    await deleteDoc(dbDoc);
    return true;
  } catch (e) {
    console.error('Error removing document: ', e);
    return null;
  }
}

export async function dbGetCart(user: User): Promise<CartItem[]> {
  const getDataQuery = query(
    db.cartsCollection,
    where('userId', '==', user.uid)
  );
  const snaps = await getDocs(getDataQuery);
  const cartItems: CartItem[] = [];

  snaps.forEach((doc) => {
    const data = doc.data();
    const product = data.product as Product;
    const cartItem: CartItem = {
      id: product.id,
      firebaseRefId: doc.id,
      data: product.data,
      done: data.done,
    };
    cartItems.push(cartItem);
  });

  return cartItems;
}

export async function dbUpdateStatus(id: string) {
  const dbDoc = db.getCartItem(id);
  const docSnap = await getDoc(dbDoc);
  if (docSnap.exists()) {
    const done: boolean = docSnap.data().done;
    await updateDoc(dbDoc, {
      done: !done,
    });
  }
}
