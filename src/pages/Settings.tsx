import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";

import { Student } from "@/lib/types";
import { deleteUser, getProfile, updateAvatar } from "../services/userService";
import { logout, resendVerificationEmail } from "@/services/authService";

import { Button } from "@/components/ui/button";
import UpdatePasswordDialog from "@/components/functional/UpdatePasswordDialog";
import EditProfileDialog from "@/components/functional/EditProfileDialog";
import { FileInput } from "@/components/ui/FileInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    LogOut,
    Trash2,
    ShieldCheck,
    ChevronRight,
    ArrowLeft,
    User,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isPasswordOpen, setIsPasswordOpen] = useState(false);
    const [user, setUser] = useState<Student>();
    const { toast } = useToast();
    const fetchUser = async () => {
        try {
            const data = await getProfile();
            const profileImgUrl = data.profilePicture
                ? `http://localhost:3000/${data.profilePicture}`
                : undefined;

            data.profilePicture = profileImgUrl;
            console.log("Response:", data);
            setUser(data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [userId]);

    const handleLogout = async () => {
        try {
            const data = await logout();
            console.log("Response:", data);

            localStorage.removeItem("user_id");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");

            navigate("/login");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const data = await deleteUser();
            console.log("Response:", data);
            await handleLogout();
        } catch (error) {
            console.error("Error deleting account:", error);
        }
    };

    const handleVerify = async () => {
        if (user) {
            try {
                const response = await resendVerificationEmail(user.email);
                console.log("Response:", response);
                toast({
                    title: "Verification email sent",
                    description:
                        "Account verification email sent successfully!",
                    duration: 2000,
                    variant: "success",
                });
                fetchUser();
            } catch (error) {
                console.error("Error verifying account:", error);
            }
        }
    };

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0] || null;

        if (file != null) {
            try {
                const response = await updateAvatar(file);
                console.log("Response:", response.data);
                fetchUser();
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        } else {
            console.log("No file selected!");
        }
    };

    return (
        <div className="min-h-screen w-full bg-background dark:bg-dark-background">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <h1 className="text-5xl font-bold mb-8">Settings</h1>
                    <a
                        href="/home"
                        style={{
                            color: "#2b79c2",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <ArrowLeft style={{ color: "#2b79c2" }} />
                        &nbsp; Go Back to the Home Page
                    </a>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle>User Info</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center text-center relative">
                            <div className="relative">
                                {user?.profilePicture ? (
                                    <img
                                        src={user.profilePicture}
                                        alt={user.firstName}
                                        className="w-48 h-48 mb-2 rounded-full"
                                    />
                                ) : (
                                    <User className="w-48 h-48 mb-2 rounded-full" />
                                )}

                                <FileInput
                                    className="absolute top-0 right-0 w-12 h-12 z-10"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <h2 className="text-2xl font-semibold mb-2">
                                {user?.firstName} {user?.lastName}
                            </h2>
                            <p className="text-muted-foreground mb-1">
                                {user?.email}
                            </p>
                            <EditProfileDialog
                                isEditProfileOpen={isEditProfileOpen}
                                setIsEditProfileOpen={setIsEditProfileOpen}
                                user={user}
                            />
                        </CardContent>
                    </Card>
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Account Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <UpdatePasswordDialog
                                isPasswordOpen={isPasswordOpen}
                                setIsPasswordOpen={setIsPasswordOpen}
                            />
                            {!user?.isVerified && (
                                <Button
                                    variant="outline"
                                    className="w-full justify-between text-left dark:text-white"
                                    onClick={handleVerify}
                                >
                                    <span className="flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4" />
                                        Verify Account
                                    </span>
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            )}
                            <Dialog
                                open={isDeleteOpen}
                                onOpenChange={setIsDeleteOpen}
                            >
                                <DialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-between text-left text-destructive"
                                    >
                                        <span className="flex items-center gap-2">
                                            <Trash2 className="w-4 h-4" />
                                            Delete Account
                                        </span>
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>
                                            Delete Account
                                        </DialogTitle>
                                    </DialogHeader>
                                    <p className="text-muted-foreground">
                                        Are you sure you want to delete your
                                        account? This action cannot be undone.
                                    </p>
                                    <div className="flex justify-end gap-4 mt-4">
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                setIsDeleteOpen(false)
                                            }
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                handleDelete();
                                                setIsDeleteOpen(false);
                                            }}
                                            className="text-destructive"
                                        >
                                            Delete Account
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                            <Button
                                variant="outline"
                                onClick={handleLogout}
                                className="w-full justify-between text-left"
                            >
                                <span className="flex items-center gap-2">
                                    <LogOut className="w-4 h-4" />
                                    Log Out
                                </span>
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
