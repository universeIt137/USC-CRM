import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const BatchSetting = () => {
  const [batchName, setBatchName] = useState();

  const handleBatch = (e) => {
    setBatchName(e.target.value);
  };

  const { data: batchsInfos = [], refetch } = useQuery({
    queryKey: ["batchsInfos"],
    queryFn: async () => {
      const res = await fetch(`https://demo-usc-crm-software.vercel.app/batch`);
      const data = await res.json();
      return data;
    },
  });

  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${name}" item?`
    );
    if (!confirmDelete) {
      return;
    }

    fetch(`https://demo-usc-crm-software.vercel.app/delete-batch/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        toast.success(`Batch ${batchName} deleted successfully`);
        refetch();
      });
  };

  const handleBatchAdd = () => {
    const addBatchName = {
      name: batchName,
    };

    if (!batchName) {
      toast.error(`Please write course name first`);
      return;
    }

    const batchNameFound = batchsInfos?.find(
      (singleCourse) => singleCourse.name === batchName
    );

    if (batchNameFound) {
      toast.error(`Course "${batchName}" already added`);
      setBatchName("");
      return;
    }

    let confirmed = window.confirm(
      `Are you sure you want to add ${batchName} to this course?`
    );

    if (!confirmed) {
      setBatchName("");
      return;
    }

    fetch(`https://demo-usc-crm-software.vercel.app/batch`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("access_token"),
      },
      body: JSON.stringify(addBatchName),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(`${batchName} added successfully`);
        refetch();
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mt-4">Add Batch Name !</h2>
      <div className="m-2 text-2xl font-bold">
        <input
          onChange={handleBatch}
          type="text"
          placeholder="Type Batch Name"
          className="input input-accent  input-sm focus:ring-0 focus:outline-0 focus:input-sm  focus:border-2 w-full max-w-xs"
          value={batchName}
        />
        <button
          onClick={handleBatchAdd}
          className="btn btn-sm btn-accent m-2 text-black/[0.8] font-semibold"
        >
          Add Batch Name
        </button>
      </div>
      <div className="max-w-xl mx-auto mt-6">
        <div className="overflow-x-auto" style={{ height: "430px" }}>
          <form>
            <table className="table w-full">
              <thead className="text-xs sticky top-0 bg-slate-300">
                <tr>
                  <th className="p-1 border-2 ">#</th>
                  <th className="p-1 border-2 text-center">Date</th>
                  <th className="p-1 border-2 text-center">Batch Name</th>
                  <th className="p-1 border-2 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="w-fit text-xs">
                {batchsInfos?.users?.length > 0 &&
                  batchsInfos?.users?.map((online, i) => (
                    <tr key={online._id}>
                      <th className="p-1 border-2">{i + 1}</th>
                      <td className="p-1 border-2">
                        {online?.createdAt?.slice(0, -14)}
                      </td>
                      <td className="p-1 border-2">{online?.name}</td>
                      <td className="p-1 border-2 text-center">
                        <p
                          className="btn btn-xs  bg-red-500 border-0 hover:bg-red-700"
                          onClick={() => handleDelete(online._id, online?.name)}
                        >
                          Delete
                        </p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BatchSetting;
