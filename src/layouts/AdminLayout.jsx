import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard"); // State to track active menu
  const [showContent, setShowContent] = useState(true); // State to trigger content fade

  const handleMenuClick = (menu) => {
    if (activeMenu !== menu) {
      setShowContent(false); // Start fade-out animation
      setTimeout(() => {
        setActiveMenu(menu); // Update menu after fade-out
        setShowContent(true); // Start fade-in animation
      }, 300); // Match this delay with your animation duration
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-[150px] mt-36 py-4">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
          <h5 className="text-stone-500 mt-2 sm:mt-3 text-sm sm:text-base">
            See how your experiences are doing
          </h5>
        </div>
        <div className="flex flex-wrap gap-2 lg:gap-4">
          {[
            { text: "dashboard", link: "/admin" },

            { text: "categorys", link: "/admin/categorys" },
            { text: "plans", link: "/admin/tours" },

            { text: "users", link: "/admin/users" },
            { text: "tickets", link: "/admin/tickets" },
            { text: "Edit Gallery", link: "/admin" },
          ].map((menu) => (
            <Link
              to={menu.link}
              key={menu.text}
              className={`p-2 text-sm sm:text-base cursor-pointer ${
                activeMenu === menu.text
                  ? "bg-custom-yellow text-black"
                  : "text-gray"
              } rounded-lg transition-all duration-300`}
              onClick={() => handleMenuClick(menu.text)}
            >
              {menu.text.charAt(0).toUpperCase() + menu.text.slice(1)}
            </Link>
          ))}
        </div>
      </div>

      <div
        className={`transition-opacity duration-300 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
