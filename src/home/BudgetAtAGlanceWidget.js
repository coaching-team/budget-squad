import React from 'react';
import { useSelector } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

// getData and passData to other components
function BudgetAtAGlance() {
  const date = new Date();

  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  // const firstDay = new Date('2021-03-01');
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  // const lastDay = new Date('2021-03-31');

  const filteredTransactions = useSelector((state) => state.transactions.entities
    .filter(
      (transaction) => transaction.date >= firstDay && transaction.date <= lastDay,
      /* eslint-disable no-console */
      //  console.log('transaction: ', transaction);
    ));

  /* eslint-disable no-console */
  // console.log(filteredTransactions);

  const amountSpent = Math.abs(filteredTransactions
    .reduce((initialTotal, currentTotal) => initialTotal + currentTotal.amount, 0));
  /* eslint-disable no-console */
  console.log(amountSpent);

  const totalBudget = useSelector((state) => state.categories.entities
    .reduce((initialTarget, currentTarget) => initialTarget + currentTarget.target, 0));
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
  let message;
  if (ratio > 0.10) {
    message = (
      <div>
        You&apos;re currently
        <b className="text-danger">
          &nbsp;Over
        </b>
        &nbsp;your budget
      </div>
    );
  } else if (ratio < -0.10) {
    message = (
      <div>
        You&apos;re currently
        <b className="text-success">&nbsp;Under</b>
        &nbsp;your budget
      </div>
    );
  } else {
    message = (
      <div>
        You&apos;re
        <b className="text-success">&nbsp;On Track</b>
        &nbsp;to stay on budget
      </div>
    );
  }
  return message;
}

function BudgetProgressBar({ amount, total, ratio }) {
  let barColor;
  if (ratio > 0.10) {
    barColor = 'danger';
  } else {
    barColor = 'success';
  }
  return (
    <div>
      <ProgressBar variant={barColor} now={amount} max={total} />
    </div>
  );
}

BudgetProgressBar.propTypes = {
  amount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
};

export default BudgetAtAGlance;
