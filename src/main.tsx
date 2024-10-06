import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from '@mantine/core'; // Import MantineProvider
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "./pages/Home.tsx";
import ErrorPage from "./error-page.tsx";
import Scholarship from "./pages/Scholarship.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/dashboard" />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/scholarship/:scholarshipId",
        element: <Scholarship />,
    }
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <MantineProvider>
                <RouterProvider router={router} />
            </MantineProvider>
        </ThemeProvider>
    </StrictMode>
);
