import LoadingSpinner from '@/components/ui/LoadingSpinner';
import UseAuth from '@/Hooks/UseAuth';
import React from 'react';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = UseAuth();
    const location = useLocation();
    if (loading) {
        return <LoadingSpinner></LoadingSpinner>;
    }
    if (user) {
        return children;
    }
    return <Navigate to='/login' state={{from:location}} replace></Navigate>
};

export default PrivateRoute;