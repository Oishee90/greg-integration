import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./Components/Pages/Login";
import Forgot from "./Components/Pages/Forgot";

import "./index.css";
import AdminDashboard from "./Components/Dashboard/AdminLayout/AdminDashboard";
import Root from "./Components/Dashboard/Root";
import Verification from "./Components/Pages/Verification";
import Setnew from "./Components/Pages/Setnew";

import UserManagement from "./Components/Dashboard/AdminLayout/UserManagementTable";
import Settings from "./Components/Dashboard/AdminLayout/Settings/Settings";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot",
    element: <Forgot />,
  },
  {
    path: "/verification",
    element: <Verification></Verification>,
  },
  {
    path: "/setNew",
    element: <Setnew></Setnew>,
  },
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <AdminDashboard></AdminDashboard>,
      },
      {
        path: "/user-management",
        element: <UserManagement></UserManagement>,
      },
      {
        path: "/settings",
        element: <Settings></Settings>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
