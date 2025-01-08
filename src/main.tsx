import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Services from "./pages/Services";
import Orders from "./pages/Orders";
import WorkerDashboard from "./pages/WorkerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/home",
    element: <Index />,
  },
  {
    path: "/profile/:userId",
    element: <Profile />,
  },
  {
    path: "/messages",
    element: <Messages />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/worker",
    element: <WorkerDashboard />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  </React.StrictMode>
);