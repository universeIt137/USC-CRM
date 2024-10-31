import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";

const PaymentModal = ({ admission, setAdmission, refetchUpdateData }) => {
  const fristPaymentAccountsRef = useRef();
  const secondPaymentAccountsRef = useRef();
  const thirdPaymentAccountsRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const admissionFee = e?.target?.admissionFee?.value || "";
    const batch = e?.target?.batch?.value || "";
    const preBatch = e?.target?.preBatch?.value || "";

    const firstInstallment = e?.target?.firstInstallment?.value || "";
    const fristPaymentAccounts = fristPaymentAccountsRef?.current?.value || "";
    // console.log(fristPaymentAccounts)
    const fristInstallmentTID = e?.target?.fristInstallmentTID?.value || "";
    const fristInstallmentDate = e?.target?.fristInstallmentDate?.value || "";

    if (firstInstallment) {
      const fristInstallmentAmonut = Number(firstInstallment);
      const admissionFeeAmount = Number(admissionFee);

      if (fristInstallmentAmonut < 1) {
        toast.error("Frist Installment cannot be negative");
        return;
      }

      if (fristInstallmentAmonut > admissionFeeAmount) {
        toast.error(
          "Frist Installment cannot be grater than admissionFeeAmount"
        );
        return;
      }

      if (fristPaymentAccounts === "Pay Accounts") {
        toast.error("Please complete 1st Install pay account type");
        return;
      }
      if (!fristInstallmentTID) {
        toast.error("Please complete 1st Install Transection ID");
        return;
      }
      if (!fristInstallmentDate) {
        toast.error("Please complete 1st Install Installment Date:");
        return;
      }
    }

    const secondInstallment = e?.target?.secondInstallment?.value || "";
    const secondPaymentAccounts =
      secondPaymentAccountsRef?.current?.value || "";

    // console.log(secondPaymentAccounts)
    const secondInstallmentTID = e?.target?.secondInstallmentTID?.value || "";
    const secondInstallmentDate = e?.target?.secondInstallmentDate?.value || "";

    if (secondInstallment !== "0") {
      const secondInstallmentAmonut = Number(secondInstallment);
      const admissionFeeAmount = Number(admissionFee);

      if (secondInstallmentAmonut < 1) {
        toast.error("Second Installment cannot be negative");
        return;
      }

      if (secondInstallmentAmonut > admissionFeeAmount) {
        toast.error(
          "Second Installment cannot be grater than admissionFeeAmount"
        );
        return;
      }

      console.log(secondPaymentAccounts);

      if (secondPaymentAccounts === "Pay Accounts") {
        toast.error("Please complete 2nd Install pay account type");
        return;
      }
      if (!secondInstallmentTID) {
        toast.error("Please complete 2nd Install Transection ID");
        return;
      }
      if (!secondInstallmentDate) {
        toast.error("Please complete 2nd Install Installment Date:");
        return;
      }
    }

    const thirdInstallment = e?.target?.thirdInstallment?.value || "";
    const thirdPaymentAccounts = thirdPaymentAccountsRef?.current?.value || "";
    // console.log(thirdPaymentAccounts)
    const thirdInstallmentTID = e?.target?.thirdInstallmentTID?.value || "";
    const thirdInstallmentDate = e?.target?.thirdInstallmentDate?.value || "";

    console.log(thirdInstallment);

    if (thirdInstallment !== "0") {
      const thirdInstallmentAmonut = Number(thirdInstallment);
      const admissionFeeAmount = Number(admissionFee);

      if (thirdInstallmentAmonut < 1) {
        toast.error("Third Installment cannot be negative");
        return;
      }

      if (thirdInstallmentAmonut > admissionFeeAmount) {
        toast.error(
          "Third Installment cannot be grater than admissionFeeAmount"
        );
        return;
      }

      if (!thirdPaymentAccounts) {
        toast.error("Please complete 3rd Install pay account type");
        return;
      }
      if (thirdInstallmentTID === "Pay Accounts") {
        toast.error("Please complete 3rd Install Transection ID");
        return;
      }
      if (!thirdInstallmentDate) {
        toast.error("Please complete 3rd Install Installment Date:");
        return;
      }
    }

    const nextInstallmentDate = e?.target?.nextInstallmentDate?.value || "";
    let discription = e?.target?.discription?.value;
    if (admission.discription) {
      discription = admission.discription + ". " + discription;
    }

    // const paymentAccounts = e.target.paymentAccounts.value;
    // const transactionId = e.target.transactionId.value;
    const totalInstallment = 2;

    const admissionStatus = true;

    // // console.log(admissionFee, fristInstallment, fristPaymentAccounts,fristInstallmentTID,fristInstallmentDate, nextInstallmentDate, );
    const user = {
      admissionStatus,
      admissionFee,

      batch,
      batchId: admission.batch.id,
      preBatch,

      firstInstallment,
      fristPaymentAccounts,
      fristInstallmentTID,
      fristInstallmentDate,

      secondInstallment,
      secondPaymentAccounts,
      secondInstallmentTID,
      secondInstallmentDate,

      thirdInstallment,
      thirdPaymentAccounts,
      thirdInstallmentTID,
      thirdInstallmentDate,

      nextInstallmentDate,
      totalInstallment,
      discription,
    };

    axios
      .patch(
        `https://uiti-crm-server.vercel.app/update-admission-pay/${admission._id}`,
        user
      )
      .then((data) => {
        console.log(data);
        toast.success("Student Info Updates Success");
        setAdmission(null);
        refetchUpdateData();
      });
  };

  const handleCloseBtn = () => {
    setAdmission(null);
  };

  const { data: paygetwaysName = [] } = useQuery({
    queryKey: ["paygetwaysName"],
    queryFn: async () => {
      const res = await fetch(
        `https://uiti-crm-server.vercel.app/pay-getway`
      );
      const data = await res.json();
      return data;
    },
  });

  console.log(admission.fristInstallment);

  return (
    <>
      <input type="checkbox" id="payModal" className="modal-toggle" />
      <div className="modal  mt-16 w-full">
        <div className="  modal-box relative pt-2 w-[700px] max-w-5xl ">
          <label
            htmlFor="payModal"
            onClick={handleCloseBtn}
            className="btn btn-xs btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            <span className="border-b-2">UPDATE INFO</span>
          </h3>
          <form onSubmit={handleSubmit} className="  mt-2 ">
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-1">
                {/* <p className='px-2 text-xs text-left'>Name:</p> */}
                <p className="px-2 py-1 bg-slate-400 text-white rounded-md">
                  {admission?.name}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                {/* <p className='px-2 text-xs text-left'>Phone:</p> */}
                <p className="px-2 py-1 bg-slate-400 text-white rounded-md">
                  {admission?.phone}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                {/* <p className='px-2 text-xs text-left'>Phone:</p> */}
                <p className="px-2 py-1 bg-slate-400 text-white rounded-md">
                  {admission?.email ? admission?.email : "Email not Found"}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="px-2 text-xs text-left">Batch Name:</p>
                <input
                  name="batch"
                  type="text"
                  defaultValue={admission?.batch?.name}
                  placeholder="Change Batch Name"
                  className="input input-accent input-sm focus:ring-0 focus:outline-0 focus:input-sm focus:border-2 w-full max-w-[200px]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <p className="px-2 text-xs text-left">Admission Fee:</p>
                <input
                  name="admissionFee"
                  type="text"
                  defaultValue={
                    admission.admissionFee ? admission.admissionFee : 0
                  }
                  disabled={admission.admissionFee > 0 ? true : false}
                  className="input input-accent input-sm focus:ring-0 focus:outline-0 focus:input-sm focus:border-2 w-full max-w-[200px]"
                />
                {/* <p className="px-2 py-1 bg-slate-400 text-white rounded-md">
                  {admission.admissionFee ? admission.admissionFee : 0}
                </p> */}
              </div>

              <div className="flex flex-col gap-1">
                <p className="px-2 text-xs text-left">Total Installment:</p>
                <select
                  name="totalInstallment"
                  defaultValue={admission.totalInstallment}
                  disabled={admission.admissionFee > 0 ? true : false}
                  className="input input-accent input-sm focus:ring-0 focus:outline-0 focus:input-sm focus:border-2 w-full max-w-[200px]"
                >
                  <option disabled selected>
                    Total Installment
                  </option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mt-3">
              <div className="flex flex-col gap-1">
                <p className="px-2 text-xs text-left">1st Install:</p>
                <input
                  name="fristInstallment"
                  type="text"
                  defaultValue={
                    admission.firstInstallment ? admission.firstInstallment : 0
                  }
                  disabled={admission.firstInstallment > 0 ? true : false}
                  className="input input-accent input-sm focus:ring-0 focus:outline-0 focus:input-sm focus:border-2 w-full max-w-[200px]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <p className="px-2 text-xs text-left">Pay Accounts Type:</p>
                <select
                  name="fristPaymentAccounts"
                  ref={fristPaymentAccountsRef}
                  defaultValue={admission.fristPaymentAccounts}
                  disabled={admission.fristInstallment > 0 ? true : false}
                  className="input input-accent input-sm focus:ring-0 focus:outline-0 focus:input-sm focus:border-2 w-full max-w-[200px]"
                >
                  <option disabled selected>
                    Pay Accounts
                  </option>
                  {paygetwaysName?.users?.map((user) => (
                    <option key={user._id} value={user.name}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <p className="px-2 text-xs text-left">Transection ID:</p>
                <input
                  name="fristInstallmentTID"
                  type="text"
                  placeholder="Transaction ID"
                  defaultValue={admission.fristInstallmentTID}
                  disabled={admission.fristInstallment > 0 ? true : false}
                  className="input input-accent input-sm focus:ring-0 focus:outline-0 focus:input-sm focus:border-2 w-full max-w-[200px]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <p className="px-2 text-xs text-left">Installment Date:</p>
                <input
                  name="fristInstallmentDate"
                  type="date"
                  defaultValue={admission.fristInstallmentDate}
                  disabled={admission.fristInstallment > 0 ? true : false}
                  className="input input-accent input-sm focus:ring-0 focus:outline-0 focus:input-sm focus:border-2 w-full max-w-[200px]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <p className="px-2 text-xs text-left">2nd Install:</p>
                <input
                  name="secondInstallment"
                  type="text"
                  defaultValue={
                    admission.secondInstallment
                      ? admission.secondInstallment
                      : 0
                  }
                  disabled={
                    admission.fristInstallment > 0 &&
                    admission?.secondInstallment < 1
                      ? false
                      : true
                  }
                  className="input input-accent input-sm focus:ring-0 focus:outline-0 focus:input-sm focus:border-2 w-full max-w-[200px]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <p className="px-2 text-xs text-left">Pay Accounts Type:</p>
                <select
                  defaultValue={admission.secondPaymentAccounts}
                  ref={secondPaymentAccountsRef}
                  disabled={
                    admission.firstInstallment > 0 &&
                    admission?.secondInstallment < 1
                      ? false
                      : true
                  }
                  className="input input-accent input-sm focus:ring-0 focus:outline-0 focus:input-sm focus:border-2 w-full max-w-[200px]"
                >
                  <option disabled selected>
                    Pay Accounts
                  </option>
                  {paygetwaysName?.users?.map((user) => (
                    <option key={user._id} value={user.name}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <p className="px-2 text-xs text-left">Transaction ID:</p>
                <input
                  name="secondInstallmentTID"
                  type="text"
                  placeholder="Transaction ID"
                  defaultValue={admission.secondInstallmentTID}
                  disabled={
                    admission.fristInstallment > 0 &&
                    admission?.secondInstallment < 1
                      ? false
                      : true
                  }
                  className="input input-accent input-sm focus:ring-0 focus:outline-0 focus:input-sm focus:border-2 w-full max-w-[200px]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <p className="px-2 text-xs text-left">Installment Date:</p>
                <input
                  name="secondInstallmentDate"
                  type="date"
                  defaultValue={
                    admission.secondInstallmentDate
                      ? admission.secondInstallmentDate
                      : ""
                  }
                  disabled={
                    admission.fristInstallment > 0 &&
                    admission?.secondInstallment < 1
                      ? false
                      : true
                  }
                  className="input input-accent input-sm focus:ring-0 focus:outline-0 focus:input-sm focus:border-2 w-full max-w-[200px]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <p className="px-2 text-xs text-left">3rd Install:</p>
                <input
                  name="thirdInstallment"
                  type="text"
                  placeholder="Ex : 2000"
                  disabled={
                    admission.secondInstallment > 1 &&
                    admission?.thirdInstallment < 1
                      ? false
                      : true
                  }
                  defaultValue={
                    admission.thirdInstallment ? admission.thirdInstallment : 0
                  }
                  className="input input-accent input-sm focus:ring-0 focus:outline-0 focus:input-sm focus:border-2 w-full max-w-[200px]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <p className="px-2 text-xs text-left">Pay Accounts Type:</p>
                <select
                  defaultValue={admission.thirdPaymentAccounts}
                  disabled={
                    admission.secondInstallment && !admission?.thirdInstallment
                      ? false
                      : true
                  }
                  ref={thirdPaymentAccountsRef}
                  className="input input-accent input-sm focus:ring-0 focus:outline-0 focus:input-sm focus:border-2 w-full max-w-[200px]"
                >
                  <option disabled selected>
                    Pay Accounts
                  </option>
                  {paygetwaysName?.users?.map((user) => (
                    <option key={user._id} value={user.name}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <p className="px-2 text-xs text-left">Transaction ID:</p>
                <input
                  name="thirdInstallmentTID"
                  type="text"
                  placeholder="Transaction ID"
                  defaultValue={admission.thirdInstallmentTID}
                  disabled={
                    admission.secondInstallment && !admission?.thirdInstallment
                      ? false
                      : true
                  }
                  className="input input-accent input-sm focus:ring-0 focus:outline-0 focus:input-sm focus:border-2 w-full max-w-[200px]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="px-2 text-xs text-left">Installment Date:</p>
                <input
                  name="thirdInstallmentDate"
                  type="date"
                  defaultValue={admission.thirdInstallmentDate}
                  disabled={
                    admission.secondInstallment && !admission?.thirdInstallment
                      ? false
                      : true
                  }
                  className="input input-accent input-sm focus:ring-0 focus:outline-0 focus:input-sm focus:border-2 w-full max-w-[200px]"
                />
              </div>
            </div>

            <p className="mt-2 bg-slate-300 text-left p-2 rounded-md">
              {" "}
              <span className=" text-xl font-bold">Description:</span>{" "}
              {admission.discription}
            </p>

            <div className="flex flex-row gap-2">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Discription</span>
                </label>
                <textarea
                  name="discription"
                  type="text"
                  placeholder="Discription Here....."
                  className="input input-accent input-sm focus:ring-0 focus:outline-0   focus:border-2 w-full  h-16"
                />
              </div>
            </div>

            <input
              className="btn btn-sm btn-accent  
               text-lg mt-8 "
              type="submit"
              value="Undate Payment Info"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentModal;
