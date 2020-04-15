import ShopActionTypes from "./shop.types";
import { updateCategory, removeCategory } from "./shop.utils";

const INITIAL_STATE = {
  categories: null,
  products: null,
  pagination: null,
  loading: false,
  error: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ShopActionTypes.FETCH_START:
      return {
        ...state,
        loading: true,
      };

    case ShopActionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload.data,
        pagination: payload.pagination || null,
        loading: false,
      };

    case ShopActionTypes.UPDATE_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: updateCategory(state.categories, payload),
        loading: false,
      };

    case ShopActionTypes.DELETE_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: removeCategory(state.categories, payload),
        loading: false,
      };

    case ShopActionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload.data,
        pagination: payload.pagination || null,
        loading: false,
      };

    case ShopActionTypes.UPDATE_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload.data,
        loading: false,
      };

    case ShopActionTypes.ADD_PRODUCT_PHOTO_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case ShopActionTypes.FETCH_CATEGORIES_FAIL:
    case ShopActionTypes.FETCH_PRODUCTS_FAIL:
    case ShopActionTypes.UPDATE_CATEGORIES_FAIL:
    case ShopActionTypes.DELETE_CATEGORIES_FAIL:
    case ShopActionTypes.UPDATE_PRODUCTS_FAIL:
    case ShopActionTypes.ADD_PRODUCT_PHOTO_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default shopReducer;
