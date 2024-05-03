import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink>Home</NavLink>
                </li>
            </ul>
            <NavLink>Logout</NavLink>
        </nav>
    );
};

export default Navbar;
