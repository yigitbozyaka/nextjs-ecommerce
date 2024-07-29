import Image from "next/image";
import { ChevronRightIcon, FaceSmileIcon, HandThumbUpIcon, PlusIcon, ShieldCheckIcon, TruckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function Hero() {
  return (
    <>
      <div className="min-h-[70vh] flex flex-col mx-8 xl:mx-0 py-24 gap-10 lg:py-0 lg:flex-row justify-evenly items-center">
        <div className="flex flex-col max-w-md gap-6 md:items-start">
          <div className="flex flex-row items-center gap-6">
            <div className="bg-orange-400 px-4 py-1 text-white rounded-full cursor-pointer font-medium">
              #1 RV Seller
            </div>
            <Link href="/rvs/all" className="flex flex-row items-center gap-2">
              <span className="underline">Check rv&apos;s</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex flex-col gap-3 font-bold capitalize text-orange-400">
            <span className="text-2xl italic">best way to</span>{" "}
            <h2 className="text-3xl md:text-[2.75rem] italic">buy your dream rv</h2>
          </div>
          <p className="text-gray-600 leading-7">

            Embark on your journey with ease by choosing <strong>HighwayHomes</strong> for a seamless RV buying experience! At <strong>HighwayHomes</strong>, we are committed to simplifying the process of acquiring your dream RV. Contact us today to initiate your RV purchase and set the wheels in motion for your next adventure. Our dedicated team is ready to assist you every step of the way, ensuring a smooth and enjoyable experience as you prepare to hit the road. Discover the freedom of the open highway with <strong>HighwayHomes</strong> – your trusted partner in RV exploration.
          </p>
        </div>

        <Image
          className="drop-shadow-[16px_10px_10px_rgba(196,126,51,1)] rounded-xl"
          priority={true}
          src="/car.png"
          width={500}
          height={500}
          alt="Car"
        />
      </div>
      
      <div className="bg-[#dae3f6]/40 drop-shadow-[0_6px_12px_rgba(196,126,51,0.6)] p-16 mt-20">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 content-center justify-center justify-items-center">
          <div className="flex flex-col gap-2 items-center">
            <TruckIcon className="w-16 h-16 p-3 bg-orange-400 text-white rounded-full" />
            <div className="flex flex-col items-center">
              <span className="font-bold text-xl">23+</span>
              <span className="text-gray-700 font-medium text-lg">Rv&apos;s Delivered</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <ShieldCheckIcon className="w-16 h-16 p-3 bg-orange-400 text-white rounded-full" />
            <div className="flex flex-col items-center">
              <span className="font-bold text-xl">30+</span>
              <span className="text-gray-700 font-medium text-lg">Safe Transaction</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <FaceSmileIcon className="w-16 h-16 p-3 bg-orange-400 text-white rounded-full" />
            <div className="flex flex-col items-center">
              <span className="font-bold text-xl">22+</span>
              <span className="text-gray-700 font-medium text-lg">Happy Client</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <HandThumbUpIcon className="w-16 h-16 p-3 bg-orange-400 text-white rounded-full" />
            <div className="flex flex-col items-center">
              <span className="font-bold text-xl">18+</span>
              <span className="text-gray-700 font-medium text-lg">Positive Feedback</span>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Hero;
