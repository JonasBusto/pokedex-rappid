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
  const [favLoading, setFavLoading] = useState(false);

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
    <div className='col-12 col-sm-6 col-lg-4 col-xl-3 p-0 card-pokemon d-flex'>
      <button
        className='d-flex justify-content-center align-items-center'
        onClick={
          loggedUser
            ? favFilterd
              ? () => {
                  setFavLoading(true);
                  deleteFav({ id: favFilterd.uid || '' }, { setFavLoading });
                }
              : () => {
                  setFavLoading(true);
                  addFav(
                    { pokemonId: pokemon.id, userId: loggedUser.uid },
                    { setFavLoading }
                  );
                }
            : handleShowModalSign
        }
      >
        {loggedUser ? (
          favLoading ? (
            <i className='fa-solid fa-spinner spinner'></i>
          ) : favFilterd ? (
            <i className='fa-solid fa-star'></i>
          ) : (
            <i className='fa-regular fa-star'></i>
          )
        ) : (
          <i className='fa-regular fa-star'></i>
        )}
      </button>
      <Link to={'/pokemon/' + pokemon.name}>
        <div className='d-flex justify-content-center'>
          <img
            className='img-fluid'
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt=''
          />
        </div>
        <div className='d-flex justify-content-center align-items-center name-pokemon'>
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
        <div className='d-flex justify-content-center align-items-center detail-pokemon'>
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
