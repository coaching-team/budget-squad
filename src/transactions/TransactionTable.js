import React from 'react';
import { PropTypes } from 'prop-types';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';
import TransactionRow from './TransactionRow';
import TransactionForm from './TransactionForm';
/**
 * Shows a table of transactions, a way to filter by types in the transaction, and
 * optionally a form for creating a transaction
 * @component
 * @example
 * const filters = {
 *   categoryId: 0,
 *   payee: "Ullrich Group",
 *   startDate: new Date("07-01-2021"),
 *   endDate: new Date("09-30-2021")
 * };
 * -or-
 * const filters = {
 *   categoryId: null,
 *   payee: undefined,
 * };
 * <TransactionTable
 *    isCreating
 *    onStopCreating={() => alert('finished')}
 *    filters={filters}/>
 */
function TransactionTable({ isCreating = false, onStopCreating, filters = {} }) {
  const transactionList = useSelector((state) => state.transactions.entities.filter(
    (t) => (t.categoryId === filters.categoryId
    || filters.categoryId === null
    || filters.categoryId === undefined)
    && (t.payee === filters.payee
    || filters.payee === null
    || filters.payee === undefined)
    && (t.date >= filters.startDate
    || filters.startDate === null
    || filters.startDate === undefined)
    && (t.date <= filters.endDate
    || filters.endDate === null
    || filters.endDate === undefined),
  ));

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
   * Props to filter transactions. Allows filtering by:
   * start date (inclusive),end date (inclusive), category, payee. Can include
   * variation of null, and undefined; to not filter by that property
   */
  filters: PropTypes.exact({
    categoryId: PropTypes.string,
    payee: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
  }),
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
  filters: {},
};

export default TransactionTable;
