import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { FaFileDownload } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const TotalAdmission = () => {
  const { user } = useContext(AuthContext);
  const [totalAdmission, setTotalAdmission] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedValue, setSelectedValue] = useState([]);
  const tableRef = useRef(null);

  // Fetching data on component mount
  useEffect(() => {
    fetch("https://uiti-crm-server.vercel.app/leads?admission=true")
      .then((response) => response.json())
      .then((data) => {
        setFilterData(data);
        setTotalAdmission(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Helper function to format dates
  function formatedDate(date) {
    return new Date(date).toISOString().slice(0, -14);
  }

  // ----------------- Filter Logic --------------------
  const uniqueCourse = [...new Set(totalAdmission.map((user) => user?.course?.name))];
  const uniqueBatch = [...new Set(selectedValue.map((user) => user?.batch?.name))];
  const uniqueHead = [...new Set(selectedValue.map((user) => user?.head?.name))];
  const uniqueUser = [...new Set(selectedValue.map((user) => user?.user?.name))];

  const handleFilterChange = (event, type) => {
    const value = event.target.value;
    const fData = totalAdmission.filter((item) => item[type]?.name === value);
    setFilterData(fData);
    if (type === "course") setSelectedValue(fData);
  };

  const handleDateFilter = (event) => {
    const value = event.target.value;
    const fiData = totalAdmission.filter((si) => formatedDate(si.createdAt) === value);
    setFilterData(fiData);
  };

  const handleDelete = (leads) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) return;

    fetch(`https://uiti-crm-server.vercel.app/delete/${leads}`, {
      method: "DELETE",
      headers: {
        authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        toast.success(`Leads ${user.name} deleted successfully`);
        fetch("https://uiti-crm-server.vercel.app/leads?admission=true")
          .then((res) => res.json())
          .then((updatedData) => setFilterData(updatedData))
          .catch((error) => toast.error("Error updating data."));
      })
      .catch(() => toast.error("Error deleting the item."));
  };

  return (
    <div className="mx-2 my-2">
      <nav aria-label="breadcrumb" className="w-full p-4 dark:bg-gray-800">
        <ol className="flex h-8 space-x-2">
          <li className="flex items-center">
            <Link to="#" className="hover:underline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 pr-1"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <Link to="#" className="hover:underline">Dashboard</Link>
          </li>
          <li className="flex items-center space-x-2">
            <span>Total Admission</span>
          </li>
        </ol>
      </nav>

      <div className="flex justify-end">
        <div className="btn btn-xs">
          <AiOutlineUserAdd className="mr-2" />
          <Link to="/dashboard/add-admissions">Add New Admission</Link>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
  {/* Date Input */}
        <div className="form-control mx-2 w-60">
          <label className="label-text mb-1">Date</label>
          <input
            type="date"
            onChange={handleDateFilter}
            className="input input-sm input-bordered focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Course Name Dropdown */}
        <div className="form-control mx-2 w-60">
          <label className="label-text mb-1">Course Name</label>
          <select
            onChange={(e) => handleFilterChange(e, "course")}
            className="select select-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option>Course Name</option>
            {uniqueCourse.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        {/* Search Input */}
        <div className="form-control mx-2 w-60">
          <label className="label-text mb-1">Search</label>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            className="input input-sm input-bordered focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Search by Name, Phone, Email"
          />
        </div>

        {/* Export Button */}
        <div className="mt-6">
          <DownloadTableExcel filename="admissions" currentTableRef={tableRef.current}>
            <button className="btn btn-sm">
              <FaFileDownload />
            </button>
          </DownloadTableExcel>
        </div>
      </div>


      <div className="p-2">
        <div className="overflow-x-auto" style={{ height: "430px" }}>
          <table className="table w-full" ref={tableRef}>
            <thead className="sticky top-0 bg-slate-300">
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Course</th>
                <th>Batch</th>
                <th>User</th>
                <th>Head</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filterData
                .filter((item) =>
                  `${item.name} ${item.phone} ${item.email}`.toLowerCase().includes(search.toLowerCase())
                )
                .map((lead, index) => (
                  <tr key={lead._id}>
                    <td>{index + 1}</td>
                    <td>{formatedDate(lead.createdAt)}</td>
                    <td>{lead.course.name}</td>
                    <td>{lead.batch.name}</td>
                    <td>{lead.user.name}</td>
                    <td>{lead.head.name}</td>
                    <td>{lead.name}</td>
                    <td>{lead.phone}</td>
                    <td>{lead.email}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(lead._id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TotalAdmission;
