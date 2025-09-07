import React from 'react';
import CommonMenu from './Menu/CommonMenu/CommonMenu';
import AdminMenu from './Menu/AdminMenu/AdminMenu';
import UseRole from '@/Hooks/UseRole';
import ContributorMenu from './Menu/ContributerMenu/ContributorMenu';

const Sidebar = () => {
    const [role] = UseRole();
    return (
        <div>
            {role === 'user' && <CommonMenu></CommonMenu>}
            {role === 'admin' && <AdminMenu></AdminMenu>}
            {role === 'contributor' && <ContributorMenu></ContributorMenu>}
        </div>
    );
};

export default Sidebar;