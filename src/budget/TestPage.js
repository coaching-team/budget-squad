import React from 'react';
import CategoryRow from './CategoryRow';

export default function TestPage() {
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
  return (
    <ul className="list-group">
      <CategoryRow category={cat1} />
      <CategoryRow category={cat2} />
      <CategoryRow category={cat3} />
    </ul>
  );
}
