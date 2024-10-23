import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { getAllCollection } from "../../../Utils/collectionDetails";
import { matchingData } from "../../../Utils/helper";
import CollectionTable from "../Collection/CollectionTable";
import CourseCollectionTable from "../Collection/CourseCollectionTable";
import {
  getCourseCollectionData,
  getCourseCollectionTotal,
} from "../../../Utils/courseCollectionTotal";

const PayGetAccountsReport = () => {
  const [filterData, setFilterData] = useState([]);
  const [filterExtraCollectionData, setFilterExtraCollectionData] = useState(
    []
  );
  const [total, setTotal] = useState([]);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const componentRef = useRef();

  const [show, setShow] = useState(false);

  const payGetwayRef = useRef();

  const { data: collections = [], refetch } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const data = await getAllCollection();
      return data;
    },
  });

  const { data: payGetwaysName = [] } = useQuery({
    queryKey: ["payGetwaysName"],
    queryFn: async () => {
      const res = await fetch(
        `https://demo-usc-crm-software.vercel.app/pay-getway`
      );
      const data = await res.json();
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

  const handleCollectionStartInputChange = (event) => {
    const value = event.target.value;
    setStartDate(value);
  };

  const handleCollectionEndInputChange = (event) => {
    const value = event.target.value;
    setEndDate(value);
  };

  const handleCollectionDateSearch = () => {
    const fData = admissions?.filter(
      (si) =>
        (si.fristPaymentAccounts ||
          si.secondPaymentAccounts ||
          si.thirdPaymentAccounts) === payGetwayRef.current.value
    );
    var resultProductDataFrist = fData.filter(
      (a) =>
        a.fristInstallmentDate >= startDate && a.fristInstallmentDate <= endDate
    );
    setShow(true);

    var resultProductDataTwo = fData.filter(
      (a) =>
        a.secondInstallmentDate >= startDate &&
        a.secondInstallmentDate <= endDate
    );

    var resultProductDataThird = fData.filter(
      (a) =>
        a.thirdInstallmentDate >= startDate && a.thirdInstallmentDate <= endDate
    );

    const fitering = [
      ...resultProductDataFrist,
      ...resultProductDataTwo,
      ...resultProductDataThird,
    ];
    setFilterData(fitering);

    const totalColloction = getCourseCollectionTotal(fitering);
    setTotal(totalColloction);

    // extra collection data filter adn show

    let datas = matchingData(
      collections,
      "payType",
      payGetwayRef.current.value
    );

    setFilterExtraCollectionData(datas);
  };
  console.log(collections);

  return (
    <div className="mx-2 my-6">
      <div className="flex flex-row justify-around">
        <h2 className="text-2xl font-bold">Payment Getway Wise Report!</h2>
      </div>

      <div className="flex flex-row justify-center mt-2">
        <div className="form-control mx-2">
          <label className="label">
            <span className="label-text">Payment Getway Name</span>
          </label>
          <select
            ref={payGetwayRef}
            className="select   select-sm w-full border-accent outline-0  ring-0 focus:ring-0 focus:outline-0  "
          >
            <option>Payment Getway Name</option>
            {payGetwaysName?.users?.map((user) => (
              <option key={user._id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

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

        <h1 className="font-bold ">
          Payment Getway Wise Course Collection Report
        </h1>

        <CourseCollectionTable
          filterData={filterData}
          startDate={startDate}
          endDate={endDate}
        ></CourseCollectionTable>

        <h1 className="font-bold mt-4">
          Payment Getway Wise Extra Collection Report
        </h1>

        <CollectionTable
          filterData={filterExtraCollectionData}
          refetch={refetch}
        />

        {/* <div className="overflow-auto">
          <form>
            <table className="table w-full">
              <thead
                className="sticky top-0 bg-slate-300"
                style={{ width: "1200px" }}
              >
                <tr className="text-xs">
                  <th className="p-1 border-2">#</th>
                  <th className="p-1 border-2">C.N</th>
                  <th className="p-1 border-2">B.N</th>
                  <th className="p-1 border-2">U.N</th>
                  <th className="p-1 border-2">Name</th>
                  <th className="p-1 border-2">Phone</th>
                  <th className="p-1 border-2">Payment Method</th>
                  <th className="p-1 border-2">Transaction Id</th>
                  <th className="p-1 border-2">Transaction Date</th>
                  <th className="p-1 border-2">Pay Ammount</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {filterData.length > 0 &&
                  filterData?.map((admission, i) => (
                    <>
                      <tr>
                        <th className="p-1 border-2">{i + 1}</th>
                        <td className="p-1 border-2">
                          {admission?.course.name}
                        </td>
                        <td className="p-1 border-2">
                          {admission?.batch.name}
                        </td>
                        <td className="p-1 border-2">{admission.user.name}</td>
                        <td className="p-1 border-2">{admission.name}</td>
                        <td className="p-1 border-2">
                          {admission?.phone?.split("p:", 2)}
                        </td>

                        <td className="p-1 border-2">
                          {new Date(admission.fristInstallmentDate) >=
                            new Date(startDate) &&
                          new Date(admission.fristInstallmentDate) <=
                            new Date(endDate)
                            ? admission.fristPaymentAccounts
                            : new Date(admission.secondInstallmentDate) >=
                                new Date(startDate) &&
                              new Date(admission.secondInstallmentDate) <=
                                new Date(endDate)
                            ? admission.secondPaymentAccounts
                            : new Date(admission.thirdInstallmentDate) >=
                                new Date(startDate) &&
                              new Date(admission.thirdInstallmentDate) <=
                                new Date(endDate)
                            ? admission.thirdPaymentAccounts
                            : 0}
                        </td>
                        <td className="p-1 border-2">
                          {new Date(admission.fristInstallmentDate) >=
                            new Date(startDate) &&
                          new Date(admission.fristInstallmentDate) <=
                            new Date(endDate)
                            ? admission.fristInstallmentTID
                            : new Date(admission.secondInstallmentDate) >=
                                new Date(startDate) &&
                              new Date(admission.secondInstallmentDate) <=
                                new Date(endDate)
                            ? admission.secondInstallmentTID
                            : new Date(admission.thirdInstallmentDate) >=
                                new Date(startDate) &&
                              new Date(admission.thirdInstallmentDate) <=
                                new Date(endDate)
                            ? admission.thirdInstallmentTID
                            : 0}
                        </td>

                        <td className="p-1 border-2">
                          {new Date(admission.fristInstallmentDate) >=
                            new Date(startDate) &&
                          new Date(admission.fristInstallmentDate) <=
                            new Date(endDate)
                            ? admission.fristInstallmentDate
                            : new Date(admission.secondInstallmentDate) >=
                                new Date(startDate) &&
                              new Date(admission.secondInstallmentDate) <=
                                new Date(endDate)
                            ? admission.secondInstallmentDate
                            : new Date(admission.thirdInstallmentDate) >=
                                new Date(startDate) &&
                              new Date(admission.thirdInstallmentDate) <=
                                new Date(endDate)
                            ? admission.thirdInstallmentDate
                            : 0}
                        </td>

                        <td className="p-1 border-2">
                          {new Date(admission.fristInstallmentDate) >=
                            new Date(startDate) &&
                          new Date(admission.fristInstallmentDate) <=
                            new Date(endDate)
                            ? admission.fristInstallment
                            : new Date(admission.secondInstallmentDate) >=
                                new Date(startDate) &&
                              new Date(admission.secondInstallmentDate) <=
                                new Date(endDate)
                            ? admission.secondInstallment
                            : new Date(admission.thirdInstallmentDate) >=
                                new Date(startDate) &&
                              new Date(admission.thirdInstallmentDate) <=
                                new Date(endDate)
                            ? admission.thirdInstallment
                            : 0}
                        </td>
                      </tr>
                    </>
                  ))}
              </tbody>
            </table>
          </form>
        </div> */}

        <div className="mt-2 mx-1 flex justify-end">
          <p className="p-1 border-2"> Total : {total} BDT</p>
        </div>
      </div>
    </div>
  );
};

export default PayGetAccountsReport;
