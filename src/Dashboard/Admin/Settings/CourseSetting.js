import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import courseStore from "../../../api-request/courseApi";

const CourseSetting = () => {
  const [courseName, setCourseName] = useState();

  const { courseCreateApi,allCourseDataApi,allCourseData } = courseStore();
  
  useEffect(()=>{
    (async()=>{
      await allCourseDataApi();
    })()
  },[]);

  console.log(allCourseData);

  const handleCourse = (e) => {
    setCourseName(e.target.value);
  };

  const { data: coursesInfos = [], refetch } = useQuery({
    queryKey: ["coursesName"],
    queryFn: async () => {
      const res = await fetch(
        `https://uiti-crm-server.vercel.app/course`
      );
      const data = await res.json();
      return data.users;
    },
  });

  const handleCourseAdd = () => {
    const addCourseName = {
      name: courseName,
    };



    fetch(`https://uiti-crm-server.vercel.app/course`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(addCourseName),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(`${courseName} added successfully`);
        refetch();
      });
  };

  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${name}" item?`
    );
    if (!confirmDelete) {
      return;
    }

    fetch(`https://uiti-crm-server.vercel.app/delete-course/${id}`, {
      method: "DELETE",

    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        toast.success(`Course ${courseName} deleted successfully`);
        refetch();
      });
  };

  const [loader, setLoader] = useState(false);

  const courseCreate = async (e) => {

    e.preventDefault();
    const name = e.target.name.value;

    console.log(name)

    const payload = {
      name
    };

    if (!name) {
      return toast.error("Please enter course name");
    } else {
      setLoader(true);
      const res = await courseCreateApi(payload);
      setLoader(false);
      if (res) {
        await allCourseDataApi();
        toast.success(`Course ${name} added successfully`);
      } else {
        toast.error("Failed to add course");
      }
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mt-4">Add Course Name !</h2>
      <form onSubmit={courseCreate} >
        <div className="m-2">
          <input
            // onChange={handleCourse}
            type="text"
            name="name"
            placeholder="Type Course Name"
            className="input input-accent  input-sm focus:ring-0 focus:outline-0 focus:input-sm  focus:border-2 w-full max-w-xs"
          // value={courseName}
          />
          <button
            className="btn btn-sm btn-accent m-2 text-black/[0.8] font-semibold"
          >
            Add Course Name
          </button>
        </div>
      </form>
      <div className="max-w-2xl mx-auto mt-6">
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
                  <th className="p-1 border-2">Batch Name</th>
                  <th className="p-1 border-2">Action</th>
                </tr>
              </thead>

              <tbody className="w-fit text-xs">
                {coursesInfos?.length > 0 &&
                  coursesInfos?.map((online, i) => (
                    <tr key={online._id}>
                      <th className="p-1 border-2">{i + 1}</th>
                      <td className="p-1 border-2">
                        {online?.createdAt?.slice(0, -14)}
                      </td>
                      <td className="p-1 border-2">{online?.name}</td>
                      <td className="p-1 border-2 text-center">
                        <p
                          className="btn btn-xs  bg-red-500 border-0 hover:bg-red-700"
                          onClick={() => handleDelete(online._id, online?.name)}
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

export default CourseSetting;
