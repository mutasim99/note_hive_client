import React from 'react';
import UseAuth from './UseAuth';
import UseAxiosSecure from './UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UseRole = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const { data: role = "" , isLoading} = useQuery({
        queryKey: ['role', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user/role/${user?.email}`)
            return data?.role
        }
    })
    return [role, isLoading]
};

export default UseRole;