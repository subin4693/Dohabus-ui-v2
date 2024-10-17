import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TourCard = ({ image, description, title, link }) => {
  const lang = useSelector((state) => state.language.lang);
  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="h-[500px]  bg-cover bg-center relative overflow-hidden group"
      style={{ backgroundImage: `url(${image})` }}
    >
   
      <div className="relative h-full w-full">
        <img
          src={image}
          className="w-full h-full bg-cover object-cover"
          alt=""
        />
          <h3 className="bottom-10 absolute left-10  font-bold text-white text-2xl">
        {title}
      </h3>
      </div>
      <div className="flex flex-col text-white justify-center items-start  p-10 absolute bg-custom-yellow-light inset-0 translate-y-full group-hover:translate-y-0 duration-500">
        <p className="text-lg  ">{description}</p>
        <Link to={`/tours/${link}`}>
          <button className="text-lg px-5 py-3 mt-3 bg-dark rounded-full hover:text-custom-yellow">
            {lang === "ar" ? "اكتشف" : "Discover"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TourCard;
