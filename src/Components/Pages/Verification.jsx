import React, { useState } from "react";
import bg from "../../assets/otp.png";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { div } from "framer-motion/client";
import Setnew from "./Setnew";
const Verification = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const navigate = useNavigate();
  const [newpass, setNew] = useState("");
  // Handle input change
  const handleInputChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // Allow only numeric input

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      document.getElementById(`input-${index + 1}`).focus(); // Focus next input
    }
  };

  // Handle keydown for navigating between inputs
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !code[index]) {
      document.getElementById(`input-${index - 1}`).focus(); // Focus previous input
    }
  };

  // Handle paste event (only numeric values are allowed)
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text").split("");
    if (
      pastedData.length === 4 &&
      pastedData.every((char) => /^\d$/.test(char))
    ) {
      setCode(pastedData);
    }
  };

  // Handle submit (Verification logic)
  const handleSubmit = () => {
    const otpCode = code.join(""); // Convert array to string
    if (otpCode.length === 4) {
      setSuccessMessage("✅ Verification Successful! Redirecting...");
      setTimeout(() => {
        setSuccessMessage(""); // Clear message after a few seconds
      }, 3000);
      setNew(true);
    } else {
      setSuccessMessage("❌ Please enter a valid 4-digit code.");
      setNew(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 inter">
      {!newpass ? (
        // OTP Verification Card
        <div className="w-full max-w-xl ">
          <div className="p-8 text-center shadow-2xl primary-color bg-opacity-90 backdrop-blur-md rounded-3xl">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img src={logo} alt="STEP QUEST" className="h-20" />
            </div>

            {/* Title */}
            <h2 className="mb-2 text-3xl font-bold text-white">Verify OTP</h2>
            <p className="mb-8 text-sm text-white">
              We have sent a 4-digit code to your email
            </p>

            {/* OTP Input Boxes */}
            <div
              className="flex justify-center gap-3 mb-8"
              onPaste={handlePaste}
            >
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`input-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-16 h-16 text-2xl font-bold text-center text-white transition bg-white border border-white bg-opacity-20 border-opacity-30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 placeholder:text-white placeholder:opacity-50"
                  placeholder=""
                />
              ))}
            </div>

            {/* Verify Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-3 mb-4 font-bold text-white transition bg-teal-700 rounded-full shadow-md hover:bg-teal-800"
            >
              Verify
            </button>

            {/* Success/Error Message */}
            {successMessage && (
              <p
                className={`text-sm font-medium text-center ${
                  successMessage.includes("Successful")
                    ? "text-green-200"
                    : "text-red-200"
                }`}
              >
                {successMessage}
              </p>
            )}

            {/* Resend OTP */}
            <p className="mt-6 text-sm text-white">
              Didn’t get the code?{" "}
              <a href="#" className="underline transition hover:text-teal-100">
                Resend OTP
              </a>
            </p>
          </div>
        </div>
      ) : (
        // Show Set New Password
        <Setnew />
      )}
    </div>
  );
};

export default Verification;
