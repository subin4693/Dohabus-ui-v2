import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentResponse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentResult, setPaymentResult] = useState(null);

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

  // Assuming a status of "0000" means a successful payment.
  const isSuccess = paymentResult.status === "0000";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Payment {isSuccess ? "Successful" : "Failed"}
        </h2>
        <div
          className={`mb-6 p-4 rounded ${
            isSuccess ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <p className="text-center text-lg font-medium">
            {isSuccess
              ? "Your payment has been processed successfully."
              : "There was an error processing your payment."}
          </p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Payment Details</h3>
          <div className="space-y-2">
            {Object.entries(paymentResult).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b pb-1">
                <span className="font-medium">{key}:</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          {isSuccess ? (
            <button
              onClick={() =>
                navigate(`/invoice/${paymentResult.ticketId || "defaultId"}`)
              }
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded"
            >
              View Invoice
            </button>
          ) : (
            <button
              onClick={() => navigate("/")}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentResponse;
