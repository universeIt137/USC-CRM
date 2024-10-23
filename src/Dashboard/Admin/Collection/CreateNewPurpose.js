import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const CreateNewPurpose = () => {
  const [purposeName, setPurposeName] = useState();
  const [loading, setLoading] = useState(false);

  const handlePurposeName = (e) => {
    setPurposeName(e.target.value);
  };

  const { data: collectionPurposeName = [], refetch } = useQuery({
    queryKey: ["collectionPurposeName"],
    queryFn: async () => {
      setLoading(true);
      const res = await fetch(
        `https://demo-usc-crm-software.vercel.app/collection-head`
      );
      const data = await res.json();
      setLoading(false);
      return data;
    },
  });

  const handleAddPurposeName = () => {
    if (!purposeName) {
      toast.error(`Please write course name first`);
      return;
    }

    const purposeNameFound = collectionPurposeName?.users?.find(
      (purposeInfo) => purposeInfo.purpose === purposeName
    );

    if (purposeNameFound) {
      toast.error(`Purpose name ${purposeName} already added`);
      setPurposeName("");
      return;
    }

    const addCourseName = {
      purpose: purposeName,
    };

    fetch(`https://demo-usc-crm-software.vercel.app/collection-head`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("access_token"),
      },
      body: JSON.stringify(addCourseName),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        toast.success(`${purposeName} added successfully`);
        refetch();
      });
  };

  const handleDelete = (leads) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) {
      return;
    }

    fetch(
      `https://demo-usc-crm-software.vercel.app/delete-collection-head/${leads}`,
      {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        toast.success(`Leads ${purposeName} deleted successfully`);
        refetch();
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mt-4">Create New Purpose</h2>
      <div className="m-2">
        <input
          onChange={handlePurposeName}
          type="text"
          placeholder="Type Purpose Name"
          className="input input-accent  input-sm focus:ring-0 focus:outline-0 focus:input-sm  focus:border-2 w-full max-w-xs"
          value={purposeName}
        />
        <button
          onClick={handleAddPurposeName}
          className="btn btn-sm btn-accent m-2 text-black/[0.8] font-semibold"
        >
          Add Purpose Name
        </button>
      </div>
      <div className="max-w-2xl mx-auto mt-6">
        <div className="overflow-x-auto" style={{ height: "430px" }}>
          <form>
            <table className="table w-full">
              <thead className="text-xs sticky top-0 bg-slate-300">
                <tr>
                  <th className="p-1 border-2">#</th>
                  <th className="p-1 border-2 text-center">Date</th>
                  <th className="p-1 border-2 text-center">Purpose Name</th>
                  <th className="p-1 border-2 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="  text-xs">
                {collectionPurposeName?.users?.length > 0 &&
                  collectionPurposeName?.users?.map((online, i) => (
                    <tr key={online._id}>
                      <th className="p-1 border-2">{i + 1}</th>
                      <td className="p-1 border-2">
                        {online?.updatedAt?.slice(0, 10)}
                      </td>
                      <td className="p-1 border-2">{online.purpose}</td>
                      <td className="p-1 border-2 text-center">
                        <p
                          className="btn btn-xs  bg-red-500 border-0 hover:bg-red-700"
                          onClick={() => handleDelete(online._id)}
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

export default CreateNewPurpose;
