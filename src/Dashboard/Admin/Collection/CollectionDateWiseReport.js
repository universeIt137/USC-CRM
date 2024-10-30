import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { filterDate } from "../../../Utils/helper";
import { useQuery } from "@tanstack/react-query";
import CollectionModal from "./CollectionModal";
import {
  getCourseCollectionData,
  getCourseCollectionTotal,
} from "../../../Utils/courseCollectionTotal";
import {
  getAllCollection,
  getTotalAmountFilterCollection,
} from "../../../Utils/collectionDetails";
import CollectionTable from "./CollectionTable";
import Loading from "../../../Pages/Shared/loading";
import CourseCollectionTable from "./CourseCollectionTable";

const CollectionDateWiseReport = () => {
  const [filterData, setFilterData] = useState([]);
  const [filterCourseData, setFilterCourseData] = useState([]);
  const [collections, setCollectionData] = useState([]);
  const [extraCollectionTotal, setExtraCollectionTotal] = useState();
  const [courseCollectionTotal, setCourseCollectionTotal] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const componentRef = useRef();

  const { data: collectionDatas = [], refetch } = useQuery({
    queryKey: ["collectionDatas"],
    queryFn: async () => {
      setLoading(true);
      const data = await getAllCollection();
      setCollectionData(data);
      setLoading(false);
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

  useEffect(() => {
    if (filterCourseData.length > 0) {
      const totalCollection = getCourseCollectionTotal(filterCourseData, startDate, endDate);
      setCourseCollectionTotal(totalCollection);
    }
  }, [filterCourseData, startDate, endDate]);

  const handleCollectionDateSearch = async () => {
    // var resultExpenseData = collections?.collection?.filter(a => (a.createdAt) >= startDate && (a.createdAt) <= endDate);

    const resultExpenseData = filterDate(collections, startDate, endDate);

    setFilterData(resultExpenseData);

    setShow(true);

    let totalSum = getTotalAmountFilterCollection(resultExpenseData);

    setExtraCollectionTotal(totalSum);

    const filteredData = admissions.filter(
      (a) =>
        (a.firstInstallmentDate >= startDate && a.firstInstallmentDate <= endDate) ||
        (a.secondInstallmentDate >= startDate && a.secondInstallmentDate <= endDate) ||
        (a.thirdInstallmentDate >= startDate && a.thirdInstallmentDate <= endDate)
    );

    setShow(true);
    setFilterCourseData(filteredData)
  };
  // -------------Collection Date to Date wise Filter End--------------------

  return (
    <div className="mx-2 mt-2 mb-6   ">
      <div className="flex flex-row justify-around">
        <div className="text-center p-2">
          <h1 className="font-bold text-3xl">Universe It Institute</h1>
          <h2 className="text-xl font-bold">Date Wise Collection Report!</h2>
          {show && (
            <h3>
              {startDate} to {endDate} Extra Collection {extraCollectionTotal}{" "}
              BDT
            </h3>
          )}
        </div>
      </div>

      {/* ------Collection Start Date and End Date------ */}
      <div className="flex flex-row justify-center ">
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
            className="btn btn-sm   text-white bg-green-500   hover:bg-green-400   border-0"
          >
            Filter
          </button>
        </div>

        <div className="my-8 mx-4">
          <ReactToPrint
            trigger={() => (
              <button className="btn btn-sm btn-accent   text-black/[0.8] font-semibold">
                Print
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>
      </div>
      {/* ------Collection Start Date and End Date------ */}

      <div ref={componentRef}>
        {loading ? (
          <div className="mt-8 ">
            <Loading />
          </div>
        ) : (
          <>
            <h1 className="font-bold ">Date Wise Course Collection Report</h1>

            <CourseCollectionTable
              filterData={filterCourseData}
              startDate={startDate}
              endDate={endDate}
            ></CourseCollectionTable>

            <h1 className="font-bold mt-4">
              Date Wise Extra Collection Report
            </h1>
            <CollectionTable filterData={filterData} refetch={refetch} />
            <div className="mt-2 mx-1 flex justify-end">
              <p className="p-1 border-2 mr-2">
                {" "}
                Total Course Collection : {courseCollectionTotal} BDT
              </p>
              <p className="p-1 border-2 mr-2">
                {" "}
                Total Extra Collection : {extraCollectionTotal} BDT
              </p>
              <p className="p-1 border-2 mr-2">
                == Total Collection :{" "}
                {courseCollectionTotal + extraCollectionTotal} BDT
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CollectionDateWiseReport;
