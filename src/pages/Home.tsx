import { useContext } from 'react';
import { usePokedexAction } from '../hooks/usePokedexAction';
import { AppContext } from '../context/AppContext';
import { CardPokemon } from '../components/items/CardPokemon';
import { useFilter } from '../hooks/useFilter';
import { FormFilter } from '../components/items/FormFilter';
import { useAuth } from '../hooks/useAuth';
import { DataView } from 'primereact/dataview';
import { Load } from '../components/items/Load';

export function Home() {
  const { pokemons } = usePokedexAction();
  const { loggedUser } = useAuth();
  const { elementsFiltered, handleChangeFilterSearch, handleChangeOrderName } =
    useFilter({
      elements: pokemons,
    });
  const { isLoading, handleShowModalSign } = useContext(AppContext);

  if (isLoading) {
    return <Load />;
  }

  return (
    <div>
      <FormFilter
        handleChangeFilterSearch={handleChangeFilterSearch}
        handleChangeOrderName={handleChangeOrderName}
      />
      <div>
        <DataView
          paginator
          rows={20}
          value={elementsFiltered}
          itemTemplate={(pokemon) => (
            <CardPokemon
              pokemon={pokemon}
              handleShowModalSign={handleShowModalSign}
              loggedUser={loggedUser}
            />
          )}
        />
      </div>
    </div>
  );
}
