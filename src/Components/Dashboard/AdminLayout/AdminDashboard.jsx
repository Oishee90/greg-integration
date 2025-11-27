import React, { useState } from "react";
import { Users, UserCheck, Settings, BarChart3, Menu } from "lucide-react";
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

// Sample data for the chart
const chartData = [
  { month: "Jan", users: 100 },
  { month: "Feb", users: 2200 },
  { month: "Mar", users: 2800 },
  { month: "Apr", users: 3800 },
  { month: "May", users: 2000 },
  { month: "Jun", users: 1000 },
  { month: "Jul", users: 4900 },
  { month: "Aug", users: 3500 },
  { month: "Sep", users: 2000 },
  { month: "Oct", users: 4200 },
  { month: "Nov", users: 3000 },
  { month: "Dec", users: 4500 },
];

const AdminDashboard = () => {
  return (
    <main className="flex-1 m-4  overflow-y-auto bg-[#FFFFFF] rounded-3xl inter ">
      <div className="p-8">
        <div className="mx-auto ">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold text-[#363636]">
              Dashboard
            </h2>
            <p className="mt-3 text-xl font-normal basic-color inter">
              Welcome back, Greg!
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 mb-8 lg:w-1/2 md:grid-cols-2">
            {/* Total Users Card */}
            <div className="p-6 bg-white border border-gray-200 shadow-xl rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-2 text-xl font-semibold basic-color">
                    Total Users
                  </p>
                  <p className="mt-4 text-4xl font-bold bold-color">8,249</p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#73CBCD80]">
                  <LuUsersRound className="text-[#16A8AD]" size={24} />
                </div>
              </div>
            </div>

            {/* Active Users Card */}
            <div className="p-6 bg-white border border-gray-200 shadow-xl rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-2 text-xl font-semibold basic-color">
                    Active Users
                  </p>
                  <p className="mt-4 text-4xl font-bold bold-color">5,248</p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-[#DDFFDF] rounded-lg">
                  <UserCheck className="text-[#28B305]" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="mb-2 text-2xl font-bold text-[#363636]">
                Active Users
              </h3>
              {/* <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 transition border border-gray-300 rounded-lg hover:bg-gray-50">
                <span>▼</span>
                <span>Filter</span>
                <span>▼</span>
              </button> */}
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
                  stroke="#000000"
                  style={{ fontSize: "20px" }}
                />
                <YAxis
                  stroke="#000000"
                  style={{ fontSize: "20px" }}
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
                  labelStyle={{ color: "white" }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
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
