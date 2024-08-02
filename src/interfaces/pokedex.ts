import { InitialStateSlice, StatusSlice } from './store';
import { IPokemon } from './Pokedex/Pokemon/Pokemon';

export interface PokemonData {
  name: string;
  url: string;
}

export interface PokedexState extends InitialStateSlice {
  pokemons: IPokemon[];
  pokemon: null | IPokemon;
  statusPokemon: StatusSlice;
}

export interface PokemonFavorite {
  uid?: string;
  pokemonId: number;
  userId: string;
}
