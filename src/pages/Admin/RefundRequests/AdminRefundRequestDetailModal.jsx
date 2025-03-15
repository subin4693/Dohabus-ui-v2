import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminRefundRequestDetailModal({
  refundRequest,
  onClose,
}) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [ticketData, setTicketData] = useState(null);
  const [loadingTicket, setLoadingTicket] = useState(false);
  const [refundAmount, setRefundAmount] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  // Set default to true so that latest entries appear first
  const [showRecentFirst, setShowRecentFirst] = useState(true);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        setLoadingTicket(true);
        const ticketId =
          (typeof refundRequest.ticketId === "object" &&
            refundRequest.ticketId._id) ||
          refundRequest.ticketId;
        const res = await axios.get(`${BASE_URL}/tickets/${ticketId}`);
        setTicketData(res.data.data.ticket);
      } catch (error) {
        console.error("Error fetching ticket details:", error);
      } finally {
        setLoadingTicket(false);
      }
    };

    if (refundRequest?.ticketId) {
      fetchTicketDetails();
    }
  }, [refundRequest, BASE_URL]);

  const handleRefundApproval = async () => {
    setUpdateStatus("");
    setUpdateMessage("");

    if (!ticketData || !ticketData._id || !refundAmount) {
      setUpdateStatus("error");
      setUpdateMessage(
        "Ticket data is incomplete or refund amount is missing."
      );
      return;
    }

    try {
      const payload = {
        ticketId: ticketData._id,
        refundAmount,
        cancellationReason: cancelReason,
      };

      const res = await axios.post(`${BASE_URL}/tickets/qpay-refund`, payload);
      setUpdateStatus("success");
      setUpdateMessage("Cancellation initiated. " + res.data.message);
    } catch (error) {
      console.error("Cancellation error:", error);
      setUpdateStatus("error");
      setUpdateMessage(
        (error.response && error.response.data.message) ||
          "Cancellation failed. Please try again."
      );
    }
  };

  const handleRejectRefund = async () => {
    setUpdateStatus("");
    setUpdateMessage("");

    try {
      const ticketId =
        typeof refundRequest.ticketId === "object"
          ? refundRequest.ticketId._id
          : refundRequest.ticketId;
      const payload = { ticketId };

      const res = await axios.post(
        `${BASE_URL}/tickets/reject-refund`,
        payload
      );
      setUpdateStatus("success");
      setUpdateMessage(
        res.data.message || "Refund has been rejected by DohaBus."
      );
    } catch (error) {
      console.error("Error rejecting refund:", error);
      setUpdateStatus("error");
      setUpdateMessage(
        (error.response && error.response.data.error) ||
          "Failed to reject refund request."
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-5">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-5">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-bold text-stone-800">
            Refund Request Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            &times;
          </button>
        </div>
        {/* Refund Request Info */}
        <div className="my-4">
          <p>
            <strong>Refund ID:</strong> {refundRequest._id}
          </p>
          <p>
            <strong>Ticket Unique ID:</strong>{" "}
            {typeof refundRequest.ticketId === "object"
              ? refundRequest.ticketId.uniqueId
              : refundRequest.ticketId}
          </p>
          <p>
            <strong>Reason:</strong> {refundRequest.reason}
          </p>
          <p>
            <strong>Status:</strong> {refundRequest.status}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(refundRequest.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Refund History Table with Recent First Filter */}
        {refundRequest.history && refundRequest.history.length > 0 && (
          <div className="my-4">
            <div className="flex items-center mb-2">
              <label htmlFor="showRecentFirst" className="mr-2 font-medium">
                Show Recent First
              </label>
              <input
                type="checkbox"
                id="showRecentFirst"
                checked={showRecentFirst}
                onChange={(e) => setShowRecentFirst(e.target.checked)}
                className="h-4 w-4"
              />
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Created At</th>
                  <th className="border p-2">Message</th>
                </tr>
              </thead>
              <tbody>
                {refundRequest.history
                  .sort((a, b) =>
                    showRecentFirst
                      ? new Date(b.createdAt) - new Date(a.createdAt)
                      : new Date(a.createdAt) - new Date(b.createdAt)
                  )
                  .map((item, idx) => (
                    <tr key={idx}>
                      <td className="border p-2">
                        {new Date(item.createdAt).toLocaleString()}
                      </td>
                      <td className="border p-2">{item.message}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {loadingTicket ? (
          <p>Loading ticket details...</p>
        ) : ticketData ? (
          <div className="p-4 border rounded-md bg-white shadow mb-4">
            {/* Ticket Info */}
            <h3 className="text-xl font-semibold text-stone-700 mb-2">
              Ticket Details
            </h3>
            <p>
              <strong>Unique ID:</strong> {ticketData.uniqueId}
            </p>
            <p>
              <strong>Price:</strong> {ticketData.price} QAR
            </p>
            <p>
              <strong>Payment Status:</strong> {ticketData.paymentStatus}
            </p>
            <p>
              <strong>Session:</strong> {ticketData.session}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(ticketData.date).toLocaleDateString()}
            </p>
            {/* User Details */}
            <h3 className="text-xl font-semibold text-stone-700 mb-2">
              User Details
            </h3>
            <p>
              <strong>Name:</strong> {ticketData.firstName}{" "}
              {ticketData.lastName}
            </p>
            <p>
              <strong>Email:</strong> {ticketData.email}
            </p>
          </div>
        ) : (
          <p>Unable to fetch ticket info.</p>
        )}

        {/* Refund Approval Actions */}
        <div className="mb-4">
          <label htmlFor="refundAmount" className="block mb-1 font-medium">
            Refund Amount (QAR):
          </label>
          <input
            type="number"
            id="refundAmount"
            value={refundAmount}
            onChange={(e) => setRefundAmount(e.target.value)}
            className="w-full border-2 px-4 py-2 rounded-md mb-3"
          />
          <label htmlFor="cancelReason" className="block mb-1 font-medium">
            Cancellation Reason (optional):
          </label>
          <input
            type="text"
            id="cancelReason"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            placeholder="Reason for cancellation"
            className="w-full border-2 px-4 py-2 rounded-md mb-4"
          />
          <div className="flex gap-4">
            <button
              onClick={handleRefundApproval}
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 flex-1"
            >
              Approve Refund
            </button>
            <button
              onClick={handleRejectRefund}
              className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 flex-1"
            >
              Reject Refund
            </button>
          </div>
        </div>

        {/* Status Message */}
        {updateStatus && (
          <p
            className={`text-center text-lg font-medium ${
              updateStatus === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {updateMessage}
          </p>
        )}
      </div>
    </div>
  );
}
