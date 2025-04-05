import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function UserTicketDetailsPopup({ onClose }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL; // Ensure this is set correctly

  // State for search functionality
  const [filterBy, setFilterBy] = useState("uniqueId");
  const [filterValue, setFilterValue] = useState("");
  const [tickets, setTickets] = useState([]);
  const [searchErrorMessage, setSearchErrorMessage] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  // State for single ticket inquiry
  const [ticket, setTicket] = useState(null);
  const [inquiryErrorMessage, setInquiryErrorMessage] = useState("");
  const [inquiryLoading, setInquiryLoading] = useState(false);

  // Payment status states for individual tickets, using ticket uniqueId as key
  const [paymentStatus, setPaymentStatus] = useState({});

  const [copiedField, setCopiedField] = useState(null);
  const filterInputRef = useRef(null);

  // Focus the filter input on mount for improved UX
  useEffect(() => {
    if (filterInputRef.current) {
      filterInputRef.current.focus();
    }
  }, []);

  // When ticket not found in inquiry mode, auto-close popup after a short delay
  useEffect(() => {
    let timer;
    if (inquiryErrorMessage === "Ticket not found" && !ticket) {
      timer = setTimeout(() => {
        onClose();
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [inquiryErrorMessage, ticket, onClose]);

  // Search for tickets based on filter criteria
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setSearchErrorMessage("");
    setTickets([]);
    setSearchLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/tickets/search-tickets`, {
        filterBy,
        filterValue,
      });
      if (response.status === 200 && response.data.tickets) {
        setTickets(response.data.tickets);
      } else {
        setSearchErrorMessage("No tickets found");
      }
    } catch (error) {
      const msg =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Something went wrong while searching for tickets.";
      setSearchErrorMessage(msg);
    } finally {
      setSearchLoading(false);
    }
  };

  // Inquire single ticket details using uniqueId (called from the search table)
  const handleInquiry = async (uniqueIdParam) => {
    setInquiryErrorMessage("");
    setTicket(null);
    setInquiryLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/tickets/inquire-ticket`, {
        uniqueId: uniqueIdParam,
      });
      if (response.status === 200 && response.data.ticket) {
        setTicket(response.data.ticket);
      } else {
        setInquiryErrorMessage("Ticket not found");
      }
    } catch (error) {
      const msg =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Something went wrong while fetching ticket details.";
      setInquiryErrorMessage(msg);
    } finally {
      setInquiryLoading(false);
    }
  };

  // Check payment status using the provided logic; then refresh search results.
  const handlePaymentStatus = async (uniqueIdParam) => {
    setPaymentStatus((prev) => ({
      ...prev,
      [uniqueIdParam]: { loading: true, message: "", error: "" },
    }));

    try {
      const response = await axios.post(`${BASE_URL}/tickets/payment-inquire`, {
        uniqueId: uniqueIdParam,
      });
      console.log(response);

      if (response.status === 200) {
        if (response.data.message === "Payment processed successfully.") {
          setPaymentStatus((prev) => ({
            ...prev,
            [uniqueIdParam]: {
              loading: false,
              message: response.data.message,
              error: "",
            },
          }));
        } else {
          setPaymentStatus((prev) => ({
            ...prev,
            [uniqueIdParam]: {
              loading: false,
              message: "",
              error: response.data.message,
            },
          }));
        }

        setTimeout(() => {
          handleSearch();
        }, 3000);
      }
    } catch (error) {
      const errMsg =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Something went wrong while checking payment status.";
      setPaymentStatus((prev) => ({
        ...prev,
        [uniqueIdParam]: { loading: false, message: "", error: errMsg },
      }));
    }
  };

  // Copy value to clipboard
  const handleCopy = async (key, value) => {
    try {
      await navigator.clipboard.writeText(
        value === undefined || value === null ? String(value) : value.toString()
      );
      setCopiedField(key);
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopiedField(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Render ticket details in a key/value grid with copy-to-clipboard
  const renderTicketDetails = (ticketObj) => {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto"
        style={{ maxHeight: "calc(80vh - 200px)" }}
      >
        {Object.entries(ticketObj).map(([key, value]) => (
          <div key={key} className="flex flex-col border p-2 rounded-md">
            <span className="text-sm font-semibold text-gray-700">{key}</span>
            <div
              className="mt-1 cursor-pointer p-1 rounded-md relative group"
              onClick={() => handleCopy(key, value)}
            >
              <span className="text-base text-gray-800">
                {value === undefined || value === null
                  ? String(value)
                  : value.toString()}
              </span>
              <span className="absolute right-2 top-1 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {copiedField === key ? "Copied!" : "Click to copy"}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render the search results table
  const renderTicketsTable = () => {
    if (!tickets.length) return null;
    return (
      <table className="w-full border-collapse mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Filter Value</th>
            <th className="border p-2">Unique ID</th>
            <th className="border p-2">Customer Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Number</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Payment Method</th>
            <th className="border p-2">Payment Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticketItem) => (
            <tr key={ticketItem._id}>
              <td className="border p-2">
                {filterBy === "customer name"
                  ? `${ticketItem.firstName} ${ticketItem.lastName}`
                  : ticketItem[filterBy] || "N/A"}
              </td>
              <td className="border p-2">{ticketItem.uniqueId}</td>
              <td className="border p-2">
                {ticketItem.firstName} {ticketItem.lastName}
              </td>
              <td className="border p-2">{ticketItem.email}</td>
              <td className="border p-2">{ticketItem.number}</td>
              <td className="border p-2">{ticketItem.price}</td>
              <td className="border p-2">{ticketItem.paymentMethod}</td>
              <td className="border p-2">{ticketItem.paymentStatus}</td>
              <td className="border p-2">
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => handleInquiry(ticketItem.uniqueId)}
                    className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    View Ticket
                  </button>
                  <button
                    onClick={() => handlePaymentStatus(ticketItem.uniqueId)}
                    className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    {paymentStatus[ticketItem.uniqueId]?.loading
                      ? "Checking..."
                      : "Check Payment Status"}
                  </button>
                  {(paymentStatus[ticketItem.uniqueId]?.message ||
                    paymentStatus[ticketItem.uniqueId]?.error) && (
                    <div className="text-xs mt-1">
                      {paymentStatus[ticketItem.uniqueId]?.message && (
                        <span className="text-green-600">
                          {paymentStatus[ticketItem.uniqueId].message}
                        </span>
                      )}
                      {paymentStatus[ticketItem.uniqueId]?.error && (
                        <span className="text-red-600">
                          {paymentStatus[ticketItem.uniqueId].error}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // If a full ticket is selected, show its details and provide a way to go back to search
  if (ticket) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
        <div
          className="bg-white rounded-lg shadow-xl w-full max-w-7xl p-8 overflow-auto"
          style={{ height: "80vh" }}
        >
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <h2 className="text-3xl font-bold text-stone-800">
              Ticket Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
          </div>
          {inquiryErrorMessage && (
            <p className="text-red-600 text-center">{inquiryErrorMessage}</p>
          )}
          {inquiryLoading ? (
            <p className="text-center">Fetching ticket details...</p>
          ) : (
            <>
              <div className="overflow-auto p-4 bg-gray-50 rounded-md">
                {renderTicketDetails(ticket)}
              </div>
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => {
                    // Clear the current ticket to go back to search view
                    setTicket(null);
                  }}
                  className="px-6 py-3 rounded-full border border-gray-300 hover:bg-gray-200 transition duration-300"
                >
                  Back to Search
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // Main search and inquiry view
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-7xl p-8 overflow-auto"
        style={{ maxHeight: "90vh" }}
      >
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-3xl font-bold text-stone-800">Search Tickets</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <label className="text-lg font-medium text-gray-700">
              Filter By:
            </label>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="border-2 px-4 py-3 rounded-md focus:border-yellow-500"
            >
              <option value="uniqueId">Unique ID</option>
              <option value="email">Customer Email</option>
              <option value="customer name">Customer Name</option>
              <option value="number">Customer Number</option>
              <option value="price">Price</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="filterValue"
              className="block mb-2 text-lg font-medium text-gray-700"
            >
              Filter Value
            </label>
            <input
              ref={filterInputRef}
              type="text"
              id="filterValue"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              placeholder="Enter value to search"
              className="w-full border-2 px-4 py-3 rounded-md focus:border-yellow-500"
              required
            />
            {filterBy === "number" && (
              <p className="text-xs text-gray-500 mt-1">
                Please type the number without the "+" symbol.
              </p>
            )}
          </div>
          {searchErrorMessage && (
            <p className="text-red-600 text-center">{searchErrorMessage}</p>
          )}
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              disabled={searchLoading}
              className={`px-6 py-3 rounded-full transition duration-300 ${
                searchLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600 text-white"
              }`}
            >
              {searchLoading ? "Searching..." : "Search Tickets"}
            </button>
            <button
              type="button"
              onClick={() => {
                // Reset the search form and results
                setFilterValue("");
                setTickets([]);
                setSearchErrorMessage("");
                if (filterInputRef.current) {
                  filterInputRef.current.focus();
                }
              }}
              className="px-6 py-3 rounded-full border border-gray-300 hover:bg-gray-200 transition duration-300"
            >
              Reset
            </button>
          </div>
        </form>
        {renderTicketsTable()}
      </div>
    </div>
  );
}
