import { configureStore } from "@reduxjs/toolkit";
import Authenticate from "./authenticate";
import cartReducer from "./cartitem";

export const store = configureStore({
  reducer: {
    auth: Authenticate,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
