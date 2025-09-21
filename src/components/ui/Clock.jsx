import UseAuth from '@/Hooks/UseAuth';
import { UserPen } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { FiEdit } from "react-icons/fi";
import UpdateProfileModal from '../Modal/UpdateProfileModal';

const Clock = () => {
    const [time, setTime] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const { user } = UseAuth();


    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 50)
        return () => {
            clearInterval(interval);
        }
    }, []);

    const seconds = time.getSeconds();
    const minutes = time.getMinutes() + seconds / 60;
    const hours = (time.getHours() % 12) + minutes / 60;

    const closeModal = () => {
        return setIsOpen(false)
    }
    return (
        <div
            className='relative h-28 w-28 md:h-52 md:w-52 rounded-full border-8 border-purple-500 bg-gradient-to-tr from-purple-700 to-pink-500 shadow-lg'
            style={{
                backgroundImage: `url(${user?.photoURL})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {/* hours hand */}
            <div className='absolute bg-white h-8 md:h-16 w-1.5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full origin-bottom shadow-[0_0_8px_rgba(0,0,0,0.6)]'
                style={{ transform: `rotate(${hours * 30}deg)` }}
            >

            </div>

            {/* minutes hand */}
            <div className='absolute bg-white h-10 md:h-20 w-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full origin-bottom shadow-[0_0_8px_rgba(0,0,0,0.6)]'
                style={{ transform: `rotate(${minutes * 6}deg)` }}
            >

            </div>
            {/* seconds hand */}
            <div className='absolute bg-red-500 h-12 md:h-24 w-0.5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full origin-bottom shadow-[0_0_8px_rgba(0,0,0,0.6)]'
                style={{ transform: `rotate(${seconds * 6}deg)` }}
            >

            </div>
            <div className='absolute bottom-2 right-3 md:bottom-5 md:right-6' title='edit profile'>
                <button className='cursor-pointer' onClick={() => setIsOpen(true)}>
                    <UserPen color='#4ca8d6' size={28} st></UserPen>
                </button>
            </div>
            <UpdateProfileModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                closeModal={closeModal}
            ></UpdateProfileModal>
        </div>
    );
};

export default Clock;