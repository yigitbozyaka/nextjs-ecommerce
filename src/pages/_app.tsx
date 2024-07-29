import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import { Router } from "next/router";
import Loading from "@/components/Loading";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleComplete = () => {
      setIsLoading(false);
    };

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
    };
  }, []);
  return (
    <>
      <Script src="../path/to/flowbite/dist/flowbite.min.js"></Script>
      <Script src="//code.tidio.co/osxxjhgckxek7jkt0lqpkvo7lxk1nylw.js" async></Script>

      <main className={`bg-[#ECF2FF] ${poppins.className}`}>
        <SessionProvider session={session}>
          {isLoading ? <Loading /> : <Component {...pageProps} />}
        </SessionProvider>
      </main>
    </>
  );
}

export default App;
