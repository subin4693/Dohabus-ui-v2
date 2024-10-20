import React, { act, useState } from "react";

const PricingTable = ({
    adultData,
    setAdultData,
    childData,
    setChildData,
    activeIndex,
}) => {
    // Handler to add a new row
    console.log(adultData);
    const addRow = (type) => {
        if (type === "adult") {
            // setAdultData([...adultData, { pax: null, price: null }]);
            setAdultData((prev) => {
                const temp = prev.map((singleval) => {
                    if (singleval.month == activeIndex) {
                        singleval.adultData.push({ pax: null, price: null });
                        return singleval;
                    }
                    return singleval;
                });

                return temp;
            });
        } else {
            setChildData((prev) => {
                const temp = prev.map((singleval) => {
                    if (singleval.month == activeIndex) {
                        singleval.childData.push({ pax: null, price: null });
                        return singleval;
                    }
                    return singleval;
                });

                return temp;
            });
        }
    };

    // Handler to remove a row
    const removeRow = (type, index) => {
        if (type === "adult") {
            setAdultData((prev) => {
                const temp = prev.map((singleval) => {
                    if (singleval.month == activeIndex) {
                        let tempAddData = singleval.adultData.filter(
                            (_, i) => i != index
                        );

                        console.log({ ...singleval, adultData: tempAddData });
                        return { ...singleval, adultData: tempAddData };
                    }
                    return singleval;
                });
                console.log(temp);

                return temp;
            });
        } else {
            setChildData((prev) => {
                const temp = prev.map((singleval) => {
                    if (singleval.month == activeIndex) {
                        let tempAddData = singleval.childData.filter(
                            (_, i) => i != index
                        );

                        console.log({ ...singleval, childData: tempAddData });
                        return { ...singleval, childData: tempAddData };
                    }
                    return singleval;
                });
                console.log(temp);

                return temp;
            });
        }
    };

    // Handler to update the row data
    const handleChange = (type, index, field, value) => {
        // const updateData = (data, setter) => {
        //     const newData = [...data];
        //     newData[index][field] = value;
        //     setter(newData);
        // };

        if (type === "adult") {
            setAdultData((prev) => {
                const temp = prev.map((singleval) => {
                    if (singleval.month == activeIndex) {
                        const updatedAdultData = singleval.adultData.map(
                            (row, i) => {
                                if (i == index) {
                                    return { ...row, [field]: value };
                                }
                                return row;
                            }
                        );
                        return { ...singleval, adultData: updatedAdultData };
                    }
                    return singleval;
                });
                console.log(temp);
                return temp;
            });
            // updateData(adultData, setAdultData);
        } else {
            setChildData((prev) => {
                const temp = prev.map((singleval) => {
                    if (singleval.month == activeIndex) {
                        const updatedChildData = singleval.childData.map(
                            (row, i) => {
                                if (i == index) {
                                    return { ...row, [field]: value };
                                }
                                return row;
                            }
                        );
                        return { ...singleval, childData: updatedChildData };
                    }
                    return singleval;
                });
                console.log(temp);
                return temp;
            });
        }
    };

    // Handle data submission to backend

    return (
        <div>
            {/* Adult Pricing Table */}
            <div>
                <h3 className="text-lg font-semibold mb-2 ">Adult Pricing</h3>
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">
                                Adult
                            </th>
                            <th className="border border-gray-300 p-2">
                                Number of Pax
                            </th>
                            <th className="border border-gray-300 p-2">
                                Price
                            </th>
                            <th className="border border-gray-300 p-2">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {adultData?.map((row, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 p-2">
                                    Adult
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {console.log(row)}
                                    <input
                                        type="number"
                                        value={row.pax || ""}
                                        onChange={(e) =>
                                            handleChange(
                                                "adult",
                                                index,
                                                "pax",
                                                e.target.value
                                            )
                                        }
                                        className="p-1 border rounded"
                                        min="1"
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <input
                                        type="number"
                                        value={row.price || ""}
                                        onChange={(e) =>
                                            handleChange(
                                                "adult",
                                                index,
                                                "price",
                                                e.target.value
                                            )
                                        }
                                        className="p-1 border rounded"
                                        min="0"
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeRow("adult", index)
                                        }
                                        className="text-red-500"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    type="button"
                    onClick={() => addRow("adult")}
                    className="mt-2 bg-green-500 text-white py-1 px-2 rounded"
                >
                    Add Adult Pax
                </button>
            </div>

            {/* Child Pricing Table */}
            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Child Pricing</h3>
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">
                                Child
                            </th>
                            <th className="border border-gray-300 p-2">
                                Number of Pax
                            </th>
                            <th className="border border-gray-300 p-2">
                                Price
                            </th>
                            <th className="border border-gray-300 p-2">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {childData?.map((row, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 p-2">
                                    Child
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <input
                                        type="number"
                                        value={row.pax || ""}
                                        onChange={(e) =>
                                            handleChange(
                                                "child",
                                                index,
                                                "pax",
                                                e.target.value
                                            )
                                        }
                                        className="p-1 border rounded"
                                        min="1"
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <input
                                        type="number"
                                        value={row.price || ""}
                                        onChange={(e) =>
                                            handleChange(
                                                "child",
                                                index,
                                                "price",
                                                e.target.value
                                            )
                                        }
                                        className="p-1 border rounded"
                                        min="0"
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeRow("child", index)
                                        }
                                        className="text-red-500"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    type="button"
                    onClick={() => addRow("child")}
                    className="mt-2 bg-green-500 text-white py-1 px-2 rounded"
                >
                    Add Child Pax
                </button>
            </div>

            {/* Submit Button */}
            {/* <div className="mt-4">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Submit Pricing Data
        </button>
      </div>*/}
        </div>
    );
};

export default PricingTable;
