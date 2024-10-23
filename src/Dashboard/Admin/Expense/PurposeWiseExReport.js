import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import ReactToPrint from "react-to-print";
import { filterDate, matchingData } from "../../../Utils/helper";
import { getAllExpenseData, getExpenseTotal } from "../../../Utils/expenseData";
import { useQuery } from "@tanstack/react-query";
import ExpenseTable from "./ExpenseTable";

const PurposeWiseExReport = () => {
  const [filterData, setFilterData] = useState([]);
  const componentRef = useRef();
  const [show, setShow] = useState(false);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const voucherNoRef = useRef();

  const { data: expenses = [], refetch } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const data = await getAllExpenseData();
      return data;
    },
  });

  const uniqueExpensesData = [
    ...new Set(expenses?.map((user) => user.purpose)),
  ];

  // -------------Collection Date to Date wise Filter Start--------------------
  const handleCollectionStartInputChange = (event) => {
    const value = event.target.value;
    setStartDate(value);
  };

  const handleCollectionEndInputChange = (event) => {
    const value = event.target.value;
    setEndDate(value);
  };

  // -------------Collection Date to Date wise Filter Start--------------------

  const handleCollectionDateSearch = () => {
    setShow(true);

    let resultFilterDate = filterDate(expenses, startDate, endDate);

    let filterPurpose;

    if (startDate && endDate) {
      filterPurpose = matchingData(
        resultFilterDate,
        "purpose",
        voucherNoRef.current.value
      );
    } else {
      filterPurpose = matchingData(
        expenses,
        "purpose",
        voucherNoRef.current.value
      );
    }

    setFilterData(filterPurpose);

    var totalAmount = getExpenseTotal(filterPurpose);

    // var totalAmount = 0;
    // for (var i = 0; i < filterPurpose.length; i++) {
    //   totalAmount += filterPurpose[i].amount;
    // }
    setExpenseTotal(totalAmount);
    console.log(totalAmount);

    toast.success("Data filtered successfully");
  };
  // -------------Collection Date to Date wise Filter End--------------------

  return (
    <div className="mx-2 my-6">
      <div className="flex flex-row justify-around">
        <h2 className="text-2xl font-bold">Purpose Wise Expense Report!</h2>
      </div>

      <div className="flex flex-row justify-center mt-2">
        <div className="form-control mx-2">
          <label className="label">
            <span className="label-text">Purpose Name</span>
          </label>
          <select
            ref={voucherNoRef}
            className="select   select-sm w-full border-accent outline-0  ring-0 focus:ring-0 focus:outline-0  "
          >
            <option>Purpose Name</option>
            {uniqueExpensesData.map((purpose, index) => (
              <option key={index} value={purpose}>
                {purpose}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control mx-2">
          <label className="label">
            <span className="label-text">Purpose Start Date</span>
          </label>
          <input
            onChange={handleCollectionStartInputChange}
            name=""
            type="date"
            className="input input-accent  input-sm focus:ring-0 focus:outline-0 focus:input-sm  focus:border-2 w-full max-w-xs"
          />
        </div>

        <div className="form-control mx-2">
          <label className="label">
            <span className="label-text">Purpose End Date</span>
          </label>
          <input
            onChange={handleCollectionEndInputChange}
            name=""
            type="date"
            className="input input-accent  input-sm focus:ring-0 focus:outline-0 focus:input-sm  focus:border-2 w-full max-w-xs"
          />
        </div>

        <div className="mt-8 mx-2">
          <button
            onClick={handleCollectionDateSearch}
            className="btn btn-sm   text-white btn-accent   hover:btn-accent/[.8]   border-0"
          >
            Filter
          </button>
        </div>

        <div className="my-8 mx-4">
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

        <div className="mt-2 mx-1 flex justify-end font-semibold text-2xl">
          <p className="p-1 border-2"> Total Expense : {expenseTotal} BDT</p>
        </div>
      </div>
    </div>
  );
};

export default PurposeWiseExReport;
