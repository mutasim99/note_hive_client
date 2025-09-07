import React from 'react';
import CommonMenu from './Menu/CommonMenu/CommonMenu';
import AdminMenu from './Menu/AdminMenu/AdminMenu';

const Sidebar = () => {
    return (
        <div>
            <CommonMenu></CommonMenu>
            <AdminMenu></AdminMenu>
        </div>
    );
};

export default Sidebar;