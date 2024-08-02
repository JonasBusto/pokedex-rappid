import { createSlice } from '@reduxjs/toolkit';
import { PokedexState } from '../../interfaces/pokedex';
import { pokedexExtraReducers } from './extraReducers';

const initialState: PokedexState = {
  pokemons: [],
  pokemon: null,
  status: 'Inactivo',
  statusPokemon: 'Inactivo',
  error: null,
};

const pokedexSlice = createSlice({
  name: 'pokedex',
  initialState,
  reducers: {},
  extraReducers: pokedexExtraReducers,
});

export default pokedexSlice.reducer;
