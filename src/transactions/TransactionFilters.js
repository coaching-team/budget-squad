import React from 'react';
import { PropTypes } from 'prop-types';
import CategoryFilter from './CategoryFilter';

/**
 * Houses filtering components for filtering transactions
 *@component
 *
 */
function TransactionFilters({ setFilters }) {
  const handleFilter = (newFilterData) => {
    setFilters(newFilterData);
  };

  return (
    <div>
      <CategoryFilter
        handleFilter={handleFilter}
      />
    </div>
  );
}

TransactionFilters.propTypes = {
  /**
   * A function passed from TransactionPage that changes the filters state
   * of TransactionPage.
   */
  setFilters: PropTypes.func.isRequired,
};

export default TransactionFilters;
