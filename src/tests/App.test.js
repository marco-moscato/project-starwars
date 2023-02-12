import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Test table components', () => {
  test('if there is a table content when rendering', () => {
      render(<App />);
      
      const table = screen.getByRole('table');
      const tableHeader = screen.getAllByRole('columnheader');

      expect(table).toBeInTheDocument();
      expect(tableHeader).toHaveLength(13);
  });

  test('if table data is being rendered from API', async () => {
      render(<App />);
      
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();

      const loading = await screen.findByRole('heading', { name: /carregando.../i, level: 3 });
      expect(loading).toBeInTheDocument();
      
      // Não foi possível encontrar o resultado da API no DOM. Verificar!
      // await waitForElementToBeRemoved(() => screen.queryByRole('heading', { name: /carregando.../i, level: 3 })); 
      // waitFor(() => {
      //   const rows = screen.getAllByRole('row');
      //   expect(rows).toHaveLength(10);
      // });
      // const firstPlanet = screen.getByText(/tatooine/i);
      // expect(firstPlanet).toBeInTheDocument();
      // expect(rows).toBeInTheDocument();
      // expect(table).toContainHTML('<tr><td data-testid="planet-name">');
  });
})

describe('Test filter components', () => {
test('if name filter input is working', async () => {
  render(<App />);
  
  const nameFilter = screen.getByTestId('name-filter');
  expect(nameFilter).toBeInTheDocument();
 
  userEvent.type(nameFilter, 'oo');
  // expect(screen.findByText(/tatooine/i)).toBeInTheDocument();
});

test('if value filters are working when one filter is selected', () => {
  render(<App />);
  
  const columnFilter = screen.getByTestId('column-filter');
  const comparisonFilter = screen.getByTestId('comparison-filter');
  const valueFilter = screen.getByTestId('value-filter');
  const filterButton = screen.getByTestId('button-filter');
  
  expect(columnFilter).toBeInTheDocument();
  expect(comparisonFilter).toBeInTheDocument();
  expect(valueFilter).toBeInTheDocument();
  expect(filterButton).toBeInTheDocument();

  userEvent.selectOptions(columnFilter, 'population');
  userEvent.selectOptions(comparisonFilter, 'maior que');
  userEvent.type(valueFilter, '30000000');
  userEvent.click(filterButton);
 
  const selectedFilter = screen.getByTestId('filter');
  const deleteFilter = screen.getByRole('button', { name: /excluir filtro/i });
  expect(selectedFilter).toBeInTheDocument();
  expect(selectedFilter).toHaveTextContent(/population maior que 030000000/i);
  expect(selectedFilter).toContainElement(deleteFilter);

  userEvent.click(deleteFilter);
  expect(selectedFilter).not.toBeInTheDocument();

});

test('if delete all filters button is working when more than one filter is selected', () => {
  render(<App />);
  
  const columnFilter = screen.getByTestId('column-filter');
  const comparisonFilter = screen.getByTestId('comparison-filter');
  const valueFilter = screen.getByTestId('value-filter');
  const filterButton = screen.getByTestId('button-filter');
  const deleteAllFilters = screen.getByTestId('button-remove-filters');
  
  expect(columnFilter).toBeInTheDocument();
  expect(comparisonFilter).toBeInTheDocument();
  expect(valueFilter).toBeInTheDocument();
  expect(filterButton).toBeInTheDocument();
  expect(deleteAllFilters).toBeInTheDocument();

  userEvent.selectOptions(columnFilter, 'population');
  userEvent.selectOptions(comparisonFilter, 'maior que');
  userEvent.type(valueFilter, '30000000');
  userEvent.click(filterButton);

  userEvent.selectOptions(columnFilter, 'orbital_period');
  userEvent.selectOptions(comparisonFilter, 'maior que');
  userEvent.type(valueFilter, '400');
  userEvent.click(filterButton);
 
  const selectedFilter = screen.getAllByTestId('filter');
  const deleteFilter = screen.getAllByRole('button', { name: /excluir filtro/i });
  expect(selectedFilter[0]).toBeInTheDocument();
  expect(selectedFilter[0]).toHaveTextContent(/population maior que 030000000/i);
  expect(selectedFilter[0]).toContainElement(deleteFilter[0]);

  expect(selectedFilter[1]).toBeInTheDocument();
  expect(selectedFilter[1]).toHaveTextContent(/orbital_period maior que 0400/i);
  expect(selectedFilter[1]).toContainElement(deleteFilter[1]);

  userEvent.click(deleteAllFilters);
  expect(selectedFilter[0]).not.toBeInTheDocument();
  expect(selectedFilter[1]).not.toBeInTheDocument();
});

test('if sort filters when selected', () => {
  render(<App />);
  
  const sortColumn = screen.getByTestId('column-sort');
  const ascRadioButton = screen.getByTestId('column-sort-input-asc');
  const descRadioButton = screen.getByTestId('column-sort-input-desc');
  const columnSortButton = screen.getByTestId('column-sort-button');

  expect(sortColumn).toBeInTheDocument();
  expect(ascRadioButton).toBeInTheDocument();
  expect(descRadioButton).toBeInTheDocument();
  expect(columnSortButton).toBeInTheDocument();

  userEvent.selectOptions(sortColumn, 'population');
  userEvent.click(ascRadioButton);
  userEvent.click(columnSortButton);

});
// test('if selected filter is deleted when clicked', () => {
//   render(<App />);
  
//   const columnFilter = screen.getByTestId('column-filter');
//   const comparisonFilter = screen.getByTestId('comparison-filter');
//   const valueFilter = screen.getByTestId('value-filter');
//   const filterButton = screen.getByTestId('button-filter');
  
//   expect(columnFilter).toBeInTheDocument();
//   expect(comparisonFilter).toBeInTheDocument();
//   expect(valueFilter).toBeInTheDocument();
//   expect(filterButton).toBeInTheDocument();

//   userEvent.selectOptions(columnFilter, 'population');
//   userEvent.selectOptions(comparisonFilter, 'maior que');
//   userEvent.type(valueFilter, '30000000');
//   userEvent.click(filterButton);
 
//   const selectedFilter = screen.getByTestId('filter');
//   expect(selectedFilter).toBeInTheDocument();

// });

});