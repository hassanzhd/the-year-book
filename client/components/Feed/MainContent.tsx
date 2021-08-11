import MainContentStyling from "./MainContent.module.scss";
import NavBar from "@components/NavBar";
import SettingsButton from "@components/SettingButton";

import { getStyleString } from "@helpers/utility";

const MainContent = () => {
  return (
    <>
      <NavBar />
      <SettingsButton />
      <form className={getStyleString(MainContentStyling.searchForm, "flex")}>
        <input placeholder="Search using user handle" type="text" required />
        <button className="button" type="submit">
          Search
        </button>
      </form>
    </>
  );
};

export default MainContent;
