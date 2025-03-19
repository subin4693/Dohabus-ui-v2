// import React, { useState } from "react";
// import axios from "axios";
//
// export default function UserPaymentStatusPopup({ onClose }) {
//   const BASE_URL = import.meta.env.VITE_BASE_URL; // Set your BASE_URL properly
//
//   const [uniqueId, setUniqueId] = useState("");
//   const [statusMessage, setStatusMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//
//   const handleInquiry = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");
//     setStatusMessage("");
//     setLoading(true);
//
//     try {
//       const response = await axios.post(
//         `${BASE_URL}/tickets/qpay-payment-inquire`,
//         { uniqueId }
//       );
//
//       // Success response (HTTP 200)
//       if (response.status === 200) {
//         setStatusMessage(response.data.message);
//       }
//     } catch (error) {
//       console.error("Error checking payment status:", error.message);
//       if (error.response && error.response.data) {
//         const errData = error.response;
//
//         // Use the provided message or stringify the error data
//         setErrorMessage(errData.data.message);
//       } else {
//         setErrorMessage("Something went wrong while checking payment status.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
//         <div className="flex justify-between items-center border-b pb-3">
//           <h2 className="text-2xl font-bold text-stone-800">
//             Check Payment Status
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-600 hover:text-gray-800"
//           >
//             &times;
//           </button>
//         </div>
//         <p className="text-sm text-gray-600 text-center mb-4">
//           Please enter your booking unique ID to check the status of your
//           payment.
//         </p>
//         <form onSubmit={handleInquiry} className="space-y-4">
//           <div>
//             <label htmlFor="uniqueId" className="block mb-1 font-medium">
//               Booking Unique ID
//             </label>
//             <input
//               type="text"
//               id="uniqueId"
//               value={uniqueId}
//               onChange={(e) => setUniqueId(e.target.value)}
//               placeholder="Enter your booking unique ID"
//               className="w-full border-2 px-4 py-2 rounded-md focus:border-custom-yellow"
//               required
//             />
//           </div>
//           {errorMessage && (
//             <p className="text-red-600 text-center">
//               {typeof errorMessage === "object"
//                 ? JSON.stringify(errorMessage)
//                 : errorMessage}
//             </p>
//           )}
//           {statusMessage && (
//             <p className="text-green-600 text-center">{statusMessage}</p>
//           )}
//           <div className="flex justify-between mt-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`px-5 py-2 rounded-full transition duration-300 ${
//                 loading
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-custom-yellow hover:bg-black hover:text-white"
//               }`}
//             >
//               {loading ? "Checking..." : "Submit"}
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-5 py-2 rounded-full border border-gray-300 hover:bg-gray-200 transition duration-300"
//             >
//               Close
//             </button>
//           </div>
//         </form>
//         {/* {responseData && (
//           <div className="mt-6">
//             <h3 className="text-lg font-semibold mb-2">Response Details:</h3>
//             <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
//               {JSON.stringify(responseData, null, 2)}
//             </pre>
//           </div>
//         )} */}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";

export default function UserPaymentStatusPopup({ onClose }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL; // Set your BASE_URL properly

  const [uniqueId, setUniqueId] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInquiry = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setStatusMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/tickets/qpay-payment-inquire`,
        { uniqueId }
      );

      if (response.status === 200) {
        setStatusMessage(response.data.message);
        // Optionally, you can delay closing the popup or show the success message for a moment.
        // Then call onClose() which also triggers a ticket re-fetch in the parent.
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error("Error checking payment status:", error.message);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Something went wrong while checking payment status.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-bold text-stone-800">
            Check Payment Status
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            &times;
          </button>
        </div>
        <p className="text-sm text-gray-600 text-center mb-4">
          Please enter your booking unique ID to check the status of your
          payment.
        </p>
        <form onSubmit={handleInquiry} className="space-y-4">
          <div>
            <label htmlFor="uniqueId" className="block mb-1 font-medium">
              Booking Unique ID
            </label>
            <input
              type="text"
              id="uniqueId"
              value={uniqueId}
              onChange={(e) => setUniqueId(e.target.value)}
              placeholder="Enter your booking unique ID"
              className="w-full border-2 px-4 py-2 rounded-md focus:border-custom-yellow"
              required
            />
          </div>
          {errorMessage && (
            <p className="text-red-600 text-center">
              {typeof errorMessage === "object"
                ? JSON.stringify(errorMessage)
                : errorMessage}
            </p>
          )}
          {statusMessage && (
            <p className="text-green-600 text-center">{statusMessage}</p>
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
              {loading ? "Checking..." : "Submit"}
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
