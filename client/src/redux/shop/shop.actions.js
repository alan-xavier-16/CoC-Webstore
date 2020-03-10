import ShopActionTypes from "./shop.types";
import axios from "axios";

export const getCategories = () => async dispatch => {
  try {
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
