import axios from "axios";
import router from "../router/router";

//importing the api url for calling the api
const url = import.meta.env.VITE_API_URL;
//create the instance of the axios so that we dont to add the header for every api call
const Axios = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
    },
});

//using interceptor to put the accestoken for api header
Axios.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    //for consoling the the error for every api call
    function (error) {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);

//interceptor for handling unauthicated login try to logout
Axios.interceptors.response.use(
    function (response) {
        return response;
    },
    //if the unauthenticaed error comes from the backend code for loggin out the user front the frontend as well
    function (error) {
        if (error.response && error.response.status === 401) {
            console.log("Unauthorized request. Redirecting to login...");
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);

export default Axios;
