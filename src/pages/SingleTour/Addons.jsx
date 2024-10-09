import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const Addons = ({
  addOnOptions,
  handleAddOnChange,
  selectedAddOns,
  lang,
  ticketsCount,
  setTicketsCount,
  totalAddOnCost,
  setTotalAddOnCost,
}) => {
  const animatedComponents = makeAnimated();

  // Increment person count for a particular add-on
  const incrementCount = (addOnId) => {
    setTicketsCount((prev) => {
      const newCount = (prev[addOnId] || 1) + 1; // Default to 1 if not already set
      const updatedCount = { ...prev, [addOnId]: newCount };
      updateTotalCost(selectedAddOns, updatedCount); // Pass the updated counts to recalculate total
      return updatedCount;
    });
  };

  // Decrement person count for a particular add-on
  const decrementCount = (addOnId) => {
    setTicketsCount((prev) => {
      const newCount = prev[addOnId] > 1 ? prev[addOnId] - 1 : 1; // Minimum of 1
      const updatedCount = { ...prev, [addOnId]: newCount };
      updateTotalCost(selectedAddOns, updatedCount); // Pass the updated counts to recalculate total
      return updatedCount;
    });
  };

  // Update the total add-on cost whenever count changes
  const updateTotalCost = (selectedOptions, updatedCounts) => {
    const total = selectedOptions.reduce((sum, option) => {
      const count = updatedCounts[option.value] || 1; // Get count from updatedCounts, default to 1
      return sum + option.price * count;
    }, 0);
    setTotalAddOnCost(total); // Update the total add-on cost
  };

  // Handle when add-ons are selected from the dropdown
  const onAddOnChange = (selectedOptions) => {
    handleAddOnChange(selectedOptions);

    // Set default count to 1 for each selected add-on
    const defaultCounts = selectedOptions.reduce((counts, option) => {
      counts[option.value] = ticketsCount[option.value] || 1;
      return counts;
    }, {});

    setTicketsCount(defaultCounts);
    updateTotalCost(selectedOptions, defaultCounts);
  };

  return (
    <div className="bg-gray-100 px-1 py-2 rounded-md mt-5 border">
      {addOnOptions?.length > 0 && (
        <div>
          <h2 className="text-xl mt-5 font-bold">
            {lang === "ar" ? "الإضافات" : "Add-Ons"}
          </h2>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={addOnOptions}
            onChange={onAddOnChange}
          />
        </div>
      )}

      <div className="mt-5">
        {selectedAddOns.map((singleAddon) => (
          <div
            key={singleAddon.value}
            className="flex items-center justify-between my-2"
          >
            <div>
              <span>
                {singleAddon.label} - {singleAddon.price} QAR/Person
              </span>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => decrementCount(singleAddon.value)}
                className="px-2 py-1 bg-gray-300 rounded-md"
              >
                -
              </button>
              <span className="mx-2">
                {ticketsCount[singleAddon.value] || 1}
              </span>
              <button
                onClick={() => incrementCount(singleAddon.value)}
                className="px-2 py-1 bg-gray-300 rounded-md"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h3 className="font-bold">
          {lang === "ar" ? "إجمالي التكلفة:" : "Total Add-On Cost:"}{" "}
          {totalAddOnCost} QAR
        </h3>
      </div>
    </div>
  );
};

export default Addons;
