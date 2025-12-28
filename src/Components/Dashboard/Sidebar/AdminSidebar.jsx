import { Users, UserCheck, Settings, BarChart3, Menu } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BiSolidMessage } from "react-icons/bi";
import { HiMiniUsers } from "react-icons/hi2";
import { IoSettingsSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../../Redux/feature/authSlice";
import { persistor } from "../../../Redux/store";
const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
 const dispatch = useDispatch();
  const isActiveDashboard = location.pathname === "/";
  const isActiveUserManagement = location.pathname === "/user-management";
  const isActiveSettings = location.pathname === "/settings";
  const handleLogout = () => {
    // Clear user data from localStorage
  dispatch(userLoggedOut ());
    persistor.purge();
    navigate("/login");
  }
  return (
    <aside className="flex flex-col items-center  gap-4 px-2 py-6 text-white bg-[#16a8ad] no-scrollbar">
      <NavLink to="/" className="flex items-center justify-between mt-9">
        {" "}
        <button
          className={`flex items-center justify-center px-2 py-2 transition rounded-lg hover:bg-teal-600 ${
            isActiveDashboard ? "till text-white " : "text-white"
          }`}
        >
          <BiSolidMessage size={24} />
        </button>
      </NavLink>
      <NavLink
        to="/user-management"
        className="flex items-center justify-between mt-3"
      >
        {" "}
        <button
          className={`flex items-center justify-center px-2 py-2 transition rounded-lg hover:bg-teal-600 ${
            isActiveUserManagement ? "till text-white " : "text-white"
          }`}
        >
          {" "}
          <HiMiniUsers size={24} />
        </button>
      </NavLink>
      <NavLink
        to="/settings"
        className="flex items-center justify-between mt-3"
      >
        {" "}
        <button
          className={`flex items-center justify-center px-2 py-2 transition rounded-lg hover:bg-teal-600 ${
            isActiveSettings ? "till text-white " : "text-white"
          }`}
        >
          {" "}
          <IoSettingsSharp size={24} />
        </button>
      </NavLink>
      <NavLink
     onClick={handleLogout}
        className="flex items-center justify-center w-10 h-10 mt-auto transition rounded-lg hover:bg-teal-600"
      >
        {" "}
        <button>
          <FiLogOut size={20} />
        </button>
      </NavLink>
    </aside>
  );
};
export default AdminSidebar;
