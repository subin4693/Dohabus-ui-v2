import React from "react";
import { BiHeart } from "react-icons/bi";
import { IoHeart } from "react-icons/io5";
const TourCard = ({ image, description, title }) => {
    return (
        <div
            className="h-[500px] bg-cover bg-center relative overflow-hidden group"
            style={{ backgroundImage: `url(${image})` }}
        >
            <h3 className="absolute bottom-10 left-10 font-bold text-white text-2xl">
                {title}
            </h3>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-5 bg-custom-yellow-light group-hover:translate-y-0 translate-y-full duration-500">
                <IoHeart className="absolute top-6 right-6 text-3xl text-red-500" />

                <div className="flex flex-col flex-wrap gap-2 md:flex-row md:gap-4">
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
