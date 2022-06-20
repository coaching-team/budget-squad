import React from 'react';
import { useSelector } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

/**
 * Shows how much spent compared to budget across all categories (except income) for current month.
 * Informs user if amount spent is "Under", "On Track", or "Over" budget by 10 percent.
 * Displays progress bar.
 *
 * @component
 */

// Sum transaction data and sum target budget across all categories
function BudgetAtAGlance({ testDate = '03-02-2022' }) {
  // UNCOMMENT WHEN READY TO COMMIT
  const date = (testDate);

  // const date - new Date("");
  /* eslint-disable no-console */
  console.log(date);

  // UNCOMMENT WHEN READY TO COMMIT
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  /* eslint-disable no-console */
  console.log(firstDay);

  // This is used for testing purposes if no transactions for current month
  // Remove after testing
  // const firstDay = new Date('2022-06-01');

  // Actual code to use once testing is completed
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  /* eslint-disable no-console */
  console.log(lastDay);

  // This is used for testing purposes if no transactions for current month
  // Remove after testing
  // const lastDay = new Date('2022-06-31');

  // Get all transactions that do not fall under "Income" category
  // Reduce these transactions to get total
  // UNCOMMENT WHEN READY TO COMMIT
  // const amountSpent = useSelector((state) => state.transactions.entities
  //   .filter((transaction) => transaction.date >= firstDay && transaction.date <= lastDay)
  //   .reduce((total, transaction) => total + transaction.amount, 0).toFixed(2));

  // Remove after testing
  // /* eslint-disable no-console */
  // console.log(amountSpent);

  // Gets transaction data. Filters transactions to current month.
  // Excludes transactions under income and sums filtered transactions.
  const amountSpent = useSelector(
    (state) => {
      const allTransactions = state.transactions.entities;
      const currTransactions = allTransactions.filter(
        (transaction) => transaction.date >= firstDay && transaction.date <= lastDay,
      );

      const filteredTransactions = currTransactions.filter(
        (transaction) => transaction.categoryId !== 0,
      );

      const totalTransactions = filteredTransactions.reduce(
        (total, transaction) => total + transaction.amount,
        0,
      ).toFixed(2);
      // Remove after testing -- do not delete return line
      /* eslint-disable no-console */
      console.log(totalTransactions);
      return totalTransactions;
    },
  );

  // Remove after testing
  /* eslint-disable no-console */
  console.log(amountSpent);

  // Gets categories data, excludes income category, sums target values
  const totalBudget = useSelector(
    (state) => {
      const allCategories = state.categories.entities;
      const budgetCategories = allCategories.filter(
        (category) => category.id !== 0,
      );

      const totalCategories = budgetCategories.reduce(
        (total, category) => total + category.target,
        0,
      );
      // Remove after testing
      /* eslint-disable no-console */
      console.log(totalCategories);
      return totalCategories;
    },
  );

  // Gets percent different to calculate status
  const spentToBudget = ((Math.abs(amountSpent) - totalBudget) / totalBudget);
  // Remove after testing
  /* eslint-disable no-console */
  console.log(spentToBudget);

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card border-secondary mb-3">
          <h4 className="card-header">Budget at a Glance</h4>
          <p className="m-3">
            <SpentTracker amount={amountSpent} total={totalBudget} />
            <div className="my-3">
              <BudgetStatus amount={amountSpent} ratio={spentToBudget} />
              <BudgetProgressBar amount={amountSpent} total={totalBudget} ratio={spentToBudget} />
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Displays amount spent over the total budget.
 * If credited transactions exceed total budget,
 * additional funds are displayed in addition to budgeted amount.
 * @param {number} amount sum of transactions (except income)
 * @param {number} total sum of category targets (except income)
 * @returns {string} spentDisplay amount spent over total budget
 */

function SpentTracker({ amount, total }) {
  let spentDisplay = '';
  if (amount > 0) {
    spentDisplay = (
      <>
        $0 spent out of
        &nbsp;
        <strike>
          $
          {total}
        </strike>
        &nbsp;
        (
        $
        {total}
        +
        $
        {amount}
        )
      </>
    );
  } else if (amount === 0) {
    spentDisplay = (
      <>
        $0 spent out of
        &nbsp;
        $
        {total}
        +
        $
        {amount}
      </>
    );
  } else {
    spentDisplay = (
      <>
        $
        {Math.abs(amount)}
        &nbsp;spent out of $
        {total}
      </>
    );
  }
  return spentDisplay;
}

/**
 * Displays a status message if currently "Under", "On Track", or "Over" budget.
 * @param {number} amount sum of transactions
 * @param {number} ratio difference of sum of transactions and total budget over total budget
 * @returns {string} status message if "Under", "On Track", or "Over" budget depending on ratio
 */

// Added amount < 0 to condition to ensure BudgetStatus tracking negative transactions
function BudgetStatus({ amount, ratio }) {
  const fontStyling = (amount < 0 && ratio > 0.10) ? 'text-danger' : 'text-success';

  const endText = (ratio >= -0.10 && ratio <= 0.10) ? 'to stay within budget' : 'your budget';

  let status = '';

  if (amount < 0 && ratio > 0.10) {
    status = 'Over';
  } else if (amount < 0 && ratio < -0.10) {
    status = 'Under';
  } else {
    status = 'On Track';
  }

  return (
    <>
      You&apos;re currently
      <strong className={fontStyling}>
        &nbsp;
        {status}
        &nbsp;
      </strong>
      {endText}
    </>
  );
}

/**
 * Displays a progress bar showing budget status.
 * @param {number} amount sum of transactions
 * @param {number} total sum of category targets
 * @param {number} ratio difference of sum of transactions and total budget over total budget
 * @returns progress bar
 */

function BudgetProgressBar({ amount, total, ratio }) {
  const barColor = (amount < 0 && ratio > 0.10) ? 'danger' : 'success';

  return (
    <ProgressBar variant={barColor} now={Math.abs(amount)} max={total} />
  );
}

BudgetAtAGlance.propTypes = {
  testDate: PropTypes.instanceOf(Date).isRequired,
};

SpentTracker.propTypes = {
  /**
   * Sum of transactions (amount) and sum of all category targets (total).
   */
  amount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

BudgetStatus.propTypes = {
  /**
   * Sum of transactions (amount) and difference of amount spent (amount)
   * and total budget (total) over total budget.
   */
  amount: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
};

BudgetProgressBar.propTypes = {
/**
 * Sum of transactions (amount), sum of category targets (total),
 * and different of amount spent (amount) and total budget (total) over total budget [ratio].
 */

  amount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
};

export default BudgetAtAGlance;
