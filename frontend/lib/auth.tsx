import { auth } from './fireBaseConfig';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  sendEmailVerification,
} from 'firebase/auth';
import type { UserCredential } from 'firebase/auth';

// Create User (Sign Up)
export const doCreateUserWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Sign In with Email & Password
export const doSignInUserWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Sign In with Google
export const doSignInWithGoogle = async (): Promise<UserCredential | void> => {
  const provider = new GoogleAuthProvider();
  if (window.innerWidth <= 768) {
    await signInWithRedirect(auth, provider); // No return value here
    return; // Explicitly return undefined to match the return type
  } else {
    return await signInWithPopup(auth, provider);
  }
};

// Sign Out
export const doSignOut = async (): Promise<void> => {
  await signOut(auth);
};

// Password Reset
export const doPasswordReset = async (email: string): Promise<void> => {
  return sendPasswordResetEmail(auth, email);
};

// Password Change
export const doPasswordChange = async (newPassword: string): Promise<void> => {
  if (!auth.currentUser) throw new Error("No user is signed in.");
  return updatePassword(auth.currentUser, newPassword);
};

// Send Email Verification
export const doSendEmailVerification = async (): Promise<void> => {
  if (!auth.currentUser) throw new Error("No user is signed in.");
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};
