import React from 'react';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';

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

  // filter by
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {category.name}
          &nbsp; with &nbsp;
          {numberOfTransactions}
        </div>
        <div className="col">button</div>
      </div>
      <div className="row progress">
        <div className="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" />
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
