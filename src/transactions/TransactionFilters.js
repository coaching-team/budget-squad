import React from 'react';
import { PropTypes } from 'prop-types';
import CategoryFilter from './CategoryFilter';

/**
 * Houses filtering components for filtering transactions
 *@component
 *
 */
function TransactionFilters({ filters, setFilters }) {
  const handleFilter = (newFilterData) => {
    setFilters(newFilterData);
  };

  return (
    <div>
      <CategoryFilter
        categoryId={filters.categoryId}
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
  filters: PropTypes.string.isRequired,
};

export default TransactionFilters;
