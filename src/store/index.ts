import { configureStore } from '@reduxjs/toolkit';
import pokedexReducer from './pokedex/slice';
import userReducer from './user/slice';

export const store = configureStore({
  reducer: {
    pokedex: pokedexReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
