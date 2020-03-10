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

/*
MODIFY CART ITEM
  - Accepts an ITEM as an argument
  - Makes a request to GET all 'cartItems'
  - Checks if 'item' is in 'cartItems' vis product id
  - TRUE: Updates existing item
  - FALSE: Create a new item
*/
export const modifyCartItem = item => async dispatch => {
  try {
    let cartItems = await axios.get(`/api/v1/cart`);
    cartItems = cartItems.data.data;

    // Compares each cartItem with the item based on a product id
    const existingCartItem = cartItems.find(
      cartItem => cartItem.product._id === item.product._id
    );

    /* existingCartItem comes from 2 locations - CART and SHOP pages
      - CART: item has a 'quantity' field 
      - SHOP: item has no 'quantity' field
        - MUST ADD ONE
    */
    if (existingCartItem && !item.quantity) {
      item.quantity = existingCartItem.quantity + 1;
    }

    // AXIOS CONFIG
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify(item);

    // Send POST / PUT Request
    let res;
    if (existingCartItem) {
      res = await axios.put(
        `/api/v1/cart/${existingCartItem._id}`,
        body,
        config
      );
    } else {
      res = await axios.post(
        `/api/v1/products/${item.product._id}/cart`,
        body,
        config
      );
    }

    dispatch({
      type: CartActionTypes.MODIFY_ITEM,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: CartActionTypes.CART_ERROR,
    //   payload: err.response.data.error
    // });
  }
};
