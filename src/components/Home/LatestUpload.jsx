import UseAxiosPublic from '@/Hooks/UseAxiosPublic';
import React, { useEffect, useState } from 'react';
import LatestUploadCard from './LatestUploadCard';

const LatestUpload = () => {
    const axiosPublic = UseAxiosPublic();
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        axiosPublic.get('/latest-materials')
            .then(res => {
                setMaterials(res.data)
            })
    }, [axiosPublic])
    return (
        <div className='mt-12 md:mt-20 max-w-11/12 mx-auto'>
            <div className='text-center'>
                <h2 className='text-3xl md:text-4xl lg:text-5xl'>Latest Uploads</h2>
                <p className='mt-1.5 text-gray-600 dark:text-gray-300'>The newest notes added to the Note-Hive community</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8'>
                {
                    materials.map((mat) => <LatestUploadCard
                        key={mat._id}
                        mat={mat}
                    ></LatestUploadCard>)
                }
            </div>
        </div>
    );
};

export default LatestUpload;