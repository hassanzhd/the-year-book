import Head from "next/head";
import MainContent from "@components/Feed/MainContent";

export default function Feed() {
  return (
    <>
      <Head>
        <title>Feed | The Year Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainContent />
    </>
  );
}
