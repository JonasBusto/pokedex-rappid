import { getPokemonByName } from '../store/pokedex/thunks';
import { useAppDispatch, useAppSelector } from './store';

export function usePokedexAction() {
  const pokemons = useAppSelector((state) => state.pokedex.pokemons);
  const pokemon = useAppSelector((state) => state.pokedex.pokemon);
  const pokemonStatus = useAppSelector((state) => state.pokedex.statusPokemon);

  const dispatch = useAppDispatch();

  const getPokemon = async ({ name }: { name: string }) => {
    await dispatch(getPokemonByName({ name }));
  };

  return { getPokemon, pokemons, pokemon, pokemonStatus };
}
