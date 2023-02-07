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
  // const options = (['population', 'orbital_period', 'diameter', 'rotation_period',
  //   'surface_water']);
  // const [columnOptions, setColumnOptions] = useState(options);
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

  // const handleColumnFilter = () => {
  //   const filter = options.filter((option) => option !== otherFilters.column);
  //   setColumnOptions(filter);
  // };

  // controla o filtro por nome
  const handleFilterName = (input) => {
    const filter = planets.filter((planet) => planet.name.includes(input));
    setFilterPlanets(filter);
  };

  // controla os outros filtros
  const handleOtherFilters = (e) => {
    setOtherFilters({ ...otherFilters, [e.target.name]: e.target.value });
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
    // handleColumnFilter();
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
        useFormInput,
        handleOtherFilters,
        handleFilterName,
        handleSubmit,
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
