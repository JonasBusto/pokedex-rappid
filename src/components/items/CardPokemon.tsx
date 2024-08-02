import { Link } from 'react-router-dom';
import { IPokemon } from '../../interfaces/Pokedex/Pokemon/Pokemon';
import { TYPES_POKEMON_COLOR } from '../../helpers/types';
import { VerifyLoggedUserResponse } from '../../interfaces/user';
import { useUserAction } from '../../hooks/useUserAction';
import { useEffect, useState } from 'react';

export function CardPokemon({
  pokemon,
  handleShowModalSign,
  loggedUser,
}: {
  pokemon: IPokemon;
  handleShowModalSign: (() => void) | undefined;
  loggedUser: VerifyLoggedUserResponse;
}) {
  const { addFav, deleteFav, userFav } = useUserAction();
  const [favFilterd, setFavFilterd] = useState(
    userFav.find(
      (fav) => fav.pokemonId === pokemon.id && fav.userId === loggedUser?.uid
    )
  );

  useEffect(() => {
    if (loggedUser) {
      setFavFilterd(
        userFav.find(
          (fav) =>
            fav.pokemonId === pokemon.id && fav.userId === loggedUser?.uid
        )
      );
    }
  }, [userFav, loggedUser, pokemon.id]);

  return (
    <div
      className='col-12 col-sm-6 col-lg-4 col-xl-3 p-0'
      style={{ border: '2px solid black' }}
    >
      <button
        onClick={
          loggedUser
            ? favFilterd
              ? () => deleteFav({ id: favFilterd.uid || '' })
              : () => addFav({ pokemonId: pokemon.id, userId: loggedUser.uid })
            : handleShowModalSign
        }
      >
        {loggedUser
          ? favFilterd
            ? 'Quitar favorito'
            : 'Agregar favorito'
          : 'Agregar'}
      </button>
      <Link to={'/pokemon/' + pokemon.name} className='card-pokemon'>
        <div className='d-flex'>
          <img
            className='img-fluid'
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt=''
          />
        </div>
        <div className='d-flex'>
          <p>
            {'#' +
              (pokemon.order < 10
                ? '00' + pokemon.order
                : pokemon.order < 100
                ? '0' + pokemon.order
                : pokemon.order)}
          </p>
          <strong>{pokemon.name}</strong>
        </div>
        <div className='d-flex'>
          {pokemon.types.map((type) => (
            <p
              key={type.type.name}
              style={{
                backgroundColor: TYPES_POKEMON_COLOR.find(
                  (t) => t.type === type.type.name
                )?.color,
              }}
            >
              {type.type.name}
            </p>
          ))}
        </div>
      </Link>
    </div>
  );
}
