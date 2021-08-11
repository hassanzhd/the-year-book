import MainContentStyling from "./MainContent.module.scss";
import NavBar from "@components/NavBar";
import { getStyleString } from "@helpers/utility";
import SettingEntry from "./SettingEntry";
import SettingsButton from "@components/SettingButton";
import { connect, InferThunkActionCreatorType } from "react-redux";
import { ApplicationState } from "redux/reducers";
import { logoutUser } from "redux/actions/authActions";
import Auth from "redux/interfaces/auth";

interface componentPropType {
  logoutUser: InferThunkActionCreatorType<Auth.logoutUser>;
}

const handleLogoutOnClick = () => {
  logoutUser();
};

const MainContent: React.FC<componentPropType> = ({ logoutUser }) => {
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
          <button
            onClick={handleLogoutOnClick}
            className={MainContentStyling.button}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: ApplicationState) => ({});

export default connect(mapStateToProps, { logoutUser })(MainContent);
