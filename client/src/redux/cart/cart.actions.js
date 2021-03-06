import CartActionTypes from "./cart.types";
import axios from "axios";
import { setAlert } from "../alerts/alert.actions";

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
    dispatch(setAlert(err.response.data.error, "danger"));
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

    /* existingCartItem comes from 3 locations - CART, SHOP-BY-CATEGORY / PRODUCTS, PRODUCT-ITEM pages
      - CART: item has a 'quantity' field 
      - SHOP-BY-CATEGORY / PRODUCTS: item has no 'quantity' field
        - MUST ADD ONE
      - PRODUCT-ITEM: item has a 'quantity' field 
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
    } else if (item.product) {
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

    dispatch(setAlert(`${item.product.name} added to Cart`, "success"));

    dispatch(getCart());
  } catch (err) {
    dispatch({
      type: CartActionTypes.CART_ERROR,
      payload: err.response.data.error
    });

    dispatch(setAlert(err.response.data.error, "danger"));
  }
};

/*
CLEAR CART ITEM
  - Accepts a cart item as an argument
  - Deletes cart item from database
*/
export const clearCartItem = item => async dispatch => {
  try {
    await axios.delete(`/api/v1/cart/${item._id}`);
    dispatch({
      type: CartActionTypes.CLEAR_ITEM,
      payload: item
    });

    dispatch(setAlert(`${item.product.name} removed from Cart`, "success"));

    dispatch(getCart());
  } catch (err) {
    dispatch({
      type: CartActionTypes.CART_ERROR,
      payload: err.response.data.error
    });

    dispatch(setAlert(err.response.data.error, "danger"));
  }
};

/*
DELETE CART
  - Deletes user's cart from database
*/
export const deleteCart = () => async dispatch => {
  try {
    await axios.delete("/api/v1/cart");
    dispatch({
      type: CartActionTypes.CLEAR_CART
    });

    dispatch(setAlert(`Cart Deleted`, "success"));
  } catch (err) {
    dispatch({
      type: CartActionTypes.CART_ERROR,
      payload: err.response.data.error
    });

    dispatch(setAlert(err.response.data.error, "danger"));
  }
};
