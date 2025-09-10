import React, { useState } from 'react';
import { Link } from 'react-router';

const ErrorPge = () => {
    const [glitchState, setGlitchState] = useState(0);
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 text-gray-200 p-4 font-mono">
            <style>
                {`
        @keyframes glitch {
          0% {
            transform: translate(0);
            text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75), -0.05em -0.025em 0 rgba(0, 255, 0, 0.75), 0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          }
          14% {
            transform: translate(-0.05em, -0.05em);
            text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75), -0.05em -0.025em 0 rgba(0, 255, 0, 0.75), 0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          }
          15% {
            transform: translate(0);
            text-shadow: none;
          }
          100% {
            transform: translate(0);
            text-shadow: none;
          }
        }
        
        .glitch-text {
          animation: glitch 2s linear infinite;
        }

        .card {
          @apply bg-gray-900 border border-gray-700 rounded-lg p-6 shadow-xl w-full max-w-sm text-center;
        }
        
        .button {
          @apply inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700/90;
        }
        `}
            </style>

            {/* Container simulating a Shadcn Card component */}
            <div className="card">
                <h1 className="text-8xl md:text-9xl font-extrabold glitch-text">
                    404
                </h1>
                <p className="mt-4 text-xl font-semibold text-gray-400">
                    PAGE NOT FOUND
                </p>
                <p className="mt-2 text-sm text-gray-500 max-w-xs mx-auto">
                    The requested resource could not be found. Please check the URL or return to the homepage.
                </p>

                {/* Button to simulate a Shadcn Button component */}
                <Link
                    className="button mt-6"
                    to='/home'
                >
                    Go Back
                </Link>
            </div>
        </div>
    );
};

export default ErrorPge;