import { useContext } from "react";
import MainContentStyling from "./MainContent.module.scss";
import { getStyleString } from "@helpers/utility";
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
import { connect, InferThunkActionCreatorType } from "react-redux";
import Auth from "redux/interfaces/auth";
import { registerUserSecondStep } from "redux/actions/authActions";
import { ApplicationState } from "redux/reducers";

interface componentPropType {
  errorMessage: string;
  successMessage: string;
  registerUserSecondStep: InferThunkActionCreatorType<Auth.registerUserSecondStepType>;
}

const Step2: React.FC<componentPropType> = ({
  errorMessage,
  successMessage,
  registerUserSecondStep,
}) => {
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
    const a = registerUserSecondStep({
      email: email.state,
      password: password.state,
      handle: handle.state,
      fullName: fullName.state,
      university: university.state,
      batch: batch.state,
      shortBio: shortBio.state,
      image: image.state,
    });
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

const mapStateToProps = (state: ApplicationState) => ({
  errorMessage: state.error.message,
  successMessage: state.auth.successMessage,
});

export default connect(mapStateToProps, { registerUserSecondStep })(Step2);
