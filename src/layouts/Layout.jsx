import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <main
                className={`flex-1 duration-300 ${
                    sidebarOpen ? "-translate-x-[300px]" : ""
                }`}
            >
                <Outlet />
            </main>
            <div
                className={`  duration-300 ${
                    sidebarOpen ? "-translate-x-[300px]" : ""
                }`}
            >
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
