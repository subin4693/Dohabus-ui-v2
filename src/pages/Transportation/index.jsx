import React, { useState } from "react";
// import { motion } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Banner from "../../components/Banner";

const data = [
  {
    id: 1,
    name: "MAN Coach",
    image:
      "https://eng.dohabus.com/English/images/2024/02/07/whatsapp-image-2024-02-07-at-11.02.07.jpeg",
    features: [
      "Seating capacity of 46 + 1",
      "Air-conditioned with luggage compartment",
      "TV screens with audio",
      "Equipped with microphone",
      "All seats equipped with seat belt",
      "All seats equipped with seat belt",
    ],
  },
  {
    id: 2,
    name: "Hyundai Luxury Coach",
    image:
      "https://eng.dohabus.com/English/images/2024/02/07/whatsapp-image-2024-02-07-at-11.03.41.jpeg",
    features: [
      "Seating capacity of 46 + 1",
      "Air-conditioned with luggage compartment",
      "TV screens with audio",
      "Equipped with microphone",
      "All seats equipped with seat belt",
    ],
  },
  {
    id: 3,
    name: "Half Open Half Closed Double Decker",
    image:
      "https://eng.dohabus.com/English/images/2024/02/07/whatsapp-image-2024-02-07-at-10.54.19.jpeg",
    features: [
      "Seating capacity of 46 + 1",
      "Air-conditioned with luggage compartment",
      "TV screens with audio",
      "Equipped with microphone",
      "All seats equipped with seat belt",
    ],
  },
  {
    id: 4,
    name: "Fully Open Double Decker",
    image:
      "https://eng.dohabus.com/English/images/2024/02/07/whatsapp-image-2024-02-07-at-11.00.49.jpeg",
    features: [
      "Seating capacity of 46 + 1",
      "Air-conditioned with luggage compartment",
      "TV screens with audio",
      "Equipped with microphone",
      "All seats equipped with seat belt",
    ],
  },
  {
    id: 5,
    name: "Single Decker",
    image:
      "https://eng.dohabus.com/English/images/2024/02/07/whatsapp-image-2024-02-07-at-10.53.09.jpeg",
    features: [
      "Seating capacity of 46 + 1",
      "Air-conditioned with luggage compartment",
      "TV screens with audio",
      "Equipped with microphone",
      "All seats equipped with seat belt",
    ],
  },
  {
    id: 6,
    name: "Volvo Coach",
    image:
      "https://th.bing.com/th/id/OIP.VYd0NaWn-j2ieYNPpmfP4gHaEK?rs=1&pid=ImgDetMain",
    features: [
      "Seating capacity of 46 + 1",
      "Air-conditioned with luggage compartment",
      "TV screens with audio",
      "Equipped with microphone",
      "All seats equipped with seat belt",
    ],
  },
];

const Transportation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }
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

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 mx-4 md:mx-0 h-[90vh] overflow-y-auto"
            >
              {/* <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold"></h3>
                <button
                  class="text-gray-600 hover:text-gray-900"
                  onClick={closeModal}
                >
                  ✖
                </button>
              </div> */}
              <div className="mt-4">
                <div className="text-center">
                  <h2 className="font-semibold text-2xl text-center">
                    ROUTE DETAILS
                  </h2>
                  <p className="mt-4 text-center text-[1.2rem]">
                    Need a lift? Just share your details with us and we'll do
                    the driving!
                  </p>
                  <Link to={"/contact"}>
                    <p className="text-[1.2rem] underline font-semibold text-blue-500">
                      Ask us a question instead
                    </p>
                  </Link>
                </div>
                <div className="mt-4">
                  <form action="">
                    <div className="flex justify-between items-center gap-3">
                      <div className=" mt-10 ">
                        <label className="text-lg font-semibold">
                          Pick-Up Date
                        </label>{" "}
                        <br />
                        <input
                          className="border-2 border-gray-300 rounded outline-none px-3 p-3 w-[23vh]"
                          type="date"
                          placeholder="Select a date"
                        />
                      </div>
                      <div className=" mt-10">
                        <label className="text-lg font-semibold">
                          Multiple Dates
                        </label>{" "}
                        <br />
                        <input
                          className="border-2 border-gray-300 outline-none rounded px-3 p-3 w-[23vh]"
                          type="date"
                          placeholder="Select a date"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center gap-3 mt-3">
                      <div className="">
                        <label className="text-lg font-semibold">
                          Num of Passengers
                        </label>{" "}
                        <br />
                        <input
                          type="number"
                          className="border-2 border-gray-300 outline-none rounded px-3 p-3 w-[23vh]"
                          placeholder="Number of passengers"
                        />
                      </div>
                      <div className="">
                        <label className="text-lg font-semibold">
                          Luggage Count
                        </label>{" "}
                        <br />
                        <input
                          type="number"
                          className="border-2 border-gray-300 outline-none rounded px-3 p-3 w-[23vh]"
                          placeholder="Enter Luggage"
                        />
                      </div>
                    </div>
                    {/* <div className="flex justify-between items-center gap-3 mt-3">
                      <div className="">
                        <label className="text-lg font-semibold">
                          Number of Rooms
                        </label>{" "}
                        <br />
                        <input
                          type="number"
                          className="border-2 border-gray-300 outline-none rounded px-3 p-3 w-[23vh]"
                          placeholder="Number of Rooms"
                        />
                      </div>
                      <div className="">
                        <label className="text-lg font-semibold">
                          Meal Plan
                        </label>{" "}
                        <br />
                        <select className="border-2 border-gray-300 outline-none rounded px-3 p-3 w-[23vh]">
                          <option value="">Select a meal plan</option>
                          <option value="full-board">Full Board</option>
                          <option value="half-board">Half Board</option>
                          <option value="bed-and-breakfast">
                            Bed and Breakfast
                          </option>
                          <option value="self-catering">Self Catering</option>
                        </select>
                      </div>
                    </div> */}

                    <div className="mt-3">
                      <label className="text-lg font-semibold">
                        Service Type
                      </label>{" "}
                      <br />
                      <select className="border-2 border-gray-300 outline-none rounded px-3 p-3 w-full">
                        <option value=""> Service Type?</option>
                        <option value="Yes">Airport Transfer</option>
                        <option value="No">Half Day 14 hours</option>
                        <option value="No">Full Day 12 hours</option>
                      </select>
                    </div>
                    <div className="mt-3">
                      <label className="text-lg font-semibold">
                        Pick-up Location
                      </label>{" "}
                      <br />
                      <input
                        type="text"
                        className="border-2 border-gray-300 outline-none rounded px-3 p-3 w-full"
                        placeholder=" Pick-up Location"
                      />
                    </div>
                    <div className="mt-3">
                      <label className="text-lg font-semibold">
                        Additional Request
                      </label>{" "}
                      <br />
                      <textarea
                        name=""
                        className="border-2 border-gray-300 outline-none rounded px-3 p-3 w-full"
                        placeholder="Looking for something else? Share the details and we'll get in touch shortly"
                        rows="3"
                      ></textarea>
                    </div>

                    <div className="flex justify-between items-center gap-3 mt-3">
                      <div className="">
                        <label className="text-lg font-semibold">Email</label>{" "}
                        <br />
                        <input
                          type="email"
                          className="border-2 border-gray-300 outline-none rounded px-3 p-3 w-[23vh]"
                          placeholder="Enter email"
                        />
                      </div>
                      <div className="">
                        <label className="text-lg font-semibold">Name</label>{" "}
                        <br />
                        <input
                          type="text"
                          className="border-2 border-gray-300 outline-none rounded px-3 p-3 w-[23vh]"
                          placeholder="Enter name"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="flex justify-between pt-5">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 w-[150px] font-semibold text-lg rounded hover:bg-dark"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button className="bg-yellow-500 text-white w-[150px] px-4 p-3 font-semibold text-lg rounded hover:bg-dark">
                  Book Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="mt-10 mb-10">
        <h1 className="text-4xl p-5 text-center font-semibold ">
          TRANSPORTATION <span className="text-custom-yellow">FLEET</span>
        </h1>
        <div className="cards flex justify-center items-center flex-wrap gap-5 p-3">
          {data.map((card, index) => (
            <div
              className="card w-[500px] p-5 shadow-xl "
              key={index}
            >
              <div className="">
                <img
                  className="w-full h-[300px] object-cover border border-custom-yellow border-2xl"
                  src={card.image}
                  alt={card.image}
                />
              </div>
              <div className="mt-5">
                <h1 className="text-custom-yellow font-semibold text-[1.6rem]">
                  {card.name}
                </h1>
                <ul className="h-[200px] mt-2 overflow-hidden text-gray-700 list-disc pl-5 text-[1.2rem]">
                  {card.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              {/* <div className="text-center mt-5">
                <button
                  onClick={openModal}
                  type="button"
                  className="w-full p-4 rounded bg-custom-yellow text-white hover:bg-gray-800 duration-300"
                >
                  <b className="text-2xl">Book Now</b>
                </button>
              </div> */}
              <div className="flex items-center justify-center">
                <button
                  onClick={openModal}
                  className="text-2xl text-custom-yellow text-center block mt-4 underline"
                >
                  Book Now
                </button>
              </div>
            </div>
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
