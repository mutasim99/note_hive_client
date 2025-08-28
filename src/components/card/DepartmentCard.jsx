import React from "react";
import { Link } from "react-router";

const DepartmentCard = ({ dept, semester }) => {
    

    return (
        <Link
            to={`/home/${semester}/${dept.department}`}
            className="cursor-pointer group  shadow-lg rounded-2xl p-6 border  
                 hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
        >
            <div className="flex items-center justify-center h-20 w-20 mx-auto rounded-full 
                       bg-radial-[at_25%_25%] from-lime-200 via-lime-500 to-green-800 to-75%  text-white text-xl font-bold">
                {dept.department.charAt(0)} {/* first letter big icon-like */}
            </div>
            <h2 className="text-xl font-semibold text-center mt-4 group-hover:text-indigo-600">
                Dept of {dept.department}
            </h2>
        </Link>
    );
};

export default DepartmentCard;