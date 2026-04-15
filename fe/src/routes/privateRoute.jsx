import { useSelector } from "react-redux";
import { isAuthentication } from "../features/auth/authSlice";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector(isAuthentication);
    const isInitialized = useSelector((state) => state.auth.isInitialized);

    useEffect(() => {
        if (isInitialized && !isAuthenticated) {
            window.location.replace("https://koplink.net/login.php");
        }
    }, [isInitialized, isAuthenticated]);

    if (!isInitialized) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return children;
};