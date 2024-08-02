import { CardPokemon } from '../components/items/CardPokemon';
import { useAuth } from '../hooks/useAuth';
import { usePokedexAction } from '../hooks/usePokedexAction';
import { useUserAction } from '../hooks/useUserAction';
import { IPokemon } from '../interfaces/Pokedex/Pokemon/Pokemon';

export function MyAccount() {
  const { loggedUser } = useAuth();
  const { userFav } = useUserAction();
  const { pokemons } = usePokedexAction();

  const favUserLogged = userFav.filter((fav) => fav.userId === loggedUser?.uid);
  const favPokemons = pokemons.filter((pokemon) =>
    favUserLogged.some((fav) => pokemon.id === fav.pokemonId)
  );

  return (
    <div>
      <h4>Mi cuenta</h4>
      <img src={loggedUser?.photoProfile} alt='' />
      <p>{loggedUser?.fullName}</p>
      <p>{loggedUser?.email}</p>
      <h4>Mis favoritos</h4>
      <div className='row m-0'>
        {favPokemons.map((pokemon: IPokemon) => (
          <CardPokemon
            key={pokemon.id}
            pokemon={pokemon}
            handleShowModalSign={undefined}
            loggedUser={loggedUser}
          />
        ))}
      </div>
    </div>
  );
}
