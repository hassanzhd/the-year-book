import Head from "next/head";
import MainContent from "@components/Settings/MainContent";
import Auth, { ensureAuthenticated } from "@components/Auth";

export default function Settings() {
  return (
    <>
      <Head>
        <title>Settings | The Year Book</title>
        <meta
          name="description"
          content="Register your account into the year book"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Auth redirectHandler={ensureAuthenticated} redirectUrl="/">
        <MainContent />
      </Auth>
    </>
  );
}
