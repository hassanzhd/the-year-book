import { GET_ERROR, CLEAR_ERROR } from "./types";
import Error from "redux/interfaces/error";

export const getError: Error.getErrorType = (__message: string) => ({
  type: GET_ERROR,
  payload: { message: __message },
});

export const clearError: Error.clearErrorType = () => ({
  type: CLEAR_ERROR,
});
