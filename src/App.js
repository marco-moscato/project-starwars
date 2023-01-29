import React from 'react';
import './App.css';
import Filter from './components/Filter';
import Table from './components/Table';
import FetchProvider from './context/FetchContext';
import FilterProvider from './context/FilterContext';

function App() {
  return (
    <FetchProvider>
      <FilterProvider>
        <Filter />
        <Table />
      </FilterProvider>
    </FetchProvider>
  );
}

export default App;
