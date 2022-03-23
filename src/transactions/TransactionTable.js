import React from 'react';
import { PropTypes } from 'prop-types';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';
import TransactionRow from './TransactionRow';
import TransactionForm from './TransactionForm';
// import transactionFilter from './test';
/**
 * Shows a table of transactions and optionally a form for creating a transaction
 *
 * @component
 * @example
 * <TransactionTable isCreating onStopCreating={() => alert('finished')} />
 */

//added filters
function TransactionTable({ isCreating = false, onStopCreating, filters }) {

  // Get all the transactions to show in the table

  //original code
  // const transactionList = useSelector((state) => state.transactions.entities);

  // add a prop here for filters

  //keeping useSelector and state.transaction.entities
  const transactionList = useSelector((state) => state.entities.filter((t) => t.categoryId === filters.categoryId && t.payee === filters.payee))

  // JS
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Date</th>
          <th>Payee</th>
          <th>Category</th>
          <th>Notes</th>
          <th>Amount</th>
          <th aria-label="Actions" />
        </tr>
      </thead>
      <tbody>
        {(isCreating) ? <TransactionForm onStopCreating={onStopCreating} key={uuid()} /> : <tr />}
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
