import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import ReactToPrint from "react-to-print";
import { matchingData } from "../../../Utils/helper";
import { getAllExpenseData } from "../../../Utils/expenseData";
import { useQuery } from "@tanstack/react-query";
import ExpenseTable from "./ExpenseTable";

const VoucherNoWiseReport = () => {
  const [filterData, setFilterData] = useState([]);
  const [voucharNo, setVoucharNo] = useState();
  const componentRef = useRef();
  const [show, setShow] = useState(false);
  const voucherNoRef = useRef();

  const { data: expenses = [], refetch } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const data = await getAllExpenseData();
      return data;
    },
  });

  // -------------Collection Date to Date wise Filter Start--------------------

  const handleCollectionDateSearch = () => {
    let fData;

    if (voucharNo) {
      fData = matchingData(expenses, "voucherNo", parseFloat(voucharNo));
    } else {
      fData = matchingData(
        expenses,
        "voucherNo",
        parseFloat(voucherNoRef.current.value)
      );
    }
    toast.success("Data filtered successfully");

    setFilterData(fData);
    setShow(true);
  };

  // -------------Collection Date to Date wise Filter End--------------------

  return (
    <div className="mx-2 my-6">
      <div className="flex flex-row justify-around">
        <h2 className="text-2xl font-bold">Voucher No Wise Expense Report!</h2>
      </div>

      <div className="flex flex-row justify-center items-center my-2">
        <div className="form-control mx-2">
          <label className="label">
            <span className="label-text ml-2"> Voucher No Check</span>
          </label>
          <select
            ref={voucherNoRef}
            className="select   select-sm w-full border-accent outline-0  ring-0 focus:ring-0 focus:outline-0  "
          >
            <option>Voucher No Check </option>
            {expenses?.map((user) => (
              <option key={user._id} value={user.voucherNo}>
                {user.voucherNo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">
            <span className="label-text">Voucher No</span>
          </label>
          <input
            onChange={(e) => setVoucharNo(e.target.value)}
            type="text"
            className="input input-accent  input-sm focus:ring-0 focus:outline-0 focus:input-sm  focus:border-2 w-full max-w-xs"
          />
        </div>

        <div className="mt-8  mx-2">
          <button
            onClick={handleCollectionDateSearch}
            className="btn btn-sm   text-white btn-accent   hover:btn-accent/[.8]   border-0"
          >
            Filter
          </button>
        </div>

        <div className="mt-8  mx-2  py-1">
          <ReactToPrint
            trigger={() => (
              <button className="btn btn-sm   text-white bg-green-500   hover:bg-green-600   border-0">
                Print
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>
      </div>

      <div ref={componentRef}>
        {show && (
          <div className="text-center p-2">
            <h1 className="font-bold text-3xl">Universe It Institute</h1>
          </div>
        )}
        <ExpenseTable expenseDatas={filterData} refetch={refetch} />
      </div>
    </div>
  );
};

export default VoucherNoWiseReport;
