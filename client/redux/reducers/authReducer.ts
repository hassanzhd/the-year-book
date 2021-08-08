import {
  LOGIN_USER,
  REGISTER_SUCCESSFUL,
  USER_LOADED,
  USER_LOAD_ERROR,
} from "redux/actions/types";
import Auth from "redux/interfaces/auth";

const initialState = {
  successMessage: "",
  isAuthenticated: false,
  isLoading: true,
};

function authReducer(
  state: Auth.state = initialState,
  action: { type: string; payload: Auth.state }
) {
  switch (action.type) {
    case REGISTER_SUCCESSFUL:
      return {
        ...state,
        successMessage: action.payload.successMessage,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: false,
      };
    case LOGIN_USER:
    case USER_LOAD_ERROR:
    default:
      return state;
  }
}

export default authReducer;
