import CartActionTypes from "./cart.types";
import { updateCart } from "./cart.utils";

const INITIAL_STATE = {
  cart: null,
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
    case CartActionTypes.UPDATE_ITEM:
      return {
        ...state,
        cart: updateCart(state.cart, payload.data),
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
        error: payload.data
      };
    default:
      return state;
  }
};

export default cartReducer;
