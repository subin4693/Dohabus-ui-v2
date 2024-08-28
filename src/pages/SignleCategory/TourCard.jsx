import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";

const TourCard = ({ image, title, lang, link }) => {
    return (
        <div
            className="h-[500px] bg-cover bg-center relative overflow-hidden group"
            style={{ backgroundImage: `url(${image})` }}
        >
            <h3 className="absolute bottom-10 left-10 font-bold text-white text-2xl">
                {title}
            </h3>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-5 bg-custom-yellow-light group-hover:translate-y-0 translate-y-full duration-500">
                <div className="absolute top-7 left-7 right-7 flex justify-between items-center">
                    <div className="group/edit flex items-center bg-white rounded-full p-2 hover:bg-dark duration-300">
                        <AiFillHeart className="text-4xl  group-hover/edit:text-white" />
                        <button className="max-w-0 opacity-0 whitespace-nowrap group-hover/edit:text-white group-hover/edit:max-w-[170px] group-hover/edit:opacity-100 group-hover/edit:px-2 transition-all duration-300">
                            {lang === "en"
                                ? "Add To Favourites"
                                : "أضف إلى المفضلة"}
                        </button>
                    </div>

                    <div className="group/edit flex items-center bg-white rounded-full p-2 hover:bg-dark duration-300">
                        <BiCart className="text-4xl group-hover/edit:text-white" />
                        <button className="max-w-0 opacity-0 whitespace-nowrap group-hover/edit:text-white group-hover/edit:max-w-[170px] group-hover/edit:opacity-100 group-hover/edit:px-2 transition-all duration-300">
                            {lang === "en" ? "Add To Cart" : "أضف إلى السلة"}
                        </button>
                    </div>
                    {/*
          <div className="group/edit flex items-center bg-white rounded-full p-2 hover:bg-dark duration-300">
            <BiCart className="text-3xl m-2 group-hover/edit:text-white" />
            <button className="max-w-0 opacity-0 whitespace-nowrap group-hover/edit:text-white group-hover/edit:max-w-[170px] group-hover/edit:opacity-100 group-hover/edit:px-2 transition-all duration-300">
              Add To Cart
            </button>
          </div>*/}
                </div>

                <div className="flex flex-col flex-wrap gap-2 md:flex-row md:gap-4 mt-4">
                    <Link
                        to={link}
                        className="px-5 py-3 bg-dark rounded-full text-white hover:text-custom-yellow"
                    >
                        {lang === "en" ? " Book now" : "احجز الآن"}
                    </Link>
                    <Link
                        to={link}
                        className="px-5 py-3 bg-dark rounded-full text-white hover:text-custom-yellow"
                    >
                        {lang === "en"
                            ? "Starting from QAR 180"
                            : "ابتداءً من 180 ريال قطري"}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TourCard;
