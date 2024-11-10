import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

import { AuthContext } from "../auth/AuthContext";
import { forgotPassword, login } from "@/services/authService";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateNotifications } from "@/services/userService";
import { useToast } from "@/hooks/use-toast";

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .min(3, "Email must be at least 3 characters")
        .max(100, "Email must be at most 100 characters")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password must be at most 100 characters")
        .required("Password is required"),
});

export default function Login() {
    const { setAccessToken } = useContext(AuthContext); // Get the setter function from context
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await login(values);
                console.log("Login response:", response);

                if (response.success) {
                    localStorage.setItem("user_id", response.data.user_id); // Store user in local storage
                    localStorage.setItem(
                        "access_token",
                        response.data.access_token
                    ); // Store access token in local storage
                    setAccessToken(response.data.access_token); // Store access token in state
                    await updateNotifications(); // Get notifications
                    navigate("/home");
                } else {
                    console.error("Login error:", response.error);
                    setError(response.error);
                }
            } catch (error) {
                console.error("Login error:", error);
            }
        },
    });

    const handleForgotPassword = async (email: string) => {
        console.log("Email :", email);
        // check if email is empty string
        if (email === "") {
            toast({
                title: "Error",
                description:
                    "Please enter your email address to reset your password",
                duration: 2000,
                variant: "destructive",
            });
            return;
        }
        try {
            const data = await forgotPassword(email);
            console.log("Forgot password response:", data);

            if (data) {
                toast({
                    title: "Success",
                    description: data.message,
                    duration: 2000,
                    variant: "success",
                });
            } else {
                toast({
                    title: "Error",
                    description:
                        "Failed to send reset email. Please try again.",
                    duration: 2000,
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Forgot password error:", error);
            toast({
                title: "Error",
                description: "Failed to send reset email. Please try again.",
                duration: 2000,
                variant: "destructive",
            });
        }
    };

    return (
        <div className="flex min-h-screen bg-background dark:bg-dark-background">
            <div
                className="w-full max-w-md p-8 space-y-6"
                style={{ marginTop: "auto", marginBottom: "auto" }}
            >
                <div className="space-y-2">
                    <h1 className="text-5xl font-bold">Log In</h1>
                    <p className="text-sm text-gray-500">
                        Enter your email below to login to your account
                    </p>
                </div>
                <form
                    onSubmit={formik.handleSubmit}
                    className="space-y-4 dark:text-white"
                >
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="text"
                            placeholder="Email"
                            {...formik.getFieldProps("email")}
                            className={
                                formik.touched.email && formik.errors.email
                                    ? "border-red-500"
                                    : ""
                            }
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="text-red-500 text-sm">
                                {formik.errors.email}
                            </div>
                        )}
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <a
                                onClick={() =>
                                    handleForgotPassword(formik.values.email)
                                }
                                className="ml-auto text-sm underline"
                            >
                                Forgot your password?
                            </a>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            {...formik.getFieldProps("password")}
                            className={
                                formik.touched.password &&
                                formik.errors.password
                                    ? "border-red-500"
                                    : ""
                            }
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-500 text-sm">
                                {formik.errors.password}
                            </div>
                        )}
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}
                    <Button className="w-full" type="submit">
                        Log In
                    </Button>
                </form>
                <p className="text-sm text-center dark:text-gray-300">
                    Don&apos;t have an account?{" "}
                    <a
                        href="/signup"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Sign Up
                    </a>
                </p>
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center bg-gray-100">
                <img
                    src="src\\assets\\oasisBanner.png"
                    alt="Log In"
                    className="h-full w-full"
                />
            </div>
        </div>
    );
}
