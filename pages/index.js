import Head from "next/head";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import { NextSeo } from "next-seo";

export default function Home() {
  return (
    <div className="text-black">
      <NextSeo
        title="Home: nine4"
        description="Vester. Transit & Logistics"
        canonical="vester.site"
        openGraph={{
          url: "vester.site",
        }}
      />
      <Head>
        <title>Vester</title>
        <link rel="icon" href="/images/icon.png" />
      </Head>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
