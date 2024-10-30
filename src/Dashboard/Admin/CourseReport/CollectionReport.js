import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import {
  getCourseCollectionData,
  getCourseCollectionTotal,
} from "../../../Utils/courseCollectionTotal";
import CourseCollectionTable from "../Collection/CourseCollectionTable";
import { startCase } from "lodash";

const CollectionReport = () => {
  const [filterData, setFilterData] = useState([]);
  const [total, setTotal] = useState(0);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [show, setShow] = useState(false);
  const componentRef = useRef();

  const { data: admissions = [] } = useQuery({
    queryKey: ["admissions"],
    queryFn: async () => {
      const data = await getCourseCollectionData();
      return data;
    },
  });

  const handleCollectionStartInputChange = (event) => {
    const value = event.target.value;
    setStartDate(value);
  };


  const handleCollectionEndInputChange = (event) => {
    const value = event.target.value;
    setEndDate(value);
  };

  useEffect(() => {
    if (filterData.length > 0) {
      const totalCollection = getCourseCollectionTotal(filterData, startDate, endDate);
      setTotal(totalCollection);
    }
  }, [filterData, startDate, endDate]);

  const handleCollectionDateSearch = () => {
    const filteredData = admissions.filter(
      (a) =>
        (a.firstInstallmentDate >= startDate && a.firstInstallmentDate <= endDate) ||
        (a.secondInstallmentDate >= startDate && a.secondInstallmentDate <= endDate) ||
        (a.thirdInstallmentDate >= startDate && a.thirdInstallmentDate <= endDate)
    );

    setFilterData(filteredData); 
    setShow(true); 
  };


  return (
    <div className="mx-2 my-6">
      <div className="flex flex-row justify-around">
        <h2 className="text-2xl font-bold">Date Wise Collection Report!</h2>
      </div>

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

      <div ref={componentRef}>
        {show && (
          <div className="text-center p-2">
            <h1 className="font-bold text-3xl">Universe It Institute</h1>
            <h3>
              {startDate} to {endDate} Collection {total} BDT
            </h3>
          </div>
        )}

        <h1 className="font-bold ">Date Wise Course Collection Report</h1>

        <CourseCollectionTable
          filterData={filterData}
          startDate={startDate}
          endDate={endDate}
        ></CourseCollectionTable>

        <div className="mt-2 mx-1 flex justify-end">
          <p className="p-1 border-2"> Total : {total} BDT</p>
        </div>
      </div>
    </div>
  );
};

export default CollectionReport;
