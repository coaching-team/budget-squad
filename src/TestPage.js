import React from 'react';
import { useDispatch } from 'react-redux';
import CategoryRow from './budget/CategoryRow';
import { addTransaction } from './transactions/TransactionSlice';

export default function TestPage() {
  const dispatch = useDispatch();
  const cat1 = {
    id: 1,
    name: 'Rent',
    target: 1500,
  };
  const cat2 = {
    id: 2,
    name: 'Groceries',
    target: 400,
  };
  const cat3 = {
    id: 3,
    name: 'Gas',
    target: 150,
  };
  // const cat1Actual = 1500;
  // const cat2Actual = 375.92;
  // const cat3Actual = 175.22;

  const addACategory1Transaction = () => {
    const transaction = {
      categoryId: 1,
    };
    dispatch(addTransaction(transaction));
  };

  // const calculatePercentSpent = () => {
  //   const percentSpent = 15;
  // };

  return (
    <div>
      Testing
      <button type="button" onClick={addACategory1Transaction}>Add a category 1 transaction</button>
      <p> </p>
      <CategoryRow category={cat1} />
      <CategoryRow category={cat2} />
      <CategoryRow category={cat3} />
    </div>
  );
}
