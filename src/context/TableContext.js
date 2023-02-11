import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanetsAPI from '../services/fetchPlanetsAPI';

export const TableContext = createContext();

function TableProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [table, setTable] = useState([]);
  const [filteredTable, setFilteredTable] = useState([]);
  const [error, setError] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [columnOptions, setColumnOptions] = useState([
    'population', 'orbital_period',
    'diameter', 'rotation_period',
    'surface_water']);
  const [filtersChange, setFiltersChange] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  useEffect(
    () => {
      fetchPlanetsAPI()
        .then((response) => {
          const removeKeyFromAPI = response.filter((ele) => delete ele.residents);
          setTable(removeKeyFromAPI);
          setFilteredTable(removeKeyFromAPI);
        })
        .catch(() => setError('Tivemos um problema com a requisição'));
      setLoading(false);
    },
    [],
  );

  const filterByName = ({ target }) => {
    const filter = table
      .filter((planet) => planet.name.includes(target.value));
    setFilteredTable(filter);
  };

  const handleFiltersChange = ({ target }) => {
    setFiltersChange({ ...filtersChange, [target.name]: target.value });
  };

  // Check which type of comparison filter was selected
  const checkWhichComparisonFilter = (planet) => {
    if (filtersChange.comparison === 'maior que') {
      return Number(planet[filtersChange.column]) > filtersChange.value;
    }
    if (filtersChange.comparison === 'menor que') {
      return Number(planet[filtersChange.column]) < filtersChange.value;
    }
    if (filtersChange.comparison === 'igual a') {
      return planet[filtersChange.column] === filtersChange.value;
    }
  };

  // Control options available at column filter
  const handleColumnFilter = () => {
    const filter = columnOptions.filter((option) => option !== filtersChange.column);
    setColumnOptions(filter);
    setFiltersChange({ ...filtersChange,
      column: filter[0],
      comparison: 'maior que',
      value: 0 });
  };

  const filterPlanets = () => {
    const filter = filteredTable.filter((planet) => checkWhichComparisonFilter(planet));
    setFilteredTable(filter);
  };

  // controla o botão filtrar
  const handleSubmitButton = (e) => {
    e.preventDefault();
    filterPlanets();
    setSelectedFilters([...selectedFilters, filtersChange]);
    handleColumnFilter();
  };

  const checkWhichComparisonFilter2 = (planet, filter) => {
    if (filter.comparison === 'maior que') {
      return Number(planet[filter.column]) > filter.value;
    }
    if (filter.comparison === 'menor que') {
      return Number(planet[filter.column]) < filter.value;
    }
    if (filter.comparison === 'igual a') {
      return planet[filter.column] === filter.value;
    }
  };

  const removeAllFilters = () => {
    setSelectedFilters([]);
  };

  const filterPlanetsBySelectedFilters = (filters) => {
    const mapFilters = filters.map((filter) => table.filter((planet) => planet.column checkWhichComparisonFilter2(filter));
  };

  // Delete selected filter from screen and restore it to column option
  const deleteSelectedFilter = (delFilter) => {
    const filter = selectedFilters.filter((selFilter) => selFilter !== delFilter);
    setSelectedFilters(filter);
    setColumnOptions([...columnOptions, delFilter.column]);
    filterPlanetsBySelectedFilters(filter);
  };

  // controla os filtros deletados
  const handleDeleteFilterButton = (e, delFilter) => {
    e.preventDefault();
    deleteSelectedFilter(delFilter);
    // filterPlanetsBySelectedFilters();
    // mapSelectedFilters();
  };

  return (
    <TableContext.Provider
      value={ {
        loading,
        table,
        error,
        filtersChange,
        selectedFilters,
        columnOptions,
        filteredTable,
        filterByName,
        handleFiltersChange,
        handleSubmitButton,
        handleDeleteFilterButton,
        removeAllFilters,
      } }
    >
      <div>{ children }</div>
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default TableProvider;
