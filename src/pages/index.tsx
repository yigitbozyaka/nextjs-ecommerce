import Head from "next/head";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Home/Hero";
import Process from "@/components/Home/Process";
import FeaturedRvs from "@/components/Home/FeaturedRvs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>HighwayHomes | #1 RV Seller</title>
        <meta name="description" content="At HighwayHomes, we're dedicated to streamlining the RV buying experience for you. Contact us today to kickstart your RV purchase and set off on your next adventure with ease!" />
        <meta name="keywords" content="rv, rvs, luxury rv, cheap rv, modern rv" />
        <meta property="og:url" content="https://highwayhomes.store/" />
        <meta property="og:title" content="HighwayHomes" />
        <meta property="og:description" content="At HighwayHomes, we're dedicated to streamlining the RV buying experience for you. Contact us today to kickstart your RV purchase and set off on your next adventure with ease!" />
      </Head>

      <Navbar />

      <section id="featuredrvs">
        <FeaturedRvs />
      </section>

      <section id="hero">
        <Hero />
      </section>

      <section id="process">
        <Process />
      </section>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
