import React from 'react';
import { PiSpinnerBallFill } from "react-icons/pi";


const LoadingSpinner = () => {
    return (
        <div className=' h-screen flex justify-center items-center gap-4'>
            <div><PiSpinnerBallFill className='animate-spin text-xl text-purple-500 font-semibold'></PiSpinnerBallFill></div>
            <div><PiSpinnerBallFill className='animate-spin text-xl text-purple-500 font-semibold'></PiSpinnerBallFill></div>
            <div><PiSpinnerBallFill className='animate-spin text-xl text-purple-500 font-semibold'></PiSpinnerBallFill></div>
        </div>
    );
};

export default LoadingSpinner;