import React from 'react';

const currentSpending = 10;
const totalBudget = 100;

function ProgressBar() {
  return (
    <div>Test</div>
  );
}

function SpentTracker() {
  return (
    <div>You&apos;re On Track to stay on budget</div>
  );
}

function BudgetAtAGlance() {
  return (
    <div>
      <h3>Budget at a Glance</h3>
      <p>
        $
        {currentSpending}
        &nbsp; of $
        {totalBudget}
        &nbsp;spent
      </p>
      <ProgressBar />
      <SpentTracker />
    </div>
  );
}

export default BudgetAtAGlance;
