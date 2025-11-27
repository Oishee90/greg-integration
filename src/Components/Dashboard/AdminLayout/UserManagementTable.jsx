/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import Swal from "sweetalert2";

const fakeUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    status: "Active",
    joinDate: "2023-05-15",
    lastActive: "2023-07-25",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah.smith@example.com",
    status: "Active",
    joinDate: "2023-05-15",
    lastActive: "2023-07-25",
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael.j@example.com",
    status: "Inactive",
    joinDate: "2023-05-15",
    lastActive: "2023-07-25",
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma.w@example.com",
    status: "Active",
    joinDate: "2023-05-15",
    lastActive: "2023-07-25",
  },
  {
    id: 5,
    name: "Michael Johnson",
    email: "michael.j@example.com",
    status: "Inactive",
    joinDate: "2023-05-15",
    lastActive: "2023-07-25",
  },
  {
    id: 6,
    name: "Emma Wilson",
    email: "emma.w@example.com",
    status: "Active",
    joinDate: "2023-05-15",
    lastActive: "2023-07-25",
  },
  {
    id: 7,
    name: "Michael Johnson",
    email: "michael.j@example.com",
    status: "Suspended",
    joinDate: "2023-05-15",
    lastActive: "2023-07-25",
  },
  {
    id: 8,
    name: "Emma Wilson",
    email: "emma.w@example.com",
    status: "Active",
    joinDate: "2023-05-15",
    lastActive: "2023-07-25",
  },
];

const statusStyles = {
  Active: "bg-teal-100 text-teal-700",
  Inactive: "bg-gray-100 text-gray-700",
  Suspended: "bg-red-100 text-red-700",
};

const Avatar = ({ name }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return (
    <div className="flex items-center justify-center w-10 h-10 text-sm font-semibold text-white rounded-full bg-gradient-to-br from-teal-400 to-teal-600">
      {initials}
    </div>
  );
};

/* Dropdown menu component */
const ActionDropdown = ({ user, onClose, onAction, menuRef }) => {
  const handleActionClick = (e, actionType) => {
    e.stopPropagation(); //  prevent dropdown from closing before action triggers
    onAction(user.id, actionType);
    onClose();
  };

  return (
    <div
      className="absolute right-0 z-10 w-48 mt-2 bg-teal-500 rounded-lg shadow-lg top-[50%]"
      onClick={(e) => e.stopPropagation()} //  prevent bubble
    >
      <ul className="py-1 text-sm text-white">
        <li
          onClick={(e) => handleActionClick(e, "Suspend")}
          className="px-4 py-2 cursor-pointer hover:bg-teal-600"
        >
          Suspend Account
        </li>
        <li
          onClick={(e) => handleActionClick(e, "Activate")}
          className="px-4 py-2 cursor-pointer hover:bg-teal-600"
        >
          Activate Account
        </li>
        <li
          onClick={(e) => handleActionClick(e, "Delete")}
          className="px-4 py-2 text-red-500 cursor-pointer hover:bg-teal-600"
        >
          Delete Account
        </li>
      </ul>
    </div>
  );
};

const UserManagement = ({ onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // user dropdown close
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //  Keep users in state (so we can update/delete them)
  const [userList, setUserList] = useState(fakeUsers);

  const usersPerPage = 5;
  const totalPages = Math.ceil(userList.length / usersPerPage);

  const users = userList.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const toggleDropdown = (id) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const closeDropdown = () => setOpenDropdownId(null);

  //  Handle status update and delete (static)
  const handleUserAction = (id, action) => {
    if (action === "Delete") {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e63946",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          setUserList((prevUsers) =>
            prevUsers.filter((user) => user.id !== id)
          );

          Swal.fire("Deleted!", "User has been removed.", "success");
        }
      });

      closeDropdown();
      return;
    }

    // ✅ Suspend / Activate
    setUserList((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                action === "Suspend"
                  ? "Suspended" // updated (not inactive)
                  : action === "Activate"
                  ? "Active"
                  : user.status,
            }
          : user
      )
    );

    closeDropdown();
  };

  return (
    <div className="flex-1 m-4 bg-[#FFFFFF] rounded-3xl p-8 overflow-y-auto hide-scrollbar inter">
      <div>
        {/* Header */}
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-[#363636]">Dashboard</h2>
          <p className="mt-3 text-xl font-normal basic-color inter">
            Welcome back, Greg!
          </p>
        </div>

        {/* User Management Card */}
        <div className="mb-3 overflow-hidden bg-white shadow-sm rounded-3xl">
          <div className="px-2 border-b border-gray-200">
            <h2 className="mb-2 text-2xl font-bold text-[#363636]">
              User Management
            </h2>
          </div>

          {/* Desktop Table */}
          <div className="hidden mt-2 md:block">
            <div className="overflow-y-auto max-h-96 thin-scrollbar rounded-xl">
              <table className="w-full rounded-xl">
                <thead className="sticky top-0 z-40 text-sm font-medium text-left text-white bg-[#16A8AD] rounded-t-xl">
                  <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Join Date</th>
                    <th className="px-6 py-4">Last Active</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="transition hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-center gap-3 md:flex-row">
                          <Avatar name={user.name} />
                          <div>
                            <p className="font-bold bold-color">{user.name}</p>
                            <p className="text-sm font-bold text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                            statusStyles[user.status]
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {user.joinDate}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {user.lastActive}
                      </td>
                      <td className="relative px-6 py-4 text-center">
                        <button
                          onClick={() => toggleDropdown(user.id)}
                          className="text-gray-500 transition hover:text-gray-700"
                        >
                          <MoreVertical size={20} />
                        </button>

                        {openDropdownId === user.id && (
                          <ActionDropdown
                            user={user}
                            onClose={closeDropdown}
                            onAction={handleUserAction}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile View */}
          <div className="p-4 space-y-4 md:hidden overflow-y-auto max-h-[420px]">
            {users.map((user) => (
              <div
                key={user.id}
                className="relative p-4 bg-white border border-gray-200 shadow-sm rounded-xl"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Avatar name={user.name} />
                  <div>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      statusStyles[user.status]
                    }`}
                  >
                    {user.status}
                  </span>
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(user.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <MoreVertical size={20} />
                    </button>

                    {openDropdownId === user.id && (
                      <ActionDropdown
                        user={user}
                        onClose={closeDropdown}
                        onAction={handleUserAction}
                        menuRef={menuRef}
                      />
                    )}
                  </div>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    Join Date:{" "}
                    <span className="font-medium">{user.joinDate}</span>
                  </p>
                  <p>
                    Last Active:{" "}
                    <span className="font-medium">{user.lastActive}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-200">
            <p className="text-sm text-gray-700">
              Showing {(currentPage - 1) * usersPerPage + 1} to{" "}
              {Math.min(currentPage * usersPerPage, userList.length)} of{" "}
              {userList.length} users
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center justify-center w-8 h-8 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40"
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`flex items-center justify-center w-8 h-8 text-sm font-medium rounded transition ${
                      currentPage === page
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
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
                className="flex items-center justify-center w-8 h-8 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
