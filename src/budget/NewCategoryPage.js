import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addNewCategory } from './CategorySlice';

/**
 * Shows a form that allows the user to create a new budgeting category
 *
 * @component
 * @example
 * <NewCategoryPage />
 */

export default function NewCategoryPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local State: in-progress form data
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');

  const handleCreateCategory = () => {
    const newCategory = {
      name,
      target,
    };
    dispatch(addNewCategory(newCategory));
    navigate('/budget');
  };

  const handleTargetChange = (event) => {
    const targetInput = parseInt(event.target.value, 10);
    setTarget(targetInput);
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <h1 className="mt-5 mb-4">New Category</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-10 col-md-8 col-lg-6 col-xl-4">
          <form>
            <div className="mb-3">
              <label htmlFor="formName" className="form-label">Name</label>
              <input type="text" onChange={(event) => setName(event.target.value)} className="form-control" name="formName" id="formName" />
            </div>
            <div className="mb-3">
              <label htmlFor="formTarget" className="form-label">Target</label>
              <input type="text" onChange={handleTargetChange} className="form-control" name="formTarget" id="formTarget" />
            </div>
            <button type="button" className="btn btn-primary mt-4" onClick={handleCreateCategory}>Create</button>
          </form>
        </div>
      </div>
    </>
  );
}
