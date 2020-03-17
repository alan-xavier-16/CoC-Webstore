import ShopActionTypes from "./shop.types";

const INITIAL_STATE = {
  categories: [],
  pagination: null,
  loading: true,
  error: null
};

const shopReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ShopActionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload.data,
        pagination: payload.pagination || null,
        loading: false
      };
    case ShopActionTypes.FETCH_CATEGORIES_FAIL:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};

export default shopReducer;
