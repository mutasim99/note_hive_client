import UseAxiosSecure from '@/Hooks/UseAxiosSecure';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import DepartmentCard from '../card/DepartmentCard';

const DepartmentName = () => {
    const { semester } = useParams();
    const axiosSecure = UseAxiosSecure();
    const [departmentName, setDepartmentName] = useState([]);

    useEffect(() => {
        axiosSecure.get(`/departments/${semester}`)
            .then(res => {
                setDepartmentName(res.data)
            })
    }, [axiosSecure, semester])

    return (
        <div className='pt-24 flex items-center justify-center gap-16'>
            {departmentName?.map((dept, index) => <DepartmentCard
                key={index}
                dept={dept}
                semester={semester}
            ></DepartmentCard>)}
        </div>
    );
};

export default DepartmentName;