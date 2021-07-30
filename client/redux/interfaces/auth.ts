import { Dispatch, SetStateAction } from "react";
import Error from "./error";

namespace Auth {
  export interface state {
    successMessage: string;
  }

  interface UserMain {
    email: string;
    password: string;
  }

  interface UserOther {
    handle: string;
    fullName: string;
    university: string;
    batch: number;
    shortBio: string;
    image: File;
  }

  export class User implements UserMain, UserOther {
    constructor(
      public readonly email: string,
      public readonly password: string,
      public readonly handle: string,
      public readonly fullName: string,
      public readonly university: string,
      public readonly batch: number,
      public readonly shortBio: string,
      public readonly image: File
    ) {}
  }

  export interface loginUserDispatch {
    type: "LOGIN_USER";
  }

  export type loginUserDispatchTypes =
    | Auth.loginUserDispatch
    | Error.clearErrorAction
    | Error.getErrorAction;

  export type loginUserType = (
    __email: string,
    __password: string
  ) => (dispatch: Dispatch<loginUserDispatchTypes>) => Promise<void>;

  export interface registerUserDispatch {
    type: "REGISTER_SUCCESSFUL";
    payload: {
      successMessage: string;
    };
  }

  export type registerUserNextStepType = (
    __email: string,
    __password: string,
    __stepNumber: number,
    __setStepNumber: Dispatch<SetStateAction<number>>
  ) => (dispatch: Dispatch<Error.getErrorAction>) => void;

  export type registerUserDispatchTypes =
    | Error.clearErrorAction
    | Error.getErrorAction
    | Auth.registerUserDispatch;

  export type registerUserSecondStepType = (
    __user: User
  ) => (dispatch: Dispatch<registerUserDispatchTypes>) => Promise<void>;
}

export default Auth;
