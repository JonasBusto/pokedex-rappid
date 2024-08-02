import { PokemonFavorite } from './pokedex';
import { InitialStateSlice, StatusSlice } from './store';

export interface UserData {
  uid: string;
  email: string;
  fullName: string;
  photoProfile: string;
}

export type VerifyLoggedUserResponse = UserData | null;

export interface UserState extends InitialStateSlice {
  loggedUser: VerifyLoggedUserResponse;
  statusLoggedUser: StatusSlice;
  statusAuth: StatusSlice;
  statusSign: StatusSlice;
  statusFavorite: StatusSlice;
  userFav: PokemonFavorite[];
}
