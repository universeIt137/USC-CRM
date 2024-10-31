import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { filterDate, matchingData } from "../../../Utils/helper";
import toast from "react-hot-toast";
import {
  getAllCollection,
  getTotalAmountFilterCollection,
} from "../../../Utils/collectionDetails";
import CollectionTable from "./CollectionTable";
import { getCourseCollectionData } from "../../../Utils/courseCollectionTotal";
import CourseCollectionTable from "./CourseCollectionTable";

const PurposeWiseReport = () => {
  const [filterData, setFilterData] = useState([]);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const componentRef = useRef();
  const [show, setShow] = useState(false);
  const moneyReceiptRef = useRef();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const { data: allPurposeName = [] } = useQuery({
    queryKey: ["allPurposeName"],
    queryFn: async () => {
      const res = await fetch(
        `https://uiti-crm-server.vercel.app/collection-head`
      );
      const data = await res.json();
      return data;
    },
  });

  const { data: collections = [], refetch } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const data = await getAllCollection();
      return data;
    },
  });

  const { data: admissions = [] } = useQuery({
    queryKey: ["admissions"],
    queryFn: async () => {
      const data = await getCourseCollectionData();
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

  // -------------Collection Date to Date wise Filter Start--------------------

  const handleCollectionDateSearch = () => {
    let resultFilterDate = filterDate(collections, startDate, endDate);
    console.log(resultFilterDate)

    let filterPurpose;

    if (startDate && endDate) {
      filterPurpose = matchingData(
        resultFilterDate,
        "purpose",
        moneyReceiptRef.current.value
      );
    } else {
      filterPurpose = matchingData(
        collections,
        "purpose",
        moneyReceiptRef.current.value
      );
    }


    let totalAmount = getTotalAmountFilterCollection(filterPurpose);

    setExpenseTotal(totalAmount);
    console.log(totalAmount);

    setFilterData(filterPurpose);

    setShow(true);

    toast.success("Data filtered successfully");
  };


  // -------------Collection Date to Date wise Filter End--------------------

  return (
    <div className="mx-2 mt-2 mb-6">
      <div className="flex flex-row justify-around text-center p-2">
        <h2 className="text-2xl font-bold">Purpose Wise Collection Report!</h2>
      </div>

      <div className="flex flex-row justify-center mb-4 ">
        <div className="form-control mx-2">
          <label className="label">
            <span className="label-text">Purpose Name</span>
          </label>
          <select
            ref={moneyReceiptRef}
            className="select   select-sm w-full border-accent outline-0  ring-0 focus:ring-0 focus:outline-0  "
          >
            <option>Purpose Name</option>
            {allPurposeName.users?.map((user) => (
              <option key={user._id} value={user.purpose}>
                {user.purpose}
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

        <div className="mt-8 mx-4">
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
          <div className="flex flex-row justify-around text-center p-2">
            <div>
              <h1 className="font-bold text-3xl">Universe It Institute</h1>
              <h3>
                {startDate} to {endDate} Extra Collection {expenseTotal} BDT
              </h3>
            </div>
          </div>
        )}

        <h1 className="font-bold ">Purpose Wise Course Collection Report</h1>

        <CourseCollectionTable
          filterData={[]}
          startDate={startDate}
          endDate={endDate}
        ></CourseCollectionTable>

        <h1 className="font-bold mt-4">Purpose Wise Extra Collection Report</h1>
        <CollectionTable filterData={filterData} refetch={refetch} />

        <div className="mt-2 mx-1 flex justify-end font-semibold text-2xl">
          <p className="p-1 border-2">
            {" "}
            Total Purpose Wise Collection : {expenseTotal} BDT
          </p>
        </div>
      </div>
    </div>
  );
};

export default PurposeWiseReport;
