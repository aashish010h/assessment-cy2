import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { useForm, Controller } from "react-hook-form";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import Axios from "../utils/Axios";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    //for the loading state of the login btn
    const [isSubmiting, setIsSubmiting] = useState(false);
    const navigate = useNavigate();
    //form defualt value
    const defaultValues = {
        email: "",
        password: "",
    };
    //react hook forms defualt fucntion for hadling the form
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ defaultValues });

    //function to show the error validation message
    const getFormErrorMessage = (name) => {
        return (
            errors[name] && (
                <small className="p-error">{errors[name].message}</small>
            )
        );
    };
    //api  call for th log in
    const onSubmit = (data) => {
        setIsSubmiting(true);
        Axios.post("auth/login", data)
            .then((res) => {
                //after login success showing toast msg , setting token in local storage and loading btn is turned off
                toast.success("Logged in successfully.");
                setIsSubmiting(false);
                console.log("res", res.data.data.authorization);
                localStorage.setItem(
                    "token",
                    res.data.data.authorization.token
                );
                navigate("/user/dashboard");
            })
            .catch((err) => {
                //for showing the toast msg if any error occurs
                setIsSubmiting(false);
                console.log("res", err);
                // toast.error(err.response.data.message);
            });
    };
    return (
        <div className="login-form">
            <div className="form-wrapper">
                <h2>Hello, Welcome</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Email</label>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Email is required.",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message:
                                        "Given email must be type of proper email.",
                                },
                            }}
                            render={({ field }) => (
                                <InputText
                                    id={field.email}
                                    autoFocus
                                    {...field}
                                />
                            )}
                        />
                        {getFormErrorMessage("email")}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: "Password field is required",
                            }}
                            render={({ field }) => (
                                <Password
                                    type="password"
                                    feedback={false}
                                    toggleMask
                                    id={field.password}
                                    {...field}
                                />
                            )}
                        />
                        {getFormErrorMessage("password")}
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                        <Button
                            type="submit"
                            loading={isSubmiting}
                            label="Login"
                        />
                        <NavLink to="/register" className="goto-register">
                            Register
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
