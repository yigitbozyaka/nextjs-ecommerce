import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import DetailedCard from "./DetailedCard";
import { Accordion, Modal } from "flowbite-react";
import { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import Slider from "@mui/material/Slider";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function RvContainer() {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [search, setSearch] = useState<string | undefined>();
  const [price, setPrice] = useState<number[]>([5000, 90000]);
  const [year, setYear] = useState<number[]>([1960, 2023]);

  const { data, isLoading } = useSWR("/api/rvs/list", fetcher);
  const props = { openModal, setOpenModal };

  function pricetext(value: number) {
    return `$${value}`;
  }

  function yeartext(value: number) {
    return `${value}`;
  }

  const priceMarks = [
    {
      value: 1000,
      label: "$1K",
    },
    {
      value: 50000,
      label: "$50K",
    },
    {
      value: 100000,
      label: "$100K",
    },
  ];

  const yearMarks = [
    {
      value: 1960,
      label: "1960",
    },
    {
      value: 2000,
      label: "2000",
    },
    {
      value: 2023,
      label: "2023",
    },
  ];

  const minPriceDistance = 1000;
  const minYearDistance = 1;

  const handlePriceChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minPriceDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100000 - minPriceDistance);
        setPrice([clamped, clamped + minPriceDistance]);
      } else {
        const clamped = Math.max(newValue[1], minPriceDistance);
        setPrice([clamped - minPriceDistance, clamped]);
      }
    } else {
      setPrice(newValue as number[]);
    }
  };

  const handleYearChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minYearDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 1 - minYearDistance);
        setYear([clamped, clamped + minYearDistance]);
      } else {
        const clamped = Math.max(newValue[1], minYearDistance);
        setYear([clamped - minYearDistance, clamped]);
      }
    } else {
      setYear(newValue as number[]);
    }
  };

  const toggleClass = (className: string) => {
    if (selectedClasses.includes(className)) {
      setSelectedClasses(selectedClasses.filter((cls) => cls !== className));
    } else {
      setSelectedClasses([...selectedClasses, className]);
    }
  };

  const filteredRvs = data?.data.filter((rv: any) => {
    if (search) {
      return (
        rv.make.toLowerCase().includes(search.toLowerCase()) ||
        rv.model.toLowerCase().includes(search.toLowerCase()) ||
        rv.type.toLowerCase().includes(search.toLowerCase()) ||
        rv.status.toLowerCase().includes(search.toLowerCase()) ||
        rv.year.toString().includes(search) ||
        rv.price.toString().includes(search)
      );
    } else if (selectedClasses.length > 0 && year && price) {
      return (
        selectedClasses.includes(rv.type) &&
        rv.year >= year[0] &&
        rv.year <= year[1] &&
        rv.price >= price[0] &&
        rv.price <= price[1]
      );
    } else if (selectedClasses.length > 0 && year) {
      return (
        selectedClasses.includes(rv.type) &&
        rv.year >= year[0] &&
        rv.year <= year[1]
      );
    } else if (selectedClasses.length > 0 && price) {
      return (
        selectedClasses.includes(rv.type) &&
        rv.price >= price[0] &&
        rv.price <= price[1]
      );
    } else if (year && price) {
      return (
        rv.year >= year[0] &&
        rv.year <= year[1] &&
        rv.price >= price[0] &&
        rv.price <= price[1]
      );
    } else if (selectedClasses.length > 0) {
      return selectedClasses.includes(rv.type);
    } else if (year) {
      return rv.year >= year[0] && rv.year <= year[1];
    } else if (price) {
      return rv.price >= price[0] && rv.price <= price[1];
    } else {
      return rv;
    }
  });

  return (
    <div className="min-h-screen flex flex-col py-20 justify-evenly gap-10 items-center">
      <div className="w-full max-w-6xl my-10 px-10 xl:px-0 flex flex-col items-center gap-4 md:flex-row justify-between">
        <button
          onClick={() => props.setOpenModal("dismissible")}
          className="flex flex-row items-center gap-2 bg-orange-400 duration-300 hover:bg-orange-500/80 text-white px-4 py-2 rounded-lg"
        >
          <AdjustmentsHorizontalIcon className="h-6 w-6" />
          <p className="text-xl">Filters</p>
        </button>
        <Modal
          dismissible
          show={props.openModal === "dismissible"}
          className="bg-[#ECF2FF] bg-opacity-100"
          size={"md"}
          onClose={() => props.setOpenModal(undefined)}
        >
          <Modal.Header>Filter Search</Modal.Header>
          <Modal.Body>
            <Accordion>
              <Accordion.Panel>
                <Accordion.Title>RV Class</Accordion.Title>
                <Accordion.Content>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center pl-3 border rounded-lg">
                      <input
                        id="class-a-checkbox"
                        type="checkbox"
                        checked={selectedClasses.includes("Class A")}
                        onChange={() => toggleClass("Class A")}
                        className="w-4 h-4 text-orange-400 rounded focus:ring-orange-400 ring-offset-orange-800 focus:ring-offset-orange-800 focus:ring-2 bg-gray-200 border-gray-500"
                      />
                      <label
                        htmlFor="class-a-checkbox"
                        className="w-full py-3 ml-2 text-sm font-medium text-gray-900"
                      >
                        Class A
                      </label>
                    </div>
                    <div className="flex items-center pl-3 border rounded-lg">
                      <input
                        id="class-b-checkbox"
                        type="checkbox"
                        checked={selectedClasses.includes("Class B")}
                        onChange={() => toggleClass("Class B")}
                        className="w-4 h-4 text-orange-400 rounded ring-offset-orange-800 focus:ring-offset-orange-800 focus:ring-2 bg-gray-200 border-gray-500"
                      />
                      <label
                        htmlFor="class-b-checkbox"
                        className="w-full py-3 ml-2 text-sm font-medium text-gray-900"
                      >
                        Class B
                      </label>
                    </div>
                    <div className="flex items-center pl-3 border rounded-lg">
                      <input
                        id="class-c-checkbox"
                        type="checkbox"
                        checked={selectedClasses.includes("Class C")}
                        onChange={() => toggleClass("Class C")}
                        className="w-4 h-4 text-orange-400 rounded ring-offset-orange-800 focus:ring-offset-orange-800 focus:ring-2 bg-gray-200 border-gray-500"
                      />
                      <label
                        htmlFor="class-c-checkbox"
                        className="w-full py-3 ml-2 text-sm font-medium text-gray-900"
                      >
                        Class C
                      </label>
                    </div>
                    <div className="flex items-center pl-3 border rounded-lg">
                      <input
                        id="trailers-checkbox"
                        type="checkbox"
                        checked={selectedClasses.includes("Trailers")}
                        onChange={() => toggleClass("Trailers")}
                        className="w-4 h-4 text-orange-400 rounded ring-offset-orange-800 focus:ring-offset-orange-800 focus:ring-2 bg-gray-200 border-gray-500"
                      />
                      <label
                        htmlFor="trailers-checkbox"
                        className="w-full py-3 ml-2 text-sm font-medium text-gray-900"
                      >
                        Trailers
                      </label>
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Panel>

              <Accordion.Panel>
                <Accordion.Title>Year</Accordion.Title>
                <Accordion.Content>
                  <div className="flex flex-row items-center justify-center gap-4">
                    <Slider
                      getAriaLabel={() => "Minimum distance shift"}
                      value={year}
                      onChange={handleYearChange}
                      min={1960}
                      max={2023}
                      step={1}
                      valueLabelDisplay="auto"
                      getAriaValueText={yeartext}
                      disableSwap
                      marks={yearMarks}
                    />
                  </div>
                </Accordion.Content>
              </Accordion.Panel>

              <Accordion.Panel>
                <Accordion.Title>Price</Accordion.Title>
                <Accordion.Content>
                  <div className="flex flex-row items-center justify-center gap-4">
                    <Slider
                      getAriaLabel={() => "Minimum distance shift"}
                      value={price}
                      onChange={handlePriceChange}
                      min={1000}
                      max={100000}
                      step={1000}
                      valueLabelDisplay="auto"
                      getAriaValueText={pricetext}
                      disableSwap
                      marks={priceMarks}
                    />
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="px-4 py-2 rounded-lg text-white bg-orange-400 duration-300 hover:bg-orange-500/80"
              onClick={() => props.setOpenModal(undefined)}
            >
              Search
            </button>
            <button
              className="px-4 py-2 rounded-lg border text-gray-800 duration-300 hover:bg-gray-400/10"
              onClick={() => props.setOpenModal(undefined)}
            >
              Cancel
            </button>
          </Modal.Footer>
        </Modal>

        <form>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium sr-only text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="search"
              id="default-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-80 md:w-96 p-4 pl-10 text-sm rounded-lg bg-gray-white border-orange-400 placeholder-gray-400 text-gray-500 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Search for your dream rv..."
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 font-medium rounded-lg text-sm px-4 py-2 bg-orange-400 duration-300 hover:bg-orange-500 focus:ring-orange-500"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <h3 className="text-center text-2xl font-bold">All Available RVs</h3>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {!isLoading &&
          filteredRvs.map((rv: any) => (
            <DetailedCard
              key={rv.id}
              id={rv.id}
              length={rv.length}
              make={rv.make}
              model={rv.model}
              odometer={rv.odometer}
              price={rv.price}
              sleeps={rv.sleeps}
              slideOuts={rv.slideOuts}
              status={rv.status}
              type={rv.type}
              weight={rv.weight}
              year={rv.year}
              slug={rv.slug}
              images={rv.images}
              createdAt={rv.createdAt}
            />
          ))}
      </div>
    </div>
  );
}

export default RvContainer;
