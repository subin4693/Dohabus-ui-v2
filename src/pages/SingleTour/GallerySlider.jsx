import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const MediaGallery = ({ mediaUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < mediaUrls?.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="h-96 w-screen flex justify-center items-center my-10 px-5  ">
      <div className="h-full w-full md:w-2/3 justify-center items-center flex relative">
        {/* Previous Image Preview */}
        {currentIndex > 0 && (
          <div className="w-1/2 h-80 rounded-3xl overflow-hidden -z-10 absolute -left-10 hidden sm:inline">
            <img
              src={mediaUrls && mediaUrls[currentIndex - 1]}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Main Image */}
        <div className="w-full sm:w-2/3 h-full overflow-hidden rounded-3xl shadow-xl relative">
          {/* Previous Icon */}
          <IoIosArrowBack
            className="absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer text-white w-10 h-10"
            onClick={handlePrev}
          />

          <img
            src={mediaUrls && mediaUrls[currentIndex]}
            className="w-full h-full object-cover"
          />

          {/* Next Icon */}
          <IoIosArrowForward
            className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer text-white w-10 h-10"
            onClick={handleNext}
          />
        </div>

        {/* Next Image Preview */}
        {currentIndex < mediaUrls?.length - 1 && (
          <div className="w-1/2 h-80 rounded-3xl overflow-hidden -z-10 absolute -right-10 hidden sm:inline">
            <img
              src={mediaUrls && mediaUrls[currentIndex + 1]}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaGallery;
