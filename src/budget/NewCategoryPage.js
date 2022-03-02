import React from 'react';

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className="new-category-title">New Category</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="formName" className="form-label">Name</label>
          <input type="text" className="form-control" name="formName" id="formName" />
        </div>
        <div className="mb-3">
          <label htmlFor="formTarget" className="form-label">Target</label>
          <input type="text" className="form-control" name="formTarget" id="formTarget" />
        </div>
        <button type="submit" className="btn btn-primary mt-4">Create</button>
      </form>
    </div>
  );
}
