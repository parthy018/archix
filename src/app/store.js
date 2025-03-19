import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import { authApi } from "./authSlice"; // Import API slice
import { feedbackApi } from "./feedbackSlice";
import appReducer from "./appSlice"; 

// Redux Persist Configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["app"],
};

const rootReducer = combineReducers({
  app: persistReducer(persistConfig, appReducer),
  [authApi.reducerPath]: authApi.reducer,
  [feedbackApi.reducerPath]: feedbackApi.reducer,
});

// Create Store with Middleware
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware, feedbackApi.middleware),
});

// Create Persistor
export const persistor = persistStore(store);
export default store;
