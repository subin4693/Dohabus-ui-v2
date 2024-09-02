import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    return (
        <div
            className={`flex flex-col min-h-screen ${isVisible && " pt-[50px]"}`}
        >
            <Navbar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
            />

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
