import React from 'react';
import { Link } from 'react-router';
import { FaUsersCog } from "react-icons/fa";


const AdminMenu = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link 
                    to='/dashboard/manageUsers'
                    className='flex items-center gap-2'
                    ><FaUsersCog className='text-lg'></FaUsersCog> Mange Users</Link>
                </li>
            </ul>
        </nav>
    );
};

export default AdminMenu;