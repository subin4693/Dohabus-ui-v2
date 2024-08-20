import React, { useState } from "react";
import Banner from "../../../components/Banner";
import { motion } from "framer-motion";
import contactImg from "../../../assets/contact.jpg";
import DownloadModal from "./DowloadModal";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
const AdminFavourite = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const data = [
    {
      tourDetails: "Amazing Beach Tour",
      category: "Beach",
      user: "John Doe",
      userContact: "john@gmail.com",
    },
    {
      tourDetails: "Historical City Tour",
      category: "City",
      user: "Jane Smith",
      userContact: "jane@gmail.com",
    },
    {
      tourDetails: "Doha Tour",
      category: "Mall",
      user: "Jane Smith",
      userContact: "b@gmail.com",
    },
    {
      tourDetails: "Art Area",
      category: "Art",
      user: "Jane Smith",
      userContact: "a@gmail.com",
    },
    {
      tourDetails: "Art Area",
      category: "Art",
      user: "Jane Smith",
      userContact: "a@gmail.com",
    },
    {
      tourDetails: "Art Area",
      category: "Art",
      user: "Jane Smith",
      userContact: "a@gmail.com",
    },
    {
      tourDetails: "Art Area",
      category: "Art",
      user: "Jane Smith",
      userContact: "a@gmail.com",
    },
    {
      tourDetails: "Art Area",
      category: "Art",
      user: "Jane Smith",
      userContact: "a@gmail.com",
    },
  ];

  const filteredData = data.filter(
    (item) =>
      item.tourDetails.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.userContact.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const [isModalOpen, setIsModalOpen] = useState(false);

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
      doc.text("Sample Data", 10, 10);
      doc.text("Sample Data", 10, 10);
      mockBookings.forEach((item, index) => {
        doc.text(
          `${index + 1}. ${item.userName}, ${item.email}, ${item.ticketCount}, ${item.price}, ${item.title}, ${item.description}, ${item.tourPlaces}`,
          10,
          20 + index * 10,
        );
      });
      doc.save("TicketSheet.pdf");
    } else if (format === "excel") {
      console.log("Download as Excel");
      const worksheet = XLSX.utils.json_to_sheet(mockBookings);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "TicketSheet.xlsx");
    }
  };
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
      tourPlaces: ["City Center", "Historical Museum", "Old Town"],
    },
  ];
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Banner
        image={contactImg}
        title={"Admin Favourites"}
        subTitle={"Home | Admin-Favourites"}
      />

      <div className="p-5">
        {/*  <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-4xl font-bold text-center">
          Admin Favourite Details
        </h1>*/}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5 }}
          className="p-6 mt-5 mb-5 border border-4 shadow-lg rounded-lg"
        >
          <div className="mb-4 flex items-center justify-between">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 w-full sm:w-[500px] py-2 border-b-4 border-yellow-500 font-semibold text-lg outline-none shadow-sm"
            />
            <button
              onClick={openPopup}
              className="bg-yellow-400 p-2 rounded-md"
            >
              Download
            </button>
          </div>

          <div className="overflow-x-auto">
            {currentItems.length > 0 ? (
              <>
                <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                        Tour Details
                      </th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                        User Contact
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentItems.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                          {item.tourDetails}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">
                          {item.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">
                          {item.user}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">
                          {item.userContact}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <p className="text-center text-lg text-gray-500">No data found</p>
            )}
          </div>

          <div className="flex flex-wrap justify-center mt-4 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-sm disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 ${
                  currentPage === index + 1
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-300 text-gray-700"
                } rounded-lg shadow-sm`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </motion.div>
      </div>
      <DownloadModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default AdminFavourite;
