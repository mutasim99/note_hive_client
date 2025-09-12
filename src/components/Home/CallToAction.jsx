import React, { useState } from 'react';
import NoteGenerateModal from '../Modal/NoteGenerateModal';
import { Link } from 'react-router';

const CallToAction = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className='py-16 md:py-24 sm:px-8 rounded-lg bg-indigo-600 dark:bg-gray-700 my-16 max-w-11/12 mx-auto text-center'>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Note-Hive Community</h2>
            <p className="text-lg  mb-8 opacity-80 max-w-2xl mx-auto">
                Your class notes can help another student ace their exams. Upload your notes today and become a contributor.
            </p>
            <div className='flex items-center justify-center gap-6'>
                <Link
                    to='/dashboard/profile'
                    className="px-8 py-4 bg-white hover:bg-gray-100 text-indigo-600 font-bold rounded-full shadow-xl transition duration-300 transform hover:scale-105 cursor-pointer">
                    Join us
                </Link>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="px-8 py-4 bg-white hover:bg-gray-100 text-indigo-600 font-bold rounded-full shadow-xl transition duration-300 transform hover:scale-105 cursor-pointer">
                    Generate A Note
                </button>
            </div>
            <NoteGenerateModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            ></NoteGenerateModal>
        </div>
    );
};

export default CallToAction;