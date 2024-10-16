import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RadioGroup } from "@/components/ui/radiogroup";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import { Student } from "@/lib/types";

const validationSchema = Yup.object({
    firstName: Yup.string()
        .min(3, "First name must be at least 3 characters")
        .max(100, "First name must be at most 100 characters")
        .required("First name is required"),
    lastName: Yup.string()
        .min(3, "Last name must be at least 3 characters")
        .max(100, "Last name must be at most 100 characters")
        .required("Last name is required"),
	dateOfBirth: Yup.date(),
		// .required("Date of birth is required"),
    gender: Yup.string(),
		// .required("Gender is required"),
	country: Yup.string(),
		// .required("Country is required"),
    university: Yup.string(),
		// .required("University is required"),
	courseOfStudy: Yup.string(),
		// .required("Course of study is required"),
    yearOfStudy: Yup.string(),
		// .required("Year of study is required"),
	levelOfStudy: Yup.string(),
		// .required("Level of study is required"),
    fieldOfStudy: Yup.string()
		// .required("Field of study is required"),
});

interface UpdatePasswordDialogProps {
    isEditProfileOpen: boolean;
    setIsEditProfileOpen: (isOpen: boolean) => void;
    user: Student | undefined;
}

export default function EditProfileDialog({ isEditProfileOpen, setIsEditProfileOpen, user }: UpdatePasswordDialogProps) {
    const access_token = localStorage.getItem("access_token");
	const formik = useFormik({
        initialValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            dateOfBirth: user?.dateOfBirth || "",
            gender: user?.gender || "",
			country: user?.country || "",
            university: user?.university || "",
            courseOfStudy: user?.courseOfStudy || "",
			levelOfStudy: user?.levelOfStudy || "",
            fieldOfStudy: user?.fieldOfStudy || "",
        },
		validationSchema,
        enableReinitialize: true,
		onSubmit: async (values) => {
            const updatedValues = {
                firstName: values.firstName,
                lastName: values.lastName,
                dateOfBirth: values.dateOfBirth,
                gender: values.gender,
				country: values.country,
                university: values.university,
                courseOfStudy: values.courseOfStudy,
				levelOfStudy: values.levelOfStudy,
                fieldOfStudy: values.fieldOfStudy,
            };

			console.log("Updated values:", updatedValues);

			try {
				const response = await axios.post(`http://localhost:3000/users/update-profile`,
                    updatedValues,
                    {
                        headers: {
                            'Authorization': `Bearer ${access_token}`,
                        },
                    }
                );
				console.log("Response:", response);
				user = response.data;
				setIsEditProfileOpen(false);
			} catch (error) {
				console.error("Error updating profile:", error);
			}
		},
	});

  return (
    <Dialog
        open={isEditProfileOpen}
        onOpenChange={setIsEditProfileOpen}
    >
        <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
                Edit Profile
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
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
                        {formik.touched.firstName && formik.errors.firstName ? (
                            <p className="text-red-500">{formik.errors.firstName}</p>
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
                        {formik.touched.lastName && formik.errors.lastName ? (
                            <p className="text-red-500">{formik.errors.lastName}</p>
                        ) : null}
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of birth</Label>
                    <Input
                        id="dateOfBirth"
                        type="date"
                        value={formik.values.dateOfBirth}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select onValueChange={(value) => formik.setFieldValue("gender", value)}>
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
                        <Label htmlFor="courseOfStudy">Course of study</Label>
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
                    <Select onValueChange={(value) => formik.setFieldValue("levelOfStudy", value)}>
                        <SelectTrigger id="levelOfStudy">
                            <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="undergraduate">Undergraduate</SelectItem>
                            <SelectItem value="graduate">Graduate</SelectItem>
                            <SelectItem value="postgraduate">Postgraduate</SelectItem>
                            <SelectItem value="other">other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button type="submit" className="w-full">
                    Save Changes
                </Button>
            </form>
        </DialogContent>
    </Dialog>
  );
}