import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductData } from '../database/db';

export interface ProductState {
  currentProduct: Product | null;
  cart: Record<string, ProductData>
}

const initialState: ProductState = {
  currentProduct: null,
  cart: {},
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setCurrentProduct: (state, action: PayloadAction<Product>) => {
      state.currentProduct = action.payload;
    },
    addProductToCart: (state, action: PayloadAction<Product>) => {
      state.cart[action.payload.id] = action.payload.data;
    },
    removeProductFromCart: (state, action: PayloadAction<string>) => {
      delete state.cart[action.payload]
    }
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentProduct, addProductToCart, removeProductFromCart } = productSlice.actions;
export default productSlice.reducer;
