import ShopActionTypes from "./shop.types";
import axios from "axios";
import { setAlert } from "../alerts/alert.actions";

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

/** ADD NEW CATEGORY */
export const addCategory = ({ name, description }) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({ name, description });

    const res = await axios.post(`/api/v1/categories`, body, config);

    dispatch({
      type: ShopActionTypes.ADD_CATEGORY_SUCCESS,
      payload: res.data
    });

    dispatch(setAlert(`Category Added`, "success"));
  } catch (err) {
    dispatch({
      type: ShopActionTypes.ADD_CATEGORY_FAIL,
      payload: err.response.data.error
    });
    dispatch(setAlert(`Error adding category ${name}`, "warning"));
  }
};

/** DELETE SINGLE CATEGORY */
export const deleteCategory = categoryId => async dispatch => {
  try {
    await axios.delete(`/api/v1/categories/${categoryId}`);

    dispatch({
      type: ShopActionTypes.DELETE_CATEGORY_SUCCESS,
      payload: categoryId
    });
  } catch (err) {
    dispatch({
      type: ShopActionTypes.DELETE_CATEGORY_FAIL,
      payload: err.response.data.error
    });
    dispatch(setAlert(`Error removing category`, "warning"));
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
