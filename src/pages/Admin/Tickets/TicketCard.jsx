import React from "react";

const TicketCard = ({ booking }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-5 border border-stone-300 flex flex-col md:flex-row gap-4">
            {/* Image Section */}
            <div className="flex-shrink-0">
                <img
                    src={booking.planImage}
                    alt="Plan"
                    className="h-[200px] object-cover rounded-lg border border-stone-200 shadow-sm"
                />
            </div>

            {/* Details Section */}
            <div className="flex-1">
                <h3 className="text-xl font-semibold mb-1">{booking.title}</h3>
                <p className="text-stone-600 mb-2">{booking.userName}</p>
                <p className="text-stone-500 mb-2">{booking.description}</p>
                <p className="text-stone-600 mb-2">
                    {booking.tourPlaces.join(", ")}
                </p>
                <p className="text-stone-600 mb-2">{booking.email}</p>
                <div className="flex justify-between items-center mt-4">
                    <div>
                        <span className="font-medium text-stone-800">
                            Tickets:
                        </span>{" "}
                        {booking.ticketCount}
                    </div>
                    <div>
                        <span className="font-medium text-stone-800">
                            Price:
                        </span>{" "}
                        {booking.price} Qat
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketCard;
