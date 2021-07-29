import { CLEAR_ERROR, GET_ERROR } from "../actions/types";
import Error from "redux/interfaces/error";

const initialState = {
  message: "",
};

function errorReducer(
  state: Error.state = initialState,
  action: { type: string; payload: Error.state }
) {
  switch (action.type) {
    case GET_ERROR:
      return {
        ...state,
        message: action.payload.message,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        message: "",
      };
    default:
      return state;
  }
}

export default errorReducer;
