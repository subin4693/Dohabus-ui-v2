import React from "react";
import { motion } from "framer-motion";

const Transportation = () => {
  return (
    <div>
      <div className="relative">
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
      </div>

      <div className="mt-10 mb-10">
        <motion.h1
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5 }}
          //   viewport={{ once: true }}
          className="text-4xl p-5 text-center font-semibold "
        >
          TRANSPORTATION <span className="text-custom-yellow">FLEET</span>
        </motion.h1>
        <div className="cards flex justify-center items-center flex-wrap gap-5 p-3">
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
                src="https://eng.dohabus.com/English/images/2024/02/07/whatsapp-image-2024-02-07-at-11.02.07.jpeg"
                alt=""
              />
            </div>
            <div className="mt-5">
              <h1 className="text-custom-yellow font-semibold text-[1.6rem]">
                MAN Coach
              </h1>
              <ul className="h-[200px] mt-2 overflow-hidden text-gray-700 list-disc pl-5 text-[1.2rem]">
                <li>Seating capacity of 46 + 1</li>
                <li>Air-conditioned with luggage compartment</li>
                <li>TV screens with audio</li>
                <li>Equipped with microphone</li>
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Transportation;
