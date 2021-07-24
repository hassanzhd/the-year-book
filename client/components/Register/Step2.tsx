import { useState } from "react";
import MainContentStyling from "./MainContent.module.scss";
import { getStyleString, StateWrapper } from "@helpers/utility";
import { Step2Validator } from "./Step2Validator";
import { Alert } from "react-bootstrap";
import {
  InputFieldAttributes,
  TextAreaFieldAttributes,
  ImageFieldAttiributes,
  InputField,
  TextAreaField,
  ImageField,
} from "@components/Form/Field";

const Step2 = ({ stepNumber }: { stepNumber: StateWrapper }) => {
  const [handle, setHandle] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [university, setUniversity] = useState<string>("");
  const [batch, setBatch] = useState<number>(0);
  const [shortBio, setShortBio] = useState<string>("");
  const [image, setImage] = useState<File>();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleFieldAttributes = new InputFieldAttributes({
    onChange: (event: any) => {
      setHandle(event.target.value);
    },
    type: "text",
    placeHolder: "Enter your handle",
  });

  const fullNameFieldAttributes = new InputFieldAttributes({
    onChange: (event: any) => {
      setFullName(event.target.value);
    },
    type: "text",
    placeHolder: "Enter your full name",
  });

  const universityFieldAttributes = new InputFieldAttributes({
    onChange: (event: any) => {
      setUniversity(event.target.value);
    },
    type: "text",
    placeHolder: "Enter your university",
  });

  const batchFieldAttributes = new InputFieldAttributes({
    onChange: (event: any) => {
      setBatch(event.target.value);
    },
    type: "text",
    placeHolder: "Enter your batch",
  });

  const shortBioFieldAttributes = new TextAreaFieldAttributes({
    onChange: (event: any) => {
      setShortBio(event.target.value);
    },
    placeHolder: "Enter your short bio",
  });

  const imageFieldAttributes = new ImageFieldAttiributes({
    onChange: (event: any) => {
      setImage(event.target.value);
    },
    type: "file",
  });

  const previousStep = () => {
    stepNumber.setter(stepNumber.state - 1);
  };

  const nextStep = (event: any) => {
    event.preventDefault();
    const validator = new Step2Validator();

    try {
      if (
        validator.isValid(handle, fullName, university, batch, shortBio, image)
      ) {
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : ""}
      <InputField attributes={handleFieldAttributes} />
      <InputField attributes={fullNameFieldAttributes} />
      <InputField attributes={universityFieldAttributes} />
      <InputField attributes={batchFieldAttributes} />
      <TextAreaField attributes={shortBioFieldAttributes} />
      <div className={getStyleString(MainContentStyling.imageInput, "flex")}>
        <label> Select your year book image:</label>
        <ImageField attributes={imageFieldAttributes} />
      </div>
      <div>
        <button onClick={previousStep} type="submit" className="button">
          Previous
        </button>
        <button onClick={nextStep} className="button">
          Register
        </button>
      </div>
    </>
  );
};

export default Step2;
