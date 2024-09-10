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
const Transportation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly
  const [transportations, setTransportations] = useState([]);
  const lang = useSelector((state) => state.language.lang);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(BASE_URL + "/transportations");
        console.log(res.data.data.transportations);
        setTransportations(res.data.data.transportations);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
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

      {/*      <div className="relative">
        <img
          className="h-[80vh] w-full object-cover"
          src="https://images.pexels.com/photos/19096944/pexels-photo-19096944/free-photo-of-hot-air-balloons-in-the-yellow-sky-over-a-desert-and-people-standing-on-a-van.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="img"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            TRANSPORTATION FLEET
          </h1>
          <p className="text-2xl mt-4">
            <span className="text-custom-yellow">Home</span> | TRANSPORTATION
            FLEET
          </p>
        </div>
      </div>*/}

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
                    <Link to="/contact" className="font-semibold text-xl">
                      Rent Now
                    </Link>
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
                      {card?.luggage && card?.luggage} Bags
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
