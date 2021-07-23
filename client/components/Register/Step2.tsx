import { Dispatch, SetStateAction, useState } from "react";
import MainContentStyling from "./MainContent.module.scss";
import { getStyleString } from "@helpers/utility";
import { Step2Validator } from "./Step2Validator";
import { Alert } from "react-bootstrap";

const Step2 = ({
  stepNumber,
  setStepNumber,
}: {
  stepNumber: number;
  setStepNumber: Dispatch<SetStateAction<number>>;
}) => {
  const [handle, setHandle] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [university, setUniversity] = useState<string>("");
  const [batch, setBatch] = useState<number>(0);
  const [shortBio, setShortBio] = useState<string>("");
  const [image, setImage] = useState<File>();
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <>
      {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : ""}
      <input
        onChange={(event) => {
          setHandle(event.target.value);
        }}
        type="text"
        placeholder="Enter your handle"
      />
      <input
        onChange={(event) => {
          setFullName(event.target.value);
        }}
        type="text"
        placeholder="Enter your full name"
      />
      <input
        onChange={(event) => {
          setUniversity(event.target.value);
        }}
        type="text"
        placeholder="Enter your university"
      />
      <input
        onChange={(event) => {
          setBatch(parseInt(event.target.value));
        }}
        type="text"
        placeholder="Enter your batch"
      />
      <textarea
        onChange={(event) => {
          setShortBio(event.target.value);
        }}
        placeholder="Enter a short bio"
      />
      <div className={getStyleString(MainContentStyling.imageInput, "flex")}>
        <label> Select your year book image:</label>
        <input
          onChange={(event) => {
            const uploadedImage = (event.target.files as FileList)[0];
            setImage(uploadedImage);
          }}
          type="file"
        />
      </div>
      <div>
        <button
          onClick={() => {
            setStepNumber(stepNumber - 1);
          }}
          type="submit"
          className="button"
        >
          Previous
        </button>
        <button
          onClick={(event) => {
            event.preventDefault();
            const validator = new Step2Validator();

            try {
              if (
                validator.isValid(
                  handle,
                  fullName,
                  university,
                  batch,
                  shortBio,
                  image
                )
              ) {
              }
            } catch (error) {
              setErrorMessage(error.message);
            }
          }}
          className="button"
        >
          Register
        </button>
      </div>
    </>
  );
};

export default Step2;
