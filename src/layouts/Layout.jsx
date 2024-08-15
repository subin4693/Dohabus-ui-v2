import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {console.log(sidebarOpen)}
            <div
                className={`  duration-300 ${
                    sidebarOpen ? "-translate-x-[300px]" : ""
                }`}
            >
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
