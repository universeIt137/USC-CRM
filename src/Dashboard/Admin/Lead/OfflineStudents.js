import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useRef, useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { AuthContext } from "../../../contexts/AuthProvider";
import { toast } from "react-hot-toast";
import { FaFileDownload } from "react-icons/fa";

const OfflineStudents = () => {
  const { user } = useContext(AuthContext);
  const [totalOffline, setTotalOffline] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState("");

  const tableRef = useRef(null);

  useEffect(() => {
    fetch(
      "https://demo-usc-crm-software.vercel.app/leads?offlineInterested=true"
    )
      .then((response) => response.json())
      .then((data) => {
        setFilterData(data);
        setTotalOffline(data);
      });
  }, []);

  // -----------------Filter Start--------------------

  const [selectedValue, setSelectedValue] = useState([]);
  // console.log(selectedValue)

  const uniqueCourse = [
    ...new Set(totalOffline?.map((user) => user?.course?.name)),
  ];

  const uniqueBatch = [
    ...new Set(selectedValue?.map((user) => user?.batch?.name)),
  ];

  const uniqueHead = [
    ...new Set(selectedValue?.map((user) => user?.head?.name)),
  ];

  const uniqueUser = [
    ...new Set(selectedValue?.map((user) => user?.user?.name)),
  ];

  function handleCourseChange(event) {
    const couseSelectedValue = event.target.value;
    const fData = totalOffline?.filter(
      (si) => si.course.name === couseSelectedValue
    );
    setFilterData(fData);
    setSelectedValue(fData);
  }

  function handleBatchChange(event) {
    const selectedBatchValue = event.target.value;
    const fData = totalOffline?.filter(
      (si) => si.batch.name === selectedBatchValue
    );
    setFilterData(fData);
  }

  function handleHeadChange(event) {
    const selectedHeadValue = event.target.value;
    const fData = totalOffline?.filter(
      (si) => si.head.name === selectedHeadValue
    );
    setFilterData(fData);
  }

  function handleUserChange(event) {
    const selectedUserValue = event.target.value;
    const fData = totalOffline?.filter(
      (si) => si.user.name === selectedUserValue
    );
    setFilterData(fData);
  }

  // -----------------Filter End--------------------

  // -------------Date wise Filter Start--------------------
  function formatedDate(date) {
    return new Date(date).toISOString().slice(0, -14);
  }

  const handleInputChange = (event) => {
    const value = event.target.value;
    // console.log(value);
    const fiData = totalOffline.filter(
      (si) => formatedDate(si.createdAt) === value
    );
    setFilterData(fiData);
    // console.log(fiData);
  };
  // -------------Date wise Filter End--------------------

  const handleDelete = (offline) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) {
      return;
    }

    fetch(`https://demo-usc-crm-software.vercel.app/delete/${offline}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(`Leads ${user.name} deleted successfully`);
        fetch(
          "https://demo-usc-crm-software.vercel.app/leads?offlineInterested=true"
        )
          .then((res) => res.json())
          .then((data) => {
            setFilterData(data);
          })
          .catch((error) => {
            console.error("Update request failed:", error);
            toast.error("An error occurred while updating the API.");
          });
      })
      .catch((error) => {
        console.error("Delete request failed:", error);
        toast.error("An error occurred while deleting the item.");
      });
  };
  return (
    <div className="mx-2 my-6">
      <nav
        aria-label="breadcrumb"
        className="w-full p-4 dark:bg-gray-800 dark:text-gray-100"
      >
        <ol className="flex h-8 space-x-2">
          <li className="flex items-center">
            <a
              rel="noopener noreferrer"
              href="#"
              title="Back to homepage"
              className="hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 pr-1 dark:text-gray-400"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
            </a>
          </li>
          <li className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              fill="currentColor"
              className="w-2 h-2 mt-1 transform rotate-90 fill-current dark:text-gray-600"
            >
              <path d="M32 30.031h-32l16-28.061z"></path>
            </svg>
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex items-center px-1 capitalize hover:underline"
            >
              Dashboard
            </a>
          </li>
          <li className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              fill="currentColor"
              className="w-2 h-2 mt-1 transform rotate-90 fill-current dark:text-gray-600"
            >
              <path d="M32 30.031h-32l16-28.061z"></path>
            </svg>
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex items-center px-1 capitalize hover:underline"
            >
              Total Offline Students
            </a>
          </li>
        </ol>
      </nav>
      {/* <h3 className="text-3xl">Total Offline Students : {totalOffline.length}</h3> */}

      <div className="flex flex-wrap items-center">
        <div className="form-control mx-2">
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input
            onChange={handleInputChange}
            name="FirstFollowup"
            type="date"
            className="input input-sm w-full input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Course Name</span>
          </label>
          <select
            onChange={handleCourseChange}
            className="select select-sm w-full border-gray-400"
          >
            <option>Course Name</option>
            {uniqueCourse.map((value) => (
              <option key={value._id} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control mx-2">
          <label className="label">
            <span className="label-text">Batch Name</span>
          </label>
          <select
            onChange={handleBatchChange}
            className="select select-sm w-full border-gray-400"
          >
            <option>Batch Name</option>
            {uniqueBatch.map((value) => (
              <option key={value._id} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control mx-2">
          <label className="label">
            <span className="label-text">Head Name</span>
          </label>
          <select
            onChange={handleHeadChange}
            className="select select-sm w-full border-gray-400"
          >
            <option>Head Name</option>
            {uniqueHead.map((value) => (
              <option key={value._id} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control mx-2">
          <label className="label">
            <span className="label-text">User Name</span>
          </label>
          <select
            onChange={handleUserChange}
            className="select select-sm w-full border-gray-400"
          >
            <option>User Name</option>
            {uniqueUser.map((value) => (
              <option key={value._id} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-10 mx-4">
          <input
            type="text"
            className="input input-bordered input-sm w-full max-w-xs mb-3"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search By Name, Phone, Email"
          ></input>
        </div>

        <DownloadTableExcel
          filename="users table"
          sheet="users"
          currentTableRef={tableRef.current}
        >
          <button className="mt-6 btn btn-sm btn-outline">
            <FaFileDownload className="inline-block"></FaFileDownload>
          </button>
        </DownloadTableExcel>
      </div>

      <div className="p-2">
        <div className="overflow-x-auto" style={{ height: "430px" }}>
          <form>
            <table className="table w-full">
              <thead
                className="text-xs sticky top-0 bg-slate-300"
                style={{ width: "1200px" }}
              >
                <tr>
                  <th className="p-1 border-2">#</th>
                  <th className="p-1 border-2">Date</th>
                  <th className="p-1 border-2">C N</th>
                  <th className="p-1 border-2">B N</th>
                  <th className="p-1 border-2">U N</th>
                  <th className="p-1 border-2">H N</th>
                  <th className="p-1 border-2">Name</th>
                  <th className="p-1 border-2">Phone</th>
                  <th className="p-1 border-2">Email</th>
                  <th className="p-1 border-2">Action</th>
                </tr>
              </thead>

              <tbody className="w-fit text-xs">
                {filterData.length > 0 &&
                  filterData
                    ?.filter((offline) => {
                      return search?.toLowerCase() === ""
                        ? offline
                        : offline.name
                            .toLowerCase()
                            .includes(search?.toLowerCase()) ||
                            offline.email
                              ?.toLowerCase()
                              .includes(search?.toLowerCase()) ||
                            offline.phone
                              .toLowerCase()
                              .includes(search?.toLowerCase());
                    })
                    ?.map((offline, i) => (
                      <tr key={offline._id}>
                        <th className="p-1 border-2">{i + 1}</th>
                        <td className="p-1 border-2">
                          {offline.date.slice(0, 10)}
                        </td>
                        <td className="p-1 border-2">{offline.course.name}</td>
                        <td className="p-1 border-2">{offline.batch.name}</td>
                        <td className="p-1 border-2">{offline.user.name}</td>
                        <td className="p-1 border-2">{offline.head.name}</td>
                        <td className="p-1 border-2">{offline.name}</td>
                        <td className="p-1 border-2">{offline.phone}</td>
                        <td className="p-1 border-2">{offline.email}</td>
                        <td className="p-1 border-2">
                          <p
                            className="btn btn-xs btn-denger"
                            onClick={() => handleDelete(offline._id)}
                          >
                            Delete
                          </p>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OfflineStudents;
