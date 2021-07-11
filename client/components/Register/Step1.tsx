import { Dispatch, SetStateAction } from "react";

const Step1 = ({
  stepNumber,
  setStepNumber,
}: {
  stepNumber: number;
  setStepNumber: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <>
      <input type="text" placeholder="Enter your Email" required />
      <input type="password" placeholder="Enter your Password" required />
      <button
        onClick={() => {
          setStepNumber(stepNumber + 1);
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
