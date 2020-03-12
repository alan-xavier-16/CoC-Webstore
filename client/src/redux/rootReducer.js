import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import alertReducer from "./alerts/alert.reducer";
import authReducer from "./auth/auth.reducer";
import shopReducer from "./shop/shop.reducer";
import cartReducer from "./cart/cart.reducer";

/* PERSIST CONFIG */
const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "shop", "cart"]
};

const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: ["isAuthenticated"]
};

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  shop: shopReducer,
  cart: cartReducer
});

export default persistReducer(rootPersistConfig, rootReducer);
