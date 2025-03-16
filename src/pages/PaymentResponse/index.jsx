import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentResponse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentResult, setPaymentResult] = useState(null);

  // A helper mapping for common error status codes.
  // You can expand this mapping as needed.
  const errorMapping = {
    // QPay error codes (example values from EZConnect)
    "EZConnect-0001": "Missing 'Action' parameter.",
    "EZConnect-0002": "Missing 'BankID' parameter.",
    "EZConnect-0003": "Missing 'PUN' parameter.",
    "EZConnect-0004": "Missing 'MerchantID' parameter.",
    "EZConnect-0005": "Merchant is not available.",
    "EZConnect-0006": "Merchant is not configured for payment.",
    "EZConnect-0007": "Secret key is not configured.",
    "EZConnect-0008": "Merchant IP is not supported.",
    "EZConnect-0009": "Secure hash validation failed.",
    "EZConnect-0010": "Missing SecureHash parameter.",
    "EZConnect-0012": "Missing language parameter.",
    "EZConnect-0013": "Missing Original Transaction Unique Number.",
    "EZConnect-0014": "Missing Amount parameter.",
    "EZConnect-0015": "Missing CurrencyCode parameter.",
    "EZConnect-0016": "Invalid amount value received.",
    "EZConnect-0017": "Invalid amount format received.",
    "EZConnect-0018": "Invalid action type sent.",
    "EZConnect-0019": "Missing TransactionRequestDate parameter.",
    // CyberSource example reason codes:
    101: "Payment declined: Card expired.",
    102: "Payment declined: Insufficient funds.",
    202: "Payment declined: Suspected fraud.",
    4100: "Payment has been rejected due to risk rule violation.",
    // Refund or other codes (if applicable)
    5003: "Refund Transaction rejected.",
    5004: "Original transaction not found for refund.",
    5006: "The provided currency does not match the original transaction's currency.",
    5007: "Abnormal error occurred during refund.",
    5008: "Refund amount is higher than the booking amount.",
    5011: "Refund rejected: transaction has a pending chargeback.",
    5012: "Refund rejected: transaction has already been charged back.",
    5013: "Original transaction for refund requires reversal.",
    5015: "The transaction is already refunded.",
    5018: "The original transaction is not a Pay transaction.",
    5019: "Payment validation failed.",
    8107: "Refund amount must be greater than 0.",
    8108: "Transaction currency not supported.",
    8200: "Current action is not supported for this merchant.",
    8201: "Current IP is not valid for this merchant.",
    8300: "Backend is inactive, refund cannot be performed.",
    9001: "Unknown backend error, please try again.",
  };

  // Determine if the payment is successful.
  // For QPay, status "0000" means success; for CyberSource, "accept" (case-insensitive) means success.
  const isSuccess = () => {
    if (!paymentResult || !paymentResult.status) return false;
    const status = paymentResult.status.toLowerCase();
    return status === "0000" || status === "accept";
  };

  useEffect(() => {
    // Parse query parameters from URL
    const params = new URLSearchParams(location.search);
    const data = {};
    for (const [key, value] of params.entries()) {
      data[key] = value;
    }
    console.log("Payment response received:", data);
    setPaymentResult(data);
  }, [location]);

  if (!paymentResult) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl">Loading payment response...</p>
      </div>
    );
  }

  // For failures, use the provided error message or fallback to mapping
  let displayMessage = "";
  if (isSuccess()) {
    displayMessage =
      "Your payment has been processed successfully. Thank you for your purchase!";
  } else {
    // Use the error message from backend if available
    displayMessage =
      paymentResult.message ||
      paymentResult.error ||
      errorMapping[paymentResult.status] ||
      "There was an error processing your payment. Please try again or contact support.";
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Payment {isSuccess() ? "Successful" : "Failed"}
        </h2>
        <div
          className={`mb-6 p-4 rounded text-center text-lg font-medium ${
            isSuccess()
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {displayMessage}
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Transaction Details</h3>
          <div className="space-y-2">
            {Object.entries(paymentResult).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b pb-1">
                <span className="font-medium">{key}:</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          {isSuccess() ? (
            <button
              onClick={() =>
                navigate(`/invoice/${paymentResult.ticketId || "defaultId"}`)
              }
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded"
            >
              View Invoice
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate(-3)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
              >
                Contact Support
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentResponse;
