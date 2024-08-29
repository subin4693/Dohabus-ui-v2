import React from "react";
import { BiTrash } from "react-icons/bi";
import axios from "axios";

const TicketCard = ({ booking, lang, handleCancelTicket }) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    return (
        <div
            className={`bg-white shadow-lg rounded-lg p-5 border  flex flex-col md:flex-row gap-4 ${booking.status.toLowerCase() !== "booked" ? "border-2 border-red-500 " : " border-stone-300 "}`}
        >
            <div className="flex-shrink-0">
                <img
                    src={booking && booking?.plan?.coverImage}
                    alt="Plan"
                    className="h-[200px] object-cover rounded-lg border border-stone-200 shadow-sm"
                />
            </div>

            {/* Details Section */}
            <div className="flex-1 group">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold mb-1">
                        {booking && booking?.plan?.title[lang]}
                    </h3>
                    {booking.status.toLowerCase() === "booked" ? (
                        <div
                            className="p-1 rounded-md bg-gray-100 text-red-500  cursor-pointer flex items-center space-x-2"
                            onClick={() => handleCancelTicket(booking._id)}
                        >
                            <BiTrash className="w-6 h-6" />
                            <span>cancel</span>
                        </div>
                    ) : (
                        <div
                            className="p-1 rounded-md  text-white px-2  cursor-pointer flex items-center space-x-2 bg-red-500"
                            onClick={() => handleCancelTicket(booking._id)}
                        >
                            Canceled
                        </div>
                    )}
                </div>
                <p className="text-stone-600 mb-2">
                    {booking && booking?.user?.name}
                </p>{" "}
                <p className="text-stone-600 mb-2">
                    {booking && booking?.user?.email}
                </p>
                <p className="text-stone-500 mb-2 line-clamp-3">
                    {booking && booking?.plan?.description[lang]}
                </p>
                <div className="flex justify-between items-center mt-4">
                    <div>
                        <span className="font-medium text-stone-800">
                            Child Tickets:
                        </span>{" "}
                        {booking && booking?.childQuantity}
                    </div>
                    <div>
                        <span className="font-medium text-stone-800">
                            Adult Tickets:
                        </span>{" "}
                        {booking && booking?.adultQuantity}
                    </div>
                    <div>
                        <span className="font-medium text-stone-800">
                            Price:
                        </span>{" "}
                        {booking && booking?.totalPrice} Qat
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketCard;
