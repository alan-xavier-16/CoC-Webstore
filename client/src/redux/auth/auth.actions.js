import AuthActionTypes from "./auth.types";
import axios from "axios";
import { setAlert } from "../alerts/alert.actions";
import { getCart } from "../cart/cart.actions";

/** LOAD USER ON LOGIN AND REGISTER */
export const loadUser = () => async dispatch => {
  // Set Auth Headers
  if (localStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }

  try {
    const res = await axios.get("/api/v1/auth/me");

    dispatch({
      type: AuthActionTypes.LOAD_USER,
      payload: res.data
    });

    /* LOAD USER CART */
    dispatch(getCart());
  } catch (err) {
    dispatch({
      type: AuthActionTypes.AUTH_ERROR,
      payload: err.response.data.error
    });
  }
};

/** REGISTER NEW USER */
export const register = ({ name, email, password, role }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password, role });

  try {
    const res = await axios.post("/api/v1/auth/register", body, config);

    dispatch({
      type: AuthActionTypes.REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: AuthActionTypes.REGISTER_FAIL,
      payload: err.response.data.error
    });
    dispatch(setAlert(`${err.response.data.error}`, "danger"));
  }
};

/** LOGIN USER */
export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/v1/auth/login", body, config);

    dispatch({
      type: AuthActionTypes.LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: AuthActionTypes.LOGIN_FAIL,
      payload: err.response.data.error
    });
    dispatch(setAlert(`${err.response.data.error}`, "danger"));
  }
};

/** LOGOUT */
export const logout = () => async dispatch => {
  try {
    await axios.get("/api/v1/auth/logout");

    dispatch({
      type: AuthActionTypes.LOGOUT_SUCCESS
    });
  } catch (err) {
    dispatch({
      type: AuthActionTypes.LOGOUT_FAIL,
      payload: err.response.data.error
    });
    dispatch(setAlert(`${err.response.data.error}`, "danger"));
  }
};

/** RESET USER PASSWORD */
export const resetPassword = email => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({ email });

    const res = await axios.post(`/api/v1/auth/forgotPwd`, body, config);

    dispatch({
      type: AuthActionTypes.FORGOT_PWD_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert(`${res.data.data}`, "success"));
  } catch (err) {
    dispatch({
      type: AuthActionTypes.FORGOT_PWD_FAIL,
      payload: err.response.data.error
    });
    dispatch(setAlert(`${err.response.data.error}`, "danger"));
  }
};
