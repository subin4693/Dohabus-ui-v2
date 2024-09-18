import React from "react";
import { BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";

const Card = ({
  title,
  operatorName,
  imageUrl,
  onClick,
  cruiseName,
  id,
  handleRemove,
}) => {
  
  

  return (
    <div className="rounded-lg overflow-hidden h-fit shadow-xl cursor-pointer ">
      <div onClick={onClick} className="h-[250px] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="px-2 py-1 flex mt-5 items-center">
        <div className="w-full">
          <h2 className="font-bold">{title}</h2>
          <p className="text-green">
            <b className="text-custom-yellow">Oparator name</b>: {operatorName}
          </p>
          <p className="text-green">
            <b className="text-custom-yellow">Cruise name</b>: {cruiseName}
          </p>
          <p className="text-green">
            <b className="text-custom-yellow">Location</b>: {cruiseName}
          </p>
        </div>
        <div className="" onClick={() => handleRemove(id)}>
          <BiTrash size={30} />
        </div>
      </div>
    </div>
  );
};

export default Card;
