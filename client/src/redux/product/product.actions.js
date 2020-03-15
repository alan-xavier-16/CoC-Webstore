import ProductActionTypes from "./product.types";
import axios from "axios";

export const getProducts = () => async dispatch => {
  try {
    const res = await axios.get("/api/v1/products");

    dispatch({
      type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ProductActionTypes.FETCH_PRODUCTS_FAIL,
      payload: err.response.data.error
    });
  }
};
