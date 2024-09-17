import React, { useState } from "react";

const AddonComponent = ({ label, state, setter }) => {
    // Handle changes to the array of add-ons
    const handleArrayChange = (setter, index) => (e) => {
        const { name, value } = e.target;
        const updatedAddons = [...state];
        updatedAddons[index] = {
            ...updatedAddons[index],
            [name]: value,
        };
        setter(updatedAddons);
    };

    // Add a new empty object to the array of add-ons
    const handleAddToArray = (setter) => () => {
        setter([...state, { en: "", ar: "", price: "" }]);
    };

    // Remove an add-on from the array
    const handleRemoveFromArray = (setter, index) => () => {
        const updatedAddons = [...state];
        updatedAddons.splice(index, 1);
        setter(updatedAddons);
    };

    return (
        <div key={"addon"}>
            <label className="block mb-2">
                <span className="font-bold">{label}</span>{" "}
                <span className="text-gray-600 ml-2">(optional)</span>
            </label>

            {/* Loop through the state to create input fields for each addon */}
            {state.map((item, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                    {/* English Input */}
                    <input
                        type="text"
                        placeholder={`English ${label}`}
                        value={item.en}
                        name="en"
                        onChange={handleArrayChange(setter, index)}
                        className="p-2 border rounded-md w-full"
                    />

                    {/* Arabic Input */}
                    <input
                        type="text"
                        placeholder={`Arabic ${label}`}
                        value={item.ar}
                        name="ar"
                        onChange={handleArrayChange(setter, index)}
                        className="p-2 border rounded-md w-full"
                        dir="rtl"
                    />

                    {/* Price Input */}
                    <input
                        type="number"
                        placeholder="Price"
                        value={item.price}
                        name="price"
                        onChange={handleArrayChange(setter, index)}
                        className="p-2 border rounded-md w-24"
                    />

                    {/* Remove Button */}
                    <button
                        type="button"
                        onClick={handleRemoveFromArray(setter, index)}
                        className="text-red-500"
                    >
                        Remove
                    </button>
                </div>
            ))}

            {/* Add new Add-on Button */}
            <button
                type="button"
                onClick={handleAddToArray(setter)}
                className="bg-green-500 text-white py-1 px-2 rounded-md"
            >
                Add {label}
            </button>
        </div>
    );
};

export default AddonComponent;
