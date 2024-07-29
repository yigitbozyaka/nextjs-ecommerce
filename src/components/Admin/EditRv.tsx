import axios from "axios";
import useSWR from "swr";
import { Modal } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function EditRv() {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [selectedRv, setSelectedRv] = useState<any>(null);
  const [price, setPrice] = useState<number>();
  const [year, setYear] = useState<number>();
  const [make, setMake] = useState<string>();
  const [model, setModel] = useState<string>();
  const [type, setType] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [length, setLength] = useState<string>();
  const [fuelType, setFuelType] = useState<string>();
  const [odometer, setOdometer] = useState<number>();
  const [weight, setWeight] = useState<number>();
  const [sleeps, setSleeps] = useState<number>();
  const [slideOuts, setSlideOuts] = useState<number>();
  const [vin, setVin] = useState<string>();
  const [imgCount, setImgCount] = useState<number>();
  const [exteriorColour, setExteriorColour] = useState<string>();
  const [description1, setDescription1] = useState<string>();
  const [description2, setDescription2] = useState<string>();
  const [description3, setDescription3] = useState<string>();
  const [description4, setDescription4] = useState<string>();

  const { data, isLoading } = useSWR("/api/admin/rvs", fetcher);
  const props = { openModal, setOpenModal };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    toast.loading("Updating RV...");
    await axios.post(`/api/admin/rvs`, {
      id: selectedRv?.id,
      price,
      year,
      make,
      model,
      type,
      status,
      length,
      fuelType,
      odometer,
      weight,
      sleeps,
      slideOuts,
      vin,
      exteriorColour,
      description1,
      description2,
      description3,
      description4,
    });
    toast.dismiss();
    toast.success("RV updated!");
    props.setOpenModal(undefined);
  };

  const handleFeatured = async (e: any) => {
    e.preventDefault();
    toast.loading("Adding Rv as Featured...");
    try {
      await axios.post(`/api/admin/featured-rvs`, {
        id: selectedRv?.id,
      });
      toast.dismiss();
      toast.success("Rv added as Featured!");
      props.setOpenModal(undefined);
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Could not add Rv as Featured!");
    }
  }

  const handleDelete = async (e: any) => {
    e.preventDefault();
    toast.loading("Deleting RV...");
    await axios.delete(`/api/admin/rvs`, {
      data: {
        id: selectedRv?.id,
      },
    });
    toast.dismiss();
    toast.success("RV deleted!");
  }

  return (
    <>
      <Modal
        dismissible
        show={props.openModal === "dismissible"}
        size={"xl"}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>RV: {selectedRv?.id}</Modal.Header>
        <Modal.Body>
          <form className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Price</label>
              <input
                className="bg-transparent border-2 border-slate-500 rounded-lg"
                placeholder="20,900.00"
                type="text"
                name="price"
                value={price || selectedRv?.price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="year">Year</label>
              <input
                className="bg-transparent border-2 border-slate-500 rounded-lg"
                placeholder="2016"
                type="text"
                name="year"
                value={year || selectedRv?.year}
                onChange={(e) => setYear(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Make</label>
              <input
                className="bg-transparent border-2 border-slate-500 rounded-lg"
                type="text"
                name="make"
                value={make || selectedRv?.make}
                onChange={(e) => setMake(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="model">Model</label>
              <input
                className="bg-transparent border-2 border-slate-500 rounded-lg"
                type="text"
                name="model"
                value={model || selectedRv?.model}
                onChange={(e) => setModel(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="type">Type</label>
              <input
                className="bg-transparent border-2 border-slate-500 rounded-lg"
                placeholder="Class A"
                type="text"
                name="type"
                value={type || selectedRv?.type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="status">Status</label>
              <input
                className="bg-transparent border-2 border-slate-500 rounded-lg"
                placeholder="Used"
                type="text"
                name="status"
                value={status || selectedRv?.status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="length">Length</label>
              <input
                className="bg-transparent border-2 border-slate-500 rounded-lg"
                placeholder="31.70"
                type="text"
                name="length"
                value={length || selectedRv?.length}
                onChange={(e) => setLength(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="fuelType">Fuel Type</label>
              <input
                className="bg-transparent border-2 border-slate-500 rounded-lg"
                placeholder="Gas"
                type="text"
                name="fuelType"
                value={fuelType || selectedRv?.fuelType}
                onChange={(e) => setFuelType(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="odometer">Odometer</label>
              <input
                className="bg-transparent border-2 border-slate-500 rounded-lg"
                placeholder="6058"
                type="text"
                name="odometer"
                value={odometer || selectedRv?.odometer}
                onChange={(e) => setOdometer(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="weight">GVWR info</label>
              <input
                className="bg-transparent border-2 border-slate-500 rounded-lg"
                placeholder="18000"
                type="text"
                name="weight"
                value={weight || selectedRv?.weight}
                onChange={(e) => setWeight(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="sleeps">Sleeps</label>
              <input
                className="bg-transparent border-2 border-slate-500 rounded-lg"
                placeholder="8"
                type="text"
                name="sleeps"
                value={sleeps || selectedRv?.sleeps}
                onChange={(e) => setSleeps(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="slideOuts">Slide Outs</label>
              <input
                className="bg-transparent border-2 border-slate-500 rounded-lg"
                placeholder="2"
                type="text"
                name="slideOuts"
                value={slideOuts || selectedRv?.slideOuts}
                onChange={(e) => setSlideOuts(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="vin">VIN</label>
              <input
                className="bg-transparent border-2 border-slate-500 rounded-lg"
                placeholder=""
                type="text"
                name="vin"
                value={vin || selectedRv?.vin}
                onChange={(e) => setVin(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="exteriorColour">Exterior Colour</label>
              <input
                className="bg-transparent border-2 border-slate-500 rounded-lg"
                placeholder="TAN"
                type="text"
                name="exteriorColour"
                value={exteriorColour || selectedRv?.exteriorColour}
                onChange={(e) => setExteriorColour(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="imgCount">Image Count</label>
              <input
                className="bg-transparent border-2 border-slate-500 rounded-lg"
                placeholder="40"
                type="text"
                name="imgCount"
                value={imgCount || selectedRv?.imgCount}
                onChange={(e) => setImgCount(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description1">Description 1</label>
              <textarea
                className="bg-transparent border-2 border-slate-500 rounded-lg"
                placeholder="Description 1"
                name="description1"
                value={description1 || selectedRv?.description1}
                onChange={(e) => setDescription1(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description2">Description 2</label>
              <textarea
                className="bg-transparent border-2 border-slate-500 rounded-lg"
                placeholder="Description 2"
                name="description2"
                value={description2 || selectedRv?.description2}
                onChange={(e) => setDescription2(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description3">Description 3</label>
              <textarea
                className="bg-transparent border-2 border-slate-500 rounded-lg"
                placeholder="Description 3"
                name="description3"
                value={description3 || selectedRv?.description3}
                onChange={(e) => setDescription3(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description4">Description 4</label>
              <textarea
                className="bg-transparent border-2 border-slate-500 rounded-lg"
                placeholder="Description 4"
                name="description4"
                value={description4 || selectedRv?.description4}
                onChange={(e) => setDescription4(e.target.value)}
              />
            </div>


          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="px-4 py-2 rounded-lg text-white bg-slate-800 duration-300 hover:bg-slate-800/80"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            className="px-4 py-2 rounded-lg text-white bg-slate-800 duration-300 hover:bg-slate-800/80"
            onClick={handleFeatured}
          >
            Add as Featured
          </button>
          <button
            className="px-4 py-2 rounded-lg text-white bg-slate-800 duration-300 hover:bg-slate-800/80"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="px-4 py-2 rounded-lg border text-gray-800 duration-300 hover:bg-gray-400/10"
            onClick={() => props.setOpenModal(undefined)}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
      <div className="py-36 flex flex-col items-center gap-10 text-white">
        <h3 className="text-2xl font-bold underline underline-offset-2">
          Edit Rv&apos;s
        </h3>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs uppercase bg-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Rv Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Make & Model
                </th>
                <th scope="col" className="px-6 py-3">
                  Odometer
                </th>
                <th scope="col" className="px-6 py-3">
                  Vin
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                data.data.map((rv: any) => (
                  <tr
                    key={rv.id}
                    className="border-b odd:bg-gray-900 even:bg-gray-800 border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap text-white"
                    >
                      {rv.id}
                    </th>
                    <td className="px-6 py-4">
                      {rv.make} & {rv.model}
                    </td>
                    <td className="px-6 py-4">{rv.odometer} miles</td>
                    <td className="px-6 py-4">{rv.vin}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedRv(rv);
                          props.setOpenModal("dismissible");
                        }}
                        className="font-medium text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default EditRv;
