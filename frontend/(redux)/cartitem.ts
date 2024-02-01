"use client";

import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@/backend/src/models/prodModel";

const initialState: Product[] = [];

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      const { _id } = action.payload;
      const existingItem = state.find((item: Product) => item._id === _id);

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.push(action.payload);
      }
    },
    remove: (state, action) => {
      return state.filter((item: Product) => item._id !== action.payload);
    },
  },
});

export const { add, remove } = CartSlice.actions;
export default CartSlice.reducer;
