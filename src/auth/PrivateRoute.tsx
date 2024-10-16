import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
    const { accessToken } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (accessToken !== null) {
            setLoading(false);
        }
    }, [accessToken]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!accessToken) {
        return <Navigate to="/login" />;
    }

    return children;
}