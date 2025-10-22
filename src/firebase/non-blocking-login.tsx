'use client';
import {
  Auth, // Import Auth type for type hinting
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FirebaseError,
  UserCredential,
  // Assume getAuth and app are initialized elsewhere
} from 'firebase/auth';
import { setDocumentNonBlocking } from './non-blocking-updates';
import { doc, getFirestore } from 'firebase/firestore';


/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  // CRITICAL: Call signInAnonymously directly. Do NOT use 'await signInAnonymously(...)'.
  signInAnonymously(authInstance);
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string): Promise<UserCredential> {
  // CRITICAL: Call createUserWithEmailAndPassword directly. Do NOT use 'await createUserWithEmailAndPassword(...)'.
  return createUserWithEmailAndPassword(authInstance, email, password)
    .catch((error: FirebaseError) => {
      // Allow specific errors to be thrown for handling in the component
      throw error;
    });
}

export function initiateEmailSignUpAndCreateUser(auth: Auth, firestore: any, email: string, password: string, userData: { firstName: string, lastName: string }): Promise<void> {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userRef = doc(firestore, 'users', user.uid);
            const profileData = {
                id: user.uid,
                email: user.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                isAdmin: false, // Default to not an admin
                address: '',
                phone: '',
            };
            setDocumentNonBlocking(userRef, profileData, { merge: true });
        })
        .catch((error: FirebaseError) => {
            throw error;
        });
}


/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): Promise<void> {
  // CRITICAL: Call signInWithEmailAndPassword directly. Do NOT use 'await signInWithEmailAndPassword(...)'.
  return signInWithEmailAndPassword(authInstance, email, password)
    .then(() => {}) // Success is handled by onAuthStateChanged
    .catch((error: FirebaseError) => {
      // Rethrow the error to be caught by the caller
      throw error;
    });
}
