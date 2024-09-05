import React, { useState, useEffect } from "react";

import axios from "axios";

import aboutmd1 from "../assets/about-md-1.png";
import travelaward from "../assets/travelaward-about.jpeg";
import log from "../assets/logo.png";

// import { CiMail } from "react-icons/ci";
// import { FaPhoneAlt } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoClose, IoArrowBack, IoArrowForward } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa"; // Call icon
import { AiOutlineMail } from "react-icons/ai"; // Email icon
import { FaWhatsapp } from "react-icons/fa"; // WhatsApp icon
import {
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaFacebook,
  FaTripadvisor,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly
  const [selectedImage, setSelectedImage] = useState(null);
  // const album = [album1, album2, album3, album4, album5, album6];

  const [album, setAlbum] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(BASE_URL + "/footer");
        console.log(data?.data?.images);
        setAlbum(data?.data?.images);
      } catch (error) {
        console.log(error);
      }
      // setSlides(data?.data?.data?.banner);
    };
    getData();
  }, []);
  const getPreviousIndex = (currentIndex, length) => {
    return currentIndex === 0 ? length - 1 : currentIndex - 1;
  };

  const getNextIndex = (currentIndex, length) => {
    return currentIndex === length - 1 ? 0 : currentIndex + 1;
  };
  const settings = {
    className: "slider variable-width",
    dots: true,
    speed: 500,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    cssEase: "ease-in-out",
    nextArrow: <NextArrow />, // Custom Next Arrow
    prevArrow: <PrevArrow />,
  };
  return (
    <>
      <div className="bg-yellow-400 p-1 md:px-20 flex flex-col justify-center items-center ">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 place-items-start text-dark">
          {/* Useful Pages Section */}
          <div className="space-y-5">
            <h2 className="text-2xl font-bold">Useful Pages</h2>
            <ul className="space-y-2 font-semibold text-lg">
              <Link to={"/offer-promo"}>
                <li className="cursor-pointer hover:underline">
                  Offers & Promotions
                </li>
              </Link>
              <Link to={"/guidelines"}>
                <li className="cursor-pointer hover:underline">Guidelines</li>
              </Link>
              <li className="cursor-pointer hover:underline">
                <Link to="/blogs">Blog</Link>
              </li>
              <li className="cursor-pointer hover:underline">
                <Link to="/blogs-create">Write Blog</Link>
              </li>
              <Link to={"/Faq"}>
                <li className="cursor-pointer hover:underline">FAQ</li>
              </Link>
              <Link to={"/termandconditions"}>
                <li className="cursor-pointer hover:underline">
                  Terms & Conditions
                </li>
              </Link>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="space-y-5">
            <h2 className="text-2xl font-bold">Contact Us</h2>
            <ul className="space-y-2 font-semibold text-lg">
              <li className="flex items-center gap-2">
                <FaPhoneAlt size={20} /> +974 4442 244
              </li>
              <li className="flex items-center gap-2">
                <FaWhatsapp size={20} /> +974 4442 244
              </li>
              <li className="flex items-center gap-2">
                <AiOutlineMail size={20} /> hello@dohabus.com
              </li>
            </ul>
            <div className="max-w-[200px] ">
              <img src={travelaward} alt="" />
            </div>
          </div>

          {/* Media Section */}
          <div className="space-y-5">
            <h2 className="text-2xl font-bold">Media</h2>
            <div className="grid grid-cols-3 gap-3">
              {album?.map((photo, index) => (
                <img
                  key={index}
                  src={photo.image}
                  alt={`Photo ${index}`}
                  className="object-cover w-full h-[100px] cursor-pointer transition-transform hover:scale-105"
                  onClick={() => setSelectedImage(index)}
                />
              ))}{" "}
            </div>
          </div>

          {/* Social Media Links */}
          <div className="space-y-5 ">
            <h2 className="text-2xl font-bold">Follow Us</h2>
            <div className="flex flex-wrap gap-2">
              <Link
                to="http://wa.me/97433246556"
                className="p-2 text-white bg-black rounded-full"
              >
                <FaWhatsapp size={20} />
              </Link>
              <Link
                to="https://www.tripadvisor.com/Attraction_Review-g294009-d6215547-Reviews-Doha_Bus-Doha.html"
                className="p-2 text-white bg-black rounded-full"
              >
                <FaTripadvisor size={20} />
              </Link>
              <Link
                to="https://www.facebook.com/DohaBus/"
                className="p-2 text-white bg-black rounded-full"
              >
                <FaFacebook size={20} />
              </Link>
              <Link
                to="https://www.linkedin.com/company/100753681/admin/dashboard/"
                className="p-2 text-white bg-black rounded-full"
              >
                <FaLinkedin size={20} />
              </Link>
              <Link
                to="https://www.instagram.com/doha_bus/?hl=en"
                className="p-2 text-white bg-black rounded-full"
              >
                <FaInstagram size={20} />
              </Link>
              <Link
                to="https://www.youtube.com/channel/UCAiEl0u3qaOIHL7zlTP8IgQ"
                className="p-2 text-white bg-black rounded-full"
              >
                <FaYoutube size={20} />
              </Link>
            </div>{" "}
            <div className="gap-5 flex">
              <div className="w-[90px]">
                <img src={aboutmd1} alt="" />
              </div>
              <div className="w-[90px]">
                <img src={aboutmd1} alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-1 text-center text-lg flex justify-between  w-full items-center ">
          <p>© Copyright 2022 - Doha Bus - All Rights Reserved</p>

          <div className="w-[200px] hidden md:inline">
            <img src={log} alt="" />
          </div>
        </div>
      </div>

      {/* Image Modal for Media Section */}
      {selectedImage !== null && (
        <div className="slider-container fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-70">
          <button
            className="absolute top-20 right-20  z-20"
            onClick={() => setSelectedImage(null)}
          >
            <IoClose className="text-2xl text-white" />
          </button>
          <Slider {...settings} className="w-screen">
            {album.map((image, index) => (
              <div
                key={index}
                className={`h-[89vh]   scale-75 flex-shrink-0   overflow-hidden flex justify-center items-center duration-500 ${
                  index === selectedImage ? "" : ""
                }`}
                style={{
                  width: window.innerWidth <= 640 ? "70vw" : "50vw",

                  margin: "0 20px", // Adjust the gap here
                }}
              >
                {console.log(window.innerWidth)}
                <img
                  src={image.image}
                  alt={`Slide ${index}`}
                  className="w-full h-full object-cover hover:scale-105 duration-300"
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};

export default Footer;
const NextArrow = ({ onClick }) => {
  return (
    <button
      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black p-2 rounded-full opacity-75 hover:opacity-100"
      onClick={onClick}
    >
      <IoArrowForward className="text-2xl" />
    </button>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <button
      className="absolute z-10 left-2 top-1/2 transform -translate-y-1/2 text-white bg-black p-2 rounded-full opacity-75 hover:opacity-100"
      onClick={onClick}
    >
      <IoArrowBack className="text-2xl" />
    </button>
  );
};

// <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-70">
//     <Swiper
//         effect={"coverflow"}
//         grabCursor={true}
//         centeredSlides={true}
//         loop={true}
//         slidesPerView={"auto"}
//         modules={[EffectCoverflow, Pagination, Navigation]}
//         className="swiper_container bg-red-500 w-[500px]"
//     >
// {album.map((image, index) => (
//     <SwiperSlide
//         key={index}
//         className={`min-w-full flex-shrink-0 overflow-hidden flex justify-center items-center duration-500 ${
//             index === selectedImage
//                 ? "scale-50 mx-20"
//                 : ""
//         }`}
//     >
//         <img
//             src={image.image}
//             alt={`Slide ${index}`}
//             className="w-full h-full object-cover hover:scale-105 duration-300"
//         />
//     </SwiperSlide>
// ))}

//         <div className="slider-controler">
//             <div className="swiper-button-prev slider-arrow">
//                 <IoArrowForward name="arrow-back-outline" />
//             </div>
//             <div className="swiper-button-next slider-arrow">
//                 <IoArrowBack name="arrow-forward-outline" />
//             </div>
//             <div className="swiper-pagination"></div>
//         </div>
//     </Swiper>
// </div>

// /*
// <div className="relative flex items-center justify-center w-full h-[65vh] overflow-hidden">
//                         {/* Images Container */}
//                         <div
//                             className="flex transition-transform duration-500 ease-in-out w-[50%] bg-red-500  "
//                             style={{
//                                 transform: `translateX(-${selectedImage + selectedImage * 50}%)`,
//                             }}
//                         >
//                             {" "}
//                             {album.map((image, index) => (
//                                 <div
//                                     key={index}
//                                     className={`min-w-full flex-shrink-0 overflow-hidden flex justify-center items-center duration-500 ${
//                                         index === selectedImage
//                                             ? "scale-50 mx-20"
//                                             : ""
//                                     }`}
//                                 >
//                                     <img
//                                         src={image.image}
//                                         alt={`Slide ${index}`}
//                                         className="w-full h-full object-cover hover:scale-105 duration-300"
//                                     />
//                                 </div>
//                             ))}
//                         </div>
//                         <button
//                             className="absolute left-12 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
//                             onClick={handlePreviousImage}
//                         >
//                             <IoArrowBack size={24} />
//                         </button>
//                         <button
//                             className="absolute right-12 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
//                             onClick={handleNextImage}
//                         >
//                             <IoArrowForward size={24} />
//                         </button>
//                     </div>
//  */
