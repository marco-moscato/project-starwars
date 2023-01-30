import { createContext } from 'react';
import PropTypes from 'prop-types';
import useFormInput from '../hooks/useFormInput';

export const FilterContext = createContext();

function FilterProvider({ children }) {
  const nameFilters = useFormInput('');

  return (
    <FilterContext.Provider value="">
      <div>{ children }</div>
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default FilterProvider;
