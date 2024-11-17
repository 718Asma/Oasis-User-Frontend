import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
    const { accessToken } = useContext(AuthContext);

    if (!accessToken) {
        return <Navigate to="/login" />;
    }

    return children;
}