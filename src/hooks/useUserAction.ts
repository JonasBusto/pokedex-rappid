import { addFavorite, deleteFavorite } from '../store/user/thunks';
import { useAppDispatch, useAppSelector } from './store';
import { PokemonFavorite } from '../interfaces/pokedex';

export function useUserAction() {
  const userFav = useAppSelector((state) => state.user.userFav);

  const dispatch = useAppDispatch();

  const addFav = async (
    { pokemonId, userId }: PokemonFavorite,
    { setFavLoading }: { setFavLoading: (arg0: boolean) => void }
  ) => {
    await dispatch(addFavorite({ pokemonId, userId }));
    setFavLoading(false);
  };

  const deleteFav = async (
    { id }: { id: string },
    { setFavLoading }: { setFavLoading: (arg0: boolean) => void }
  ) => {
    await dispatch(deleteFavorite({ id }));
    setFavLoading(false);
  };

  return { addFav, deleteFav, userFav };
}
