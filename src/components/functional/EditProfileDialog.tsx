import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";

import { Student } from "@/lib/types";
import { updateProfile } from "@/services/userService";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DateInput } from "@/components/ui/date-input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const validationSchema = Yup.object({
    firstName: Yup.string()
        .min(3, "First name must be at least 3 characters")
        .max(100, "First name must be at most 100 characters")
        .required("First name is required"),
    lastName: Yup.string()
        .min(3, "Last name must be at least 3 characters")
        .max(100, "Last name must be at most 100 characters")
        .required("Last name is required"),
    dateOfBirth: Yup.date().notRequired(),
    gender: Yup.string().notRequired(),
    country: Yup.string().notRequired(),
    university: Yup.string().notRequired(),
    courseOfStudy: Yup.string().notRequired(),
    yearOfStudy: Yup.string().notRequired(),
    levelOfStudy: Yup.string().notRequired(),
    fieldOfStudy: Yup.string().notRequired(),
});

interface EditProfileDialogProps {
    isEditProfileOpen: boolean;
    setIsEditProfileOpen: (isOpen: boolean) => void;
    user: Student | undefined;
}

export default function EditProfileDialog({
    isEditProfileOpen,
    setIsEditProfileOpen,
    user,
}: EditProfileDialogProps) {
    const { toast } = useToast();
    const formik = useFormik({
        initialValues: {
            firstName: user?.firstName || undefined,
            lastName: user?.lastName || undefined,
            dateOfBirth: user?.dateOfBirth
                ? new Date(user.dateOfBirth)
                : undefined,
            gender: user?.gender || undefined,
            country: user?.country || undefined,
            university: user?.university || undefined,
            courseOfStudy: user?.courseOfStudy || undefined,
            levelOfStudy: user?.levelOfStudy || undefined,
            fieldOfStudy: user?.fieldOfStudy || undefined,
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const updatedValues = {
                ...values,
                dateOfBirth:
                    values.dateOfBirth instanceof Date
                        ? values.dateOfBirth.toISOString().split("T")[0]
                        : values.dateOfBirth || undefined,
            };

            console.log("Updated values:", updatedValues);

            try {
                // filter out undefined values
                const filteredValues = Object.fromEntries(
                    Object.entries(updatedValues).filter(
                        ([value]) => value !== undefined
                    )
                );
                console.log("Filtered values:", filteredValues);
                const data = await updateProfile(filteredValues);
                toast({
                    title: "Profile updated",
                    description: "Profile updated successfully!",
                    duration: 2000,
                    variant: "success",
                });
                console.log("Response:", data);
                user = data;
                setIsEditProfileOpen(false);
            } catch (error) {
                console.error("Error updating profile:", error);
                toast({
                    title: "Error updating profile",
                    description:
                        "An error occurred while updating your profile",
                    duration: 2000,
                    variant: "destructive",
                });
            }
        },
    });

    return (
        <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] dark:text-white">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First name</Label>
                            <Input
                                id="firstName"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.firstName &&
                            formik.errors.firstName ? (
                                <p className="text-red-500">
                                    {formik.errors.firstName}
                                </p>
                            ) : null}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last name</Label>
                            <Input
                                id="lastName"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.lastName &&
                            formik.errors.lastName ? (
                                <p className="text-red-500">
                                    {formik.errors.lastName}
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of birth</Label>
                        <DateInput
                            id="dateOfBirth"
                            type="date"
                            value={
                                formik.values.dateOfBirth
                                    ? new Date(formik.values.dateOfBirth)
                                    : null
                            }
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select
                            value={formik.values.gender}
                            onValueChange={(value) =>
                                formik.setFieldValue("gender", value)
                            }
                        >
                            <SelectTrigger id="gender">
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="university">University</Label>
                        <Input
                            id="university"
                            value={formik.values.university}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                            id="country"
                            value={formik.values.country}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="courseOfStudy">
                                Course of study
                            </Label>
                            <Input
                                id="courseOfStudy"
                                value={formik.values.courseOfStudy}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="fieldOfStudy">Field of study</Label>
                            <Input
                                id="fieldOfStudy"
                                value={formik.values.fieldOfStudy}
                                onChange={formik.handleChange}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="levelOfStudy">Level of study</Label>
                        <Select
                            value={formik.values.levelOfStudy}
                            onValueChange={(value) =>
                                formik.setFieldValue("levelOfStudy", value)
                            }
                        >
                            <SelectTrigger id="levelOfStudy">
                                <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="undergraduate">
                                    Undergraduate
                                </SelectItem>
                                <SelectItem value="graduate">
                                    Graduate
                                </SelectItem>
                                <SelectItem value="postgraduate">
                                    Postgraduate
                                </SelectItem>
                                <SelectItem value="other">other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" className="w-full dark:text-white">
                        Save Changes
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
