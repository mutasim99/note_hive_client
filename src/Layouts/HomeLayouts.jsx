import Navbar from '@/Sheared/Navbar';
import React from 'react';
import { Outlet } from 'react-router';

const HomeLayouts = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div  className='min-h-[calc(100vh-68px)]'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default HomeLayouts;