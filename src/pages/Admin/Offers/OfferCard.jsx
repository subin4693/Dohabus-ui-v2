import React from "react";

const OfferCard = ({ offer, handleStatus }) => {
    // Determine button styles based on the offer status
    console.log(offer);
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
            <p className="text-sm text-gray-600">
                Coupon Code: {offer?.couponCode}
            </p>
            <p className="text-sm text-gray-600">
                Start Date: {offer?.startingDate}
            </p>
            <p className="text-sm text-gray-600">
                End Date: {offer?.endingDate}
            </p>
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
            <p className="text-sm text-gray-600">
                Limit per User: {offer?.limit}
            </p>

            {/* Status Button */}
            <button
                className={`mt-4 px-4 py-2 rounded ${statusClass}`}
                onClick={() => handleStatus(offer._id)}
            >
                {offer.status === "active" ? "Active" : "Canceled"}
            </button>
        </div>
    );
};

export default OfferCard;
