import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanetsAPI from '../services/fetchPlanetsAPI';

export const TableContext = createContext();

function TableProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [table, setTable] = useState([]);
  const [filteredTable, setFilteredTable] = useState([]);
  const [error, setError] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [columnOptions, setColumnOptions] = useState([
    'population', 'orbital_period',
    'diameter', 'rotation_period',
    'surface_water']);
  const [filtersChange, setFiltersChange] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [sortColumns, setSortColumns] = useState(
    { order: { column: 'population', sort: 'ASC' } },
  );

  useEffect(
    () => {
      fetchPlanetsAPI()
        .then((response) => {
          const removeKeyFromAPI = response.filter((ele) => delete ele.residents);
          setTable(removeKeyFromAPI);
          setFilteredTable(removeKeyFromAPI);
        })
        .catch(() => setError('Tivemos um problema com a requisição'));
      setLoading(false);
    },
    [],
  );

  const filterByName = ({ target }) => {
    const filter = table
      .filter((planet) => planet.name.includes(target.value));
    setFilteredTable(filter);
  };

  const handleFiltersChange = ({ target }) => {
    setFiltersChange({ ...filtersChange, [target.name]: target.value });
  };

  // Control options available at column filter
  const handleColumnFilter = () => {
    const filter = columnOptions.filter((option) => option !== filtersChange.column);
    setColumnOptions(filter);
    setFiltersChange({ ...filtersChange,
      column: filter[0],
      comparison: 'maior que',
      value: 0 });
  };

  const checkWhichComparisonFilter2 = (planet, filter) => {
    if (filter.comparison === 'maior que') {
      return Number(planet[filter.column]) > filter.value;
    }
    if (filter.comparison === 'menor que') {
      return Number(planet[filter.column]) < filter.value;
    }
    if (filter.comparison === 'igual a') {
      return planet[filter.column] === filter.value;
    }
  };

  useEffect(() => {
    const filterPlanets = () => {
      const results = table
        .filter((planet) => selectedFilters
          .every((filter) => checkWhichComparisonFilter2(planet, filter)));
      setFilteredTable(results);
    };
    filterPlanets();
  }, [selectedFilters]);

  // controla o botão filtrar
  const handleSubmitButton = (e) => {
    e.preventDefault();
    setSelectedFilters([...selectedFilters, filtersChange]);
    handleColumnFilter();
  };

  const removeAllFilters = (e) => {
    e.preventDefault();
    setSelectedFilters([]);
    setFilteredTable(table);
  };

  // Delete selected filter from screen and restore it to column option
  const deleteSelectedFilter = (delFilter) => {
    const filter = selectedFilters.filter((selFilter) => selFilter !== delFilter);
    setSelectedFilters(filter);
  };

  // controla os filtros deletados
  const handleDeleteFilterButton = (e, delFilter) => {
    e.preventDefault();
    deleteSelectedFilter(delFilter);
  };

  const onChangeSort = ({ target }) => {
    setSortColumns({ order: { ...sortColumns.order, [target.name]: target.value } });
  };

  // const sortNamesA = (a, b) => {
  //   const nameA = a.name.toUpperCase();
  //   const nameB = b.name.toUpperCase();
  //   if (nameA < nameB) {
  //     const magic = -1;
  //     return magic;
  //   }
  //   if (nameA > nameB) {
  //     return 1;
  //   }
  //   return 0;
  // };

  // const sortNamesB = (b, a) => {
  //   const nameA = a.name.toUpperCase();
  //   const nameB = b.name.toUpperCase();
  //   if (nameA > nameB) {
  //     const magic = -1;
  //     return magic;
  //   }
  //   if (nameA < nameB) {
  //     return 1;
  //   }
  //   return 0;
  // };

  // const handleByPopulation = () => {
  //   if (sortColumns.order.column === 'population' && sortColumns.order.sort === 'ASC') {
  //     const newArray = [...table];
  //     const result = newArray.sort((a, b) => sortNamesA(a, b));
  //     setSortColumns(result);
  //   }

  //   if (sortColumns.order.column === 'population'
  // && sortColumns.order.sort === 'DESC') {
  //     const newArray = [...table];
  //     const result = newArray.sort((b, a) => sortNamesB(a, b));
  //     setSortColumns(result);
  //   }
  // };

  const filterUnknown = (coluna) => {
    const filter = table.filter((ele) => ele[coluna] !== 'unknown');
    return filter;
  };

  // const filterRest = () => {
  //   const filter = table.filter((ele) => ele[sortColumns.order.column] === 'unknown');
  //   return filter;
  // };

  const handleByOtherThanPopulation = () => {
    const coluna = sortColumns.order.column;
    if (sortColumns.order.sort === 'ASC') {
      const newArray = filterUnknown(coluna);
      const result = newArray
        .sort((a, b) => a[coluna] - b[coluna]);
      setFilteredTable(result);
    }
    if (sortColumns.order.sort === 'DESC') {
      const newArray = [...table];
      const result = newArray
        .sort((a, b) => b[coluna] - a[coluna]);
      setFilteredTable(result);
    }
  };

  const handleSortButton = (e) => {
    e.preventDefault();
    handleByOtherThanPopulation();
  };

  return (
    <TableContext.Provider
      value={ {
        loading,
        table,
        error,
        filtersChange,
        selectedFilters,
        columnOptions,
        filteredTable,
        sortColumns,
        handleSortButton,
        onChangeSort,
        filterByName,
        handleFiltersChange,
        handleSubmitButton,
        handleDeleteFilterButton,
        removeAllFilters,
      } }
    >
      <div>{ children }</div>
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default TableProvider;
