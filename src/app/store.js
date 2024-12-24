import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authSlice"; // Import your API slice
import appReducer from "./appSlice"; // Import your app slice

const store = configureStore({
  reducer: {
    app: appReducer, // Your main app slice
    [authApi.reducerPath]: authApi.reducer, // Add the API slice reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware), // Add the API slice middleware
});

export default store;
