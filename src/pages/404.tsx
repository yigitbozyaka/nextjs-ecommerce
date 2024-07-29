import Navbar from "@/components/Navbar";
import FooterSection from "@/components/Footer";
import Head from "next/head";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>HighwayHomes | Not Found</title>
        <meta
          name="description"
          content="Page not found :("
        />
        <meta
          name="keywords"
          content="rv, rvs, luxury rv, cheap rv, modern rv"
        />
        <meta property="og:url" content="https://highwayhomes.store/" />
        <meta property="og:title" content="HighwayHomes" />
        <meta
          property="og:description"
          content="Page not found :("
        />
      </Head>

        <Navbar />
        <div>
            <div className="min-h-screen flex flex-col justify-center items-center">
                <div className="max-w-xl text-center">
                    <h3 className="text-5xl font-bold text-orange-400">404</h3>
                    <p className="text-xl text-gray-900 font-medium my-3">Page not found</p>
                    <p className="text-gray-800 font-medium text-lg my-6">
                        The page you're looking for doesn't exist. Please check the URL or go back to the homepage.
                    </p>

                    <div className="flex flex-row items-center justify-center">
                        <Link
                            className="bg-orange-400 text-white px-4 py-3 rounded-lg font-medium"
                            href="/"
                        >
                            Go back to homepage
                        </Link>

                        <Link
                            className="bg-gray-900 text-white px-4 py-3 rounded-lg font-medium ml-4"
                            href="/contact"
                        >
                            Contact with us
                        </Link>
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
