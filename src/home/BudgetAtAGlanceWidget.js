import React from 'react';
import { useSelector } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { INCOME_ID } from '../data';

/**
 * Shows how much spent compared to budget across all categories (except income) for current month.
 * Informs user if amount spent is "Under", "On Track", or "Over" budget by 10 percent.
 * Displays progress bar.
 *
 * @component
 */

// Sum transaction data and sum target budget across all categories
function BudgetAtAGlance({ testDate = new Date() }) {
  // UNCOMMENT WHEN READY TO COMMIT
  const date = (testDate);

  // const date - new Date("");
  /* eslint-disable no-console */
  console.log(`Test date is ${date}`);

  // UNCOMMENT WHEN READY TO COMMIT
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  /* eslint-disable no-console */
  console.log(`First day is ${firstDay}`);

  // This is used for testing purposes if no transactions for current month
  // Remove after testing
  // const firstDay = new Date('2022-06-01');

  // Actual code to use once testing is completed
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  /* eslint-disable no-console */
  console.log(`Last Day is ${lastDay}`);

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
        (transaction) => transaction.categoryId !== INCOME_ID,
      );

      const totalTransactions = filteredTransactions.reduce(
        (total, transaction) => total + transaction.amount,
        0,
      ).toFixed(2);
      // Remove after testing -- do not delete return line
      /* eslint-disable no-console */
      console.log(`Total transactions are ${totalTransactions}`);
      return parseFloat(totalTransactions);
    },
  );

  // Remove after testing
  /* eslint-disable no-console */
  console.log(`Amount spent is ${amountSpent}`);

  // Gets categories data, excludes income category, sums target values
  const totalBudget = useSelector(
    (state) => {
      // // Get categories array
      // const allCategories = state.categories.entities.map(
      //   (t) => t.target,
      // );
      // // Get target property values and put into a new array
      // const targetCategories = allCategories.filter(
      //   (c) => c.id !== INCOME_ID,
      // );
      // /* eslint-disable no-console */
      // console.log(targetCategories);
      // return targetCategories;
      const allCategories = state.categories.entities;
      const currCategories = allCategories.filter(
        (category) => category.id !== INCOME_ID,
      );
      const totalCategories = currCategories.reduce(
        (total, category) => total + category.target,
        0,
      );
      /* eslint-disable no-console */
      console.log(`Total categories are ${totalCategories}`);
      /* eslint-disable no-console */
      console.log(typeof totalCategories);
      return parseFloat(totalCategories);
    },
  );

  // Gets budget percentage to calculate status
  const spentToBudget = parseFloat(Math.abs(amountSpent) / totalBudget);
  // Remove after testing
  /* eslint-disable no-console */
  console.log(spentToBudget);

  // Gets month percentage to calculate status
  const currDay = date.getDate();
  const endDay = lastDay.getDate();
  const monthPercentage = parseFloat(currDay / endDay);
  // Remove after testing
  /* eslint-disable no-console */
  console.log(monthPercentage);

  // TRIAL #1 Moved from Budget Status
  let status = '';
  if (amountSpent >= 0 && spentToBudget < monthPercentage * 0.90) {
    status = 'Under';
  } else if (amountSpent >= 0 && spentToBudget > monthPercentage * 1.10) {
    status = 'On Track';
  } else {
    if (spentToBudget >= (monthPercentage * 1.10)) {
      status = 'Over';
    } else if (spentToBudget <= (monthPercentage * 0.90)) {
      status = 'Under';
    } else {
      status = 'On Track';
    }
  }

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
              <BudgetStatus
                // amount={amountSpent}
                // ratio={spentToBudget}
                // total={totalBudget}
                // monthPercent={monthPercentage}
                status={status}
              />
              <BudgetProgressBar
                amount={amountSpent}
                total={totalBudget}
                ratio={spentToBudget}
                monthPercent={monthPercentage}
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

// Added amount < 0 to condition to ensure BudgetStatus tracking negative transactions
function BudgetStatus({ status }) {
  // const fontStyling = (amount < 0 && ratio >= 0.10) ? 'text-danger' : 'text-success';

  // const endText = ((ratio >= -0.10 || ratio === 0) && ratio <= 0.10) ?
  // 'to stay within budget' : 'your budget';

  // let status = '';

  // if (amount < 0 && ratio >= 0.10) {
  //   status = 'Over';
  // } else if (amount < 0 && ratio <= -0.10) {
  //   status = 'Under';
  // } else {
  //   status = 'On Track';
  // }

  // if (amount < 0 && ratio <= -0.10) {
  //   status = 'Over';
  // } else if (amount < 0 && ratio >= -0.10) {
  //   status = 'Over';
  // } else {
  //   status = 'On Track';
  // }

  // if (amount < 0 && ratio >= (monthPercent * 1.10)) {
  //   status = 'Over';
  // } else if (amount < 0 && ratio <= monthPercent * 0.90) {
  //   status = 'Under';
  // } else {
  //   status = 'On Track';
  // }

  // is amount >=0 if so nothing has been spent or have extra budget
  // TRIAL #1 MOVE THIS TO BUDGET AT A GLANCE COMPONENT
  // if (amount >= 0) {
  //   status = 'On Track';
  // }
  // if ((Math.abs(amount) > total) && ratio >= (monthPercent * 1.10)) {
  //   status = 'Over';
  // } else if ((Math.abs(amount) < total) && ratio <= (monthPercent * 0.90)) {
  //   status = 'Under';
  // } else {
  //   status = 'On Track';
  // }

  const fontStyling = (status === 'On Track' || status === 'Under') ? 'text-success' : 'text-danger';

  // For testing purposes only
  // TRIAL # 1 Moved to Budget At A Glance Component
  // const checkTest = (ratio >= (monthPercent * 1.10));
  // /* eslint-disable no-console */
  // console.log(checkTest);
  // /* eslint-disable no-console */
  // console.log(`Ratio is ${ratio}`);
  // /* eslint-disable no-console */
  // console.log(`Month percent is ${monthPercent * 1.10}`);

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
  // TRIAL # 1
  // const barLength = (amount >= 0) ? 0 : Math.abs(amount);
  // const barColor = (amount >= 0 || (Math.abs(amount) < total && ratio <= monthPercent * 0.90))
  // ? 'success' : 'danger';
  const barColor = (status === 'On Track' || status === 'Under') ? 'success' : 'danger';

  if (amount >= 0) {
    barLength = 0;
    barMax = amount + total;
  } else {
    barLength = Math.abs(amount);
    barMax = total;
  }

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
  /**
   * Sum of transactions (except income)
   */
  // amount: PropTypes.number.isRequired,
  /**
   * Difference of amount spent and total budget over togal budget
   */
  // total: PropTypes.number.isRequired,
  /**
   * Difference of amount spent and total budget over togal budget
   */
  // ratio: PropTypes.number.isRequired,
  /**
   * Ratio of current day over total number of days in current month
   */
  // monthPercent: PropTypes.number.isRequired,
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
  /**
   * Difference of amount spent and total budget over total budget
   */
  // ratio: PropTypes.number.isRequired,
  /**
   * Ratio of current day over total number of days in current month
   */
  // monthPercent: PropTypes.number.isRequired,
};

export default BudgetAtAGlance;
