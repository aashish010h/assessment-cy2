import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Axios from "../../utils/Axios";
import { toast } from "react-toastify";

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        Axios.get("auth/logout")
            .then((res) => {
                toast.success("Logged out successfully.");
                localStorage.removeItem("token");
                navigate("/");
            })
            .catch((err) => {
                toast.error("Error");
            });
    };
    return (
        <nav>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to="dashboard">Home</NavLink>
                </li>
            </ul>
            <NavLink onClick={handleLogout}>Logout</NavLink>
        </nav>
    );
};

export default Navbar;
