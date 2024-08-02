import { useEffect, useState } from 'react';
import { IPokemon } from '../interfaces/Pokedex/Pokemon/Pokemon';

export function useFilter({ elements }: { elements: IPokemon[] }) {
  const [filterSearch, setFilterSearch] = useState('');
  const [elementsFiltered, setElementsFiltered] = useState([...elements]);
  const [filterOrderName, setFilterOrderName] = useState('');

  const filterElements = () => {
    const arrayAux = [...elements];
    let arrayFilter = arrayAux;

    if (filterSearch === '') {
      arrayFilter = arrayAux;
    } else {
      arrayFilter = arrayAux.filter(
        (item) =>
          item.name.toLowerCase().includes(filterSearch.trim()) ||
          item.types.some((type) =>
            type.type.name.toLowerCase().includes(filterSearch.trim())
          )
      );
    }

    if (filterOrderName === 'name-asc-to-desc') {
      arrayFilter.sort((a, b) => (a.name < b.name ? -1 : 0));
    } else if (filterOrderName === 'name-desc-to-asc') {
      arrayFilter.sort((a, b) => (a.name > b.name ? -1 : 0));
    }

    setElementsFiltered(arrayFilter);
  };

  const handleChangeFilterSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterSearch(event.target.value);
  };

  const handleChangeOrderName = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterOrderName(event.target.value);
  };

  useEffect(() => {
    filterElements();
  }, [filterSearch, filterOrderName, elements]);

  return {
    handleChangeFilterSearch,
    handleChangeOrderName,
    elementsFiltered,
  };
}
