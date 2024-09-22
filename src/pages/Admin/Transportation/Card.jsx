import React from "react";
import { BiTrash } from "react-icons/bi";

const Card = ({
  title,
  places,
  lang,
  imageUrl,
  onClick,
  transid,
  switchActive,
  isActive,
  handleRemove,
}) => {
  return (
    <div className="rounded-lg overflow-hidden h-fit shadow-xl relative bg-white hover:shadow-2xl transition-shadow duration-300">
      {/* Active/Block Button */}
      <button
        className={`absolute top-2 right-2 px-3 py-1 rounded-full text-white ${
          isActive
            ? "bg-green-500 hover:bg-green-600"
            : "bg-red-500 hover:bg-red-600"
        }`}
        onClick={(e) => {
          e.stopPropagation();

          switchActive(transid);
        }}
      >
        {isActive ? "Active" : "In active"}
      </button>

      {/* Image Section */}
      <div className="h-[250px] overflow-hidden cursor-pointer">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
          onClick={onClick} // Ensures clicking the image also triggers onClick
        />
      </div>

      {/* Content Section */}
      <div className="px-4 py-2 flex items-center justify-between">
        <h2 className="font-bold text-lg text-gray-800">{title}</h2>
        <button onClick={() => handleRemove(transid)}>
          <BiTrash size={24} />
        </button>
      </div>
    </div>
  );
};

export default Card;
