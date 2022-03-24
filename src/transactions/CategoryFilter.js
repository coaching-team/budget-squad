import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';

/**
 * Displays a select dropdown of categories as options to filter by and
 * a clear button to reset the dropdown.
 *
 * @component
 */
function CategoryFilter({ handleFilter }) {
  const [selected, setSelected] = useState({ selected: 'Filter by Category' });
  const onSelectChanged = ({ target: { value } }) => {
    handleFilter({ categoryId: value });
    setSelected({ selected: value });
  };

  const onClear = () => {
    handleFilter({ categoryId: null });
    setSelected({ selected: 'Filter by Category' });
  };

  const categoryList = useSelector((state) => state.categories.entities);

  return (
    <div className="row">
      <div className="col col-3 mr-2">
        <select className="form-select" value={selected.selected} name="categoryFilter" onChange={onSelectChanged}>
          <option value="Filter by Category">Filter by Category</option>
          {categoryList.map((category) => (
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
  /**
   * A function to call when a category has been selected from the
   * dropdown of category options to filter by.
   */
  handleFilter: PropTypes.func.isRequired,
};

export default CategoryFilter;
