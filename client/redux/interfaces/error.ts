namespace Error {
  export interface state {
    message: string;
  }

  export interface getErrorAction {
    type: "GET_ERROR";
    payload: state;
  }

  export interface clearErrorAction {
    type: "CLEAR_ERROR";
  }

  export type getErrorType = (__message: string) => getErrorAction;
  export type clearErrorType = () => clearErrorAction;
}

export default Error;
