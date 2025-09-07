import DepartmentName from '@/components/Materials/DepartmentName';
import Semester from '@/components/Materials/Semester';
import SubjectName from '@/components/Materials/SubjectName';
import WavesHero from '@/components/nurui/waves-hero';
import HomeLayouts from '@/Layouts/HomeLayouts';
import AddMaterials from '@/Pages/AddMaterials';
import Home from '@/Pages/Home';
import LogIn from '@/Pages/LogIn';
import Register from '@/Pages/Register';
import ShowPdf from '@/Pages/ShowPdf';
import React from 'react';
import { createBrowserRouter } from 'react-router';
import PrivateRoute from './PrivateRoute';
import Dashboard from '@/Pages/Dashboard/Dashboard';
import MyProfile from '@/components/Dashboard/MyProfile';

const router = createBrowserRouter([
    {
        path: '/',
        element: <div className="relative min-h-screen w-full  bg-radial from-cyan-900 via-blue-900 to-violet-900">
            <WavesHero></WavesHero>
        </div>
    },
    {
        path: '/home',
        element: <HomeLayouts></HomeLayouts>,
        children: [
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/home/materials',
                element: <PrivateRoute>
                    <Semester></Semester>
                </PrivateRoute>
            },
            {
                path: '/home/departments/:semester',
                element: <PrivateRoute>
                    <DepartmentName></DepartmentName>
                </PrivateRoute>
            },
            {
                path: '/home/:semester/:department',
                element: <PrivateRoute>
                    <SubjectName></SubjectName>
                </PrivateRoute>
            },
            {
                path: '/home/addMaterials',
                element: <PrivateRoute>
                    <AddMaterials></AddMaterials>
                </PrivateRoute>
            },
            {
                path: '/home/pdfs/:semester/:department/:subject',
                element: <PrivateRoute>
                    <ShowPdf></ShowPdf>
                </PrivateRoute>
            }
        ]
    },
    {
        path: '/login',
        element: <LogIn></LogIn>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: '/dashboard/profile',
                element: <MyProfile></MyProfile>
            }
        ]
    }
])

export default router;