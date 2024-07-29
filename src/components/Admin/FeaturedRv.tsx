import axios from "axios";
import useSWR from "swr";
import { Modal } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function FeaturedRv() {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [selectedRv, setSelectedRv] = useState<any>(null);
  const [newFeaturedRv, setNewFeaturedRv] = useState<string>();

  const { data, isLoading } = useSWR("/api/admin/featured-rvs", fetcher);
  const props = { openModal, setOpenModal };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    toast.loading("Updating Featured RV...");
    await axios.post(`/api/admin/featured-rvs`, {
      id: selectedRv?.id,
      newId: newFeaturedRv,
    });
    toast.dismiss();
    toast.success("Featured RV updated!");
    props.setOpenModal(undefined);
  };

  return (
    <>
      <Modal
        dismissible
        show={props.openModal === "dismissible"}
        size={"md"}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Update Featured Rv</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col">
            <label htmlFor="newFeaturedRv">New Rv Id</label>
            <input
              className="bg-transparent border-2 border-slate-500 rounded-lg"
              type="text"
              name="newFeaturedRv"
              value={newFeaturedRv || selectedRv?.rvId}
              onChange={(e) => setNewFeaturedRv(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="px-4 py-2 rounded-lg text-white bg-slate-800 duration-300 hover:bg-slate-800/80"
            onClick={handleUpdate}
          >
            Update
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
          Featured Rv&apos;s
        </h3>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs uppercase bg-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Rv Id
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
                    key={rv.rvId}
                    className="border-b bg-gray-900 border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap text-white"
                    >
                      {rv.rvId}
                    </th>
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

export default FeaturedRv;
