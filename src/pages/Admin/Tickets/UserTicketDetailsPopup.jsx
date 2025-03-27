import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UserTicketDetailsPopup({ onClose }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL; // Ensure this is set correctly
  const [uniqueId, setUniqueId] = useState("");
  const [ticket, setTicket] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  // Timer for auto closing if ticket not found
  useEffect(() => {
    let timer;
    if (errorMessage === "Ticket not found" && !ticket) {
      timer = setTimeout(() => {
        onClose();
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [errorMessage, ticket, onClose]);

  const handleInquiry = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setTicket(null);
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/tickets/inquire-ticket`, {
        uniqueId,
      });
      if (response.status === 200 && response.data.ticket) {
        setTicket(response.data.ticket);
      } else {
        setErrorMessage("Ticket not found");
      }
    } catch (error) {
      const msg =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Something went wrong while fetching ticket details.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (key, value) => {
    try {
      await navigator.clipboard.writeText(
        value === undefined || value === null ? String(value) : value.toString()
      );
      setCopiedField(key);
      // Reset the copied state after 2 seconds
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-8"
        style={{ height: "80vh" }}
      >
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-3xl font-bold text-stone-800">
            Get Ticket Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>
        </div>
        {!ticket && (
          <>
            <p className="text-sm text-gray-600 text-center mb-6">
              Please enter your booking unique ID to retrieve your ticket
              details.
            </p>
            <form onSubmit={handleInquiry} className="space-y-6">
              <div>
                <label
                  htmlFor="uniqueId"
                  className="block mb-2 text-lg font-medium text-gray-700"
                >
                  Booking Unique ID
                </label>
                <input
                  type="text"
                  id="uniqueId"
                  value={uniqueId}
                  onChange={(e) => setUniqueId(e.target.value)}
                  placeholder="Enter your booking unique ID"
                  className="w-full border-2 px-4 py-3 rounded-md focus:border-yellow-500"
                  required
                />
              </div>
              {errorMessage && (
                <p className="text-red-600 text-center">{errorMessage}</p>
              )}
              <div className="flex justify-between">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-3 rounded-full transition duration-300 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-yellow-500 hover:bg-yellow-600 text-white"
                  }`}
                >
                  {loading ? "Fetching..." : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-full border border-gray-300 hover:bg-gray-200 transition duration-300"
                >
                  Close
                </button>
              </div>
            </form>
          </>
        )}
        {ticket && (
          <div className="mt-4 h-full flex flex-col">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Ticket Details
            </h3>
            <div className="overflow-auto p-4 bg-gray-50 rounded-md flex-grow">
              {renderTicketDetails(ticket)}
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-full border border-gray-300 hover:bg-gray-200 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
