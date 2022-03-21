import React from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTransaction } from './TransactionSlice';
import { categoryByIdSelector } from '../budget/CategorySlice';
import { formatDate, formatMoney } from '../utilities';

/**
 * Shows a table row for a transaction, with buttons to Edit or Delete
 *
 * @component
 * @example
 * const transaction = {
 *   id: '5ba8ab31-3bd0-4eb7-841c-94c3003574a4',
 *   date: new Date('2021-09-27'),
 *   payee: 'Subway'
 *   categoryId: 3,
 *   notes: 'sandwich'
 *   amount: 30,
 * }
 * <TransactionRow transaction={transaction} />
 */
function TransactionRow({ transaction }) {
  // Reudx
  const dispatch = useDispatch();
  // Get the category for this transaction so the name of the category can be displayed
  const category = useSelector(categoryByIdSelector(transaction.categoryId));

  // Event Handler: deleting
  const onDeleteClicked = () => {
    dispatch(deleteTransaction(transaction.id));
  };

  // JSX
  return (
    <tr>
      <td>{formatDate(transaction.date)}</td>
      <td>{transaction.payee}</td>
      <td>{category.name}</td>
      <td>{transaction.notes}</td>
      <td>{formatMoney(transaction.amount)}</td>
      <td className="text-end">
        <button type="button" className="btn btn-sm btn-secondary me-2">Edit</button>
        <button type="button" className="btn btn-sm btn-warning" onClick={onDeleteClicked}>Delete</button>
      </td>
    </tr>
  );
}

TransactionRow.propTypes = {
  /**
   * The transaction to display
   */
  transaction: PropTypes.exact({
    id: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
    payee: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
};

export default TransactionRow;
