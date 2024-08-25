import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Card = ({ image, title, desc, lang }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="hover:shadow-2xl border border-gray-lite duration-500"
    >
      <div className="h-[250px]">
        <img src={image} className="object-cover w-full h-full" alt={title} />
      </div>
      <div className="p-5 space-y-3">
        <h2 className="text-lg font-bold md:text-xl text-gray">{title}</h2>
        <p className="text-sm text-gray text-justify leading-6">{desc}</p>

        {/* Modal */}
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
                <div className="mt-4">
                  <div className="text-center">
                    <h2 className="font-semibold text-2xl text-center">
                      PLAN YOUR TRIP WITH US
                    </h2>
                    <p className="mt-4 text-center text-[1.2rem]">
                      Let us know how you want your trip to be and we will get
                      back to you with the perfect plan!
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
                            Check-in Date
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
                            Check-out Date
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
                            Number of Adults
                          </label>{" "}
                          <br />
                          <input
                            type="number"
                            className="border-2 border-gray-300 outline-none rounded px-3 p-3 w-[23vh]"
                            placeholder="Number of adults"
                          />
                        </div>
                        <div className="">
                          <label className="text-lg font-semibold">
                            Number of Children
                          </label>{" "}
                          <br />
                          <input
                            type="number"
                            className="border-2 border-gray-300 outline-none rounded px-3 p-3 w-[23vh]"
                            placeholder="Number of children"
                          />
                        </div>
                      </div>
                      <div className="flex justify-between items-center gap-3 mt-3">
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
                      </div>
                      <div className="mt-3">
                        <label className="text-lg font-semibold">
                          Preffered Hotel
                        </label>{" "}
                        <br />
                        <input
                          type="text"
                          className="border-2 border-gray-300 outline-none rounded px-3 p-3 w-full"
                          placeholder=" Preffered Hotel"
                        />
                      </div>
                      <div className="mt-3">
                        <label className="text-lg font-semibold">
                          Airport Transfers
                        </label>{" "}
                        <br />
                        <select className="border-2 border-gray-300 outline-none rounded px-3 p-3 w-full">
                          <option value=""> Airport Transfers?</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                      <div className="mt-3">
                        <label className="text-lg font-semibold">
                          Additional Request
                        </label>{" "}
                        <br />
                        <textarea
                          name=""
                          className="border-2 border-gray-300 outline-none rounded px-3 p-3 w-full"
                          placeholder="Additional Request"
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
                    className="bg-yellow-500 text-white px-4 py-2  w-[150px] font-semibold text-lg rounded hover:bg-dark"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button className="bg-yellow-500 text-white  w-[150px] px-4 p-3 font-semibold text-lg rounded hover:bg-dark">
                    Book Now
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-center">
          <button
            onClick={openModal}
            className="text-2xl text-custom-yellow text-center block mt-4 underline"
          >
            {lang === "en" ? "Book now" : "احجز الآن"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
