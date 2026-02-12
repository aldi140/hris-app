import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthentication } from "../features/auth/authSlice";

export const PrivateRoute = ({ children }) => {
    const auth = useSelector(isAuthentication);

    if (!auth) {
        return <Navigate to="/login" replace />;
    }

    // support:
    // 1. children (Private + Layout)
    // 2. Outlet (Private tanpa Layout)
    return children ? children : <Outlet />;
};
