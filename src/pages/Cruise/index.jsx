import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import {
    FaSun,
    FaShip,
    FaMapMarkerAlt,
    FaMoon,
    FaAnchor,
} from "react-icons/fa";

import axios from "axios";
import { Link } from "react-router-dom";
const index = () => {
    const lang = useSelector((state) => state.language.lang);
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [currentSlide, setCurrentSlide] = useState(0);
    const [categories, setCategories] = useState([]);
    const [tours, setTours] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const CruiseData = await axios.get(BASE_URL + "/couries");
                // const toursData = await axios.get(BASE_URL + "/populor-couries");
                // setCategories(categoryData?.data?.data?.courise);
                setTours(CruiseData?.data?.data?.cruises);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    const itemsPerSlide = 3;

    const prevSlide = () => {
        setCurrentSlide((prev) =>
            prev === 0
                ? Math.ceil(categories.length / itemsPerSlide) - 1
                : prev - 1
        );
    };

    const nextSlide = () => {
        setCurrentSlide((prev) =>
            prev === Math.ceil(categories.length / itemsPerSlide) - 1
                ? 0
                : prev + 1
        );
    };
    return (
        <div>
            <Banner
                image="https://images.pexels.com/photos/9394657/pexels-photo-9394657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                title={lang === "ar" ? "عالمك من السعادة" : "Your world of joy"}
                subTitle={
                    lang === "ar"
                        ? "الرئيسية | باقات الرحلات"
                        : "Home | Cruise Packages"
                }
            />

            <section className="mb-5 px-16 mt-5">
                <motion.h2
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.2 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-3xl font-semibold mb-4 text-center"
                >
                    {lang === "en"
                        ? "Cruise Packages"
                        : "اكتشف الجولات الشهيرة"}
                </motion.h2>
                <Link to={"/contact"}>
                    <div className="cards flex flex-wrap gap-4 justify-center items-center">
                        {tours?.map((card, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ amount: 0.2 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="card w-[800px] border p-5 flex gap-10 flex-wrap shadow-lg"
                            >
                                <div className="w-[350px] h-[270px]">
                                    <img
                                        className="object-cover w-full h-full"
                                        src={card.coverImage}
                                        alt="Cruise"
                                    />
                                    <h1 className="text-xl bg-dark text-white p-1 text-center">
                                        {card.title[lang]}
                                    </h1>
                                </div>
                                <div className="w-[300px]">
                                    <h1 className=" flex gap-2 items-center">
                                        <span className="w-[40px] h-[40px] ">
                                            {" "}
                                            {/* <FaSun size={30} /> */}
                                            <img
                                                className="w-full h-full rounded-full object-cover"
                                                src={card.logo}
                                                alt={card.operatorName}
                                            />
                                        </span>
                                        <p>{card.operatorName}</p>
                                    </h1>

                                    <h2 className="mt-3 flex gap-2 items-center">
                                        {" "}
                                        <span>
                                            {" "}
                                            <FaShip
                                                className="text-gray-500"
                                                size={22}
                                            />
                                        </span>
                                        <p>{card.cruiseName}</p>
                                    </h2>
                                    <h2 className="mt-3 flex gap-2 items-center">
                                        {" "}
                                        <span>
                                            <FaMapMarkerAlt
                                                className="text-gray-500"
                                                size={22}
                                            />
                                        </span>
                                        <p>{card.location[lang]}</p>
                                    </h2>
                                    <h2 className="mt-3 flex gap-2 items-center">
                                        {" "}
                                        <span>
                                            <FaMoon
                                                className="text-gray-500"
                                                size={22}
                                            />
                                        </span>
                                        <p>{card.numberOfNights} Nights</p>
                                    </h2>
                                    <h2 className="mt-3 flex gap-2">
                                        <span>
                                            <FaAnchor
                                                className="text-gray-500"
                                                size={22}
                                            />
                                        </span>
                                        <p className="h-[100px] overflow-hidden">
                                            {card.stops
                                                ?.map(
                                                    (location) => location[lang]
                                                )
                                                .join(" | ")}
                                        </p>
                                    </h2>
                                    <div className="w-full bg-custom-yellow border p-1 text-center flex items-center justify-center">
                                        <button className="text-xl">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Link>
            </section>
        </div>
    );
};

export default index;
