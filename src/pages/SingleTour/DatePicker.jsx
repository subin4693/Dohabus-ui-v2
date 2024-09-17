import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";

export default function BasicDateCalendar({
    setSelectedDate,
    enableDays,
    setSession,
}) {
    // const enableDays = [0, 1, 4]; // Days to enable (0 = Sunday, 1 = Monday, 4 = Thursday)

    // Function to enable specific days and disable others
    const shouldDisableDate = (date) => {
        // Get the day of the week (0 = Sunday, 6 = Saturday)
        const dayOfWeek = date.day();
        // Disable the day if it is NOT in the enableDays array
        return !enableDays.includes(dayOfWeek);
    };

    const handleDateChange = (date) => {
        // Ensure the time is set to midnight before converting
        const adjustedDate = dayjs(date)
            .set("hour", 0)
            .set("minute", 0)
            .set("second", 0)
            .set("millisecond", 0);

        const localISODate = adjustedDate.format("YYYY-MM-DDTHH");

        setSession(null);
        setSelectedDate(localISODate.split("T")[0]);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                style={{ width: "100%", height: "100%" }} // Increase width and height
                //  style={{ width: "100%" }}
                className="bg-gray-100 rounded-lg shadow-lg "
                disablePast
                shouldDisableDate={shouldDisableDate}
                onChange={handleDateChange}
            />
        </LocalizationProvider>
    );
}
