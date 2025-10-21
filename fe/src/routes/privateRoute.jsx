import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../features/auth/authSlice";

export const PrivateRoute = ({ children }) => {
    const auth = useSelector(isAuthenticated);
    console.log(auth);
    if (!auth) {
        return <Navigate to="/login" />;
    }
    return children
};