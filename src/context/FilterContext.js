import { createContext, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import useFormInput from '../hooks/useFormInput';
import { FetchContext } from './FetchContext';

export const FilterContext = createContext();

function FilterProvider({ children }) {
  const nameFilter = useFormInput('');
  const planetsInfo = useContext(FetchContext);

  const filterByInputName = (inputValue) => {
    const { planets } = planetsInfo;
    return planets.filter((planet) => (inputValue === '' ? planet : planet.name.includes(inputValue)));
  };

  const filterContextvalue = useMemo(
    () => ({ nameFilter, filterByInputName }),
    [nameFilter, filterByInputName],
  );

  return (
    <FilterContext.Provider value={ filterContextvalue }>
      <div>{ children }</div>
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default FilterProvider;
