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

  // State to store inquiry results by ticket unique ID.
  // Each entry will include: loading, error, result and paymentMethod.
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
  // Updated to accept paymentMethod as a parameter.
  const handleRefundInquiry = async (uniqueId, paymentMethod) => {
    // Set inquiry state to loading, store paymentMethod along with result.
    setInquiryResults((prev) => ({
      ...prev,
      [uniqueId]: { loading: true, error: null, result: null, paymentMethod },
    }));

    try {
      const response = await axios.post(`${BASE_URL}/tickets/refund-inquire`, {
        uniqueId,
      });

      setInquiryResults((prev) => ({
        ...prev,
        [uniqueId]: {
          loading: false,
          error: null,
          result: response.data,
          paymentMethod,
        },
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
        [uniqueId]: {
          loading: false,
          error: errorMessage,
          result: null,
          paymentMethod,
        },
      }));
      toast.error("Failed to get refund inquiry.", { theme: "dark" });
    }
  };

  // Updated renderInquiryResult: Check the paymentMethod before checking for result.data.
  const renderInquiryResult = (result, paymentMethod) => {
    // For QPay we ignore the result.data check.
    if (paymentMethod === "qpay") {
      if (result && result.originalStatus) {
        const inquiryStatus = result.originalStatus;
        const displayStatus =
          inquiryStatus === "0000"
            ? "TRANSMITTED"
            : inquiryStatus === "5002"
            ? "PENDING"
            : "REJECTED";

        let statusColor = "";
        if (displayStatus === "PENDING") {
          statusColor = "text-yellow-600 font-bold";
        } else if (displayStatus === "TRANSMITTED") {
          statusColor = "text-green-600 font-bold";
        } else {
          statusColor = "text-red-600 font-bold";
        }
        return <div className={statusColor}>Status: {displayStatus}</div>;
      } else {
        return null;
      }
    } else {
      // For cybersource, ensure result.data exists.
      if (!result || !result.data) return null;
      const inquiryStatus = result.data?.status;
      const displayStatus =
        inquiryStatus === "TRANSMITTED" || inquiryStatus === "PENDING"
          ? inquiryStatus
          : "REJECTED";

      let statusColor = "";
      if (displayStatus === "TRANSMITTED") {
        statusColor = "text-green-600 font-bold";
      } else if (displayStatus === "PENDING") {
        statusColor = "text-yellow-600 font-bold";
      } else {
        statusColor = "text-red-600 font-bold";
      }
      return <div className={statusColor}>Status: {displayStatus}</div>;
    }
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
              <th className="py-3 px-4 text-left">Payment Method</th>
              <th className="py-3 px-4 text-left">Reason</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Created At</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
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
                    <td className="py-3 px-4">
                      {refund.paymentMethod || "Unknown"}
                    </td>
                    <td className="py-3 px-4">{refund.reason}</td>
                    <td className="py-3 px-4">
                      <span className={getStatusColor(refund.status)}>
                        {refund.status}
                      </span>
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
                            onClick={() =>
                              handleRefundInquiry(
                                ticketUniqueId,
                                refund.paymentMethod
                              )
                            }
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
                            {renderInquiryResult(
                              inquiryState.result,
                              refund.paymentMethod
                            )}
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
