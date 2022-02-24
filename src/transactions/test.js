import React from 'react';
import { PropTypes } from 'prop-types';
import TransactionRow from './TransactionRow';
// {
//     id: 'abf3abac-3d22-488d-b208-dc9b1e44008e',
//     date: new Date('2021-09-27 17:21:54'),
//     payee: 'Ullrich Group',
//     categoryId: 0,
//     notes: 'nullam varius nulla facilisi',
//     amount: -240.2,
//   }
function transactionFilter({ payee, categoryId }) {
  return (
    <div>
      Hello
      { payee }
      { categoryId }
    </div>
  );
}
TransactionRow.propTypes = {
  payee: PropTypes.string.isRequired,
  categoryId: PropTypes.number.isRequired,
};
// eslint-disable-next-line no-console
console.log(transactionFilter);

export default transactionFilter;
