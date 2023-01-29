import React from 'react';
import './App.css';
import Filter from './components/Filter';
import Table from './components/Table';
import FetchProvider from './context/FetchContext';

function App() {
  return (
    <FetchProvider>
      <Filter />
      <Table />
    </FetchProvider>
  );
}

export default App;
