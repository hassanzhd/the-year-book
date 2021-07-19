import MainContentStyling from "./MainContent.module.scss";
import { getStyleString } from "@helpers/utility";

const MainContent = ({ children }: { children: any }) => {
  return (
    <form className={getStyleString(MainContentStyling.loginForm, "flex")}>
      {children}
    </form>
  );
};

export default MainContent;
