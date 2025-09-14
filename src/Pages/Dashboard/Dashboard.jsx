import React from 'react';
import { Link, Outlet } from 'react-router';
import logoImg from '../../components/Image/LogoImg/logo-removebg.png'
import { CgProfile } from 'react-icons/cg';
import Sidebar from '@/components/Dashboard/Sidebar/Sidebar';

const Dashboard = () => {
    return (
        <div className='grid grid-cols-12'>
            <div className='col-span-4 md:col-span-2 h-full bg-green-200 dark:bg-purple-500'>
                <div className='mt-1 items-center justify-center'>
                    <Link to='/home' className='flex items-center gap-2 cursor-pointer'>
                        <img
                            className='h-14 w-14 object-cover aspect-square'
                            src={logoImg} alt="" />
                        <h4 className='md:text-xl font-semibold'>NOTE-HIVE</h4>
                    </Link>
                </div>
                <div className='mt-8 flex items-center ml-4'>
                    <Sidebar></Sidebar>
                </div>
            </div>
            <div className='col-span-8 md:col-span-10'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;