import React, { useState } from 'react';
import TransactionTable from './TransactionTable';
import TransactionFilters from './TransactionFilters';


/**
 * Shows the list of transactions and allows the user to create transactions
 *
 * @component
 * @example
 * <TransactionPage />
 */
export default function TransactionPage() {
  // Local State - is a transaction currently being created, for passing to the TransactionTable
  const [isCreating, setisCreating] = useState(false);
  const [filter, setFilter] = useState("No filters applied");
  //need another useState hook to update state of filtering in response to receiving input from Transaction Filter
  //need function to handle sending these changes to TransactionTable 
  const handleStopCreating = () => {
    setisCreating(false);
  };

  // JSX
  return (
    <>
      <div className="row mb-5 mt-4">
        <div className="col">
          <h3 className="mt-1">Transactions</h3>
          <p>Category Id from transaction filters: {filter}</p>
          {/* not appearing */}
        </div>
        <div className="col text-end">
          <button className="btn btn-info" type="button" onClick={() => setisCreating(true)}>New Transaction</button>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <TransactionFilters filter={filter} setFilter={setFilter} />
          {/* not appearing */}
          <TransactionTable isCreating={isCreating} onStopCreating={handleStopCreating} />
        </div>
      </div>
    </>
  );
}
