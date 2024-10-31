import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

import { AuthContext } from "../auth/AuthContext";
import { signup } from "@/services/authService";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


import oasisBanner from '@/assets/oasisBanner.png';

const validationSchema = Yup.object({
	firstName: Yup.string()
		.min(3, "First name must be at least 3 characters")
		.max(100, "First name must be at most 100 characters")
		.required("First name is required"),
	lastName: Yup.string()
		.min(3, "Last name must be at least 3 characters")
		.max(100, "Last name must be at most 100 characters")
		.required("Last name is required"),
	email: Yup.string()
		.email("Invalid email address")
		.min(3, "Email must be at least 3 characters")
		.max(100, "Email must be at most 100 characters")
		.required("Email is required"),
	password: Yup.string()
		.min(8, "Password must be at least 8 characters")
		.max(100, "Password must be at most 100 characters")
		.required("Password is required"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password"), undefined], "Passwords must match")
		.required("Confirm password is required"),
});

export default function SignUp() {
    const { setAccessToken } = useContext(AuthContext); // Get the setter function from context
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		validationSchema,
		onSubmit: async (values) => {
			try {
				console.log("Signing in with values:", values);
                const { data } = await signup(values);
                console.log("Sign-up response:", data);

                localStorage.setItem("user_id", data.user_id);
                localStorage.setItem("access_token", data.access_token);
                setAccessToken(data.access_token);
                // localStorage.setItem("refresh_token", data.refresh_token); // Store refresh token in local storage
				navigate("/home");
            } catch (error) {
                console.error("Login error:", error);
            }
		},
	});

	return (
		<div className="flex min-h-screen bg-background dark:bg-dark-background">
			<div
				className="w-full max-w-md p-8 space-y-6"
				style={{ marginTop: "auto", marginBottom: "auto" }}
			>
				<div className="space-y-2">
				<h1 className="text-5xl font-bold">
					Sign Up
				</h1>
				<p className="text-sm text-gray-500">
					Enter your information to create an account
				</p>
				</div>
				<form onSubmit={formik.handleSubmit} className="space-y-4 dark:text-white">
				<div>
					<div>
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
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label htmlFor="firstName">First name</Label>
						<Input
							id="firstName"
							placeholder="First Name"
							{...formik.getFieldProps("firstName")}
							className={formik.touched.firstName && formik.errors.firstName ? "border-red-500" : ""}
						/>
						{formik.touched.firstName && formik.errors.firstName && (
							<div className="text-red-500 text-sm">{formik.errors.firstName}</div>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="lastName">Last name</Label>
						<Input
							id="lastName"
							placeholder="Last Name"
							{...formik.getFieldProps("lastName")}
							className={formik.touched.lastName && formik.errors.lastName ? "border-red-500" : ""}
						/>
						{formik.touched.lastName && formik.errors.lastName && (
							<div className="text-red-500 text-sm">{formik.errors.lastName}</div>
						)}
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
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
					<div className="space-y-2">
						<Label htmlFor="confirmPassword">Confirm Password</Label>
						<Input
							id="confirmPassword"
							type="password"
							{...formik.getFieldProps('confirmPassword')}
							className={formik.touched.confirmPassword && formik.errors.confirmPassword ? "border-red-500" : ""}
						/>
						{formik.touched.confirmPassword && formik.errors.confirmPassword && (
							<div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
						)}
					</div>
				</div>
				<Button className="w-full" type="submit">
					Create an account
				</Button>
				</form>
				<p className="text-sm text-center dark:text-gray-300">
					Already have an account?{" "}
					<a
						href="/login"
						className="font-medium text-indigo-600 hover:text-indigo-500"
					>
						Log in
					</a>
				</p>
			</div>
			<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center bg-gray-100">
				<img
				src={oasisBanner}
				alt="Sign up"
				className="h-full w-full"
				/>
			</div>
		</div>
	);
}