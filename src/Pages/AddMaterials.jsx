import UseAxiosSecure from '@/Hooks/UseAxiosSecure';
import React, { useEffect, useState } from 'react';
import { ImSpinner9 } from "react-icons/im";
import { toast } from 'react-toastify';

const AddMaterials = () => {
    const [file, setFile] = useState(null);
    const [semester, setSemester] = useState('');
    const [department, setDepartment] = useState('');
    const [subject, setSubject] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(false);

    const axiosSecure = UseAxiosSecure()

    // fetch subjects when semester and department are selected
    useEffect(() => {
        const fetchSubjects = async () => {
            if (semester && department) {
                try {
                    const res = await axiosSecure.get(`/subjects/${semester}/${department}`)
                    setSubjects(res.data)
                } catch (err) {
                    console.log(err);
                }
            }
        }

        fetchSubjects();

    }, [axiosSecure, department, semester])


    /* Handle submit from */
    const handlePdfUpload = async (e) => {
        e.preventDefault();
        if (!file || !subject) {
            return toast.error('Please select subject & upload a file!')
        }
        const formData = new FormData();
        formData.append('pdf', file);
        formData.append('semester', semester);
        formData.append('department', department);
        formData.append('subject', subject);

        setLoading(true);
        try {
            await axiosSecure.post('/upload-pdf', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            toast.success('Materials uploaded successfully')
        } catch (err) {
            console.log(err);
            toast.error(err.response.data);
        } finally {
            setLoading(false)
        }

    }
    return (
        <div className='pt-22'>
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-50 via-emerald-100 to-green-200 px-4  dark:from-gray-800 dark:via-gray-900 dark:to-black
            transition-colors duration-1000">
                <form
                    onSubmit={handlePdfUpload}
                    className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 space-y-6 dark:bg-gray-800 border-gray-300 dark:border-gray-700 
                            text-gray-900 dark:text-gray-100">
                    <h2 className="text-2xl font-bold text-center text-emerald-700 dark:text-emerald-300">
                        📚 Upload Subject PDF
                    </h2>
                    {/* semester select */}
                    <div>
                        <label className='block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200'>
                            semester
                        </label>
                        <select
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                            className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:bg-gray-800 border-gray-300 dark:border-gray-700 
                            text-gray-900 dark:text-gray-100'
                            required
                        >
                            <option value="">select a semester</option>
                            <option value="1st year 1st semester">1st year 1st semester</option>
                            <option value="1st year 2nd semester">1st year 2nd semester</option>
                            <option value="2nd year 1st semester">2nd year 1st semester</option>
                            <option value="2nd year 2nd semester">2nd year 2nd semester</option>
                            <option value="3rd year 1st semester">3rd year 1st semester</option>
                            <option value="3rd year 2nd semester">3rd year 2nd semester</option>
                            <option value="4th year 1st semester">4th year 1st semester</option>
                            <option value="4th year 2nd semester">4th year 2nd semester</option>
                        </select>
                    </div>
                    {/* department select */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                            Department
                        </label>
                        <select
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:bg-gray-800 border-gray-300 dark:border-gray-700 
                            text-gray-900 dark:text-gray-100"
                            required
                        >
                            <option value="">select a department</option>
                            <option value="Civil">Civil</option>
                            <option value="EEE">EEE</option>
                        </select>
                    </div>
                    {/* Subject select */}
                    <div>
                        <label className='block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200'>
                            Subject
                        </label>
                        <select
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:bg-gray-800 border-gray-300 dark:border-gray-700 
                            text-gray-900 dark:text-gray-100"
                            required
                        >
                            <option value="">Select Subject</option>
                            {subjects?.map((sub, idx) => (
                                <option key={idx} value={sub}>
                                    {sub}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* File upload */}
                    <div>
                        <label className='block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200'>
                            Upload pdf
                        </label>
                        <div className='flex justify-center items-center w-full'>
                            <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-emerald-50">
                                <svg
                                    className="w-10 h-10 text-emerald-500"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 16v-8m0 0l-3 3m3-3l3 3m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="mt-2 text-sm text-gray-600">
                                    {file ? file.name : "Click to upload PDF"}
                                </span>
                                <input
                                    type="file"
                                    accept='application/pdf'
                                    className='hidden'
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </label>
                        </div>
                    </div>
                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition duration-200 cursor-pointer flex items-center justify-center"
                    >
                        {loading ?  (<ImSpinner9 className='animate-spin text-xl'></ImSpinner9> ): ('upload')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddMaterials;