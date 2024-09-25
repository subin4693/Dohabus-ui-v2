import React from "react";

const Card = ({ title, description, imageUrl, onClick, handleRemove, id }) => {
  return (
    <div className="rounded-lg overflow-hidden   shadow-xl cursor-pointer">
      <div className="relative h-[250px] overflow-hidden">
        <img
          onClick={onClick}
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
        <button onClick={() => handleRemove(id)} className="absolute top-2 left-2 bg-red-500 text-white rounded px-2 py-1">
          Remove
        </button>
      </div>

      <div className="px-2 py-1" onClick={onClick}>
        <h2 className="font-bold">{title}</h2>
        <p className="text-green h-[215px] overflow-hidden">{description}</p>
      </div>
    </div>
  );
};

export default Card;
