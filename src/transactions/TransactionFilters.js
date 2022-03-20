import React from 'react';
import CategoryFilter from './CategoryFilter';


function TransactionFilters(props) {
  

  const handleFilter = (event) => {
    props.setFilter(event.target.value);

  };

  const clearFilter = () => {
    props.setFilter("No Filters Applied");
  };

    return (
      <div>
        <CategoryFilter
          //filter={props.filter} unnecessary, not being used
          handleFilter={handleFilter}
          clearFilter={clearFilter}
        />
      </div>
    );
}

export default TransactionFilters;