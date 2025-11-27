/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../assets/logo.png";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && password === "admin@gmail.com") {
      toast.success("Login Successful!");
      setTimeout(() => navigate("/"), 1500);
    } else {
      toast.error("❌ Invalid email or password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 main-color inter ">
      <Toaster />
      <div className=" w-full max-w-xl rounded-xl shadow-lg p-8 flex flex-col items-center border border-[#FFFFFF] primary-color ">
        {/* Logo */}
        <img src={logo} alt="Logo" className="h-20 mb-4 " />

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {/* Email */}
          <div className="">
            <label htmlFor="password" className="text-xl font-medium white">
              Enter Your Email
            </label>
            <input
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-white bg-[#65CDD0] px-4 py-3 rounded-lg border b border-white focus:outline-none focus:ring-2 focus:ring-[#42b3b3] mt-2  placeholder:text-white"
              required
            />
          </div>

          {/* Password */}
          <div className="relative ">
            <label htmlFor="password" className="text-xl font-medium white">
              Enter Your Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#65CDD0] text-white px-4 py-3 rounded-lg border b border-white focus:outline-none focus:ring-2 focus:ring-[#42b3b3] mt-2  placeholder:text-white"
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
          <div className="">
            <NavLink to="/forgot">
              <h1 className="text-base text-white cursor-pointer hover:underline">
                Forgot Password
              </h1>
            </NavLink>
          </div>

          {/* <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              className="w-5 h-5 accent-[#42b3b3] cursor-pointer"
            />
            <label className="text-white cursor-pointer select-none">
              Forgot Password
            </label>
          </div> */}

          {/* Submit */}
          <button className="w-full py-3 bg-[#0d7377] text-white rounded-lg font-medium hover:bg-[#095959] transition">
            Log In
          </button>
        </form>

        {/* Sign Up */}
        {/* <p className="mt-6 text-sm text-white">
          Don't have an account?{" "}
          <NavLink to="/signup" className="font-medium underline">
            Sign Up
          </NavLink>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
