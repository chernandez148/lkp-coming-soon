import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createIdbStorage from "redux-persist-indexeddb-storage";
import { combineReducers } from "redux";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";

// Create IndexedDB storage
const idbStorage = createIdbStorage({
  name: "LKPDB",
  storeName: "redux",
  serializer: {
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  },
});

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage: idbStorage,
  whitelist: ["cart", "user"], // Persist both slices
  version: 1, // Version control for migrations
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // Ignore redux-persist actions
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

// Optional: Purge persistence during development
if (process.env.NODE_ENV === "development") {
  window.purgeStore = () => persistor.purge();
}
