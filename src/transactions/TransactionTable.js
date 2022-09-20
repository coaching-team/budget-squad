import React, { useState } from 'react';
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
 * .sort() will sort through with each category button.
 * You can filter first with the drop down menu then sort
 * or sort without filtering first.
 * Category id had to be pulled from the CATEGORIES first,
 * then translated to TRANSACTIONS
 */
function TransactionTable({ isCreating = false, onStopCreating, filters = {} }) {
  const [direction, setdirection] = useState(-1);
  const [sortProperty, setSortProperty] = useState();

  const onButtonClickProperty = (payee, date, category, notes, amount) => {
    setSortProperty(payee, date, category, notes, amount);
    setdirection(-1 * direction);
  };

  const transactionList = useSelector(
    (state) => state.transactions.entities.filter(
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
    ).sort(
      (a, b) => {
        let x;
        let y;
        if (sortProperty === 'payee') {
          x = a.payee.toLowerCase();
          y = b.payee.toLowerCase();
        } else if (sortProperty === 'date') {
          x = a.date;
          y = b.date;
        } else if (sortProperty === 'category') {
          x = state.categories.entities.find(
            (category) => category.id === a.categoryId,
          ).name;
          y = state.categories.entities.find(
            (category) => category.id === b.categoryId,
          ).name;
        } else if (sortProperty === 'notes') {
          x = a.notes;
          y = b.notes;
        } else if (sortProperty === 'amount') {
          x = a.amount;
          y = b.amount;
        }
        if (x < y) {
          return -1 * direction;
        }
        if (x > y) {
          return 1 * direction;
        }
        return 0;
      },
    ),
  );
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>
            <button
              type="button"
              className="date"
              onClick={() => onButtonClickProperty('date')}
            >
              Date
            </button>
          </th>
          <th>
            <button
              type="button"
              className="payee"
              onClick={() => onButtonClickProperty('payee')}
            >
              Payee
            </button>
          </th>
          <th>
            <button
              type="button"
              className="category"
              onClick={() => onButtonClickProperty('category')}
            >
              Category
            </button>
          </th>
          <th>
            <button
              type="button"
              className="notes"
              onClick={() => onButtonClickProperty('notes')}
            >
              Notes
            </button>
          </th>
          <th>
            <button
              type="button"
              className="amount"
              onClick={() => onButtonClickProperty('amount')}
            >
              Amount
            </button>
          </th>
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
