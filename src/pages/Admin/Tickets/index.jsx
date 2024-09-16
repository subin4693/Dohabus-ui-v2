import React, { useState, useEffect } from "react";
import TicketCard from "./TicketCard"; // Adjust the path as needed
import DownloadModal from "./DowloadModal";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";

const ManageTickets = () => {
    const mainUser = useSelector((state) => state.user.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly
    const [details, setDetails] = useState([]);
    const lang = useSelector((state) => state.language.lang);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("Year");
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
                    email,
                } = item;

                doc.text(`Ticket ${index + 1}`, 10, y);
                y += 10; // Move down for next line

                doc.text("User Name: " + user.name, 10, y);
                y += 10;
                doc.text("User Email: " + email, 10, y);
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
                "User Email": item.email,
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
                BASE_URL + "/admin/tickets-cancel/" + id
            );
            const canceledTicket = res?.data?.data?.ticket;

            // Update the state with the canceled ticket
            setDetails((prevDetails) =>
                prevDetails.map((ticket) =>
                    ticket._id === canceledTicket._id
                        ? { ...ticket, status: "Canceled" }
                        : ticket
                )
            );
            toast.success("Ticket canceled", {
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
            console.error("Error canceling ticket:", error);
            toast.error("Something went wrong...", {
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
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(BASE_URL + "/admin/tickets");
                console.log("***  ** ");
                console.log(res?.data?.data);
                setDetails(res?.data?.data);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);
    const handleSearchChange = (e) => {
        console.log("workng fine");
        setSearchQuery(e.target.value);
    };

    const getStartAndEndDate = (filter) => {
        const now = new Date();
        let startDate, endDate;

        if (filter === "week") {
            // Get the current week's start and end dates
            const startOfWeek = now.getDate() - now.getDay(); // Start from Sunday
            startDate = new Date(now.setDate(startOfWeek));
            endDate = new Date(now.setDate(startOfWeek + 6)); // End of the week (Saturday)
        } else if (filter === "Month") {
            // Get the current month's start and end dates
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of the month
        } else if (filter === "Year") {
            // Get the current year's start and end dates
            startDate = new Date(now.getFullYear(), 0, 1);
            endDate = new Date(now.getFullYear(), 11, 31); // Last day of the year
        }

        return { startDate, endDate };
    };

    const filteredDetails = details.filter((ticket) => {
        const ticketDate = new Date(ticket?.date); // Assuming `createdAt` is the date field in ticket
        // Apply text search filter
        const matchesSearchQuery =
            ticket?.user?.name
                ?.toLowerCase()
                ?.includes(searchQuery.toLowerCase()) ||
            ticket?.user?.email
                ?.toLowerCase()
                ?.includes(searchQuery.toLowerCase()) ||
            ticket?.category?.title?.en
                ?.toLowerCase()
                ?.includes(searchQuery.toLowerCase()) ||
            ticket?.plan?.title?.en
                ?.toLowerCase()
                ?.includes(searchQuery.toLowerCase()) ||
            ticket?.status?.toLowerCase()?.includes(searchQuery.toLowerCase());

        // Get the selected time filter (week, month, year)
        const { startDate, endDate } = getStartAndEndDate(selectedFilter);
        console.log("********************888");

        console.log(ticketDate);
        console.log(">");
        console.log(startDate);
        console.log(endDate);
        console.log(startDate < ticketDate);
        console.log(endDate > ticketDate);

        console.log(endDate);
        // Apply date filter
        const isWithinDateRange =
            ticketDate >= startDate && ticketDate <= endDate;

        // Return true only if both search query and date filters match
        return matchesSearchQuery && isWithinDateRange;
    });
    return (
        <div className="p-5 bg-gray-100">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold mb-6">
                    Manage Ticket Bookings
                </h1>
                <div className="flex gap-2">
                    {" "}
                    <select
                        className="px-5 rounded-md"
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)} // Set selected filter
                    >
                        <option value="week">Week</option>
                        <option value="Month">Month</option>
                        <option value="Year">Year</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Search ticket"
                        value={searchQuery}
                        onChange={handleSearchChange}
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
            <div className="flex flex-wrap gap-5 justify-center items-center">
                {filteredDetails.map((booking, index) => (
                    <TicketCard
                        key={index}
                        booking={booking}
                        lang={lang}
                        handleCancelTicket={handleCancelTicket}
                        mainUserRole={mainUser.role}
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
