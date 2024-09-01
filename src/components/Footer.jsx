import React, { useState, useEffect } from "react";

import axios from "axios";

import aboutmd1 from "../assets/about-md-1.png";
import travelaward from "../assets/travelaward-about.jpeg";
import log from "../assets/logo.png";

// import { CiMail } from "react-icons/ci";
// import { FaPhoneAlt } from "react-icons/fa";

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
    const handleNextImage = () => {
        setSelectedImage((prevIndex) => (prevIndex + 1) % album.length);
    };

    const handlePreviousImage = () => {
        setSelectedImage(
            (prevIndex) => (prevIndex - 1 + album.length) % album.length
        );
    };
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
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-10 md:px-20  place-items-center bg-yellow-400">
                <div className="flex flex-col justify-between h-full ">
                    <div className="flex justify-between flex-wrap gap-10">
                        <div>
                            <h2 className="text-2xl font-bold mb-5 text-dark">
                                Useful Pages
                            </h2>
                            <ul className="font-semibold text-[1.2rem]">
                                <li className="cursor-pointer mt-1">
                                    Offers & Promotions
                                </li>
                                <li className="cursor-pointer mt-1">
                                    Guidlines
                                </li>
                                <li className="cursor-pointer mt-1">
                                    <Link to="blogs">Blog</Link>
                                </li>
                                <li className="cursor-pointer mt-1">FAQ</li>
                                <li className="cursor-pointer mt-1">
                                    Terms & Conditions
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-5 text-dark">
                                Contact Us
                            </h2>
                            <ul className="font-semibold text-[1.2rem]">
                                <li className="cursor-pointer mt-2 flex items-center gap-2">
                                    <FaPhoneAlt size={30} /> +974 4442 244
                                </li>
                                <li className="cursor-pointer mt-2 flex items-center gap-2">
                                    <FaWhatsapp size={35} /> +974 4442 244
                                </li>
                                <li className="cursor-pointer mt-2 flex items-center gap-2">
                                    <AiOutlineMail size={35} />{" "}
                                    hello@dohabus.com
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-auto p-5  text-lg text-center">
                        <p>© Copyright 2022 - Doha Bus - All Rights Reserved</p>
                    </div>
                </div>

                {/* <div className="p-5 md:px-20 bg-custom-yellow text-lg text-center">
            <p>© Copyright 2022 -Doha Bus - All Rights Reserved</p>
          </div> */}

                <div className="flex flex-col items-center justify-between h-full">
                    <div className="gap-5 flex flex-col flex-wrap">
                        <div className="gap-5 flex">
                            <div className="w-[130px]">
                                <img src={aboutmd1} alt="" />
                            </div>
                            <div className="w-[130px]">
                                <img src={aboutmd1} alt="" />
                            </div>
                        </div>
                        <div className="w-[300px] ">
                            <img src={travelaward} alt="" />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-[300px]">
                            <img src={log} alt="" />
                        </div>
                    </div>
                </div>

                {
                    <div className="flex flex-col justify-between h-full ">
                        <div>
                            <h2 className="text-dark text-2xl font-bold mb-5">
                                Media
                            </h2>
                            <div className="grid grid-cols-3 gap-3 max-w-[400px]">
                                {album &&
                                    album?.map((photo, index) => (
                                        <img
                                            key={index}
                                            src={photo.image}
                                            alt={`Photo ${index}`}
                                            className="object-cover w-full h-full cursor-pointer transition duration-300 hover:bg-custom-yellow hover:mix-blend-multiply"
                                            onClick={() =>
                                                setSelectedImage(index)
                                            }
                                        />
                                    ))}
                            </div>
                            <div
                                className={`fixed inset-0   flex justify-center items-center transition-opacity duration-300 ${
                                    selectedImage !== null
                                        ? "z-10"
                                        : "-z-10 opacity-0"
                                }`}
                            >
                                <div
                                    className={`fixed inset-0 bg-black  transition-opacity duration-300 ${
                                        selectedImage !== null
                                            ? "opacity-70"
                                            : "-z-10 opacity-0"
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
                                                onClick={() =>
                                                    setSelectedImage(null)
                                                }
                                            />

                                            <img
                                                src={album[selectedImage].image}
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
                        <div className="flex gap-1 mt-10">
                            <p className="text-white bg-black p-3 rounded-full">
                                <Link to={"http://wa.me/97433246556"}>
                                    <FaWhatsapp size={30} />
                                </Link>
                            </p>
                            <p className="text-white bg-black p-3 rounded-full">
                                <Link
                                    to={
                                        "https://www.tripadvisor.com/Attraction_Review-g294009-d6215547-Reviews-Doha_Bus-Doha.html"
                                    }
                                >
                                    <FaTripadvisor size={30} />
                                </Link>
                            </p>
                            <p className="text-white bg-black p-3 rounded-full">
                                <Link to={"https://www.facebook.com/DohaBus/"}>
                                    <FaFacebook size={30} />
                                </Link>
                            </p>
                            <p className="text-white bg-black p-3 rounded-full">
                                <Link
                                    to={
                                        "https://www.linkedin.com/company/100753681/admin/dashboard/"
                                    }
                                >
                                    <FaLinkedin size={30} />
                                </Link>
                            </p>
                            <p className="text-white bg-black p-3 rounded-full">
                                <Link
                                    to={
                                        "https://www.instagram.com/doha_bus/?hl=en"
                                    }
                                >
                                    <FaInstagram size={30} />
                                </Link>
                            </p>

                            <p className="text-white bg-black p-3 rounded-full">
                                <Link
                                    to={
                                        "https://www.youtube.com/channel/UCAiEl0u3qaOIHL7zlTP8IgQ"
                                    }
                                >
                                    <FaYoutube size={30} />
                                </Link>
                            </p>
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

export default Footer;

{
    /* <div>
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
        </div> */
}
