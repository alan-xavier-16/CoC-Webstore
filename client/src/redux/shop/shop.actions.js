import ShopActionTypes from "./shop.types";
import axios from "axios";
import { arrayToObject, objectToMap } from "./shop.utils";
import { setAlert } from "../alerts/alert.actions";

/** GET ALL CATEGORIES */
export const getCategories = (queryParams = null) => async (dispatch) => {
  try {
    dispatch({
      type: ShopActionTypes.FETCH_START,
    });

    let queryStr = "?";
    if (queryParams !== null) {
      Object.entries(queryParams).forEach(([key, value], idx) => {
        if (idx === 0) {
          queryStr = `${queryStr}${key}=${value}`;
        } else {
          queryStr = `&${queryStr}${key}=${value}`;
        }
      });
    }

    const res = await axios.get(`/api/v1/categories${queryStr}`);

    // CONVERT CATEGORIES[PRODUCTS] ARRAY TO OBJECT && COLLECT ALL PRODUCTS
    let productsMap = {};
    const categoryArrayWithProductsMap = res.data.data.map((category) => {
      const formatProductsArray = category.products.map((product) => {
        return {
          ...product,
          category: {
            _id: product.category,
            id: product.category,
            slug: category.slug,
          },
        };
      });

      // COLLECT ALL PRODUCTS
      productsMap = {
        ...productsMap,
        ...arrayToObject(formatProductsArray, "slug"),
      };

      return {
        ...category,
        products: arrayToObject(category.products, "slug"),
      };
    });

    // CONVERT CATEGORIES ARRAY TO OBJECT
    const categoriesMap = arrayToObject(categoryArrayWithProductsMap, "slug");

    dispatch({
      type: ShopActionTypes.FETCH_CATEGORIES_SUCCESS,
      payload: {
        ...res.data,
        categories: categoriesMap,
        products: productsMap,
      },
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: ShopActionTypes.FETCH_CATEGORIES_FAIL,
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

    history.push(`${location.state.from}`);

    dispatch({
      type: ShopActionTypes.UPDATE_CATEGORIES_SUCCESS,
      payload: categoryMap,
    });

    dispatch(
      setAlert(`${formData.name} ${edit ? "updated" : "added"}`, "success")
    );
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

    // DELETE CATEGORIES FROM STORE
    dispatch({
      type: ShopActionTypes.DELETE_CATEGORIES_SUCCESS,
      payload: { category: categoryMap },
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

/** GET ALL PRODUCTS */
export const getProducts = (queryParams = null) => async (dispatch) => {
  try {
    dispatch({
      type: ShopActionTypes.FETCH_START,
    });

    let queryStr = "?";
    if (queryParams !== null) {
      Object.entries(queryParams).forEach(([key, value], idx) => {
        if (idx === 0) {
          queryStr = `${queryStr}${key}=${value}`;
        } else {
          queryStr = `&${queryStr}${key}=${value}`;
        }
      });
    }

    const res = await axios.get(`/api/v1/products${queryStr}`);

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

/** ADD || UPDATE PRODUCT */
export const createProduct = (
  formData,
  history,
  location,
  identifier = null,
  edit = false
) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let res;
    if (!edit) {
      res = await axios.post(
        `/api/v1/categories/${identifier}/products`,
        formData,
        config
      );
    } else {
      res = await axios.put(`/api/v1/products/${identifier}`, formData, config);
    }

    // CONVERT OBJECT TO OBJECT MAP
    const productMap = objectToMap(res.data.data, "slug");

    dispatch({
      type: ShopActionTypes.UPDATE_PRODUCTS_SUCCESS,
      payload: productMap,
    });

    dispatch(getCategories());

    history.push(`${location.state.from}`);

    dispatch(
      setAlert(`${formData.name} ${edit ? "updated" : "added"}`, "success")
    );
  } catch (err) {
    console.error(err);
    dispatch({
      type: ShopActionTypes.UPDATE_PRODUCTS_FAIL,
      payload: err.response.data.error,
    });
    dispatch(setAlert(`Failed: ${err.response.data.error}`, "warning"));
  }
};

/** DELETE SINGLE PRODUCT */
export const deleteProduct = (product, history) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/products/${product._id}`);

    history.push(`/shop`);

    // CONVERT OBJECT TO OBJECT MAP
    const productMap = objectToMap(product, "slug");

    dispatch({
      type: ShopActionTypes.DELETE_PRODUCTS_SUCCESS,
      payload: productMap,
    });

    dispatch(getCategories());

    dispatch(setAlert(`Product deleted`, "success"));
  } catch (err) {
    console.error(err);
    dispatch({
      type: ShopActionTypes.DELETE_PRODUCTS_FAIL,
      payload: err.response.data.error,
    });
    dispatch(setAlert(`Failed: ${err.response.data.error}`, "warning"));
  }
};

/** EDIT A PRODUCT PHOTO */
export const editProductPhoto = (
  product,
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
      `/api/v1/products/${product._id}/photo`,
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
