import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../assets/logo.png";
import Swal from "sweetalert2";

const Setnew = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmpassword, setConfirmPassword] = useState("");
  const [showconfirmPassword, setConfirmShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const togglenewPasswordVisibility = () =>
    setConfirmShowPassword((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      Swal.fire({
        title: "Success!",
        text: "Your password has been reset.",
        icon: "success",
        confirmButtonText: "Go to Login",
        confirmButtonColor: "#28a745",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4">
      {/* Reset Password Card */}
      <div className="w-full max-w-xl">
        <div className="p-8 text-center shadow-2xl primary-color bg-opacity-90 backdrop-blur-md rounded-3xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={logo} alt="STEP QUEST" className="h-20" />
          </div>

          {/* Title */}
          <h2 className="mb-2 text-2xl font-bold text-white">Reset Password</h2>
          <p className="mb-8 text-sm text-teal-100">
            Enter your new password below to reset your password
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password */}
            <div>
              <label className="block mb-2 font-medium text-left text-white">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter New Password"
                  className="w-full px-4 py-3 pr-12 text-white transition bg-white border border-white bg-opacity-20 border-opacity-30 rounded-xl placeholder:text-white placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute text-white transition -translate-y-1/2 right-3 top-1/2 hover:text-teal-100"
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-2 font-medium text-left text-white">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showconfirmPassword ? "text" : "password"}
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter Confirm Password"
                  className="w-full px-4 py-3 pr-12 text-white transition bg-white border border-white bg-opacity-20 border-opacity-30 rounded-xl placeholder:text-white placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  required
                />
                <button
                  type="button"
                  onClick={togglenewPasswordVisibility}
                  className="absolute text-white transition -translate-y-1/2 right-3 top-1/2 hover:text-teal-100"
                >
                  {showconfirmPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 font-bold text-white transition bg-teal-700 rounded-full shadow-md hover:bg-teal-800 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          {/* Back to Sign In */}
          <p className="mt-6 text-sm text-white">
            <a
              href="/login"
              className="underline transition hover:text-teal-100"
            >
              Back to Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Setnew;
