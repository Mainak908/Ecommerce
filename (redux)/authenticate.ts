"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: {},
};
const Authenticate = createSlice({
  initialState,
  name: "auth",
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = {};
    },
  },
});

export const { login, logout } = Authenticate.actions;
export default Authenticate.reducer;
