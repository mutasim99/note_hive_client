"use client";
import UseAuth from '@/Hooks/UseAuth';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Bell, BookOpen, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import UseAxiosSecure from '@/Hooks/UseAxiosSecure';
import Clock from '../ui/Clock';


const MyProfile = () => {
    const { user } = UseAuth();
    const [greeting, setGreeting] = useState('Hello')
    const [institution, setInstitution] = useState("");
    const [department, setDepartment] = useState("");
    const [semester, setSemester] = useState("");
    const [classes, setClasses] = useState([]);
    const axiosSecure = UseAxiosSecure();

    useEffect(() => {
        const hours = new Date().getHours();
        if (hours < 12) {
            setGreeting('Good Morning')
        } else if (hours < 18) {
            setGreeting('Good Afternoon')
        } else {
            setGreeting('Good Evening')
        }
    }, []);

    const fetchClasses = async () => {
        if (!semester || !department || !institution) return;

        const [year, sem] = semester.split(':').map(Number);

        const res = await axiosSecure.post('/api/todayClasses', {
            institution,
            department,
            year,
            semester: sem
        })
        setClasses(res.data)
    }
    return (
        <div className='min-h-screen w-full bg-gradient-to-br from-cyan-900 via-blue-900 to-violet-900 dark:from-gray-900 dark:via-gray-800 dark:to-black flex flex-col items-center p-6'>
            {/* Profile header */}
            <div className='flex flex-col items-center space-y-4'>
                <Clock></Clock>
                <h1 className='text-xl font-semibold text-white'>
                    {greeting}, <span className='text-shadow-cyan-300'>{user?.displayName}</span>
                </h1>
                <p className="text-gray-300 text-sm">Welcome back! Here’s your overview:</p>
            </div>

            {/* Card grid */}
            <div className="grid gap-6 mt-10 w-full max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {/* Today's classes */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Card className="bg-white/10 dark:bg-gray-800/70 backdrop-blur-md shadow-xl border-0 rounded-2xl cursor-pointer">
                            <CardHeader className='flex flex-row items-center space-x-2'>
                                <BookOpen className='w-5 h-5 text-cyan-500'></BookOpen>
                                <CardTitle>Today’s Classes</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Click to see details</p>
                            </CardContent>
                        </Card>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Select Institution, Department & Semester</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-3 ">
                            {/* Institution */}
                            <select
                                className="w-full border p-2 rounded text-gray-700"
                                onChange={(e) => setInstitution(e.target.value)}
                            >
                                <option value="">Select Institution</option>
                                <option value="BEC">Barishal Engineering College</option>
                            </select>

                            {/* Department */}
                            <select
                                className="w-full border p-2 rounded text-gray-700"
                                onChange={(e) => setDepartment(e.target.value)}
                            >
                                <option value="">Select Department</option>
                                <option value="Civil">Civil</option>
                                <option value="EEE">EEE</option>
                            </select>

                            {/* Semester */}
                            <select
                                className="w-full border p-2 rounded text-gray-700"
                                onChange={(e) => setSemester(e.target.value)}
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

                            <Button onClick={fetchClasses} className='w-full cursor-pointer'>Show Classes</Button>

                            {Array.isArray(classes) && classes.length > 0 ? (
                                <ul className="mt-3 space-y-2">
                                    {classes.map((cls, idx) => (
                                        <li key={idx} className="p-2 rounded bg-gray-100 dark:bg-gray-800">
                                            <p className="font-semibold">{cls.subject}</p>
                                            <p className="text-sm text-gray-400">
                                                {cls.period} • {cls.teacher} • {cls.room}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 text-sm mt-3">No classes found</p>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>

                <Card className="bg-white/10 dark:bg-gray-800/70 backdrop-blur-md shadow-xl border-0 rounded-2xl">
                    <CardHeader className="flex flex-row items-center space-x-2">
                        <Calendar className="w-5 h-5 text-green-400" />
                        <CardTitle className="text-white">Upcoming Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-300">Hackathon - Friday 10 AM</p>
                        <p className="text-gray-300">Group Project Due - Monday</p>
                    </CardContent>
                </Card>

                <Card className="bg-white/10 dark:bg-gray-800/70 backdrop-blur-md shadow-xl border-0 rounded-2xl">
                    <CardHeader className="flex flex-row items-center space-x-2">
                        <Bell className="w-5 h-5 text-yellow-400" />
                        <CardTitle className="text-white">Reminders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-300">Submit assignment tonight</p>
                        <p className="text-gray-300">Meeting with mentor tomorrow</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default MyProfile;