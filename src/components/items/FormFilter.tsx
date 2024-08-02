export function FormFilter({
  handleChangeFilterSearch,
  handleChangeOrderName,
}: {
  handleChangeFilterSearch: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleChangeOrderName: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <form className='row d-flex justify-content-between align-items-center form-filter'>
      <div className='col-12 col-md-8 mb-3 w-100'>
        <label htmlFor='search'>Buscar</label>
        <input
          name='search'
          className='form-control w-100'
          placeholder='Buscar pokemon por nombre o tipo'
          type='text'
          onChange={handleChangeFilterSearch}
        />
      </div>
      <div>
        <label htmlFor='order-pokemon'>Ordenar por</label>
        <select
          className='form-select'
          name='order-pokemon'
          onChange={handleChangeOrderName}
        >
          <option value=''>Defecto</option>
          <option value='name-asc-to-desc'>Nombre: Asc</option>
          <option value='name-desc-to-asc'>Nombre: Desc</option>
        </select>
      </div>
    </form>
  );
}
