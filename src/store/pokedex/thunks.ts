import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PokemonData } from '../../interfaces/pokedex';

export const getAllPokemons = createAsyncThunk('pokedex/getAll', async () => {
  const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=' + 100);
  const results = res.data.results;

  const resp = results.map((pokemon: PokemonData) =>
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
  );

  const data = await Promise.all(resp);
  const pokemons = data.map((pokemon) => pokemon.data);

  return pokemons;
});

export const getPokemonByName = createAsyncThunk(
  'pokedex/getByName',
  async ({ name }: { name: string }, { rejectWithValue }) => {
    try {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon/' + name);

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
