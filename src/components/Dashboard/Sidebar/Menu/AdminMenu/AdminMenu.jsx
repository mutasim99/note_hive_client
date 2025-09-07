import React from 'react';
import { Link } from 'react-router';
import { FaUsersCog } from "react-icons/fa";
import { CgProfile } from 'react-icons/cg';


const AdminMenu = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/dashboard/profile'
                        className='flex items-center gap-2 cursor-pointer hover:bg-gray-700 p-1 rounded-lg'
                    >
                        <CgProfile className='text-lg'></CgProfile> My Profile</Link>
                </li>
                <li>
                    <Link
                        to='/dashboard/manageUsers'
                        className='flex items-center gap-2 cursor-pointer hover:bg-gray-700 p-1 rounded-lg'
                    >
                        <FaUsersCog className='text-lg'></FaUsersCog> Mange Users</Link>
                </li>
            </ul>
        </nav>
    );
};

export default AdminMenu;