import Head from "next/head";
import MainContent from "@components/User/MainContent";
import Auth, { ensureAuthenticated } from "@components/Auth";

export default function Handle({ handle }: { handle: string }) {
  return (
    <>
      <Head>
        <title> {handle} | The Year Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Auth redirectUrl="/" redirectHandler={ensureAuthenticated}>
        <MainContent />
      </Auth>
    </>
  );
}

export const getServerSideProps = async ({
  params,
}: {
  params: { handle: string };
}) => {
  const handle: string = params.handle;

  return {
    props: {
      handle,
    },
  };
};
