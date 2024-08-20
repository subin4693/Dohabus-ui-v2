import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiCart } from "react-icons/bi";

const TourCard = ({ image, title }) => {
  return (
    <div
      className="h-[500px] bg-cover bg-center relative overflow-hidden group"
      style={{ backgroundImage: `url(${image})` }}
    >
      <h3 className="absolute bottom-10 left-10 font-bold text-white text-2xl">
        {title}
      </h3>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-5 bg-custom-yellow-light group-hover:translate-y-0 translate-y-full duration-500">
        <div className="absolute top-7 left-7 right-7 flex justify-between gap-10 items-center">
          <div className="group/edit flex items-center bg-white rounded-full p-2 hover:bg-dark duration-300">
            <AiFillHeart className="text-4xl text-danger group-hover/edit:text-white" />
            <button className="max-w-0 opacity-0 whitespace-nowrap group-hover/edit:text-white group-hover/edit:max-w-[170px] group-hover/edit:opacity-100 group-hover/edit:px-2 transition-all duration-300">
              Remove from Favourite
            </button>
          </div>
          {/* <div className="group/edit flex items-center bg-white rounded-full p-2 hover:bg-dark duration-300 bg-red-500 overflow-hidden">
            <AiFillHeart className="text-3xl m-2 group-hover/edit:text-white" />
            <button className="max-w-0 opacity-0 whitespace-nowrap      group-hover/edit:text-white group-hover/edit:max-w-[240px] group-hover/edit:opacity-100 group-hover/edit:px-2 transition-all duration-300">
              Add To Favourites
            </button>
          </div>*/}

          <div className="group/edit flex items-center bg-white rounded-full p-2 hover:bg-dark duration-300">
            <BiCart className="text-3xl m-2 group-hover/edit:text-white" />
            <button className="max-w-0 opacity-0 whitespace-nowrap group-hover/edit:text-white group-hover/edit:max-w-[170px] group-hover/edit:opacity-100 group-hover/edit:px-2 transition-all duration-300">
              Add To Cart
            </button>
          </div>
        </div>

        <div className="flex flex-col flex-wrap gap-2 md:flex-row md:gap-4 mt-4">
          <button className="px-5 py-3 bg-dark rounded-full text-white hover:text-custom-yellow">
            Book now
          </button>
          <button className="px-5 py-3 bg-dark rounded-full text-white hover:text-custom-yellow">
            Starting from QAR 180
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
