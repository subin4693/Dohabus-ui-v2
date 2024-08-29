import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const MediaGallery = ({ mediaUrls, mediaVideoUrls }) => {
  console.log({ mediaUrls, mediaVideoUrls });
  const media = [...mediaUrls, ...mediaVideoUrls];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < media.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const isVideo = media[currentIndex]?.includes(".mp4"); // Assuming video URLs end with '.mp4'

  return (
    <div className="h-96 w-screen flex justify-center items-center my-10 px-5">
      <div className="h-full w-full md:w-2/3 flex justify-center items-center relative">
        {/* Previous Media Preview */}
        {currentIndex > 0 && (
          <div className="w-1/2 h-80 rounded-3xl overflow-hidden -z-10 absolute -left-10 hidden sm:inline">
            {media[currentIndex - 1]?.includes(".mp4") ? (
              <video
                src={media[currentIndex - 1]}
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={media[currentIndex - 1]}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        )}

        {/* Main Media */}
        <div className="w-full sm:w-2/3 h-full overflow-hidden rounded-3xl shadow-xl relative">
          {/* Previous Icon */}
          <IoIosArrowBack
            className="absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer text-white w-10 h-10"
            onClick={handlePrev}
          />

          {isVideo ? (
            <video
              src={media[currentIndex]}
              className="w-full h-full object-cover"
              controls
              autoPlay
            />
          ) : (
            <img
              src={media[currentIndex]}
              className="w-full h-full object-cover"
              alt={`Media ${currentIndex}`}
            />
          )}

          {/* Next Icon */}
          <IoIosArrowForward
            className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer text-white w-10 h-10"
            onClick={handleNext}
          />
        </div>

        {/* Next Media Preview */}
        {currentIndex < media.length - 1 && (
          <div className="w-1/2 h-80 rounded-3xl overflow-hidden -z-10 absolute -right-10 hidden sm:inline">
            {media[currentIndex + 1]?.includes(".mp4") ? (
              <video
                src={media[currentIndex + 1]}
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={media[currentIndex + 1]}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaGallery;
