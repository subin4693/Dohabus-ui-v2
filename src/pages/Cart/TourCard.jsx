import React from "react";
import { BiCart } from "react-icons/bi";

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
            dir={lang === "ar" ? "rtl" : "ltr"}
            className="h-[500px] bg-cover bg-center relative overflow-hidden group"
            style={{ backgroundImage: `url(${image})` }}
        >
            <h3 className="absolute bottom-10 left-10 font-bold text-white text-2xl">
                {title}
            </h3>

            <div className="absolute inset-0 flex flex-col items-center justify-center p-5 bg-custom-yellow-light group-hover:translate-y-0 translate-y-full duration-500">
                <div className="absolute top-7 group/edit hover:bg-dark overflow-hidden right-7 flex justify-center items-center  duration-300 bg-white rounded-full   ">
                    <BiCart className="text-3xl m-2 group-hover/edit:text-white" />
                    <button className=" max-w-0  opacity-0 whitespace-nowrap group-hover/edit:text-white group-hover/edit:max-w-[170px] group-hover/edit:opacity-100 group-hover/edit:px-2 transition-all duration-300">
                        {buttonTexts[lang]?.removeFromCart}
                    </button>
                </div>

                <div className="flex flex-col flex-wrap gap-2 md:flex-row md:gap-4">
                    <button className="px-5 py-3 bg-dark rounded-full text-white hover:text-custom-yellow">
                        {buttonTexts[lang]?.bookNow}
                    </button>
                    <button className="px-5 py-3 bg-dark rounded-full text-white hover:text-custom-yellow">
                        {buttonTexts[lang]?.startingFrom}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TourCard;
