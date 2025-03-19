// import React, { useState } from "react";
// import UserPaymentStatusPopup from "./UserPaymentStatusPopup";
//
// export default function UserPaymentStatusCheck() {
//   const [showPopup, setShowPopup] = useState(false);
//
//   return (
//     <div className="mt-8">
//       <button
//         type="button"
//         onClick={() => setShowPopup(true)}
//         className="w-[20rem] py-3 bg-custom-yellow hover:bg-black hover:text-white rounded-full text-lg font-semibold transition duration-300"
//       >
//         Check Payment Status
//       </button>
//       {showPopup && (
//         <UserPaymentStatusPopup onClose={() => setShowPopup(false)} />
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import UserPaymentStatusPopup from "./UserPaymentStatusPopup";

export default function UserPaymentStatusCheck({ onRefresh }) {
  const [showPopup, setShowPopup] = useState(false);

  // When the payment status check completes, close the popup and refresh tickets.
  const handleClose = () => {
    setShowPopup(false);
    if (onRefresh) {
      onRefresh();
    }
  };

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={() => setShowPopup(true)}
        className="w-[20rem] py-3 bg-custom-yellow hover:bg-black hover:text-white rounded-full text-lg font-semibold transition duration-300"
      >
        Check Payment Status
      </button>
      {showPopup && <UserPaymentStatusPopup onClose={handleClose} />}
    </div>
  );
}
