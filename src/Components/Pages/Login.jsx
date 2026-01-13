/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../assets/logo.png";
import toast, { Toaster } from "react-hot-toast";
import { useSuperAdminLoginMutation } from "../../Redux/feature/authapi";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../../Redux/feature/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginUser, { isLoading }] = useSuperAdminLoginMutation();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password }).unwrap();

      toast.success("Login Successful!");

      // Extract data
      const access = res?.data?.access;
      const refresh = res?.data?.refresh;
      const user = res?.data?.user;

      // Persist into redux + localStorage
      dispatch(
        userLoggedIn({
          access,
          refresh,
          user,
        })
      );

      setTimeout(() => navigate("/"), 1200);
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      toast.error("❌ Invalid email or password!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 main-color inter ">
      <Toaster />
      <div className=" w-full max-w-xl rounded-xl shadow-lg p-8 flex flex-col items-center border border-[#FFFFFF] primary-color ">
        <img src={logo} alt="Logo" className="h-20 mb-4 " />

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="">
            <label htmlFor="password" className="text-xl font-medium white">
              Enter Your Email
            </label>
            <input
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-white bg-[#65CDD0] px-4 py-3 rounded-lg border b border-white focus:outline-none focus:ring-2 focus:ring-[#42b3b3] mt-2 placeholder:text-white"
              required
            />
          </div>

          <div className="relative ">
            <label htmlFor="password" className="text-xl font-medium white">
              Enter Your Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#65CDD0] text-white px-4 py-3 rounded-lg border b border-white focus:outline-none focus:ring-2 focus:ring-[#42b3b3] mt-2 placeholder:text-white"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute white -translate-y-1/2 right-3 top-[69%] hover:text-gray-200"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* <div className="">
            <NavLink to="/forgot">
              <h1 className="text-base text-white cursor-pointer hover:underline">
                Forgot Password
              </h1>
            </NavLink>
          </div> */}

          <button
            disabled={isLoading}
            className="w-full py-3 bg-[#0d7377] text-white rounded-lg font-medium hover:bg-[#095959] transition"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
