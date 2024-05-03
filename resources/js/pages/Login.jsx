import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { useForm, Controller } from "react-hook-form";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import Axios from "../utils/Axios";

const Login = () => {
    const [isSubmiting, setIsSubmiting] = useState(false);
    const defaultValues = {
        email: "",
        password: "",
    };
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ defaultValues });

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
                    <div>
                        <Button
                            type="submit"
                            loading={isSubmiting}
                            label="Login"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
