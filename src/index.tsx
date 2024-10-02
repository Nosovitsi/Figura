import React, { useState } from "react";
import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import AdminPanel from "./components/AdminPanel";
import Register from "./components/Register";
import Login from "./components/Login";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = createHashRouter([
    {
      path: "/",
      element: (
        isAuthenticated ? <App onAuthenticate={() => setIsAuthenticated(true)} /> : <Navigate to="/login" replace />
      ),
    },
    {
      path: "/admin",
      element: <AdminPanel />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login onLogin={() => setIsAuthenticated(true)} />,
    },
  ]);

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);









