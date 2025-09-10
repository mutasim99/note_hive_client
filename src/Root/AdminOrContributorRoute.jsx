import LoadingSpinner from '@/components/ui/LoadingSpinner';
import UseAuth from '@/Hooks/UseAuth';
import UseRole from '@/Hooks/UseRole';
import React from 'react';
import { Navigate, useLocation } from 'react-router';

const AdminOrContributorRoute = ({ children }) => {
    const { user, loading } = UseAuth();
    const [role, isLoading] = UseRole();
    const location = useLocation()
    if (loading || isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    if (!user) {
        return <Navigate to='/login'></Navigate>
    }
    if (role === 'admin' || role === 'contributor') {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default AdminOrContributorRoute;