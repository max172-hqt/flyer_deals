import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductData } from '../database/db';

export interface ProductState {
  currentProduct: Product | null;
  products: Product[];
  cart: Record<string, ProductData>;
}

const sampleProducts = [
  {
    id: '1',
    data: {
      name: 'Atlantic Lobster Tails Or Fresh Atlantic Salmon Portions',
      salePrice: '$4.99',
      regularPrice: undefined,
      imageUrl: 'dam-img.rfdcontent.com/cms/009/467/864/9467864_original.jpg',
      description:
        'Atlantic lobster tails, frozen or thawed for your convenience 2 - 3 oz. Fresh Atlantic salmon portions. Selected varieties 113 g. Subject to availability. Prices and offers effective from Thursday, April 13th to Wednesday, April 19th, 2023 unless otherwise stated.',
      tags: ['salmon', 'lobster', 'frozen'],
    },
  },
];

const initialState: ProductState = {
  currentProduct: null,
  cart: {},
  products: sampleProducts,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    appendProducts: (state, action: PayloadAction<Product[]>) => {
      state.products.push(...action.payload);
    },
    setCurrentProduct: (state, action: PayloadAction<Product>) => {
      state.currentProduct = action.payload;
    },
    addProductToCart: (state, action: PayloadAction<Product>) => {
      state.cart[action.payload.id] = action.payload.data;
    },
    removeProductFromCart: (state, action: PayloadAction<string>) => {
      delete state.cart[action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCurrentProduct,
  addProductToCart,
  removeProductFromCart,
  appendProducts,
} = productSlice.actions;
export default productSlice.reducer;
