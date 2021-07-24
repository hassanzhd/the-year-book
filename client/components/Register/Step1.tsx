import { StateWrapper } from "@helpers/utility";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { Step1Validator } from "./Step1.validator";
import { InputField, InputFieldAttributes } from "@components/Form/Field";

const Step1 = ({ stepNumber }: { stepNumber: StateWrapper }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const emailFieldAttributes = new InputFieldAttributes({
    onChange: (event: any) => {
      setEmail(event.target.value);
    },
    type: "text",
    placeHolder: "Enter your Email",
  });

  const passwordFieldAttributes = new InputFieldAttributes({
    onChange: (event: any) => {
      setPassword(event.target.value);
    },
    type: "password",
    placeHolder: "Enter your Password",
  });

  const nextStep = () => {
    const validator = new Step1Validator();
    try {
      if (validator.isValid(email, password)) {
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
      <button onClick={nextStep} type="button" className="button">
        Next
      </button>
    </>
  );
};

export default Step1;
