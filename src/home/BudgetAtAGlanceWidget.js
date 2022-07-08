import React from 'react';
import { useSelector } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { INCOME_ID } from '../data';

/**
 * Shows how much spent compared to budget across all categories (except income) for current month.
 * Informs user if amount spent is "Under", "On Track", or "Over" budget.
 * "Under", "On Track", or "Over" is based on percentage spent vs the month percentage by 10%.
 * Displays progress bar.
 *
 * @component
 */

// Sum transaction data and sum target budget across all categories
function BudgetAtAGlance({ testDate = new Date() }) {
  // Testing Code
  const date = (testDate);

  // ACTUAL CODE
  // const date = new Date('');

  // Testing Code
  /* eslint-disable no-console */
  console.log(`Test date is ${testDate}`);

  // ACTUAL CODE
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

  // Testing Code
  /* eslint-disable no-console */
  console.log(`First day is ${firstDay}`);

  // ACTUAL CODE
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  // Testing Code
  /* eslint-disable no-console */
  console.log(`Last Day is ${lastDay}`);

  // Get all transactions that do not fall under "Income" category
  // Reduce these transactions to get total

  const amountSpent = useSelector(
    (state) => {
      const allTransactions = state.transactions.entities
        .filter(
          (transaction) => transaction.date >= firstDay && transaction.date <= lastDay,
        )
        .filter(
          (transaction) => transaction.categoryId !== INCOME_ID,
        )
        .reduce(
          (total, transaction) => total + transaction.amount,
          0,
        );

      // Testing Code
      /* eslint-disable no-console */
      console.log(`Total transactions are ${allTransactions}`);

      return parseFloat(allTransactions);
    },
  );

  // Testing Code
  /* eslint-disable no-console */
  console.log(`Amount spent is ${amountSpent}`);

  // Gets categories data, excludes income category, sums target values
  const totalBudget = useSelector(
    (state) => {
      const allCategories = state.categories.entities
        .filter(
          (category) => category.id !== INCOME_ID,
        )
        .reduce(
          (total, category) => total + category.target,
          0,
        );

      // Testing Code
      /* eslint-disable no-console */
      console.log(`Total categories are ${allCategories}`);
      /* eslint-disable no-console */
      console.log(typeof allCategories);

      return parseFloat(allCategories);
    },
  );

  // Gets budget percentage to calculate status
  const spentToBudget = parseFloat(Math.abs(amountSpent) / totalBudget);

  // Testing Code
  /* eslint-disable no-console */
  console.log(spentToBudget);

  // Gets month percentage to calculate status
  const currDay = date.getDate();
  const endDay = lastDay.getDate();
  const monthPercentage = parseFloat(currDay / endDay);

  // Testing Code
  /* eslint-disable no-console */
  console.log(monthPercentage);

  // ACTUAL CODE
  let status = '';
  if (amountSpent >= 0 && spentToBudget <= (monthPercentage - 0.10)) {
    status = 'Under';
  } else if (amountSpent >= 0 && spentToBudget > (monthPercentage - 0.10)) {
    status = 'On Track';
  } else {
    if (spentToBudget >= (monthPercentage + 0.10)) {
      status = 'Over';
    } else if (spentToBudget <= (monthPercentage - 0.10)) {
      status = 'Under';
    } else {
      status = 'On Track';
    }
  }

  // Testing Code
  const checkTest = (spentToBudget >= (monthPercentage * 1.10));
  /* eslint-disable no-console */
  console.log(checkTest);
  /* eslint-disable no-console */
  console.log(`Ratio is ${spentToBudget}`);
  /* eslint-disable no-console */
  console.log(`Month percent is ${monthPercentage * 1.10}`);

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card border-secondary mb-3">
          <h4 className="card-header">Budget at a Glance</h4>
          <p className="m-3">
            <SpentTracker amount={amountSpent} total={totalBudget} />
            <div className="my-3">
              <BudgetProgressBar
                amount={amountSpent}
                total={totalBudget}
                ratio={spentToBudget}
                monthPercent={monthPercentage}
                status={status}
              />
            </div>
            <div className="my-3">
              <BudgetStatus
                status={status}
              />
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
 * Amount is sum of transactions. Total is sum of category targets.
 *
 * @component
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
        $
        {total}
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
 * Takes sum of transactions (amount) and ratio (percent difference of amount and budget).
 * Determines if "Under", "On Track", or "Over" budget by 10 percent.
 *
 * @component
 */

function BudgetStatus({ status }) {
  const fontStyling = (status === 'On Track' || status === 'Under') ? 'text-success' : 'text-danger';

  const endText = (status === 'On Track') ? 'to stay within budget' : 'budget';
  /* eslint-disable no-console */
  console.log(`${fontStyling} ${endText}`);

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
 *
 * @component
 */

function BudgetProgressBar({
  amount, status, total,
}) {
  let barLength = '';

  let barMax = '';

  const barColor = (status === 'On Track' || status === 'Under') ? 'success' : 'danger';

  if (amount >= 0) {
    barLength = 0;
    barMax = amount + total;
  } else {
    barLength = Math.abs(amount);
    barMax = total;
  }

  // Testing Code
  /* eslint-disable no-console */
  console.log(`Progress bar amount is ${barLength}`);

  return (
    <ProgressBar variant={barColor} now={barLength} max={barMax} />
  );
}

BudgetAtAGlance.propTypes = {
  /**
   * Date prop to analyze spending for current month
   */
  testDate: PropTypes.instanceOf(Date).isRequired,
};

SpentTracker.propTypes = {
  /**
   * Sum of transactions (except income)
   */
  amount: PropTypes.number.isRequired,
  /**
   * Sum of all category targets (except income)
   */
  total: PropTypes.number.isRequired,
};

BudgetStatus.propTypes = {
  /**
   * Displays message text and styling based on Over, Under, or On Track
   */
  status: PropTypes.string.isRequired,
};

BudgetProgressBar.propTypes = {
  /**
   * Sum of transactions (except income)
   */
  amount: PropTypes.number.isRequired,
  /**
   * Displays message text and styling based on Over, Under, or On Track
   */
  status: PropTypes.string.isRequired,
  /**
   * Sum of all category targets (except income)
   */
  total: PropTypes.number.isRequired,
};

export default BudgetAtAGlance;
