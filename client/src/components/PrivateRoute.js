import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavBar from "./NavBar";
export default function PrivateRoute({ children }) {
  const auth = useAuth();
 return auth.loading ? <NavBar />  : auth.user ? children : <Navigate to="/" />;
  //return auth.user ? children : <Navigate to="/" />;
}
