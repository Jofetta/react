import { createSlice } from '@reduxjs/toolkit';
import { Pokemon } from '../types/types';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SelectedItemsState {
  items: Pokemon[];
}

const initialState: SelectedItemsState = {
  items: [],
};

export const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    setItem: (state, action: PayloadAction<Pokemon>) => {
      const itemIndex = state.items.findIndex(
        (item) => item.name === action.payload.name
      );

      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);
      } else {
        state.items.push(action.payload);
      }
    },
    clearItems: (state) => {
      state.items = [];
    },
  },
});

export const { setItem, clearItems } = selectedItemsSlice.actions;

export default selectedItemsSlice.reducer;
