import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBePiNvijKIAoMj5hYsxP24QK60_1JPZSE',
  authDomain: 'prueba-tecnica-2a849.firebaseapp.com',
  projectId: 'prueba-tecnica-2a849',
  storageBucket: 'prueba-tecnica-2a849.appspot.com',
  messagingSenderId: '890721416101',
  appId: '1:890721416101:web:0e15e397fea3bd7f3b6e4c',
  measurementId: 'G-X6VZKPCF6K',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
