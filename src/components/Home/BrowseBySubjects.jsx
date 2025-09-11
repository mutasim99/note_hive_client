import UseAxiosSecure from '@/Hooks/UseAxiosSecure';
import React, { useEffect, useState } from 'react';
import Marquee from '../nurui/Marquee';
import { BookAIcon } from 'lucide-react';
import { FaBookOpen } from 'react-icons/fa';
import { Link } from 'react-router';

const BrowseBySubjects = () => {
    const [subjects, setSubjects] = useState([]);
    const axiosSecure = UseAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/allSubject')
            .then(res => {
                const data = res.data;
                const allSubjects = data.flatMap(item => item.subjects)
                const shuffled = allSubjects.sort(() => .5 - Math.random());
                const randomSubjects = shuffled.slice(0, 10);

                setSubjects(randomSubjects)
            })
    }, [axiosSecure])
    return (
        <div className='mt-8 p-12 md:p-20 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
                dark:from-gray-900 dark:via-gray-800 dark:to-gray-900  rounded-2xl shadow-xl transition-all duration-700 ease-in-out'>
            <div>
                <h2 className='text-3xl md:text-4xl md:font-semibold text-center'>
                    Browse By subject
                </h2>
                <p className='mt-2 text-gray-700 dark:text-gray-300 text-center'>Find what you need, organized by academic discipline.</p>
            </div>
            <div className='mt-4'>
                <Marquee
                    pauseOnHover={true}
                    speed={50}
                    repeat={4}
                >
                    {subjects.map((subject, i) => (
                        <Link
                            to='/home/materials'
                            key={i}
                            className='relative bg-white/10 backdrop-blur-md border border-white/20 dark:border-gray-700/40 rounded-2xl shadow-lg p-6 mx-4 flex flex-col items-center justify-center transition-transform duration-500 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]'>
                            <div className='relative w-16 h-16 flex items-center justify-center 
                          text-yellow-400 bg-indigo-900/40 rounded-full shadow-inner mb-4'>
                                <FaBookOpen className='text-yellow-400 text-2xl'></FaBookOpen>
                            </div>
                            <h3 className="text-lg font-bold text-white dark:text-gray-200 text-center tracking-wide">{subject}</h3>
                        </Link>
                    ))}
                </Marquee>
            </div>
        </div>
    );
};

export default BrowseBySubjects;