import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EnrollCourse = () => {
  const navigate = useNavigate();
  const [courseName, setCourseName] = useState("");
  const [batchName, setBatchName] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [headName, setHeadName] = useState("");

  const [filterBatchName, setFilterBatchName] = useState([]);
  const [usersName, setUserName] = useState([]);

  const handleCourseName = (e) => {
    const defaultValueCourse = e.target.value;

    setCourseName(e.target.value);

    const filterBatch = batchsName.users.filter((batch) =>
      batch.name.includes(defaultValueCourse)
    );

    setFilterBatchName(filterBatch);
    // batchsName
  };

  const [allStudents, setAllStudents] = useState([]);

  useEffect(() => {
    fetch("https://uiti-crm-server.vercel.app/students")
      .then((response) => response.json())
      .then((data) => {
        setAllStudents(data);
      });
  }, []);

  const { data: coursesName = [] } = useQuery({
    queryKey: ["coursesName"],
    queryFn: async () => {
      const res = await fetch(
        `https://uiti-crm-server.vercel.app/course`
      );
      const data = await res.json();
      return data;
    },
  });

  const handleBatchName = (e) => {
    setBatchName(e.target.value);
  };

  const { data: batchsName = [] } = useQuery({

    queryKey: ["batchsName"],
    queryFn: async () => {
      const res = await fetch(`https://uiti-crm-server.vercel.app/batch`);
      const data = await res.json();
      return data;
    },
  });
  console.log(batchName);

  const handleSelectUser = (e) => {
    setEmployeeName(e.target.value);
  };

  const { data: allUser = [] } = useQuery({
    queryKey: ["allUser"],
    queryFn: async () => {
      const res = await fetch(`https://uiti-crm-server.vercel.app/users`);
      const data = await res.json();

      const uData = data.users.filter((user) => user.role === "user");
      setUserName(uData);
      return uData;
    },
  });


  const handleSelectHead = (e) => {
    setHeadName(e.target.value);
  };

  const { data: headsName = [] } = useQuery({
    queryKey: ["headsName"],
    queryFn: async () => {
      const res = await fetch(`https://uiti-crm-server.vercel.app/head`);
      const data = await res.json();
      return data;
    },
  });

  const addAdmission = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;

    const admissionFee = e.target.admissionFee.value;

    const firstInstallment = e.target.firstInstallment.value;
    const firstPaymentAccounts = e.target.firstPaymentAccounts.value;
    const firstInstallmentTID = e.target.firstInstallmentTID.value;
    const firstInstallmentDate = e.target.firstInstallmentDate.value;

    const secondInstallment = e.target.secondInstallment.value;
    const secondPaymentAccounts = e.target.secondPaymentAccounts.value;
    const secondInstallmentTID = e.target.secondInstallmentTID.value;
    const secondInstallmentDate = e.target.secondInstallmentDate.value;

    const thirdInstallment = e.target.thirdInstallment.value;
    const thirdPaymentAccounts = e.target.thirdPaymentAccounts.value;
    const thirdInstallmentTID = e.target.thirdInstallmentTID.value;
    const thirdInstallmentDate = e.target.thirdInstallmentDate.value;

    const nextInstallmentDate = e.target.nextInstallmentDate.value;
    // const paymentAccounts = e.target.paymentAccounts.value;
    // const transactionId = e.target.transactionId.value;
    const totalInstallment = e.target.totalInstallment.value;

    const personalData = {
      name,
      email,
      phone,
      admission: true,
      admissionStatus: true,
      admissionFee,

      firstInstallment,
      firstPaymentAccounts,
      firstInstallmentTID,
      firstInstallmentDate,

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

      courseName,
      batchName,
      employeeName,
      headName,
    };

    

    // console.log(name, email, phone, fristInstallment, secondInstallment, thirdInstallment, nextInstallmentDate, fristPaymentAccounts, totalInstallment, courseName, batchName, employeeName, headName,);
    fetch(`https://uiti-crm-server.vercel.app/add-admissions`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(personalData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "New Lead Added Successfully") {
          // toast.success(`Database Data ${data.message}`)
          navigate("/dashboard/total-admission");
        }
        toast.success(`Database Data ${data.message}`);
        // console.log(data);
      });
  };
  return (
    <div className="mt-2 w-12/12 mx-auto">
      {/* <h1 className="text-2xl mb-3">Add New Admission</h1> */}

      <fieldset className="border border-solid border-gray-500 p-3 mx-10">
        <legend className="text-2xl">Add New Admission</legend>
        <div className="w-full">
          <div className="flex items-center gap-2 justify-center">
            <select
              required
              className="select select-bordered select-sm  max-w-xs"
              onChange={handleCourseName}
            >
              <option disabled selected>
                Select Course Name
              </option>
              {coursesName?.users?.map((user) => (
                <option key={user._id} value={user?._id}>
                  {user.name}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered select-sm  max-w-xs"
              required
              onChange={handleBatchName}
            >
              <option disabled selected>
                Select Batch Name
              </option>
              {batchsName?.users && batchsName?.users.map((user) => (
                <option key={user.id} value={user?._id}>
                  {user.name}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered select-sm  max-w-xs"
              required
              onChange={handleSelectUser}
            >
              <option disabled selected>
                Select User Name
              </option>
              {usersName?.map(
                (user) =>
                  user.role !== "admin" && (
                    <option key={user.id} value={user?._id}>
                      {user.name}
                    </option>
                  )
              )}
              {/* <option disabled defaultValue>Select User</option>
                            <option>Sumaiya</option>
                            <option>Sonia</option> */}
            </select>

            <select
              className="select select-bordered select-sm  max-w-xs"
              required
              onChange={handleSelectHead}
            >
              <option disabled selected>
                Select Head Name
              </option>
              {headsName?.users?.map((user) => (
                <option key={user?._id} value={user?._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <div className="my-3 mx-2">
            <form onSubmit={addAdmission}>
              <div>
                <div className="flex flex-row gap-2">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Student Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter Student Name"
                      className="input input-sm input-bordered w-full"
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Student Email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter Student Email"
                      className="input input-sm input-bordered w-full"
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Student Phone</span>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Enter Student Phone"
                      className="input input-sm input-bordered w-full"
                    />
                  </div>
                </div>

                <div className="flex flex-row gap-2">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Admission Fee</span>
                    </label>
                    <input
                      name="admissionFee"
                      id="admissionFee"
                      type="text"
                      placeholder="Ex: 6000"
                      className="input input-sm w-full input-bordered"
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Total Installment</span>
                    </label>
                    <select
                      name="totalInstallment"
                      className="select select-bordered select-sm w-full"
                    >
                      <option disabled defaultValue>
                        Total Installment
                      </option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Next Installment Date</span>
                    </label>
                    <input
                      name="nextInstallmentDate"
                      type="date"
                      placeholder="Next Installment Date"
                      className="input input-sm w-full input-bordered"
                    />
                  </div>
                </div>

                <div className="flex flex-row gap-2">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">First Installment</span>
                    </label>
                    <input
                      name="firstInstallment"
                      type="text"
                      placeholder="Ex : 2000"
                      defaultValue={0}
                      className="input input-sm w-full input-bordered"
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">First Pay Accounts</span>
                    </label>
                    <select
                      name="firstPaymentAccounts"
                      className="select select-bordered select-sm w-full"
                    >
                      <option disabled defaultValue>
                        Payment Accounts
                      </option>
                      <option>Bkash</option>
                      <option>Nagad</option>
                      <option>Bank</option>
                    </select>
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">First Installment T ID</span>
                    </label>
                    <input
                      name="firstInstallmentTID"
                      type="text"
                      placeholder="Transaction ID"
                      defaultValue={0}
                      className="input input-sm w-full input-bordered"
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">First Installment Date</span>
                    </label>
                    <input
                      name="firstInstallmentDate"
                      type="date"
                      placeholder="Next Installment Date"
                      defaultValue={""}
                      className="input input-sm w-full input-bordered"
                    />
                  </div>
                </div>

                <div className="flex flex-row gap-2">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Second Installment</span>
                    </label>
                    <input
                      name="secondInstallment"
                      type="text"
                      placeholder="Ex : 2000"
                      defaultValue={0}
                      className="input input-sm w-full input-bordered"
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Second Pay Account</span>
                    </label>
                    <select
                      name="secondPaymentAccounts"
                      className="select select-bordered select-sm w-full"
                    >
                      <option disabled defaultValue>
                        Payment Accounts
                      </option>
                      <option>Bkash</option>
                      <option>Nagad</option>
                      <option>Bank</option>
                    </select>
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">
                        Second Installment T ID
                      </span>
                    </label>
                    <input
                      name="secondInstallmentTID"
                      type="text"
                      placeholder="Transaction ID"
                      defaultValue={0}
                      className="input input-sm w-full input-bordered"
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">
                        Second Installment Date
                      </span>
                    </label>
                    <input
                      name="secondInstallmentDate"
                      type="date"
                      defaultValue={""}
                      className="input input-sm w-full input-bordered"
                    />
                  </div>
                </div>

                <div className="flex flex-row gap-2">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Third Installment</span>
                    </label>
                    <input
                      name="thirdInstallment"
                      type="text"
                      placeholder="Ex : 2000"
                      defaultValue={0}
                      className="input input-sm w-full input-bordered"
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Third Pay Account</span>
                    </label>
                    <select
                      name="thirdPaymentAccounts"
                      className="select select-bordered select-sm w-full"
                    >
                      <option disabled defaultValue>
                        Payment Accounts
                      </option>
                      <option>Bkash</option>
                      <option>Nagad</option>
                      <option>Bank</option>
                    </select>
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Third Installment T ID</span>
                    </label>
                    <input
                      name="thirdInstallmentTID"
                      type="text"
                      placeholder="Transaction ID"
                      defaultValue={0}
                      className="input input-sm w-full input-bordered"
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Third Installment Date</span>
                    </label>
                    <input
                      name="thirdInstallmentDate"
                      type="date"
                      defaultValue={""}
                      className="input input-sm w-full input-bordered"
                    />
                  </div>
                </div>
              </div>

              <input
                className="btn btn-accent w-full text-white mt-3"
                value="Add New Admission"
                type="submit"
              />
            </form>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default EnrollCourse;
