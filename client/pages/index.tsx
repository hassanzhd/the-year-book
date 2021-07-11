import Head from "next/head";
import MainContent from "@components/Home/MainContent";

export default function Home() {
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
      <MainContent />
    </>
  );
}
