import LoadingSpinner from '@/components/ui/LoadingSpinner';
import UseAuth from '@/Hooks/UseAuth';
import UseRole from '@/Hooks/UseRole';
import React from 'react';
import { useNavigate } from 'react-router';

const AdminRoute = ({ children }) => {
    const { user, loading } = UseAuth()
    const [role, isLoading] = UseRole();
    const navigate = useNavigate();
    if (loading || isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (user && role === 'admin') {
        return children
    }

    return navigate('/login')
};

export default AdminRoute;