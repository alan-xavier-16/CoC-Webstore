import ShopActionTypes from "./shop.types";
import axios from "axios";
import { setAlert } from "../alerts/alert.actions";

/** GET ALL CATEGORIES */
export const getCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: ShopActionTypes.FETCH_START,
    });

    const res = await axios.get("/api/v1/categories");
    dispatch({
      type: ShopActionTypes.FETCH_CATEGORIES_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ShopActionTypes.FETCH_CATEGORIES_FAIL,
      payload: err.response.data.error,
    });
  }
};

/** ADD NEW CATEGORY */
export const addCategory = ({ name, description, history, location }) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, description });

    const res = await axios.post(`/api/v1/categories`, body, config);

    dispatch({
      type: ShopActionTypes.ADD_CATEGORY_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert(`${name} added`, "success"));

    history.push(`${location.state.from}`);
  } catch (err) {
    dispatch({
      type: ShopActionTypes.ADD_CATEGORY_FAIL,
      payload: err.response.data.error,
    });
    dispatch(setAlert(`Failed: ${err.response.data.error}`, "warning"));
  }
};

/** EDIT A CATEGORY */
export const editCategory = (categoryId, { name, description }) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, description });

    const res = await axios.put(
      `/api/v1/categories/${categoryId}`,
      body,
      config
    );

    dispatch({
      type: ShopActionTypes.ADD_CATEGORY_SUCCESS,
      payload: res.data,
    });

    dispatch(getCategories());

    dispatch(setAlert(`${name} updated`, "success"));
  } catch (err) {
    dispatch({
      type: ShopActionTypes.ADD_CATEGORY_FAIL,
      payload: err.response.data.error,
    });
    dispatch(setAlert(`Failed: ${err.response.data.error}`, "warning"));
  }
};

/** DELETE SINGLE CATEGORY */
export const deleteCategory = (categoryId, history) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/categories/${categoryId}`);

    history.push(`/shop`);

    dispatch({
      type: ShopActionTypes.DELETE_CATEGORY_SUCCESS,
      payload: categoryId,
    });

    dispatch(setAlert(`Category deleted`, "success"));
  } catch (err) {
    dispatch({
      type: ShopActionTypes.DELETE_CATEGORY_FAIL,
      payload: err.response.data.error,
    });
    dispatch(setAlert(`Failed: ${err.response.data.error}`, "warning"));
  }
};

/** GET ALL PRODUCTS */
export const getProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: ShopActionTypes.FETCH_START,
    });

    const res = await axios.get("/api/v1/products");
    dispatch({
      type: ShopActionTypes.FETCH_PRODUCTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ShopActionTypes.FETCH_PRODUCTS_FAIL,
      payload: err.response.data.error,
    });
  }
};

/** GET ONE PRODUCT */
export const getProduct = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: ShopActionTypes.FETCH_START,
    });

    const res = await axios.get(`/api/v1/products/${productId}`);
    dispatch({
      type: ShopActionTypes.FETCH_PRODUCT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ShopActionTypes.FETCH_PRODUCT_FAIL,
      payload: err.response.data.error,
    });
  }
};

/** CREATE A PRODUCT */
export const addProduct = (categorySlug, formData, history, location) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(formData);

    const res = await axios.post(
      `/api/v1/categories/${categorySlug}/products`,
      body,
      config
    );

    dispatch({
      type: ShopActionTypes.ADD_PRODUCT_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert(`${formData.name} added`, "success"));

    history.push(`${location.state.from}`);
    window.location.reload();
  } catch (err) {
    dispatch({
      type: ShopActionTypes.ADD_PRODUCT_FAIL,
      payload: err.response.data.error,
    });
    dispatch(setAlert(`Failed: ${err.response.data.error}`, "warning"));
  }
};

/** EDIT A PRODUCT */
export const editProduct = (productId, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(formData);

    const res = await axios.put(`/api/v1/products/${productId}`, body, config);

    dispatch({
      type: ShopActionTypes.ADD_PRODUCT_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert(`${formData.name} updated`, "success"));
  } catch (err) {
    dispatch({
      type: ShopActionTypes.ADD_PRODUCT_FAIL,
      payload: err.response.data.error,
    });
    dispatch(setAlert(`Failed: ${err.response.data.error}`, "warning"));
  }
};

/** DELETE SINGLE PRODUCT */
export const deleteProduct = (productId, history) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/products/${productId}`);

    history.push(`/shop`);

    dispatch({
      type: ShopActionTypes.DELETE_PRODUCT_SUCCESS,
      payload: productId,
    });

    dispatch(setAlert(`Product deleted`, "success"));
  } catch (err) {
    dispatch({
      type: ShopActionTypes.DELETE_PRODUCT_FAIL,
      payload: err.response.data.error,
    });
    dispatch(setAlert(`Failed: ${err.response.data.error}`, "warning"));
  }
};

/** EDIT A PRODUCT PHOTO */
export const editProductPhoto = (
  productId,
  formData,
  history,
  location
) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(
      `/api/v1/products/${productId}/photo`,
      formData,
      config
    );

    dispatch({
      type: ShopActionTypes.ADD_PRODUCT_PHOTO_SUCCESS,
      payload: res.data,
    });

    history.push(`${location.state.from}`);
    window.location.reload();

    dispatch(setAlert(`Product photos updated`, "success"));
  } catch (err) {
    dispatch({
      type: ShopActionTypes.ADD_PRODUCT_PHOTO_FAIL,
      payload: err.response.data.error,
    });
    dispatch(setAlert(`Failed: ${err.response.data.error}`, "warning"));
  }
};
