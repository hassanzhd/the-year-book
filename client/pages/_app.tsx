import "@styles/globals.scss";
import { store } from "../redux/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { loadUser } from "redux/actions/authActions";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    store.dispatch(loadUser() as any);
  }, []);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
