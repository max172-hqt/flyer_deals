import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../database/db';

export interface ProductState {
  currentProduct: Product | null;
}

const initialState: ProductState = {
  currentProduct: null,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setCurrentProduct: (state, action: PayloadAction<Product>) => {
      state.currentProduct = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
