import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('Test table content', () => {
  render(<App />);
  const table = screen.getByRole('table');
  const headerRow = screen.getAllByRole('rowgroup');
  const rowHeader = screen.getByRole('rowheader');
  const rows = screen.getAllByRole('row');

  expect(table).toBeInTheDocument();
//   expect(rows.length).toBe(11);
  expect(rowHeader).toHaveLength(13);
//   expect(table).toContainElement()
//   expect(tableHeaders).toContainElement('th');
  
});