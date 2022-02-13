import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from '../transactions/TransactionSlice';
import categoryReducer from '../budget/CategorySlice';

export default configureStore({
  reducer: {
    transactions: transactionReducer,
    categories: categoryReducer,
  },
});
