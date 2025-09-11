import UseAxiosSecure from '@/Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import SemesterNameCard from '../card/SemesterNameCard';

const Semester = () => {
    const axiosSecure = UseAxiosSecure();
    const { data: semesters = [] } = useQuery({
        queryKey: ['semester'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/semesters')
            return data
        }
    })

    return (
        <div className='pt-24 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 max-w-11/12 mx-auto'>
            {
                semesters.map(semester => <SemesterNameCard
                    key={semester.semester}
                    semester={semester}
                ></SemesterNameCard>)
            }
        </div>
    );
};

export default Semester;