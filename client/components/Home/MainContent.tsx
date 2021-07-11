import MainContentStyling from "./MainContent.module.scss";
import { getStyleString } from "@helpers/utility";
import Form from "@components/Form";

const MainContent = () => {
  return (
    <>
      <header
        className={getStyleString(MainContentStyling.mainHeading, "flex")}
      >
        <h1>
          <a href="#">The Year Book</a>
        </h1>
        <h2>Login into your account.</h2>
      </header>
      <Form>
        <input type="text" placeholder="Enter your Email" required />
        <input type="password" placeholder="Enter your Password" required />
        <button type="submit" className="button">
          Login
        </button>
      </Form>
      <div className="flex">
        <button className="button">Sign up</button>
      </div>
    </>
  );
};

export default MainContent;
