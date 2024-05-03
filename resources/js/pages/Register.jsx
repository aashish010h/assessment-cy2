import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { useForm, Controller } from "react-hook-form";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import Axios from "../utils/Axios";

const Register = () => {
    const [isSubmiting, setIsSubmiting] = useState(false);
    const defaultValues = {
        email: "",
        password: "",
        name: "",
        password_confirmation: "",
    };
    const {
        control,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm({ defaultValues });
    const password = watch("password", "");
    const getFormErrorMessage = (name) => {
        return (
            errors[name] && (
                <small className="p-error">{errors[name].message}</small>
            )
        );
    };
    const onSubmit = (data) => {
        setIsSubmiting(true);
        Axios.post("login", data)
            .then((res) => {
                setIsSubmiting(false);
            })
            .catch((err) => {
                setIsSubmiting(false);
                console.log("err on login form", err);
            });
    };
    return (
        <div className="login-form">
            <div className="form-wrapper">
                <h2>Hello, Please fill the form for registration.</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>name</label>
                        <Controller
                            name="name"
                            control={control}
                            rules={{
                                required: "Full Name is required.",
                            }}
                            render={({ field }) => (
                                <InputText
                                    id={field.name}
                                    autoFocus
                                    {...field}
                                />
                            )}
                        />
                        {getFormErrorMessage("name")}
                    </div>
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
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <Controller
                            name="password_confirmation"
                            control={control}
                            rules={{
                                required: "Please confirm your password.",

                                validate: (value) =>
                                    value === password ||
                                    "Confirmation password didnot match with the password.",
                            }}
                            render={({ field }) => (
                                <Password
                                    id={field.password_confirmation}
                                    {...field}
                                    feedback={false}
                                    toggleMask
                                    maxLength={50}
                                />
                            )}
                        />
                        {getFormErrorMessage("password_confirmation")}
                    </div>
                    <div>
                        <Button
                            type="submit"
                            loading={isSubmiting}
                            label="Register"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
