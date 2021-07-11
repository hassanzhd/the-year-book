import Head from "next/head";
import MainContent from "@components/Register/MainContent";

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
      <MainContent />
    </>
  );
}
