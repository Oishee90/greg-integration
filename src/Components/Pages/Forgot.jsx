/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Verification from "./Verification";
import logo from "../../assets/logo.png"; // Make sure this logo has the "STEP QUEST" with icon

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "admin@gmail.com") {
      setShowVerification(true);
    } else {
      alert("Invalid email address");
      setShowVerification(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 main-color inter">
      {!showVerification ? (
        // Forgot Password Card
        <div className="w-full max-w-xl">
          <div className="p-8 text-center border border-white shadow-2xl primary-color bg-opacity-90 backdrop-blur-md rounded-3xl">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img src={logo} alt="Logo" className="h-20 mb-4 " />
            </div>

            {/* Title */}
            <h2 className="mb-2 text-2xl font-semibold text-white">
              Forgot Password
            </h2>
            <p className="mb-8 text-base white">
              Enter your email address and we'll send you a verify code to reset
              your password.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 font-normal text-left text-white"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 text-white transition bg-white border border-white bg-opacity-20 border-opacity-30 rounded-xl placeholder:text-white placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 font-bold text-white transition duration-200 bg-teal-700 rounded-full shadow-md hover:bg-teal-800"
              >
                Continue
              </button>
            </form>

            {/* Back to Sign In */}
            <p className="mt-6 text-white">
              <a
                href="/login"
                className="underline transition hover:text-teal-100"
              >
                Back to Sign In
              </a>
            </p>
          </div>
        </div>
      ) : (
        // Verification Screen
        <Verification email={email} />
      )}
    </div>
  );
};

export default Forgot;
