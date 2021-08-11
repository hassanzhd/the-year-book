import MainContentStyling from "./MainContent.module.scss";
import NavBar from "@components/NavBar";
import { getStyleString } from "@helpers/utility";
import SettingEntry from "./SettingEntry";
import SettingsButton from "@components/SettingButton";

const MainContent = () => {
  const settingAttributes: Array<string> = [
    "Handle",
    "Full Name",
    "Batch",
    "Short Bio",
  ];

  return (
    <>
      <NavBar />
      <SettingsButton />
      <div className="flex">
        <h1>Settings</h1>
      </div>
      <div className={getStyleString(MainContentStyling.settings, "flex")}>
        {settingAttributes.map((value: string, index: number) => (
          <SettingEntry key={index} attributeName={value} />
        ))}
        <div className={MainContentStyling.otherSettings}>
          <button className={MainContentStyling.button}>
            Change your password
          </button>

          <button className={MainContentStyling.button}>
            Delete your account
          </button>
          <button className={MainContentStyling.button}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default MainContent;
