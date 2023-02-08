import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanetsAPI from '../services/fetchPlanetsAPI';
import useFormInput from '../hooks/useFormInput';

export const TableContext = createContext();

function TableProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [planets, setPlanets] = useState([]);
  const [error, setError] = useState('');
  const [filterPlanets, setFilterPlanets] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [columnOptions, setColumnOptions] = useState([
    'population', 'orbital_period',
    'diameter', 'rotation_period',
    'surface_water']);
  const [otherFilters, setOtherFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  useEffect(
    () => {
      setLoading(true);
      fetchPlanetsAPI()
        .then((response) => {
          const removeKey = response.filter((ele) => delete ele.residents);
          setPlanets(removeKey);
          // setFilterPlanets(filter);
        });
      // .catch(() => setError('Tivemos um problema com a requisição'));
      setLoading(false);
    },
    [],
  );

  // Handle form field by planet name
  const handleFilterByName = (input) => {
    const filterByInputName = planets.filter((planet) => planet.name.includes(input));
    return filterByInputName;
  };

  // Handle the other numeric filters
  const handleOtherFilters = ({ target }) => {
    setOtherFilters({ ...otherFilters, [target.name]: target.value });
  };

  // Check which type of comparison filter was selected
  const checkWhichComparisonFilter = (planet) => {
    if (otherFilters.comparison === 'maior que') {
      return Number(planet[otherFilters.column]) > otherFilters.value;
    }
    if (otherFilters.comparison === 'menor que') {
      return Number(planet[otherFilters.column]) < otherFilters.value;
    }
    if (otherFilters.comparison === 'igual a') {
      return planet[otherFilters.column] === otherFilters.value;
    }
  };

  // Control options available at column filter
  const handleColumnFilter = () => {
    const filter = columnOptions.filter((option) => option !== otherFilters.column);
    setColumnOptions(filter);
    setOtherFilters({ column: filter[0], comparison: 'maior que', value: 0 });
  };

  // controla o botão filtrar
  const handleSubmitButton = (e) => {
    e.preventDefault();
    const filter = filterPlanets
      .filter((planet) => checkWhichComparisonFilter(planet));
    setFilterPlanets(filter);
    setSelectedFilters([...selectedFilters, otherFilters]);
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
        planets,
        error,
        filterPlanets,
        otherFilters,
        selectedFilters,
        columnOptions,
        useFormInput,
        handleOtherFilters,
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
