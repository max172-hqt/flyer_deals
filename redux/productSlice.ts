import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../types';

export interface ProductState {
  currentProduct: Product | null;
  products: Product[];
  searchResults: Product[];
}

const initialState: ProductState = {
  currentProduct: null,
  products: [],
  searchResults: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
    },
    appendProducts: (state, action: PayloadAction<Product[]>) => {
      state.products.push(...action.payload);
    },
    setCurrentProduct: (state, action: PayloadAction<Product>) => {
      state.currentProduct = action.payload;
    },
    removeSearchResult: (state) => {
      state.searchResults = [];
    },
    setSearchResults: (state, action: PayloadAction<Product[]>) => {
      state.searchResults = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setCurrentProduct,
  setProducts,
  appendProducts,
  removeSearchResult,
  setSearchResults,
} = productSlice.actions;
export default productSlice.reducer;
