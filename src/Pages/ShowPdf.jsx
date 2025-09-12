import UseAxiosSecure from '@/Hooks/UseAxiosSecure';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

const ShowPdf = () => {
    const { semester, department, subject } = useParams();
    const [pdfs, setPdfs] = useState([]);
    const axiosSecure = UseAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/pdfs/${semester}/${department}/${subject}`)
            .then(res => {
                setPdfs(res.data)
            })

    }, [axiosSecure, semester, department, subject])
    return (
        <div className='bg-gradient-to-r from-green-50 via-emerald-100 to-green-200 dark:from-gray-800 dark:via-gray-900 dark:to-black
            transition-colors duration-1000 h-screen'>
            <div className='pt-24 px-4 max-w-11/12 mx-auto'>
                <h2 className='text-3xl font-bold mb-6 text-center'>{subject}</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 md:mt-10'>
                    {pdfs?.map(file => (
                        <div key={file._id} className='bg-gray-200 dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden transition-transform transform hover:scale-105'>

                            {/* PDF Header */}
                            <div className='p-4 border-b border-green-500 dark:border-gray-700 flex justify-between items-center'>
                                <h3 className='text-lg font-semibold'>{file.title || file.subject}</h3>
                                <a
                                    href={file.driveUrl}  // direct Google Drive link
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-200'
                                    title="Open PDF"
                                >
                                    Open
                                </a>
                            </div>

                            {/* PDF Preview */}
                            <iframe
                                src={file.driveUrl.replace('/view?usp=sharing', '/preview')} // use driveUrl
                                width="100%"
                                height="300px"
                                className='border-t border-gray-200 dark:border-gray-700'
                                title={file.subject}
                            ></iframe>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShowPdf;