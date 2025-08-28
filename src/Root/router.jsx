import DepartmentName from '@/components/Materials/DepartmentName';
import Semester from '@/components/Materials/Semester';
import SubjectName from '@/components/Materials/SubjectName';
import WavesHero from '@/components/nurui/waves-hero';
import HomeLayouts from '@/Layouts/HomeLayouts';
import AddMaterials from '@/Pages/AddMaterials';
import Home from '@/Pages/Home';
import ShowPdf from '@/Pages/ShowPdf';
import React from 'react';
import { createBrowserRouter } from 'react-router';

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
                element: <Semester></Semester>
            },
            {
                path: '/home/departments/:semester',
                element: <DepartmentName></DepartmentName>
            },
            {
                path: '/home/:semester/:department',
                element: <SubjectName></SubjectName>
            },
            {
                path: '/home/addMaterials',
                element: <AddMaterials></AddMaterials>
            },
            {
                path: '/home/pdfs/:semester/:department/:subject',
                element: <ShowPdf></ShowPdf>
            }
        ]
    }
])

export default router;