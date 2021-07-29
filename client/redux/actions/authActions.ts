import { Dispatch } from "react";
import { UserMainValidator } from "Validators/Login-Register";
import API from "API";
import { clearError, getError } from "./errorActions";
import Auth from "redux/interfaces/auth";

export const loginUser =
  (__email: string, __password: string) =>
  async (dispatch: Dispatch<Auth.loginUserDispatchTypes>): Promise<void> => {
    try {
      const validator = new UserMainValidator();
      if (validator.isValid(__email, __password)) {
        const data = await API.postRequest("http://localhost:5000/user/login", {
          __email,
          __password,
        });
        dispatch(clearError());
      }
    } catch (error) {
      dispatch(getError(error.message));
    }
  };
