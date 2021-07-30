import { Dispatch } from "react";
import Error from "./error";

namespace Auth {
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
}

export default Auth;
