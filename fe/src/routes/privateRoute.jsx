import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { dataToken } from "../features/auth/authSlice";

export const PrivateRoute = ({ children }) => {
    const token = useSelector(dataToken);
    if (!token) {
        return <Navigate to="/login" />;
    }
    return children
};