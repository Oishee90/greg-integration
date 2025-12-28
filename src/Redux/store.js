import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "./api/apiSlice";
import { authReducer } from "./feature/authSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Only persist auth (and chat if you have one)
  blacklist: [apiSlice.reducerPath], // Never persist RTK Query cache
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  // chat: chatReducer, // if you have one
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // You can still keep these if you want, but they're not needed anymore
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PURGE",
          // Optional: ignore RTK Query actions completely
          // ...or just rely on blacklist above
        ],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);
export default store;
