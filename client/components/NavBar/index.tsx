import MainContentStyling from "./MainContent.module.scss";
import Link from "next/link";
import { getStyleString } from "@helpers/utility";

const MainContent = () => {
  return (
    <nav className={getStyleString(MainContentStyling.mainNav, "flex")}>
      <h1>
        <Link href="/">The Year Book</Link>
      </h1>
    </nav>
  );
};

export default MainContent;
