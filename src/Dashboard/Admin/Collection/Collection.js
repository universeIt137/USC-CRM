import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { matchingData } from "../../../Utils/helper";
import Loading from "../../../Pages/Shared/loading";
import {
  getAllCollection,
  getTotalAmountFilterCollection,
} from "../../../Utils/collectionDetails";
import {
  getCourseCollectionData,
  getCourseCollectionTotal,
} from "../../../Utils/courseCollectionTotal";
import CollectionTable from "./CollectionTable";

const Collection = () => {
  const [filterData, setFilterData] = useState([]);
  const [moneyReceiptNo, setMoneyReceiptNoNo] = useState();
  const [extraCollections, setExtraCollections] = useState("");

  const moneyReceiptRef = useRef();
  const [loading, setLoading] = useState(false);

  const { data: collections = [], refetch } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      setLoading(true);
      const data = await getAllCollection();
      let totalSum = getTotalAmountFilterCollection(data);

      setExtraCollections(totalSum);
      setFilterData(data);
      setLoading(false);
      return data;
    },
  });

  const { data: courseCollectionsTotal } = useQuery({
    queryKey: ["courseCollectionsTotal"],
    queryFn: async () => {
      const datas = await getCourseCollectionData();
      const total = getCourseCollectionTotal(datas);
      return total;
    },
  });

  // const { data: collections = [], refetch } = useQuery({
  //   queryKey: ["collections"],
  //   queryFn: async () => {
  //     setLoading(true);
  //     const res = await fetch(`https://demo-usc-crm-software.vercel.app/collection`);
  //     const data = await res.json();

  //     let fdata = [...data?.collection];

  //     fdata?.sort(function (a, b) {
  //       if (a?.date?.slice(0, 10) < b?.date?.slice(0, 10)) {
  //         return -1;
  //       }
  //       if (b?.date?.slice(0, 10) < a?.date?.slice(0, 10)) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //     setFilterData(fdata);
  //     setLoading(false);

  //     return data;
  //   },
  // });

  
  const filterByMoneyReceipt = () => {
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
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Total Collection!</h2>
      <div className="flex justify-between border-2 p-2 py-4 font-bold text-left">
        <div>
          <div className="text-1xl flex ">
            <p className="w-[180px]">Total Course Collection </p>
            <p>: {courseCollectionsTotal} BDT</p>
          </div>
          <div className="text-1xl flex ">
            <p className="w-[180px]">Total Extra Collection </p>
            <p>: {extraCollections} BDT</p>
          </div>
          <div className="text-1xl flex ">
            <p className="w-[180px]">Total Collection </p>
            <p>: {courseCollectionsTotal + extraCollections} BDT</p>
          </div>
        </div>

        <div className="flex flex-row justify-center mt-2">
          <div className="  mx-2">
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
              <span className="label-text">Money Receipt No</span>
            </label>
            <input
              onChange={(e) => setMoneyReceiptNoNo(e.target.value)}
              type="text"
              className="input input-accent  input-sm focus:ring-0 focus:outline-0 focus:input-sm  focus:border-2 w-full max-w-xs"
            />
          </div>

          <div className="mt-8 mx-2">
            <button
              onClick={filterByMoneyReceipt}
              className="btn btn-sm btn-accent mt-1 text-black/[0.8] font-semibold"
            >
              Filter
            </button>
          </div>

          <div className="mt-8 mx-2">
            <button
              onClick={() => refetch()}
              className="btn btn-sm btn-info mt-1 text-black/[0.8] font-semibold"
            >
              reset
            </button>
          </div>
        </div>

        <hr></hr>
      </div>

      {loading ? (
        <div className="mt-8 ">
          <Loading />
        </div>
      ) : (
        <CollectionTable
          filterData={filterData}
          refetch={refetch}
          showAction={true}
        />
      )}
    </div>
  );
};

export default Collection;
