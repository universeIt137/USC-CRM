import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddCollection = () => {
  const navigate = useNavigate();

  const { data: expenseHeadName = [] } = useQuery({
    queryKey: ["expenseHeadName"],
    queryFn: async () => {
      const res = await fetch(
        `https://uiti-crm-server.vercel.app/collection-head`
      );
      const data = await res.json();
      return data;
    },
  });

  const { data: payGetwayName = [] } = useQuery({
    queryKey: ["payGetwayName"],
    queryFn: async () => {
      const res = await fetch(
        `https://uiti-crm-server.vercel.app/pay-getway`
      );
      const data = await res.json();
      return data;
    },
  });

  const addAdmission = (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    const moneyReceipt = e.target.moneyReceipt.value;
    const purpose = e.target.purpose.value;
    const payType = e.target.payType.value;
    const amount = e.target.amount.value;
    const receiveBy = e.target.receiveBy.value;
    const receiveFrom = e.target.receiveFrom.value;
    const discription = e.target.discription.value;

    const personalData = {
      date,
      moneyReceipt,
      purpose,
      payType,
      amount,
      receiveBy,
      receiveFrom,
      discription,
    };

    fetch(`https://uiti-crm-server.vercel.app/collection`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(personalData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Collection Added Successfully") {
          navigate("/dashboard/collection/collection");
        }
        toast.success(`Database Data ${data.message}`);
      });
  };

  return (
    <div className="mt-2 w-12/12 mx-auto">
      <fieldset className="border border-solid border-gray-500 p-3 mx-10">
        <legend className="text-2xl">Add Extra Collection</legend>

        <div div>
          <div className="m-2">
            <form onSubmit={addAdmission}>
              <div>
                <div className="flex flex-row gap-2">
                  <div className="form-control mx-2">
                    <label className="label">
                      <span className="label-text">Date</span>
                    </label>
                    <input
                      name="date"
                      type="date"
                      className="input input-sm w-full input-bordered"
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Money Receipt</span>
                    </label>
                    <input
                      type="text"
                      name="moneyReceipt"
                      placeholder="Money Receipt Here..."
                      className="input input-sm input-bordered w-full"
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Purpose Name</span>
                    </label>
                    <select
                      name="purpose"
                      className="select select-bordered select-sm w-full"
                    >
                      <option disabled selected>
                        Purpose Name
                      </option>
                      {expenseHeadName?.users?.map((user) => (
                        <option key={user._id} value={user.purpose}>
                          {user.purpose}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Collection Type</span>
                    </label>
                    <select
                      name="payType"
                      className="select select-bordered select-sm w-full"
                    >
                      <option disabled selected>
                        Purpose Type
                      </option>
                      {payGetwayName?.users?.map((user) => (
                        <option key={user._id} value={user.name}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Amount</span>
                    </label>
                    <input
                      type="text"
                      name="amount"
                      placeholder="Enter Amount"
                      className="input input-sm input-bordered w-full"
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Receive By</span>
                    </label>
                    <input
                      type="text"
                      name="receiveBy"
                      placeholder="Receive By Name"
                      className="input input-sm input-bordered w-full"
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Receive From</span>
                    </label>
                    <input
                      type="text"
                      name="receiveFrom"
                      placeholder="Receive From Name"
                      className="input input-sm input-bordered w-full"
                    />
                  </div>
                </div>

                <div className="flex flex-row gap-2">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Discription</span>
                    </label>
                    <textarea
                      name="discription"
                      type="text"
                      placeholder="Discription Here....."
                      className="textarea textarea-bordered textarea-lg w-full"
                    />
                  </div>
                </div>
              </div>

              <input
                className="btn  btn-accent mt-3  text-black/[0.8] font-semibold w-full p-3"
                value="Add New Collection"
                type="submit"
              />
            </form>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default AddCollection;
