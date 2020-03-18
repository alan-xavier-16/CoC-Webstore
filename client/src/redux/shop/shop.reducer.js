import ShopActionTypes from "./shop.types";

const INITIAL_STATE = {
  categories: [],
  products: [],
  product: null,
  pagination: null,
  loading: true,
  error: null
};

const shopReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ShopActionTypes.FETCH_START:
      return {
        ...state,
        loading: true
      };
    case ShopActionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload.data,
        pagination: payload.pagination || null,
        loading: false
      };
    case ShopActionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload.data,
        pagination: payload.pagination || null,
        loading: false
      };
    case ShopActionTypes.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        product: payload.data,
        loading: false
      };
    case ShopActionTypes.FETCH_CATEGORIES_FAIL:
    case ShopActionTypes.FETCH_PRODUCTS_FAIL:
    case ShopActionTypes.FETCH_PRODUCT_FAIL:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default shopReducer;
