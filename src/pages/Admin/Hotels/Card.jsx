import React from "react";

const Card = ({ title, description, imageUrl, onClick }) => {
    return (
        <div
            className="rounded-lg overflow-hidden h-fit shadow-xl cursor-pointer"
            onClick={onClick}
        >
            <div className="h-[250px] overflow-hidden">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>
            <div className="px-2 py-1">
                <h2 className="font-bold">{title}</h2>
                <p className="text-green">{description}</p>
            </div>
        </div>
    );
};

export default Card;
