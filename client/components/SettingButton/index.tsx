import Router from "next/router";
import MainContentStyling from "./MainContent.module.scss";
import { getStyleString } from "@helpers/utility";

const handleOnClick = () => {
  Router.push("/settings");
};

const MainContent = () => {
  return (
    <div className={getStyleString(MainContentStyling.others, "flex")}>
      <button
        onClick={handleOnClick}
        className={getStyleString(MainContentStyling.button, "button")}
      >
        &#9776;
      </button>
    </div>
  );
};

export default MainContent;
