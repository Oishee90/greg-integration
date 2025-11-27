import React, { useState } from "react";
import { Search } from "lucide-react";

const feedbackData = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    initial: "J",
    rating: 5,
    feedback:
      "The Bible quote suggestions feel so personal — like it knows exactly what I need.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    initial: "S",
    rating: 5,
    feedback:
      "The Bible quote suggestions feel so personal — like it knows exactly what I need.",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    initial: "M",
    rating: 5,
    feedback:
      "The Bible quote suggestions feel so personal — like it knows exactly what I need.",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    initial: "E",
    rating: 5,
    feedback:
      "The Bible quote suggestions feel so personal — like it knows exactly what I need.",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.wilson@example.com",
    initial: "D",
    rating: 5,
    feedback:
      "The Bible quote suggestions feel so personal — like it knows exactly what I need.",
  },
];

export default function UserFeedbackTable() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFeedback = feedbackData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 ">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">User Feedback</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 pl-10 pr-4 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* ✅ TABLE FOR LARGE SCREEN */}
      <div className="hidden md:block">
        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-semibold tracking-wider text-gray-600 uppercase border-b border-gray-200 bg-gray-50 inter">
            <div className="col-span-4 font-semibold text-[#6B7280]">User</div>
            <div className="col-span-2 font-semibold text-center text-[#6B7280]">
              Ratings
            </div>
            <div className="col-span-6 font-semibold text-[#6B7280]">
              Feedback
            </div>
          </div>

          {filteredFeedback.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 transition-colors border-b border-gray-100 hover:bg-gray-50 outfit"
            >
              <div className="flex items-center col-span-4 gap-3">
                <div className="flex items-center justify-center w-10 h-10 text-sm font-semibold text-[#7E22CE] rounded-full bg-[#F3E8FF]">
                  {item.initial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#374151]">
                    {item.name}
                  </p>
                  <p className="text-sm text-[#4B5563]">{item.email}</p>
                </div>
              </div>

              <div className="flex items-center justify-center col-span-2">
                {[...Array(item.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 fill-current text-amber-400"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              <div className="flex items-center col-span-6">
                <p className="text-sm italic text-[#000000]">{item.feedback}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ CARD VIEW FOR MOBILE */}
      <div className="grid gap-4 md:hidden">
        {filteredFeedback.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 text-sm font-semibold text-[#7E22CE] rounded-full bg-[#F3E8FF]">
                {item.initial}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#374151]">
                  {item.name}
                </p>
                <p className="text-sm text-[#4B5563]">{item.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 mb-2">
              {[...Array(item.rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 fill-current text-amber-400"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>

            <p className="text-sm italic text-gray-800">{item.feedback}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-600">Showing 1-5 of 50 users</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
            Previous
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
