import React from 'react';

const LatestUploadCard = ({ mat }) => {
    return (
        <div className='relative bg-white/10 dark:bg-gray-800/50 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]'>
            {/* Glow effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 blur-2xl opacity-90"></div>
            <div className='p-4'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>{mat.title || mat.subject}</h3>
                <p className='text-sm text-gray-600 dark:text-gray-300'>{mat.department} . {mat.semester}</p>
            </div>
            {/* Shoe pdf by iframe */}
            <div className='w-full h-64 md:h-80 bg-black/10'>
                <iframe
                    src={mat.driveUrl.replace('/view?usp=sharing', '/preview')}
                    className='w-full h-full border-0 rounded-b-2xl'
                    allowFullScreen
                    loading='lazy'
                ></iframe>
            </div>
            {/* Footer */}
            <div className='p-4 flex items-center justify-between'>
                <a
                    href={mat.driveUrl}
                    target='_black'
                    rel='noopener noreferrer'
                    className='px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-sm font-medium hover:opacity-90 transition'
                >
                    open Pdf
                </a>

            </div>
        </div>
    );
};

export default LatestUploadCard;