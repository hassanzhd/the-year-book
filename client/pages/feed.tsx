import Head from "next/head";
import MainContent from "@components/Feed/MainContent";
import { GetServerSideProps } from "next";
import { GetServerSidePropsResult } from "API/auth";

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const handler = new GetServerSidePropsResult(context.req.cookies.accessToken);
  const result = await handler.ensureAuthenticated();
  return result;
};
