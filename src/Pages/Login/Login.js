import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import authStore, {  } from "../../api-request/signinApi";

const Login = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const {userLoginApi} = authStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email) {
      toast.error("Please enter a valid email");
      return;
    }
    if (!password) {
      toast.error("Please enter a valid password");
      return;
    }

    const payload = { email, password };
    setLoader(true);

    try {
      const res = await userLoginApi(payload);
      if (res) {
        toast.success("User logged in successfully");
        navigate("/dashboard");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="h-[400px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-xl text-center">Login</h2>
        <form onSubmit={handleLogin}>
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

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="input input-bordered w-full max-w-xs"
            />
            <label className="label">
              <span className="label-text">Forgot Password?</span>
            </label>
          </div>

          <button
            type="submit"
            className={`btn btn-accent w-full text-white mt-4 ${loader ? "opacity-50 cursor-not-allowed" : ""
              }`}
            disabled={loader}
          >
            {loader ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
