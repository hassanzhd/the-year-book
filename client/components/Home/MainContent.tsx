import MainContentStyling from "./MainContent.module.scss";
import { getStyleString } from "@helpers/utility";
import Form from "@components/Form";
import Link from "next/link";
import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { InputField, InputFieldAttributes } from "@components/Form/Field";
import { connect, InferThunkActionCreatorType } from "react-redux";
import { loginUser } from "redux/actions/authActions";
import Auth from "redux/interfaces/auth";
import { ApplicationState } from "redux/reducers";

interface componentPropType {
  errorMessage: string;
  loginUser: InferThunkActionCreatorType<Auth.loginUserType>;
}

const MainContent: React.FC<componentPropType> = ({
  errorMessage,
  loginUser,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const emailFieldAttributes = new InputFieldAttributes({
    onChange: (event: any) => {
      setEmail(event.target.value);
    },
    id: "email",
    value: email,
    type: "text",
    placeHolder: "Enter your Email",
  });

  const passwordFieldAttributes = new InputFieldAttributes({
    onChange: (event: any) => {
      setPassword(event.target.value);
    },
    id: "password",
    value: password,
    type: "password",
    placeHolder: "Enter your Password",
  });

  const onSubmit = async (event: any) => {
    event.preventDefault();
    loginUser(email, password);
  };

  return (
    <>
      <header
        className={getStyleString(MainContentStyling.mainHeading, "flex")}
      >
        <h1>
          <Link href="/">The Year Book</Link>
        </h1>
        <h2>Login into your account.</h2>
      </header>
      <Form>
        {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : ""}
        <InputField attributes={emailFieldAttributes} />
        <InputField attributes={passwordFieldAttributes} />
        <button onClick={onSubmit} type="submit" className="button">
          Login
        </button>
      </Form>
      <div className="flex">
        <button className="button">
          <Link href="/register">Sign up</Link>
        </button>
      </div>
    </>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  errorMessage: state.error.message,
});

export default connect(mapStateToProps, { loginUser })(MainContent);
