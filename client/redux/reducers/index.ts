import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import Error from "../interfaces/error";

export interface ApplicationState {
  error: Error.state;
}

const rootReducer = combineReducers<ApplicationState>({
  error: errorReducer,
});

export default rootReducer;
