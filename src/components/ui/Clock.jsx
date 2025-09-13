import UseAuth from '@/Hooks/UseAuth';
import React, { useEffect, useState } from 'react';

const Clock = () => {
    const [time, setTime] = useState(new Date());
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
        </div>
    );
};

export default Clock;