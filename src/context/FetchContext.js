import { createContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanetsAPI from '../services/fetchPlanetsAPI';

export const FetchContext = createContext();

function FetchProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [planets, setPlanets] = useState([]);
  const [planetsKeys, setPlanetsKeys] = useState([]);
  const [error, setError] = useState('');
  const fetchContextvalue = useMemo(
    () => ({ loading, planets, planetsKeys, error }),
    [loading, planets, planetsKeys, error],
  );

  useEffect(() => {
    setLoading(true);
    fetchPlanetsAPI()
      .then((response) => {
        setPlanets(response.filter((ele) => delete ele.residents));
        setPlanetsKeys(Object.keys(response[0]));
      })
      .catch(() => setError('Tivemos um problema com a requisição'));
    setLoading(false);
  }, []);

  return (
    <FetchContext.Provider value={ fetchContextvalue }>
      { children }
    </FetchContext.Provider>
  );
}

FetchProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default FetchProvider;
