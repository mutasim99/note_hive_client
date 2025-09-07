import LoadingSpinner from '@/components/ui/LoadingSpinner';
import UseAuth from '@/Hooks/UseAuth';
import React from 'react';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = UseAuth();
    if (loading) {
        return <LoadingSpinner></LoadingSpinner>;
    }
    if (user) {
        return children;
    }
    return <Navigate to='/login'></Navigate>
};

export default PrivateRoute;