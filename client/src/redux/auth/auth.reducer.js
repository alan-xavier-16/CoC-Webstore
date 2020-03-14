import AuthActionTypes from "./auth.types";

const INITIAL_STATE = {
  token: null,
  isAuthenticated: false,
  loading: true,
  user: null,
  error: null,
  resetPwdMsg: ""
};

const authReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case AuthActionTypes.LOAD_USER:
      return {
        ...state,
        user: payload.data,
        isAuthenticated: true,
        loading: false
      };
    case AuthActionTypes.REGISTER_SUCCESS:
    case AuthActionTypes.LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case AuthActionTypes.FORGOT_PWD_SUCCESS:
      return {
        ...state,
        loading: false,
        resetPwdMsg: payload.data
      };
    case AuthActionTypes.AUTH_ERROR:
    case AuthActionTypes.REGISTER_FAIL:
    case AuthActionTypes.LOGIN_FAIL:
    case AuthActionTypes.LOGOUT_FAIL:
    case AuthActionTypes.FORGOT_PWD_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: payload,
        resetPwdMsg: ""
      };
    case AuthActionTypes.LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: null
      };
    default:
      return state;
  }
};

export default authReducer;
