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
            (prevIndex) => (prevIndex - 1 + album.length) % album.length,
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
            <div className="bg-yellow-400 p-10 md:px-20">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 place-items-start text-dark">
                    {/* Useful Pages Section */}
                    <div className="space-y-5">
                        <h2 className="text-2xl font-bold">Useful Pages</h2>
                        <ul className="space-y-2 font-semibold text-lg">
                            <li className="cursor-pointer hover:underline">
                                Offers & Promotions
                            </li>
                            <li className="cursor-pointer hover:underline">
                                Guidelines
                            </li>
                            <li className="cursor-pointer hover:underline">
                                <Link to="/blogs">Blog</Link>
                            </li>
                            <li className="cursor-pointer hover:underline">
                                FAQ
                            </li>
                            <li className="cursor-pointer hover:underline">
                                Terms & Conditions
                            </li>
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
                            {album?.map((photo, index) => (
                                <img
                                    key={index}
                                    src={photo.image}
                                    alt={`Photo ${index}`}
                                    className="object-cover w-full h-[100px] cursor-pointer transition-transform hover:scale-105"
                                    onClick={() => setSelectedImage(index)}
                                />
                            ))}{" "}
                            {album?.map((photo, index) => (
                                <img
                                    key={index}
                                    src={photo.image}
                                    alt={`Photo ${index}`}
                                    className="object-cover w-full h-[100px] cursor-pointer transition-transform hover:scale-105"
                                    onClick={() => setSelectedImage(index)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="space-y-5 ">
                        <h2 className="text-2xl font-bold">Follow Us</h2>
                        <div className="flex flex-wrap">
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
                <div className="mt-10 text-center text-lg flex justify-between items-center ">
                    <p>© Copyright 2022 - Doha Bus - All Rights Reserved</p>

                    <div className="w-[200px] hidden md:inline">
                        <img src={log} alt="" />
                    </div>
                </div>
            </div>

            {/* Image Modal for Media Section */}
            {selectedImage !== null && (
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-70">
                    <div className="relative max-w-2xl p-5 bg-white rounded-lg">
                        <IoClose
                            className="absolute top-2 right-2 cursor-pointer text-black"
                            size={30}
                            onClick={() => setSelectedImage(null)}
                        />
                        <img
                            src={album[selectedImage].image}
                            alt={`Selected ${selectedImage}`}
                            className="w-full h-full object-cover rounded-md"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center">
                            <button
                                className="p-2 text-white bg-black rounded-full"
                                onClick={handlePreviousImage}
                            >
                                <IoArrowBack size={20} />
                            </button>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center">
                            <button
                                className="p-2 text-white bg-black rounded-full"
                                onClick={handleNextImage}
                            >
                                <IoArrowForward size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
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
