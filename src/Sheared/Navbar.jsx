import ThemeChange from '@/components/Theme/ThemeChange';
import UseAuth from '@/Hooks/UseAuth';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { IoMenu } from "react-icons/io5";
import { MdMenuOpen } from "react-icons/md";
import logoImg from '../components/Image/LogoImg/logo.png'



const Navbar = () => {
    const { user, signOutUser } = UseAuth();
    const [isOpen, setIsOpen] = useState(false);
    const handleSignOut = () => {
        signOutUser();
    }
    return (
        <div className='fixed top-0 left-0 w-full z-10 flex justify-between items-center px-6 py-4  shadow'>
            <Link to='/' className='cursor-pointer flex items-center gap-2'>
                <img 
                className='h-14 w-16 aspect-square object-cover'
                src={logoImg} alt="" />
                <h4 className='text-center text-2xl font-medium'>Note Hive</h4>
            </Link>

            {/* Desktop menu */}
            <div className='hidden md:flex'>
                <nav className='space-x-4'>
                    <NavLink to='/home'>Home</NavLink>
                    <NavLink to='/home/materials'>Materials</NavLink>
                    <NavLink to='/dashboard'>Dashboard</NavLink>
                </nav>
            </div>

            {/* Right screen */}
            <div className='flex items-center gap-2'>
                <div className='hidden md:flex'>
                    {
                        user && user?.email ? <div className='flex items-center gap-2'>
                            <img
                                className='h-10 w-10 object-cover rounded-full border-2 border-purple-500 animate-pulse hover:animate-none'
                                src={user?.photoURL} alt="" />
                            <button onClick={handleSignOut} className='px-3 py-2 rounded-lg bg-red-500 text-white font-semibold shadow-md hover:bg-red-600 hover:shadow-xl cursor-pointer hover:animate-none transition-all duration-300'>LogOut</button>
                        </div> : <div className='flex items-center gap-2'>
                            <Link to='/login' className='px-3 py-2 rounded-xl bg-gradient-to-r from-[#B54C4E] to-[#F2C94C] text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300'>Login</Link>
                            <Link to='/register' className='px-3 py-2 rounded-xl border-2 border-[#B54C4E] text-[#B54C4E] font-semibold hover:bg-[#B54C4E] hover:text-white hover:shadow-md transition-all duration-300'>Register</Link>
                        </div>
                    }
                </div>
                <ThemeChange></ThemeChange>

                {/* Menu Icon */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className='md:hidden ml-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
                >
                    {isOpen ? <IoMenu></IoMenu> : <MdMenuOpen></MdMenuOpen>}
                </button>

                {/* Mobile menu */}

                {isOpen && (
                    <div className="absolute top-full left-0 w-full bg-white dark:bg-black shadow-md flex flex-col md:hidden px-4 py-2 space-y-2">
                        <NavLink to="/home" className="block py-2 hover:text-purple-500" onClick={() => setIsOpen(false)}>Home</NavLink>
                        <NavLink to="/home/materials" className="block py-2 hover:text-purple-500" onClick={() => setIsOpen(false)}>Materials</NavLink>
                        <NavLink to="/home/addMaterials" className="block py-2 hover:text-purple-500" onClick={() => setIsOpen(false)}>Add Materials</NavLink>
                        <NavLink to="/home/dashboard" className="block py-2 hover:text-purple-500" onClick={() => setIsOpen(false)}>Dashboard</NavLink>
                        {user && user?.email ? (
                            <button
                                onClick={handleSignOut}
                                className="w-full px-3 py-2 rounded-lg bg-red-500 text-white font-semibold shadow-md hover:bg-red-600 hover:shadow-xl transition-all duration-300"
                            >
                                LogOut
                            </button>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <Link
                                    to="/login"
                                    className="w-full px-3 py-2 rounded-xl bg-gradient-to-r from-[#B54C4E] to-[#F2C94C] text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;