import {
  HeartIcon,
  ShareIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Carousel } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type RvDetails = {
  id: string;
  price: number;
  year: number;
  make: string;
  model: string;
  type: string;
  status: string;
  slug: string;
  images: string;
  createdAt: string;
};

function RvCard({
  id,
  price,
  year,
  make,
  model,
  type,
  status,
  slug,
}: RvDetails) {
  const [isLiked, setIsLiked] = useState(false);
  const editedType = type.toLowerCase().replaceAll(" ", "-");

  function formatNumberWithCommas(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

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
          <BanknotesIcon className="h-6 w-6" />
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
      </Carousel>

      {/*card img*/}

      {/*card footer*/}

      <div className="card-footer flex flex-row gap-3 justify-between">
        <Link href={`/rvdetails/${editedType}-rvs/${slug}`} className="text-center capitalize py-2 rounded-lg bg-orange-400 text-white flex-grow">
          order now
        </Link>
        <Link
          href={`/rvdetails/${editedType}-rvs/${slug}`}
          className="capitalize px-3 py-2 rounded-lg bg-gray-500/30"
        >
          view details
        </Link>
      </div>

      {/*card footer*/}
    </div>
  );
}

export default RvCard;
