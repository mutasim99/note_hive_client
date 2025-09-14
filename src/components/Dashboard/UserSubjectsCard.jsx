import React from 'react';
import { Link } from 'react-router';
import { motion } from "framer-motion";
import { BookOpen } from 'lucide-react';
import UseAuth from '@/Hooks/UseAuth';


const UserSubjectsCard = ({ sub }) => {
    const { user } = UseAuth();
    return (
        <Link to={`/home/pdfs/${sub}/${user._id}`}>
            <motion.div
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                className="group relative p-6 rounded-2xl cursor-pointer shadow-lg 
                   bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600
                   hover:from-emerald-400 hover:via-green-500 hover:to-lime-600
                   text-white transition-all duration-300 overflow-hidden"
            >
                {/* Glow background effect */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-40 bg-gradient-to-tr from-white via-transparent to-transparent blur-2xl"></div>

                {/* Icon */}
                <div className="text-4xl mb-4 flex justify-center">
                    <BookOpen />
                </div>

                {/* Subject Name */}
                <h3 className="text-lg font-semibold text-center drop-shadow-md">
                    {sub}
                </h3>
            </motion.div>
        </Link>
    );
};

export default UserSubjectsCard;