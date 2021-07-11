import MainContentStyling from "./MainContent.module.scss";
import { getStyleString } from "@helpers/utility";

const MainContent = () => {
  return (
    <nav className={getStyleString(MainContentStyling.mainNav, "flex")}>
      <h1>
        <a href="/"> The Year Book </a>
      </h1>
    </nav>
  );
};

export default MainContent;
