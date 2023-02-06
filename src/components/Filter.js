import React, { useContext } from 'react';
import { TableContext } from '../context/TableContext';

function Filter() {
  const { handleSubmit, handleFilterName, handleOtherFilters } = useContext(TableContext);

  return (
    <div>

      <form action="" id="filterForm">

        <label htmlFor="name-filter">
          Filter by name
          <input
            data-testid="name-filter"
            type="text"
            name="name-filter"
            id="name-filter"
            onChange={ (e) => handleFilterName(e.target.value) }

          />
        </label>

        <label htmlFor="column">
          Colunas
          <select
            data-testid="column-filter"
            name="column"
            id="column"
            onChange={ (e) => handleOtherFilters(e) }
          >
            <option value="population">Population</option>
            <option value="orbital_period">Orbital Period</option>
            <option value="diameter">Diameter</option>
            <option value="rotation_period">Rotation Period</option>
            <option value="surface_water">Surface Water</option>
          </select>
        </label>

        <label htmlFor="comparison">
          Condição de valor
          <select
            data-testid="comparison-filter"
            name="comparison"
            id="comparison"
            onChange={ (e) => handleOtherFilters(e) }
          >
            <option value="maior-que">Maior que</option>
            <option value="menor-que">Menor que</option>
            <option value="igual-a">Igual a</option>
          </select>
        </label>

        <label htmlFor="value">
          Valor
          <input
            data-testid="value"
            type="number"
            name="value"
            id="value"
            onChange={ (e) => handleOtherFilters(e) }
          />
        </label>

        <button
          type="submit"
          name="button-filter"
          id="button-filter"
          onClick={ (e) => handleSubmit(e) }
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </form>

    </div>
  );
}

export default Filter;
