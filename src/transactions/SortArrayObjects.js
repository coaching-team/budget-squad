import React, { useState, useEffect } from 'react';
// import './App.css';

// attempted to translate sortArray2.js into the code in budget; have not attempted run
const transactions = [
  {
    id: 'abf3abac-3d22-488d-b208-dc9b1e44008e',
    date: new Date('2021-09-27 17:21:54'),
    payee: 'Ullrich Group',
    categoryId: 0,
    notes: 'nullam varius nulla facilisi',
    amount: -240.2,
  }, {
    id: '3b2e29b6-d911-4c8b-8e4e-5808f7559418',
    date: new Date('2021-03-24 13:34:07'),
    payee: 'Tromp, Howell and Grant',
    categoryId: 4,
    notes: 'nulla neque libero convallis',
    amount: -297.8,
  }, {
    id: '0249ab94-b9b2-4890-9fff-09408a9a18d8',
    date: new Date('2021-04-22 20:17:23'),
    payee: 'Macejkovic, Sipes and Swift',
    categoryId: 0,
    notes: 'quam sollicitudin vitae consectetuer eget',
    amount: -147.97,
  }, {
    id: '5ab89d1b-6199-4e3a-bc40-047788dad4cb',
    date: new Date('2021-05-13 21:39:55'),
    payee: 'Bergnaum-Pouros',
    categoryId: 0,
    notes: '',
    amount: -295.46,
  },
];

function SortByData() {
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState('categoryId');

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        id: 'id',
        date: 'date',
        payee: 'payee',
        categoryId: 'categoryId',
        notes: 'notes',
        amount: 'amount',
      };
      const sortProperty = types[type];
      const sorted = [...transactions].sort((a, b) => b[sortProperty] - a[sortProperty]);
      setData(sorted);
    };
    sortArray(sortType);
  }, [sortType]);

  return (
    <div className="App">
      <select onChange={(e) => setSortType(e.target.value)}>
        <option value="Date">Date</option>
        <option value="Payee">Payee</option>
        <option value="CategoryId">Category Id</option>
      </select>

      {data.map((transaction) => (
        <div key={transaction.id} style={{ margin: '30px' }}>
          <div>{`Date: ${transaction.date}`}</div>
          <div>{`Payee: ${transaction.payee}`}</div>
          <div>{`CategoryId: ${transaction.categoryId}`}</div>
          <div>{`Notes: ${transaction.notes}`}</div>
          <div>{`Amount: ${transaction.amount}`}</div>
        </div>
      ))}
    </div>
  );
}

export default SortByData;

// https://github.com/KaterinaLupacheva/react-sorting-with-dropdown/blob/master/src/App.js
