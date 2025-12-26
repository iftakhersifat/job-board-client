import React from 'react';
import Navbar from '../Pages/Navbar';
import { Outlet, useLocation } from 'react-router';
import Footer from '../Pages/Footer.Jsx';

const Root = () => {
    const location = useLocation();
    const isDashboard = location.pathname.startsWith("/dashboard");

    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            {!isDashboard && <Footer></Footer>}
        </div>
    );
};

export default Root;