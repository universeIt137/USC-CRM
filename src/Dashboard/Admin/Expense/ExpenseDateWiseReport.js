import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import ReactToPrint from "react-to-print";
import { filterDate } from "../../../Utils/helper";
import { getAllExpenseData, getExpenseTotal } from "../../../Utils/expenseData";
import {
  getCourseCollectionData,
  getCourseCollectionTotal,
} from "../../../Utils/courseCollectionTotal";
import { useQuery } from "@tanstack/react-query";
import {
  getAllCollection,
  getTotalAmountFilterCollection,
} from "../../../Utils/collectionDetails";
import ExpenseTable from "./ExpenseTable";

const ExpenseDateWiseReport = () => {
  const [filterData, setFilterData] = useState([]);

  const [extraCollectionTotal, setExtraCollectionTotal] = useState([]);
  const [expenseTotal, setExpenseTotal] = useState([]);
  const [collectionTotal, setCollectionTotal] = useState([]);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const componentRef = useRef();
  const [show, setShow] = useState(false);

  const { data: collectionData = [] } = useQuery({
    queryKey: ["collectionData"],
    queryFn: async () => {
      const data = await getAllCollection();
      return data;
    },
  });

  const { data: courseCollections } = useQuery({
    queryKey: ["courseCollections "],
    queryFn: async () => {
      const data = await getCourseCollectionData();
      return data;
    },
  });

  const { data: expenses = [], refetch } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const data = await getAllExpenseData();
      return data;
    },
  });

  // -------------Collection Date to Date wise Filter Start--------------------
  const handleCollectionStartInputChange = (event) => {
    const value = event.target.value;
    setStartDate(value);
  };

  const handleCollectionEndInputChange = (event) => {
    const value = event.target.value;
    setEndDate(value);
  };

  const handleCollectionDateSearch = () => {
    const resultExpenseData = filterDate(expenses, startDate, endDate);

    setFilterData(resultExpenseData);
    setShow(true);

    var totalAmount = getExpenseTotal(resultExpenseData);
    setExpenseTotal(totalAmount);

    const resultCollectionData = filterDate(
      collectionData,
      startDate,
      endDate
    );

    setFilterData(resultExpenseData);
    setShow(true);

    let totalSum = getTotalAmountFilterCollection(resultCollectionData);

    setExtraCollectionTotal(totalSum);

    // Collection Data
    const filteredData = courseCollections.filter(
      (a) =>
        (a.firstInstallmentDate >= startDate && a.firstInstallmentDate <= endDate) ||
        (a.secondInstallmentDate >= startDate && a.secondInstallmentDate <= endDate) ||
        (a.thirdInstallmentDate >= startDate && a.thirdInstallmentDate <= endDate)
    );

    const filtering = [
      filteredData
    ];

    setShow(true);
    // console.log(resultProductDataThird)



    const totalCollection = getCourseCollectionTotal(filtering,startDate,endDate);

    setCollectionTotal(totalCollection);

    console.log("collectionTotal is",collectionTotal);

    toast.success("Data filtered successfully");
  };
  // -------------Collection Date to Date wise Filter End--------------------

  return (
    <div className="mx-2 my-6">
      <div className="flex flex-row justify-around">
        <h2 className="text-2xl font-bold">Date Wise Expense Report!</h2>
      </div>

      {/* ------Collection Start Date and End Date------ */}
      <div className="flex flex-row justify-center mt-2">
        <div className="form-control mx-2">
          <label className="label">
            <span className="label-text">Collection Start Date</span>
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
            <span className="label-text">Collection End Date</span>
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
      {/* ------Collection Start Date and End Date------ */}

      <div ref={componentRef}>
        {show && (
          <div className="text-center p-2">
            <h1 className="font-bold text-3xl">Universe It Institute</h1>
            <h3>
              {startDate} to {endDate} Expense {expenseTotal} BDT
            </h3>
          </div>
        )}
        <ExpenseTable expenseDatas={filterData} refetch={refetch} />

        <div className="mt-2 mx-1 flex justify-end font-semibold text-xl">
          <p className="p-1 border-2">
            {" "}
            Total Collection : {collectionTotal + extraCollectionTotal} BDT
          </p>
          <p className="p-1 border-2"> Total Expense : {expenseTotal} BDT</p>
          <p className="p-1 border-2">
            {" "}
            Total Profit :{" "}
            {(collectionTotal + extraCollectionTotal) - expenseTotal} BDT
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseDateWiseReport;
