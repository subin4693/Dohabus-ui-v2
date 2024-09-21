import React from "react";
import { BiTrash } from "react-icons/bi";

const OfferCard = ({ offer, handleStatus, handleRemove }) => {
  // Determine button styles based on the offer status
  const statusClass =
    offer.status === "active"
      ? "bg-green-500 text-white"
      : "bg-red-500 text-white";

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <img
        src={offer?.plan?.coverImage}
        alt={offer?.plan?.title?.en}
        className="w-full h-32 object-cover rounded mb-4"
      />
      <h3 className="text-lg font-bold mb-2">{offer?.plan?.title?.en}</h3>
      <p className="text-sm text-gray-600">Coupon Code: {offer?.couponCode}</p>
      <p className="text-sm text-gray-600">Start Date: {offer?.startingDate}</p>
      <p className="text-sm text-gray-600">End Date: {offer?.endingDate}</p>
      <p className="text-sm text-gray-600">
        Child Discount:{" "}
        {offer.childDiscountType === "percentage"
          ? `${offer?.childDiscountPrice}%`
          : `${offer?.childDiscountPrice} Qar`}
      </p>
      <p className="text-sm text-gray-600">
        Adult Discount:{" "}
        {offer.adultDiscountType === "percentage"
          ? `${offer?.adultDiscountPrice}%`
          : `${offer?.adultDiscountPrice} Qar`}
      </p>
      <p className="text-sm text-gray-600">Limit per User: {offer?.limit}</p>

      {/* Status Button */}
      <div className="flex justify-between items-center mt-4">
        <button
          className={`px-4 py-2 rounded ${statusClass}`}
          onClick={() => handleStatus(offer._id)}
        >
          {offer.status === "active" ? "Active" : "Canceled"}
        </button>
        <button onClick={() => handleRemove(offer._id)}>
          <BiTrash size={24} />
        </button>
      </div>
    </div>
  );
};

export default OfferCard;
