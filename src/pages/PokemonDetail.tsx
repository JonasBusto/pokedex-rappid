import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePokedexAction } from '../hooks/usePokedexAction';
import { TYPES_POKEMON_COLOR } from '../helpers/types';
import { Load } from '../components/items/Load';

export function PokemonDetail() {
  const { name } = useParams();
  const { getPokemon, pokemon, pokemonStatus } = usePokedexAction();

  const [showAbout, setShowAbout] = useState(true);
  const [showStats, setShowStats] = useState(false);

  const handleChangeAbout = () => {
    setShowAbout(true);
    setShowStats(false);
  };

  const handleChangeStats = () => {
    setShowAbout(false);
    setShowStats(true);
  };

  useEffect(() => {
    if (name) {
      getPokemon({ name });
    }
  }, []);

  if (pokemonStatus === 'Cargando' || pokemonStatus === 'Inactivo') {
    return <Load />;
  }

  return (
    <div className='detail-pokemon-page'>
      <div
        className='detail-header-pokemon d-flex'
        style={{
          backgroundColor: TYPES_POKEMON_COLOR.find(
            (t) => t.type === pokemon?.types[0].type.name
          )?.color,
        }}
      >
        <div className='info-header-pokemon d-flex flex-column align-it'>
          <div className='detail-name-pokemon'>
            <p>{pokemon?.name}</p>
          </div>
          <div className='d-flex justify-content-center type-pokemon'>
            {pokemon?.types.map((type) => (
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
        </div>
        <div className='d-flex justify-content-center contain-header-image-pokemon'>
          <img
            src={pokemon?.sprites.other['official-artwork'].front_default}
            alt=''
          />
        </div>
        <div className='position-pokemon'>
          {pokemon && (
            <p>
              {'#' +
                (pokemon.order < 10
                  ? '00' + pokemon.order
                  : pokemon.order < 100
                  ? '0' + pokemon.order
                  : pokemon.order)}
            </p>
          )}
        </div>
      </div>
      <div className='btn-options-detail-pokemon d-flex justify-content-center'>
        <button
          onClick={handleChangeAbout}
          style={showAbout ? { textDecoration: 'underline' } : {}}
        >
          About
        </button>
        <button
          onClick={handleChangeStats}
          style={showStats ? { textDecoration: 'underline' } : {}}
        >
          Stats
        </button>
      </div>
      {showAbout && (
        <div className='d-flex flex-column about-pokemon'>
          <p className='about-item'>
            <strong>Altura:</strong> {pokemon?.height}M
          </p>
          <p className='about-item'>
            <strong>Peso:</strong> {pokemon?.weight}KG
          </p>
          <p className='about-item'>
            <strong>Especie: </strong> {pokemon?.species.name}
          </p>
          <ul className='list-about-pokemon'>
            {pokemon?.abilities.map((ability, index) => (
              <li key={index} className='ability-item'>
                {ability.ability.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {showStats && (
        <div className='d-flex flex-column stats-pokemon'>
          <div className='d-flex flex-column'>
            {pokemon?.stats.map((stat, index) => (
              <div
                className='d-flex align-items-center stat-pokemon'
                key={index}
              >
                <span className='w-50 text-secondary'>{stat.stat.name}</span>
                <div className='bg-light overflow-hidden'>
                  <div
                    style={{
                      width: `${stat.base_stat}px`,
                      backgroundColor: '#4caf50',
                    }}
                    className='bar-stats-pokemon d-flex align-items-center justify-content-center'
                  >
                    <span className=''>{stat.base_stat}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
