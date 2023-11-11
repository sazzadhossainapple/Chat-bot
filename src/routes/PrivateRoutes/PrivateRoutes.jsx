import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext/UserContext';
import Loading from '../../components/Loading/Loading';

function PrivateRoutes({ children }) {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Loading></Loading>;
    }

    if (user) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
}

export default PrivateRoutes;
