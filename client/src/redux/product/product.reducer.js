import ProductActionTypes from "./product.types";

const INITIAL_STATE = {
  products: [],
  product: null,
  pagination: null,
  loading: true,
  error: null
};

const productReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ProductActionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload.data,
        pagination: payload.pagination || null,
        loading: false
      };
    case ProductActionTypes.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        product: payload.data,
        loading: false
      };
    case ProductActionTypes.FETCH_PRODUCTS_FAIL:
    case ProductActionTypes.FETCH_PRODUCT_FAIL:
      return {
        ...state,
        products: [],
        product: null,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default productReducer;
