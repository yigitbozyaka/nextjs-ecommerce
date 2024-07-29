import Head from "next/head";
import Navbar from "@/components/Navbar";
import AboutUs from "@/components/Home/AboutUs";
import FooterSection from "@/components/Footer";

export default function About() {
  return (
    <>
      <Head>
        <title>HighwayHomes | About Us</title>
        <meta name="description" content="At HighwayHomes, we're dedicated to streamlining the RV buying experience for you. Contact us today to kickstart your RV purchase and set off on your next adventure with ease!" />
        <meta name="keywords" content="rv, rvs, luxury rv, cheap rv, modern rv" />
        <meta property="og:url" content="https://highwaystore.com/about" />
        <meta property="og:title" content="HighwayHomes | About Us" />
        <meta property="og:description" content="At HighwayHomes, we're dedicated to streamlining the RV buying experience for you. Contact us today to kickstart your RV purchase and set off on your next adventure with ease!" />
      </Head>

      <Navbar />
      <AboutUs />

      <footer>
        <FooterSection />
      </footer>
    </>
  );
}
