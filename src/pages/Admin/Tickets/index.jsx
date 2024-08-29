import React, { useState, useEffect } from "react";
import TicketCard from "./TicketCard"; // Adjust the path as needed
import DownloadModal from "./DowloadModal";
import axios from "axios";
import { useSelector } from "react-redux";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
const mockBookings = [
    {
        userName: "John Doeoooo",
        email: "john.doe@example.com",
        ticketCount: 2,
        price: 100,
        planImage:
            "https://media.easemytrip.com/media/Blog/International/637597107367841576/637597107367841576IlmTQB.jpg",
        title: "Amazing Beach Tour",
        description:
            "Enjoy a relaxing day at some of the most beautiful beaches.",
        tourPlaces: ["Beach 1", "Beach 2", "Beach 3"],
    },
    {
        userName: "Jane Smith",
        email: "jane.smith@example.com",
        ticketCount: 1,
        price: 50,
        planImage:
            "https://media.easemytrip.com/media/Blog/International/637597107367841576/637597107367841576IlmTQB.jpg",
        title: "Historical City Tour",
        description: "Explore the rich history and heritage of the city.",
    },
];

const ManageTickets = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly
    const [details, setDetails] = useState([]);
    const lang = useSelector((state) => state.language.lang);

    const openPopup = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDownload = (format) => {
        setIsModalOpen(false);

        if (format === "pdf") {
            console.log("Download as PDF");
            const doc = new jsPDF();
            let y = 10; // Initial vertical position

            details.forEach((item, index) => {
                const {
                    user,
                    category,
                    plan,
                    totalPrice,
                    adultQuantity,
                    childQuantity,
                } = item;

                doc.text(`Ticket ${index + 1}`, 10, y);
                y += 10; // Move down for next line

                doc.text("User Name: " + user.name, 10, y);
                y += 10;
                doc.text("User Email: " + user.email, 10, y);
                y += 10;
                doc.text("Category: " + category.title.en, 10, y);
                y += 10;
                doc.text("Plan Title: " + plan.title.en, 10, y);
                y += 10;
                doc.text("Total Price: " + totalPrice, 10, y);
                y += 10;
                doc.text("Adult Quantity: " + adultQuantity, 10, y);
                y += 10;
                doc.text("Child Quantity: " + childQuantity, 10, y);
                y += 20; // Extra space between tickets
            });

            doc.save("TicketDetails.pdf");
        } else if (format === "excel") {
            console.log("Download as Excel");
            const data = details.map((item, index) => ({
                "Ticket Number": index + 1,
                "User Name": item.user.name,
                "User Email": item.user.email,
                Category: item.category.title.en,
                "Plan Title": item.plan.title.en,
                "Total Price": item.totalPrice,
                "Adult Quantity": item.adultQuantity,
                "Child Quantity": item.childQuantity,
            }));

            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "TicketDetails.xlsx");
        }
    };

    const handleCancelTicket = async (id) => {
        try {
            const res = await axios.put(
                BASE_URL + "/admin/tickets-cancel/" + id,
            );
            const canceledTicket = res?.data?.data?.ticket;

            // Update the state with the canceled ticket
            setDetails((prevDetails) =>
                prevDetails.map((ticket) =>
                    ticket._id === canceledTicket._id
                        ? { ...ticket, status: "Canceled" }
                        : ticket,
                ),
            );
        } catch (error) {
            console.error("Error canceling ticket:", error);
        }
    };
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(BASE_URL + "/admin/tickets");
                console.log(res?.data?.data);
                setDetails(res?.data?.data);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    return (
        <div className="p-5 bg-gray-100">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold mb-6">
                    Manage Ticket Bookings
                </h1>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search ticket"
                        className="px-2 py-1 rounded-md shadow border-black "
                    />
                    <button
                        onClick={openPopup}
                        className="bg-yellow-400 p-2 rounded-md"
                    >
                        Download
                    </button>
                </div>
            </div>
            <div className="space-y-4">
                {details.map((booking, index) => (
                    <TicketCard
                        key={index}
                        booking={booking}
                        lang={lang}
                        handleCancelTicket={handleCancelTicket}
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

export default ManageTickets;
