import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core"; // Import MantineProvider
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

import Home from "./pages/Home.tsx";
import ErrorPage from "./error-page.tsx";
import ScholarshipPage from "./pages/Scholarship.tsx";
import SignUp from "./pages/SignUp.tsx";
import Login from "./pages/Login.tsx";
import SettingsPage from "./pages/Settings.tsx";
import PrivateRoute from "./auth/PrivateRoute.tsx";
import { AuthProvider } from "./auth/AuthContext.tsx";
import AboutUs from "./pages/AboutUs.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/home" />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/scholarship/:scholarshipId",
        element: <ScholarshipPage />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: "/settings/:userId",
        element: (
            <PrivateRoute>
                <SettingsPage />
            </PrivateRoute>
        ),
    },
    {
        path: "/about-us",
        element: <AboutUs />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <MantineProvider>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
            </MantineProvider>
        </ThemeProvider>
    </StrictMode>
);
