import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const RevPayableLoan = () => {
  const value = localStorage.getItem("myValue");
  const { loansPayData } = useContext(AuthContext);

  const { data: revLoan = [], refetch } = useQuery({
    queryKey: ["revLoan"],
    queryFn: async () => {
      const res = await fetch(`https://uiti-crm-server.vercel.app/loan/rev`);
      const data = await res.json();
      console.log(data);
      return data;
    },
  });

  // Calculate total loan amount for the selected loan
  const loanAmount = loansPayData?.loans
    ?.filter((item) => item._id === value)
    .reduce((total, item) => total + parseInt(item.loanAmount), 0) || 0;

  // Filter and calculate received amounts
  const matchingItems = revLoan?.loans?.filter(
    (item) => item?.loanId?._id === value
  );
  const revAmmount = matchingItems?.reduce(
    (total, item) => total + parseInt(item.revAmmount),
    0
  ) || 0;

  const loanDue = loanAmount - revAmmount;

  return (
    <div>
      <h1 className="text-2xl font-bold my-2">Loan Receive Details: {value}</h1>
      <h2 className="text-1xl font-bold my-2">
        Loan Amount: {loanAmount} - Loan Receive: {revAmmount} = Loan Due: {loanDue}
      </h2>

      <table className="table w-full">
        <thead
          className="text-xs sticky top-0 bg-slate-300"
          style={{ width: "1200px" }}
        >
          <tr>
            <th className="p-1 border-2">#</th>
            <th className="p-1 border-2">Date</th>
            <th className="p-1 border-2">Loan Receipt No</th>
            <th className="p-1 border-2">Loan Purpose</th>
            <th className="p-1 border-2">Loan Payable Name</th>
            <th className="p-1 border-2">Description</th>
            <th className="p-1 border-2">Receive Amount</th>
          </tr>
        </thead>

        <tbody className="w-fit text-xs">
          {matchingItems?.length > 0 ? (
            matchingItems.map((item, i) => (
              <tr key={item._id}>
                <th className="p-1 border-2">{i + 1}</th>
                <td className="p-1 border-2">{item?.date.slice(0, 10)}</td>
                <td className="p-1 border-2">{item?.loanReceipt}</td>
                <td className="p-1 border-2">{item?.loanId?.loanPurpose}</td>
                <td className="p-1 border-2">{item?.loanId?.loanProvide}</td>
                <td className="p-1 border-2">{item?.discription}</td>
                <td className="p-1 border-2">{item?.revAmmount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="p-1 border-2 text-center">
                No matching items found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RevPayableLoan;
