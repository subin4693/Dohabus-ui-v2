import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminRefundRequestDetailModal from "./AdminRefundRequestDetailModal";
import { toast } from "react-toastify";

export default function AdminRefundRequestsPage() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [refundRequests, setRefundRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // State to store inquiry results by ticket unique ID
  const [inquiryResults, setInquiryResults] = useState({});

  // Updated helper: returns CSS class based on the new refund.status field
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending Approval":
        return "text-yellow-600 font-bold";
      case "Request Forwarded":
        return "text-blue-600 font-bold";
      case "Refunded":
        return "text-green-600 font-bold";
      case "Rejected":
        return "text-red-600 font-bold";
      default:
        return "";
    }
  };

  // Fetch refund requests on mount
  useEffect(() => {
    const fetchRefundRequests = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tickets/refunds`);
        if (response.data && response.data.data) {
          setRefundRequests(response.data.data.refunds);
          setFilteredRequests(response.data.data.refunds);
        }
      } catch (error) {
        console.error("Error fetching refund requests:", error);
        toast.error("Failed to load refund requests.", { theme: "dark" });
      }
    };
    fetchRefundRequests();
  }, [BASE_URL]);

  // Combine filters and always sort by newest first
  useEffect(() => {
    let filtered = [...refundRequests];

    // Filter out refund requests with deleted ticket (i.e. no valid ticket ID)
    filtered = filtered.filter((req) => req.ticketId?.uniqueId || req.ticketId);

    // Filter by status if not "All"
    if (statusFilter !== "All") {
      filtered = filtered.filter((req) => req.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((req) => {
        const ticketUniqueId = req.ticketId?.uniqueId || req.ticketId;
        return (
          (req.reason &&
            req.reason.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (ticketUniqueId &&
            ticketUniqueId.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (req._id && req._id.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      });
    }

    // Filter by date range
    if (startDate || endDate) {
      filtered = filtered.filter((req) => {
        const requestDate = new Date(req.createdAt);
        const start = startDate ? new Date(startDate) : new Date(0);
        const endObj = endDate
          ? new Date(endDate)
          : new Date(Date.now() + 86400000);
        endObj.setHours(23, 59, 59, 999);
        return requestDate >= start && requestDate <= endObj;
      });
    }

    // Always sort by newest first
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredRequests(filtered);
  }, [statusFilter, refundRequests, searchQuery, startDate, endDate]);

  // Handlers for filters and search
  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleViewDetails = (refund) => {
    setSelectedRefund(refund);
  };

  const handleCloseModal = () => {
    setSelectedRefund(null);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  // Refund Inquiry handler (POST to /tickets/refund-inquire)
  const handleRefundInquiry = async (uniqueId) => {
    // Set inquiry state to loading
    setInquiryResults((prev) => ({
      ...prev,
      [uniqueId]: { loading: true, error: null, result: null },
    }));

    try {
      const response = await axios.post(`${BASE_URL}/tickets/refund-inquire`, {
        uniqueId,
      });
      console.log("Refund inquiry response status:", response);

      setInquiryResults((prev) => ({
        ...prev,
        [uniqueId]: { loading: false, error: null, result: response.data },
      }));

      toast.success("Refund inquiry successful.", { theme: "dark" });
    } catch (error) {
      console.error("Refund inquiry error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "An unexpected error occurred during refund inquiry.";
      setInquiryResults((prev) => ({
        ...prev,
        [uniqueId]: { loading: false, error: errorMessage, result: null },
      }));
      toast.error("Failed to get refund inquiry.", { theme: "dark" });
    }
  };

  // Render a simplified inquiry result showing only the status.
  // (Logic in renderInquiryResult remains unchanged.)
  const renderInquiryResult = (result) => {
    if (!result || !result.data) return null;
    const inquiryStatus = result.data?.status;
    console.log("Inquiry Status:", inquiryStatus);

    // If status is TRANSMITTED or PENDING, show that; otherwise, show REJECTED.
    const displayStatus =
      inquiryStatus === "TRANSMITTED" || inquiryStatus === "PENDING"
        ? inquiryStatus
        : "REJECTED";

    // Set color based on the display status using getStatusColor mapping
    let statusColor = "";
    if (displayStatus === "TRANSMITTED") {
      // For inquiry result, you could use blue for "TRANSMITTED" if desired,
      // but here we reuse our mapping from the refund record if needed.
      statusColor = "text-green-600 font-bold";
    } else if (displayStatus === "PENDING") {
      statusColor = "text-yellow-600 font-bold";
    } else {
      statusColor = "text-red-600 font-bold";
    }

    return <div className={statusColor}>Status: {displayStatus}</div>;
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      {/* Title, status filter, search input */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h1 className="text-3xl font-bold text-stone-800 mb-4 sm:mb-0">
          Manage Refund Requests
        </h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={handleFilterChange}
            className="px-4 py-2 rounded-md border border-stone-300"
          >
            <option value="All">All</option>
            <option value="Pending Approval">Pending Approval</option>
            <option value="Request Forwarded">Request Forwarded</option>
            <option value="Refunded">Refunded</option>
            <option value="Rejected">Rejected</option>
          </select>
          <input
            type="text"
            placeholder="Search by Ticket ID, Refund ID, or Reason"
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-4 py-2 rounded-md border border-stone-300"
          />
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <div className="flex gap-4">
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={handleStartDateChange}
              className="mt-1 px-4 py-2 rounded-md border border-stone-300"
            />
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700"
            >
              End Date:
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={handleEndDateChange}
              className="mt-1 px-4 py-2 rounded-md border border-stone-300"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow border border-stone-200">
          <thead className="bg-yellow-400 text-dark">
            <tr>
              <th className="py-3 px-4 text-left">Refund ID</th>
              <th className="py-3 px-4 text-left">Ticket Unique ID</th>
              <th className="py-3 px-4 text-left">Reason</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Created At</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No refund requests found.
                </td>
              </tr>
            ) : (
              filteredRequests.map((refund) => {
                const ticketUniqueId =
                  refund.ticketId?.uniqueId || refund.ticketId;
                const inquiryState = inquiryResults[ticketUniqueId] || {};

                return (
                  <tr key={refund._id} className="border-t border-stone-200">
                    <td className="py-3 px-4">{refund._id}</td>
                    <td className="py-3 px-4">
                      {ticketUniqueId || "Ticket Deleted"}
                    </td>
                    <td className="py-3 px-4">{refund.reason}</td>
                    {/* Updated table column: using new refund.status and new getStatusColor mapping */}
                    <td
                      className={`py-3 px-4 ${getStatusColor(refund.status)}`}
                    >
                      {refund.status}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(refund.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewDetails(refund)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleRefundInquiry(ticketUniqueId)}
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                          >
                            Refund Inquiry
                          </button>
                        </div>
                        {/* Inquiry Results or Loading */}
                        {inquiryState.loading && (
                          <span className="text-blue-500 mt-2">
                            Loading inquiry...
                          </span>
                        )}
                        {inquiryState.error && (
                          <span className="text-red-500 mt-2">
                            Error: {inquiryState.error}
                          </span>
                        )}
                        {inquiryState.result && !inquiryState.loading && (
                          <div className="mt-2 whitespace-pre-wrap">
                            {renderInquiryResult(inquiryState.result)}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {selectedRefund && (
        <AdminRefundRequestDetailModal
          refundRequest={selectedRefund}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
