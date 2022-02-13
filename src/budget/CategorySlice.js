import { createSlice } from '@reduxjs/toolkit';
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
      const category = state.categories.entities.find((c) => c.id === action.payload.id);
      category.name = action.payload.name;
      category.amount = action.payload.amount;
    },
  },
});

export const { updateCategory } = categorySlice.actions;
export default categorySlice.reducer;
