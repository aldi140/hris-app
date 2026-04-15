import { useSelector } from "react-redux";
import { isAuthentication } from "../features/auth/authSlice";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector(isAuthentication);
    const isInitialized = useSelector((state) => state.auth.isInitialized);

    if (!isInitialized) {
        return <div>Loading...</div>; // atau spinner component
    }

    return isAuthenticated ? children : <Navigate to="https://koplink.net/login.php" replace />;
};