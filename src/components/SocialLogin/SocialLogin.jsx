import UseAuth from '@/Hooks/UseAuth';
import UseAxiosPublic from '@/Hooks/UseAxiosPublic';
import React from 'react';
import {  useNavigate } from 'react-router';

const SocialLogin = () => {
    const { signInWithGoogle } = UseAuth();
    const axiosPublic = UseAxiosPublic();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/home'
    const handleGoogleLogin = async () => {
        try {
            const data = await signInWithGoogle()
            const userInfo = {
                name: data.user.displayName,
                email: data.user.email,
                photo: data.user.photoURL
            }
            
            await axiosPublic.post('/users', userInfo)
        } catch (error) {
            console.log(error.message);
        } finally {
            navigate(from, { replace: true })
        }
    };

    const handleGitHubLogin = () => {
        console.log('GitHub login clicked');

    };
    return (
        <div className='flex flex-col  items-center justify-center text-gray-200'>
            <div className="flex items-center justify-center gap-4 px-4">
                {/* Google Login Button */}
                <button
                    onClick={handleGoogleLogin}
                    className="group flex flex-1 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 px-6 py-3 text-sm font-semibold text-gray-100 shadow-sm transition-all duration-300 hover:bg-gray-700 hover:border-blue-500 hover:text-white cursor-pointer"
                >
                    {/* Google Icon (Colorful) */}
                    <svg
                        className="mr-3 h-5 w-5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M21.352 11.196c.097.525.145 1.05.145 1.575a9.664 9.664 0 0 1-9.5 9.684c-5.32 0-9.67-4.358-9.67-9.684 0-5.326 4.35-9.684 9.67-9.684 2.872 0 4.88 1.157 6.326 2.593l-2.078 2.072c-1.258-1.168-2.905-1.9-4.248-1.9-3.41 0-6.177 2.77-6.177 6.183 0 3.414 2.767 6.183 6.177 6.183 3.63 0 5.253-2.476 5.424-3.793h-5.424v-2.884h8.847z"
                            fill="#4285f4"
                        />
                        <path
                            d="M12.247 21.352c-2.484 0-4.665-.79-6.32-2.124l2.08-2.077c1.39 1.15 2.943 1.83 4.24 1.83 3.41 0 5.86-2.5 5.86-5.87h-5.86c0-3.414-2.76-6.183-6.17-6.183-1.64 0-3.155.67-4.32 1.83l-2.08-2.077c1.65-1.5 3.75-2.25 5.92-2.25 5.43 0 9.8 4.358 9.8 9.684s-4.37 9.684-9.8 9.684z"
                            fill="#f4c20d"
                        />
                        <path
                            d="M3.753 11.268l-2.078-2.072c-.51 1.05-1.18 2.3-1.67 3.67h3.748c.49-.66 1.13-1.2 1.86-1.6z"
                            fill="#34a853"
                        />
                        <path
                            d="M21.247 11.268c-.49-.66-1.13-1.2-1.86-1.6l-2.08 2.077c1.39 1.15 2.943 1.83 4.24 1.83 3.41 0 5.86-2.5 5.86-5.87h-5.86c0-3.414-2.76-6.183-6.17-6.183-1.64 0-3.155.67-4.32 1.83l-2.08-2.077c1.65-1.5 3.75-2.25 5.92-2.25 5.43 0 9.8 4.358 9.8 9.684s-4.37 9.684-9.8 9.684z"
                            fill="#ea4335"
                        />
                    </svg>
                    Continue with Google
                </button>

                {/* GitHub Login Button */}
                <button
                    onClick={handleGitHubLogin}
                    className="group flex flex-1 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 px-6 py-3 text-sm font-semibold text-gray-100 shadow-sm transition-all duration-300 hover:bg-gray-700 hover:border-purple-500 hover:text-white cursor-pointer"
                >
                    {/* GitHub Icon (White) */}
                    <svg
                        className="mr-3 h-5 w-5"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="white"
                            fillRule="evenodd"
                            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2-.01.21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z"
                        />
                    </svg>
                    Continue with GitHub
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;