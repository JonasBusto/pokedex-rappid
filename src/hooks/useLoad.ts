import { useEffect, useState } from 'react';
import { useAppSelector } from './store';

export function useLoad() {
  const pokedexStatus = useAppSelector((state) => state.pokedex.status);
  const statusAuth = useAppSelector((state) => state.user.statusAuth);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      (statusAuth === 'Fallido' || statusAuth === 'Exitoso') &&
      (pokedexStatus === 'Fallido' || pokedexStatus === 'Exitoso')
    ) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [pokedexStatus, statusAuth]);

  return { isLoading };
}
