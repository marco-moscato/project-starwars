import { createContext, useEffect, useMemo, useState } from 'react';
import fetchPlanetsAPI from '../services/fetchPlanetsAPI';

export const FetchContext = createContext();

function FetchProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [planets, setPlanets] = useState([]);
  const [planetsKeys, setPlanetsKeys] = useState([]);
  const [error, setError] = useState('');
  const fetchContextvalue = useMemo(
    () => ({ loading, planets, planetsKeys }),
    [loading, planets, planetsKeys],
  );

  useEffect(() => {
    setLoading(true);
    fetchPlanetsAPI()
      .then((response) => {
        setPlanets(response);
        setPlanetsKeys(Object.keys(response[0]));
      })
      .catch(() => setError('Tivemos um problema com a requisição'));
    setLoading(true);
  }, []);

  return (
    <FetchContext.Provider value={ fetchContextvalue }>
      { children }
    </FetchContext.Provider>
  );
}

export default FetchProvider;
