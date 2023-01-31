import React, { useContext } from 'react';
import { TableContext } from '../context/TableContext';

function Filter() {
  const { handleChange, handleSubmit, formInput,
    handleFilter } = useContext(TableContext);

  return (
    <div>

      <form id="filter">

        <label htmlFor="name-filter">
          Filter by name
          <input
            data-testid="name-filter"
            type="text"
            name="name-filter"
            id="name-filter"
            onChange={ (e) => handleChange(e.target.value) }
            value={ handleChange.value }
          />
        </label>

        <label htmlFor="columnFilter">
          Colunas
          <select
            data-testid="columnFilter"
            name="columnFilter"
            id="columnFilter"
            form="filter"
            onChange={ (e) => handleFilter(e.target) }
          >
            <option value="population">Population</option>
            <option value="orbitalPeriod">Orbital Period</option>
            <option value="diameter">Diameter</option>
            <option value="rotationPeriod">Rotation Period</option>
            <option value="surfaceWater">Surface Water</option>
          </select>
        </label>

        <label htmlFor="comparisonFilter">
          Condição de valor
          <select
            data-testid="comparisonFilter"
            name="comparisonFilter"
            id="comparisonFilter"
            form="filter"
            onChange={ (e) => handleFilter(e.target) }
          >
            <option value="maiorQue">Maior que</option>
            <option value="menorQue">Menor que</option>
            <option value="igualA">Igual a</option>
          </select>
        </label>

        <label htmlFor="valueFilter">
          Valor
          <input
            data-testid="valueFilter"
            type="number"
            name="valueFilter"
            id="valueFilter"
            form="filter"
            onChange={ (e) => handleFilter(e.target) }
          />
        </label>

        <button
          type="submit"
          name="filterButton"
          id="filterButton"
          form="filter"
          onClick={ (e) => handleSubmit(e.target) }
        >
          Filtrar
        </button>
      </form>

    </div>
  );
}

export default Filter;
