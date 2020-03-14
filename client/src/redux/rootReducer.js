import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import alertReducer from "./alerts/alert.reducer";
import authReducer from "./auth/auth.reducer";
import shopReducer from "./shop/shop.reducer";
import cartReducer from "./cart/cart.reducer";
import productReducer from "./product/product.reducer";

/* PERSIST CONFIG */
const rootPersistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["auth", "shop", "cart", "product"]
};

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  shop: shopReducer,
  cart: cartReducer,
  product: productReducer
});

export default persistReducer(rootPersistConfig, rootReducer);
