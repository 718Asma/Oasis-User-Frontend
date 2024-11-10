import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mirage } from "ldrs";

mirage.register();

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import axios from "axios";

type VerificationResponse = {
    success: boolean;
    message: string;
};

export default function VerifyEmail() {
    // Get `token` and `id` from the route parameters using `useParams`
    const { token, id } = useParams<{ token: string; id: string }>();

    const [message, setMessage] = useState<string>("");
    const [isVerified, setIsVerified] = useState<boolean | null>(null);

    const handleResendVerification = () => {
        console.log("Resend verification email");
    };

    useEffect(() => {
        // Make sure `token` and `id` are available before making the request
        const verifyEmail = async () => {
            if (token && id) {
                try {
                    const response = await axios.get<VerificationResponse>(
                        `http://localhost:3000/auth/verify-email/${id}/${token}`
                    );
                    const data = response.data;
                    setIsVerified(data.success);
                    setMessage(data.message);
                } catch (error) {
                    console.error("Verify email error:", error);
                    setIsVerified(false);
                    setMessage(
                        "An unexpected error occurred. Please try again."
                    );
                }
            }
        };

        verifyEmail();
    }, [token, id]);

    return (
        <div className="flex items-center justify-center h-screen">
            {isVerified === true ? (
                <Card className="text-center shadow-lg">
                    <CardHeader>
                        <div className="flex justify-center">
                            <CheckCircle className="h-16 w-16 text-green-500" />
                        </div>
                        <CardTitle className="text-2xl font-bold mt-4">
                            Account Verified Successfully
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Congratulations! Your account has been successfully
                            verified. You now have full access to all our
                            features.
                        </p>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <Button asChild>
                            <Link to="/dashboard">Go to Dashboard</Link>
                        </Button>
                    </CardFooter>
                </Card>
            ) : isVerified === false ? (
                <Card className="text-center shadow-lg">
                    <CardHeader>
                        <div className="flex justify-center">
                            <AlertTriangle className="h-16 w-16 text-red-500" />
                        </div>
                        <CardTitle className="text-2xl font-bold mt-4">
                            Verification Error
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            {message ||
                                "We're sorry, but we couldn't verify your account. This may be due to an expired or invalid verification link."}
                        </p>
                    </CardContent>
                    <CardFooter className="flex justify-center space-x-4">
                        <Button variant="outline" asChild>
                            <Link to={`mailto:scholarshipsoasis@gmail.com`}>
                                Contact Support
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link to="#" onClick={handleResendVerification}>
                                Resend Verification Email
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            ) : (
                <l-mirage size="60" speed="2.5" color="black"></l-mirage>
            )}
        </div>
    );
}
