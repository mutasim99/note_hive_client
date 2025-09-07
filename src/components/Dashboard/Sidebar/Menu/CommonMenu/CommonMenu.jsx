import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router';
import { BiDonateHeart } from "react-icons/bi";
import BecomeContributorModal from '@/components/Modal/BecomeContributorModal';
import UseAxiosSecure from '@/Hooks/UseAxiosSecure';
import UseAuth from '@/Hooks/UseAuth';
import { toast } from 'react-toastify';


const CommonMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = UseAuth()
    const axiosSecure = UseAxiosSecure();

    const closeModal = () => {
        return setIsOpen(false)
    }

    const handleUpdateStatus = async () => {
        try {
            const { data } = await axiosSecure.patch(`/user/${user?.email}`)
            console.log(data);
            toast.success('Successfully Applied to become a contributor')
        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message + '👊')
        } finally {
            closeModal();
        }
    }
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to='/dashboard/profile' className='flex items-center gap-2 cursor-pointer hover:bg-gray-700 p-1 rounded-lg'><CgProfile className='text-lg'></CgProfile> My Profile</Link>
                    </li>
                    <li>
                        <button
                            onClick={() => setIsOpen(true)}
                            className='flex items-center gap-2 cursor-pointer hover:bg-gray-700 p-1 rounded-lg'><BiDonateHeart className='text-lg'></BiDonateHeart> Become a contributor</button>
                    </li>
                </ul>
            </nav>
            <BecomeContributorModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                closeModal={closeModal}
                handleUpdateStatus={handleUpdateStatus}
            ></BecomeContributorModal>
        </div>
    );
};

export default CommonMenu;