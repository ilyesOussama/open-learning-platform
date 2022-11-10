import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Open Learning Platform</title>
        <meta
          name="description"
          content="Open source, free learning platform"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>Open Learning Platform</main>
    </div>
  );
};

export default Home;
