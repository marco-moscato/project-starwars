import { createContext } from 'react';
import PropTypes from 'prop-types';

export const FilterContext = createContext();

function FilterProvider({ children }) {
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
