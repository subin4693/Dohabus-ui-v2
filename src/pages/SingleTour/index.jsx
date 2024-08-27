import React, { useState } from "react";
import Banner from "../../components/Banner";
import Reviews from "./Reviews";
import { FaBus } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LuLanguages } from "react-icons/lu";
import singleTour from "../../assets/single-tour.jpg";
import album1 from "../../assets/album1.jpg";
import album2 from "../../assets/album2.jpg";
import album3 from "../../assets/album3.jpg";
import album4 from "../../assets/album4.jpg";
import album5 from "../../assets/album5.jpg";
import album6 from "../../assets/album6.jpg";

import { IoClose, IoArrowBack, IoArrowForward } from "react-icons/io5";
import { BiCart, BiTime } from "react-icons/bi";
import { useSelector } from "react-redux";
const SingleTour = () => {
    const lang = useSelector((state) => state.language.lang);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    // Function to check if a date is Wednesday or Sunday
    const isWednesdayOrSunday = (date) => {
        const day = date.getDay();
        return day === 0 || day === 3; // 0 = Sunday, 3 = Wednesday
    };

    const album = [album1, album2, album3, album4, album5, album6];
    const handleNextImage = () => {
        setSelectedImage((prevIndex) => (prevIndex + 1) % album.length);
    };

    const handlePreviousImage = () => {
        setSelectedImage(
            (prevIndex) => (prevIndex - 1 + album.length) % album.length
        );
    };
    const data = {
        category: "64f8f2a6e75b3f00457e8abc", // Example ObjectId for the category
        coverImage: "https://example.com/images/cover-image.jpg", // Example cover image URL
        title: {
            en: "Desert Safari Adventure",
            ar: "مغامرة سفاري الصحراء",
        },
        duration: {
            en: "3 Days 2 Nights",
            ar: "3 أيام 2 ليالي",
        },
        typeOfTour: {
            en: "Adventure",
            ar: "مغامرة",
        },
        transportation: {
            en: "4x4 Vehicle",
            ar: "مركبة دفع رباعي",
        },
        language: {
            en: "English, Arabic",
            ar: "الإنجليزية، العربية",
        },
        description: {
            en: "Experience the thrill of a desert safari with dune bashing, camel rides, and more.",
            ar: "استمتع بإثارة رحلة السفاري في الصحراء مع ركوب الكثبان والجمال والمزيد.",
        },
        highlights: [
            {
                en: "Dune Bashing",
                ar: "التزحلق على الكثبان الرملية",
            },
            {
                en: "Camel Riding",
                ar: "ركوب الجمال",
            },
        ],
        includes: [
            {
                en: "Hotel pickup and drop-off",
                ar: "التوصيل من وإلى الفندق",
            },
            {
                en: "Meals and beverages",
                ar: "الوجبات والمشروبات",
            },
        ],
        itinerary: [
            {
                en: "Day 1: Arrival and check-in at the camp",
                ar: "اليوم 1: الوصول وتسجيل الدخول في المخيم",
            },
            {
                en: "Day 2: Desert activities and BBQ dinner",
                ar: "اليوم 2: الأنشطة الصحراوية وعشاء شواء",
            },
        ],
        gallerys: [
            "https://example.com/images/gallery1.jpg",
            "https://example.com/images/gallery2.jpg",
        ],
        availableDays: [1, 2, 4], // Days represented as numbers, e.g., 1 for Sunday, 2 for Monday, etc.
        sessions: ["8:00 AM", "12:00 PM", "4:00 PM"], // Example session times
        adultPrice: 400, // Price for adults
        childPrice: 250, // Price for children
    };

    return (
        <div>
            <Banner
                image={singleTour}
                title={"Monster Bus Tour in the Desert"}
                subTitle={"Home | Tours"}
            />
            <div className="flex px-32 flex-col md:flex-row mt-10">
                <div className="w-2/3 ">
                    <div className="">
                        <h2 className="text-3xl font-bold">
                            About this activity
                        </h2>

                        <div className="relative grid grid-cols-1 md:grid-cols-2 mt-5 bg-custom-yellow w-4/5 p-5 gap-3 rounded-lg shadow-xl">
                            {/* <div className=" rotate-[40deg] absolute w-[50px] h-[50px] bg-red-500 bottom-0 left-0"></div> */}
                            <div className="flex  gap-5 items-center ">
                                <BiTime className="w-[60px] h-[60px]" />
                                <div>
                                    <h4 className="font-bold text-lg">
                                        Time Duration
                                    </h4>
                                    <p>5 hours</p>
                                </div>
                            </div>
                            <div className="flex  gap-5 items-center ">
                                <BiTime className="w-[60px] h-[60px]" />

                                <div>
                                    <h4 className="font-bold text-lg">
                                        Time Duration
                                    </h4>
                                    <p>5 hours</p>
                                </div>
                            </div>
                            <div className="flex  gap-5 items-center ">
                                <FaBus className="w-[50px] h-[50px]" />

                                <div>
                                    <h4 className="font-bold text-lg">
                                        Time Duration
                                    </h4>
                                    <p>5 hours</p>
                                </div>
                            </div>
                            <div className="flex  gap-5 items-center ">
                                <LuLanguages className="w-[60px] h-[60px]" />

                                <div>
                                    <h4 className="font-bold text-lg">
                                        Time Duration
                                    </h4>
                                    <p>5 hours</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/3 bg-blue-500">
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        filterDate={isWednesdayOrSunday} // Disable all days except Wednesday and Sunday
                        inline
                        dateFormat="MMMM d, yyyy"
                    />
                </div>
            </div>
        </div>
    );
};

export default SingleTour;
