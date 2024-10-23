import React, { Children, useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const LoanModal = ({ updateData, setUpdateData, setFilterData }) => {
  // console.log(updateData)

  const { payLoans } = useContext(AuthContext);

  const matchingItems = payLoans?.loans?.filter(
    (item) => item.loanId._id === updateData._id
  );

  const amounts = matchingItems?.map((item) => parseInt(item.payAmmount));
  const payDue = amounts?.reduce((total, amount) => total + amount, 0);

  const totalDue = updateData.loanAmount - payDue;

  const handleChange = (event) => {
    let pAmount = event.target.value;
    if (pAmount > totalDue) {
      alert(
        "Please Change your payment Amount! Payment ammount is larger in due amount!"
      );
      event.target.value = "";
    }
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payAmmount = e.target.payAmmount.value;
    const loanReceipt = e.target.loanReceipt.value;
    const discription = e.target.discription.value;

    const personalData = {
      payAmmount,
      loanReceipt,
      discription,
      loanId: updateData._id,
    };
    // console.log(payAmmount);

    fetch(`https://demo-usc-crm-software.vercel.app/loan/pay`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("access_token"),
      },
      body: JSON.stringify(personalData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Loan Pay Successfully") {
          navigate("/dashboard/loan/pay-receive-loan");
        }
        toast.success(`Database Data ${data.message}`);
        // console.log(data);
        setUpdateData(null);
      });
  };

  const handleCloseBtn = () => {
    setUpdateData(null);
  };
  return (
    <>
      <input type="checkbox" id="loanModal" className="modal-toggle" />
      <div className="modal  mt-4">
        <div className="modal-box relative">
          <label
            htmlFor="loanModal"
            onClick={handleCloseBtn}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Update Info</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2 mt-6">
            <div className="flex flex-row gap-2">
              <input
                type="text"
                className="input w-full input-bordered "
                disabled
                value={updateData.loanReceipt}
              />
              <input
                type="text"
                disabled
                value={updateData.loanReceive}
                className="input w-full input-bordered"
              />

              <input
                type="text"
                disabled
                value={updateData.loanPurpose}
                className="input w-full input-bordered"
              />
            </div>

            <div className="flex flex-row gap-2">
              <div>
                <label className="label">
                  <span className="label-text">Loan Ammount</span>
                </label>
                <input
                  type="email"
                  disabled
                  value={updateData.loanAmount}
                  className="input input-sm w-full input-bordered"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Due Ammount</span>
                </label>
                <input
                  type="text"
                  disabled
                  value={totalDue}
                  className="input w-full input-sm input-bordered"
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Pay Amount</span>
              </label>
              <input
                onChange={handleChange}
                name="payAmmount"
                type="text"
                className="input input-sm w-full input-bordered"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Loan Receipt No</span>
              </label>
              <input
                type="text"
                name="loanReceipt"
                placeholder="Loan Receipt No Here..."
                className="input input-sm input-bordered w-full"
              />
            </div>

            <div className="flex flex-row gap-2">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Discription</span>
                </label>
                <textarea
                  name="discription"
                  type="text"
                  placeholder="Discription Here....."
                  className="textarea textarea-bordered textarea-lg w-full"
                />
              </div>
            </div>

            <br />
            <input
              className="btn btn-accent w-full"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default LoanModal;
