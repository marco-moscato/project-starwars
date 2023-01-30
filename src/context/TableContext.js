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
  const nameFilter = useFormInput('');
  const tableContextvalue = useMemo(
    () => ({ loading, planets, planetsKeys, error, nameFilter }),
    [loading, planets, planetsKeys, error, nameFilter],
  );

  const filterByName = (input) => {
    const filter = planets.filter((planet) => {
      if (input === '') {
        return planet;
      }
      return planet.name.includes(input);
    });
    setPlanets(filter);
  };

  useEffect(() => {
    setLoading(true);
    fetchPlanetsAPI()
      .then((response) => {
        setPlanets(response.filter((ele) => delete ele.residents));
        setPlanetsKeys(Object.keys(response[0]));
        filterByName(nameFilter.value);
      })
      .catch(() => setError('Tivemos um problema com a requisição'));
    setLoading(false);
  }, []);
  return (
    <TableContext.Provider value={ tableContextvalue }>
      <div>{ children }</div>
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default TableProvider;
