import axios from "axios";
import apiClient from "./apiClient";

// Sign up
export const signup = async (values: { firstName: string, lastName: string, email: string; password: string, confirmPassword:string }) => {
    try {
        const { data } = await apiClient.post("/auth/signup", values, {
            withCredentials: true, // Important for cookies (including refresh_token)
        });
        return data;
    } catch (error) {
        console.error("Error signing up:", error);
        throw error;
    }
};

// Log in
export const login = async (credentials: {
    email: string;
    password: string;
}) => {
    try {
        const { data } = await apiClient.post("/auth/login", credentials, {
            withCredentials: true, // Important for cookies (including refresh_token)
        });
        return { success: true, data };
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.message || "An error occurred.";
            console.error('Error:', errorMessage);
            return { success: false, error: errorMessage };
        }
        return { success: false, error: "An unknown error occurred." };
    }
};


// Verify email
export const verifyEmail = async (id: string, token: string) => {
    try {
        const response = await apiClient.get(
            `/auth/verify-email/${id}/${token}`
        );
        return response.data;
    } catch (error) {
        console.error("Error verifying email:", error);
        throw error;
    }
};

// Resend verification email
export const resendVerificationEmail = async (email: string) => {
    try {
        const response = await apiClient.post(
            "/auth/resend-verification-email",
            { email }
        );
        return response.data;
    } catch (error) {
        console.error("Error resending verification email:", error);
        throw error;
    }
};

// Verify token
export const verifyToken = async () => {
    try {
        const response = await apiClient.get("/auth/verify-token");
        return response.data;
    } catch (error) {
        console.error("Error verifying token:", error);
        throw error;
    }
};

// Forgot password
export const forgotPassword = async (email: string) => {
    try {
        const response = await apiClient.post("/auth/forgot-password", {
            email,
        });
        return response.data;
    } catch (error) {
        console.error("Error with forgot password:", error);
        throw error;
    }
};

// Reset password
export const resetPassword = async (
    id: string,
    token: string,
    password: string,
    confirmPassword: string
) => {
    try {
        const response = await apiClient.post(
            `/auth/reset-password/${id}/${token}`,
            { password, confirmPassword }
        );
        return response.data;
    } catch (error) {
        console.error("Error resetting password:", error);
        throw error;
    }
};

// Log out
export const logout = async () => {
    try {
        const response = await apiClient.get("/auth/logout");
        return response.data;
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
};

// Refresh token
export const refreshToken = async () => {
    try {
        const response = await apiClient.get("/auth/refresh-token");
        return response.data;
    } catch (error) {
        console.error("Error refreshing token:", error);
        throw error;
    }
};
