import ShopActionTypes from "./shop.types";
import axios from "axios";
import { arrayToObject, objectToMap } from "./shop.utils";
import { setAlert } from "../alerts/alert.actions";

/** GET ALL CATEGORIES */
export const getCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: ShopActionTypes.FETCH_START,
    });

    const res = await axios.get("/api/v1/categories");
    // CONVERT CATEGORIES ARRAY TO OBJECT
    const categoriesMap = arrayToObject(res.data.data, "slug");

    dispatch({
      type: ShopActionTypes.FETCH_CATEGORIES_SUCCESS,
      payload: { ...res.data, data: categoriesMap },
    });
  } catch (err) {
    dispatch({
      type: ShopActionTypes.FETCH_CATEGORIES_FAIL,
      payload: err.response.data.error,
    });
  }
};

/** GET ALL PRODUCTS */
export const getProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: ShopActionTypes.FETCH_START,
    });

    const res = await axios.get("/api/v1/products");
    // CONVERT PRODUCTS ARRAY TO OBJECT
    const productsMap = arrayToObject(res.data.data, "slug");

    dispatch({
      type: ShopActionTypes.FETCH_PRODUCTS_SUCCESS,
      payload: { ...res.data, data: productsMap },
    });
  } catch (err) {
    dispatch({
      type: ShopActionTypes.FETCH_PRODUCTS_FAIL,
      payload: err.response.data.error,
    });
  }
};

/** ADD || UPDATE CATEGORY */
export const createCategory = (
  formData,
  history,
  location,
  categoryId = null,
  edit = false
) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let res;
    if (categoryId !== null) {
      res = await axios.put(
        `/api/v1/categories/${categoryId}`,
        formData,
        config
      );
    } else {
      res = await axios.post(`/api/v1/categories`, formData, config);
    }

    // CONVERT OBJECT TO OBJECT MAP
    const categoryMap = objectToMap(res.data.data, "slug");

    dispatch({
      type: ShopActionTypes.UPDATE_CATEGORIES_SUCCESS,
      payload: categoryMap,
    });

    dispatch(
      setAlert(`${formData.name} ${edit ? "updated" : "added"}`, "success")
    );

    if (!edit) {
      history.push(`${location.state.from}`);
    }
  } catch (err) {
    console.error(err);
    dispatch({
      type: ShopActionTypes.UPDATE_CATEGORIES_FAIL,
      payload: err.response.data.error,
    });

    dispatch(setAlert(`Failed: ${err.response.data.error}`, "warning"));
  }
};

/** DELETE SINGLE CATEGORY */
export const deleteCategory = (category, history) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/categories/${category._id}`);

    history.push(`/shop`);

    // CONVERT OBJECT TO OBJECT MAP
    const categoryMap = objectToMap(category, "slug");

    dispatch({
      type: ShopActionTypes.DELETE_CATEGORIES_SUCCESS,
      payload: categoryMap,
    });

    dispatch(setAlert(`Category deleted`, "success"));
  } catch (err) {
    console.error(err);
    dispatch({
      type: ShopActionTypes.DELETE_CATEGORIES_FAIL,
      payload: err.response.data.error,
    });
    dispatch(setAlert(`Failed: ${err.response.data.error}`, "warning"));
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
