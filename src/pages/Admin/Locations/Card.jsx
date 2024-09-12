import React, { useState } from "react";
import Loader from "../../../components/Loader";

const Card = ({ data, onSave, onCancel, loading }) => {
  const [detail, setDetail] = useState(
    data || {
      title: { en: "", ar: "" },
      dates: [{ day: { en: "", ar: "" }, time: "" }],
    }
  );

  // Handle input changes for title
  const handleTitleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prevDetail) => ({
      ...prevDetail,
      title: {
        ...prevDetail.title,
        [name]: value,
      },
    }));
  };

  // Handle input changes for dates
  const handleDateChange = (index, key, value) => {
    const newDates = [...detail.dates];
    newDates[index] = { ...newDates[index], [key]: value };
    setDetail((prevDetail) => ({
      ...prevDetail,
      dates: newDates,
    }));
  };

  // Add a new date input field
  const handleAddDate = () => {
    setDetail((prevDetail) => ({
      ...prevDetail,
      dates: [...prevDetail.dates, { day: { en: "", ar: "" }, time: "" }],
    }));
  };

  return (
    <div className="border p-4 mt-4">
      <h4 className="text-xl font-semibold mb-2">
        {data ? "Edit Details" : "Create New Detail"}
      </h4>
      <div className="mb-4">
        <label className="block font-bold mb-1">Title (English)</label>
        <input
          type="text"
          name="en"
          value={detail.title.en}
          onChange={handleTitleChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1">Title (Arabic)</label>
        <input
          type="text"
          name="ar"
          value={detail.title.ar}
          onChange={handleTitleChange}
          className="border p-2 w-full"
        />
      </div>
      {detail?.dates?.map((date, index) => (
        <div key={index} className="mb-4">
          <label className="block font-bold mb-1">Day (English)</label>
          {console.log(date)}
          <input
            type="text"
            value={date.day.en}
            onChange={(e) =>
              handleDateChange(index, "day", {
                ...date.day,
                en: e.target.value,
              })
            }
            className="border p-2 w-full mb-2"
          />
          <label className="block font-bold mb-1">Day (Arabic)</label>
          <input
            type="text"
            value={date.day.ar}
            onChange={(e) =>
              handleDateChange(index, "day", {
                ...date.day,
                ar: e.target.value,
              })
            }
            className="border p-2 w-full mb-2"
          />
          <label className="block font-bold mb-1">Time</label>
          <input
            type="text"
            value={date.time}
            onChange={(e) => handleDateChange(index, "time", e.target.value)}
            className="border p-2 w-full"
          />
        </div>
      ))}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
        onClick={() => onSave(detail)}
      >
        {loading ? (
          <div className="">
            <Loader w={20} h={20} b={5} />
          </div>
        ) : (
          "Save"
        )}
      </button>{" "}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
        onClick={handleAddDate}
      >
        Add Date
      </button>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded-md"
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  );
};

export default Card;
