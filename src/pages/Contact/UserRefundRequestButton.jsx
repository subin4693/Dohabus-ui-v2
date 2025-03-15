import React, { useState } from "react";

import UserRefundRequestPopup from "./UserRefundRequestPopup";

import UserRefundRequestPopup from "./userRefundRequestPopup";


export default function UserRefundRequestButton() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={() => setShowPopup(true)}
        className="w-full py-3 bg-custom-yellow hover:bg-black hover:text-white rounded-full text-lg font-semibold transition duration-300"
      >
        Cancel Existing Booking?
      </button>
      {showPopup && (
        <UserRefundRequestPopup onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
}
