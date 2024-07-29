import Head from "next/head";
import Navbar from "@/components/Navbar";
import RvContainer from "@/components/ProductPage/RvContainer";
import { Toaster } from "react-hot-toast";

export default function All() {
  return (
    <>
      <Head>
        <title>HighwayHomes | All RV&apos;s</title>
        <meta name="description" content="Explore our selection of luxury RVs for sale. Discover top-quality RV models with spacious interiors and modern amenities. Contact us for pricing and availability today." />
        <meta name="keywords" content="rv, rvs, luxury rv, cheap rv, modern rv" />
        <meta property="og:title" content="HighwayHomes | All RV's" />
        <meta property="og:url" content="https://highwayhomes.store/rvs/all" />
        <meta property="og:description" content="Explore our selection of luxury RVs for sale. Discover top-quality RV models with spacious interiors and modern amenities. Contact us for pricing and availability today." />
      </Head>

      <Navbar />

      <Toaster />

      <section id="rvs">
        <RvContainer />
      </section>
    </>
  );
}
