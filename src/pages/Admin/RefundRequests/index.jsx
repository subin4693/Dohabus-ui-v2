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
  // New state for toggling the sort order
  const [showRecentFirst, setShowRecentFirst] = useState(false);

  // Fetch refund requests
  useEffect(() => {
    const fetchRefundRequests = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tickets/refunds`);
        if (response.data && response.data.data) {
          console.log(response.data.data);

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

  // Combine filters and sort by created date based on the checkbox state
  useEffect(() => {
    let filtered = refundRequests;

    // Filter by status
    if (statusFilter !== "All") {
      filtered = filtered.filter((req) => req.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((req) => {
        const ticketUniqueId =
          typeof req.ticketId === "object"
            ? req.ticketId.uniqueId
            : req.ticketId;
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
        const end = endDate
          ? new Date(endDate)
          : new Date(Date.now() + 86400000);
        end.setHours(23, 59, 59, 999);
        return requestDate >= start && requestDate <= end;
      });
    }

    // Sort based on showRecentFirst checkbox
    filtered.sort((a, b) =>
      showRecentFirst
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt)
    );
    setFilteredRequests(filtered);
  }, [
    statusFilter,
    refundRequests,
    searchQuery,
    startDate,
    endDate,
    showRecentFirst,
  ]);

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

  const handleSortOrderChange = (e) => {
    setShowRecentFirst(e.target.checked);
  };

  // Returns a CSS class based on the refund status.
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-yellow-600 font-bold";
      case "approved":
        return "text-green-600 font-bold";
      case "rejected":
        return "text-red-600 font-bold";
      case "processing":
        return "text-blue-600 font-bold";
      default:
        return "";
    }
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
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
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Processing">Processing</option>
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

      {/* Date Range Filter and Sort Order Checkbox */}
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
        <div className="flex items-center">
          <label htmlFor="showRecentFirst" className="mr-2 font-medium">
            Show Recent First
          </label>
          <input
            type="checkbox"
            id="showRecentFirst"
            checked={showRecentFirst}
            onChange={handleSortOrderChange}
            className="h-4 w-4"
          />
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
                  typeof refund.ticketId === "object"
                    ? refund.ticketId.uniqueId
                    : refund.ticketId;
                return (
                  <tr key={refund._id} className="border-t border-stone-200">
                    <td className="py-3 px-4">{refund._id}</td>
                    <td className="py-3 px-4">{ticketUniqueId}</td>
                    <td className="py-3 px-4">{refund.reason}</td>
                    <td
                      className={`py-3 px-4 ${getStatusColor(refund.status)}`}
                    >
                      {refund.status}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(refund.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleViewDetails(refund)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        View Details
                      </button>
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
