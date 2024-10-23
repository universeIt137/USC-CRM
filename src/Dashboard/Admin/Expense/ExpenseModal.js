import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ExpenseModal = ({ singlexpenseData, refetch }) => {
  const [expenseDate, setEpenseDate] = useState("");
  const [expenseVouchar, setEpenseVouchar] = useState("");
  const [expensePurpose, setEpensePosename] = useState("");
  const [expenseBy, setEpenseBy] = useState("");
  const [expenseAmount, setEpenseAmount] = useState("");
  const [expenseDescription, setEpenseDescription] = useState("");

  useEffect(() => {
    if (singlexpenseData) {
      setEpenseDate(singlexpenseData?.date?.slice(0, 10));
      setEpenseVouchar(singlexpenseData.voucherNo);
      setEpensePosename(singlexpenseData.purpose);
      setEpenseBy(singlexpenseData.expenseBy);
      setEpenseAmount(singlexpenseData.amount);
      setEpenseDescription(singlexpenseData.discription);
    }
  }, [singlexpenseData]);

  const { data: expenseHeadName = [] } = useQuery({
    queryKey: ["expenseHeadName"],
    queryFn: async () => {
      const res = await fetch(
        `https://demo-usc-crm-software.vercel.app/expense-head`
      );
      const data = await res.json();
      return data;
    },
  });

  const updateExpense = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to update this item?"
    );
    if (!confirmDelete) {
      return;
    }

    const expenseUpdated = {
      date: expenseDate,
      purpose: expensePurpose,
      expenseBy: expenseBy,
      discription: expenseDescription,
      voucherNo: expenseVouchar,
      amount: expenseAmount,
    };

    console.log(expenseUpdated);
    // `https://demo-usc-crm-software.vercel.app/update-expense/${singleExpense._id}`

    fetch(
      `https://demo-usc-crm-software.vercel.app/update-expense/${singlexpenseData._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(expenseUpdated),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        toast.success(`Expense update sucessfully successfully`);
        refetch();
      });
  };
  return (
    <>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-[1100px]">
          <div className="mt-2   mx-auto">
            <fieldset className="border border-solid border-gray-500 p-3 mx-10">
              <legend className="text-2xl">Update Expense</legend>

              <div div>
                <div className="my-3 mx-2">
                  <form onSubmit={updateExpense}>
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
                            defaultValue={expenseDate}
                            onChange={(e) => setEpenseDate(e.target.value)}
                          />
                        </div>

                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Voucher No</span>
                          </label>
                          <input
                            type="text"
                            name="voucherNo"
                            placeholder="Voucher No Here..."
                            className="input input-sm input-bordered w-full"
                            value={expenseVouchar}
                            onChange={(e) => setEpenseVouchar(e.target.value)}
                          />
                        </div>

                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Purpose Name</span>
                          </label>
                          <select
                            name="purpose"
                            className="select select-bordered select-sm w-full"
                            onChange={(e) => setEpensePosename(e.target.value)}
                          >
                            <option disabled selected>
                              {expensePurpose}
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
                            <span className="label-text">Expense By</span>
                          </label>
                          <input
                            type="text"
                            name="expenseBy"
                            placeholder="Enter Receive By Name"
                            className="input input-sm input-bordered w-full"
                            value={expenseBy}
                            onChange={(e) => setEpenseBy(e.target.value)}
                          />
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
                            value={expenseAmount}
                            onChange={(e) => setEpenseAmount(e.target.value)}
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
                            className="textarea textarea-bordered textarea-md w-full"
                            value={expenseDescription}
                            onChange={(e) =>
                              setEpenseDescription(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      className="modal-action"
                      onClick={() => updateExpense("ab")}
                    >
                      <label
                        htmlFor="my_modal_6"
                        className="btn btn-accent w-full text-white mt-3"
                      >
                        <span>Update Expense</span>
                      </label>
                    </div>
                    <div className="modal-action absolute top-0 right-3  ">
                      <label
                        htmlFor="my_modal_6"
                        className="btn btn-sm text-xl ring-0 border-0 rounded-full  bg-red-500"
                      >
                        X
                      </label>
                    </div>
                  </form>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpenseModal;
