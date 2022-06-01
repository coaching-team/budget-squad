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
// * put text closer to progress bar
// have progress of progress bar start at full left
//   (?import 'bootstrap/dist/css/bootstrap.min.css';?)
// send data in details link
// ?what happens on the details page?
// ?how should I be getting the time period?
// edge cases:
// underspent (return): $0 out of $50 (crossed out) $90 with empty bar
// overspent: $120 out of $100 with full bar

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

  let barColor = '';
  let message = '';

  if (varianceToPercentage < 0) {
    // message = '$0 spent out of',
    // <strike>category.target</strike>,
    // (category.target + amountSpent);
    message = 'negative balance';
  } else if (varianceToPercentage <= 50 && varianceToPercentage >= 0) {
    // message = amountSpent, ' spent out of ', category.target;
    message = 'below 50%';
    barColor = 'success';
  } else if (varianceToPercentage > 50 && varianceToPercentage <= 75) {
    // message = amountSpent, ' spent out of ', category.target;
    message = 'below 75%';
    barColor = 'warning';
  } else if (varianceToPercentage > 75) {
    // message = amountSpent, ' spent out of ', category.target;
    message = 'over 75%';
    barColor = 'danger';
  } else if (varianceToPercentage > 100) {
    // message = amountSpent, ' spent out of ', category.target;
    message = 'overspent!';
    barColor = 'danger'; // add stripe
  }
  console.log(barColor);

  return (
    <div className="container border border-primary">
      <div className="row border">
        <div className="col px-2 border fw-bold">
          {category.name}
        </div>
        <div className="col col-6 px-2 border text-muted fs-6">
          {message}
        </div>
        <div className="col px-2 border"><Button variant="outline-dark" size="sm" className="float-end">Details</Button></div>
      </div>
      <div className="row px-2">
        <div className="col px-0">
          {varianceToPercentage > 100 ? (
            <ProgressBar
              striped
              now={varianceToPercentage}
              variant={barColor}
            />
          )
            : (
              <ProgressBar
                now={varianceToPercentage}
                variant={barColor}
              />
            )}
        </div>
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
