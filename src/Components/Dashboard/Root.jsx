import AdminDashboard from "./AdminLayout/AdminDashboard";

import AdminSidebar from "./Sidebar/AdminSidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
const Root = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#16a8ad] z-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Root;
