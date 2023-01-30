import { createContext, useEffect, useInsertionEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanetsAPI from '../services/fetchPlanetsAPI';
import useFormInput from '../hooks/useFormInput';

export const TableContext = createContext();

function TableProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [planets, setPlanets] = useState([]);
  const [planetsKeys, setPlanetsKeys] = useState([]);
  const [error, setError] = useState('');
  const nameInputValue = useFormInput('');
  const tableContextvalue = useMemo(
    () => ({ loading, planets, planetsKeys, error }),
    [loading, planets, planetsKeys, error],
  );

  useEffect(() => {
    setLoading(true);
    if (nameInputValue === '') {
      fetchPlanetsAPI()
        .then((response) => {
          setPlanets(response.filter((ele) => delete ele.residents));
          setPlanetsKeys(Object.keys(response[0]));
        })
        .catch(() => setError('Tivemos um problema com a requisição'));
    } else {
      const filterPlanets = planets.filter((planet) => planet.name.includes(nameInputValue));
      console.log(filterPlanets);
      setPlanets(filterPlanets);
      setLoading(false);
    }
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
