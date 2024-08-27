import { useState } from "react";
import { useSelector } from "react-redux";
import Card from "./Card"; // Import Card component

// Initial details data
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
    const [isEditing, setIsEditing] = useState(false); // State to track if we're editing an existing item
    const [currentDetail, setCurrentDetail] = useState(null); // State to track which item is being edited or created

    const lang = useSelector((state) => state.language.lang);

    // Function to handle adding a new detail
    const handleCreate = () => {
        setCurrentDetail(null); // No current detail means creating a new one
        setIsEditing(true); // Show the edit/create form
    };

    // Function to handle saving a new or edited detail
    const handleSave = (detail) => {
        if (currentDetail) {
            // Editing existing detail
            setDetails((prevDetails) =>
                prevDetails.map((d) => (d._id === detail._id ? detail : d))
            );
        } else {
            // Creating new detail
            setDetails((prevDetails) => [
                ...prevDetails,
                { ...detail, _id: (prevDetails.length + 1).toString() },
            ]);
        }
        setIsEditing(false); // Hide the edit/create form
    };

    // Function to handle deleting a detail
    const handleDelete = (id) => {
        setDetails((prevDetails) =>
            prevDetails.filter((detail) => detail._id !== id)
        );
    };

    // Function to handle editing a detail
    const handleEdit = (detail) => {
        setCurrentDetail(detail); // Set the detail to be edited
        setIsEditing(true); // Show the edit form
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold mb-2">Details</h1>
                <button
                    className="bg-custom-yellow px-3 py-2 rounded-md duration-300 hover:text-white hover:bg-black"
                    onClick={handleCreate} // Open create form
                >
                    Create new
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {details.map((detail) => (
                    <div
                        key={detail._id} // Added key prop
                        className="bg-gray-100 rounded-md shadow-md p-5 w-[400px] relative"
                    >
                        <>
                            <h4 className="text-xl font-semibold mb-2">
                                {detail.title[lang]}
                            </h4>
                            {detail.dates.map((date, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-10"
                                >
                                    <h5>{date.day[lang]}</h5>
                                    <p>{date.time}</p>
                                </div>
                            ))}
                        </>
                        <div className="absolute top-5 right-5">
                            <button
                                className="px-2 py-1 bg-custom-red text-white rounded-md"
                                onClick={() => handleDelete(detail._id)}
                            >
                                Delete
                            </button>
                            &nbsp;&nbsp;&nbsp;
                            <button
                                className="px-2 py-1 bg-custom-yellow rounded-md"
                                onClick={() => handleEdit(detail)}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Show the edit/create card if we're editing or creating */}
            {isEditing && (
                <Card
                    data={currentDetail}
                    onSave={handleSave}
                    onCancel={() => setIsEditing(false)} // Close form on cancel
                />
            )}
        </div>
    );
};

export default DetailsManager;