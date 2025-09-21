import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import UseAxiosSecure from '@/Hooks/UseAxiosSecure'
import UseAuth from '@/Hooks/UseAuth';
import { Label } from '../ui/label';
import { toast } from 'react-toastify';
import { Loader } from 'lucide-react';

export default function UpdateProfileModal({ closeModal, setIsOpen, isOpen }) {
    const { user } = UseAuth()
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const axiosSecure = UseAxiosSecure();

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axiosSecure.get(`/api/user/${user?.email}`);
            const data = setCurrentUser(res.data);
            return data;
        }
        fetchUser()
    }, [axiosSecure, user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const institution = form.institution.value;
        const department = form.department.value;
        const semester = form.semester.value;
        try {
            setLoading(true);
            const res = await axiosSecure.patch(`/api/update/${currentUser?.email}`, {
                institution,
                department,
                semester
            })
            toast.success('successfully updated please refresh your page')
        } catch (error) {
            console.log(error.message);
        } finally {
            closeModal();
            setLoading(false)
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className='bg-gray-800 text-white'>
                <DialogHeader>
                    <DialogTitle>Update info : <span className='text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent'>{currentUser?.name}</span></DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    {/* Institution */}
                    <div className="space-y-2">
                        <Label className="text-gray-900 dark:text-gray-200">
                            Institution
                        </Label>
                        <select
                            name='institution'
                            className="w-full border p-2 rounded-full border-purple-300/50 bg-white/50 dark:bg-white/10 text-gray-500 "
                        >
                            <option value="">Select Institution</option>
                            <option value="BEC">Barishal Engineering College</option>
                        </select>
                    </div>
                    {/* Department */}
                    <div className="space-y-2 mt-2">
                        <Label className="text-gray-900 dark:text-gray-200">
                            Department
                        </Label>
                        <select
                            name='department'
                            className="w-full border p-2 rounded-full border-purple-300/50 bg-white/50 dark:bg-white/10 text-gray-500 "
                        >
                            <option value="">Select Department</option>
                            <option value="Civil">Civil</option>
                            <option value="EEE">EEE</option>
                        </select>
                    </div>
                    {/* semester */}
                    <div className="space-y-2 mt-2">
                        <Label className="text-gray-900 dark:text-gray-200">
                            Semester
                        </Label>
                        <select
                            name='semester'
                            className="w-full border p-2 rounded-full border-purple-300/50 bg-white/50 dark:bg-white/10 text-gray-500 "
                        >
                            <option value="">Select Year & Semester</option>
                            <option value="1:1">1st Year 1st Semester</option>
                            <option value="1:2">1st Year 2nd Semester</option>
                            <option value="2:1">2nd Year 1st Semester</option>
                            <option value="2:2">2nd Year 2nd Semester</option>
                            <option value="3:1">3rd Year 1st Semester</option>
                            <option value="3:2">3rd Year 2nd Semester</option>
                            <option value="4:1">4th Year 1st Semester</option>
                            <option value="4:2">4th Year 2nd Semester</option>
                        </select>
                    </div>
                    <div className='mt-2'>
                        <button type='submit' className='w-full p-2 bg-linear-65 from-purple-500 to-pink-500 rounded-lg cursor-pointer' >
                            {loading ? <div className='flex justify-center items-center'><Loader className='animate-spin'></Loader></div> : 'Submit'}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
