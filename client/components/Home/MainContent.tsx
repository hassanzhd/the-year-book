import MainContentStyling from "./MainContent.module.scss";

const MainContent = () => {
  return (
    <>
      <header className={`${MainContentStyling.mainHeading} flex`}>
        <h1>
          <a href="#">The Year Book</a>
        </h1>
        <h2>Login into your account.</h2>
      </header>
      <form className={`${MainContentStyling.loginForm} flex`}>
        <input type="text" placeholder="Enter your Email" required />
        <input type="password" placeholder="Enter your Password" required />
        <button type="submit" className="btn">
          Login
        </button>
      </form>
      <div className="flex">
        <button className="btn">Sign up</button>
      </div>
    </>
  );
};

export default MainContent;
