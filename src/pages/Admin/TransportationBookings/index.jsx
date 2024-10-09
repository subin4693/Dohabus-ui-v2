import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import DownloadModal from "./DownloadModal";

import "jspdf-autotable";

const HotelBookings = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [hotelBookings, setHotelBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const openPopup = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleDownload = (format) => {
    setIsModalOpen(false);

    const formattedData = hotelBookings.map((booking) => ({
      "Booking ID": booking._id || "N/A",
      "User Name": booking.name || "N/A",
      "Email": booking.email || "N/A",
      Date: booking.date || "N/A",
      Adults: String(booking.numberOfAdults || "N/A"),
      Children: String(booking?.pickupLocation || "N/A"),
      Transportation: booking.transId.title.en || "N/A",
    }));

    if (format === "pdf") {
      const doc = new jsPDF({ orientation: "landscape" }); // Use landscape orientation
      doc.setFontSize(16); // Title font size
      doc.text("Transportation Bookings Data", 14, 22);
      doc.setLineWidth(0.5);
      doc.line(14, 24, 280, 24); // Adjust the line width to fit landscape

      const columns = [
        { header: "Booking ID", dataKey: "Booking ID" },
        { header: "User Name", dataKey: "User Name" },
        { header: "Email", dataKey: "Email" },
        { header: "Date", dataKey: "Date" },
        { header: "Passangers", dataKey: "Adults" },
        { header: "Pick Up", dataKey: "Children" },
        { header: "Transportation", dataKey: "Transportation" },
      ];

      doc.autoTable({
        columns: columns,
        body: formattedData,
        startY: 30, // Start position for the table
        margin: { left: 10, right: 10 }, // Reduced margins for more space
        styles: {
          overflow: "linebreak",
          fontSize: 7, // Further reduced font size for better fit
          cellPadding: 1, // Reduced cell padding
          valign: "top", // Align text to the top of the cell
        },
        headStyles: {
          fillColor: [255, 204, 0],
          textColor: [0, 0, 0],
          fontSize: 8, // Slightly larger font size for headers
        },
        bodyStyles: {
          cellPadding: 2, // Increased cell padding for better readability
        },
        columnStyles: {
          0: { cellWidth: 20, minCellWidth: 20 }, // Adjusted widths with minimum cell width
          1: { cellWidth: 40, minCellWidth: 40 }, // Adjusted width for longer text
          2: { cellWidth: 30, minCellWidth: 30 },
          3: { cellWidth: 30, minCellWidth: 30 },
          4: { cellWidth: 30, minCellWidth: 30 },
          5: { cellWidth: 20, minCellWidth: 20 },
          6: { cellWidth: 20, minCellWidth: 20 },
          7: { cellWidth: 35, minCellWidth: 35 },
          8: { cellWidth: 35, minCellWidth: 35 },
        },
        didParseCell: (data) => {
          // Ensures text is wrapped properly and not cut off
          if (data.row.index === 0) {
            data.cell.styles.cellPadding = 2;
          }
        },
        didDrawPage: (data) => {
          // Add footer with page numbers if needed
          doc.text(
            `Page ${data.pageNumber}`,
            data.settings.margin.left,
            doc.internal.pageSize.height - 10
          );
        },
      });

      // Save the PDF
      doc.save("TransportationBookings.pdf");
    } else if (format === "excel") {
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      XLSX.utils.sheet_add_aoa(
        worksheet,
        [
          [
            "Booking ID",
            "Name",
            "Email",
            "Date",
            "Passangers",
            "Pickup",
            "Transportation",
          ],
        ],
        { origin: "A1" }
      );

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "HotelBookings");
      XLSX.writeFile(workbook, "TransportationBookingsData.xlsx");
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/transbook`);
        setHotelBookings(res.data.data.bookings || []);
      } catch (error) {
        setError("Something went wrong");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  console.log("Bookings", hotelBookings);

  const filteredBookings = hotelBookings.filter(
    (booking) =>
      booking._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking?.title?.en?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transportation Bookings</h1>
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
        <button onClick={openPopup} className="bg-yellow-400 p-2 rounded-md">
          Download
        </button>
      </div>

      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.5 }}
        className="overflow-x-auto"
      >
        <table className="w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border-b px-4 py-2">Booking ID</th>
              <th className="border-b px-4 py-2">Name</th>
              <th className="border-b px-4 py-2">Email</th>
              <th className="border-b px-4 py-2">Date</th>
              <th className="border-b px-4 py-2">Number of Passanger</th>
              <th className="border-b px-4 py-2">Pick Up</th>
              <th className="border-b px-4 py-2">Transportation</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((booking) => (
                <tr key={booking._id}>
                  <td className="border-b px-4 py-2">{booking?._id}</td>
                  <td className="border-b px-4 py-2">{booking?.name}</td>
                  <td className="border-b px-4 py-2">{booking?.email}</td>
                  <td className="border-b px-4 py-2">{booking?.date}</td>
                  <td className="border-b px-4 py-2">
                    {booking?.numberOfAdults}
                  </td>
                  <td className="border-b px-4 py-2">
                    {booking?.pickupLocation
}
                  </td>
                  <td className="border-b px-4 py-2">
                    {booking.transId.title?.en}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>

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

      <DownloadModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default HotelBookings;
