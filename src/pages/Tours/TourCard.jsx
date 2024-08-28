import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaRegClock as Watch } from "react-icons/fa"; // Watch icon from FontAwesome
import { FaMapMarkerAlt as LocationPin } from "react-icons/fa";
import {
  FaHeart as HeartIcon,
  FaShoppingCart as CartIcon,
} from "react-icons/fa";

import { FaDollarSign as Dollar } from "react-icons/fa";

const TourCard = ({ image, description, title, link }) => {
  const lang = useSelector((state) => state.language.lang);
  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="h-[700px] w-[550px] bg-cover bg-center relative overflow-hidden group rounded-2xl"
      style={{ backgroundImage: `url(${image})` }}
    >
      <h3 className="mt-[100px] font-semibold  text-black text-center text-3xl">
        {title}
      </h3>
      <div className="flex flex-wrap justify-center text-white items-center p-10 absolute bg-yellow-300 bg-opacity-100 inset-0 translate-y-full group-hover:bg-opacity-90 group-hover:translate-y-0 duration-500">
        <h3 className=" mt-5 font-semibold  text-black  text-3xl">{title}</h3>
        <div className="mt-5 w-full">
          <div className="flex items-center gap-5 justify-center">
            <Watch color="black" size={50} />{" "}
            <div>
              <h2 className="text-3xl text-black font-bold">Tour Durations</h2>

              <small className="text-2xl text-black font-semibold">
                4 Hours
              </small>
            </div>
          </div>
          <div className="flex items-center gap-5 mt-5 justify-center">
            <LocationPin color="black" size={50} />{" "}
            <div>
              <h2 className="text-3xl text-black font-bold">Tour Durations</h2>

              <small className="text-2xl text-black font-semibold">
                4 Hours
              </small>
            </div>
          </div>
          <div className="flex items-center gap-5 mt-5 justify-center">
            <Dollar color="black" size={50} />{" "}
            <div>
              <h2 className="text-3xl text-black font-bold">Tour Durations</h2>

              <small className="text-2xl text-black font-semibold">
                4 Hours
              </small>
            </div>
          </div>
          <div className="flex flex-row items-center mt-20 justify-center gap-[8%]">
            <div className="p-5 bg-white rounded-full cursor-pointer">
              <HeartIcon style={{ color: "black", fontSize: "2rem" }} />
            </div>
            <div className="">
              <button className="p-5 text-black text-2xl font-semibold rounded-full bg-white w-[180px]">
                View Tour
              </button>
            </div>
            <div className="p-5 bg-white rounded-full cursor-pointer">
              <CartIcon style={{ color: "black", fontSize: "2rem" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
