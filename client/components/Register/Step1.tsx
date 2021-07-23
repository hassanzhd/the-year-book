import { Dispatch, SetStateAction, useState } from "react";
import { Alert } from "react-bootstrap";
import { Step1Validator } from "./Step1.validator";

const Step1 = ({
  stepNumber,
  setStepNumber,
}: {
  stepNumber: number;
  setStepNumber: Dispatch<SetStateAction<number>>;
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <>
      {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : " "}
      <input
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        value={email}
        type="text"
        placeholder="Enter your Email"
      />
      <input
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        value={password}
        type="password"
        placeholder="Enter your Password"
      />
      <button
        onClick={() => {
          const validator = new Step1Validator();
          try {
            if (validator.isValid(email, password)) {
              setStepNumber(stepNumber + 1);
            }
          } catch (error) {
            setErrorMessage(error.message);
          }
        }}
        type="button"
        className="button"
      >
        Next
      </button>
    </>
  );
};

export default Step1;
