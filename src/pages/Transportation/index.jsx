import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Banner from "../../components/Banner";
import { FaUser } from "react-icons/fa";
import { FaSuitcase } from "react-icons/fa"; // Represents a suitcase/baggage
import { FaCogs } from "react-icons/fa"; // Represents settings (gears)
import { FaLink, FaTruck } from "react-icons/fa";
import { toast } from "react-toastify";
const Transportation = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly
    const [transportations, setTransportations] = useState([]);
    const lang = useSelector((state) => state.language.lang);
    const [formData, setFormData] = useState({
        transId: "",
        checkInDate: "",
        numberOfAdults: "",
        numberOfChildren: "",
        additionalRequest: "",
        email: "",
        name: "",
    });

    const openModal = (id) => {
        setFormData((prevData) => ({
            ...prevData,
            transId: id,
        }));
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(BASE_URL + "/transportations");
                setTransportations(res.data.data.transportations);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${BASE_URL}/transbook`, formData);
            toast.success(
                "Thank you for booking! Our support team will reach out to you.",
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                }
            );
            closeModal();
        } catch (error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    return (
        <div>
            <Banner
                image={
                    "https://images.pexels.com/photos/19096944/pexels-photo-19096944/free-photo-of-hot-air-balloons-in-the-yellow-sky-over-a-desert-and-people-standing-on-a-van.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                title={lang === "ar" ? "أسطول النقل" : "Transportation fleet"}
                subTitle={
                    lang === "ar"
                        ? "الرئيسية | أسطول النقل"
                        : "Home | Transportation fleet"
                }
            />
            <AnimatePresence>
                {isModalOpen && (
                    <div
                        className="fixed inset-0  bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-lg shadow-lg p-6 w-fit md:mx-0 max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="mt-4">
                                <div className="text-center">
                                    <h2 className="font-semibold text-2xl">
                                        {lang === "ar"
                                            ? "خدمات نقل موثوقة ومريحة"
                                            : "Reliable and Comfortable Transportation Services"}
                                    </h2>
                                    <p className="mt-4 text-[1.2rem]">
                                        {lang === "ar"
                                            ? "استمتع بخدمات نقل مريحة ومصممة لراحتك وسهولة التنقل."
                                            : "Experience seamless transportation services tailored for your comfort and convenience"}
                                    </p>
                                    <Link to={"/contact"}>
                                        <p className="text-[1.2rem] underline font-semibold text-blue-500">
                                            {lang === "ar"
                                                ? "اطرح علينا سؤالاً بدلاً من ذلك"
                                                : "Ask us a question instead"}
                                        </p>
                                    </Link>
                                </div>
                                <div className="mt-4">
                                    <form onSubmit={handleSubmit}>
                                        <div className="flex justify-between items-center gap-3">
                                            <div className="mt-10 w-full">
                                                <label className="text-lg font-semibold">
                                                    {lang === "ar"
                                                        ? "تاريخ الوصول"
                                                        : "Date"}
                                                </label>
                                                <br />
                                                <input
                                                    name="checkInDate"
                                                    value={formData.checkInDate}
                                                    onChange={handleChange}
                                                    className="border-2 border-gray-300 rounded outline-none px-3 p-3 w-full"
                                                    type="date"
                                                />
                                            </div>
                                            <div className="mt-10 w-full">
                                                <label className="text-lg font-semibold">
                                                    {lang === "ar"
                                                        ? "عدد الركاب"
                                                        : "Number of Passanger"}
                                                </label>
                                                <br />
                                                <input
                                                    name="numberOfAdults"
                                                    value={
                                                        formData.numberOfAdults
                                                    }
                                                    onChange={handleChange}
                                                    type="number"
                                                    className="border-2 border-gray-300 outline-none rounded px-3 p-3 w-full"
                                                    placeholder={
                                                        lang === "ar"
                                                            ? "عدد الركاب"
                                                            : "Number of Passanger"
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center gap-3 mt-3 w-full">
                                            <div className="w-full">
                                                <label className="text-lg font-semibold">
                                                    {lang === "ar"
                                                        ? "مكان الاستلام"
                                                        : "Pickup Location"}
                                                </label>
                                                <br />
                                                <input
                                                    name="numberOfChildren"
                                                    value={
                                                        formData.numberOfChildren
                                                    }
                                                    onChange={handleChange}
                                                    type="text"
                                                    className="border-2 border-gray-300 outline-none rounded px-3 p-3 w-full"
                                                    placeholder={
                                                        lang === "ar"
                                                            ? "مكان الاستلام"
                                                            : "Pickup Location"
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-3">
                                            <label className="text-lg font-semibold">
                                                {lang === "ar"
                                                    ? "طلب إضافي"
                                                    : "Additional Request"}
                                            </label>
                                            <br />
                                            <textarea
                                                name="additionalRequest"
                                                value={
                                                    formData.additionalRequest
                                                }
                                                onChange={handleChange}
                                                className="border-2 border-gray-300 outline-none rounded px-3 p-3 w-full"
                                                placeholder={
                                                    lang === "ar"
                                                        ? "طلب إضافي"
                                                        : "Additional Request"
                                                }
                                                rows="3"
                                            ></textarea>
                                        </div>

                                        <div className="flex justify-between items-center gap-3 mt-3 w-full">
                                            <div className="w-full">
                                                <label className="text-lg font-semibold">
                                                    {lang === "ar"
                                                        ? "البريد الإلكتروني"
                                                        : "Email"}
                                                </label>
                                                <br />
                                                <input
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    type="email"
                                                    className="border-2 border-gray-300 outline-none rounded px-3 p-3 w-full"
                                                    placeholder={
                                                        lang === "ar"
                                                            ? "أدخل البريد الإلكتروني"
                                                            : "Enter email"
                                                    }
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label className="text-lg font-semibold">
                                                    {lang === "ar"
                                                        ? "الاسم"
                                                        : "Full Name"}
                                                </label>
                                                <br />
                                                <input
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    type="text"
                                                    className="border-2 border-gray-300 outline-none rounded px-3 p-3 w-full"
                                                    placeholder={
                                                        lang === "ar"
                                                            ? "أدخل الاسم"
                                                            : "Enter name"
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-between pt-5 bg-opacity-50 gap-3">
                                            <button
                                                type="button"
                                                className="bg-yellow-500 text-white px-4 py-2 w-full font-semibold text-lg rounded hover:bg-dark"
                                                onClick={closeModal}
                                            >
                                                {lang === "ar"
                                                    ? "إغلاق"
                                                    : "Close"}
                                            </button>
                                            <button
                                                type="submit"
                                                className="bg-yellow-500 text-white w-full px-4 p-3 font-semibold text-lg rounded hover:bg-dark"
                                            >
                                                {lang === "ar"
                                                    ? "احجز الآن"
                                                    : "Book Now"}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="mt-10 mb-10">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.2 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-4xl p-5 text-center font-semibold "
                >
                    {lang === "ar" ? "أسطول النقل" : "TRANSPORTATION FLEET"}
                </motion.h1>

                <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-10 md:px-20">
                    {transportations.map((card, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ amount: 0.2 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="card w-full p-5 shadow-xl rounded-md border"
                            key={index}
                        >
                            <div className="relative group">
                                <img
                                    className="w-full h-[250px] object-cover border-2xl"
                                    src={card.coverImage}
                                    alt={card.title[lang]}
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-custom-yellow bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-white px-2 py-2 rounded-md">
                                        <button
                                            onClick={() => openModal(card._id)} // Pass the transportationId here
                                            className="font-semibold text-xl"
                                        >
                                            Rent Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5">
                                <h1 className="text-gray  font-semibold text-[1.6rem] hover:text-custom-yellow cursor-pointer">
                                    {card?.title[lang]}
                                </h1>
                                <small className="font-semibold text-[1.4rem] text-gray-500">
                                    {card?.type && card?.type[lang]}
                                </small>
                                {/* <ul className="h-[200px] mt-2 overflow-hidden text-gray-700 list-disc pl-5 text-[1.2rem]">
                  {card.places.map((feature, idx) => (
                    <li key={idx}>{feature[lang]}</li>
                  ))}
                </ul> */}
                                <div className="flex flex-col md:flex-row flex-wrap items-stretch gap-5 mt-5">
                                    <div className="box border p-1 px-4 flex items-center gap-2 h-full flex-grow">
                                        <FaUser size={22} />
                                        <small className="font-bold text-[1.2rem] text-gray-500">
                                            {card?.passenger && card?.passenger}
                                        </small>
                                    </div>
                                    <div className="box border p-1 px-4 flex items-center gap-2 h-full flex-grow">
                                        <FaSuitcase size={22} />
                                        <small className="font-bold text-[1.2rem] text-gray-500">
                                            {card?.luggage && card?.luggage}{" "}
                                            Bags
                                        </small>
                                    </div>
                                    <div className="box border p-1 px-4 flex items-center gap-2 h-full flex-grow">
                                        <FaCogs size={25} />
                                        <small className="font-bold text-[1.2rem] text-gray-500">
                                            {card?.other && card?.other[lang]}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Transportation;
