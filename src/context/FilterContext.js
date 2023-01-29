import { createContext } from 'react';

export const FilterContext = createContext();

function FilterProvider({ children }) {
  return (
    <FilterContext.Provider value="">
      { children }
    </FilterContext.Provider>
  );
}

export default FilterProvider;
