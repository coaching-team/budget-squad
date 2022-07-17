import React from 'react';
import BudgetAtAGlanceWidget from '../BudgetAtAGlanceWidget';
import {
  render, screen, TestData,
} from '../../test';

describe('BudgetAtAGlanceWidget', () => {
  it.skip('displays correctly with no transactions', () => {
    // Arrange with no transactions and one $500 category, at the end of the month
    const transactions = [];
    const categories = [TestData.getCategory(500)];
    const testState = TestData.getState(transactions, categories);
    const testDate = new Date('6-30-22');
    render(<BudgetAtAGlanceWidget testDate={testDate} />, { preloadedState: testState });

    // Assert spent message shows no spending
    screen.getByText(/\$0 spent out of \$500/i);
    // Assert under budget message is displayed
    screen.getByText(/under/i);
    // Assert progress bar is empty
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '500');
  });

  it.skip('displays correctly with only negative transactions', () => {
    // Arrange with 3 negative transactions, 5 categories, at the beginning of the month
    const categoryIds = ['2457cec9-d841-49d7-9fba-8c6e852cbc22',
      '59726654-f530-4d5d-976c-006173cdd86a', '59726654-f530-4d5d-976c-006173cdd86a'];
    const transactions = TestData.getTransactions([-1005, -68, -77], new Date('6-5-22'), categoryIds);
    const testState = TestData.getState(transactions);
    const testDate = new Date('6-1-22');
    render(<BudgetAtAGlanceWidget testDate={testDate} />, { preloadedState: testState });

    // Assert spent message shows $1150 spending
    screen.getByText(/\$1150 spent out of \$2300/i);
    // Assert over budget message is displayed
    screen.getByText(/over/i);
    // Assert progress bar is halfway
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '1150');
    expect(progressBar).toHaveAttribute('aria-valuemax', '2300');
  });

  it.skip('displays correctly with only positive transactions', () => {
    // Arrange with 2 positive transactions, 5 categories, at the beginning of the month
    const categoryIds = ['2457cec9-d841-49d7-9fba-8c6e852cbc22', '59726654-f530-4d5d-976c-006173cdd86a'];
    const transactions = TestData.getTransactions([500, 500], new Date('6-5-22'), categoryIds);
    const testState = TestData.getState(transactions);
    const testDate = new Date('6-1-22');
    render(<BudgetAtAGlanceWidget testDate={testDate} />, { preloadedState: testState });

    // Assert spent message shows $0 spent and an extra $1000 to spend
    screen.getByText(/\$0 spent out of \( \$2300\+ \$1000\)/i);
    // Assert on track message is displayed
    // changed to under from on track
    screen.getByText(/on track/i);
    // Assert progress bar is empty
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '3300');
  });

  it.skip('displays correctly with positive and negative transactions', () => {
    // Arrange with 2 transactions (1 positive, 1 negative that together add up to negative)
    // 5 categories, 66% through the month
    const categoryIds = ['2457cec9-d841-49d7-9fba-8c6e852cbc22', '59726654-f530-4d5d-976c-006173cdd86a'];
    const transactions = TestData.getTransactions([-2000, 160], new Date('6-15-2022'), categoryIds);
    const testState = TestData.getState(transactions);
    const testDate = new Date('6-20-22');
    render(<BudgetAtAGlanceWidget testDate={testDate} />, { preloadedState: testState });

    // Assert spent message shows $1840 spent
    screen.getByText(/\$1840 spent out of \$2300/i);
    // Assert over budget message is displayed
    screen.getByText(/over/i);
    // Assert progress bar is 80% full
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '1840');
    expect(progressBar).toHaveAttribute('aria-valuemax', '2300');
  });

  it('doesn\'t count Income transactions or transactions outside the month', () => {
    // Arrange with 5 categories, at the end of the month
    // and 5 transactions that should be ignored: 1 positive Income, 1 negative Income,
    // 1 day before the month, 1 day after the month, 1 same month previous year
    const transactions = TestData.getTransactions(
      [-100, 200, -300, -400, -500],
      [new Date('6-15-2022'), new Date('6-15-2022'), new Date('5-31-2022'), new Date('7-1-2022'), new Date('6-15-2021')],
      ['6321da2a-98ef-457d-8357-797a9041fe10', '6321da2a-98ef-457d-8357-797a9041fe10',
        '2457cec9-d841-49d7-9fba-8c6e852cbc22', '59726654-f530-4d5d-976c-006173cdd86a'],
    );
    const testState = TestData.getState(transactions);
    const testDate = new Date('6-30-22');
    render(<BudgetAtAGlanceWidget testDate={testDate} />, { preloadedState: testState });

    // Assert spent message shows no spending
    screen.getByText(/\$0 spent out of \$2300/i);
    // Assert under budget message is displayed
    screen.getByText(/under/i);
    // Assert progress bar is empty
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '2300');
  });
});
