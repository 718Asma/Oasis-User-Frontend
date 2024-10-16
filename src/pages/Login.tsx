import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext"; // Import the AuthContext

import oasisBanner from '@/assets/oasisBanner.png';

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
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                console.log("Logging in with values:", values);
                const { data } = await axios.post(
                    "http://localhost:3000/auth/login",
                    values,
                    {
                        withCredentials: true, // Important for cookies (including refresh_token)
                    }
                );
                localStorage.setItem("user_id", data.user_id); // Store user in local storage
                localStorage.setItem("access_token", data.access_token); // Store access token in local storage
                setAccessToken(data.access_token); // Store access token in state
                setTimeout(() => {
                    navigate("/home");
                }, 100);
            } catch (error) {
                console.error("Login error:", error);
            }
        },
    });

    return (
        <div className="flex min-h-screen">
            <div className="w-full max-w-md p-8 space-y-6" style={{ marginTop: 'auto', marginBottom: 'auto' }}>
                <div className="space-y-2">
                    <h1 className="text-5xl font-bold">Log In</h1>
                    <p className="text-sm text-gray-500">Enter your email below to login to your account</p>
                </div>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="text"
                            placeholder="Email"
                            {...formik.getFieldProps("email")}
                            className={formik.touched.email && formik.errors.email ? "border-red-500" : ""}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="text-red-500 text-sm">{formik.errors.email}</div>
                        )}
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <a href="#" className="ml-auto text-sm underline">Forgot your password?</a>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            {...formik.getFieldProps("password")}
                            className={formik.touched.password && formik.errors.password ? "border-red-500" : ""}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-500 text-sm">{formik.errors.password}</div>
                        )}
                    </div>
                    <Button className="w-full" type="submit">Log In</Button>
                </form>
                <p className="text-sm text-center">
                    Don't have an account? <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Sign Up</a>
                </p>
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center bg-gray-100">
                <img src={oasisBanner} alt="Log In" className="h-full w-full" />
            </div>
        </div>
    );
}