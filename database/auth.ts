import { User, signOut } from 'firebase/auth';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export async function login(email: string, password: string): Promise<User> {
  const auth = getAuth();
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const user = credential.user;
  return user;
}

export async function signup(email: string, password: string): Promise<User> {
  const auth = getAuth();
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = credential.user;
  return user;
}

export async function logout() {
  const auth = getAuth();
  await signOut(auth);
}