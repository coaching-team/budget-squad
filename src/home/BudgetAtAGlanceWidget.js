import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const amountSpent = 10;
const totalBudget = 100;

function SpentTracker() {
  return (
    <div>You&apos;re On Track to stay on budget</div>
  );
}

function BudgetProgressBar() {
  return (
    <div>
      <ProgressBar variant="success" now={amountSpent} max={totalBudget} />
    </div>
  );
}

function BudgetAtAGlance() {
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
          <BudgetProgressBar />
        </div>
        <SpentTracker />
      </p>
    </div>
  );
}

export default BudgetAtAGlance;
