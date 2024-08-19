import React from "react";
import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";

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
                <div className="absolute top-7 group/edit hover:bg-dark overflow-hidden right-7 flex justify-center items-center  duration-300 bg-white rounded-full   ">
                    <BiCart className="text-3xl m-2 group-hover/edit:text-white" />
                    <button className=" max-w-0  opacity-0 whitespace-nowrap group-hover/edit:text-white group-hover/edit:max-w-[120px] group-hover/edit:opacity-100 group-hover/edit:px-2 transition-all duration-300">
                        Add to Cart
                    </button>
                </div>
                <div className="flex flex-col flex-wrap gap-2 md:flex-row md:gap-4">
                    <Link to={title}>
                        <button className="px-5 py-3 bg-dark rounded-full text-white hover:text-custom-yellow">
                            Book now
                        </button>
                    </Link>
                    <button className="px-5 py-3 bg-dark rounded-full text-white hover:text-custom-yellow">
                        Starting from QAR 180
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TourCard;
