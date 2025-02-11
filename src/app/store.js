import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authSlice"; // Import your API slice
import appReducer from "./appSlice"; // Import your app slice
import { feedbackApi } from "./feedbackSlice";
const store = configureStore({
  reducer: {
    app: appReducer, // Your main app slice
    [authApi.reducerPath]: authApi.reducer, // Add the API slice reducer
    [feedbackApi.reducerPath]: feedbackApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,feedbackApi.middleware), // Add the API slice middleware

});

export default store;
