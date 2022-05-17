import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addNewCategory } from './CategorySlice';
import {
  validate, required, alphanumericCharactersOnly, limitedCharacters, restrictedRange, notANumber,
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
  const [amount, setAmount] = useState('');

  const [errors, setErrors] = useState({ name: [], amount: [] });

  const handleAmountChange = (event) => {
    const amountInput = event.target.value;
    setAmount(amountInput * 1);
    setErrors((currentErrors) => ({ ...currentErrors, amount: validate(amountInput, 'Amount', [required, restrictedRange, notANumber]) }));
  };

  const handleNameChange = (event) => {
    const nameInput = event.target.value;
    setName(nameInput);
    setErrors((currentErrors) => ({ ...currentErrors, name: validate(nameInput, 'Name', [required, alphanumericCharactersOnly, limitedCharacters]) }));
  };

  // Creates a new category on form submission
  const handleCreateCategory = () => {
    validate(name, 'Name', [required, alphanumericCharactersOnly, limitedCharacters]);
    validate(amount, 'Amount', [required, restrictedRange, notANumber]);
    if ((errors.amount.length === 0) && (errors.name.length === 0)) {
      const newCategory = {
        name,
        amount,
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
              <input type="text" onChange={handleNameChange} className={(errors.name.length !== 0) ? 'form-control invalid' : 'form-control'} name="formName" id="formName" required />
              {errors && <div className="errors">{errors.name.map((message) => <div className="pt-1" key={uuid()}>{message}</div>)}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="formTarget" className="form-label">Amount</label>
              <input type="text" onChange={handleAmountChange} className={(errors.amount.length !== 0) ? 'form-control invalid' : 'form-control'} name="formTarget" id="formTarget" required />
              {errors && <div className="errors">{errors.amount.map((message) => <div className="pt-1" key={uuid()}>{message}</div>)}</div>}
            </div>
            <button type="button" disabled={(errors.name.length !== 0) || (errors.amount.length !== 0) || (!name) || (!amount)} className="btn btn-primary mt-4" onClick={handleCreateCategory}>Create</button>
          </form>
        </div>
      </div>
    </>
  );
}
