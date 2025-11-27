import React, { useState, useEffect, useRef } from "react";
import { Users, UserCheck } from "lucide-react";
import { LuUsersRound } from "react-icons/lu";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  useGetADashboardTotalUserQuery,
  useGetActiveUsersGraphQuery,
} from "../../../Redux/feature/authapi";

const AdminDashboard = () => {
  const { data: TotalUser } = useGetADashboardTotalUserQuery();

  const [openYear, setOpenYear] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const dropdownRef = useRef(null);

  const { data: activeUserGraph, refetch } = useGetActiveUsersGraphQuery(
    selectedYear,
    {
      skip: !selectedYear,
    }
  );

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenYear(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Years for dropdown
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  // Prepare chart data
  const chartData =
    activeUserGraph?.data?.map((item) => ({
      month: item.month.slice(0, 3), // short name for x-axis
      active_users: item.active_users,
      fullMonth: item.month, // full name for tooltip
    })) || [];

  return (
    <main className="flex-1 m-4 overflow-y-auto bg-[#FFFFFF] rounded-3xl inter">
      <div className="p-8">
        <div className="mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold text-[#363636]">
              Dashboard
            </h2>
            <p className="mt-3 text-xl font-normal basic-color inter">
              Welcome back, Greg!
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-6 mb-8 lg:w-1/2 md:grid-cols-2">
            <div className="p-6 bg-white border border-gray-200 shadow-xl rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-2 text-xl font-semibold basic-color">
                    Total Users
                  </p>
                  <p className="mt-4 text-4xl font-bold bold-color">
                    {TotalUser?.data?.total_users}
                  </p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#73CBCD80]">
                  <LuUsersRound className="text-[#16A8AD]" size={24} />
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border border-gray-200 shadow-xl rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-2 text-xl font-semibold basic-color">
                    Active Users
                  </p>
                  <p className="mt-4 text-4xl font-bold bold-color">
                    {TotalUser?.data?.active_users}
                  </p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-[#DDFFDF] rounded-lg">
                  <UserCheck className="text-[#28B305]" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="relative p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="mb-2 text-2xl font-bold text-[#363636]">
                Active Users ({selectedYear})
              </h3>

              {/* Year Filter */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpenYear(!openYear)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 transition border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <span>{selectedYear}</span>
                  <span>▼</span>
                </button>

                {openYear && (
                  <div className="absolute right-0 z-50 w-40 mt-2 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg max-h-64">
                    {years.map((yr) => (
                      <button
                        key={yr}
                        onClick={() => {
                          setSelectedYear(yr);
                          setOpenYear(false);
                        }}
                        className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                          selectedYear === yr ? "bg-gray-100 font-semibold" : ""
                        }`}
                      >
                        {yr}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
                  stroke="#000000"
                  style={{ fontSize: "16px" }}
                />
                <YAxis
                  stroke="#000000"
                  style={{ fontSize: "16px" }}
                  ticks={[0, 1000, 2000, 3000, 4000, 5000]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0d9488",
                    border: "none",
                    borderRadius: "8px",
                    color: "white",
                    fontSize: "12px",
                  }}
                  formatter={(value, name, props) => [value, "Active Users"]}
                  labelFormatter={(label, payload) =>
                    payload[0]?.payload?.fullMonth || label
                  }
                />
                <Line
                  type="monotone"
                  dataKey="active_users"
                  stroke="#bed6d3"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6, fill: "#0d9488" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
