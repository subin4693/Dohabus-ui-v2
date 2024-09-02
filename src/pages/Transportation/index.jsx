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
        title={"Transportation fleet"}
        subTitle={"Home | Transportation fleet"}
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
          TRANSPORTATION <span className="text-custom-yellow">FLEET</span>
        </motion.h1>
        <div className="cards flex justify-center items-center flex-wrap gap-5 p-3">
          {transportations.map((card, index) => (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="card w-[500px] p-5 shadow-xl "
              key={index}
            >
              <div className="relative group">
                <img
                  className="w-full h-[250px] object-cover border-2xl"
                  src={card.coverImage}
                  alt={card.title[lang]}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-custom-yellow bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white p-4 rounded-full">
                    <button className="font-semibold text-2xl">Rent Now</button>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <h1 className="text-gray  font-semibold text-[1.6rem] hover:text-custom-yellow cursor-pointer">
                  {card.title[lang]}
                </h1>
                <small className="font-semibold text-[1.4rem] text-gray-500">
                  Buss
                </small>
                {/* <ul className="h-[200px] mt-2 overflow-hidden text-gray-700 list-disc pl-5 text-[1.2rem]">
                  {card.places.map((feature, idx) => (
                    <li key={idx}>{feature[lang]}</li>
                  ))}
                </ul> */}
                <div className="flex flex-col md:flex-row items-stretch gap-5 mt-5">
                  <div className="box border p-1 px-4 flex items-center gap-2 h-full flex-grow">
                    <FaUser size={22} />
                    <small className="font-bold text-[1.2rem] text-gray-500">
                      13
                    </small>
                  </div>
                  <div className="box border p-1 px-4 flex items-center gap-2 h-full flex-grow">
                    <FaSuitcase size={22} />
                    <small className="font-bold text-[1.2rem] text-gray-500">
                      7 Small Bags
                    </small>
                  </div>
                  <div className="box border p-1 px-4 flex items-center gap-2 h-full flex-grow">
                    <FaCogs size={25} />
                    <small className="font-bold text-[1.2rem] text-gray-500">
                      AC
                    </small>
                  </div>
                </div>
              </div>
              {/* <div className="flex items-center justify-center">
                <Link
                  to="/contact"
                  className="text-2xl text-custom-yellow text-center block mt-4 underline"
                >
                  Book Now
                </Link>
              </div> */}
            </motion.div>
          ))}

          {/* <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            // viewport={{ once: true }}
            className="card w-[500px] p-5"
          >
            <div className="">
              <img
                className="w-full h-[300px] object-cover border border-custom-yellow border-2xl"
                src="https://eng.dohabus.com/English/images/2024/02/07/whatsapp-image-2024-02-07-at-11.03.41.jpeg"
                alt=""
              />
            </div>
            <div className="mt-5">
              <h1 className="text-custom-yellow font-semibold text-[1.6rem]">
                Hyundai Luxury Coach
              </h1>
              <ul className="h-[200px] mt-2 overflow-hidden text-gray-700 list-disc pl-5 text-[1.2rem]">
                <li>Seating capacity of 46 + 1</li>
                <li>Air-conditioned with luggage compartment</li>
                <li>TV screens with audio</li>
                <li>Equipped with microphone</li>
                <li>All seats equipped with seat belt</li>
                <li>All seats equipped with seat belt</li>
                <li>All seats equipped with seat belt</li>
                <li>All seats equipped with seat belt</li>
              </ul>
            </div>

            <div className="text-center mt-5">
              <button
               onClick={openModal}
                type="button"
                className="w-full p-4 rounded bg-custom-yellow text-white hover:bg-gray-800 duration-300"
              >
                <b className="text-2xl">Book Now</b>
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            // viewport={{ once: true }}
            className="card w-[500px] p-5"
          >
            <div className="">
              <img
                className="w-full h-[300px] object-cover border border-custom-yellow border-2xl"
                src="https://eng.dohabus.com/English/images/2024/02/07/whatsapp-image-2024-02-07-at-10.54.19.jpeg"
                alt=""
              />
            </div>
            <div className="mt-5">
              <h1 className="text-custom-yellow font-semibold text-[1.6rem]">
                Half Open Half Closed Double Decker
              </h1>
              <ul className="h-[200px] mt-2 overflow-hidden text-gray-700 list-disc pl-5 text-[1.2rem]">
                <li>Seating capacity of 46 + 1</li>
                <li>Air-conditioned with luggage compartment</li>
                <li>TV screens with audio</li>
                <li>Equipped with microphone</li>
                <li>All seats equipped with seat belt</li>
                <li>All seats equipped with seat belt</li>
                <li>All seats equipped with seat belt</li>
                <li>All seats equipped with seat belt</li>
              </ul>
            </div>

            <div className="text-center mt-5">
              <button
                type="button"
                className="w-full p-4 rounded bg-custom-yellow text-white hover:bg-gray-800 duration-300"
              >
                <b className="text-2xl">Book Now</b>
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            // viewport={{ once: true }}
            className="card w-[500px] p-5"
          >
            <div className="">
              <img
                className="w-full h-[300px] object-cover border border-custom-yellow border-2xl"
                src="https://eng.dohabus.com/English/images/2024/02/07/whatsapp-image-2024-02-07-at-11.00.49.jpeg"
                alt=""
              />
            </div>
            <div className="mt-5">
              <h1 className="text-custom-yellow font-semibold text-[1.6rem]">
                Fully Open Double Decker
              </h1>
              <ul className="h-[200px] mt-2 overflow-hidden text-gray-700 list-disc pl-5 text-[1.2rem]">
                <li>Seating capacity of 46 + 1</li>
                <li>Air-conditioned with luggage compartment</li>
                <li>TV screens with audio</li>
                <li>Equipped with microphone</li>
                <li>All seats equipped with seat belt</li>
                <li>All seats equipped with seat belt</li>
                <li>All seats equipped with seat belt</li>
                <li>All seats equipped with seat belt</li>
              </ul>
            </div>

            <div className="text-center mt-5">
              <button
                type="button"
                className="w-full p-4 rounded bg-custom-yellow text-white hover:bg-gray-800 duration-300"
              >
                <b className="text-2xl">Book Now</b>
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            // viewport={{ once: true }}
            className="card w-[500px] p-5"
          >
            <div className="">
              <img
                className="w-full h-[300px] object-cover border border-custom-yellow border-2xl"
                src="https://eng.dohabus.com/English/images/2024/02/07/whatsapp-image-2024-02-07-at-10.53.09.jpeg"
                alt=""
              />
            </div>
            <div className="mt-5">
              <h1 className="text-custom-yellow font-semibold text-[1.6rem]">
                Single Decker
              </h1>
              <ul className="h-[200px] mt-2 overflow-hidden text-gray-700 list-disc pl-5 text-[1.2rem]">
                <li>Seating capacity of 46 + 1</li>
                <li>Air-conditioned with luggage compartment</li>
                <li>TV screens with audio</li>
                <li>Equipped with microphone</li>
                <li>All seats equipped with seat belt</li>
                <li>All seats equipped with seat belt</li>
                <li>All seats equipped with seat belt</li>
                <li>All seats equipped with seat belt</li>
              </ul>
            </div>

            <div className="text-center mt-5">
              <button
                type="button"
                className="w-full p-4 rounded bg-custom-yellow text-white hover:bg-gray-800 duration-300"
              >
                <b className="text-2xl">Book Now</b>
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            // viewport={{ once: true }}
            className="card w-[500px] p-5"
          >
            <div className="">
              <img
                className="w-full h-[300px] object-cover border border-custom-yellow border-2xl"
                src="https://th.bing.com/th/id/OIP.VYd0NaWn-j2ieYNPpmfP4gHaEK?rs=1&pid=ImgDetMain"
                alt=""
              />
            </div>
            <div className="mt-5">
              <h1 className="text-custom-yellow font-semibold text-[1.6rem]">
                Volvo Coach
              </h1>
              <ul className="h-[200px] mt-2 overflow-hidden text-gray-700 list-disc pl-5 text-[1.2rem]">
                <li>Seating capacity of 46 + 1</li>
                <li>Air-conditioned with luggage compartment</li>
                <li>TV screens with audio</li>
                <li>Equipped with microphone</li>
                <li>All seats equipped with seat belt</li>
                <li>All seats equipped with seat belt</li>
                <li>All seats equipped with seat belt</li>
                <li>All seats equipped with seat belt</li>
              </ul>
            </div>

            <div className="text-center mt-5">
              <button
                type="button"
                className="w-full p-4 rounded bg-custom-yellow text-white hover:bg-gray-800 duration-300"
              >
                <b className="text-2xl">Book Now</b>
              </button>
            </div>
          </motion.div> */}
        </div>
      </div>
    </div>
  );
};

export default Transportation;
