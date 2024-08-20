import React, { useState } from "react";
import TicketCard from "./TicketCard"; // Adjust the path as needed
import DownloadModal from "./DowloadModal";

import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
const mockBookings = [
    {git 
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
        tourPlaces: ["City Center", "Historical Museum", "Old Town"],
    },
];


const ManageTickets = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openPopup = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
   
    const handleDownload = (format) => {
        setIsModalOpen(false);
        if (format === 'pdf') {
            console.log("Download as PDF");
                const doc = new jsPDF();
                doc.text("Sample Data", 10, 10);
                 doc.text("Sample Data", 10, 10);
                 mockBookings.forEach((item,index)=>{
                   doc.text(`${index+1}. ${item.userName}, ${item.email}, ${item.ticketCount}, ${item.price}, ${item.title}, ${item.description}, ${item.tourPlaces}`, 10, 20 + (index * 10));
                 })
                 doc.save("TicketSheet.pdf");
        } else if (format === 'excel') {
            console.log("Download as Excel");
            const worksheet = XLSX.utils.json_to_sheet(mockBookings);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "TicketSheet.xlsx");
        }
    };

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
                <button onClick={openPopup} className="bg-yellow-400 p-2 rounded-md">Download</button>
               </div>
               
            </div>
            <div className="space-y-4">
                {mockBookings.map((booking, index) => (
                    <TicketCard key={index} booking={booking} />
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
