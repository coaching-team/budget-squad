import React from 'react';
import { CATEGORIES } from '../data';

function CategoryFilter(props) {

  return (
    <div>
      <select name="categoryFilter" onChange={props.handleFilter}>
        <option>Filter by Category</option>
        {CATEGORIES.map((category) => (
          <option key={category.id} value={category.id} name={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <button onClick={props.clearFilter}>Clear Filter</button>
    </div>
  );
}

export default CategoryFilter;
