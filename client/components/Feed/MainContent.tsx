import MainContentStyling from "./MainContent.module.scss";
import NavBar from "@components/NavBar";
import { getStyleString } from "@helpers/utility";

const MainContent = () => {
  return (
    <>
      <NavBar />
      <div className="others flex">
        <button className="button">&#9776;</button>
      </div>
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
