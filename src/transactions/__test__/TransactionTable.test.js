import React from 'react';
import TransactionTable from '../TransactionTable';
import {
  render, screen, fireEvent, TestData,
} from '../../test';

const testTransaction = {
  id: '3b2e29b6-d911-4c8b-8e4e-5808f7559418',
  date: new Date('2021-03-24'),
  payee: 'Tromp, Howell and Grant',
  categoryId: 4,
  notes: 'nulla neque libero convallis',
  amount: -297.8,
};

describe('TransactionTable', () => {
  it('displays one transaction\'s data correctly', () => {
    // Arrange data & the screen
    const testState = TestData.getState([testTransaction]);
    render(<TransactionTable onStopCreating={() => {}} />, { preloadedState: testState });
    // Assert
    screen.getByRole('cell', { name: /3-24-2021/i });
    screen.getByRole('cell', { name: /Tromp, Howell and Grant/ });
    screen.getByRole('cell', { name: /Shopping/ });
    screen.getByRole('cell', { name: /297.80/ });
    screen.getByRole('cell', { name: /nulla neque libero convallis/ });
  });

  it('displays many transactions\' data correctly', () => {
    // Arrange the data
    const testState = TestData.getState();
    // Arrange the page
    render(<TransactionTable onStopCreating={() => {}} />, { preloadedState: testState });

    // Assert that all the transactions are displayed
    const numTransactions = testState.transactions.entities.length;
    const rows = screen.getAllByRole('row');
    // Add 1 to account for the header row
    expect(rows.length).toBe(numTransactions + 1);

    // Assert that all the dates are displayed correctly
    screen.getByRole('cell', { name: /0?2[-/]27[-/](20)?22/ });
    screen.getByRole('cell', { name: /0?1[-/]0?1[-/](20)?22/ });
    screen.getByRole('cell', { name: /12[-/]31[-/](20)?21/ });
    screen.getByRole('cell', { name: /0?5[-/]13[-/](20)?21/ });
  });

  it('deletes a transaction correctly', () => {
    // Arrange the data
    const testState = TestData.getState([testTransaction]);

    // Arrange the component
    render(<TransactionTable onStopCreating={() => {}} />, { preloadedState: testState });

    const transactionRow = screen.getByRole('row', {
      name: /3-24-2021 tromp, howell and grant shopping .*297\.80/i,
    });

    // Act by clicking the delete button
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(transactionRow).not.toBeInTheDocument();
    // 1 for the header row and nothing else
    expect(screen.getAllByRole('row').length).toBe(1);
  });
});
