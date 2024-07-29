import { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';

function AddRv() {
  const [price, setPrice] = useState<number>();
  const [year, setYear] = useState<number>();
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [length, setLength] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [odometer, setOdometer] = useState<number>();
  const [weight, setWeight] = useState<number>();
  const [sleeps, setSleeps] = useState<number>();
  const [slideOuts, setSlideOuts] = useState<number>();
  const [vin, setVin] = useState("");
  const [imgCount, setImgCount] = useState<number>();
  const [exteriorColour, setExteriorColour] = useState("");
  const [description1, setDescription1] = useState("");
  const [description2, setDescription2] = useState("");
  const [description3, setDescription3] = useState("");
  const [description4, setDescription4] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const data = {
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
    imgCount,
    exteriorColour,
    description1,
    description2,
    description3,
    description4
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    toast.loading("Adding RV...")
    try {
      if (!selectedFiles) {
        toast.dismiss();
        return toast.error("Please select images");
      }
      const formData = new FormData();

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("images", selectedFiles[i]);
      }

      const res = await axios.post("/api/create/rv", data);
      const id = res.data.id;
      console.log(res)
      await axios.post(`/api/upload/rv?id=${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.dismiss();
      toast.success("Rv added successfully");
    } catch (err) {
      toast.dismiss();
      toast.error("Something went wrong");
      console.log(err);
    }
  };

  return (
    <div className="py-36 flex flex-col items-center gap-10 text-white">
      <h3 className="text-2xl font-bold underline underline-offset-2">
        Add Rv&apos;s
      </h3>

      <form className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="price">Price</label>
          <input
            className="bg-transparent border-2 border-slate-500 rounded-lg"
            placeholder="20,900.00"
            type="text"
            name="price"
            value={price}
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
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Make</label>
          <input
            className="bg-transparent border-2 border-slate-500 rounded-lg"
            placeholder="Forest River"
            type="text"
            name="make"
            value={make}
            onChange={(e) => setMake(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="model">Model</label>
          <input
            className="bg-transparent border-2 border-slate-500 rounded-lg"
            placeholder="FR3 30DS"
            type="text"
            name="model"
            value={model}
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
            value={type}
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
            value={status}
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
            value={length}
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
            value={fuelType}
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
            value={odometer}
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
            value={weight}
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
            value={sleeps}
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
            value={slideOuts}
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
            value={vin}
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
            value={exteriorColour}
            onChange={(e) => setExteriorColour(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="imgCount">Image Count</label>
          <input
            className="bg-transparent border-2 border-slate-500 rounded-lg"
            placeholder="20"
            type="text"
            name="imgCount"
            value={imgCount}
            onChange={(e) => setImgCount(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="images">Images</label>
          <input
            className="bg-transparent border-2 border-slate-500 rounded-lg w-60"
            type="file"
            name="images"
            multiple
            onChange={(e) => setSelectedFiles(e.target.files)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description1">Description 1</label>
          <textarea
            className="bg-transparent border-2 border-slate-500 rounded-lg"
            placeholder="Description here..."
            name="description1"
            value={description1}
            onChange={(e) => setDescription1(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description2">Description 2</label>
          <textarea
            className="bg-transparent border-2 border-slate-500 rounded-lg"
            placeholder="Description here..."
            name="description2"
            value={description2}
            onChange={(e) => setDescription2(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description3">Description 3</label>
          <textarea
            className="bg-transparent border-2 border-slate-500 rounded-lg"
            placeholder="Description here..."
            name="description3"
            value={description3}
            onChange={(e) => setDescription3(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description4">Description 4</label>
          <textarea
            className="bg-transparent border-2 border-slate-500 rounded-lg"
            placeholder="Description here..."
            name="description4"
            value={description4}
            onChange={(e) => setDescription4(e.target.value)}
          />
        </div>
      </form>
      <button
        onClick={handleSubmit}
        className="bg-slate-500 rounded-lg px-6 py-3"
      >
        Submit
      </button>
    </div>
  );
}

export default AddRv;
