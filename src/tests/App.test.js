import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import fetchPlanetsAPI from '../services/fetchPlanetsAPI';
import Table from '../components/Table';
import { mockAPI } from '../services/mockAPI';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import { clear } from '@testing-library/user-event/dist/clear';
import { wait } from '@testing-library/user-event/dist/utils';

describe('Test table components', () => {
//   let container;

// beforeEach(() => {
//   container = document.createElement('div');
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   document.body.removeChild(container);
//   container = null;
//   jest.clearAllMocks()
// });

afterEach(() => jest.clearAllMocks());

  test('if there is a table content when rendering', async () => {
    // act(() => {
    //   ReactDOM.createRoot(container).render(<App />);
    // });  
    render(<App />);
      
      const table = screen.getByRole('table');
      const tableHeader = screen.getAllByRole('columnheader');
      expect(table).toBeInTheDocument();
      expect(tableHeader).toHaveLength(13);
  });

  test('if table data is being rendered from API', async () => {
    global.fetch = () => {
      return Promise.resolve({
      json: () => Promise.resolve(mockAPI),
    })
  };

    render(<App />);
     
      const firstPlanet = screen.findByText(/tatooine/i);
      const lastPlanet = screen.findByText(/kamino/i);
      
      expect(firstPlanet).toBeDefined();
      expect(lastPlanet).toBeDefined();

});
});

describe('Test filter components', () => {
test('if name filter input is working', async () => {
//   global.fetch = () => {
//     return Promise.resolve({
//     json: () => Promise.resolve(mockAPI),
//   })
// };

  render(<App />);
  
  const nameFilter = screen.getByTestId('name-filter');
  const planetNames = await screen.findAllByTestId('planet-name');

  expect(nameFilter).toBeInTheDocument();
  expect(planetNames).toHaveLength(10);

  userEvent.type(nameFilter, 'oo');
  const twoPlanets = await screen.findAllByTestId('planet-name');
  await waitFor(() => expect(twoPlanets).toHaveLength(2));
  clear(nameFilter);
});

test('if value filters are working when one filter is selected', async () => {
  render(<App />);
  
  const columnFilter = screen.getByTestId('column-filter');
  const comparisonFilter = screen.getByTestId('comparison-filter');
  const valueFilter = screen.getByTestId('value-filter');
  const filterButton = screen.getByTestId('button-filter');
  const planetNames = await screen.findAllByTestId('planet-name');
  
  expect(columnFilter).toBeInTheDocument();
  expect(comparisonFilter).toBeInTheDocument();
  expect(valueFilter).toBeInTheDocument();
  expect(filterButton).toBeInTheDocument();
  expect(planetNames).toHaveLength(10);

  userEvent.selectOptions(columnFilter, 'population');
  userEvent.selectOptions(comparisonFilter, 'maior que');
  userEvent.type(valueFilter, '30000000');
  userEvent.click(filterButton);
  const fourPlanets = await screen.findAllByTestId('planet-name');
  await waitFor(() => expect(fourPlanets).toHaveLength(4));
 
  const selectedFilter = screen.getByTestId('filter');
  const deleteFilter = screen.getByRole('button', { name: /excluir filtro/i });
  expect(selectedFilter).toBeInTheDocument();
  expect(selectedFilter).toHaveTextContent(/population maior que 030000000/i);
  expect(selectedFilter).toContainElement(deleteFilter);
  
  userEvent.click(deleteFilter);
  expect(selectedFilter).not.toBeInTheDocument();
  const finalPlanets = await screen.findAllByTestId('planet-name');
  await waitFor(() => expect(finalPlanets).toHaveLength(10));  

});

test('if delete all filters button is working when more than one filter is selected', async () => {
  render(<App />);
  
  const columnFilter = screen.getByTestId('column-filter');
  const comparisonFilter = screen.getByTestId('comparison-filter');
  const valueFilter = screen.getByTestId('value-filter');
  const filterButton = screen.getByTestId('button-filter');
  const deleteAllFilters = screen.getByTestId('button-remove-filters');
  const planetNames = await screen.findAllByTestId('planet-name');
  
  expect(columnFilter).toBeInTheDocument();
  expect(comparisonFilter).toBeInTheDocument();
  expect(valueFilter).toBeInTheDocument();
  expect(filterButton).toBeInTheDocument();
  expect(deleteAllFilters).toBeInTheDocument();
  expect(planetNames).toHaveLength(10);

  userEvent.selectOptions(columnFilter, 'population');
  userEvent.selectOptions(comparisonFilter, 'maior que');
  userEvent.type(valueFilter, '30000000');
  userEvent.click(filterButton);
  const fourPlanets = await screen.findAllByTestId('planet-name');
  await waitFor(() => expect(fourPlanets).toHaveLength(4));

  userEvent.selectOptions(columnFilter, 'orbital_period');
  userEvent.selectOptions(comparisonFilter, 'menor que');
  userEvent.type(valueFilter, '400');
  userEvent.click(filterButton);
  const onePlanet = await screen.findAllByTestId('planet-name');
  await waitFor(() => expect(onePlanet).toHaveLength(3));

  userEvent.selectOptions(columnFilter, 'diameter');
  userEvent.selectOptions(comparisonFilter, 'igual a');
  userEvent.type(valueFilter, '312');
  userEvent.click(filterButton);
 
  const selectedFilter = screen.getAllByTestId('filter');
  const deleteFilter = screen.getAllByRole('button', { name: /excluir filtro/i });
  expect(selectedFilter[0]).toBeInTheDocument();
  expect(selectedFilter[0]).toHaveTextContent(/population maior que 030000000/i);
  expect(selectedFilter[0]).toContainElement(deleteFilter[0]);

  expect(selectedFilter[1]).toBeInTheDocument();
  expect(selectedFilter[1]).toHaveTextContent(/orbital_period menor que 0400/i);
  expect(selectedFilter[1]).toContainElement(deleteFilter[1]);

  userEvent.click(deleteAllFilters);
  expect(selectedFilter[0]).not.toBeInTheDocument();
  expect(selectedFilter[1]).not.toBeInTheDocument();
});

test('if sort filters when selected', async () => {
  render(<App />);
  
  const sortColumn = screen.getByTestId('column-sort');
  const ascRadioButton = screen.getByTestId('column-sort-input-asc');
  const descRadioButton = screen.getByTestId('column-sort-input-desc');
  const columnSortButton = screen.getByTestId('column-sort-button');
  const planetNames = await screen.findAllByTestId('planet-name');

  expect(sortColumn).toBeInTheDocument();
  expect(ascRadioButton).toBeInTheDocument();
  expect(descRadioButton).toBeInTheDocument();
  expect(columnSortButton).toBeInTheDocument();
  expect(planetNames).toHaveLength(10);

  userEvent.selectOptions(sortColumn, 'population');
  userEvent.click(ascRadioButton);
  userEvent.click(columnSortButton);

  const sortedPlanets = await screen.findAllByTestId('planet-name');
  expect(sortedPlanets[0]).toHaveTextContent(/yavin/i);



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