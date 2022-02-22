import React from 'react';
import { PropTypes } from 'prop-types';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';
import TransactionRow from './TransactionRow';
import TransactionForm from './TransactionForm';
import SortByData from './SortArrayObjects';
// import CategoryDetailsPage from '../budget/CategoryDetailsPage';
// import { categoryByIdSelector } from '../budget/CategorySlice';

// import CategorySlice, { categoryByIdSelector } from '../budget/CategorySlice';
/**
 * Shows a table of transactions and optionally a form for creating a transaction
 *
 * @component
 * @example
 * <TransactionTable isCreating onStopCreating={() => alert('finished')} />
 */
function TransactionTable({ isCreating = false, onStopCreating }) {
  // Get all the transactions to show in the table
  const transactionList = useSelector((state) => state.transactions.entities);
  // const sortById = categoryByIdSelector((state) => state.transactions.entities);
  // const sortById = ((state) => state.transactions.entities);
  // const sortById = useSelector((state) => state.transactionReducer.entities);
  // const sortById = useSelector((state) => state.transactions.entities.categoryId);

  // attempted to make a simple array to console log; nope
  // const array2 = ['0', '91', '32', '43', '84', '95'];
  // function sortById() {
  //   sortById.sort(array2);
  //   console.log(sortById);
  // }

  // JSX
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Date</th>
          <th>Payee</th>
          <div>
            {/* added selectBox to attempt to sort category  */}
            {/* then tried about 100 different ways to sort */}
            <select id="selectBox" onChange={() => SortByData()}>
              {/* must be easier way.instead of Watching tutorials */}
              {/* i banged by head against a wallhopin i could get this */}
              <option>Select</option>
              <option value="0">Income</option>
              <option value="1">Rent</option>
              <option value="2">Groceries</option>
              <option value="3">Gas</option>
              <option value="4">Shopping</option>
              <option value="5">Eating Out</option>
            </select>
          </div>
          <th searchBox="">Notes</th>
          <th sortBy="">Amount</th>
          <div>
            {/* attempted to console log to see if any sort filters i made were working; nope */}
            <button type="button" onClick={() => SortByData()}>console log</button>
          </div>
          <th aria-label="Actions" />
        </tr>
      </thead>
      <tbody>
        {(isCreating) ? <TransactionForm onStopCreating={onStopCreating} key={uuid()} /> : null}
        {transactionList.map(
          (transaction) => <TransactionRow transaction={transaction} key={transaction.id} />,
        )}
      </tbody>
    </table>
  );
}

TransactionTable.propTypes = {
  /**
   * Is a transaction currently being created - shows the creating form
   */
  isCreating: PropTypes.bool,
  /**
   * A function to call when creating is finished
   */
  onStopCreating: PropTypes.func.isRequired,
};

TransactionTable.defaultProps = {
  isCreating: false,
};

export default TransactionTable;
