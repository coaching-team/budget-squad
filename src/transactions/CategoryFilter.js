import React from 'react';
import { PropTypes } from 'prop-types';
import { CATEGORIES } from '../data';

function CategoryFilter({ handleFilter }) {
  function onSelectChanged(event) {
    const { value } = event.target;

    handleFilter({ categoryId: value });
  }

  function onClear() {
    handleFilter({ categoryId: null });
  }

  return (
    <div className="row">
      <div className="col col-3 mr-2">
        <select className="form-select" name="categoryFilter" onChange={onSelectChanged}>
          <option>Filter by Category</option>
          {CATEGORIES.map((category) => (
            <option key={category.id} value={category.id} name={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="col col-3">
        <button className="btn btn-outline-secondary" type="submit" onClick={onClear}>Clear Filter</button>
      </div>
    </div>
  );
}

CategoryFilter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
};

export default CategoryFilter;
