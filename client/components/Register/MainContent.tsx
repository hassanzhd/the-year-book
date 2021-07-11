import { Dispatch, ReactElement, SetStateAction, useState } from "react";
import MainContentStyling from "./MainContent.module.scss";
import { getStyleString } from "@helpers/utility";
import Form from "@components/Form";
import Step1 from "./Step1";
import Step2 from "./Step2";

const getStepDivs = (__numberOfSteps: number, __stepNumber: number) => {
  let stepDivs: ReactElement<any, any>[] = [];

  for (let i = 0; i < __numberOfSteps; i++) {
    if (i == __stepNumber) {
      stepDivs.push(
        <span
          key={i}
          className={getStyleString(
            MainContentStyling.step,
            MainContentStyling.active
          )}
        />
      );
    } else {
      stepDivs.push(<span key={i} className={MainContentStyling.step} />);
    }
  }
  return stepDivs;
};

const MainContent = () => {
  const [stepNumber, setStepNumber]: [
    stepNumber: number,
    setStepNumber: Dispatch<SetStateAction<number>>
  ] = useState(0);

  return (
    <>
      <header
        className={getStyleString(MainContentStyling.mainHeading, "flex")}
      >
        <h1>
          <a href="#">The Year Book</a>
        </h1>
        <h2>Register your account.</h2>
      </header>
      <Form>
        {stepNumber === 0 ? (
          <Step1 stepNumber={stepNumber} setStepNumber={setStepNumber} />
        ) : (
          <Step2 stepNumber={stepNumber} setStepNumber={setStepNumber} />
        )}
        <div className={getStyleString(MainContentStyling.steps, "flex")}>
          {getStepDivs(2, stepNumber)}
        </div>
      </Form>
    </>
  );
};

export default MainContent;
