import React, { useContext } from 'react';
import { TableContext } from '../context/TableContext';

function Filter() {
  const { handleSubmit, handleFilterName, handleOtherFilters,
    otherFilters, selectedFilters, columnOptions } = useContext(TableContext);

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
            { columnOptions.map((option, i) => (
              <option key={ i } value={ option }>{ option }</option>
            ))}
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
