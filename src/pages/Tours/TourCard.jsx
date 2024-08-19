import React from "react";
import { Link } from "react-router-dom";

const TourCard = ({ image, description, title }) => {
    return (
        <div
            className="h-[500px]  bg-cover bg-center relative overflow-hidden group"
            style={{ backgroundImage: `url(${image})` }}
        >
            <h3 className="bottom-10 absolute left-10  font-bold text-white text-2xl">
                {title}
            </h3>
            <div className="flex flex-col text-white justify-center items-start  p-10 absolute bg-custom-yellow-light inset-0 translate-y-full group-hover:translate-y-0 duration-500">
                <p className="text-lg  ">{description}</p>
                <Link to={`/tours/${title}`}>
                    <button className="text-lg px-5 py-3 mt-3 bg-dark rounded-full hover:text-custom-yellow">
                        Discover
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default TourCard;
