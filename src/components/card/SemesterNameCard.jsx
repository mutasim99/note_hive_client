import React from 'react';
import { Link } from 'react-router';

const SemesterNameCard = ({ semester }) => {
    const { image, semester: semesterName } = semester || {}
    return (
        < Link
            to={`/home/departments/${semesterName}`}
            className='col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl  w-full max-w-xs '
        >
            <div className='flex flex-col gap-2  w-full bg-gradient-to-r from-green-400 via-green-500 to-green-700 rounded-lg'>
                <div className='aspect-square w-full relative shadow-xl overflow-hidden'>
                    <img
                        className='object-cover w-full h-full group-hover:scale-110 transition'
                        src={image} alt={semesterName} />
                </div>
                <div className='font-semibold text-lg text-center '>{semesterName}</div>
            </div>
        </Link >
    );
};

export default SemesterNameCard;