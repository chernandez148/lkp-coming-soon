import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createIdbStorage from "redux-persist-indexeddb-storage";
import { combineReducers } from "redux";

import cartReducer from "./slices/cartSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
});

const persistConfig = {
  key: "root",
  storage: createIdbStorage({ name: "LKPDB", storeName: "redux" }),
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  // No need to add thunk middleware here — included by default
});

const persistor = persistStore(store);

export { store, persistor };
