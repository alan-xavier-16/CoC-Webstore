import ShopActionTypes from "./shop.types";
import axios from "axios";

/** GET ALL CATEGORIES */
export const getCategories = () => async dispatch => {
  try {
    dispatch({
      type: ShopActionTypes.FETCH_START
    });

    const res = await axios.get("/api/v1/categories");
    dispatch({
      type: ShopActionTypes.FETCH_CATEGORIES_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ShopActionTypes.FETCH_CATEGORIES_FAIL,
      payload: err.response.data.error
    });
  }
};

/** GET ALL PRODUCTS */
export const getProducts = () => async dispatch => {
  try {
    dispatch({
      type: ShopActionTypes.FETCH_START
    });

    const res = await axios.get("/api/v1/products");
    dispatch({
      type: ShopActionTypes.FETCH_PRODUCTS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ShopActionTypes.FETCH_PRODUCTS_FAIL,
      payload: err.response.data.error
    });
  }
};

/** GET ONE PRODUCT */
export const getProduct = productSlug => async dispatch => {
  try {
    dispatch({
      type: ShopActionTypes.FETCH_START
    });

    const res = await axios.get(`/api/v1/products/${productSlug}`);
    dispatch({
      type: ShopActionTypes.FETCH_PRODUCT_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ShopActionTypes.FETCH_PRODUCT_FAIL,
      payload: err.response.data.error
    });
  }
};
