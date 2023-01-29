import React from 'react';

function Filter() {
  return (
    <div>

      <label htmlFor="name-filter">
        Filter by name
        <input
          data-testid="name-filter"
          type="text"
          name="name-filter"
          id="name-filter"
          onChange={ (e) => handleChange(e) }
        />
      </label>

      <label htmlFor="column-filter">
        Seletor
        <select
          data-testid="column-filter"
          name="column-filter"
          id="column-filter"
        >
          <option value="population">Population</option>
          <option value="orbital_period">Orbital Period</option>
          <option value="diameter">Diameter</option>
          <option value="rotation_period">Rotation Period</option>
          <option value="surface_water">Surface Water</option>
        </select>
      </label>

      <label htmlFor="comparison-filter">
        Seletor
        <select
          data-testid="comparison-filter"
          name="comparison-filter"
          id="comparison-filter"
        >
          <option value="maior-que">Maior que</option>
          <option value="menor-que">Menor que</option>
          <option value="igual-a">Igual a</option>
        </select>
      </label>

      <label htmlFor="value-filter">
        Filter by value
        <input
          data-testid="value-filter"
          type="number"
          name="value-filter"
          id="value-filter"
        />
      </label>

      <button type="button" name="filter-button" id="filter-button" onClick={ () => {} }>
        Filtrar
      </button>

    </div>
  );
}

export default Filter;
