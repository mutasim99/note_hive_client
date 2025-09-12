import { BookOpenIcon, UploadIcon, UsersIcon } from 'lucide-react';
import React from 'react';

const HowItWorks = () => {
    return (
        <div className='py-16 md:py-24 sm:px-8 rounded-lg bg-gray-100 dark:bg-gray-700 mt-16 max-w-11/12 mx-auto'>
            <div className='flex flex-col items-center text-center'>
                <h2 className='text-3xl font-bold text-gray-800 dark:text-gray-300 mb-4'>How Note-Hive Works</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-xl mx-auto">
                    It's simple. Get the notes you need, or share your own with the community.
                </p>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12'>
                    <div className='flex flex-col items-center text-center'>
                        <div className='w-16 h-16 flex items-center justify-center text-indigo-600 bg-indigo-200 rounded-full mb-4'>
                            <BookOpenIcon className='h-8 w-8'></BookOpenIcon>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 mb-2">1. Explore</h3>
                        <p className="text-gray-600 dark:text-gray-400">Browse thousands of notes by subject, course, or topic.</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 flex items-center justify-center text-indigo-600 bg-indigo-200 rounded-full mb-4">
                            <UsersIcon className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 mb-2">2. Connect</h3>
                        <p className="text-gray-600 dark:text-gray-400">Join a growing community of students to share knowledge.</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 flex items-center justify-center text-indigo-600 bg-indigo-200 rounded-full mb-4">
                            <UploadIcon className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 mb-2">3. Contribute</h3>
                        <p className="text-gray-600 dark:text-gray-400">Upload your own notes and help others succeed.</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default HowItWorks;