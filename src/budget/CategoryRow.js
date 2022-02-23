import React from 'react';
import { PropTypes } from 'prop-types';

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
  return (
    <li className="list-group-item">{category.name}</li>
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
