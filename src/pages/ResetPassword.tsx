import { Navigate, useNavigate, useParams } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

import { resetPassword } from "@/services/authService";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const validationSchema = Yup.object({
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password must be at most 100 characters")
        .required("Password is required")
        .notOneOf(
            [Yup.ref("oldPassword")],
            "New password must be different from current password"
        ),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), undefined], "Passwords must match")
        .required("Confirm password is required"),
});
const ResetPassword = () => {
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>();
    const { token } = useParams<{ token: string }>();
    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log("Password update values:", values);
            
            const { password, confirmPassword } = values;
            console.log("Updated values:", { password, confirmPassword });
    
            if (userId && token) {
                try {
                    const response = await resetPassword(
                        userId,
                        token,
                        password,
                        confirmPassword
                    );
                    console.log("Response:", response);
                    navigate("/login");
                } catch (error) {
                    console.error("Error updating profile:", error);
                }
            }
        },
    });

    return (
        <div className="min-h-screen w-full bg-background dark:bg-dark-background">
            <form
                onSubmit={formik.handleSubmit}
                className="space-y-4"
                style={{
                    border: "3px solid black",
                    borderRadius: "5vh",
                    padding: "5vh",
                    width: "80vh",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "5rem",
                }}
            >
                <div className="space-y-2">
                    <Label htmlFor="password">
                        <strong>New Password</strong>
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <p className="text-red-500">{formik.errors.password}</p>
                    ) : null}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                        <strong>Confirm Password</strong>
                    </Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword ? (
                        <p className="text-red-500">
                            {formik.errors.confirmPassword}
                        </p>
                    ) : null}
                </div>
                <Button type="submit" className="w-full dark:text-white">
                    Update Password
                </Button>
            </form>
        </div>
    );
};

export default ResetPassword;
