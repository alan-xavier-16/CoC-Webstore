import CartActionTypes from "./cart.types";
import AuthActionTypes from "../auth/auth.types";
import { modifyCart, removeCartItem } from "./cart.utils";

const INITIAL_STATE = {
  cart: [],
  loading: true,
  error: null,
  hidden: true
};

const cartReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CartActionTypes.FETCH_CART_SUCCESS:
      return {
        ...state,
        cart: payload.data,
        loading: false
      };
    case CartActionTypes.MODIFY_ITEM:
      return {
        ...state,
        cart: modifyCart(state.cart, payload.data),
        loading: false
      };
    case CartActionTypes.CLEAR_ITEM:
      return {
        ...state,
        cart: removeCartItem(state.cart, payload),
        loading: false
      };
    case CartActionTypes.CLEAR_CART:
    case AuthActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        cart: [],
        loading: false
      };
    case CartActionTypes.TOGGLE_CART:
      return {
        ...state,
        hidden: !state.hidden
      };
    case CartActionTypes.CART_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};

export default cartReducer;
