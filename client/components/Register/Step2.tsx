import { Dispatch, SetStateAction } from "react";
import MainContentStyling from "./MainContent.module.scss";
import { getStyleString } from "@helpers/utility";

const Step2 = ({
  stepNumber,
  setStepNumber,
}: {
  stepNumber: number;
  setStepNumber: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <>
      <input type="text" placeholder="Enter your handle" required />
      <input type="text" placeholder="Enter your full name" required />
      <input type="text" placeholder="Enter your batch" required />
      <textarea placeholder="Enter a short bio" required />
      <div className={getStyleString(MainContentStyling.imageInput, "flex")}>
        <label> Select your year book image:</label>
        <input type="file" required />
      </div>
      <div>
        <button
          onClick={() => {
            setStepNumber(stepNumber - 1);
          }}
          type="submit"
          className="btn"
        >
          Previous
        </button>
        <button type="submit" className="btn">
          Register
        </button>
      </div>
    </>
  );
};

export default Step2;
