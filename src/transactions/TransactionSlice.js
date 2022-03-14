import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { TRANSACTIONS } from '../data';

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    entities: TRANSACTIONS,
    loading: false,
  },
  reducers: {
    addTransaction: (state, action) => {
      const transaction = { ...action.payload, id: uuid() };
      state.entities.push(transaction);
    },
    deleteTransaction: (state, action) => {
      const indexToRemove = state.entities.findIndex((t) => t.id === action.payload);
      state.entities.splice(indexToRemove, 1);
    },
  },
});

export const {
  addTransaction,
  deleteTransaction,
  deleteAllTransactions,
} = transactionSlice.actions;
export default transactionSlice.reducer;
