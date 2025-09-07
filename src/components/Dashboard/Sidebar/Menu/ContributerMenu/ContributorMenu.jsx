import React from 'react';
import { Link } from 'react-router';

const ContributorMenu = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/dashboard/addMaterials'
                        className='flex items-center gap-2 cursor-pointer hover:bg-gray-700 p-1 rounded-lg'
                    >
                        Add Materials</Link>
                </li>
            </ul>
        </nav>
    );
};

export default ContributorMenu;