import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";
import authStore from "../../../api-request/signinApi";

const AddNewEmployee = () => {
  const { signup, signupData, signupError } = useContext(AuthContext);
  const {userCreateApi} = authStore();

  const [loader,setLoader] = useState(false);

  const navigate = useNavigate();
  // useEffect(() => {
  //     // console.log(user);
  //     if (user?._id) {
  //         navigate("/dashboard/setting/user");
  //         toast.success('User Created Success')
  //     }
  // }, [user, navigate]);

  // if (signupData) {
  //   navigate("/dashboard/employee/show-all");
  // }

  // if (signupError) {
  //   toast.error(signupError);
  // }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const role = e.target.role.value;


  const payload = {
    name,
    email,
    password,
    role,
  }

  if(!email){
    toast.error('Please enter email')
    return
  }else if (password.length === 0){
    toast.error('Please enter password')
    return
  }else{
      setLoader(true);
      const res = await userCreateApi(payload);
      setLoader(false);
      if(res){
        navigate("/dashboard/employee/show-all");
        toast.success('User Created Successfully')
      }else{
        toast.error('Failed to create user')
      }
      
  } 
}
  return (
    <div className="h-[500px] flex justify-center items-center">
      
      <div className="w-96 p-7">
      <h2 className="text-2xl font-bold text-center border-b-2 pb-2">
        Create User Acount
      </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs mt-4">
            <select
              name="role"
              id="role"
              className="select select-bordered w-full max-w-xs"
            >
              <option>user</option> {/* User === Employee */}
              <option>head</option>
              <option>accounts</option> 
            </select>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="input input-bordered w-full max-w-xs mb-6"
            />
          </div>

          <input
            className="btn btn-accent w-full text-white"
            value="Sign Up"
            type="submit"
          />

          {/* <p>Already have an Account <Link className='text-secondary' to="/login">Please Login</Link></p> */}
        </form>
      </div>
    </div>
  );
};

export default AddNewEmployee;
