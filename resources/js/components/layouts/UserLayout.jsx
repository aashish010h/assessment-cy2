import React from "react";
import { Navigate, Outlet, NavLink } from "react-router-dom";
import Navbar from "../dashboard/Navbar";
const UserDashboard = () => {
    const token = localStorage.getItem("token");
    //redirect to homepage if there no token
    if (!token) {
        return <Navigate to="/" />;
    }
    return (
        // navbar remain constant when router changes , only the changes of routers occurs in outlet
        <div className="container">
            <Navbar />
            <Outlet />
        </div>
    );
};

export default UserDashboard;
