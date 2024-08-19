import React from "react";

import { FaUserCircle } from "react-icons/fa";
const UserCard = ({ user, onPromote, onDemote }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-5 border border-gray-300 flex flex-col gap-4 w-fit">
            <div className="flex items-center gap-4">
                {/* <img
                    src={user.photo || "https://via.placeholder.com/50"}
                    alt={user.name}
                
                /> */}
                <FaUserCircle className="w-12 h-12 object-cover rounded-full border border-gray-200 shadow-sm" />

                <div>
                    <h3 className="text-xl font-semibold">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-gray-500">Role: {user.role}</p>
                </div>
            </div>
            <div className="flex justify-end gap-3">
                {user.role === "user" && (
                    <button
                        onClick={() => onPromote(user._id)}
                        className="px-3 bg-custom-yellow py-1 rounded-md duration-300 hover:bg-black hover:text-white"
                    >
                        Promote to Admin
                    </button>
                )}
                {user.role === "admin" && (
                    <button
                        onClick={() => onDemote(user._id)}
                        className="px-3 bg-custom-yellow py-1 rounded-md duration-300 hover:bg-black hover:text-white"
                    >
                        Demote to User
                    </button>
                )}
            </div>
        </div>
    );
};

export default UserCard;
