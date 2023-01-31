import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanetsAPI from '../services/fetchPlanetsAPI';

export const TableContext = createContext();

function TableProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [planets, setPlanets] = useState([]);
  const [planetsKeys, setPlanetsKeys] = useState([]);
  const [error, setError] = useState('');
  const [filterPlanets, setFilterPlanets] = useState([]);
  const [formInput, setFormInput] = useState({
    columnFilter: 'population',
    comparisonFilter: 'maiorQue',
    valueFilter: '',
  });
  // const tableContextvalue = useMemo(
  //   () => ({
  //     loading, planets, planetsKeys, error, filterPlanets, nameFilter }),
  //   [loading, planets, planetsKeys, error, filterPlanets, nameFilter],
  // );

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

  const handleChange = (input) => {
    const filter = planets.filter((planet) => planet.name.includes(input));
    setFilterPlanets(filter);
  };

  const handleFilter = (input) => {
    // console.log(input.name, input.value);
    setFormInput({...formInput, {input.[name]: input.[value]}});
  };

  const handleSubmit = (input) => {
    console.log(input);
    // setFormInput(input);
    // const filter = planets.filter((planet) => {
    //   planet.input
    // })
  };

  return (
    <TableContext.Provider
      value={ {
        loading,
        planets,
        planetsKeys,
        error,
        filterPlanets,
        formInput,
        handleChange,
        handleFilter,
        handleSubmit } }
    >
      <div>{ children }</div>
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default TableProvider;
