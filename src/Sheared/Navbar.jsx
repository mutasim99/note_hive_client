import ThemeChange from '@/components/Theme/ThemeChange';
import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
    return (
        <div className='fixed top-0 left-0 w-full z-10 flex justify-between items-center px-6 py-4  shadow'>
            <div>
                <h4 className='text-center text-2xl font-medium'>Note Hive</h4>
            </div>
            <div>
                <nav className='space-x-4'>
                    <NavLink to='/home'>Home</NavLink>
                    <NavLink to='/home/materials'>Materials</NavLink>
                    <NavLink to='/home/addMaterials'>Add Materials</NavLink>
                    <NavLink to='/home/dashboard'>Dashboard</NavLink>
                </nav>
            </div>
            <div>
                <ThemeChange></ThemeChange>
            </div>
        </div>
    );
};

export default Navbar;