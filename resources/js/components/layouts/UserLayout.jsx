import React from "react";
import { Navigate, Outlet, NavLink } from "react-router-dom";
import Navbar from "../dashboard/Navbar";
const UserDashboard = () => {
    const token = localStorage.getItem("token");
    // if (token) {
    //     return <Navigate to="/" />;
    // }
    return (
        <div className="container">
            <Navbar />
            <Outlet />
        </div>
    );
};

export default UserDashboard;
