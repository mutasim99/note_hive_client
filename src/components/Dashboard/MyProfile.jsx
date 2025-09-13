"use client";
import UseAuth from '@/Hooks/UseAuth';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Bell, Calendar, Check, Plus, Trash } from 'lucide-react';
import UseAxiosSecure from '@/Hooks/UseAxiosSecure';
import Clock from '../ui/Clock';
import { Button } from '../ui/button';
import AddEventModal from '../Modal/AddEventModal';
import AddTaskModal from '../Modal/AddTaskModal';

const MyProfile = () => {
    const { user } = UseAuth();
    const [fullUser, setFullUser] = useState(null)
    const [greeting, setGreeting] = useState('Hello');
    const [classes, setClasses] = useState([]);
    const [holiday, setHoliday] = useState(false);
    const [loading, setLoading] = useState(true);

    const [event, setEvent] = useState([]);
    const [dailyTask, setDailyTask] = useState([null]);

    const [isEventModalOpen, setIsEventModalOPen] = useState(false);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

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
                        institution: fullUser?.institution,
                        department: fullUser?.department,
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

    /* fetch event daily task */
    useEffect(() => {
        if (!user?.email) {
            return;
        }
        const fetchData = async () => {
            const resEvents = await axiosSecure.get(`/api/event/${user?.email}`)
            setEvent(resEvents.data);
            const resTask = await axiosSecure.get(`/api/dailyTask/${user?.email}`)
            setDailyTask(resTask.data);
        }
        fetchData();
    }, [user, axiosSecure]);

    /* Handle update task and event */

    const toggleComplete = async (id, type, completed) => {
        const url = type === 'event' ? '/api/event' : '/api/dailyTask'
        await axiosSecure.patch(`${url}/${id}`, { completed: !completed });
        if (type === 'event') {
            setEvent(prev => prev.map(e => e._id === id ? { ...e, completed: !completed } : e));
        } else {
            setDailyTask(prev => prev.map(r => r._id === id ? { ...r, completed: !completed } : r));
        }
    }

    /* Handle delete task and event */
    const handleDelete = async (id, type) => {
        const url = type === 'event' ? '/api/event/delete' : '/api/dailyTask/delete';
        await axiosSecure.delete(`${url}/${id}`)
        if (type === 'event') {
            setEvent(prev => prev.filter(e => e._id !== id))
        } else {
            setDailyTask(prev => prev.filter(r => r._id !== id))
        }
    }

    /* handle event and task */
    const handleAddEvent = (newEvent) => setEvent(prev => [...prev, newEvent]);
    const handleAddTask = (newTask) => setDailyTask(prev => [...prev, newTask])
    return (
        <div className='min-h-screen w-full bg-gradient-to-br from-cyan-900 via-blue-900 to-violet-900 dark:from-gray-900 dark:via-gray-800 dark:to-black flex flex-col items-center p-4 sm:p-6 lg:p-10'>
            {/* Profile Header */}
            <div className='flex flex-col items-center space-y-4'>
                <Clock />
                <h1 className='text-lg sm:text-xl lg:text-2xl font-semibold text-white'>
                    {greeting}, <span className='text-shadow-cyan-300'>{user?.name}</span>
                </h1>
                <p className="text-gray-300 text-sm">Welcome back! Here’s your overview:</p>
            </div>

            {/* Card Grid */}
            <div className="grid gap-4 sm:gap-6 mt-10 w-full max-w-6xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {/* Today's Classes */}
                <Card className="bg-white/10 dark:bg-gray-800/70 backdrop-blur-md shadow-xl border-0 rounded-2xl space-y-1">
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
                <Card className="bg-white/10 dark:bg-gray-800/70 backdrop-blur-md shadow-xl border-0 rounded-2xl space-y-1">
                    <CardHeader className="flex flex-row items-center space-x-2">
                        <Calendar className="w-5 h-5 text-green-400" />
                        <CardTitle className="text-white">Upcoming Events</CardTitle>
                        <button
                            onClick={() => setIsEventModalOPen(true)}
                            className='bg-transparent p-2 rounded-xl  hover:bg-purple-500 dark:hover:bg-gray-500 dark:text-white cursor-pointer flex items-center'><Plus></Plus>Add</button>
                    </CardHeader>
                    <CardContent>
                        {event.length === 0 ? <p>No events yet</p> : (
                            <ol className='space-y-2 list-decimal ml-2.5' type='1'>
                                {event.map((e) => (
                                    <li key={e?._id} >
                                        <div className='flex items-center justify-between p-2.5'>
                                            <span className={`${e?.completed ? 'line-through text-gray-400' : ''}`}>
                                                {e?.text}
                                            </span>
                                            <div className='flex items-center gap-4'>
                                                <Button className='cursor-pointer bg-green-600 text-white p-1' size='icons' variant='ghost' onClick={() => toggleComplete(e._id, 'event', e.completed)}><Check></Check></Button>
                                                <Button className='cursor-pointer bg-red-600 text-white p-1' size='icons' variant='ghost' onClick={() => handleDelete(e._id, 'event')}><Trash></Trash></Button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        )}
                    </CardContent>
                </Card>

                {/* Reminders */}
                <Card className="bg-white/10 dark:bg-gray-800/70 backdrop-blur-md shadow-xl border-0 rounded-2xl space-y-1">
                    <CardHeader className="flex flex-row items-center space-x-2">
                        <Bell className="w-5 h-5 text-yellow-400" />
                        <CardTitle className="text-white">Daily Task</CardTitle>
                        <button
                            onClick={() => setIsTaskModalOpen(true)}
                            className='bg-transparent p-2 rounded-xl  hover:bg-purple-500 dark:hover:bg-gray-500 dark:text-white cursor-pointer flex items-center'><Plus></Plus>Add</button>
                    </CardHeader>
                    <CardContent>
                        {dailyTask === 0 ? <p>To task today</p> : (
                            <ol className='space-y-2 list-decimal ml-2.5' type='1'>
                                {dailyTask.map((e) => (
                                    <li key={e?._id}>
                                        <div className='flex items-center justify-between p-2.5'>
                                            <span className={`${e?.completed ? 'line-through text-gray-400' : ''}`}>
                                                {e?.text}
                                            </span>
                                            <div className='flex items-center gap-4'>
                                                <Button className='cursor-pointer bg-green-600 text-white p-1' size='icons' variant='ghost' onClick={() => toggleComplete(e._id, 'dailyTask', e.completed)}><Check></Check></Button>
                                                <Button className='cursor-pointer bg-red-600 text-white p-1' size='icons' variant='ghost' onClick={() => handleDelete(e._id, 'dailyTask')}><Trash></Trash></Button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        )}
                    </CardContent>
                </Card>
            </div>
            <AddEventModal
                open={isEventModalOpen}
                setOpen={setIsEventModalOPen}
                onAdd={handleAddEvent}
                email={user?.email}
            ></AddEventModal>
            <AddTaskModal
                open={isTaskModalOpen}
                setOpen={setIsTaskModalOpen}
                onAdd={handleAddTask}
                email={user?.email}
            ></AddTaskModal>
        </div>
    );
};

export default MyProfile;
