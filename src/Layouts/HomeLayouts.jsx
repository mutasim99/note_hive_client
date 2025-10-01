import Navbar from '@/Sheared/Navbar';
import React from 'react';
import { Outlet } from 'react-router';
import Headroom from 'react-headroom'

const HomeLayouts = () => {
    return (
        <div>

            <Headroom className='bg-neutral-50/10'>
                <Navbar></Navbar>
            </Headroom>
            <div className='min-h-[calc(100vh-68px)]'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default HomeLayouts;