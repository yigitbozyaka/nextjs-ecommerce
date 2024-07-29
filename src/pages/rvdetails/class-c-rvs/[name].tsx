import Head from "next/head";
import Navbar from "@/components/Navbar";
import ImageGallery from "react-image-gallery";
import {
  ShareIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { BiBed } from "react-icons/bi";
import { TfiLayoutSliderAlt, TfiRulerAlt } from "react-icons/tfi";
import { LiaWeightSolid } from "react-icons/lia";
import { FaCaravan } from "react-icons/fa";
import { BsSpeedometer2, BsFuelPump } from "react-icons/bs";
import useSWR from "swr";
import axios from "axios";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button, Modal } from "flowbite-react";
import FooterSection from "@/components/Footer";

type RvDetails = {
  id: string;
  price: number;
  year: number;
  make: string;
  model: string;
  type: string;
  status: string;
  length: string;
  odometer: number;
  weight: number;
  sleeps: number;
  fuelType: string;
  slideOuts: number;
  imgCount: number;
  description1: string;
  description2: string;
  description3: string;
  description4: string;
  images: string;
  createdAt: Date;
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function ClassC() {
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();
  const slug = (router.query.name as string) || "undefined";
  const { data, isLoading } = useSWR(`/api/rvs/details?slug=${slug}`, fetcher);

  if (isLoading) return <Loading />;

  const rvDetails: RvDetails = data.data;

  const images = [];

  const img = rvDetails.id;

  for (let i = 1; i <= rvDetails.imgCount; i++) {
    images.push({
      original: `/${img}/_${i}.jpg`,
      thumbnail: `/${img}/_${i}.jpg`,
    });
  }

  const orderedRv = {
    id: rvDetails.id,
    name: `${rvDetails.year} ${rvDetails.make} & ${rvDetails.model}`,
    price: rvDetails.price,
  };

  const handleSubmit = async () => {
    try {
      toast.loading("Ordering your RV...", {
        style: {
          width: "500px",
          border: "2px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        duration: 5000,
      });
      const res = await axios.post("/api/rvs/order", { orderedRv });
      toast.success("Order placed! Redirecting you to checkout page...", {
        style: {
          width: "500px",
          border: "2px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        duration: 5000,
      });
      window.location.href = res.data.checkout;
    } catch (error) {
      toast.dismiss();
      console.log(error);
      toast.error(
        "Something went wrong while ordering your RV. Please try again later."
      );
    }
  };

  function formatNumberWithCommas(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const editedType = rvDetails.type.toLowerCase().replaceAll(" ", "-");

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${rvDetails.year} ${rvDetails.make} & ${rvDetails.model}`,
        text: `Check out this Rv!`,
        url: `${process.env.NEXT_PUBLIC_URL}/rvdetails/${editedType}-rvs/${slug}`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>
          {rvDetails.year} {rvDetails.make} & {rvDetails.model} | HighwayHomes
        </title>
        <meta name="description" content={`Check more about ${rvDetails.year} ${rvDetails.make} & ${rvDetails.model} RV Model.`} />
        <meta name="keywords" content={`rv, rvs, luxury rv, cheap rv, modern rv, ${rvDetails.make} & ${rvDetails.model}, ${rvDetails.make}, ${rvDetails.model}`} />
        <meta property="og:url" content={`https://highwayhomes.store/rvdetails/class-c-rvs/${slug}`} />
        <meta property="og:title" content={`${rvDetails.year} ${rvDetails.make} & ${rvDetails.model} | HighwayHomes`} />
        <meta property="og:description" content={`Check more about ${rvDetails.year} ${rvDetails.make} & ${rvDetails.model} RV Model.`} />
      </Head>

      <Navbar />

      <Toaster />

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <ul className="space-y-6">
            <li>
              <h4 className="font-bold">1.ACCEPTANCE OF TERMS</h4>
              <p>
                By purchasing an RV from HighwayHomes, you agree to and accept the following terms and conditions.
              </p>
            </li>
            <li>
              <h4 className="font-bold">2.DESCRIPTION OF PRODUCTS</h4>
              <p>
                HighwayHomes sells recreational vehicles (RVs) with specifications and features as described on our website or in promotional materials.
              </p>
            </li>
            <li>
              <h4 className="font-bold">3.PRICING AND TAXES</h4>
              <p>
                Prices for RVs are listed on our website and may be subject to applicable taxes. Additional fees or charges may apply; details will be provided during the purchase process.
              </p>
            </li>
            <li>
              <h4 className="font-bold">4.CANCELLATION AND REFUND POLICY</h4>
              <p>
                Cancellation is subject to our cancellation policy outlined on our website. Refunds, if applicable, will be processed according to the terms specified.
              </p>
            </li>
            <li>
              <h4 className="font-bold">5.DELIVERY AND SHIPPING</h4>
              <p>
                Delivery times and methods will be communicated during the purchase process. HighwayHomes is not responsible for damages during transit; buyers should inspect the RV upon delivery.
              </p>
            </li>
            <li>
              <h4 className="font-bold">6.CUSTOMER RESPONSIBILITIES</h4>
              <p>
                Buyers are responsible for providing accurate information during the purchase process.
              </p>
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <button className="bg-orange-400 duration-300 hover:bg-orange-500 text-white px-4 py-2 rounded-lg font-medium" onClick={handleSubmit}>I accept</button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="min-h-screen flex flex-col items-center justify-evenly py-32">
        <div className="w-full flex flex-col gap-10 lg:gap-0 lg:flex-row justify-evenly items-center lg:items-start">
          <div className="max-w-xs lg:max-w-xl">
            <ImageGallery items={images} />
          </div>

          <div className="min-w-[20rem] md:min-w-[24rem] max-w-6xl border-t-2 pt-8 lg:pt-0 lg:border-0">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col">
                <div className="text-lg font-bold text-orange-400 uppercase">
                  {rvDetails.status}
                </div>
                <div className="uppercase max-w-xs text-gray-500">
                  {rvDetails.make} & {rvDetails.model}
                </div>
              </div>

              <div className="flex flex-row gap-2">
                <ShareIcon className="h-6 w-6 cursor-pointer" onClick={handleShare} />
              </div>
            </div>

            <div className="flex flex-row justify-between my-10">
              <div className="flex flex-col">
                <div className="text-lg">Sale Price</div>
                <div className="font-bold text-2xl">${formatNumberWithCommas(rvDetails.price)}.00</div>
              </div>
              <div className="flex flex-col">
                <div className="text-lg">Year</div>
                <div className="font-bold text-2xl">{rvDetails.year}</div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleSubmit}
                className="bg-orange-400 duration-300 hover:bg-orange-500/80 text-white rounded-lg py-2 text-lg"
              >
                Order Now
              </button>
              <a
                href="#description"
                className="text-center border-2 border-orange-400 duration-300 hover:bg-orange-500/10 text-black rounded-lg py-2 text-lg"
              >
                More Information
              </a>

              <div className="mt-6 text-sm grid grid-cols-2 lg:grid-cols-3 gap-2">
                <div className="flex flex-col items-center text-center">
                  <TfiRulerAlt className="h-6 w-6" />
                  <p>Length (ft)</p>
                  <p className="font-bold">{rvDetails.length}</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <LiaWeightSolid className="h-6 w-6" />
                  <p>Weight (lbs)</p>
                  <p className="font-bold">{rvDetails.weight}</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <TfiLayoutSliderAlt className="h-6 w-6" />
                  <p>Slide Outs</p>
                  <p className="font-bold">{rvDetails.slideOuts}</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <BiBed className="h-6 w-6" />
                  <p>Sleeps</p>
                  <p className="font-bold">{rvDetails.sleeps}</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <BsSpeedometer2 className="h-6 w-6" />
                  <p>Odometer (mile)</p>
                  <p className="font-bold">{rvDetails.odometer}</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <BsFuelPump className="h-6 w-6" />
                  <p>Fuel type</p>
                  <p className="font-bold">{rvDetails.fuelType}</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <FaCaravan className="h-6 w-6" />
                  <p>Type</p>
                  <p className="font-bold">{rvDetails.type}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {rvDetails.description1 && (
        <div
          className="mx-6 xl:mx-0 flex flex-col items-center justify-center"
          id="description"
        >
          <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-16 items-center my-6 lg:items-start justify-evenly">
            <div className="w-full flex flex-col items-start gap-10">
              <div className="flex flex-col">
                <h3 className="text-xl text-orange-400 font-medium">
                  Description
                </h3>
                <h4 className="text-3xl font-bold">Learn more about this RV</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-700">
                {rvDetails.description1 && (
                  <div>
                    <ChevronRightIcon className="h-4 w-4 inline-block" />{" "}
                    {rvDetails.description1}
                  </div>
                )}
                {rvDetails.description2 && (
                  <div>
                    <ChevronRightIcon className="h-4 w-4 inline-block" />{" "}
                    {rvDetails.description2}
                  </div>
                )}
                {rvDetails.description3 && (
                  <div>
                    <ChevronRightIcon className="h-4 w-4 inline-block" />{" "}
                    {rvDetails.description3}
                  </div>
                )}
                {rvDetails.description4 && (
                  <div>
                    <ChevronRightIcon className="h-4 w-4 inline-block" />{" "}
                    {rvDetails.description4}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <footer>
        <FooterSection />
      </footer>
    </>
  );
}
