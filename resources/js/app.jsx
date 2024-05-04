import React from "react";
import ReactDOM from "react-dom/client";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

import Main from "./Main";
import router from "./router/router.jsx";

import "./index.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

//creating react query instace for the default setting
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000, // 1 minute
            cacheTime: 1 * 60 * 1000, // 5 minutes
            refetchOnWindowFocus: false,
            retry: 2,
        },
    },
});
//wrapping the react main comopnent with the used dependecies
ReactDOM.createRoot(document.getElementById("app")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ToastContainer position="top-right" autoClose={3000} />
            <RouterProvider router={router}>
                <PrimeReactProvider>
                    <Main />
                </PrimeReactProvider>
            </RouterProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
