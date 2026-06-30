import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ allowedRoles = [] }) => {
    const location = useLocation();

    const { isLoggedIn, userData, isAuthLoading } = useSelector((state) => state.auth);

    if (isAuthLoading) {
        return null; // or FullPageSkeleton
    }

    if (!isLoggedIn) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(userData?.role?.toLowerCase())) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;
