import React, { useState } from "react";
import logo from "../assets/log.png";
import footer from "../assets/lfooter.jpg";

import trip from "../assets/trip.png";
import youtube from "../assets/youtube.png";
import insta from "../assets/instagram.png";
import whatsapp from "../assets/whatsapp.png";
import li from "../assets/linkedin.png";
import facebook from "../assets/facebook.png";

import album1 from "../assets/album1.jpg";
import album2 from "../assets/album2.jpg";
import album3 from "../assets/album3.jpg";
import album4 from "../assets/album4.jpg";
import album5 from "../assets/album5.jpg";
import album6 from "../assets/album6.jpg";

import { CiMail } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";

import { IoClose, IoArrowBack, IoArrowForward } from "react-icons/io5";
const Footer = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const album = [album1, album2, album3, album4, album5, album6];
  const handleNextImage = () => {
    setSelectedImage((prevIndex) => (prevIndex + 1) % album.length);
  };

  const handlePreviousImage = () => {
    setSelectedImage(
      (prevIndex) => (prevIndex - 1 + album.length) % album.length
    );
  };
  return (
    <>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-10 md:px-20 bg-cover"
        style={{ backgroundImage: `url(${footer})` }}
      >
        <div>
          <h2 className="text-white text-2xl font-bold mb-5">DohaBus</h2>
          <div className="w-[170px] h-[170px] bg-custom-yellow rounded-full p-7 border-white border-[2px]">
            <img src={logo} className="w-full h-full object-cover" />
          </div>
        </div>
        <div>
          <h2 className="text-white text-2xl font-bold mb-5">
            Get in touch...
          </h2>
          <div className="grid grid-cols-3 gap-1 max-w-[300px]">
            <img src={whatsapp} className="object-cover w-full h-full" />
            <img src={youtube} className="object-cover w-full h-full" />
            <img src={li} className="object-cover w-full h-full" />
            <img src={insta} className="object-cover w-full h-full" />
            <img src={trip} className="object-cover w-full h-full" />
            <img src={facebook} className="object-cover w-full h-full" />
          </div>
        </div>
        <div>
          <h2 className="text-white text-2xl font-bold mb-5">Contact Us...</h2>
          <div className="flex  items-center gap-3 text-white text-lg font-bold">
            <CiMail className="text-2xl" />
            hello@dohabus.com
          </div>
          <div className="flex  items-center gap-3 text-white text-lg font-bold">
            <FaPhoneAlt />
            +974 4442 2444
          </div>
        </div>
        <div>
          <h2 className="text-white text-2xl font-bold mb-5">Album</h2>
          <div className="grid grid-cols-3 gap-1 max-w-[350px]">
            {album.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Photo ${index}`}
                className="object-cover w-full h-full cursor-pointer"
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
          <div
            className={`fixed inset-0   flex justify-center items-center transition-opacity duration-300 ${
              selectedImage !== null ? "z-10" : "-z-10 opacity-0"
            }`}
          >
            <div
              className={`fixed inset-0 bg-black  transition-opacity duration-300 ${
                selectedImage !== null ? "opacity-70" : "-z-10 opacity-0"
              }`}
            >
              {" "}
            </div>
            <div>
              {" "}
              {selectedImage !== null && (
                <div className="relative w-[80vw] max-w-[800px] h-[80vh]">
                  <IoClose
                    className="w-10 h-10 text-white cursor-pointer absolute -right-10 -top-10 p-2"
                    onClick={() => setSelectedImage(null)}
                  />
                  <img
                    src={album[selectedImage]}
                    alt={`Selected ${selectedImage}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    className="absolute -left-12 top-1/2 transform -translate-y-1/2 p-2 text-white"
                    onClick={handlePreviousImage}
                  >
                    <IoArrowBack className="w-8 h-8" />
                  </button>
                  <button
                    className="absolute -right-12 top-1/2 transform -translate-y-1/2 p-2 text-white"
                    onClick={handleNextImage}
                  >
                    <IoArrowForward className="w-8 h-8" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 md:px-20 bg-custom-yellow text-sm">
        <p>© Copyright 2022 -Doha Bus - All Rights Reserved</p>
      </div>
    </>
  );
};

export default Footer;
