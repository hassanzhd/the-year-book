import Head from "next/head";
import MainContent from "@components/Register/MainContent";
import RegisterProvider from "@components/Register/RegisterContext";
import { useEffect } from "react";
import { store } from "redux/store";
import { clearError } from "redux/actions/errorActions";

export default function Register() {
  useEffect(() => {
    store.dispatch(clearError());
  }, []);
  return (
    <>
      <Head>
        <title>The Year Book | Register your account</title>
        <meta
          name="description"
          content="Register your account into the year book"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RegisterProvider>
        <MainContent />
      </RegisterProvider>
    </>
  );
}
