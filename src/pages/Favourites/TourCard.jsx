import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";

const TourCard = ({ image, title, lang }) => {
    const buttonTexts = {
        en: {
            removeFromCart: "Remove from Cart",
            bookNow: "Book now",
            startingFrom: "Starting from QAR 180",
        },
        ar: {
            removeFromCart: "إزالة من السلة",
            bookNow: "احجز الآن",
            startingFrom: "يبدأ من 180 ريال قطري",
        },
    };
    return (
        <div
            className="h-[500px] bg-cover bg-center relative overflow-hidden group"
            style={{ backgroundImage: `url(${image})` }}
        >
            <h3 className="absolute bottom-10 left-10 font-bold text-white text-2xl">
                {title}
            </h3>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-5 bg-custom-yellow-light group-hover:translate-y-0 translate-y-full duration-500">
                <div className="absolute top-7 left-7 right-7 flex justify-end gap-10 items-center">
                    <div className="group/edit flex items-center bg-white rounded-full p-2 hover:bg-dark duration-300">
                        <AiFillHeart className="text-4xl text-danger group-hover/edit:text-white" />
                        <button className="max-w-0 opacity-0 whitespace-nowrap group-hover/edit:text-white group-hover/edit:max-w-[240px] group-hover/edit:opacity-100 group-hover/edit:px-2 transition-all duration-300">
                            {lang === "en"
                                ? "Remove from Favourite"
                                : "إزالة من المفضلة"}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col flex-wrap gap-2 md:flex-row md:gap-4 mt-4">
                    <Link
                        to={`#`}
                        className="px-5 py-3 bg-dark rounded-full text-white hover:text-custom-yellow"
                    >
                        {buttonTexts[lang]?.bookNow}
                    </Link>
                    <Link
                        to={`#`}
                        className="px-5 py-3 bg-dark rounded-full text-white hover:text-custom-yellow"
                    >
                        {buttonTexts[lang]?.startingFrom}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TourCard;
