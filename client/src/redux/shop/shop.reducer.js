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
    case ShopActionTypes.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, payload.data],
        loading: false
      };
    case ShopActionTypes.ADD_PRODUCT_SUCCESS:
    case ShopActionTypes.ADD_PRODUCT_PHOTO_SUCCESS:
      return {
        ...state,
        products: [...state.products, payload.data],
        loading: false,
        product: payload.data
      };
    case ShopActionTypes.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(
          category => category._id !== payload
        ),
        loading: false
      };
    case ShopActionTypes.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter(product => product._id !== payload),
        product: null,
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
    case ShopActionTypes.ADD_CATEGORY_FAIL:
    case ShopActionTypes.ADD_PRODUCT_FAIL:
    case ShopActionTypes.ADD_PRODUCT_PHOTO_FAIL:
    case ShopActionTypes.DELETE_CATEGORY_FAIL:
    case ShopActionTypes.DELETE_PRODUCT_FAIL:
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
