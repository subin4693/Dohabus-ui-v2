import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MediaGallery = ({ mediaUrls, mediaVideoUrls }) => {
  const media = [...mediaUrls, ...mediaVideoUrls];
  const [activeIndex, setActiveIndex] = useState(0);

  // Adjust slidesToShow based on media length
  const slidesToShow = media.length <= 3 ? media.length : 3;
  // Slider settings
  const settings = {
    className: "center",
    centerMode: slidesToShow > 1, // Only enable center mode if there are enough slides
    infinite: media.length > slidesToShow, // Disable infinite scroll if there are fewer items
    centerPadding: "60px",
    slidesToShow, // Use dynamic slidesToShow
    speed: 500,
    nextArrow: <NextArrow className="text-white   z-20 w-10 h-10" />,
    prevArrow: <PrevArrow className="text-white w-10 h-10" />,
    responsive: [
      {
        breakpoint: 1524,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    beforeChange: (index) => {
      if (media.length - 1 === index) setActiveIndex(0);
      else setActiveIndex(index + 1);
    },
  };

  return (
    <div className="h-96 bg-red-500  w-screen flex justify-center items-center my-10 px-5">
      <div className="w-full md:w-2/3 ">
        {/* Slider Container */}
        <Slider {...settings}>
          {media.map((item, index) => (
            <div key={index} className="px-2">
              <div
                className={`w-full h-80 overflow-visible rounded-3xl shadow-xl duration-300 transform ${index === activeIndex ? "scale-110 z-10" : "scale-90"} `}
                style={{
                  transition: "transform 0.5s ease",
                  transformOrigin: "center",
                }}
              >
                {/* Check if the media is video or image */}
                {item.includes(".mp4") ? (
                  <video
                    src={item}
                    className="w-full h-full object-cover rounded-3xl"
                    controls
                    autoPlay
                    muted
                  />
                ) : (
                  <img
                    src={item}
                    className="w-full h-full object-cover rounded-3xl  "
                    alt={`Media ${index}`}
                  />
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MediaGallery;
const NextArrow = ({ onClick }) => {
  return (
    <button
      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black p-2 rounded-full opacity-75 hover:opacity-100"
      onClick={onClick}
    >
      <IoIosArrowForward className="text-2xl" />
    </button>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <button
      className="absolute z-10 left-2 top-1/2 transform -translate-y-1/2  z-[1] text-white bg-black p-2 rounded-full opacity-75 hover:opacity-100"
      onClick={onClick}
    >
      <IoIosArrowBack className="text-2xl " />
    </button>
  );
};
