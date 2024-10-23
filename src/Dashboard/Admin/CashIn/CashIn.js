import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import {
  getAllCollection,
  getTotalAmountFilterCollection,
} from "../../../Utils/collectionDetails";
import {
  getCourseCollectionData,
  getCourseCollectionTotal,
} from "../../../Utils/courseCollectionTotal";
import CourseCollectionTable from "../Collection/CourseCollectionTable";
import CollectionTable from "../Collection/CollectionTable";
import ExpenseTable from "../Expense/ExpenseTable";
import { getAllExpenseData, getExpenseTotal } from "../../../Utils/expenseData";

const CashIn = () => {
  const [filterData, setFilterData] = useState([]);
  // const [collections, setCollectionData] = useState([]);
  const [filterCollectionsCourse, setFilterCourseCollectionData] = useState([]);
  const [expenseDataDetails, setExpenseDataDetails] = useState([]);
  const [expenseTotal, setExpenseTotal] = useState([]);
  const [extraCollectionTotal, setExtraCollectionTotal] = useState([]);
  const [courseCollectionTotal, setCourseCollectionTotal] = useState([]);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const componentRef = useRef();
  const [show, setShow] = useState(false);

  const [totalCourseCollection, setTotalCourseCollection] = useState(0);
  const [totalExtraCollection, setTotalExtraCollection] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const { data: collections = [], refetch } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const data = await getAllCollection();
      let totalSum = getTotalAmountFilterCollection(data);
      setTotalExtraCollection(totalSum);
      return data;
    },
  });

  const { data: expenses = [] } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const data = await getAllExpenseData();
      const totalExpense = getExpenseTotal(data);
      setTotalExpense(totalExpense);
      return data;
    },
  });

  const { data: admissions = [] } = useQuery({
    queryKey: ["admissions"],
    queryFn: async () => {
      const data = await getCourseCollectionData();
      const totalAmount = getCourseCollectionTotal(data);

      setTotalCourseCollection(totalAmount);
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
    setShow(true);
    let resultCollectionData = collections?.filter(
      (a) => a.date >= startDate && a.date <= endDate
    );
    setFilterData(resultCollectionData);

    let totalSum = getTotalAmountFilterCollection(resultCollectionData);

    setExtraCollectionTotal(totalSum);

    //Course Collection Data
    let resultProductDataFrist = admissions.filter((a) => {
      if (
        a.fristInstallmentDate >= startDate &&
        a.fristInstallmentDate <= endDate
      ) {
        return true;
      }
      if (
        a.secondInstallmentDate >= startDate &&
        a.secondInstallmentDate <= endDate
      ) {
        return true;
      }
      if (
        a.thirdInstallmentDate >= startDate &&
        a.thirdInstallmentDate <= endDate
      ) {
        return true;
      }

      return false;
    });
    setFilterCourseCollectionData(resultProductDataFrist);

    const totalCourseCollection = getCourseCollectionTotal(
      resultProductDataFrist
    );

    setCourseCollectionTotal(totalCourseCollection);

    // Total Exprese
    let resultExpenseData = expenses?.filter(
      (a) =>
        a.date.slice(0, -14) >= startDate && a.date.slice(0, -14) <= endDate
    );

    setExpenseDataDetails(resultExpenseData);

    const total = getExpenseTotal(resultExpenseData);

    setExpenseTotal(total);
    // console.log("end ")
  };
  // -------------Collection Date to Date wise Filter End--------------------

  return (
    <div className="mx-2 mt-2 mb-6">
      <div className="flex flex-row justify-around text-center p-2">
        <h2 className="text-2xl font-bold">Date Wise Cash Report!</h2>
      </div>
      {/* ------Collection Start Date and End Date------ */}
      <div className="flex flex-row justify-center  ">
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
          <div className="flex flex-row justify-around text-center p-2">
            <div>
              <h1 className="font-bold text-3xl">Universe It Institute</h1>
              <h3>
                {startDate} to {endDate} Total Cash Report{" : "}
                <span className="font-semibold">
                  {totalCourseCollection + totalExtraCollection - totalExpense}
                </span>{" "}
                BDT
              </h3>
            </div>
          </div>
        )}
        <div>
          <h1 className="font-bold ">Date Wise Course Collection Report</h1>
          {show && (
            <div className="text-center p-2">
              <h3 className="font-bold text-1xl">
                {startDate} to {endDate} Course Collection{" "}
                {courseCollectionTotal} BDT
              </h3>
            </div>
          )}

          <CourseCollectionTable
            filterData={filterCollectionsCourse}
            startDate={startDate}
            endDate={endDate}
          ></CourseCollectionTable>

          <div className="mt-2 mx-1 flex justify-end">
            <p className="p-1 border-2">
              {" "}
              Filter Date Course Collection : {courseCollectionTotal} BDT
            </p>
          </div>
        </div>

        <div>
          <h1 className="font-bold  ">Date Wise Extra Collection Report</h1>
          {show && (
            <div className="text-center p-2">
              <h3 className="font-bold text-1xl">
                {startDate} to {endDate} Extra Collection {extraCollectionTotal}{" "}
                BDT
              </h3>
            </div>
          )}

          <CollectionTable filterData={filterData} refetch={refetch} />

          <div className="mt-2 mx-1 flex justify-end">
            <p className="p-1 border-2">
              {" "}
              Filter Date Extra Collection : {extraCollectionTotal} BDT
            </p>
          </div>
        </div>

        <div>
          <h1 className="font-bold  ">Date Wise Expense Report</h1>
          {show && (
            <div className="text-center p-2">
              <h3 className="font-bold text-1xl">
                {startDate} to {endDate} Total Expense {expenseTotal} BDT
              </h3>
            </div>
          )}

          <ExpenseTable expenseDatas={expenseDataDetails} refetch={refetch} />

          <div className="mt-2 mx-1 flex justify-end">
            <p className="p-1 border-2">
              Filter Date Expense : {expenseTotal} BDT
            </p>
          </div>

          <div className="mt-2 mx-1 gap-10 flex justify-end">
            <table className="table table-zebra border-2  ">
              <tbody>
                <tr>
                  <th>Total Course Collection</th>
                  <td>{totalCourseCollection}</td>
                  <td>BDT</td>
                </tr>
                <tr className="hover">
                  <th>Total Extra Collection</th>
                  <td>{totalExtraCollection}</td>
                  <td>BDT</td>
                </tr>
                <tr>
                  <th>Total Collection</th>
                  <td>{totalCourseCollection + totalExtraCollection}</td>
                  <td>BDT</td>
                </tr>
                <tr>
                  <th>Total Expense</th>
                  <td>{totalExpense}</td>
                  <td>BDT</td>
                </tr>
                <tr>
                  <th>Total Cash In</th>
                  <td>
                    {totalCourseCollection +
                      totalExtraCollection -
                      totalExpense}
                  </td>
                  <td>BDT</td>
                </tr>
              </tbody>
            </table>

            <table className="table table-zebra border-2  ">
              <tbody className=" ">
                <tr>
                  <th>Filter Date Course Collection</th>
                  <td>{courseCollectionTotal}</td>
                  <td>BDT</td>
                </tr>
                <tr className="hover ">
                  <th>Filter Date Extra Collection</th>
                  <td>{extraCollectionTotal}</td>
                  <td>BDT</td>
                </tr>
                <tr>
                  <th>Filter Date Collection</th>
                  <td>{courseCollectionTotal + extraCollectionTotal}</td>
                  <td>BDT</td>
                </tr>
                <tr>
                  <th>Filter Date Expense</th>
                  <td>{expenseTotal}</td>
                  <td>BDT</td>
                </tr>
                <tr>
                  <th>Filter Date Cash In</th>
                  <td>
                    {courseCollectionTotal +
                      extraCollectionTotal -
                      expenseTotal}
                  </td>
                  <td>BDT</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashIn;
