import React from "react";
// import { AiFillHeart } from "react-icons/ai";
// import { BiCart } from "react-icons/bi";
import {
  FaHeart as HeartIcon,
  FaShoppingCart as CartIcon,
} from "react-icons/fa";
import { FaRegClock as Watch } from "react-icons/fa";
import { FaMapMarkerAlt as LocationPin } from "react-icons/fa";

import { FaDollarSign as Dollar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
}) => {
  const lang = useSelector((state) => state.language.lang);
  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="h-[700px] w-[550px] bg-cover bg-center relative overflow-hidden group rounded-2xl mb-5"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="relative h-full w-full">
        <img
          src={image}
          className="w-full h-full bg-cover object-cover"
          alt=""
        />
        <h3 className="absolute top-[100px] left-1/2 transform -translate-x-1/2 font-semibold text-white text-center text-3xl">
          {title}
        </h3>
      </div>

      <div className="flex flex-wrap justify-center text-white items-center p-10 absolute bg-yellow-300 bg-opacity-100 inset-0 translate-y-full group-hover:bg-opacity-90 group-hover:translate-y-0 duration-500">
        <h3 className=" mt-5 font-semibold  text-black  text-3xl">{title}</h3>
        <div className="mt-5 w-full flex flex-col items-center ">
          <div>
            <div className="flex items-center gap-5 ">
              <Watch color="black" size={50} />{" "}
              <div>
                <h2 className="text-3xl text-black font-bold">
                  {lang === "ar" ? "مدة الجولة" : "Tour Duration"}
                </h2>

                <p className="text-2xl text-black font-semibold w-[300px] overflow-hidden">
                  {duration[lang] ? duration[lang] : "--"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 mt-5 justify-c enter">
              <LocationPin color="black" size={50} />{" "}
              <div>
                <h2 className="text-3xl text-black font-bold">
                  {lang === "ar" ? "نقطة البداية" : "Starting Point"}
                </h2>

                <p className="text-2xl text-black font-semibold w-[300px] h-[65px] overflow-hidden">
                  {itinerary && itinerary[lang] ? itinerary[lang] : "--"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 mt-5 justi fy-center">
              <Dollar color="black" size={50} />{" "}
              <div>
                <h2 className="text-3xl text-black font-bold">
                  {lang === "ar" ? "السعر يبدأ من" : "Price Starts From"}
                </h2>

                <p className="text-2xl text-black font-semibold w-[300px]">
                  QAR {childPrice ? childPrice : "--"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center mt-20 justify-center gap-[8%]">
            <button
              onClick={() => {
                if (isInFavorites) return removeFromFav(favId);
                else return addToFav(catId, link);
              }}
              className="p-5 bg-white rounded-full cursor-pointer"
            >
              <HeartIcon
                style={{
                  color: isInFavorites ? "red" : "black",
                  fontSize: "2rem",
                }}
              />
            </button>
            <div className="">
              <Link to={link}>
                <button className="p-5 text-black text-2xl font-semibold rounded-full bg-white w-[180px]">
                  {lang === "ar" ? "عرض الجولة" : "View Tour"}
                </button>
              </Link>
            </div>
            <button
              onClick={() => {
                if (isInCart) return removeFromCart(cartId);
                else return addToCart(catId, link);
              }}
              className="p-5 bg-white rounded-full cursor-pointer"
            >
              <CartIcon
                style={{
                  color: isInCart ? "cyan" : "black",
                  fontSize: "2rem",
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
