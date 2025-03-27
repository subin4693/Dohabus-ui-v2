import React, { useState } from "react";
import UserTicketDetailsPopup from "./UserTicketDetailsPopup";

export default function UserTicketDetailsCheck({ onRefresh }) {
  const [showPopup, setShowPopup] = useState(false);

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
        Get Ticket Details
      </button>
      {showPopup && <UserTicketDetailsPopup onClose={handleClose} />}
    </div>
  );
}
