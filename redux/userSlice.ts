import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, User } from '../types';

export interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  cart: Record<string, CartItem>;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  cart: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    resetUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      for (const cartItem of action.payload) {
        state.cart[cartItem.id] = cartItem;
      }
    },
    addProductToCart: (
      state,
      action: PayloadAction<{ id: string; cartItem: CartItem }>
    ) => {
      state.cart[action.payload.id] = action.payload.cartItem;
    },
    removeProductFromCart: (state, action: PayloadAction<string>) => {
      delete state.cart[action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, resetUser, setCart, addProductToCart, removeProductFromCart } =
  userSlice.actions;
export default userSlice.reducer;
