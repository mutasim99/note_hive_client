import { auth } from '@/Firebase/firebase.config';
import UseAxiosPublic from '@/Hooks/UseAxiosPublic';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const axiosPublic = UseAxiosPublic();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const CreateUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const SignInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const UpdateUser = (updateInfo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, updateInfo);
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth)
    }

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        CreateUser,
        UpdateUser,
        SignInUser,
        signOutUser

    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if (currentUser) {
                const userInfo = { email: currentUser.email }
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        const token = res.data.token;
                        if (token) {
                            localStorage.setItem('access-token', token)
                        }
                        setLoading(false)
                    })

            } else {
                localStorage.removeItem('access-token')
            }

            setLoading(false);
        })
        return () => {
            return unsubscribe();
        }
    }, [axiosPublic])
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;