import { createBrowserRouter, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import UserDashboard from "../components/layouts/UserLayout";
import Register from "../pages/Register";

//creating path and asigning the respective componenet for routing using react router
const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/user",
        element: <UserDashboard />,
        children: [
            {
                path: "dashboard",
                element: <Home />,
            },
        ],
    },
]);

export default router;
