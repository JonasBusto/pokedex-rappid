import { CardPokemon } from '../components/items/CardPokemon';
import { useAuth } from '../hooks/useAuth';
import { usePokedexAction } from '../hooks/usePokedexAction';
import { useUserAction } from '../hooks/useUserAction';
import { IPokemon } from '../interfaces/Pokedex/Pokemon/Pokemon';

export function MyAccount() {
  const { loggedUser, logout } = useAuth();
  const { userFav } = useUserAction();
  const { pokemons } = usePokedexAction();

  const favUserLogged = userFav.filter((fav) => fav.userId === loggedUser?.uid);
  const favPokemons = pokemons.filter((pokemon) =>
    favUserLogged.some((fav) => pokemon.id === fav.pokemonId)
  );

  return (
    <div className='contain-account'>
      <div className='my-account d-flex flex-column'>
        <h4>Mi cuenta</h4>
        <div className='d-flex'>
          <div>
            <img src={loggedUser?.photoProfile} alt='' />
          </div>
          <div className='name-profile'>
            <p>{loggedUser?.fullName}</p>
            <p>{loggedUser?.email}</p>
          </div>
        </div>
        <button
          className='btn-sign mt-5'
          style={{ backgroundColor: 'red' }}
          onClick={logout}
        >
          Cerrar Sesión
        </button>
      </div>
      <div className='favorites'>
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
    </div>
  );
}
