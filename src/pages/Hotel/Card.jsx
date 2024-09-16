import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly
import { toast } from "react-toastify";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Card = ({ image, title, desc, lang, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    checkInDate: "",
    checkOutDate: "",
    numberOfAdults: "",
    numberOfChildren: "",
    numberOfRooms: "",
    mealPlan: "",
    airportTransfers: "",
    additionalRequest: "",
    email: "",
    name: "",
  });

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Debug: Log formData and the request URL
    console.log("Submitting form data:", formData);
    console.log("Request URL:", BASE_URL + "/hotels/" + id);

    try {
      const res = await axios.post(BASE_URL + "/hotels/" + id, formData, {
        withCredentials: true,
      });
      console.log(res);
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
      console.log(res.data);
    } catch (error) {
      // Error handling: Log the full error response
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      );

      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      // Close the modal in either case
      closeModal();
    }
  };

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="hover:shadow-2xl h-fit border border-gray-lite duration-500 overflow-hidden cursor-pointer my-10"
    >
      <div className="h-[250px]">
        <img src={image} className="object-cover w-full h-full" alt={title} />
      </div>
      <div className="p-5 space-y-3">
        <h2 className="text-lg font-bold md:text-xl text-gray h-[50px] overflow-hidden w-full">
          {lang === "ar" ? "العنوان" : title}
        </h2>
        {/* <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <FaStar color="orange" />
            <FaStar color="orange" />
            <FaStar color="orange" />
            <FaStar color="orange" />
            <FaStar color="orange" />
          </div>
          <h1 className="font-semibold text-[1.2rem]">
            5 Superb - <span className="text-gray">200 reviews</span>{" "}
          </h1>
        </div>*/}
        <p className="text-sm text-gray text-justify leading-6 h-[150px] overflow-hidden w-full">
          {lang === "ar" ? "الوصف" : desc}
        </p>

        {/* Modal */}
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
                        ? "خطط لرحلتك معنا"
                        : "PLAN YOUR TRIP WITH US"}
                    </h2>
                    <p className="mt-4 text-[1.2rem]">
                      {lang === "ar"
                        ? "دعنا نعرف كيف تريد أن تكون رحلتك وسنعود إليك بالخطة المثالية!"
                        : "Let us know how you want your trip to be and we will get back to you with the perfect plan!"}
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
                            {lang === "ar" ? "تاريخ الوصول" : "Check-in Date"}
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
                              ? "تاريخ المغادرة"
                              : "Check-out Date"}
                          </label>
                          <br />
                          <input
                            name="checkOutDate"
                            value={formData.checkOutDate}
                            onChange={handleChange}
                            className="border-2 border-gray-300 outline-none rounded px-3 p-3 w-full"
                            type="date"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-center gap-3 mt-3 w-full">
                        <div className="w-full">
                          <label className="text-lg font-semibold">
                            {lang === "ar"
                              ? "عدد البالغين"
                              : "Number of Adults"}
                          </label>
                          <br />
                          <input
                            name="numberOfAdults"
                            value={formData.numberOfAdults}
                            onChange={handleChange}
                            type="number"
                            className="border-2 border-gray-300 outline-none rounded px-3 p-3 w-full"
                            placeholder={
                              lang === "ar"
                                ? "عدد البالغين"
                                : "Number of adults"
                            }
                          />
                        </div>
                        <div className="w-full">
                          <label className="text-lg font-semibold">
                            {lang === "ar"
                              ? "عدد الأطفال"
                              : "Number of Children"}
                          </label>
                          <br />
                          <input
                            name="numberOfChildren"
                            value={formData.numberOfChildren}
                            onChange={handleChange}
                            type="number"
                            className="border-2 border-gray-300 outline-none rounded px-3 p-3 w-full"
                            placeholder={
                              lang === "ar"
                                ? "عدد الأطفال"
                                : "Number of children"
                            }
                          />
                        </div>
                      </div>
                      <div className="flex justify-between items-center gap-3 mt-3 w-full">
                        <div className="">
                          <label className="text-lg font-semibold">
                            {lang === "ar" ? "عدد الغرف" : "Number of Rooms"}
                          </label>
                          <br />
                          <input
                            name="numberOfRooms"
                            value={formData.numberOfRooms}
                            onChange={handleChange}
                            type="number"
                            className="border-2 border-gray-300 outline-none rounded px-3 p-3 w-[23vh]"
                            placeholder={
                              lang === "ar" ? "عدد الغرف" : "Number of Rooms"
                            }
                          />
                        </div>
                      </div>

                      <div className="mt-3">
                        <label className="text-lg font-semibold">
                          {lang === "ar" ? "خطة الوجبات" : "Meal Plan"}
                        </label>
                        <br />
                        <select
                          name="mealPlan"
                          value={formData.mealPlan}
                          onChange={handleChange}
                          className="border-2 border-gray-300 outline-none rounded px-3 p-3 w-full"
                        >
                          <option value="">
                            {lang === "ar" ? "خطة الوجبات؟" : "Meal Plan?"}
                          </option>
                          <option value="Breakfast">
                            {lang === "ar" ? "إفطار" : "Breakfast"}
                          </option>
                          <option value="Half Board">
                            {lang === "ar" ? "نصف إقامة" : "Half Board"}
                          </option>
                          <option value="Full Board">
                            {lang === "ar" ? "إقامة كاملة" : "Full Board"}
                          </option>
                          <option value="All Inclusive">
                            {lang === "ar"
                              ? "شامل كافة الخدمات"
                              : "All Inclusive"}
                          </option>
                        </select>
                      </div>

                      <div className="mt-3">
                        <label className="text-lg font-semibold">
                          {lang === "ar"
                            ? "النقل من وإلى المطار"
                            : "Airport Transfers"}
                        </label>
                        <br />
                        <select
                          name="airportTransfers"
                          value={formData.airportTransfers}
                          onChange={handleChange}
                          className="border-2 border-gray-300 outline-none rounded px-3 p-3 w-full"
                        >
                          <option value="">
                            {lang === "ar"
                              ? "النقل من وإلى المطار؟"
                              : "Airport Transfers?"}
                          </option>
                          <option value="Yes">
                            {lang === "ar" ? "نعم" : "Yes"}
                          </option>
                          <option value="No">
                            {lang === "ar" ? "لا" : "No"}
                          </option>
                        </select>
                      </div>
                      <div className="mt-3">
                        <label className="text-lg font-semibold">
                          {lang === "ar" ? "طلب إضافي" : "Additional Request"}
                        </label>
                        <br />
                        <textarea
                          name="additionalRequest"
                          value={formData.additionalRequest}
                          onChange={handleChange}
                          className="border-2 border-gray-300 outline-none rounded px-3 p-3 w-full"
                          placeholder={
                            lang === "ar" ? "طلب إضافي" : "Additional Request"
                          }
                          rows="3"
                        ></textarea>
                      </div>

                      <div className="flex justify-between items-center gap-3 mt-3 w-full">
                        <div className="w-full">
                          <label className="text-lg font-semibold">
                            {lang === "ar" ? "البريد الإلكتروني" : "Email"}
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
                            {lang === "ar" ? "الاسم" : "Name"}
                          </label>
                          <br />
                          <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            type="text"
                            className="border-2 border-gray-300 outline-none rounded px-3 p-3 w-full"
                            placeholder={
                              lang === "ar" ? "أدخل الاسم" : "Enter name"
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
                          {lang === "ar" ? "إغلاق" : "Close"}
                        </button>
                        <button
                          type="submit"
                          className="bg-yellow-500 text-white w-full px-4 p-3 font-semibold text-lg rounded hover:bg-dark"
                        >
                          {lang === "ar" ? "احجز الآن" : "Book Now"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-center">
          <button
            onClick={openModal}
            className="bg-custom-yellow text-center block mt-4  px-2 py-1 text-lg rounded-md w-full hover:bg-dark text-white duration-300"
          >
            {lang === "ar" ? "احجز الآن" : "Book now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
