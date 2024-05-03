import React from "react";
import ReactDOM from "react-dom/client";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { RouterProvider } from "react-router-dom";

import Main from "./Main";
import router from "./router/router.jsx";

import "./index.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

ReactDOM.createRoot(document.getElementById("app")).render(
    <React.StrictMode>
        <RouterProvider router={router}>
            <PrimeReactProvider>
                <Main />
            </PrimeReactProvider>
        </RouterProvider>
    </React.StrictMode>
);
