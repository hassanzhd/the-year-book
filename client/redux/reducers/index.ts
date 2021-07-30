import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import Error from "../interfaces/error";
import Auth from "redux/interfaces/auth";
export interface ApplicationState {
  error: Error.state;
  auth: Auth.state;
}

const rootReducer = combineReducers<ApplicationState>({
  error: errorReducer,
  auth: authReducer,
});

export default rootReducer;
