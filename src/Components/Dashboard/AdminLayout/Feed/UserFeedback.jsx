import React, { useState, useMemo } from "react";
import { useGetAllFeedbackQuery } from "../../../../Redux/feature/authapi";

// Badge color based on feedback type
const badgeStyle = (type) => {
  if (type === "App Performance") return "bg-green-100 text-green-600";
  if (type === "Feature Suggestion") return "bg-gray-200 text-gray-600";
  if (type === "Bug Report") return "bg-red-100 text-red-500";
  return "bg-blue-100 text-blue-600";
};

// Get first letter of user name
const getFirstLetter = (name) => {
  if (!name) return "?";
  return name.charAt(0).toUpperCase();
};

// Optional: avatar background color by name
const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-pink-500",
];

const getAvatarColor = (name) => {
  if (!name) return "bg-gray-500";
  return colors[name.charCodeAt(0) % colors.length];
};

export default function UserFeedback() {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  const { data: feedback = [], isLoading, isError } = useGetAllFeedbackQuery();

  // Pagination calculations
  const totalPages = Math.ceil(feedback.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;

  const paginatedData = useMemo(() => {
    return feedback.slice(startIndex, startIndex + usersPerPage);
  }, [feedback, startIndex, usersPerPage]);

  if (isLoading) {
    return <p className="p-6">Loading feedback...</p>;
  }

  if (isError) {
    return <p className="p-6 text-red-500">Failed to load feedback</p>;
  }

  return (
    <div className="flex-1 m-4 overflow-y-auto bg-white rounded-3xl inter">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-[#363636]">Dashboard</h2>
          <p className="mt-3 text-xl">Welcome back, Admin!</p>
        </div>

        <div className="overflow-hidden bg-white shadow-sm rounded-3xl">
          <div className="px-4 py-3 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-[#363636]">User Feedback</h2>
          </div>

          {/* Table */}
          <div className="hidden mt-2 md:block">
            <div className="overflow-y-auto max-h-[600px] thin-scrollbar rounded-xl">
              <table className="w-full rounded-xl">
                <thead className="sticky top-0 z-40 text-sm font-medium  text-white bg-[#16A8AD] rounded-t-xl">
                  <tr>
                    <th className="p-3 text-left">User</th>
                    <th className="p-3">Rating</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Type</th>
                    <th className="p-3 text-left">Message</th>
                    <th className="p-3">File</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedData.map((item) => (
                    <tr
                      key={item.feedback_id}
                      className="border-b last:border-none"
                    >
                      {/* User */}
                      <td className="flex items-center gap-3 p-3">
                        <div
                          className={`flex items-center justify-center w-9 h-9 text-sm font-semibold text-white rounded-full ${getAvatarColor(
                            item.user_name
                          )}`}
                        >
                          {getFirstLetter(item.user_name)}
                        </div>

                        <div>
                          <p className="font-medium">
                            {item.user_name || "Anonymous"}
                          </p>
                          <p className="text-xs text-gray-400">
                            {item.user_email}
                          </p>
                        </div>
                      </td>

                      {/* Rating */}
                      <td className="p-3 text-center">⭐ {item.ratings}</td>

                      {/* Date */}
                      <td className="p-3 text-center">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>

                      {/* Type */}
                      <td className="p-3 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${badgeStyle(
                            item.feedback_type
                          )}`}
                        >
                          {item.feedback_type}
                        </span>
                      </td>

                      {/* Message */}
                      <td className="p-3">{item.message}</td>

                      {/* File */}
                      <td className="p-3 text-center">
                        {item.upload_file ? (
                          <a
                            href={item.upload_file}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1 text-xs text-white bg-gray-700 rounded"
                          >
                            View file
                          </a>
                        ) : (
                          <span className="text-xs text-gray-400">No file</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {feedback.length === 0 && (
                <p className="p-6 text-center text-gray-500">
                  No feedback found
                </p>
              )}
            </div>
          </div>

          {/* Pagination */}
          {feedback.length > usersPerPage && (
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <p className="text-sm text-gray-700">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + usersPerPage, feedback.length)} of{" "}
                {feedback.length} users
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 border rounded disabled:opacity-40"
                >
                  &lt;
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 text-sm font-medium rounded ${
                        currentPage === page
                          ? "bg-gray-800 text-white"
                          : "border"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 border rounded disabled:opacity-40"
                >
                  &gt;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
