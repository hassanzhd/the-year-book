import { LOGIN_USER, REGISTER_SUCCESSFUL } from "redux/actions/types";
import Auth from "redux/interfaces/auth";

const initialState = {
  successMessage: "",
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

    case LOGIN_USER:
    default:
      return state;
  }
}

export default authReducer;
