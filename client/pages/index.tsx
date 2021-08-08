import Head from "next/head";
import MainContent from "@components/Home/MainContent";
import { useEffect } from "react";
import { store } from "redux/store";
import { clearError } from "redux/actions/errorActions";
import Auth, { forwardAuthenticated } from "components/Auth";

export default function Home() {
  useEffect(() => {
    store.dispatch(clearError());
  }, []);
  return (
    <>
      <Head>
        <title>The Year Book | Login or Sign up </title>
        <meta
          name="description"
          content="Log into the year book, to create and sign year books."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Auth redirectUrl="/feed" redirectHandler={forwardAuthenticated}>
        <MainContent />
      </Auth>
    </>
  );
}
