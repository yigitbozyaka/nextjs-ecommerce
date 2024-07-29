import {
  HeartIcon,
  ShareIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Button, Carousel, Modal } from "flowbite-react";
import { BiBed } from "react-icons/bi";
import { TfiLayoutSliderAlt, TfiRulerAlt } from "react-icons/tfi";
import { LiaWeightSolid } from "react-icons/lia";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

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
  slideOuts: number;
  slug: string;
  images: string;
  createdAt: string;
};

function DetailedCard({
  id,
  price,
  year,
  make,
  model,
  type,
  status,
  length,
  weight,
  sleeps,
  slideOuts,
  slug,
}: RvDetails) {
  const [isLiked, setIsLiked] = useState(false);

  const editedType = type.toLowerCase().replaceAll(" ", "-");
  function formatNumberWithCommas(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const orderedRv = {
    id: id,
    name: `${year} ${make} & ${model}`,
    price: price,
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

  const handleLike = () => {
    localStorage.setItem(id, "liked");
    setIsLiked(true);
  }

  const handleUnlike = () => {
    localStorage.removeItem(id);
    setIsLiked(false);
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${year} ${make} & ${model}`,
        text: `Check out this Rv!`,
        url: `${process.env.NEXT_PUBLIC_URL}/rvdetails/${editedType}-rvs/${slug}`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem(id) === "liked") {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [id]);

  return (
    <>
      <div className="card border-2 p-3 rounded-lg min-w-[22rem]">
        {/*card header*/}

        <div className="card-header flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <div className="text-lg font-bold text-orange-400 uppercase">
              {status}
            </div>
            <div className="uppercase text-gray-500">
              {year} {make}
            </div>
          </div>

          <div className="flex flex-row gap-2">
            {isLiked ? <HeartIconSolid className="h-6 w-6 cursor-pointer text-red-500" onClick={handleUnlike} /> : <HeartIcon className="h-6 w-6 cursor-pointer" onClick={handleLike} />}
            <ShareIcon className="h-6 w-6 cursor-pointer" onClick={handleShare} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="uppercase">{model}</div>

          <div className="flex flex-row items-center gap-1">
            <BanknotesIcon className="h-4 w-4 text-gray-500/80" />
            <p className="uppercase">${formatNumberWithCommas(price)}.00</p>
          </div>
        </div>

        {/*card header*/}

        {/*card img*/}

        <Carousel slide={false} className="max-w-[24rem] h-60 my-4">
          <Image
            className="my-3 block mx-auto"
            src={`/${id}/_1.jpg`}
            width={360}
            height={180}
            alt="rv_cover"
          />
          <Image
            className="my-3 block mx-auto"
            src={`/${id}/_2.jpg`}
            width={360}
            height={180}
            alt="rv_cover"
          />
          <Image
            className="my-3 block mx-auto"
            src={`/${id}/_3.jpg`}
            width={360}
            height={180}
            alt="rv_cover"
          />
        </Carousel>

        {/*card img*/}

        {/*card body*/}

        <div className="flex flex-row items-center justify-evenly mb-4 border-t pt-4">
          <div className="flex flex-col items-center">
            <div className="icon">
              <BiBed className="h-4 w-4 text-gray-500/80" />
            </div>
            <div className="feature text-sm">Sleeps</div>
            <div className="value font-bold">{sleeps}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="icon">
              <TfiLayoutSliderAlt className="h-4 w-4 text-gray-500/80" />
            </div>
            <div className="feature text-sm">Slide outs</div>
            <div className="value font-bold">{slideOuts}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="icon">
              <TfiRulerAlt className="h-4 w-4 text-gray-500/80" />
            </div>
            <div className="feature text-sm">Length</div>
            <div className="value font-bold">{length}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="icon">
              <LiaWeightSolid className="h-4 w-4 text-gray-500/80" />
            </div>
            <div className="feature text-sm">Weight</div>
            <div className="value font-bold">{weight} lbs</div>
          </div>
        </div>

        {/*card body*/}

        {/*card footer*/}

        <div className="card-footer flex flex-row gap-3 justify-between">
          <button
            onClick={handleSubmit}
            className="capitalize py-2 rounded-lg bg-orange-400 text-white flex-grow"
          >
            order now
          </button>
          <Link
            href={`/rvdetails/${editedType}-rvs/${slug}`}
            className="capitalize px-3 py-2 rounded-lg bg-gray-500/30"
          >
            view details
          </Link>
        </div>

        {/*card footer*/}
      </div>
    </>
  );
}

export default DetailedCard;
