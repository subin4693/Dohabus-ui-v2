import React from "react";

// Component for single price inputs
const SinglePriceComponent = ({
    adultPrice,
    setAdultPrice,
    childPrice,
    setChildPrice,
    activeIndex,
}) => {
    // Function to handle value updates with validation
    const handlePriceChange = (setter, type) => (e) => {
        const value = e.target.value;

        // Check if the input is empty, and set it to null
        if (value === "") {
            setter((prev) => {
                const newPricingByMonth = [...prev];
                newPricingByMonth[activeIndex] = {
                    ...newPricingByMonth[activeIndex],
                    [type]: null,
                };
                return newPricingByMonth;
            });
        } else if (!isNaN(value) && Number(value) >= 0) {
            // Check if the value is a valid number and >= 0
            setter((prev) => {
                const newPricingByMonth = [...prev];
                newPricingByMonth[activeIndex] = {
                    ...newPricingByMonth[activeIndex],
                    [type]: Number(value),
                };
                return newPricingByMonth;
            });
        } else {
            // If value is negative, reset it to null
            setter((prev) => {
                const newPricingByMonth = [...prev];
                newPricingByMonth[activeIndex] = {
                    ...newPricingByMonth[activeIndex],
                    [type]: null,
                };
                return newPricingByMonth;
            });
        }
    };

    return (
        <div className="flex space-x-4">
            <div>
                <label htmlFor="adultPrice" className="block mb-2">
                    Adult Price{" "}
                </label>
                <input
                    type="number"
                    id="adultPrice"
                    value={adultPrice ?? ""}
                    onChange={handlePriceChange(setAdultPrice, "adultPrice")}
                    className="p-2 border rounded-md w-full"
                />
            </div>
            <div>
                <label htmlFor="childPrice" className="block mb-2">
                    Child Price{" "}
                </label>
                <input
                    type="number"
                    id="childPrice"
                    value={childPrice ?? ""}
                    onChange={handlePriceChange(setChildPrice, "childPrice")}
                    className="p-2 border rounded-md w-full"
                />
            </div>
        </div>
    );
};

export default SinglePriceComponent;
