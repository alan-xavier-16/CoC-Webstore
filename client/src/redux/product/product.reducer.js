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
