import Head from "next/head";
import MainContent from "@components/Home/MainContent";
import { useEffect } from "react";
import { store } from "redux/store";
import { clearError } from "redux/actions/errorActions";
import { GetServerSideProps } from "next";
import { GetServerSidePropsResult } from "API/auth";

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
      <MainContent />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const handler = new GetServerSidePropsResult(context.req.cookies.accessToken);
  const result = await handler.forwardAuthentication();
  return result;
};
