import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { PokedexState } from '../../interfaces/pokedex';
import { getAllPokemons, getPokemonByName } from './thunks';
import { IPokemon } from '../../interfaces/Pokedex/Pokemon/Pokemon';

export const pokedexExtraReducers = (
  builder: ActionReducerMapBuilder<PokedexState>
) => {
  builder
    .addCase(getAllPokemons.pending, (state) => {
      state.status = 'Cargando';
    })
    .addCase(
      getAllPokemons.fulfilled,
      (state, action: PayloadAction<IPokemon[]>) => {
        state.status = 'Exitoso';
        state.pokemons = action.payload;
      }
    )
    .addCase(getAllPokemons.rejected, (state, action) => {
      state.status = 'Fallido';
      state.error = action.payload;
    });

  builder
    .addCase(getPokemonByName.pending, (state) => {
      state.statusPokemon = 'Cargando';
    })
    .addCase(
      getPokemonByName.fulfilled,
      (state, action: PayloadAction<IPokemon>) => {
        state.statusPokemon = 'Exitoso';
        state.pokemon = action.payload;
      }
    )
    .addCase(getPokemonByName.rejected, (state, action) => {
      state.statusPokemon = 'Fallido';
      state.error = action.payload;
    });
};
