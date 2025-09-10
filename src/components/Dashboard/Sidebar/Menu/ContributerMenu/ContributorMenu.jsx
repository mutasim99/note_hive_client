import React from 'react';
import { Link } from 'react-router';
import { BiDonateHeart } from "react-icons/bi";
import { CgProfile } from 'react-icons/cg';


const ContributorMenu = () => {
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
                    <Link to='/dashboard/addMaterials'
                        className='flex items-center gap-2 cursor-pointer hover:bg-gray-700 p-1 rounded-lg'
                    >
                        <BiDonateHeart className='text-lg'></BiDonateHeart> Add Materials</Link>
                </li>
            </ul>
        </nav>
    );
};

export default ContributorMenu;