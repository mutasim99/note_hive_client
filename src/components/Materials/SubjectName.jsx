import UseAxiosSecure from '@/Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import SubjectNameCard from '../card/SubjectNameCard';

const SubjectName = () => {
    const { semester, department } = useParams();
    const axiosSecure = UseAxiosSecure();
    const { data: SubjectName = [] } = useQuery({
        queryKey: ['subjectName'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/subjects/${semester}/${department}`)
            return data;
        }
    })

    return (
        <div className='max-w-11/12 mx-auto pt-24'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8'>
                {SubjectName.map((sub, index) => <SubjectNameCard
                    key={index}
                    sub={sub}
                ></SubjectNameCard>)}
            </div>
        </div>
    );
};

export default SubjectName;