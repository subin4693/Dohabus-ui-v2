import React from "react";
import logo from "../assets/logologo.png";

const Navbar = () => {
    return (
        <nav className="bg-yellow-100">
            <div className="bg-custom-blue w-[100px] h-[100px]"></div>
            <div className="w-[20mm] bg-custom-yellow">
                <img src={logo} className="w-full h-full object-cover" />
            </div>
        </nav>
    );
};

export default Navbar;
