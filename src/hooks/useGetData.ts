import { useEffect } from 'react';
import { getAllPokemons } from '../store/pokedex/thunks';
import { useAppDispatch } from './store';
import { getFavorites, verifyLoggedUser } from '../store/user/thunks';

export function useGetData() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(verifyLoggedUser());
    dispatch(getFavorites());
  }, []);

  return {};
}
