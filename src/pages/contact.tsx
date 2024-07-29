import Head from "next/head";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/Footer";

export default function Contact() {
  return (
    <>
      <Head>
        <title>HighwayHomes | Contact</title>
        <meta name="description" content="We're here to assist you with any questions, inquiries, or assistance you may need. Please don't hesitate to get in touch with us." />
        <meta property="og:title" content="HighwayHomes | Contact" />
        <meta name="keywords" content="rv, rvs, luxury rv, cheap rv, modern rv" />
        <meta property="og:url" content="https://highwayhomes.store/contact" />
        <meta property="og:description" content="We're here to assist you with any questions, inquiries, or assistance you may need. Please don't hesitate to get in touch with us." />
      </Head>
      <Navbar />

      <div className="min-h-screen flex flex-col justify-center gap-20">
        <div className="flex flex-row items-center justify-center text-center mx-4">
          <div className="flex flex-col items-center">
            <h3 className="text-2xl my-2 font-bold text-orange-400">
              Contact HighwayHomes
            </h3>
            <p className="font-medium text-gray-600 text-base max-w-lg">
              We&apos;re here to assist you with any questions, inquiries, or
              assistance you may need. Please don&apos;t hesitate to get in
              touch with us using the following contact information:
            </p>

            <div className="flex flex-col md:flex-row items-center gap-2 mt-6">
              <div className="flex flex-col items-center">
                <p className="font-bold">Send email</p>
                <a href="mailto:support@highwayhomes.store">
                support@highwayhomes.store
                </a>
              </div>
              <p className="mx-2 text-xl hidden md:block">|</p>
              <div className="flex flex-col items-center">
                <p className="font-bold">Call us</p>
                <a href="tel:49-30-161989682">+49 89 161989682</a>
              </div>
              <p className="mx-2 text-xl hidden md:block">|</p>
              <div className="flex flex-col items-center">
                <p className="font-bold">Live Chat</p>
                <p>Located at the bottom right.</p>
              </div>
            </div>

            <div className="max-w-2xl font-medium mt-8">
              Our friendly and knowledgeable team at HighwayHomes is
              ready to provide you with the information and support you require.
              Whether you&apos;re looking to purchase an RV, have inquiries about our
              services, or simply want to chat about your RV adventure plans,
              we&apos;re just a message or call away. We look forward to hearing from
              you and helping you on your journey to RV ownership and adventure.
            </div>
          </div>
        </div>
      </div>

      <footer>
        <FooterSection />
      </footer>
    </>
  );
}
