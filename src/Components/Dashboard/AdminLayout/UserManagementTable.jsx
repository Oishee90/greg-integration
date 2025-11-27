/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import Swal from "sweetalert2";
import {
  useActivateUserMutation,
  useDeleteUserMutation,
  useGetAllUserQuery,
  useSuspendUserMutation,
} from "../../../Redux/feature/authapi";

const statusStyles = {
  Active: "bg-teal-100 text-teal-700",
  Inactive: "bg-gray-100 text-gray-700",
  Suspended: "bg-red-100 text-red-700",
};

const STATIC_SUSPEND_REASON = "Violation of policy"; // STATIC REASON

const Avatar = ({ name }) => {
  const initials = name
    ?.split(" ")
    ?.map((n) => n[0])
    ?.join("")
    ?.toUpperCase();

  return (
    <div className="flex items-center justify-center w-10 h-10 text-sm font-semibold text-white rounded-full bg-gradient-to-br from-teal-400 to-teal-600">
      {initials}
    </div>
  );
};

const ActionDropdown = ({ user, onClose, onAction }) => {
  const handleActionClick = (e, actionType) => {
    e.stopPropagation();
    onAction(user, actionType);
    onClose();
  };

  return (
    <div className="absolute right-0 z-10 w-48 mt-2 bg-teal-500 rounded-lg shadow-lg">
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

const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const menuRef = useRef(null);

  const {
    data: userData,
    isLoading,
    refetch: refetchUsers,
  } = useGetAllUserQuery();

  const [suspendUser] = useSuspendUserMutation();
  const [activateUser] = useActivateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) {
    return <p className="p-6 text-xl text-center">Loading Users...</p>;
  }

  const userList = userData?.data || [];

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

  // ==========================
  //  User ACTION HANDLER
  // ==========================
  const handleUserAction = async (user, action) => {
    if (action === "Suspend") {
      const confirmPopup = await Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to suspend this account?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Suspend",
        cancelButtonText: "Cancel",
      });

      if (!confirmPopup.isConfirmed) return;

      try {
        await suspendUser({
          user_id: user.id,
          reason: STATIC_SUSPEND_REASON,
        }).unwrap();

        Swal.fire("Success!", "User has been suspended.", "success");
        refetchUsers();
      } catch (err) {
        Swal.fire("Error!", "Failed to suspend user", "error");
      }
      return;
    }

    if (action === "Activate") {
      const confirmPopup = await Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to activate this account?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Activate",
        cancelButtonText: "Cancel",
      });

      if (!confirmPopup.isConfirmed) return;

      try {
        await activateUser({
          user_id: user.id,
          reason: STATIC_SUSPEND_REASON, // static reason
        }).unwrap();

        Swal.fire("Success!", "User has been activated.", "success");
        refetchUsers();
      } catch (err) {
        Swal.fire("Error!", "Failed to activate user", "error");
      }
      return;
    }

    if (action === "Delete") {
      const confirmPopup = await Swal.fire({
        title: "Are you sure?",
        text: "This action will permanently delete the user!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "Cancel",
      });

      if (!confirmPopup.isConfirmed) return;

      try {
        await deleteUser(user.id).unwrap();

        Swal.fire("Deleted!", "User has been deleted successfully.", "success");
        refetchUsers();
      } catch (err) {
        Swal.fire(
          "Error!",
          err?.data?.message || "Failed to delete user.",
          "error"
        );
      }
      return;
    }
  };

  return (
    <div className="flex-1 m-4 bg-[#FFFFFF] rounded-3xl p-8 overflow-y-auto inter">
      <div>
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-[#363636]">Dashboard</h2>
          <p className="mt-3 text-xl font-normal basic-color inter">
            Welcome back, Admin!
          </p>
        </div>

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
                    <tr key={user?.id} className="transition hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-center gap-3 md:flex-row">
                          <Avatar name={user?.full_name} />
                          <div>
                            <p className="font-bold bold-color">
                              {user?.full_name}
                            </p>
                            <p className="text-sm font-bold text-gray-500">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                            user?.admin_suspended
                              ? statusStyles["Suspended"]
                              : user?.is_active
                              ? statusStyles["Active"]
                              : statusStyles["Inactive"]
                          }`}
                        >
                          {user?.admin_suspended
                            ? "Suspended"
                            : user.is_active
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        {user?.date_joined}
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        {user?.last_active_readable}
                      </td>

                      <td className="relative px-6 py-4 text-center">
                        <button
                          onClick={() => toggleDropdown(user?.id)}
                          className="text-gray-500 transition hover:text-gray-700"
                        >
                          <MoreVertical size={20} />
                        </button>

                        {openDropdownId === user?.id && (
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
                        : "bg-white border"
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
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
