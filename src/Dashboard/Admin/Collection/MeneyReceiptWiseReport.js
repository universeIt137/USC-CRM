import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { matchingData } from "../../../Utils/helper";
import toast from "react-hot-toast";
import { getAllCollection } from "../../../Utils/collectionDetails";
import CollectionTable from "./CollectionTable";
import CourseCollectionTable from "./CourseCollectionTable";

const MeneyReceiptWiseReport = () => {
  const [filterData, setFilterData] = useState([]);
  const componentRef = useRef();
  const [show, setShow] = useState(false);
  const moneyReceiptRef = useRef();
  const [moneyReceiptNo, setMoneyReceiptNoNo] = useState();

  const { data: collections = [], refetch } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const data = await getAllCollection();
      return data;
    },
  });

  // -------------Collection Date to Date wise Filter Start--------------------

  const handleCollectionDateSearch = () => {
    let fData;
    if (moneyReceiptNo) {
      fData = matchingData(collections, "moneyReceipt", moneyReceiptNo);
    } else {
      fData = matchingData(
        collections,
        "moneyReceipt",
        moneyReceiptRef.current.value
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
        <h2 className="text-2xl font-bold">
          Money Receipt Wise CollectionReport!
        </h2>
      </div>

      <div className="flex flex-row justify-center mt-2">
        <div className="form-control mx-2">
          <label className="label">
            <span className="label-text">Money Receipt No</span>
          </label>
          <select
            ref={moneyReceiptRef}
            className="select   select-sm w-full border-accent outline-0  ring-0 focus:ring-0 focus:outline-0  "
          >
            <option>Money Receipt No</option>
            {collections?.map((user) => (
              <option key={user._id} value={user.moneyReceipt}>
                {user.moneyReceipt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Voucher No</span>
          </label>
          <input
            onChange={(e) => setMoneyReceiptNoNo(e.target.value)}
            type="text"
            className="input input-accent  input-sm focus:ring-0 focus:outline-0 focus:input-sm  focus:border-2 w-full max-w-xs"
          />
        </div>

        <div className="mt-8 mx-2">
          <button
            onClick={handleCollectionDateSearch}
            className="btn btn-sm btn-accent   text-black/[0.8] font-semibold"
          >
            Filter
          </button>
        </div>

        <div className="my-8 mx-4">
          <ReactToPrint
            trigger={() => (
              <button className="btn btn-sm   text-white bg-green-500   hover:bg-green-400   border-0">
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

        <h1 className="font-bold ">
          Meney Receipt Wise Course Collection Report
        </h1>

        <CourseCollectionTable
          filterData={[]}
          startDate={""}
          endDate={""}
        ></CourseCollectionTable>

        <h1 className="font-bold mt-4">
          Meney Receipt Wise Extra Collection Report
        </h1>

        <CollectionTable filterData={filterData} refetch={refetch} />
      </div>
    </div>
  );
};

export default MeneyReceiptWiseReport;
