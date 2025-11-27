// src/components/settings/Settings.jsx
import React, { useState } from "react";
import { Globe, FileText, Shield } from "lucide-react";
import GeneralTab from "./GeneralTab";
import TermsCondition from "./TermsCondition";
import Privacy from "./Privacy";
import { MdOutlineShield } from "react-icons/md";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("terms");

  return (
    <div className="flex-1 m-4  overflow-y-auto bg-[#FFFFFF] rounded-3xl p-6 px-6">
      <div className="">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-9">Settings</h1>

        {/* Tabs */}
        <div className="flex items-center gap-8 px-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("terms")}
            className={`flex items-center gap-2 pb-3 text-xl md:text-xl font-bold transition-colors roboto
                ${
                  activeTab === "terms"
                    ? "text-[#16A8AD] border-b-2 border-[#16A8AD]"
                    : "text-[#363636] hover:text-[#363636]"
                }`}
          >
            <FileText className="text-xl" />
            Terms And condition
          </button>

          <button
            onClick={() => setActiveTab("privacy")}
            className={`flex items-center gap-2 pb-3 text-xl md:text-xl  font-medium transition-colors roboto ${
              activeTab === "privacy"
                ? "text-[#16A8AD] border-b-2 border-[#16A8AD]"
                : "text-[#363636] hover:text-[#363636]"
            }`}
          >
            <Shield className="text-xl" />
            Privacy Policy
          </button>
        </div>

        {/* Tab Content */}

        {activeTab === "terms" && <TermsCondition />}
        {activeTab === "privacy" && <Privacy />}
      </div>
    </div>
  );
};

export default Settings;
