import UseAuth from '@/Hooks/UseAuth';
import UseAxiosSecure from '@/Hooks/UseAxiosSecure';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UsersPdfs = () => {
    const { sub } = useParams();
    const { user } = UseAuth();
    const [fullUser, setFullUser] = useState();
    const [pdfs, setPdfs] = useState([]);
    const axiosSecure = UseAxiosSecure();

    useEffect(() => {
        const getUser = async () => {
            const res = await axiosSecure.get(`/api/user/${user?.email}`);
            setFullUser(res.data)
        }
        getUser();
    }, [axiosSecure, user]);

    useEffect(() => {
        const fetchPdfs = async () => {
            const res = await axiosSecure.get(`/pdfs/${sub}/${fullUser._id}`);
            setPdfs(res.data)
        }
        fetchPdfs();
    }, [axiosSecure, fullUser, sub])
    console.log(pdfs, sub);
    return (
        <div className='bg-gradient-to-r from-green-50 via-emerald-100 to-green-200 dark:from-gray-800 dark:via-gray-900 dark:to-black
            transition-colors duration-1000 h-screen'>
            <div className='pt-5 px-4 max-w-11/12 mx-auto'>
                <h2 className='text-3xl font-bold mb-6 text-center'>{sub}</h2>
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

export default UsersPdfs;