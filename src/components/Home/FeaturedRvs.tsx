import RvCard from "./RvCard";
import axios from "axios";
import useSWR from "swr";
import FeaturedRvsSkeleton from "./FeaturedRvsSkeleton";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function FeaturedRvs() {
  const { data } = useSWR("/api/rvs/featured", fetcher);

  return (
    <div className="min-h-screen py-12 flex flex-col justify-evenly items-center">
      <div className="flex flex-col mt-20 text-center">
        <h3 className="text-xl font-bold text-orange-400">
          Best Deals For You
        </h3>
        <h2 className="text-3xl font-bold text-black">Showcase Selection&apos;s</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10 gap-3">
        {data ?
          data.data.map((rv: any) => (
            <RvCard
              key={rv.id}
              id={rv.id}
              make={rv.make}
              model={rv.model}
              price={rv.price}
              status={rv.status}
              type={rv.type}
              year={rv.year}
              slug={rv.slug}
              images={rv.images}
              createdAt={rv.createdAt}
            />
          )): <FeaturedRvsSkeleton />}
      </div>
    </div>
  );
}

export default FeaturedRvs;
