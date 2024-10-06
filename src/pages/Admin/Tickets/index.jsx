import React, { useState, useEffect } from "react";
import TicketCard from "./TicketCard"; // Adjust the path as needed
import DownloadModal from "./DowloadModal";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ManageTickets = () => {
  const mainUser = useSelector((state) => state.user.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly
  const [details, setDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);
  const lang = useSelector((state) => state.language.lang);
  const [searchQuery, setSearchQuery] = useState("");

  const openPopup = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleDownload = (format) => {
    setIsModalOpen(false);

    if (format === "pdf") {
      const doc = new jsPDF({ orientation: "portrait" });

      // Title
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("Ticket Details", 14, 22); // Changed "Invoices" to "Ticket Details"
      doc.setLineWidth(0.5);
      doc.line(14, 24, 200, 24); // Line below the title

      // Prepare data for autoTable
      const formattedData = details.map((item) => ({
        "Ticket ID": item?.uniqueId,
        "User Name": `${item?.user?.firstName} ${item?.user?.lastName}`,
        "User Email": item?.email,
        Category: item?.category?.title?.en,
        "Plan Title": item?.plan?.title?.en,
        "Total Price": `$${item?.totalPrice}`,
        "Adult Quantity": item?.adultQuantity,
        "Child Quantity": item?.childQuantity,
      }));

      // Define columns for the table
      const columns = [
        { header: "Ticket ID", dataKey: "Ticket ID" },
        { header: "User Name", dataKey: "User Name" },
        { header: "User Email", dataKey: "User Email" },
        { header: "Category", dataKey: "Category" },
        { header: "Plan Title", dataKey: "Plan Title" },
        { header: "Total Price", dataKey: "Total Price" },
        { header: "Adult Quantity", dataKey: "Adult Quantity" },
        { header: "Child Quantity", dataKey: "Child Quantity" },
      ];

      // Generate the table
      doc.autoTable({
        head: [columns.map((col) => col.header)],
        body: formattedData.map((item) =>
          columns.map((col) => item[col.dataKey])
        ),
        startY: 30,
        margin: { left: 10, right: 10 },
        styles: {
          overflow: "linebreak",
          fontSize: 10,
          cellPadding: 3,
          valign: "middle",
          halign: "center",
        },
        headStyles: {
          fillColor: [255, 204, 0],
          textColor: [0, 0, 0],
          fontSize: 12,
          fontStyle: "bold",
        },
        bodyStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
        },
        didDrawPage: (data) => {
          // Footer with page number
          doc.setFontSize(10);
          doc.text(
            `Page ${data.pageNumber}`,
            data.settings.margin.left,
            doc.internal.pageSize.height - 10
          );
        },
      });

      // Save the PDF
      doc.save("TicketDetails.pdf");
    } else if (format === "excel") {
      const excelData = details.map((item, index) => ({
        "Ticket Number": index + 1,
        "User Name": `${item?.user?.firstName} ${item?.user?.lastName}`,
        "User Email": item?.email,
        Category: item?.category?.title?.en,
        "Plan Title": item?.plan?.title?.en,
        "Total Price": `$${item?.totalPrice}`,
        "Adult Quantity": item?.adultQuantity,
        "Child Quantity": item?.childQuantity,
      }));

      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Ticket Details");

      // Adding header style
      const headerCellStyle = {
        fill: { fgColor: { rgb: "FFFF00" } },
        font: { bold: true },
        alignment: { horizontal: "center" },
      };

      // Apply header styles
      const headers =
        worksheet["!ref"].split(":")[0].slice(0, 1) +
        "1:" +
        worksheet["!ref"].split(":")[1].slice(0, 1) +
        "1";
      for (let cell in worksheet) {
        if (cell[0] === "!") continue; // Skip special properties
        if (cell.match(/^[A-Z]\d$/)) {
          // Check if it's a header cell
          worksheet[cell].s = headerCellStyle;
        }
      }

      // Adding borders to all cells
      const borderStyle = {
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      };

      for (let cell in worksheet) {
        if (cell[0] === "!") continue; // Skip special properties
        worksheet[cell].s = {
          ...(worksheet[cell].s || {}),
          ...borderStyle,
        };
      }

      // Write the file
      XLSX.writeFile(workbook, "TicketDetails.xlsx");
    }
  };

  const handleCancelTicket = async (id) => {
    try {
      const res = await axios.put(BASE_URL + "/admin/tickets-cancel/" + id);
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
        setDetails(res?.data?.data);
        setFilteredDetails(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const getStartAndEndDate = (filter) => {
    const now = new Date();
    let startDate = null;
    let endDate = null;

    if (filter === "week") {
      // Get the start and end of the current week (Sunday to Saturday)
      const startOfWeek = now.getDate() - now.getDay(); // Sunday
      startDate = new Date(now.setDate(startOfWeek));
      endDate = new Date(now.setDate(startOfWeek + 6)); // Saturday
    } else if (filter === "Month") {
      // Get the start and end of the current month
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of the month
    } else if (filter === "Year") {
      // Get the start and end of the current year
      startDate = new Date(now.getFullYear(), 0, 1);
      endDate = new Date(now.getFullYear(), 11, 31); // Last day of the year
    }

    // If filter is "All", no date filtering is needed
    return { startDate, endDate };
  };
  useEffect(() => {
    const filtered = details.filter((invoice) => {
      const invoiceDate = new Date(invoice.createdAt);

      // Search Query Filter
      const matchesSearchQuery =
        invoice.plan.title.en
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        invoice.category.title.en
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        invoice.firstName.toLowerCase().includes(searchQuery.toLowerCase());

      // Date Range Filter
      let startDateToUse = startDate;
      let endDateToUse = endDate;

      if (!startDate && !endDate) {
        const { startDate: filterStartDate, endDate: filterEndDate } =
          getStartAndEndDate(selectedFilter);
        startDateToUse = filterStartDate;
        endDateToUse = filterEndDate;
      }

      const isWithinDateRange =
        (!startDateToUse ||
          invoiceDate >= new Date(startDateToUse).setHours(0, 0, 0, 0)) &&
        (!endDateToUse ||
          invoiceDate <= new Date(endDateToUse).setHours(23, 59, 59, 999));

      return matchesSearchQuery && isWithinDateRange;
    });

    setFilteredDetails(filtered);
  }, [searchQuery, details, startDate, endDate, selectedFilter]);
  // const filteredDetails = details.filter((ticket) => {
  //     const ticketDate = new Date(ticket?.createdAt).setHours(0, 0, 0, 0);

  //     // Match search query
  //     const matchesSearchQuery =
  //         ticket?.user?.name
  //             ?.toLowerCase()
  //             ?.includes(searchQuery.toLowerCase()) ||
  //         ticket?.user?.email
  //             ?.toLowerCase()
  //             ?.includes(searchQuery.toLowerCase()) ||
  //         ticket?.category?.title?.en
  //             ?.toLowerCase()
  //             ?.includes(searchQuery.toLowerCase()) ||
  //         ticket?.plan?.title?.en
  //             ?.toLowerCase()
  //             ?.includes(searchQuery.toLowerCase()) ||
  //         ticket?.status?.toLowerCase()?.includes(searchQuery.toLowerCase());

  //     // Check if a custom date range is selected from DatePicker
  //     let startDateToUse = startDate?.setHours(0, 0, 0, 0);
  //     let endDateToUse = endDate?.setHours(0, 0, 0, 0);

  //     // If no custom date range is selected, use selectedFilter (week, month, year)
  //     if (!startDate && !endDate) {
  //         const { startDate: filterStartDate, endDate: filterEndDate } =
  //             getStartAndEndDate(selectedFilter);
  //         startDateToUse = filterStartDate;
  //         endDateToUse = filterEndDate;
  //     }
  //     // Apply date filtering based on the available date range (either DatePicker or selectedFilter)
  //     const isWithinDateRange =
  //         (!startDateToUse || ticketDate >= startDateToUse) &&
  //         (!endDateToUse || ticketDate <= endDateToUse);

  //     // Return true if both search query and date range filters match
  //     return matchesSearchQuery && isWithinDateRange;
  // });

  return (
    <div className="p-5 bg-gray-100">
      <div className="flex justify-between items-center flex-wrap">
        <h1 className="text-3xl font-bold mb-6">Manage Ticket Bookings</h1>
        <div className="flex gap-2 flex-wrap">
          {" "}
          <select
            className="px-5 rounded-md"
            value={selectedFilter}
            onChange={(e) => {
              setStartDate(null);
              setEndDate(null);
              setSelectedFilter(e.target.value);
            }} // Set selected filter
          >
            <option value="week">Current Week</option>
            <option value="Month">Current Month</option>
            <option value="Year">Current Year</option>
            <option value="All">All</option>
          </select>{" "}
          <div className="flex items-center gap-2">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              className="px-2 py-1 rounded-md shadow border-black"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
              className="px-2 py-1 rounded-md shadow border-black"
            />
          </div>
          <div className="">
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
      </div>
      <div className="flex flex-wrap gap-5 justify-center mt-5">
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
