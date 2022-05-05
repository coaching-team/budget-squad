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
function CategoryRow({ category }) {
// check out memoization
  const numberOfTransactions = useSelector((state) => {
    const filteredTransactions = state.transactions.entities.filter(
      (transaction) => transaction.categoryId === category.id,
    );
    return filteredTransactions.length;
  });

  // The category
  // const categoryId = {
  //   id: '914d19bf-75b0-468c-801c-442a7e9e285b',
  // };

  // const amountSpent = useSelector((state) =>
  // state.categories.entities.filter((category) => categoryId === )

  // filter by
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {category.name}
          &nbsp; with &nbsp;
          {numberOfTransactions}
          &nbsp;transactions
        </div>
        <div className="col">$X out of $Y</div>
        <div className="col"><Button variant="outline-dark">Details</Button></div>
      </div>
      <div className="row">
        <ProgressBar variant="danger" now={80} />
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
