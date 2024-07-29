import Head from "next/head"
import Navbar from "@/components/Navbar"
import FooterSection from "@/components/Footer"
import Link from "next/link"

export default function Success() {
    return (
        <>
            <Head>
                <title>HighwayHomes | Order success!</title>
                <meta name="description" content="At HighwayHomes, we're dedicated to streamlining the RV buying experience for you. Contact us today to kickstart your RV purchase and set off on your next adventure with ease!" />
                <meta name="keywords" content="rv, rvs, luxury rv, cheap rv, modern rv" />
                <meta property="og:url" content="https://highwayhomes.store/success" />
                <meta property="og:title" content="HighwayHomes" />
                <meta property="og:description" content="At HighwayHomes, we're dedicated to streamlining the RV buying experience for you. Contact us today to kickstart your RV purchase and set off on your next adventure with ease!" />
            </Head>

            <Navbar />

            <div className="min-h-screen flex">
                <div className="flex-grow flex flex-col justify-center items-center">
                    <div className="max-w-xl text-center">
                        <h3 className="text-5xl font-bold text-orange-400">Order success!</h3>
                        <p className="text-xl text-gray-900 font-medium my-3">Thank you for your purchase!</p>
                        <p className="text-gray-800 font-medium text-lg my-6">
                            Your order has been placed and is being processed. You will receive an email confirmation shortly.
                        </p>
                    </div>

                    <div className="flex flex-row">
                        <Link className="bg-orange-400 text-white px-4 py-3 rounded-lg font-medium" href="/rvs/all">
                            Search for more RV's
                        </Link>
                        <Link className="bg-gray-900 text-white px-4 py-3 rounded-lg font-medium ml-4" href="/contact">
                            Contact with us
                        </Link>
                    </div>
                </div>
            </div>

            <footer>
                <FooterSection />
            </footer>
        </>
    )
}