import React, { useContext } from 'react';
import { TableContext } from '../context/TableContext';

function Filter() {
  const { handleSubmit, handleFilterName, handleOtherFilters,
    otherFilters, selectedFilters } = useContext(TableContext);

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
            value={ otherFilters.column }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>

        <label htmlFor="comparison">
          Condição de valor
          <select
            data-testid="comparison-filter"
            name="comparison"
            id="comparison"
            onChange={ (e) => handleOtherFilters(e) }
            value={ otherFilters.comparison }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>

        <label htmlFor="value">
          Valor
          <input
            data-testid="value-filter"
            type="number"
            name="value"
            id="value"
            onChange={ (e) => handleOtherFilters(e) }
            value={ otherFilters.value }
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

      { selectedFilters.map((filter) => (
        <div key={ filter.column }>
          <p>{ `${filter.column} ${filter.comparison} ${filter.value}` }</p>

        </div>
      ))}

    </div>
  );
}

export default Filter;
