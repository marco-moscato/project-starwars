import { createContext, useEffect, useMemo, useState } from 'react';
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
  const nameFilter = useFormInput('');
  const tableContextvalue = useMemo(
    () => ({ loading, planets, planetsKeys, error, filterPlanets, nameFilter }),
    [loading, planets, planetsKeys, error, filterPlanets, nameFilter],
  );

  useEffect(
    () => {
      setLoading(true);
      fetchPlanetsAPI()
        .then((response) => {
          setPlanets(response.filter((ele) => delete ele.residents));
          setPlanetsKeys(Object.keys(response[0]));
        })
        .catch(() => setError('Tivemos um problema com a requisição'));
      setLoading(false);
    },
    [],
  );

  const filterByName = () => {
    if (nameFilter === '') {
      setFilterPlanets(planets);
    } else {
      const filter = planets.filter((planet) => planet.name.includes(nameFilter.value));
      setFilterPlanets(filter);
    }
  };

  return (
    <TableContext.Provider value={ tableContextvalue }>
      <div>{ children }</div>
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default TableProvider;
