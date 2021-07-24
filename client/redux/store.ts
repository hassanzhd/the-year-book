import { applyMiddleware } from "redux";
import { createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middleware = [thunk];

export const store = createStore(rootReducer, applyMiddleware(...middleware));
