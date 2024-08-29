import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { useParams, useNavigate } from "react-router-dom";

import Slider from "./GallerySlider";
import Faq from "./Faq";

import Disc from "./Disc";
import DiscImage from "./DiscImage";

import { IoClose, IoArrowBack, IoArrowForward } from "react-icons/io5";
import { BiCart, BiTime } from "react-icons/bi";
import { useSelector } from "react-redux";

import languagesss from "../../assets/lang.png";
import men from "../../assets/men.png";

const SingleTour = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const lang = useSelector((state) => state.language.lang);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [session, setSession] = useState(null);
    const { user } = useSelector((state) => state.user);
    const { singletour } = useParams();
    // Function to check if a date is Wednesday or Sunday
    const isAvailableDay = (date) => {
        const day = date.getDay(); // Get the day index (0 for Sunday, 1 for Monday, etc.)
        return data?.availableDays?.includes(day); // Check if the day index is in the availableDays array
    };

    const album = [album1, album2, album3, album4, album5, album6];
    const handleNextImage = () => {
        setSelectedImage((prevIndex) => (prevIndex + 1) % album.length);
    };

    const handlePreviousImage = () => {
        setSelectedImage(
            (prevIndex) => (prevIndex - 1 + album.length) % album.length,
        );
    };
    const handleTicketCountChange = (type, isIncrement) => {
        if (type === "adult") {
            // Calculate new adult count
            const newCount = isIncrement
                ? adultCount + 1
                : Math.max(adultCount - 1, 0);
            setAdultCount(newCount);
            // Calculate new total price
            setTotalPrice(
                newCount * data.adultPrice + childCount * data.childPrice,
            );
        } else if (type === "child") {
            // Calculate new child count
            const newCount = isIncrement
                ? childCount + 1
                : Math.max(childCount - 1, 0);
            setChildCount(newCount);
            // Calculate new total price
            setTotalPrice(
                adultCount * data.adultPrice + newCount * data.childPrice,
            );
        }
    };

    const handleSession = (sess) => {
        setSession(sess);
    };
    const formatDateForBackend = (date) => {
        // Convert to ISO string without time
        const localDate = new Date(date);
        localDate.setHours(0, 0, 0, 0); // Set time to midnight in local time

        // Convert to UTC date
        const utcDate = new Date(
            Date.UTC(
                localDate.getFullYear(),
                localDate.getMonth(),
                localDate.getDate(),
            ),
        );

        return utcDate.toISOString();
    };

    const handleBookNow = async () => {
        console.log(selectedDate);
        // return;
        if (!user || !user.email) {
            navigate("/signin");
            return;
        }
        const isoDate = formatDateForBackend(selectedDate);
        try {
            const res = await axios.post(
                BASE_URL + "/tickets",
                {
                    date: isoDate,
                    adultQuantity: adultCount,
                    childQuantity: childCount,
                    session: session,
                    category: data.category,
                    plan: data._id,
                },
                { withCredentials: true },
            );
            alert("ticket booked successflly check you email for more details");
        } catch (error) {
            console.log(error);
        }
        // console.log(data.category);
        // console.log(data._id);
        // console.log({ selectedDate, adultCount, childCount, session });
    };
    const minDate = new Date();
    useEffect(() => {
        const getData = async () => {
            try {
                console.log("get data function clled **************");
                const data = await axios.get(BASE_URL + "/plans/" + singletour);
                console.log("*************");
                console.log(data);
                console.log("*************");

                setData(data.data.data.plan);
                // setAlbum(data?.data?.images);
                // setTours(data.data.data.plans);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, [singletour]);
    return (
        <div>
            <Banner
                image={data?.coverImage}
                title={"Monster Bus Tour in the Desert"}
                subTitle={"Home | Tours"}
            />

            <div className="flex justify-center items-center px-2  pt-10">
                <div className="flex w-screen md:w-[80vw]   flex-wrap">
                    <div className="w-full md:w-3/4  space-y-10    flex flex-col justify-center ">
                        <div>
                            <h2 className="text-3xl font-bold">
                                About this activity
                            </h2>

                            <div className="relative grid grid-cols-1 md:grid-cols-2 mt-5 bg-custom-yellow w-full md:w-4/5 p-5 gap-3 rounded-lg shadow-xl">
                                {/* <div className=" rotate-[40deg] absolute w-[50px] h-[50px] bg-red-500 bottom-0 left-0"></div> */}
                                <div className="flex  gap-5 items-center ">
                                    <BiTime className="w-[60px] h-[60px]" />
                                    <div>
                                        <h4 className="font-bold text-lg">
                                            Time Duration
                                        </h4>
                                        <p>
                                            {data.duration &&
                                                data?.duration[lang]}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex  gap-5 items-center ">
                                    <FaBus className="w-[60px] h-[60px]" />

                                    <div>
                                        <h4 className="font-bold text-lg">
                                            Transportation
                                        </h4>
                                        <p>
                                            {data?.transportation &&
                                                data?.transportation[lang]}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex  gap-5 items-center ">
                                    <img
                                        src={men}
                                        className="w-[70px] h-[70px] object-cover"
                                    />
                                    <div>
                                        <h4 className="font-bold text-lg">
                                            Type of Tour
                                        </h4>
                                        <p>
                                            {data?.language &&
                                                data?.language[lang]}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex  gap-5 items-center ">
                                    <img
                                        src={languagesss}
                                        className="w-[70px] h-[70px] object-cover"
                                    />

                                    <div>
                                        <h4 className="font-bold text-lg">
                                            Language
                                        </h4>
                                        <p>
                                            {data?.typeOfTour &&
                                                data?.typeOfTour[lang]}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold">Description</h2>

                            <div className="relative  mt-5 bg-custom-yellow w-full md:w-4/5 p-5  rounded-lg shadow-xl">
                                <p>
                                    {data.description && data.description[lang]}
                                </p>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold">Highlights</h2>

                            <div className="relative  mt-5 bg-custom-yellow w-full md:w-4/5 p-5  rounded-lg shadow-xl">
                                <ul className="list-disc pl-5">
                                    {data.highlights &&
                                        data.highlights.map((item) => (
                                            <li>{item[lang]}</li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold">
                                What’s Included?
                            </h2>

                            <div className="relative  mt-5 bg-custom-yellow w-full   md:w-4/5 p-5  rounded-lg shadow-xl">
                                <ul className="list-disc pl-5">
                                    {data.includes &&
                                        data.includes.map((item) => (
                                            <li>{item[lang]}</li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold">Itinerary</h2>

                            <div className="relative  mt-5  pl-7  w-full md:w-4/5 py-5  rounded-lg ">
                                <ul>
                                    {data?.itinerary &&
                                        data.itinerary.map((item, index) => {
                                            if (
                                                index ==
                                                    data?.itinerary.length -
                                                        2 ||
                                                index == 1
                                            )
                                                return (
                                                    <li
                                                        className={` ${index == data?.itinerary.length - 1 ? "pt-[90px]" : "pb-[90px]"}   border-l border-l-4   border-dashed border-black flex  items-center relative`}
                                                    >
                                                        <DiscImage />
                                                        <span className="pl-10">
                                                            {item[lang]}
                                                        </span>
                                                    </li>
                                                );

                                            return (
                                                <li
                                                    className={`${index == data?.itinerary.length - 1 ? " pb-0 " : " pb-[90px] "}  
                                            ${index == 0 || index == data?.itinerary.length - 3 ? " border-dashed  " : "border-solid "}  


                                             border-l border-l-4   border-solid border-black flex  items-center relative`}
                                                >
                                                    <Disc />
                                                    <span className="pl-10">
                                                        {item[lang]}
                                                    </span>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/4   relative">
                        <div>
                            <h2 className="text-xl font-bold">
                                Choose date and time
                            </h2>
                            <br />
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                filterDate={isAvailableDay} // Disable all days not in availableDays
                                inline
                                dateFormat="MMMM d, yyyy"
                                className="w-full"
                                minDate={minDate}
                            />
                        </div>
                        <div>
                            <h2 className="text-xl mt-5 font-bold">Sessions</h2>
                            <div className="flex justify-start items-center gap-5 flex-wrap mt-5">
                                {data.sessions &&
                                    data.sessions.map((sessionL) => (
                                        <button
                                            className={`px-3 py-2 border border-black border-3 rounded-md flex gap-3 items-center ${sessionL == session && " bg-custom-yellow "}`}
                                            onClick={() =>
                                                handleSession(sessionL)
                                            }
                                        >
                                            <BiTime className="w-[25px] h-[25px]" />{" "}
                                            {sessionL}
                                        </button>
                                    ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl mt-5 font-bold">
                                Participants
                            </h2>
                            <div className="p-4 bg-gray-100 rounded-md max-w-md mx-auto">
                                {/* Adult Ticket Section */}
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <h2 className="text-lg font-semibold">
                                            Adult
                                        </h2>
                                        <p>Price: {data?.adultPrice} qar</p>
                                    </div>
                                    <div className="flex items-center">
                                        {/* Minus Button */}
                                        <button
                                            onClick={() =>
                                                handleTicketCountChange(
                                                    "adult",
                                                    false,
                                                )
                                            }
                                            className="w-10 h-10 bg-gray-300 rounded-full text-lg font-bold mx-2"
                                        >
                                            -
                                        </button>
                                        {/* Display Adult Ticket Count */}
                                        <span className="text-lg font-semibold">
                                            {adultCount}
                                        </span>
                                        {/* Plus Button */}
                                        <button
                                            onClick={() =>
                                                handleTicketCountChange(
                                                    "adult",
                                                    true,
                                                )
                                            }
                                            className="w-10 h-10 bg-gray-300 rounded-full text-lg font-bold mx-2"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Child Ticket Section */}
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <h2 className="text-lg font-semibold">
                                            Child
                                        </h2>
                                        <p>Price: {data?.childPrice} qar</p>
                                    </div>
                                    <div className="flex items-center">
                                        {/* Minus Button */}
                                        <button
                                            onClick={() =>
                                                handleTicketCountChange(
                                                    "child",
                                                    false,
                                                )
                                            }
                                            className="w-10 h-10 bg-gray-300 rounded-full text-lg font-bold mx-2"
                                        >
                                            -
                                        </button>
                                        {/* Display Child Ticket Count */}
                                        <span className="text-lg font-semibold">
                                            {childCount}
                                        </span>
                                        {/* Plus Button */}
                                        <button
                                            onClick={() =>
                                                handleTicketCountChange(
                                                    "child",
                                                    true,
                                                )
                                            }
                                            className="w-10 h-10 bg-gray-300 rounded-full text-lg font-bold mx-2"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Total Price Display */}
                                <div className="mt-4">
                                    <h2 className="text-xl font-bold">
                                        Total Price: ${totalPrice}
                                    </h2>
                                    <br />
                                    <button
                                        onClick={handleBookNow}
                                        className="px-4 py-2 font-bold rounded-md bg-custom-yellow text-black hover:text-white hover:bg-black duration-300"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Slider
                mediaUrls={data && data.galleryimages ? data.galleryimages : []}
                mediaVideoUrls={
                    data && data.galleryvideos ? data.galleryvideos : []
                }
            />
            <div className="flex justify-center items-center px-2  mb-10 ">
                <div className="flex    flex-wrap  w-[80vw]">
                    <div className="w-full   space-y-10    flex flex-col justify-center ">
                        <div>
                            <h2 className="text-3xl font-bold mb-5">FAQs</h2>
                            <Faq
                                faqData={data.faq ? data?.faq : []}
                                lang={lang}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleTour;
