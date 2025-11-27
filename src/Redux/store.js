import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "./api/apiSlice";
import { authReducer } from "./feature/authSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "chat"], 
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer, //
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredActionPaths: [
          "register",
          "rehydrate",
          "baseApi.meta.baseQueryMeta.request",
          "baseApi.meta.baseQueryMeta.response",
        ],
      },
    }).concat(apiSlice.middleware),
});

const persistor = persistStore(store); // ✅ correct spelling

// ✅ Final export
export { store, persistor };
