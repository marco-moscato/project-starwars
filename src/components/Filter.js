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

        <label htmlFor="columnFilter">
          Colunas
          <select
            data-testid="columnFilter"
            name="columnFilter"
            id="columnFilter"
            onChange={ (e) => handleOtherFilters(e) }
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
            onChange={ (e) => handleOtherFilters(e) }
          >
            <option value=">">Maior que</option>
            <option value="<">Menor que</option>
            <option value="===">Igual a</option>
          </select>
        </label>

        <label htmlFor="valueFilter">
          Valor
          <input
            data-testid="valueFilter"
            type="number"
            name="valueFilter"
            id="valueFilter"
            onChange={ (e) => handleOtherFilters(e) }
          />
        </label>

        <button
          type="submit"
          name="filterButton"
          id="filterButton"
          onClick={ (e) => handleSubmit(e) }
        >
          Filtrar
        </button>
      </form>

    </div>
  );
}

export default Filter;
