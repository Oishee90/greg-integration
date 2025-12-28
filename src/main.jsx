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
import { Provider } from "react-redux";

import { PrivateRoute } from "./routes/PrivateRoute";
import store from "./Redux/store";
import PublicRoute from "./routes/PublicRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        {" "}
        <Login />
      </PublicRoute>
    ),
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
        element: (
          <PrivateRoute>
            <AdminDashboard></AdminDashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "/user-management",
        element: (
          <PrivateRoute>
            <UserManagement></UserManagement>
          </PrivateRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <PrivateRoute>
            <Settings></Settings>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
