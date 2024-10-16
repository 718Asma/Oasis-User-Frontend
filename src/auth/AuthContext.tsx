import React, { createContext, useState, useEffect } from "react";

// Define the context
export const AuthContext = createContext<{
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
}>({
    accessToken: null,
    setAccessToken: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("access_token");
        if (storedToken) {
            setAccessToken(storedToken);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};