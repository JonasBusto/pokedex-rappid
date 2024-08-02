import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth, db } from '../../service/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from 'firebase/firestore';
import { UserData, VerifyLoggedUserResponse } from '../../interfaces/user';
import { PokemonFavorite } from '../../interfaces/pokedex';

export const loginUserWithGoogle = createAsyncThunk<
  VerifyLoggedUserResponse,
  void,
  { rejectValue: string }
>('user/loginWithGoogle', async () => {
  const googleProvider = new GoogleAuthProvider();
  const res = await signInWithPopup(auth, googleProvider);
  console.log('auth: ', res);
  const currentUser = res.user;

  await setDoc(doc(db, 'users', currentUser.uid), {
    email: currentUser.email,
    fullName: currentUser.displayName,
    photoProfile: currentUser.photoURL,
  });

  const userDoc = await getDoc(doc(db, 'users', currentUser.uid));

  return { uid: userDoc.id, ...userDoc.data() } as VerifyLoggedUserResponse;
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'user/logout',
  async () => {
    await signOut(auth);
  }
);

export const verifyLoggedUser = createAsyncThunk<
  VerifyLoggedUserResponse,
  void
>('user/login/email', async () => {
  return new Promise<VerifyLoggedUserResponse>((resolve) => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        resolve({ uid: userDoc.id, ...userDoc.data() } as UserData);
      } else {
        resolve(null);
      }
    });
  });
});

export const getFavorites = createAsyncThunk('category/getAll', async () => {
  const arrayAux: any = [];

  try {
    const querySnapshot = await getDocs(query(collection(db, 'favorites')));

    querySnapshot.forEach((doc) => {
      arrayAux.push({ uid: doc.id, ...doc.data() });
    });

    return arrayAux;
  } catch (error) {
    console.log(error);
  }
});

export const addFavorite = createAsyncThunk<
  PokemonFavorite | null,
  PokemonFavorite,
  { rejectValue: string }
>(
  'pokedex/addFav',
  async ({ pokemonId, userId }: PokemonFavorite, { rejectWithValue }) => {
    try {
      const res = await addDoc(collection(db, 'favorites'), {
        pokemonId,
        userId,
      });

      const createdFavorite = await getDoc(doc(db, 'favorites', res.id));

      if (createdFavorite.exists()) {
        return {
          uid: createdFavorite.id,
          ...createdFavorite.data(),
        } as PokemonFavorite;
      } else {
        return null;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteFavorite = createAsyncThunk(
  'pokedex/deleteFav',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'favorites', id));
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
