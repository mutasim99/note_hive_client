import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import UseAxiosSecure from '@/Hooks/UseAxiosSecure';
import { toast } from 'react-toastify';

const AddTaskModal = ({ open, setOpen, onAdd, email }) => {
    const [text, setText] = useState('');
    const axiosSecure = UseAxiosSecure();

    const handleSubmit = async () => {
        if (!text.trim()) {
            return
        }

        const res = await axiosSecure.post('/api/addDailyTask', { email, text })
        const newTask = { ...res.data, text, completed: false };
        onAdd(newTask);
        setText('');
        toast.success('Added a task successfully')
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add event</DialogTitle>
                </DialogHeader>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className='w-full p-2 rounded-lg'
                    placeholder='type your event'
                />
                <button
                    onClick={handleSubmit}
                    className='w-full p-2 bg-linear-65 from-purple-500 to-pink-500 rounded-lg cursor-pointer'>Save</button>
            </DialogContent>

        </Dialog>
    );
};

export default AddTaskModal;