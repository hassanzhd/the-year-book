import Head from "next/head";
import MainContent from "@components/Feed/MainContent";
import Auth, { ensureAuthenticated } from "components/Auth";

const Feed = () => {
  return (
    <>
      <Head>
        <title>Feed | The Year Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Auth redirectUrl="/" redirectHandler={ensureAuthenticated}>
        <MainContent />
      </Auth>
    </>
  );
};

export default Feed;
