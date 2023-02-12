import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

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
      
      const rows = await screen.findAllByRole('row');
      const firstPlanet = await screen.findByText(/tatooine/i);
      expect(rows).toBeInTheDocument();
      // expect(table).toContainHTML('<tr><td data-testid="planet-name">');
  });
  test('if all filters are on screen', () => {
      render(<App />);
      
      const nameFilter = screen.getByTestId('name-filter');
      const columnFilter = screen.getByTestId('column-filter');
      const comparisonFilter = screen.getByTestId('comparison-filter');
      const valueFilter = screen.getByTestId('value-filter');
      const filterButton = screen.getByTestId('button-filter');
      const removeFiltersButton = screen.getByTestId('button-remove-filters');
      const sortColumn = screen.getByTestId('column-sort');
      const ascRadioButton = screen.getByTestId('column-sort-input-asc');
      const descRadioButton = screen.getByTestId('column-sort-input-desc');
      const columnSortButton = screen.getByTestId('column-sort-button');

      expect(nameFilter).toBeInTheDocument();
      expect(columnFilter).toBeInTheDocument();
      expect(comparisonFilter).toBeInTheDocument();
      expect(valueFilter).toBeInTheDocument();
      expect(filterButton).toBeInTheDocument();
      expect(removeFiltersButton).toBeInTheDocument();
      expect(sortColumn).toBeInTheDocument();
      expect(ascRadioButton).toBeInTheDocument();
      expect(descRadioButton).toBeInTheDocument();
      expect(columnSortButton).toBeInTheDocument();
  });
})