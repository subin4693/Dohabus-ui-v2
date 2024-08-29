import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import DownloadModal from "./DowloadModal";
import axios from "axios";
import { toast } from "react-toastify";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";

const ManageUser = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const openPopup = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [users, setUsers] = useState([]);
    const handleDownload = (format) => {
        setIsModalOpen(false);
        if (format === "pdf") {
            console.log("Download as PDF");
            const doc = new jsPDF();
            doc.text("Sample Data", 10, 10);
            doc.text("Sample Data", 10, 10);
            users.forEach((item, index) => {
                doc.text(
                    `${index + 1}. ${item.name}, ${item.email}, ${
                        item.ticketCount
                    }, ${item.role}, ${item.photo},   ${item.tourPlaces}`,
                    10,
                    20 + index * 10
                );
            });
            doc.save("TicketSheet.pdf");
        } else if (format === "excel") {
            console.log("Download as Excel");
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
                console.log("users", users);
            } catch (error) {
                console.error("Error fetching users:", error.message);
            }
        };

        fetchUsers();
    }, [BASE_URL]);

    const handlePromote = async (userId) => {
        console.log(userId);
        try {
            const response = await axios.post(`${BASE_URL}/admin/promote`, {
                userId,
            });
            console.log("Promotion successful:", response.data);

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

            navigate("/admin");
        } catch (error) {
            console.error("Error promoting user:", error);

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

    const handleDemote = async (userId) => {
        console.log(userId);
        try {
            const response = await axios.post(`${BASE_URL}/admin/demote`, {
                userId,
            });
            console.log("Demotion successful:", response.data);

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
            navigate("/admin");
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

    return (
        <div className="p-5 bg-gray-100  rounded-md">
            <div className="flex justify-between items-center flex-wrap mb-3">
                <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
                <div>
                    <input
                        type="text"
                        placeholder="Search users"
                        className="px-2 py-1 rounded-md shadow border-black "
                    />{" "}
                    <button
                        onClick={openPopup}
                        className="bg-yellow-400 p-2 rounded-md"
                    >
                        Download
                    </button>
                </div>
            </div>
            <div className="flex justify-start flex-wrap items-center gap-5">
                {users &&
                    users.map((user) => (
                        <UserCard
                            key={user._id}
                            user={user}
                            onPromote={handlePromote}
                            onDemote={handleDemote}
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
