import React from "react";

const Banner = ({ image, title, subTitle }) => {
  return (
    <div
      className="relative w-full h-[300px] md:h-[380px] bg-cover bg-center"
      // style={{ backgroundImage: `url(${image})` }}
    >
      <img
        src={image}
        className=" w-full h-full  bg-cover object-cover"
        alt=""
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl md:text-[3rem] font-bold text-center ">
          {title}
        </h1>

        <p className="text-custom-yellow text-lg md:text-xl mt-5 ">
          {subTitle.split("|")[0]}|
          <span className=" text-white">{subTitle.split("|")[1]}</span>
        </p>
      </div>
    </div>
  );
};

export default Banner;
