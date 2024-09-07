import React from "react";
import { FaUserCircle } from "react-icons/fa";

const UserCard = ({
    user,
    onPromote,
    onDemote,
    currentUserRole,
    totalSuperAdmins = 2,
}) => {
    const isSuperAdmin = currentUserRole === "super-admin";
    const canAddSuperAdmin = totalSuperAdmins < 3;

    return (
        <div className="bg-white shadow-lg rounded-lg p-5 border border-gray-300 flex flex-col gap-4 w-fit">
            <div className="flex items-center gap-4">
                <FaUserCircle className="w-12 h-12 object-cover rounded-full border border-gray-200 shadow-sm" />

                <div>
                    <h3 className="text-xl font-semibold">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-gray-500">Role: {user.role}</p>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                {/* Buttons for Super Admin */}
                {isSuperAdmin && user.role === "user" && (
                    <>
                        <button
                            onClick={() => onPromote(user._id, "admin")}
                            className="px-3 bg-custom-yellow py-1 rounded-md duration-300 hover:bg-black hover:text-white"
                        >
                            Promote to Admin
                        </button>

                        {canAddSuperAdmin ? (
                            <button
                                onClick={() =>
                                    onPromote(user._id, "super-admin")
                                }
                                className="px-3 bg-custom-yellow py-1 rounded-md duration-300 hover:bg-black hover:text-white"
                            >
                                Promote to Super Admin
                            </button>
                        ) : (
                            <button
                                disabled
                                className="px-3 bg-gray-300 text-gray-500 py-1 rounded-md cursor-not-allowed"
                            >
                                Super Admin Limit Reached
                            </button>
                        )}
                    </>
                )}

                {isSuperAdmin && user.role === "admin" && (
                    <>
                        {canAddSuperAdmin ? (
                            <button
                                onClick={() =>
                                    onPromote(user._id, "super-admin")
                                }
                                className="px-3 bg-custom-yellow py-1 rounded-md duration-300 hover:bg-black hover:text-white"
                            >
                                Promote to Super Admin
                            </button>
                        ) : (
                            <button
                                disabled
                                className="px-3 bg-gray-300 text-gray-500 py-1 rounded-md cursor-not-allowed"
                            >
                                Super Admin Limit Reached
                            </button>
                        )}

                        <button
                            onClick={() =>
                                onDemote(
                                    user._id,
                                    user.role === "super-admin"
                                        ? "admin"
                                        : "user",
                                )
                            }
                            className="px-3 bg-custom-yellow py-1 rounded-md duration-300 hover:bg-black hover:text-white"
                        >
                            Demote to{" "}
                            {user.role === "super-admin" ? "Admin" : "User"}
                        </button>
                    </>
                )}

                {/* Buttons for Admin */}
                {currentUserRole === "admin" && user.role === "user" && (
                    <button
                        onClick={() => onPromote(user._id, "admin")}
                        className="px-3 bg-custom-yellow py-1 rounded-md duration-300 hover:bg-black hover:text-white"
                    >
                        Promote to Admin
                    </button>
                )}
                {currentUserRole === "super-admin" &&
                    user.role === "super-admin" && (
                        <button
                            onClick={() => onDemote(user._id, "admin")}
                            className="px-3 bg-custom-yellow py-1 rounded-md duration-300 hover:bg-black hover:text-white"
                        >
                            Demote to Admin
                        </button>
                    )}
                {currentUserRole === "super-admin" &&
                    user.role === "super-admin" && (
                        <button
                            onClick={() => onDemote(user._id, "user")}
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
