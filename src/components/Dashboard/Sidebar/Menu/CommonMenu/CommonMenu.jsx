import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router';

const CommonMenu = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/dashboard/profile' className='flex items-center gap-2'><CgProfile></CgProfile> My Profile</Link>
                </li>
            </ul>
        </nav>
    );
};

export default CommonMenu;