import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const MediaGallery = ({ mediaUrls, mediaVideoUrls }) => {
  let media = [
    ...mediaUrls,
    ...mediaVideoUrls,
    ...mediaUrls,
    ...mediaVideoUrls,
    ...mediaUrls,
    ...mediaVideoUrls,
    ...mediaUrls,
    ...mediaVideoUrls,
    ...mediaUrls,
    ...mediaVideoUrls,
  ];
  media = [...media];
  const [activeIndex, setActiveIndex] = useState(0);

  // Calculate dynamic slidesToShow
  const slidesToShow = media.length < 3 ? media.length : 3;

  // Slider settings
  const settings = {
    className: "center",
    cssEase: "linear",

    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: media.length > 1, // Only enable center mode if there's more than 1 item
    infinite: media.length > 3, // Disable infinite scrolling if there are <= 3 items
    centerPadding: media.length > 1 ? "60px" : "0px", // Adjust padding based on media length
    slidesToShow: slidesToShow, // Show either the total number of media or 3
    speed: 500,
    nextArrow: <NextArrow className="text-white   z-20 w-10 h-10" />,
    slidesToScroll: 1,
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
    beforeChange: (oldIndex, newIndex) => {
      setActiveIndex(newIndex);
    },
  };
  if (media.length == 0) return <></>;

  return (
    <div className="h-96   w-screen flex justify-center items-center my-10 px-5">
      <div className="w-full md:w-2/3">
        {/* Slider Container */}
        <Slider {...settings}>
          {media.map((item, index) => (
            <div key={index} className="px-2">
              <div
                className={`w-full h-80 overflow-visible rounded-3xl shadow-xl duration-300 transform ${
                  index === activeIndex && media.length > 1
                    ? "scale-110 z-10"
                    : "scale-90"
                }`}
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
                    className="w-full h-full object-cover rounded-3xl"
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
