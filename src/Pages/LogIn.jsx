import React from 'react';
import logInBg from '../components/Image/LoginImg/LoginBg.jpg'
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/nurui/button';
import UseAuth from '@/Hooks/UseAuth';
import { Link, useNavigate } from 'react-router';
import SocialLogin from '@/components/SocialLogin/SocialLogin';


const LogIn = () => {
    const { SignInUser } = UseAuth();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/home"
    const handleLogIn = async e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            await SignInUser(email, password)
        } catch (error) {
            console.log(error);
        } finally {
            navigate(from, { replace: true })
        }
    }
    return (
        <div
            className='h-screen w-screen flex items-center justify-center bg-cover bg-center'
            style={{
                backgroundImage: `url(${logInBg})`
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="w-full max-w-md"
            >
                <Card className="relative backdrop-blur-md bg-white/10 dark:bg-black/20 border border-purple-400/30 shadow-xl rounded-2xl">
                    <CardHeader>
                        <CardTitle className='text-center text-2xl font-bold text-gray-900 dark:text-white'>
                            LOGIN Now!!
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogIn} className='space-y-4'>
                            <div className="space-y-2">
                                <Label className="text-gray-900 dark:text-gray-200">
                                    Email
                                </Label>
                                <Input
                                    name='email'
                                    type='email'
                                    placeholder="Enter your Email address"
                                    className="rounded-full border border-purple-300/50 bg-white/50 dark:bg-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-gray-900 dark:text-gray-200">
                                    Password
                                </Label>
                                <Input
                                    name='password'
                                    type="password"
                                    placeholder="Enter your Password"
                                    className="rounded-full border border-purple-300/50 bg-white/50 dark:bg-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full rounded-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-semibold shadow-lg cursor-pointer"
                            >
                                Login
                            </Button>
                        </form>
                    </CardContent>
                    <hr className='mt-2' />
                    <SocialLogin></SocialLogin>
                    <hr className='mt-2' />
                    <p
                        type="button"
                        className="hover:underline text-purple-600 dark:text-purple-300 text-center"
                    >
                        New here? <Link to='/register' className='underline'>register</Link>
                    </p>
                </Card>
            </motion.div>

        </div>
    );
};

export default LogIn;