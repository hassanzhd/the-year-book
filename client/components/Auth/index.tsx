import Router from "next/router";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ApplicationState } from "redux/reducers";
import { CenterSpinner } from "@components/Spinner";

export const ensureAuthenticated = (
  __isLoading: boolean,
  __isAuthenticated: boolean,
  __redirectUrl: string
) => {
  if (!__isAuthenticated && !__isLoading) {
    Router.push(__redirectUrl);
  }
  return __isAuthenticated && !__isLoading;
};

export const forwardAuthenticated = (
  __isLoading: boolean,
  __isAuthenticated: boolean,
  __redirectUrl: string
) => {
  if (__isAuthenticated && !__isLoading) {
    Router.push(__redirectUrl);
  }
  return !__isAuthenticated && !__isLoading;
};

interface pageProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  children: any;
  redirectUrl: string;
  redirectHandler: (
    __isLoading: boolean,
    __isAuthenticated: boolean,
    __redirectUrl: string
  ) => boolean;
}

const Auth: React.FC<pageProps> = ({
  isAuthenticated,
  isLoading,
  children,
  redirectUrl,
  redirectHandler,
}) => {
  const [shouldRenderChildren, setShouldRenderChildren] =
    useState<boolean>(false);

  useEffect(() => {
    setShouldRenderChildren(
      redirectHandler(isLoading, isAuthenticated, redirectUrl)
    );
  }, [isLoading, isAuthenticated]);

  if (shouldRenderChildren) {
    return <>{children}</>;
  }
  return <CenterSpinner />;
};

const mapStateToProps = (state: ApplicationState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, {})(Auth);
