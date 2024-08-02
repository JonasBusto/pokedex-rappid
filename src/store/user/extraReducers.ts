import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import {
  addFavorite,
  deleteFavorite,
  getFavorites,
  loginUserWithGoogle,
  logoutUser,
  verifyLoggedUser,
} from './thunks';
import { UserState, VerifyLoggedUserResponse } from '../../interfaces/user';
import { PokemonFavorite } from '../../interfaces/pokedex';

export const userExtraReducers = (
  builder: ActionReducerMapBuilder<UserState>
) => {
  builder
    .addCase(loginUserWithGoogle.pending, (state) => {
      state.statusSign = 'Cargando';
    })
    .addCase(
      loginUserWithGoogle.fulfilled,
      (state, action: PayloadAction<VerifyLoggedUserResponse>) => {
        state.statusSign = 'Exitoso';
        state.loggedUser = action.payload;
      }
    )
    .addCase(loginUserWithGoogle.rejected, (state, action) => {
      state.statusSign = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(verifyLoggedUser.pending, (state) => {
      state.statusAuth = 'Cargando';
    })
    .addCase(verifyLoggedUser.fulfilled, (state, action) => {
      state.statusAuth = 'Exitoso';
      state.loggedUser = action.payload;
    })
    .addCase(verifyLoggedUser.rejected, (state, action) => {
      state.statusAuth = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(logoutUser.pending, (state) => {
      state.statusLoggedUser = 'Cargando';
    })
    .addCase(logoutUser.fulfilled, (state) => {
      state.statusLoggedUser = 'Exitoso';
      state.loggedUser = null;
    })
    .addCase(logoutUser.rejected, (state, action) => {
      state.statusLoggedUser = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(
      addFavorite.fulfilled,
      (state, action: PayloadAction<PokemonFavorite | null>) => {
        if (action.payload) {
          state.userFav = [...state.userFav, action.payload];
        }
      }
    )
    .addCase(addFavorite.rejected, (state, action) => {
      state.error = action.payload;
    });

  builder
    .addCase(
      deleteFavorite.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.userFav = state.userFav?.filter(
          (fav: PokemonFavorite) => fav.uid !== action.payload
        );
      }
    )
    .addCase(deleteFavorite.rejected, (state, action) => {
      state.error = action.payload;
    });

  builder
    .addCase(getFavorites.pending, (state) => {
      state.statusFavorite = 'Cargando';
    })
    .addCase(
      getFavorites.fulfilled,
      (state, action: PayloadAction<PokemonFavorite[]>) => {
        state.statusFavorite = 'Exitoso';
        state.userFav = action.payload;
      }
    )
    .addCase(getFavorites.rejected, (state, action) => {
      state.statusFavorite = 'Fallido';
      state.error = action.payload;
    });
};
