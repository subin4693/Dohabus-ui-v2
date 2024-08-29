import React from "react";

const Card = ({
    title,
    places,
    lang,
    imageUrl,
    onClick,
    transid,
    switchActive,
    isActive,
}) => {
    return (
        <div className="rounded-lg overflow-hidden h-fit shadow-xl cursor-pointer relative bg-white hover:shadow-2xl transition-shadow duration-300">
            {/* Active/Block Button */}
            <button
                className={`absolute top-2 right-2 px-3 py-1 rounded-full text-white ${
                    isActive
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                }`}
                onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the onClick for the card
                    switchActive(transid);
                }}
            >
                {isActive ? "Active" : "Block"}
            </button>

            {/* Image Section */}
            <div className="h-[250px] overflow-hidden">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover rounded-lg"
                    onClick={onClick} // Ensures clicking the image also triggers onClick
                />
            </div>

            {/* Content Section */}
            <div className="px-4 py-2" onClick={onClick}>
                <h2 className="font-bold text-lg text-gray-800">{title}</h2>
                <ul className="list-disc ml-4 text-gray-600">
                    {places.map((place, index) => (
                        <li key={index} className="text-green-700">
                            {place[lang]}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Card;
