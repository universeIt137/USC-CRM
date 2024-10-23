import React, { useState } from "react";
import toast from "react-hot-toast";
import ExpenseModal from "./ExpenseModal";

const ExpenseTable = ({ expenseDatas, refetch, showAction }) => {
  const [singlexpenseData, setSingleExpenseData] = useState({});

  const handleEdit = (data) => {
    console.log(data);
    setSingleExpenseData(data);
  };

  const handleDelete = (leads) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) {
      return;
    }

    fetch(
      `https://demo-usc-crm-software.vercel.app/delete-expense/${leads._id}`,
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
        toast.success(`Leads ${leads.purpose} deleted successfully`);
        refetch();
      });
  };
  return (
    <>
      <table className="table w-full">
        <thead
          className="text-xs sticky    top-0 bg-slate-300"
          style={{ width: "1200px" }}
        >
          <tr>
            <th className="p-1 border-2">#</th>
            <th className="p-1 border-2 text-center">Date</th>
            <th className="p-1 border-2 text-center">Voucher No</th>
            <th className="p-1 border-2 text-center">Purpose Name</th>
            <th className="p-1 border-2 text-center">Expense By</th>
            <th className="p-1 border-2 text-center">Description</th>
            <th className="p-1 border-2 text-center">Amount</th>
            {showAction && <th className="p-1 border-2 text-center">Action</th>}
          </tr>
        </thead>

        <tbody className="w-fit text-xs">
          {expenseDatas?.length > 0 &&
            expenseDatas?.map((online, i) => (
              <tr key={online._id}>
                <th className="p-1 border-2">{i + 1}</th>
                <td className="p-1 border-2">{online?.date?.slice(0, 10)}</td>
                <td className="p-1 border-2">{online?.voucherNo}</td>
                <td className="p-1 border-2">{online?.purpose}</td>
                <td className="p-1 border-2">{online?.expenseBy}</td>
                <td className="p-1 border-2">{online?.discription}</td>
                <td className="p-1 border-2">{online?.amount}</td>
                {showAction && (
                  <td className="p-1 border-2  text-center ">
                    <div className="space-x-2">
                      <label
                        htmlFor="my_modal_6"
                        className="btn btn-xs btn-info  "
                        onClick={() => handleEdit(online)}
                      >
                        Edit
                      </label>

                      <p
                        className="btn btn-xs btn-error  "
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
      <ExpenseModal singlexpenseData={singlexpenseData} refetch={refetch} />
    </>
  );
};

export default ExpenseTable;
