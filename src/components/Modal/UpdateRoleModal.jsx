import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

const UpdateRoleModal = ({ isOpen, setIsOpen, closeModal, selectUser, handleUpdateRole }) => {
    const [selectedRole, setSelectedRole] = useState(selectUser?.role || "user");

    useEffect(() => {
        setSelectedRole(selectUser?.role || "user");
    }, [selectUser]);
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className='bg-gray-800 text-white'>
                <DialogHeader>
                    <DialogTitle>Update role: <span className='text-purple-500'>{selectUser?.name}</span></DialogTitle>
                </DialogHeader>
                <div className='space-y-3'>
                    <p><strong>Email:</strong>{selectUser?.email}</p>
                    <p><strong>Role:</strong>{selectUser?.role}</p>
                </div>
                <hr className='mt-4' />
                <select
                    defaultValue={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className='w-full p-2 rounded bg-gray-700 text-white'
                >
                    <option value="admin">Admin</option>
                    <option value="contributor">Contributor</option>
                    <option value="user">User</option>
                </select>
                <hr className='mt-4' />

                <div className='flex justify-between items-center p-4'>
                    <button
                        onClick={() => handleUpdateRole(selectedRole)}
                        className='py-2 px-3 bg-green-400 hover:bg-green-600 rounded-lg cursor-pointer'>Update</button>
                    <button
                        onClick={closeModal}
                        className='py-2 px-3 bg-rose-400 hover:bg-red-600 rounded-lg cursor-pointer'>Cancel</button>
                </div>

            </DialogContent>

        </Dialog>
    );
};

export default UpdateRoleModal;