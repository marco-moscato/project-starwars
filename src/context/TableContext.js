import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanetsAPI from '../services/fetchPlanetsAPI';

export const TableContext = createContext();

function TableProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [table, setTable] = useState([]);
  const [error, setError] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [columnOptions, setColumnOptions] = useState([
    'population', 'orbital_period',
    'diameter', 'rotation_period',
    'surface_water']);
  const [numericFilters, setNumericFilters] = useState({
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
        })
        .catch(() => setError('Tivemos um problema com a requisição'));
      setLoading(false);
    },
    [],
  );

  // Handle the other numeric filters
  const handleNumericFilters = ({ target }) => {
    setNumericFilters({ ...numericFilters, [target.name]: target.value });
  };

  // Handle form field by planet name
  const handleFilterByName = ({ target }) => {
    setNameFilter(target.value);
    const filterByInputName = table
      .filter((planet) => planet.name.includes(nameFilter));
    setTable(filterByInputName);
  };

  // Check which type of comparison filter was selected
  const checkWhichComparisonFilter = (planet) => {
    if (numericFilters.comparison === 'maior que') {
      return Number(planet[numericFilters.column]) > numericFilters.value;
    }
    if (numericFilters.comparison === 'menor que') {
      return Number(planet[numericFilters.column]) < numericFilters.value;
    }
    if (numericFilters.comparison === 'igual a') {
      return planet[numericFilters.column] === numericFilters.value;
    }
  };

  // Control options available at column filter
  const handleColumnFilter = () => {
    const filter = columnOptions.filter((option) => option !== numericFilters.column);
    setColumnOptions(filter);
    setNumericFilters({ column: filter[0], comparison: 'maior que', value: 0 });
  };

  // controla o botão filtrar
  const handleSubmitButton = (e) => {
    e.preventDefault();
    const filter = table
      .filter((planet) => checkWhichComparisonFilter(planet));
    setTable(filter);
    setSelectedFilters([...selectedFilters, numericFilters]);
    handleColumnFilter();
  };

  // const checkWhichComparisonFilter = (planet) => {
  //   if (selectedFilters.comparison === 'maior que') {
  //     return Number(planet[selectedFilters.column]) > selectedFilters.value;
  //   }
  //   if (selectedFilters.comparison === 'menor que') {
  //     return Number(planet[selectedFilters.column]) < selectedFilters.value;
  //   }
  //   if (selectedFilters.comparison === 'igual a') {
  //     return planet[selectedFilters.column] === selectedFilters.value;
  //   }
  // };

  const filterPlanetsBySelectedFilters = () => {
    planets.filter((planet) => checkWhichComparisonFilter(planet));
  };

  // Delete selected filter from screen and restore it to column option
  const deleteSelectedFilter = (delFilter) => {
    const filter = selectedFilters.filter((selFilter) => selFilter !== delFilter);
    setSelectedFilters(filter);
    setColumnOptions([...columnOptions, delFilter.column]);
  };

  // controla os filtros deletados
  const handleDeleteFilterButton = (e, delFilter) => {
    e.preventDefault();
    deleteSelectedFilter(delFilter);
    // filterPlanetsBySelectedFilters()
  };

  return (
    <TableContext.Provider
      value={ {
        loading,
        table,
        error,
        numericFilters,
        selectedFilters,
        columnOptions,
        handleNumericFilters,
        handleFilterByName,
        handleSubmitButton,
        handleDeleteFilterButton,
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
