import { useState } from "react";

const initialDetails = [
    {
        _id: "1",
        title: { en: "Event Title", ar: "عنوان الحدث" },
        dates: [
            { day: { en: "Monday", ar: "الإثنين" }, time: "8pm-10pm" },
            { day: { en: "Tuesday", ar: "الثلاثاء" }, time: "6pm-8pm" },
        ],
    },
];

const DetailsManager = () => {
    const [details, setDetails] = useState(initialDetails);
    return <div>asdf</div>;
};

export default DetailsManager;
