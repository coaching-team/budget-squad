import React from 'react';
import { PropTypes } from 'prop-types';
import CategoryFilter from './CategoryFilter';

function TransactionFilters({ setFilter }) {
  const handleFilter = (newFilterData) => {
    setFilter(newFilterData);
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
  setFilter: PropTypes.func.isRequired,
};

export default TransactionFilters;
