"use client";
import UseAuth from '@/Hooks/UseAuth';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Bell, Calendar } from 'lucide-react';
import UseAxiosSecure from '@/Hooks/UseAxiosSecure';
import Clock from '../ui/Clock';

const MyProfile = () => {
    const { user } = UseAuth();
    const [fullUser, setFullUser] = useState(null)
    const [greeting, setGreeting] = useState('Hello');
    const [classes, setClasses] = useState([]);
    const [holiday, setHoliday] = useState(false);
    const [loading, setLoading] = useState(true);
    const axiosSecure = UseAxiosSecure();

    // Set greeting based on current hour
    useEffect(() => {
        const hours = new Date().getHours();
        if (hours < 12) setGreeting('Good Morning');
        else if (hours < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
    }, []);

    /* fetch user profile */
    useEffect(() => {
        const fetchFullUser = async () => {
            if (!user?.email) {
                return
            }
            try {
                const res = await axiosSecure.get(`/api/user/${user?.email}`)
                setFullUser(res.data)
            } catch (err) {
                console.log(err);
            }
        }
        fetchFullUser();
    }, [axiosSecure, user])
    // Fetch today's classes
    useEffect(() => {
        const fetchClasses = async () => {
            if (!user) return;

            try {
                let year, sem;
                if (fullUser?.semester?.includes(":")) {
                    [year, sem] = fullUser.semester.split(":").map(Number);
                } else {
                    year = "1";
                    sem = "1";
                }

                const res = await axiosSecure.get('/api/todayClasses', {
                    params: {
                        institution: fullUser.institution,
                        department: fullUser.department,
                        year,
                        semester: sem
                    }
                });

                // Handle response: array of classes or holiday message
                if (Array.isArray(res.data)) {
                    setClasses(res.data);
                    setHoliday(false);
                } else if (res.data?.message?.includes('holiday')) {
                    setClasses([]);
                    setHoliday(true);
                } else {
                    setClasses([]);
                    setHoliday(false);
                }
            } catch (err) {
                console.error(err);
                setClasses([]);
                setHoliday(false);
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, [axiosSecure, fullUser, user]);
    console.log(fullUser);

    return (
        <div className='min-h-screen w-full bg-gradient-to-br from-cyan-900 via-blue-900 to-violet-900 dark:from-gray-900 dark:via-gray-800 dark:to-black flex flex-col items-center p-6'>
            {/* Profile Header */}
            <div className='flex flex-col items-center space-y-4'>
                <Clock />
                <h1 className='text-xl font-semibold text-white'>
                    {greeting}, <span className='text-shadow-cyan-300'>{user?.name}</span>
                </h1>
                <p className="text-gray-300 text-sm">Welcome back! Here’s your overview:</p>
            </div>

            {/* Card Grid */}
            <div className="grid gap-6 mt-10 w-full max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {/* Today's Classes */}
                <Card className="bg-white/10 dark:bg-gray-800/70 backdrop-blur-md shadow-xl border-0 rounded-2xl">
                    <CardHeader className="flex flex-row items-center space-x-2">
                        <Calendar className="w-5 h-5 text-green-400" />
                        <CardTitle className="text-white">Today's Classes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <p className="text-gray-300">Loading...</p>
                        ) : holiday ? (
                            <p className="text-gray-300">No classes today 🎉</p>
                        ) : classes.length === 0 ? (
                            <p className="text-gray-300">No classes today 🎉</p>
                        ) : (
                            <ul className='space-y-2'>
                                {classes.map((cls, idx) => (
                                    <li key={idx}>
                                        <span className="font-semibold">{cls.subject}</span>
                                        <span className="ml-2">({cls.period})</span>
                                        <div className="text-sm text-gray-400">
                                            {cls.teacher} — {cls.room}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>

                {/* Upcoming Events */}
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

                {/* Reminders */}
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
