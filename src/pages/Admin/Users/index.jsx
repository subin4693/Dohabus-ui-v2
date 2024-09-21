import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import DownloadModal from "./DowloadModal";
import axios from "axios";
import { toast } from "react-toastify";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";

const ManageUser = () => {
    const [loading, setLoading] = useState(false);

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedOption, setSelectedOption] = useState("user");

    const mainUser = useSelector((state) => state.user.user);

    const navigate = useNavigate();

    const openPopup = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [users, setUsers] = useState([]);
    const handleDownload = (format) => {
        setLoading(true);
        setIsModalOpen(false);
        if (format === "pdf") {
            const doc = new jsPDF();
            doc.text("User Data", 10, 10);
            doc.text("User Data", 10, 10);
            users.forEach((item, index) => {
                doc.text(
                    `${index + 1}. ${item.name}, ${item.email}, ${item.role}`,
                    10,
                    20 + index * 10
                );
            });
            setLoading(false);

            doc.save("TicketSheet.pdf");
        } else if (format === "excel") {
            setLoading(false);

            const worksheet = XLSX.utils.json_to_sheet(users);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "TicketSheet.xlsx");
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/admin/users`);
                setUsers(response.data.data);
            } catch (error) {
                console.error("Error fetching users:", error.message);
            }
        };

        fetchUsers();
    }, [BASE_URL]);

    useEffect(() => {
        const lowerCaseSearchQuery = searchQuery.toLowerCase();
        const filtered = users.filter(
            (user) =>
                user.name.toLowerCase().includes(lowerCaseSearchQuery) ||
                user.email.toLowerCase().includes(lowerCaseSearchQuery) ||
                user.role.toLowerCase().includes(lowerCaseSearchQuery)
        );
        setFilteredUsers(filtered);
    }, [searchQuery, users]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handlePromote = async (userId, role) => {
        try {
            const response = await axios.post(`${BASE_URL}/admin/promote`, {
                userId,
                role,
            });
            const updatedUser = response.data.user;

            // Update the user in the state
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === updatedUser._id ? updatedUser : user
                )
            );
            toast.success("User promoted successfully  ", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (error) {
            console.error("Error promoting user:", error);
            if (
                error.response.data.message ===
                "Cannot promote more than 3 super-admins."
            ) {
                toast.error("Cannot promote more than 3 super-admins.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else
                toast.error("There was an error promoting the user. ", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
        }
    };

    const handleDemote = async (userId, role) => {
        try {
            const response = await axios.post(`${BASE_URL}/admin/demote`, {
                userId,
                role,
            });
            const updatedUser = response.data.user;

            // Update the user in the state
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === updatedUser._id ? updatedUser : user
                )
            );
            toast.success(" User demoted successfully ", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (error) {
            console.error("Error demoting user:", error);
            toast.error(" There was an error demoting the user. ", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
    return (
        <div className="p-5 bg-gray-100  rounded-md">
            <div className="flex justify-between items-center flex-wrap mb-3">
                <h1 className="text-3xl font-bold mb-6">
                    Manage{" "}
                    <select
                        value={selectedOption}
                        onChange={handleChange}
                        className="font-bold  underline bg-white px-2 py-1 rounded-md shadow-lg border border-gray-200"
                    >
                        <option className="text-sm" value="user">
                            Users
                        </option>

                        <option className="text-sm" value="admin">
                            Admin
                        </option>
                        <option className="text-sm" value="super-admin">
                            Super Admin
                        </option>
                    </select>
                </h1>

                <div>
                    <input
                        type="text"
                        placeholder="Search users"
                        value={searchQuery} // Set value of input to searchQuery state
                        onChange={handleSearchChange}
                        className="px-2 py-1 rounded-md shadow border-black "
                    />{" "}
                    <button
                        onClick={openPopup}
                        className="bg-yellow-400 p-2 rounded-md"
                    >
                        {loading ? (
                            <div className="">
                                <Loader w={20} h={20} b={5} />
                            </div>
                        ) : (
                            "Complete users"
                        )}
                    </button>
                </div>
            </div>
            <div className="flex justify-start flex-wrap items-center gap-5">
                {filteredUsers &&
                    filteredUsers
                        .filter((user) => user.role === selectedOption) // Filter users based on selected role
                        .map((user) => (
                            <UserCard
                                key={user._id}
                                user={user}
                                onPromote={handlePromote} // Pass user ID to promote function
                                onDemote={handleDemote} // Pass user ID to demote function
                                currentUserRole={mainUser.role}
                            />
                        ))}
            </div>
            <DownloadModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onDownload={handleDownload}
            />
        </div>
    );
};

export default ManageUser;
