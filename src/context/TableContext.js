import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanetsAPI from '../services/fetchPlanetsAPI';
import useFormInput from '../hooks/useFormInput';

export const TableContext = createContext();

function TableProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [planets, setPlanets] = useState([]);
  const [planetsKeys, setPlanetsKeys] = useState([]);
  const [error, setError] = useState('');
  const [filterPlanets, setFilterPlanets] = useState([]);
  const [otherFilters, setOtherFilters] = useState({
    columnFilter: 'population',
    comparisonFilter: 'maiorQue',
    valueFilter: '',
  });

  useEffect(
    () => {
      setLoading(true);
      fetchPlanetsAPI()
        .then((response) => {
          setPlanets(response.filter((ele) => delete ele.residents));
          setPlanetsKeys(Object.keys(response[0]));
          setFilterPlanets(response.filter((ele) => delete ele.residents));
        })
        .catch(() => setError('Tivemos um problema com a requisição'));
      setLoading(false);
    },
    [],
  );

  // controla o filtro por nome
  const handleFilterName = (input) => {
    const filter = planets.filter((planet) => planet.name.includes(input));
    setFilterPlanets(filter);
  };

  // controla os outros filtros
  const handleOtherFilters = (e) => {
    setOtherFilters({ ...otherFilters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filterOthers = planets.filter((planet) => {
      planet[otherFilters.columnFilter];
    });
    // planet.population === '1000');
    setFilterPlanets(filterOthers);
  };

  return (
    <TableContext.Provider
      value={ {
        loading,
        planets,
        planetsKeys,
        error,
        filterPlanets,
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
