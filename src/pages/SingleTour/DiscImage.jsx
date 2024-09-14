import React from "react";
import discimage from "../../assets/locationPinforDisc-removebg-preview.png";

const DiscImage = () => {
  return (
    <div className="group-hover:scale-110 transition-transform duration-300 ease-in-out w-[50px] group-hover:scale-100 bg-custom-yellow absolute -left-[28px] h-[50px] border-[2px] border-custom-yellow rounded-full flex border justify-center items-center">
      <img
        src={discimage}
        className="w-[80px] h-[80px]  object-cover transition-transform duration-300 ease-in-out"
      />
      {/*<div className="w-2 h-2 rounded-full bg-black"></div>*/}
    </div>
  );
};

export default DiscImage;
