import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from './TransactionSlice';

/**
 * Shows a form for creating a transaction and Cancel and Save buttons
 *
 * @component
 * @example
 * <TransactionForm onStopCreating={() => alert('finished')} />
 */
function TransactionForm({ onStopCreating }) {
  // Redux
  const dispatch = useDispatch();
  // Get all the categories for the select dropdown
  const categoryList = useSelector((state) => state.categories.entities);

  // Default category
  const firstCategoryId = categoryList[0].id;

  // Initial form data
  const initialFormData = {
    date: new Date().toISOString().substring(0, 10),
    payee: '',
    categoryId: firstCategoryId,
    notes: '',
    amount: 0,
  };

  // Local State: in-progress form data
  const [formData, setFormData] = useState(initialFormData);
  const handleFormDataChange = (event) => setFormData(
    { ...formData, [event.target.name]: event.target.value },
  );

  // Event Handler: saving
  const handleSave = () => {
    const transaction = {
      ...formData,
      date: new Date(formData.date),
      categoryId: parseInt(formData.categoryId, 10),
      amount: parseInt(formData.amount, 10),
    };
    // eslint-disable-next-line no-console
    console.log(formData.date);
    dispatch(addTransaction(transaction));
    onStopCreating();
  };

  // Event Handler: canceling
  const handleCancel = () => {
    setFormData(initialFormData);
    onStopCreating();
  };

  // JSX
  return (
    <tr>
      <td>
        <input type="date" onChange={handleFormDataChange} name="date" value={formData.date} />
      </td>
      <td>
        <input type="text" onChange={handleFormDataChange} name="payee" value={formData.payee} />
      </td>
      <td>
        <select onChange={handleFormDataChange} name="categoryId" value={formData.categoryId}>
          {categoryList.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </td>
      <td>
        <input type="text" onChange={handleFormDataChange} name="notes" value={formData.notes} />
      </td>
      <td>
        <input type="number" onChange={handleFormDataChange} name="amount" value={formData.amount} />
      </td>
      <td className="text-end">
        <button type="button" className="btn btn-sm btn-warning me-2" onClick={handleCancel}>Cancel</button>
        <button type="button" className="btn btn-sm btn-success" onClick={handleSave}>Save</button>
      </td>
    </tr>
  );
}

TransactionForm.propTypes = {
  /**
   * A function to call when creating is finished
   */
  onStopCreating: PropTypes.func.isRequired,
};

export default TransactionForm;
