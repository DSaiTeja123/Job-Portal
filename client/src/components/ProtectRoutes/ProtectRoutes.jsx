import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectRoutes = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== "recruiter") {
      navigate("/");
    }

    if (!user) {
      return <Navigate to="/login" replace />;
    }
  }, []);
  return <>{children}</>;
};

export default ProtectRoutes;
