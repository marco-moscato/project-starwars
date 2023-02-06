import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Test table components', () => {
    test('If there is a table content when rendering and its size', () => {
        render(<App />);
        
        const table = screen.getByRole('table');
        const header = screen.getAllByRole('columnheader');
        const rows = screen.getAllByRole('row');

        expect(table).toBeDefined();
        expect(header).toHaveLength(13);
        // expect(rows).toHaveLength(10);
    });
    test('if all filters are being on screen', () => {
        render(<App />);
        
        const table = screen.getByRole('table');
        const header = screen.getAllByRole('columnheader');
        const rows = screen.getAllByRole('row');

        expect(table).toBeDefined();
        expect(header).toHaveLength(13);
        // expect(rows).toHaveLength(10);
    });
})