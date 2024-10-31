import * as React from "react";
import { useState } from "react";
import Loader from "../../components/Loader";

// Popup component for showing adultData and childData
const DataPopup = ({
    isOpen,
    onClose,
    adultData,
    childData,
    handleSelect,
    setSelectedAdult,
    setSelectedChild,
    toast,
    setTotalPrice,
    selectedAdultData,
    setSelectedAdultData,
    selectedChildData,
    setSelectedChildData,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md w-1/2">
                <h2 className="text-xl font-bold mb-4">Select Ticket Option</h2>

                {/* Adult Pax Section */}
                <h3 className="text-lg font-semibold mb-2">Adult Pax</h3>
                <table className="w-full text-left border-collapse mb-6">
                    <thead>
                        <tr>
                            <th className="border p-2">Pax</th>
                            <th className="border p-2">Price (QAR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adultData.map((adult) => (
                            <tr key={adult._id}>
                                <td className="border p-2">{adult.pax}</td>
                                <td className="border p-2">{adult.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Child Pax Section */}
                <h3 className="text-lg font-semibold mb-2">Child Pax</h3>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="border p-2">Pax</th>
                            <th className="border p-2">Price (QAR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {childData.map((child) => (
                            <tr key={child._id}>
                                <td className="border p-2">{child.pax}</td>
                                <td className="border p-2">{child.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Close Button */}
                <button
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                    onClick={() => {
                        onClose();
                    }}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default function TicketBooking({
    data,
    adultCount,
    childCount,
    lang,
    user,
    selectedDate,
    session,
    navigate,
    toast,
    handleTicketCountChange,
    setTotalPrice,
    totalPrice,
    selectedAdultData,
    setSelectedAdultData,
    selectedChildData,
    setSelectedChildData,
    addOnTotalCost,
    handleBooking,
    adultPrice,
    setAdultPrice,
    childPrice,
    setChildPrice,
    totalAddOnCost,
    loading,
}) {
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedAdult, setSelectedAdult] = useState(null);
    const [selectedChild, setSelectedChild] = useState(null);

    
  
    // Handle hover action for showing the message
 
    // Function to format selected date for backend
  
    // Calculate total price

    return (
        <div className="w-full shadow-lg">
            <h2 className="text-xl mt-5 font-bold w-full mb-5">
                {lang === "ar" ? "المشاركون" : "Participants"}
            </h2>
            <div
                className="p-4 bg-gray-100 rounded-md w-full"
                dir={lang === "ar" ? "rtl" : "ltr"}
            >
                {/* If adultPrice and childPrice exist, render these sections */}
                {
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <div className="flex justify-center items-center">
                                <h2 className="text-lg font-semibold">
                                    {lang === "ar" ? "البالغون" : "Adult"}
                                </h2>
                                <span className="text-gray-500 ml-2 text-md font-bold">
                                    {lang === "ar"
                                        ? "(أكثر من 12)"
                                        : "(Above 12 YRS)"}
                                </span>
                            </div>
                            <p>Price: {adultPrice} qar</p>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={() =>
                                    handleTicketCountChange("adult", false)
                                }
                                className="w-10 h-10 bg-gray-300 rounded-full text-lg font-bold mx-2"
                            >
                                -
                            </button>
                            <span className="text-lg font-semibold">
                                {adultCount}
                            </span>
                            <button
                                onClick={() =>
                                    handleTicketCountChange("adult", true)
                                }
                                className="w-10 h-10 bg-gray-300 rounded-full text-lg font-bold mx-2"
                            >
                                +
                            </button>
                        </div>
                    </div>
                }

                {
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <div className="flex justify-center items-center">
                                <h2 className="text-lg font-semibold">
                                    {lang === "ar" ? "طفل" : "Child"}
                                </h2>{" "}
                                <span className="text-gray-500 ml-2 text-md font-bold">
                                    {lang === "ar"
                                        ? "(3-11 YRS)"
                                        : "(3-11 YRS)"}
                                </span>
                            </div>

                            <p>Price: {childPrice} qar</p>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={() =>
                                    handleTicketCountChange("child", false)
                                }
                                className="w-10 h-10 bg-gray-300 rounded-full text-lg font-bold mx-2"
                            >
                                -
                            </button>
                            <span className="text-lg font-semibold">
                                {childCount}
                            </span>
                            <button
                                onClick={() =>
                                    handleTicketCountChange("child", true)
                                }
                                className="w-10 h-10 bg-gray-300 rounded-full text-lg font-bold mx-2"
                            >
                                +
                            </button>
                        </div>
                    </div>
                }

                {/* If no adultPrice/childPrice, check for adultData/childData and display */}
                {/* {adultData.length > 0 && (
                    <div
                        className="flex justify-between items-center mb-4 cursor-pointer"
                        onMouseEnter={handleHover}
                        onClick={() => setPopupOpen(true)}
                    >
                        <p>
                            {lang === "ar"
                                ? "تفاصيل التذكرة :"
                                : "Ticket Details :"}
                        </p>
                        <span className="text-gray-500 ml-2">
                            {lang === "ar"
                                ? "انقر هنا للعرض"
                                : "Click here to view"}
                        </span>
                    </div>
                )} */}

                {/* Popup for showing the adultData and childData */}
               

                {/* Total Price Display */}
                <div className="mt-4" dir={lang === "ar" ? "rtl" : "ltr"}>
                    <h2 className="text-xl font-bold">
                        {lang === "ar" ? "السعر الإجمالي" : "Total Price"}:{" "}
                        {/* Calculate the total addon cost for adults and children */}
                        {totalAddOnCost +
                            adultPrice * adultCount +
                            childPrice * childCount}{" "}
                        qar
                    </h2>
                    <br />
                    <button
                        onClick={handleBooking}
                        className="px-4 py-2 font-bold rounded-md bg-custom-yellow text-black hover:text-white hover:bg-black duration-300 flex items-center justify-center w-[150px]"
                    >
                        {loading ? (
                            <Loader />
                        ) : (
                            <div className="p-1">
                                {lang === "ar" ? "احجز الآن" : "Book Now"}
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
