import React from 'react';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';

/**
 * Shows the category title, a progress bar, how much was spent out of the limit
 * and a button to view more details
 * expects to go in a thing with a variable of whatever
 *
 * @component
 * @example
 *
 * PUT AN EXAMPLE HERE
 */

// Need to do:
// formatting:
// * category title bigger
// * put text closer to progress bar
// * smaller details button
// have progress of progress bar start at full left
// send data in details link
// ?what happens on the details page?
// ?how should I be getting the period?
// edge cases: actual negative balance, over budget

function CategoryRow({ category }) {
  const startDate = new Date('06-01-2021');
  const endDate = new Date('06-30-2021');
  // check out memoization
  const amountSpent = useSelector((state) => state.transactions.entities.filter(
    (transaction) => transaction.categoryId === category.id
      && transaction.date >= startDate && transaction.date <= endDate,
  ).reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0).toFixed(2)) * -1;

  const varianceToPercentage = (amountSpent / category.target) * 100;
  console.log(varianceToPercentage);

  let barColor = 0;

  if (varianceToPercentage <= 50) {
    barColor = 'success';
  } else if (varianceToPercentage > 50 && varianceToPercentage <= 75) {
    barColor = 'warning';
  } else if (varianceToPercentage > 75) {
    barColor = 'danger';
  }
  console.log(barColor);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {category.name}
        </div>
        <div className="col">
          &#36;
          {amountSpent}
          &nbsp;out of
          &#36;
          {category.target}
        </div>
        <div className="col"><Button variant="outline-dark">Details</Button></div>
      </div>
      <div className="row">
        <ProgressBar variant={barColor} now={varianceToPercentage} />
      </div>
    </div>
  );
}

CategoryRow.propTypes = {
  /**
   * the category will display the category name and target
   */
  category: PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    target: PropTypes.number.isRequired,
  }).isRequired,
};

export default CategoryRow;
