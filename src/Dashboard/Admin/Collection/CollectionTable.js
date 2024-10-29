import React, { useState } from "react";
import toast from "react-hot-toast";
import CollectionModal from "./CollectionModal";

const CollectionTable = ({ filterData, refetch, showAction }) => {
  const [singlcollectionData, setSinglecollection] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (data) => {
    setSinglecollection(data);
    setShowModal(true);
  };

  const handleDelete = (leads) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) {
      return;
    }

    fetch(
      `https://uiti-crm-server.vercel.app/delete-collection/${leads._id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        toast.success(`Leads ${leads.purpose} deleted successfully`);
        refetch();
      });
  };
  return (
    <>
      <div>
        <div className="overflow-x-auto">
          <form>
            <table className="table w-full">
              <thead
                className="text-xs sticky top-0 bg-slate-300"
                style={{ width: "1200px" }}
              >
                <tr>
                  <th className="p-1 border-2">#</th>
                  <th className="p-1 border-2">Date</th>
                  <th className="p-1 border-2">Money Receipt</th>
                  <th className="p-1 border-2">Purpose Name</th>
                  <th className="p-1 border-2">Payment Type</th>
                  <th className="p-1 border-2">Description</th>
                  <th className="p-1 border-2">Receive By</th>
                  <th className="p-1 border-2">Receive From</th>
                  <th className="p-1 border-2">Amount</th>
                  {showAction && <th className="p-1 border-2">Action</th>}
                </tr>
              </thead>

              <tbody className="w-fit text-xs">
                {filterData?.length > 0 &&
                  filterData?.map((online, i) => (
                    <tr key={online._id}>
                      <th className="p-1 border-2">{i + 1}</th>
                      <td className="p-1 border-2">{online?.date}</td>
                      <td className="p-1 border-2">{online?.moneyReceipt}</td>
                      <td className="p-1 border-2">{online?.purpose}</td>
                      <td className="p-1 border-2">{online?.payType}</td>
                      <td className="p-1 border-2">{online?.discription}</td>
                      <td className="p-1 border-2">{online?.receiveBy}</td>
                      <td className="p-1 border-2">{online?.receiveFrom}</td>
                      <td className="p-1 border-2">{online?.amount}</td>
                      {showAction && (
                        <td className="p-1 border-2">
                          <div className="space-x-2">
                            <label
                              htmlFor="my_modal_6"
                              className="btn btn-xs btn-info hover:btn-accent"
                              onClick={() => handleEdit(online)}
                            >
                              Edit
                            </label>

                            <p
                              className="btn btn-xs  bg-red-500 border-0 hover:bg-red-700"
                              onClick={() => handleDelete(online)}
                            >
                              Delete
                            </p>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </form>
        </div>
      </div>
      {showModal && (
        <CollectionModal
          singlcollectionData={singlcollectionData}
          setShowModal={setShowModal}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default CollectionTable;
