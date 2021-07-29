import Error from "./error";

namespace Auth {
  export interface loginUserDispatch {
    type: "LOGIN_USER";
  }

  export type loginUserDispatchTypes =
    | loginUserDispatch
    | Error.clearErrorAction
    | Error.getErrorAction;
}

export default Auth;
