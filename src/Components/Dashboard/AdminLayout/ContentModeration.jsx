import { useState } from "react";
import { Check, X, ChevronLeft, ChevronRight } from "lucide-react";

const initialData = [
  {
    id: 1,
    quote:
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    category: "Inspiration",
    submittedBy: "john.smith@example.com",
    date: "2025-07-12",
    status: "pending",
  },
  {
    id: 2,
    quote:
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    category: "Inspiration",
    submittedBy: "john.smith@example.com",
    date: "2025-07-12",
    status: "approved",
  },
  {
    id: 3,
    quote:
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    category: "Inspiration",
    submittedBy: "john.smith@example.com",
    date: "2025-07-12",
    status: "pending",
  },
  {
    id: 4,
    quote:
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    category: "Inspiration",
    submittedBy: "john.smith@example.com",
    date: "2025-07-12",
    status: "rejected",
  },
  {
    id: 5,
    quote:
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    category: "Inspiration",
    submittedBy: "john.smith@example.com",
    date: "2025-07-12",
    status: "pending",
  },
  {
    id: 6,
    quote: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    category: "Life",
    submittedBy: "sarah.doe@example.com",
    date: "2025-07-11",
    status: "pending",
  },
  {
    id: 7,
    quote:
      "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "Dreams",
    submittedBy: "mike.wilson@example.com",
    date: "2025-07-11",
    status: "approved",
  },
  {
    id: 8,
    quote:
      "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    category: "Motivation",
    submittedBy: "emma.brown@example.com",
    date: "2025-07-10",
    status: "pending",
  },
  {
    id: 9,
    quote: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
    category: "Self",
    submittedBy: "alex.jones@example.com",
    date: "2025-07-10",
    status: "rejected",
  },
  {
    id: 10,
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "Work",
    submittedBy: "chris.martin@example.com",
    date: "2025-07-09",
    status: "pending",
  },
];

export default function ContentModeration() {
  const [quotes, setQuotes] = useState(initialData);
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const itemsPerPage = 8;

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleApprove = (id) => {
    setQuotes(
      quotes.map((q) => (q.id === id ? { ...q, status: "approved" } : q))
    );
    showToast("Quote approved successfully!", "success");
  };

  const handleReject = (id) => {
    setQuotes(
      quotes.map((q) => (q.id === id ? { ...q, status: "rejected" } : q))
    );
    showToast("Quote rejected successfully!", "error");
  };

  const handleApproveAll = () => {
    const pendingCount = quotes.filter((q) => q.status === "pending").length;
    setQuotes(
      quotes.map((q) =>
        q.status === "pending" ? { ...q, status: "approved" } : q
      )
    );
    showToast(`${pendingCount} quotes approved successfully!`, "success");
  };

  const filteredQuotes = quotes.filter((quote) => {
    if (activeTab === "all") return true;
    return quote.status === activeTab;
  });

  const totalPages = Math.ceil(filteredQuotes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentQuotes = filteredQuotes.slice(startIndex, endIndex);

  const pendingCount = quotes.filter((q) => q.status === "pending").length;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen p-4 outfit">
      <div className="">
        <div className="flex flex-col items-start justify-between gap-6 mb-6 lg:items-center lg:flex-row">
          <h1 className="text-2xl font-semibold text-gray-900">
            Content Moderation
          </h1>
          {pendingCount > 0 && (
            <button
              onClick={handleApproveAll}
              className="flex items-center gap-2 px-4 py-2 font-medium text-white transition-colors rounded-lg"
              style={{ backgroundColor: "#DF951F" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#c8840f")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#DF951F")}
            >
              <Check size={18} />
              Approve All Pending
            </button>
          )}
        </div>

        <div className="flex gap-6 mb-6 border-b border-gray-200">
          <button
            onClick={() => handleTabChange("all")}
            className={`pb-3 px-1 font-medium transition-colors relative ${
              activeTab === "all"
                ? "text-purple-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            All
            {activeTab === "all" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
            )}
          </button>
          <button
            onClick={() => handleTabChange("pending")}
            className={`pb-3 px-1 font-medium transition-colors relative ${
              activeTab === "pending"
                ? "text-purple-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Pending
            {activeTab === "pending" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
            )}
          </button>
          <button
            onClick={() => handleTabChange("approved")}
            className={`pb-3 px-1 font-medium transition-colors relative ${
              activeTab === "approved"
                ? "text-purple-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Approved
            {activeTab === "approved" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
            )}
          </button>
          <button
            onClick={() => handleTabChange("rejected")}
            className={`pb-3 px-1 font-medium transition-colors relative ${
              activeTab === "rejected"
                ? "text-purple-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Rejected
            {activeTab === "rejected" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 mb-6 md:grid-cols-2">
          {currentQuotes.map((quote) => (
            <div key={quote.id} className="bg-white shadow-xl rounded-2xl ">
              <div className="flex items-start justify-between p-4 mb-4 bg-[#f4f7f7]">
                <span
                  className={`px-3 py-1 rounded-3xl text-sm font-medium ${
                    quote.status === "pending"
                      ? "bg-[#FEF9C3] text-[#854D0E]"
                      : quote.status === "approved"
                      ? "bg-[#DCFCE7] text-[#166534]"
                      : "bg-[#FEE2E2] text-[#991B1B]"
                  }`}
                >
                  {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                </span>
                <span className="text-sm text-gray-500">{quote.date}</span>
              </div>

              <p className="px-4 mb-4 text-lg text-gray-900">{quote.quote}</p>

              <div className="flex items-center justify-between p-4 mb-4">
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    — {quote.author}
                  </p>
                  <p className="text-sm text-gray-500">
                    Category: {quote.category}
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  Submitted by: {quote.submittedBy}
                </p>
              </div>

              {quote.status === "pending" && (
                <div className="flex justify-end gap-3 p-6  bg-[#f4f7f7]">
                  <button
                    onClick={() => handleReject(quote.id)}
                    className="flex items-center gap-2 px-4 py-2 font-medium text-white transition-colors rounded-lg"
                    style={{ backgroundColor: "#DC2626" }}
                  >
                    <X size={18} /> Reject
                  </button>
                  <button
                    onClick={() => handleApprove(quote.id)}
                    className="flex items-center gap-2 px-4 py-2 font-medium text-white transition-colors rounded-lg"
                    style={{ backgroundColor: "#DF951F" }}
                  >
                    <Check size={18} /> Approve
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  currentPage === index + 1
                    ? "bg-purple-600 text-white"
                    : "bg-white border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {toast.show && (
        <div
          className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white font-medium animate-slide-in ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
