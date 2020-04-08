import OrderActionTypes from "./order.types";

const INITIAL_STATE = {
  orders: [],
  order: {},
  loading: true,
  error: null,
};

const orderReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case OrderActionTypes.ADD_ORDER_SUCCESS:
      return {
        ...state,
        order: payload.data,
        loading: false,
      };
    case OrderActionTypes.ADD_ORDER_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default orderReducer;
