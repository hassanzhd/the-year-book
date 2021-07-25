import { useContext, useState } from "react";
import { Alert } from "react-bootstrap";
import { Step1Validator } from "./Step1.validator";
import { InputField, InputFieldAttributes } from "@components/Form/Field";
import { registerContext, registerContextI } from "./RegisterContext";

const Step1 = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");

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
    const validator = new Step1Validator();
    try {
      if (validator.isValid(email.state, password.state)) {
        stepNumber.setter(stepNumber.state + 1);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
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

export default Step1;
