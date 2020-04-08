import OrderActionTypes from "./order.types";
import axios from "axios";
import { deleteCart } from "../cart/cart.actions";
import { setAlert } from "../alerts/alert.actions";

/** CREATE AN ORDER */
export const addOrder = (orderItem, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(orderItem);

    const res = await axios.post(`/api/v1/orders`, body, config);

    dispatch({
      type: OrderActionTypes.ADD_ORDER_SUCCESS,
      payload: res.data,
    });

    dispatch(deleteCart());

    history.push("/shop");
  } catch (err) {
    console.error(err);
    dispatch({
      type: OrderActionTypes.ADD_ORDER_FAIL,
      payload: err.response.data.error,
    });
    dispatch(setAlert(`Failed: ${err.response.data.error}`, "warning"));
  }
};
