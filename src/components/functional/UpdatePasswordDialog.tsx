import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Lock, ChevronRight } from "lucide-react";
import axios from "axios";

const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password must be at most 100 characters")
        .required("Password is required")
        .notOneOf(
            [Yup.ref("oldPassword")],
            "New password must be different from current password"
        ),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
        .required("Confirm password is required"),
});

interface UpdatePasswordDialogProps {
    isPasswordOpen: boolean;
    setIsPasswordOpen: (isOpen: boolean) => void;
}

export default function UpdatePasswordDialog({
    isPasswordOpen,
    setIsPasswordOpen,
}: UpdatePasswordDialogProps) {
    const access_token = localStorage.getItem("access_token");
    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log("Password update values:", values);
            const updatedValues = {
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
            };
            console.log("Updated values:", updatedValues);
            try {
                const response = await axios.post(
                    `http://localhost:3000/users/change-password`,
                    updatedValues,
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    }
                );
                console.log("Response:", response);
                setIsPasswordOpen(false);
            } catch (error) {
                console.error("Error updating profile:", error);
            }
        },
    });

    return (
        <Dialog open={isPasswordOpen} onOpenChange={setIsPasswordOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full justify-between text-left"
                >
                    <span className="flex items-center gap-2 dark:text-white">
                        <Lock className="w-4 h-4" />
                        Update Password
                    </span>
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] dark:text-white">
                <DialogHeader>
                    <DialogTitle>Update Password</DialogTitle>
                </DialogHeader>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="oldPassword">Current Password</Label>
                        <Input
                            id="oldPassword"
                            type="password"
                            value={formik.values.oldPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.oldPassword &&
                        formik.errors.oldPassword ? (
                            <p className="text-red-500">
                                {formik.errors.oldPassword}
                            </p>
                        ) : null}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                            id="newPassword"
                            type="password"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.newPassword &&
                        formik.errors.newPassword ? (
                            <p className="text-red-500">
                                {formik.errors.newPassword}
                            </p>
                        ) : null}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                            Confirm Password
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
            </DialogContent>
        </Dialog>
    );
}
