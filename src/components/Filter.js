import React, { useContext } from 'react';
import { TableContext } from '../context/TableContext';

function Filter() {
  const { handleSubmitButton, handleFiltersChange,
    filtersChange, selectedFilters, columnOptions,
    handleDeleteFilterButton, filterByName, removeAllFilters, handleSortButton,
    onChangeSort } = useContext(TableContext);

  return (
    <div>

      <form action="" id="filterForm">

        <label htmlFor="name">
          Filter by name
          <input
            data-testid="name-filter"
            type="text"
            name="nameFilter"
            id="name"
            onChange={ (e) => filterByName(e) }

          />
        </label>

        <label htmlFor="column">
          Colunas
          <select
            data-testid="column-filter"
            name="column"
            id="column"
            onChange={ (e) => handleFiltersChange(e) }
            value={ filtersChange.column }
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
            onChange={ (e) => handleFiltersChange(e) }
            value={ filtersChange.comparison }
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
            onChange={ (e) => handleFiltersChange(e) }
            value={ filtersChange.value }
          />
        </label>

        <button
          type="submit"
          name="button-filter"
          id="button-filter"
          onClick={ (e) => handleSubmitButton(e) }
          data-testid="button-filter"
        >
          Filtrar
        </button>

        <button
          type="button"
          data-testid="button-remove-filters"
          name="button-remove-filters"
          onClick={ (e) => removeAllFilters(e) }
        >
          Remover Filtros
        </button>
      </form>

      { selectedFilters.map((filter, i) => (
        <div key={ i }>
          <p data-testid="filter">
            { `${filter.column} ${filter.comparison} ${filter.value}` }
            <button
              type="button"
              name="delete-filter"
              onClick={ (e) => handleDeleteFilterButton(e, filter) }
            >
              Excluir filtro
            </button>
          </p>

        </div>
      ))}

      <label htmlFor="sort">
        Ordenar por
        <select
          data-testid="column-sort"
          name="column"
          id="column"
          onChange={ (e) => onChangeSort(e) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>

      <label htmlFor="radio">

        <input
          type="radio"
          name="sort"
          data-testid="column-sort-input-asc"
          value="ASC"
          onChange={ (e) => onChangeSort(e) }
        />
        ASC

        <input
          type="radio"
          name="sort"
          data-testid="column-sort-input-desc"
          value="DESC"
          onChange={ (e) => onChangeSort(e) }
        />
        DESC

        <button
          data-testid="column-sort-button"
          type="button"
          name="sort-button"
          onClick={ (e) => handleSortButton(e) }
        >
          Ordenar
        </button>

      </label>

    </div>
  );
}

export default Filter;
