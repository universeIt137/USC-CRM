import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { matchingData } from "../../../Utils/helper";
import Loading from "../../../Pages/Shared/loading";
import { getAllExpenseData, getExpenseTotal } from "../../../Utils/expenseData";
import {
  getAllCollection,
  getTotalAmountFilterCollection,
} from "../../../Utils/collectionDetails";
import {
  getCourseCollectionData,
  getCourseCollectionTotal,
} from "../../../Utils/courseCollectionTotal";
import ExpenseTable from "./ExpenseTable";

const Expense = () => {
  const [expenseDatas, setEpenseDatas] = useState([]);
  const voucherNoRef = useRef();
  const [voucharNo, setVoucharNo] = useState();
  const [totalExtraCollection, setTotalExtraCollection] = useState();
  const [totalExpense, setTotalExpense] = useState();
  const [loading, setLoading] = useState(false);

  const { data: expenses = [], refetch } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      setLoading(true);
      const data = await getAllExpenseData();
      const totalExpense = getExpenseTotal(data);
      setTotalExpense(totalExpense);
      setEpenseDatas(data);
      setLoading(false);
      return data;
    },
  });

  const { data: extraCollections = [] } = useQuery({
    queryKey: ["collectionDatas"],
    queryFn: async () => {
      setLoading(true);
      const datas = await getAllCollection();
      const total = getTotalAmountFilterCollection(datas);
      setTotalExtraCollection(total);
      setLoading(false);
      return datas;
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
    setEpenseDatas(fData);
    toast.success("Data filtered successfully");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold my-2">Expense History!</h2>
      <div className="flex justify-between border-2 p-2 font-bold text-left">
        <div>
          <div className="text-1xl flex ">
            <p className="w-[180px]">Total Course Collection </p>
            <p>: {courseCollectionsTotal} BDT</p>
          </div>
          <div className="text-1xl flex ">
            <p className="w-[180px]">Total Extra Collection </p>
            <p>: {totalExtraCollection} BDT</p>
          </div>
          <div className="text-1xl flex ">
            <p className="w-[180px]">Total Expense </p>
            <p>: {totalExpense} BDT</p>
          </div>
          <div className="text-1xl flex ">
            <p className="w-[180px]"> Total Cash In </p>
            <p>
              : {courseCollectionsTotal + totalExtraCollection - totalExpense}{" "}
              BDT
            </p>
          </div>
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
        </div>
        <hr></hr>
      </div>

      <div>
        <div className="overflow-x-auto" style={{ height: "430px" }}>
          <form>
            {loading ? (
              <div className="mt-6">
                <Loading />
              </div>
            ) : (
              <>
                <ExpenseTable
                  expenseDatas={expenseDatas}
                  refetch={refetch}
                  showAction={true}
                />
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Expense;
