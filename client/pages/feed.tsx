import Head from "next/head";
import MainContent from "@components/Feed/MainContent";
import { connect } from "react-redux";
import { ApplicationState } from "redux/reducers";
import Router from "next/router";
import { useEffect } from "react";

interface pageProps {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const Feed: React.FC<pageProps> = ({ isAuthenticated, isLoading }) => {
  useEffect(() => {
    !isAuthenticated && Router.push("/");
  }, []);

  return (
    <>
      <Head>
        <title>Feed | The Year Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!isLoading && <MainContent />}
    </>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, {})(Feed);
