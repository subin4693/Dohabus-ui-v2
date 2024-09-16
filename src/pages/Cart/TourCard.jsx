import React from "react";
// import { AiFillHeart } from "react-icons/ai";
// import { BiCart } from "react-icons/bi";
import {
    FaHeart as HeartIcon,
    FaShoppingCart as CartIcon,
    FaTrash,
} from "react-icons/fa";
import { FaRegClock as Watch } from "react-icons/fa";
import { FaMapMarkerAlt as LocationPin } from "react-icons/fa";

import { FaDollarSign as Dollar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const TourCard = ({
    image,
    title,
    link,
    catId,
    addToCart,
    addToFav,
    removeFromCart,
    removeFromFav,
    isInCart,
    isInFavorites,
    duration,
    favId,
    cartId,
    itinerary,
    childPrice,
    category,
}) => {
    const lang = useSelector((state) => state.language.lang);
    const navigate = useNavigate();
    return (
        <div
            onClick={(e) => {
                navigate("/tours/" + category + "/" + link);
            }}
            // to={`${"/tours/" + category + "/" + link}`}
            dir={lang === "ar" ? "rtl" : "ltr"}
            className="flex flex-col md:flex-row h-fit md:h-[300px] relative group  bg-white relative overflow-hidden rounded-lg mb-5 border shadow-md"
        >
            {/* Left side - Image */}
            <div
                className="h-[300px] md:h-full md:w-1/2 bg-cover bg-center  "
                style={{ backgroundImage: `url(${image})` }}
            ></div>

            {/* Right side - Details */}
            <div className="flex flex-col  justify-center px-2 w-full md:w-1/2 bg-white">
                <h3 className="font-semibold text-black text-lg text-center mt-2">
                    {title}
                </h3>

                <div className="flex flex-col gap-2 mt-2">
                    <div className="flex items-center gap-5">
                        <Watch color="black" className="text-xl" />
                        <div>
                            <h2 className="text-md text-black font-bold">
                                Tour Duration
                            </h2>
                            <small className="text-md text-black font-semibold">
                                {duration[lang]}
                            </small>
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <LocationPin color="black" className="text-xl" />
                        <div>
                            <h2 className="text-md text-black font-bold">
                                Starting Point
                            </h2>
                            <small className="text-md text-black font-semibold">
                                {itinerary && itinerary[lang]}
                            </small>
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <Dollar color="black" className="text-xl" />
                        <div>
                            <h2 className="text-md text-black font-bold">
                                Price Starts From
                            </h2>
                            <small className="text-md text-black font-semibold">
                                QAR {childPrice}
                            </small>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-center mt-10 gap-10">
                    {/* <div>
                        
                            <button className="p-5 text-black text-xl font-semibold rounded-full bg-white w-[180px]">
                                View Tour
                            </button>
                        </Link>
                    </div> */}

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            return removeFromCart(cartId);
                        }}
                        className="p-2 bg-gray-200 border-gray-300 border hover:text-red-500 rounded-md opacity-0 duration-200 group-hover:opacity-100 cursor-pointer absolute bottom-5 right-5"
                    >
                        <FaTrash className="text-xl" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TourCard;
