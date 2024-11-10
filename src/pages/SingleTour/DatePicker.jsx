import React, { useState } from "react";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import "react-calendar/dist/Calendar.css";

export default function BasicDateCalendar({
  setSelectedDate,
  enableDays,
  setSession,
  stopSales,
}) {
  // Function to disable past dates and specific days
  const tileDisabled = ({ date }) => {
    const today = new Date();
    const dayOfWeek = date.getDay(); // Get day of week (0 = Sunday, 6 = Saturday)
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    // Disable if the date is in the past or the day is not in the enabled days array
    return (
      date < today.setHours(0, 0, 0, 0) ||
      !enableDays.includes(dayOfWeek) ||
      stopSales
        .map((d) => dayjs(d).format("YYYY-MM-DD"))
        .includes(formattedDate)
    );
  };

  const handleDateChange = (date) => {
    // Ensure the time is set to midnight before converting
    const adjustedDate = dayjs(date)
      .set("hour", 0)
      .set("minute", 0)
      .set("second", 0)
      .set("millisecond", 0);

    const localISODate = adjustedDate.format("YYYY-MM-DDTHH");

    setSession(null); // Reset session
    setSelectedDate(localISODate.split("T")[0]); // Set the selected date
  };

  return (
    <div className={"bg-gray-100 p-2 rounded-md h-full shadow-lg border"}>
      <Calendar
        onChange={handleDateChange} // Handle date change
        tileDisabled={tileDisabled} // Disable past dates and unwanted days
      />
    </div>
  );
}
