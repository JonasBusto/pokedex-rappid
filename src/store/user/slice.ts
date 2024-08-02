import { createSlice } from '@reduxjs/toolkit';
import { userExtraReducers } from './extraReducers';
import { UserState } from '../../interfaces/user';

const initialState: UserState = {
  loggedUser: null,
  userFav: [],
  status: 'Inactivo',
  statusLoggedUser: 'Inactivo',
  statusFavorite: 'Inactivo',
  statusSign: 'Inactivo',
  statusAuth: 'Inactivo',
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: userExtraReducers,
});

export default userSlice.reducer;
