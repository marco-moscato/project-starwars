import { createContext } from 'react';

export const FilterContext = createContext();

function FilterProvider({ children }) {
  //   const filterContextValue = useMemo(
  //     () => ({ filterByName, }),
  //     [filterByName],
  //   );

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
