import { useContext } from "react";
import { Alert } from "react-bootstrap";
import { InputField, InputFieldAttributes } from "@components/Form/Field";
import { registerContext, registerContextI } from "./RegisterContext";
import { ApplicationState } from "redux/reducers";
import { connect, InferThunkActionCreatorType } from "react-redux";
import { registerUserNextStep } from "redux/actions/authActions";
import Auth from "redux/interfaces/auth";

interface componentPropType {
  errorMessage: string;
  registerUserNextStep: InferThunkActionCreatorType<Auth.registerUserNextStepType>;
}

const Step1: React.FC<componentPropType> = ({
  errorMessage,
  registerUserNextStep,
}) => {
  const { stepNumber, email, password } =
    useContext<registerContextI>(registerContext);

  const emailFieldAttributes = new InputFieldAttributes({
    onChange: (event: any) => {
      email.setter(event.target.value);
    },
    id: "email",
    value: email.state,
    type: "text",
    placeHolder: "Enter your Email",
  });

  const passwordFieldAttributes = new InputFieldAttributes({
    onChange: (event: any) => {
      password.setter(event.target.value);
    },
    id: "password",
    value: password.state,
    type: "password",
    placeHolder: "Enter your Password",
  });

  const nextStep = () => {
    registerUserNextStep(
      email.state,
      password.state,
      stepNumber.state,
      stepNumber.setter
    );
  };

  return (
    <>
      {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : " "}
      <InputField attributes={emailFieldAttributes} />
      <InputField attributes={passwordFieldAttributes} />
      <button
        id="nextButton"
        onClick={nextStep}
        type="button"
        className="button"
      >
        Next
      </button>
    </>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  errorMessage: state.error.message,
});

export default connect(mapStateToProps, { registerUserNextStep })(Step1);
