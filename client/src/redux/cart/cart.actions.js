import CartActionTypes from "./cart.types";
import axios from "axios";

/** TOGGLE CART DROPDOWN */
export const toggleCart = () => dispatch => {
  dispatch({ type: CartActionTypes.TOGGLE_CART });
};

/** FETCH CART ITEMS FOR USER */
export const getCart = () => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/cart`);
    dispatch({
      type: CartActionTypes.FETCH_CART_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CartActionTypes.CART_ERROR,
      payload: err.response.data.error
    });
  }
};

/** UPDATE CART ITEM */
export const updateCartItem = updatedItem => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify(updatedItem);

    const res = await axios.put(
      `/api/v1/cart/${updatedItem._id}`,
      body,
      config
    );

    dispatch({
      type: CartActionTypes.UPDATE_ITEM,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CartActionTypes.CART_ERROR,
      payload: err.response.data.error
    });
  }
};
