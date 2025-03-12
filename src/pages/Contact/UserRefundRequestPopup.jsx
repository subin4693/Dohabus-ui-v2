import React, { useState } from "react";
import axios from "axios";

export default function UserRefundRequestPopup({ onClose }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL; // Set your BASE_URL properly

  const [uniqueId, setUniqueId] = useState("");
  const [reason, setReason] = useState("");
  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      // Make a POST request to request a refund
      const response = await axios.post(
        `${BASE_URL}/tickets/qpay-refund-request`,
        { uniqueId, reason, userName }
      );

      if (response.status === 200) {
        setSuccessMessage("Refund request submitted successfully!");
        // Optionally close the popup after a short delay
        setTimeout(() => onClose(), 2000);
      }
    } catch (error) {
      console.error("Error submitting refund request:", error);
      if (error.response && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage(
          "Something went wrong while submitting the refund request."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center mb-2">
          Request a Refund
        </h2>
        <p className="text-sm text-gray-600 text-center mb-4">
          Your refund request needs to be approved by DohaBus before the refund
          can be processed. Please use the inquiry refund status to check the
          status of your refund.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="userName" className="block mb-1 font-medium">
              Booking User Name
            </label>
            <input
              id="userName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your booking user name"
              className="w-full border-2 px-4 py-2 rounded-md focus:border-custom-yellow"
              required
            />
          </div>
          <div>
            <label htmlFor="uniqueId" className="block mb-1 font-medium">
              Invoice Number
            </label>
            <input
              id="uniqueId"
              type="text"
              value={uniqueId}
              onChange={(e) => setUniqueId(e.target.value)}
              placeholder="Enter your invoice number"
              className="w-full border-2 px-4 py-2 rounded-md focus:border-custom-yellow"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              You can find this number at the top of the invoice you received
              after your successful booking.
            </p>
          </div>
          <div>
            <label htmlFor="reason" className="block mb-1 font-medium">
              Reason for Cancellation
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Describe your reason"
              rows="4"
              className="w-full border-2 px-4 py-2 rounded-md focus:border-custom-yellow"
              required
            />
          </div>
          {errorMessage && (
            <p className="text-red-600 text-center">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-600 text-center">{successMessage}</p>
          )}
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`px-5 py-2 rounded-full transition duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-custom-yellow hover:bg-black hover:text-white"
              }`}
            >
              {loading ? "Submitting..." : "Submit Refund Request"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full border border-gray-300 hover:bg-gray-200 transition duration-300"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
