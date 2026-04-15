const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector(isAuthentication);
    const isInitialized = useSelector((state) => state.auth.isInitialized);

    if (!isInitialized) {
        return <div>Loading...</div>; // atau spinner component
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};