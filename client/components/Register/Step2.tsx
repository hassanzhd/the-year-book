import { useContext, useState } from "react";
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
import { registerContextI, registerContext } from "./RegisterContext";
import { useRouter } from "next/router";

const Step2 = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const router = useRouter();

  const {
    stepNumber,
    email,
    password,
    handle,
    fullName,
    university,
    batch,
    shortBio,
    image,
  } = useContext<registerContextI>(registerContext);

  const handleFieldAttributes = new InputFieldAttributes({
    onChange: (event: any) => {
      handle.setter(event.target.value);
    },
    id: "handle",
    value: handle.state,
    type: "text",
    placeHolder: "Enter your handle",
  });

  const fullNameFieldAttributes = new InputFieldAttributes({
    onChange: (event: any) => {
      fullName.setter(event.target.value);
    },
    id: "fullName",
    value: fullName.state,
    type: "text",
    placeHolder: "Enter your full name",
  });

  const universityFieldAttributes = new InputFieldAttributes({
    onChange: (event: any) => {
      university.setter(event.target.value);
    },
    id: "university",
    value: university.state,
    type: "text",
    placeHolder: "Enter your university",
  });

  const batchFieldAttributes = new InputFieldAttributes({
    onChange: (event: any) => {
      batch.setter(event.target.value);
    },
    id: "batch",
    value: batch.state,
    type: "text",
    placeHolder: "Enter your batch",
  });

  const shortBioFieldAttributes = new TextAreaFieldAttributes({
    onChange: (event: any) => {
      shortBio.setter(event.target.value);
    },
    id: "shortBio",
    placeHolder: "Enter your short bio",
  });

  const imageFieldAttributes = new ImageFieldAttiributes({
    onChange: (event: any) => {
      image.setter(event.target.files[0]);
    },
    type: "file",
  });

  const previousStep = () => {
    password.setter("");
    handle.setter("");
    fullName.setter("");
    university.setter("");
    batch.setter("");
    shortBio.setter("");
    image.setter(undefined);
    stepNumber.setter(stepNumber.state - 1);
  };

  const nextStep = async (event: any) => {
    event.preventDefault();
    const validator = new Step2Validator();

    try {
      if (
        validator.isValid(
          handle.state,
          fullName.state,
          university.state,
          batch.state,
          shortBio.state,
          image.state
        )
      ) {
        const formData = new FormData();
        formData.append("email", email.state);
        formData.append("password", password.state);
        formData.append("handle", handle.state);
        formData.append("fullName", fullName.state);
        formData.append("university", university.state);
        formData.append("batch", batch.state);
        formData.append("shortBio", shortBio.state);
        formData.append("file", image.state);

        const response = await fetch("http://localhost:5000/user/register", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message[0]);
        }

        const data = await response.json();
        setErrorMessage("");
        setSuccessMessage(data.message);

        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : ""}
      {successMessage ? <Alert variant="success">{successMessage}</Alert> : ""}
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
        <button
          id="previousButton"
          onClick={previousStep}
          type="submit"
          className="button"
        >
          Previous
        </button>
        <button id="registerButton" onClick={nextStep} className="button">
          Register
        </button>
      </div>
    </>
  );
};

export default Step2;
