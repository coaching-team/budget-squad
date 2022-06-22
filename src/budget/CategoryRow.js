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
// send data in details link
//  ?what happens on the details page?
//   <Route path="budget/:categoryId" element={<CategoryDetailsPage />} />
// ?how should I be getting the time period?
//   Hard code for now until there's a means to get the desired period.
// test edge cases
// edge cases:
// underspent (return): $0 out of $50 (crossed out) $90 with empty bar
// overspent: $120 out of $100 with full bar

function CategoryRow({ category }) {
  const startDate = new Date('06-01-2021');
  const endDate = new Date('06-30-2021');

  const amountSpent = useSelector((state) => state.transactions.entities.filter(
    (transaction) => transaction.categoryId === category.id
      && transaction.date >= startDate && transaction.date <= endDate,
  ).reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0).toFixed(2)) * -1;

  const varianceToPercentage = (amountSpent / category.target) * 100;

  // const target = props => ...category.target;

  let barColor = '';
  let message = (
    <span>
      $
      {amountSpent.toFixed(2)}
      &nbsp;spent out of&nbsp;
      $
      {category.target.toFixed(2)}
    </span>
  );

  if (varianceToPercentage < 0) {
    message = (
      <span>
        $0 spent out of
        <strike>
          $
          {category.target.toFixed(2)}
        </strike>
        $
        (
        {category.target.toFixed(2)}
        +
        {amountSpent.toFixed(2)}
        )
      </span>
    );
  } else if (varianceToPercentage <= 50 && varianceToPercentage >= 0) {
    barColor = 'success';
  } else if (varianceToPercentage > 50 && varianceToPercentage <= 75) {
    barColor = 'warning';
  } else if (varianceToPercentage > 75) {
    barColor = 'danger';
  } else if (varianceToPercentage > 100) {
    message = (
      <span>
        $
        {amountSpent.toFixed(2)}
        &nbsp;spent out of&nbsp;
        $
        {category.target.toFixed(2)}
      </span>
    );
    barColor = 'danger'; // add stripe
  }

  return (
    <div className="col mb-2 px-2 py-2 border border-info rounded">
      <div className="row px-2">
        <div className="col-3 px-2 fw-bold">
          {category.name}
        </div>
        <div className="col-7 px-2 pt-1 text-end text-muted fs-6">
          {message}
        </div>
        <div className="col-2 px-2"><Button variant="outline-secondary" size="sm" className="float-end" path="budget/:categoryId" category={category}>Details</Button></div>
      </div>
      <div className="row px-1 py-2">
        <div className="col">
          <ProgressBar
            {varianceToPercentage > 100 ? 'striped' : ''}
            now={varianceToPercentage}
            variant={barColor}
          />
          {/* {varianceToPercentage > 100 ? (
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
            )} */}
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
