import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protected = ({ children }) => {
  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem("Authtoken");
    return !!token ;
  };

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (children) {
    return children;
  }

  return <Outlet />;
};

export default Protected;