import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Shared/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <ToastContainer />
        </div>
    );
};

export default MainLayout;