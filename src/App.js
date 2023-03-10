import React from 'react';
import './App.css';
import Filter from './components/Filter';
import Table from './components/Table';
import TableProvider from './context/TableContext';

function App() {
  return (
    <TableProvider>
      <Filter />
      <Table />
    </TableProvider>
  );
}

export default App;
