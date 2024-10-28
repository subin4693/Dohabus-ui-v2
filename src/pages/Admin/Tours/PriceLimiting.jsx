import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import SinglePriceComponentForPriceLimiting from "./SinglePriceComponentForPriceLimiting";
import PricingComponentForPriceLimiting from "./PricingComponentForPriceLimiting";

const PriceLimiting = ({ pricingLimits, setPricingLimits }) => {
  const [showPricing, setShowPricing] = useState({}); // Track toggle state for each entry
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddPricingLimit = () => {
    setIsExpanded(true);
    setPricingLimits((prev) => [
      ...prev,
      {
        startDate: "",
        endDate: "",
        adultData: [],
        childData: [],
        adultPrice: "",
        childPrice: "",
      },
    ]);
  };

  const handleRemovePricingLimit = (index) => {
    setPricingLimits((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTogglePricingType = (index) => {
    setShowPricing((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleDateChange = (index, field, value) => {
    const formattedDate = value?.toDate ? value.toDate() : value;
    setPricingLimits((prev) => {
      const updatedLimits = [...prev];
      updatedLimits[index][field] = formattedDate;
      return updatedLimits;
    });
    console.log(formattedDate);
  };

  return (
    <div>
      <label htmlFor="priceLimiting" className="block mb-2 font-bold">
        Price Limiting <span className="text-gray-600 ml-2">(optional)</span>
      </label>

      {!isExpanded ? (
        <button
          type="button"
          className="bg-custom-blue hover:bg-custom-yellow duration-100 px-4 py-1 rounded-md text-white hover:text-black w-fit"
          onClick={handleAddPricingLimit}
        >
          Add
        </button>
      ) : (
        <div>
          {pricingLimits.map((limit, index) => (
            <div
              key={index}
              className="mt-4 p-4 border rounded-md shadow relative"
            >
              {/* Remove Button */}
              <button
                type="button"
                onClick={() => handleRemovePricingLimit(index)}
                className="absolute top-2 right-2 text-red-600"
              >
                Remove
              </button>

              {/* Date Pickers for Start and End Date */}
              <div className="flex items-center space-x-4 mb-4">
                <div>
                  <label>Start Date:</label>
                  <DatePicker
                    value={limit.startDate ? new Date(limit.startDate) : null}
                    onChange={(date) =>
                      handleDateChange(index, "startDate", date)
                    }
                  />
                </div>
                <div>
                  <label>End Date:</label>
                  <DatePicker
                    value={limit.endDate ? new Date(limit.endDate) : null}
                    onChange={(date) =>
                      handleDateChange(index, "endDate", date)
                    }
                  />
                </div>
              </div>

              {/* Toggle Switch for Pricing Type */}
              <div className="mb-4 flex items-center">
                <label className="mr-3">Pricing Type:</label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={showPricing[index] || false}
                    onChange={() => handleTogglePricingType(index)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full shadow-inner relative">
                    <div
                      className={`${
                        showPricing[index] ? "translate-x-5" : "translate-x-0"
                      } absolute w-5 h-5 bg-white rounded-full shadow transform transition-transform`}
                    ></div>
                  </div>
                  <span className="ml-3 text-gray-700">
                    {showPricing[index] ? "Dynamic Pricing" : "Single Pricing"}
                  </span>
                </label>
              </div>

              {/* Conditional Rendering Based on Pricing Type */}
              {showPricing[index] ? (
                <PricingComponentForPriceLimiting
                  adultData={limit.adultData}
                  setAdultData={(data) =>
                    handleDateChange(index, "adultData", data)
                  }
                  childData={limit.childData}
                  setChildData={(data) =>
                    handleDateChange(index, "childData", data)
                  }
                />
              ) : (
                <SinglePriceComponentForPriceLimiting
                  adultPrice={limit.adultPrice}
                  setAdultPrice={(price) =>
                    handleDateChange(index, "adultPrice", price)
                  }
                  childPrice={limit.childPrice}
                  setChildPrice={(price) =>
                    handleDateChange(index, "childPrice", price)
                  }
                />
              )}
            </div>
          ))}
          {/* Add More Pricing Limit Button */}
          <button
            type="button"
            className="bg-custom-blue hover:bg-custom-yellow duration-100 px-4 py-1 mt-4 rounded-md text-white hover:text-black w-fit"
            onClick={handleAddPricingLimit}
          >
            Add Another Pricing
          </button>
        </div>
      )}
    </div>
  );
};

export default PriceLimiting;
