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
  loading
}) {


  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedAdult, setSelectedAdult] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);

  // Check if adult and child price or data exists
  const hasAdultPrice = data?.adultPrice;
  const hasChildPrice = data?.childPrice;
  const adultData = data?.adultData || [];
  const childData = data?.childData || [];
  const handleSelect = (type, selectedData) => {
    console.log(selectedData);
    console.log(type);
    console.log(totalPrice);
    let updatedTotalPrice = totalPrice;

    if (type === "adult") {
      if (selectedData._id === selectedAdult?._id) {
        updatedTotalPrice -= selectedData?.price * selectedData?.pax || 0;
        setSelectedAdult(null);
      } else {
        updatedTotalPrice -= selectedAdult?.price * selectedAdult?.pax || 0;
        updatedTotalPrice += selectedData?.price * selectedData?.pax;
        setSelectedAdult(selectedData);
      }
    }
    if (type === "child") {
      if (selectedData._id === selectedChild?._id) {
        updatedTotalPrice -= selectedData?.price * selectedData?.pax || 0;
        setSelectedChild(null);
      } else {
        updatedTotalPrice -= selectedChild?.price * selectedChild?.pax || 0;
        updatedTotalPrice += selectedData?.price * selectedData?.pax;
        setSelectedChild(selectedData);
      }
    }

    setTotalPrice(updatedTotalPrice);

    // Optionally, close the popup after selection if required
    // setPopupOpen(false);
  };
  // Handle hover action for showing the message
  const handleHover = () => {
    if (!hasAdultPrice && adultData.length > 0) {
      return "Click here to view";
    }
    return "";
  };

  // Function to format selected date for backend
  const formatDateForBackend = (date) => {
    return date;
  };

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
              <h2 className="text-lg font-semibold">
                {lang === "ar" ? "البالغون" : "Adult"}
              </h2>
              <p>Price: {adultPrice} qar</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handleTicketCountChange("adult", false)}
                className="w-10 h-10 bg-gray-300 rounded-full text-lg font-bold mx-2"
              >
                -
              </button>
              <span className="text-lg font-semibold">{adultCount}</span>
              <button
                onClick={() => handleTicketCountChange("adult", true)}
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
              <h2 className="text-lg font-semibold">
                {lang === "ar" ? "طفل" : "Child"}
              </h2>
              <p>Price: {childPrice} qar</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handleTicketCountChange("child", false)}
                className="w-10 h-10 bg-gray-300 rounded-full text-lg font-bold mx-2"
              >
                -
              </button>
              <span className="text-lg font-semibold">{childCount}</span>
              <button
                onClick={() => handleTicketCountChange("child", true)}
                className="w-10 h-10 bg-gray-300 rounded-full text-lg font-bold mx-2"
              >
                +
              </button>
            </div>
          </div>
        }

        {/* If no adultPrice/childPrice, check for adultData/childData and display */}
        {adultData.length > 0 && (
          <div
            className="flex justify-between items-center mb-4 cursor-pointer"
            onMouseEnter={handleHover}
            onClick={() => setPopupOpen(true)}
          >
            <p>Ticket Details : </p>
            <span className="text-gray-500 ml-2">Click here to view</span>
          </div>
        )}

        {/* Popup for showing the adultData and childData */}
        <DataPopup
          isOpen={popupOpen}
          onClose={() => setPopupOpen(false)}
          adultData={adultData}
          childData={childData}
          setSelectedAdult={setSelectedAdult}
          setSelectedChild={setSelectedChild}
          handleSelect={handleSelect}
          toast={toast}
          setTotalPrice={setTotalPrice}
          selectedAdultData={selectedAdultData}
          setSelectedAdultData={setSelectedAdultData}
          selectedChildData={selectedChildData}
          setSelectedChildData={setSelectedChildData}
        />

        {/* Total Price Display */}
        <div className="mt-4" dir={lang === "ar" ? "rtl" : "ltr"}>
          <h2 className="text-xl font-bold">
            {lang === "ar" ? "السعر الإجمالي" : "Total Price"}:{" "}
            {/* Calculate the total addon cost for adults and children */}
            {addOnTotalCost * (adultCount + childCount) +
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
