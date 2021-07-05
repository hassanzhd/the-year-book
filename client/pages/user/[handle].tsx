import Head from "next/head";
import MainContent from "@components/User/MainContent";

export default function Home({ handle }: { handle: string }) {
  return (
    <>
      <Head>
        <title> {handle} | The Year Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainContent />
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
