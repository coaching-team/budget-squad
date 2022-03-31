import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { CATEGORIES } from '../data';

// Select a category by id
export const categoryByIdSelector = (id) => (state) => state.categories.entities.find(
  (category) => category.id === id,
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    entities: CATEGORIES,
  },
  reducers: {
    updateCategory: (state, action) => {
      const category = state.entities.find((c) => c.id === action.payload.id);
      category.name = action.payload.name;
      category.amount = action.payload.amount;
    },
    addNewCategory: (state, action) => {
      const newCategory = { ...action.payload, id: uuid() };
      state.entities.push(newCategory);
    },
  },
});

export const { updateCategory, addNewCategory } = categorySlice.actions;
export default categorySlice.reducer;
