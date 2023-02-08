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
          const filter = response.filter((ele) => delete ele.residents);
          setPlanets(filter);
          setFilterPlanets(filter);
        })
        .catch(() => setError('Tivemos um problema com a requisição'));
      setLoading(false);
    },
    [],
  );

  // controla as opção disponíveis no column filter
  const handleColumnFilter = () => {
    const filter = columnOptions.filter((option) => option !== otherFilters.column);
    setColumnOptions(filter);
    setOtherFilters({ column: filter[0], comparison: 'maior que', value: 0 });
  };

  // controla os filtros deletados
  const handleDeleteFilter = (e, delfilter) => {
    e.preventDefault();
    const filter = selectedFilters.filter((selFilter) => selFilter !== delfilter);
    console.log(filter);
    setSelectedFilters(filter);
    setColumnOptions([...columnOptions, delfilter.column]);
    const table = filterPlanets.filter((planet) => {
      if (selectedFilters.comparison === 'maior que') {
        return Number(planet[otherFilters.column]) > otherFilters.value;
      }
      if (selectedFilters.comparison === 'menor que') {
        return Number(planet[otherFilters.column]) < otherFilters.value;
      }
      if (selectedFilters.comparison === 'igual a') {
        return planet[otherFilters.column] === otherFilters.value;
      }
      return table;
    });
    setFilterPlanets([table]);
  };

  // controla o filtro por nome
  const handleFilterName = (input) => {
    const filter = planets.filter((planet) => planet.name.includes(input));
    setFilterPlanets(filter);
  };

  // controla os outros filtros
  const handleOtherFilters = ({ target }) => {
    setOtherFilters({ ...otherFilters, [target.name]: target.value });
    // setColumnOptions(...otherFilters.column);
  };

  // controla o botão filtrar
  const handleSubmit = (e) => {
    e.preventDefault();
    const replyPlanets = [...filterPlanets];
    const filter = replyPlanets.filter((planet) => {
      if (otherFilters.comparison === 'maior que') {
        return Number(planet[otherFilters.column]) > otherFilters.value;
      }
      if (otherFilters.comparison === 'menor que') {
        return Number(planet[otherFilters.column]) < otherFilters.value;
      }
      if (otherFilters.comparison === 'igual a') {
        return planet[otherFilters.column] === otherFilters.value;
      }
      return filter;
    });
    setFilterPlanets(filter);
    setSelectedFilters([...selectedFilters, otherFilters]);
    handleColumnFilter();
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
        handleFilterName,
        handleSubmit,
        handleDeleteFilter,
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
