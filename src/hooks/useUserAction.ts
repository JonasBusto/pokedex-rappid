import { addFavorite, deleteFavorite } from '../store/user/thunks';
import { useAppDispatch, useAppSelector } from './store';
import { PokemonFavorite } from '../interfaces/pokedex';

export function useUserAction() {
  const userFav = useAppSelector((state) => state.user.userFav);

  const dispatch = useAppDispatch();

  const addFav = async ({ pokemonId, userId }: PokemonFavorite) => {
    await dispatch(addFavorite({ pokemonId, userId }));
  };

  const deleteFav = async ({ id }: { id: string }) => {
    await dispatch(deleteFavorite({ id }));
  };

  return { addFav, deleteFav, userFav };
}
