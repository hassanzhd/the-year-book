import SpinnerStyling from "./Spinner.module.scss";
import { Spinner } from "react-bootstrap";

export const CenterSpinner = () => {
  return (
    <div className={SpinnerStyling.container}>
      <Spinner animation="border" />
    </div>
  );
};
