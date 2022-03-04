import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const amountSpent = 734;
const totalBudget = 3500;
const spentBudgetRatio = (amountSpent - totalBudget) / totalBudget;

function SpentTracker(ratio) {
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

function BudgetProgressBar() {
  let barColor;
  if (spentBudgetRatio > 0.10) {
    barColor = 'danger';
  } else {
    barColor = 'success';
  }
  return (
    <>
      <div>
        <ProgressBar variant={barColor} now={amountSpent} max={totalBudget} />
      </div>
      <div className="my-3">
        {SpentTracker(spentBudgetRatio)}
      </div>
    </>
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
      </p>
    </div>
  );
}

export default BudgetAtAGlance;
