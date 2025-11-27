// src/components/settings/GeneralTab.jsx
import React from "react";

const GeneralTab = () => {
  return (
    <>
      {/* Account Settings */}
      <div className="p-6 mb-6 inter border border-[#B0B0B04D] rounded-xl w-full md:w-2/3">
        <h2 className="mb-5 text-lg font-bold text-[#767676]">
          Account Settings
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm  text-[#B0B0B0] unbounded">
              Dashboard Name
            </label>
            <input
              type="text"
              defaultValue="Admin User"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#DF951F] focus:border-[#DF951F] transition"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm  text-[#B0B0B0] unbounded">
              Email Address
            </label>
            <input
              type="email"
              defaultValue="admin@cyberadmin.com"
              readOnly
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#DF951F] focus:border-[#DF951F] transition"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm  text-[#B0B0B0] unbounded">
              Role
            </label>
            <input
              type="text"
              defaultValue="Administrator"
              readOnly
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#DF951F] focus:border-[#DF951F] transition"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm  text-[#B0B0B0] unbounded">
              Account Status
            </label>
            <input
              type="text"
              defaultValue="Active"
              readOnly
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#DF951F] focus:border-[#DF951F] transition"
            />
          </div>
        </div>

        <div className="mt-6">
          <button className="px-5 py-2.5 bg-[#DF951F] hover:bg-[#c67a10] text-white font-medium rounded-lg transition">
            Save Changes
          </button>
        </div>
      </div>

      {/* Password */}
      <div className="p-6 mb-6 inter border border-[#B0B0B04D] rounded-xl w-full md:w-2/3">
        <h2 className="mb-5 text-lg font-bold text-[#767676]">Password</h2>
        <div>
          <label className="block mb-1 text-sm  text-[#B0B0B0] unbounded">
            Current Password
          </label>
          <input
            type="password"
            placeholder=""
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#DF951F] focus:border-[#DF951F] transition"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm  text-[#B0B0B0] unbounded">
              New Password
            </label>
            <input
              type="password"
              placeholder=""
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#DF951F] focus:border-[#DF951F] transition"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm  text-[#B0B0B0] unbounded">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder=""
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#DF951F] focus:border-[#DF951F] transition"
            />
          </div>
        </div>

        <div className="mt-6">
          <button className="px-5 py-2.5 bg-[#DF951F] hover:bg-[#c67a10] text-white font-medium rounded-lg transition">
            Update Password
          </button>
        </div>
      </div>
    </>
  );
};

export default GeneralTab;
