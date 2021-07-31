import { Dispatch } from "react";
import {
  UserMainValidator,
  UserOtherValidator,
} from "Validators/Login-Register";
import API from "API";
import { clearError, getError } from "./errorActions";
import Auth from "redux/interfaces/auth";
import Router from "next/router";

export const loginUser: Auth.loginUserType =
  (__email, __password) => async (dispatch) => {
    try {
      const validator = new UserMainValidator();
      if (validator.isValid(__email, __password)) {
        const api = new API();
        const data = await api.postRequest("http://localhost:5000/user/login", {
          email: __email,
          password: __password,
        });
        dispatch(clearError());
        dispatch({
          type: "LOGIN_USER",
        });
      }
    } catch (error) {
      dispatch(getError(error.message));
    }
  };

export const registerUserNextStep: Auth.registerUserNextStepType =
  (__email, __password, __stepNumber, __setStepNumber) => (dispatch) => {
    try {
      const validator = new UserMainValidator();
      if (validator.isValid(__email, __password)) {
        dispatch(clearError());
        __setStepNumber(__stepNumber + 1);
      }
    } catch (error) {
      dispatch(getError(error.message));
    }
  };

export const registerUserSecondStep: Auth.registerUserSecondStepType =
  (__user) => async (dispatch) => {
    try {
      const validator = new UserOtherValidator();
      if (
        validator.isValid(
          __user.handle,
          __user.fullName,
          __user.university,
          __user.batch,
          __user.shortBio,
          __user.image
        )
      ) {
        const formData = new FormData();
        formData.append("email", __user.email);
        formData.append("password", __user.password);
        formData.append("handle", __user.handle);
        formData.append("fullName", __user.fullName);
        formData.append("university", __user.university);
        formData.append("batch", __user.batch.toString());
        formData.append("shortBio", __user.shortBio);
        formData.append("file", __user.image);

        const api = new API();
        const data = await api.formDataPostRequest(
          "http://localhost:5000/user/register",
          formData
        );

        dispatch(clearError());
        dispatch({
          type: "REGISTER_SUCCESSFUL",
          payload: { successMessage: data.message },
        });

        setTimeout(() => {
          Router.push("/");
        }, 2000);
      }
    } catch (error) {
      dispatch(getError(error.message));
    }
  };
