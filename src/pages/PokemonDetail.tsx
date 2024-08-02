import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePokedexAction } from '../hooks/usePokedexAction';
import { TYPES_POKEMON_COLOR } from '../helpers/types';

export function PokemonDetail() {
  const { name } = useParams();
  const { getPokemon, pokemon, pokemonStatus } = usePokedexAction();

  useEffect(() => {
    if (name) {
      getPokemon({ name });
    }
  }, []);

  if (pokemonStatus === 'Cargando' || pokemonStatus === 'Inactivo') {
    return <h1>cargando</h1>;
  }

  return (
    <div>
      <div>
        <img
          src={pokemon?.sprites.other['official-artwork'].front_default}
          alt=''
        />
        <p>{pokemon?.name}</p>
      </div>
      <div className='d-flex'>
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
      <div className='d-flex flex-column'>
        <p>{'Altura: ' + pokemon?.height + 'M'}</p>
        <p>{'Peso: ' + pokemon?.weight + 'KG'}</p>
        <p>{'Especie: ' + pokemon?.species.name}</p>
      </div>
      <div className='d-flex flex-column'>
        <p>Estadisticas</p>
        <div className='d-flex flex-column'>
          {pokemon?.stats.map((stat, index) => (
            <div className='d-flex' key={index}>
              <span>{stat.stat.name}</span>
              <div style={{ width: '270px', border: '1px solid black' }}>
                <p
                  style={{
                    width: stat.base_stat + 'px',
                    backgroundColor: 'red',
                  }}
                >
                  {stat.base_stat + '/270'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='d-flex flex-column'>
        <p>Habilidades</p>
        <ul>
          {pokemon?.abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
