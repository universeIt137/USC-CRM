import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ReceiveLoan = () => {
  const navigate = useNavigate();

  const { data: expenseHeadName = [], refetch } = useQuery({
    queryKey: ["expenseHeadName"],
    queryFn: async () => {
      const res = await fetch(
        `https://uiti-crm-server.vercel.app/loan-head`
      );
      const data = await res.json();
      return data;
    },
  });

  const addLoanProvide = (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    const loanReceipt = e.target.loanReceipt.value;
    const loanPurpose = e.target.loanPurpose.value;
    const loanReceive = e.target.loanReceive.value;
    const loanAmount = e.target.loanAmount.value;
    const discription = e.target.discription.value;

    const personalData = {
      date,
      loanReceipt,
      loanPurpose,
      loanReceive,
      loanAmount,
      // loanProvideDue: 0,
      discription,
      loanReceiveStatus: true,
    };
    // console.log(loanReceipt, loanPurpose, loanReceive, loanAmount, discription,);

    fetch(`https://uiti-crm-server.vercel.app/loan`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(personalData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Loan Provide Successfully") {
          navigate("/dashboard/loan/all-receive");
        }
        toast.success(`Database Data ${data.message}`);
        // console.log(data);
      });
  };

  return (
    <div className="mt-2 w-12/12 mx-auto">
      <fieldset className="border border-solid border-gray-500 p-3 mx-10">
        <legend className="text-2xl">Loan Receive Entry</legend>

        <div div>
          <div className="my-3 mx-2">
            <form onSubmit={addLoanProvide}>
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
                      <span className="label-text">Loan Receipt No</span>
                    </label>
                    <input
                      type="text"
                      name="loanReceipt"
                      placeholder="Loan Receipt No Here..."
                      className="input input-sm input-bordered w-full"
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Loan Purpose</span>
                    </label>
                    <select
                      name="loanPurpose"
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
                      <span className="label-text">Loan Receiver Name</span>
                    </label>
                    <input
                      type="text"
                      name="loanReceive"
                      placeholder="Enter Loan Receiver Name "
                      className="input input-sm input-bordered w-full"
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Loan Amount</span>
                    </label>
                    <input
                      type="text"
                      name="loanAmount"
                      placeholder="Enter Loan Amount"
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
                className="btn btn-accent w-full text-white mt-3"
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

export default ReceiveLoan;
