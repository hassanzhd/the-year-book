import Head from "next/head";
import MainContent from "@components/Register/MainContent";
import RegisterProvider from "@components/Register/RegisterContext";

export default function Register() {
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
