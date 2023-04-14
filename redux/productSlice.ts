import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ProductState {
  value: number
}

const initialState: ProductState = {
  value: 0,
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
  },
})

// Action creators are generated for each case reducer function
export const { } = productSlice.actions

export default productSlice.reducer