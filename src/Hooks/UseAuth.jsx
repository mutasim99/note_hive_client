import { AuthContext } from '@/Provider/AuthProvider';
import React, { useContext } from 'react';

const UseAuth = () => {
    const auth = useContext(AuthContext)
    return auth;
};

export default UseAuth;