import React from 'react';
import { useSelector } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

// get transaction data and budget across categories and pass to other components
function BudgetAtAGlance() {
  // const date = new Date();

  // const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

  // This is used for testing purposes if no transactions for current month
  const firstDay = new Date('2021-03-01');
  // const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  // This is used for testing purposes if no transactions for current month
  const lastDay = new Date('2021-03-31');

  const amountSpent = useSelector((state) => state.transactions.entities
    .filter((transaction) => transaction.date >= firstDay && transaction.date <= lastDay)
    .reduce((initialTransaction, t) => initialTransaction + Math.abs(t.amount), 0).toFixed(2));

  /* eslint-disable no-console */
  console.log(amountSpent);

  const totalBudget = useSelector((state) => state.categories.entities
    .reduce((total, transaction) => total + transaction.target, 0));
  /* eslint-disable no-console */
  console.log(totalBudget);

  const spentToBudget = ((amountSpent - totalBudget) / totalBudget);
  /* eslint-disable no-console */
  console.log(spentToBudget);

  return (
    <div className="card border-secondary mb-3">
      <h4 className="card-header">Budget at a Glance</h4>
      <p className="m-3">
        $
        {amountSpent}
        &nbsp; of $
        {totalBudget}
        &nbsp;spent
        <div className="my-3">
          <SpentTracker ratio={spentToBudget} />
          <BudgetProgressBar amount={amountSpent} total={totalBudget} ratio={spentToBudget} />
        </div>
      </p>
    </div>
  );
}

// Displays message based on how much was spent
function SpentTracker({ ratio }) {
  const fontStyling = (ratio > 0.10) ? 'text-danger' : 'text-success';

  const endText = (ratio >= -0.10 && ratio <= 0.10) ? 'to stay within budget' : 'your budget';

  let status = '';

  if (ratio > 0.10) {
    status = 'Over';
  } else if (ratio < -0.10) {
    status = 'Under';
  } else {
    status = 'On Track';
  }

  return (
    <div>
      You&apos;re currently
      <strong className={fontStyling}>
        &nbsp;
        {status}
        &nbsp;
      </strong>
      {endText}
    </div>
  );
}

function BudgetProgressBar({ amount, total, ratio }) {
  const barColor = (ratio > 0.10) ? 'danger' : 'success';

  return (
    <div>
      <ProgressBar variant={barColor} now={amount} max={total} />
    </div>
  );
}

SpentTracker.propTypes = {
  ratio: PropTypes.number.isRequired,
};

BudgetProgressBar.propTypes = {
  amount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
};

export default BudgetAtAGlance;
