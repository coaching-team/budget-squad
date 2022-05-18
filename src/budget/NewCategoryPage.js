import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addNewCategory } from './CategorySlice';
import {
  validate, required, certainCharactersOnly, max50Characters, restrictedRange, isNumber,
} from './FormValidation';

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

  const [errors, setErrors] = useState({ name: [], target: [] });

  const handleTargetChange = (event) => {
    const targetInput = event.target.value;
    setTarget(targetInput * 1);
    setErrors((currentErrors) => ({ ...currentErrors, target: validate(targetInput, 'Target', [required, restrictedRange, isNumber]) }));
  };

  const handleNameChange = (event) => {
    const nameInput = event.target.value;
    setName(nameInput);
    setErrors((currentErrors) => ({ ...currentErrors, name: validate(nameInput, 'Name', [required, certainCharactersOnly, max50Characters]) }));
  };

  // Creates a new category on form submission
  const handleCreateCategory = () => {
    const nameErrors = validate(name, 'Name', [required, certainCharactersOnly, max50Characters]);
    const targetErrors = validate(target, 'Target', [required, restrictedRange, isNumber]);
    setErrors((currentErrors) => ({ ...currentErrors, name: nameErrors }));
    setErrors((currentErrors) => ({ ...currentErrors, target: targetErrors }));
    if ((nameErrors.length === 0) && (targetErrors.length === 0)) {
      const newCategory = {
        name,
        target,
      };
      dispatch(addNewCategory(newCategory));
      navigate('/budget');
    }
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
              <input
                type="text"
                onChange={handleNameChange}
                className={(errors.name.length !== 0) ? 'form-control border-danger' : 'form-control'}
                name="formName"
                id="formName"
                required
              />
              {errors && <div className="text-danger">{errors.name.map((message) => <div className="pt-1" key={message}>{message}</div>)}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="formTarget" className="form-label">Target</label>
              <input
                type="text"
                onChange={handleTargetChange}
                className={(errors.target.length !== 0) ? 'form-control border-danger' : 'form-control'}
                name="formTarget"
                id="formTarget"
                required
              />
              {errors && <div className="text-danger">{errors.target.map((message) => <div className="pt-1" key={message}>{message}</div>)}</div>}
            </div>
            <button
              type="button"
              disabled={
                (errors.name.length !== 0) || (errors.target.length !== 0) || (!name) || (!target)
              }
              className="btn btn-primary mt-4"
              onClick={handleCreateCategory}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
