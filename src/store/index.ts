// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Store'un state yapısını türetmek için RootState tipini oluşturun
export type RootState = ReturnType<typeof store.getState>;

// Dispatch türünü türetmek için kullanılır
export type AppDispatch = typeof store.dispatch;

export default store;
