import ProductActionTypes from "./product.types";

const INITIAL_STATE = {
  products: [],
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
    case ProductActionTypes.FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default productReducer;
