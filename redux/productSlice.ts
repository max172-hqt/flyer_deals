import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../types';

export interface ProductState {
  currentProduct: Product | null;
  products: Product[];
  searchResults: Product[];
}

const sampleProducts = [
  {
    id: '1',
    data: {
      name: 'Atlantic Lobster Tails Or Fresh Atlantic Salmon Portions',
      salePrice: '$4.99',
      regularPrice: null,
      imageUrl: 'dam-img.rfdcontent.com/cms/009/467/864/9467864_original.jpg',
      description:
        'Atlantic lobster tails, frozen or thawed for your convenience 2 - 3 oz. Fresh Atlantic salmon portions. Selected varieties 113 g. Subject to availability. Prices and offers effective from Thursday, April 13th to Wednesday, April 19th, 2023 unless otherwise stated.',
      tags: ['salmon', 'lobster', 'frozen'],
    },
  },
];

const initialState: ProductState = {
  currentProduct: null,
  products: sampleProducts,
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
