import React from "react";

const CourseCollectionTable = ({ filterData, startDate, endDate }) => {
  return (
    <div className="overflow-auto">
      <form>
        <table className="table w-full">
          <thead
            className="sticky top-0 bg-slate-300"
            style={{ width: "1200px" }}
          >
            <tr className="text-xs">
              <th className="p-1 border-2">id</th>
              <th className="p-1 border-2">#</th>
              <th className="p-1 border-2">Date</th>
              <th className="p-1 border-2">C.N</th>
              <th className="p-1 border-2">B.N</th>
              <th className="p-1 border-2">U.N</th>
              <th className="p-1 border-2">H.N</th>
              <th className="p-1 border-2">Name</th>
              <th className="p-1 border-2">Phone</th>
              <th className="p-1 border-2">Payment Method</th>
              <th className="p-1 border-2">Transaction Id</th>
              <th className="p-1 border-2">Transaction Date</th>
              <th className="p-1 border-2">Pay Ammount</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {
              filterData.length > 0 &&
              filterData?.map((admission, i) => (
                <>
                  {(admission.firstInstallmentDate >= startDate &&
                    admission.firstInstallmentDate <= endDate) && (
                      <tr>
                        <td className="p-1 border-2">{admission?._id}</td>
                        <th className="p-1 border-2">{i + 1}</th>
                        <td className="p-1 border-2">{admission?.updatedAt.slice(0, -14)}</td>
                        <td className="p-1 border-2">{admission?.course.name}</td>
                        <td className="p-1 border-2">{admission?.batch.name}</td>
                        <td className="p-1 border-2">{admission.user.name}</td>
                        <td className="p-1 border-2">{admission?.head?.name}</td>
                        <td className="p-1 border-2">{admission.name}</td>
                        <td className="p-1 border-2">{admission?.phone?.split("p:", 2)}</td>
                        <td className="p-1 border-2">{admission?.firstPaymentAccounts}</td>
                        <td className="p-1 border-2">{admission?.firstInstallmentTID}</td>
                        <td className="p-1 border-2">{admission?.firstInstallmentDate}</td>
                        <td className="p-1 border-2">{admission?.firstInstallment}</td>
                      </tr>
                    )}

                  {(admission.secondInstallmentDate >= startDate &&
                    admission.secondInstallmentDate <= endDate) && (
                      <tr>
                        <td className="p-1 border-2">{admission?._id}</td>
                        <th className="p-1 border-2">{i + 1}</th>
                        <td className="p-1 border-2">{admission?.updatedAt.slice(0, -14)}</td>
                        <td className="p-1 border-2">{admission?.course.name}</td>
                        <td className="p-1 border-2">{admission?.batch.name}</td>
                        <td className="p-1 border-2">{admission.user.name}</td>
                        <td className="p-1 border-2">{admission?.head?.name}</td>
                        <td className="p-1 border-2">{admission.name}</td>
                        <td className="p-1 border-2">{admission?.phone?.split("p:", 2)}</td>
                        <td className="p-1 border-2">{admission?.secondPaymentAccounts}</td>
                        <td className="p-1 border-2">{admission?.secondInstallmentTID}</td>
                        <td className="p-1 border-2">{admission?.secondInstallmentDate}</td>
                        <td className="p-1 border-2">{admission?.secondInstallment}</td>
                      </tr>
                    )}

                  {(admission.thirdInstallmentDate >= startDate &&
                    admission.thirdInstallmentDate <= endDate) && (
                      <tr>
                        <td className="p-1 border-2">{admission?._id}</td>
                        <th className="p-1 border-2">{i + 1}</th>
                        <td className="p-1 border-2">{admission?.updatedAt.slice(0, -14)}</td>
                        <td className="p-1 border-2">{admission?.course.name}</td>
                        <td className="p-1 border-2">{admission?.batch.name}</td>
                        <td className="p-1 border-2">{admission.user.name}</td>
                        <td className="p-1 border-2">{admission?.head?.name}</td>
                        <td className="p-1 border-2">{admission.name}</td>
                        <td className="p-1 border-2">{admission?.phone?.split("p:", 2)}</td>
                        <td className="p-1 border-2">{admission?.thirdPaymentAccounts}</td>
                        <td className="p-1 border-2">{admission?.thirdInstallmentTID}</td>
                        <td className="p-1 border-2">{admission?.thirdInstallmentDate}</td>
                        <td className="p-1 border-2">{admission?.thirdInstallment}</td>
                      </tr>
                    )}
                </>

              ))
            }
          </tbody>
        </table>
      </form>
    </div>
  );
};
// <tr>

// <td className="p-1 border-2">{admission?._id}</td>
//   <th className="p-1 border-2">{i + 1}</th>
//   <td className="p-1 border-2">
//     {admission?.updatedAt.slice(0, -14)}
//   </td>
//   <td className="p-1 border-2">{admission?.course.name}</td>
//   <td className="p-1 border-2">{admission?.batch.name}</td>
//   <td className="p-1 border-2">{admission.user.name}</td>
//   <td className="p-1 border-2">{admission?.head?.name}</td>

//   <td className="p-1 border-2">{admission.name}</td>
//   <td className="p-1 border-2">
//     {admission?.phone?.split("p:", 2)}
//   </td>

//   <td className="p-1 border-2">
//     {new Date(admission.fristInstallmentDate) >=
//       new Date(startDate) &&
//     new Date(admission.fristInstallmentDate) <=
//       new Date(endDate)
//       ? admission.fristPaymentAccounts
//       : new Date(admission.secondInstallmentDate) >=
//           new Date(startDate) &&
//         new Date(admission.secondInstallmentDate) <=
//           new Date(endDate)
//       ? admission.secondPaymentAccounts
//       : new Date(admission.thirdInstallmentDate) >=
//           new Date(startDate) &&
//         new Date(admission.thirdInstallmentDate) <=
//           new Date(endDate)
//       ? admission.thirdPaymentAccounts
//       : 0}
//   </td>
//   <td className="p-1 border-2">
//     {new Date(admission.fristInstallmentDate) >=
//       new Date(startDate) &&
//     new Date(admission.fristInstallmentDate) <=
//       new Date(endDate)
//       ? admission.fristInstallmentTID
//       : new Date(admission.secondInstallmentDate) >=
//           new Date(startDate) &&
//         new Date(admission.secondInstallmentDate) <=
//           new Date(endDate)
//       ? admission.secondInstallmentTID
//       : new Date(admission.thirdInstallmentDate) >=
//           new Date(startDate) &&
//         new Date(admission.thirdInstallmentDate) <=
//           new Date(endDate)
//       ? admission.thirdInstallmentTID
//       : 0}
//   </td>

//   <td className="p-1 border-2">
//     {new Date(admission.fristInstallmentDate) >=
//       new Date(startDate) &&
//     new Date(admission.fristInstallmentDate) <=
//       new Date(endDate)
//       ? admission.fristInstallmentDate
//       : new Date(admission.secondInstallmentDate) >=
//           new Date(startDate) &&
//         new Date(admission.secondInstallmentDate) <=
//           new Date(endDate)
//       ? admission.secondInstallmentDate
//       : new Date(admission.thirdInstallmentDate) >=
//           new Date(startDate) &&
//         new Date(admission.thirdInstallmentDate) <=
//           new Date(endDate)
//       ? admission.thirdInstallmentDate
//       : 0}
//   </td>

//   <td className="p-1 border-2">
//     {new Date(admission.fristInstallmentDate) >= new Date(startDate) &&
//     new Date(admission.fristInstallmentDate) <= new Date(endDate)
//       ? admission.fristInstallment
//       : new Date(admission.secondInstallmentDate) >=
//           new Date(startDate) &&
//         new Date(admission.secondInstallmentDate) <=
//           new Date(endDate)
//       ? admission.secondInstallment
//       : new Date(admission.thirdInstallmentDate) >=
//           new Date(startDate) &&
//         new Date(admission.thirdInstallmentDate) <=
//           new Date(endDate)
//       ? admission.thirdInstallment
//       : 0}
//   </td>
// </tr>
export default CourseCollectionTable;
