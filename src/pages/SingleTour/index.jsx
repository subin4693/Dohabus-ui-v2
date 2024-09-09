import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../../components/Banner";
import Reviews from "./Reviews";
import { FaBus } from "react-icons/fa";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "react-datepicker/dist/react-datepicker.css";
import { LuLanguages } from "react-icons/lu";
import singleTour from "../../assets/single-tour.jpg";
import album1 from "../../assets/album1.jpg";
import album2 from "../../assets/album2.jpg";
import album3 from "../../assets/album3.jpg";
import album4 from "../../assets/album4.jpg";
import album5 from "../../assets/album5.jpg";
import album6 from "../../assets/album6.jpg";
import { useParams, useNavigate, Link } from "react-router-dom";
import DatePickerr from "./DatePicker";
import { toast } from "react-toastify";

import Slider from "./GallerySlider";
import Faq from "./Faq";

import Disc from "./Disc";
import DiscImage from "./DiscImage";
import TicketBooking from "./TicketBooking";
import { IoClose, IoArrowBack, IoArrowForward } from "react-icons/io5";
import { BiCart, BiTime } from "react-icons/bi";
import { useSelector } from "react-redux";

import languagesss from "../../assets/lang.png";
import men from "../../assets/men.png";

const SingleTour = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly
  const navigate = useNavigate();
  const animatedComponents = makeAnimated();
  const lang = useSelector((state) => state.language.lang);

  const [sessionStatus, setSessionStatus] = useState({});
  const [sessionCounts, setSessionCounts] = useState({});
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    reviewText: "",
    imageURL: null,
  });
  const [data, setData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [adultPrice, setAdultPrice] = useState(0);
  const [childPrice, setChildPrice] = useState(0);
  const [canWriteReview, setCanWriteReview] = useState(false);
  const [session, setSession] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const { user } = useSelector((state) => state.user);
  const { singletour } = useParams();

  //ticket booking componet state variables

  const [selectedAdultData, setSelectedAdultData] = useState(null);
  const [selectedChildData, setSelectedChildData] = useState(null);
  // Handle add-on selection and update total price

  const [addOnTotalCost, setAddOnTotalCost] = useState(0);
  const handleAddOnChange = (selectedOptions) => {
    console.log(selectedOptions);
    setSelectedAddOns(selectedOptions);

    const totalAddOnPrice = selectedOptions.reduce((sum, option) => {
      return sum + option.price;
    }, 0);

    setAddOnTotalCost(totalAddOnPrice); // Update the total price
  };

  // const isAvailableDay = (date) => {
  //   const day = date.getDay(); // Get the day index (0 for Sunday, 1 for Monday, etc.)
  //   return data?.availableDays?.includes(day); // Check if the day index is in the availableDays array
  // };
  const shouldDisableDate = (date) => {
    // Get the day of the week (0 = Sunday, 6 = Saturday)
    const dayOfWeek = date.getDay();
    // Disable all dates except those that match the numbers in the isAvailableDay array
    return data?.availableDays?.includes(dayOfWeek);
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
      const newCount = isIncrement
        ? adultCount + 1
        : Math.max(adultCount - 1, 0);
      setAdultCount(newCount);

      // Find the appropriate price based on the updated adultCount
      if (data.adultData.length > 0) {
        // Sort the adultData by pax in ascending order
        const sortedAdultData = data.adultData.sort((a, b) => a.pax - b.pax);
        let foundPrice = null;

        // Find an exact match for pax
        sortedAdultData.forEach((adult) => {
          if (adult.pax === newCount) {
            foundPrice = adult.price;
          }
        });

        if (foundPrice === null) {
          const nearestLowerPax = sortedAdultData
            .filter((adult) => adult.pax <= newCount)
            .pop();

          if (!nearestLowerPax) {
            // If no lower pax found, set the smallest pax price
            setAdultPrice(sortedAdultData[0].price);
            foundPrice = sortedAdultData[0].price;
          } else {
            // If we found a nearest lower pax, use its price
            setAdultPrice(nearestLowerPax.price);
            foundPrice = nearestLowerPax.price;
          }
        } else {
          // Exact match found
          setAdultPrice(foundPrice);
        }

        // Calculate new total price based on the updated adult price
        setTotalPrice(
          (prev) => newCount * foundPrice + childCount * data.childPrice,
        );
      }
    } else if (type === "child") {
      // Handle child count change
      const newCount = isIncrement
        ? childCount + 1
        : Math.max(childCount - 1, 0);
      setChildCount(newCount);

      // Find the appropriate price based on the updated childCount
      if (data.childData.length > 0) {
        // Sort the childData by pax in ascending order
        const sortedChildData = data.childData.sort((a, b) => a.pax - b.pax);
        let foundPrice = null;

        // Find an exact match for pax
        sortedChildData.forEach((child) => {
          if (child.pax === newCount) {
            foundPrice = child.price;
          }
        });

        // If no exact match, apply the logic for finding the nearest lower pax price
        if (foundPrice === null) {
          const nearestLowerPax = sortedChildData
            .filter((child) => child.pax <= newCount)
            .pop(); // get the nearest lower or equal pax

          if (!nearestLowerPax) {
            // If no lower pax found, set the smallest pax price
            setChildPrice(sortedChildData[0].price);
            foundPrice = sortedChildData[0].price;
          } else {
            // If we found a nearest lower pax, use its price
            setChildPrice(nearestLowerPax.price);
            foundPrice = nearestLowerPax.price;
          }
        } else {
          // Exact match found
          setChildPrice(foundPrice);
        }

        // Calculate new total price based on the updated child price
        setTotalPrice(
          (prev) => adultCount * data.adultPrice + newCount * foundPrice,
        );
      }
    }
  };

  const handleSession = (sess) => {
    console.log(sess);
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
  const handleReviewSubmit = async () => {
    console.log(data._id);
    if (newReview.reviewText.trim() == "") {
      return toast.error("Review text required ", {
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
    try {
      const res = await axios.post(
        BASE_URL + "/reviews/" + data._id,
        newReview,
        {
          withCredentials: true,
        },
      );
      const revvv = res.data.data.populatedReview;
      console.log(res.data);

      setReviews((prev) => [...prev, revvv]);
      setNewReview({ reviewText: "", imageURL: null });
      toast.success(" New review added", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      toast.error("Something went wrong! ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(error);
    }
  };

  const handleBooking = () => {
    if (!selectedDate || !session) {
      toast.error("Please select data and sessoin before proceeding!");
      return;
    }

    if (!adultCount && !childCount) {
      toast.error("Please fill all the booking fields before proceeding!");
      return;
    }

    const date = formatDateForBackend(selectedDate);
    let query = `date=${date}&session=${session}`;
    // console.log(date);
    // return;

    // If adultCount or childCount is present, loop through selectedAddOns and add to query
    if (adultCount || childCount) {
      query += `&adultCount=${adultCount}&childCount=${childCount}`;

      if (selectedAddOns && selectedAddOns.length > 0) {
        const addOnValues = selectedAddOns
          .map((addOn) => addOn.value)
          .join(",");
        query += `&addOns=${addOnValues}`; // Add add-on values to the query
      }
      return navigate(`/checkout/${data._id}?${query}`);
    }

    // Navigate to checkout with the appropriate query string
  };

  useEffect(() => {
    const getData = async () => {
      if (!selectedDate) return;
      console.log("getting data");
      try {
        const response = await axios.post(BASE_URL + "/tickets/counts", {
          date: selectedDate,
          planId: data._id,
        });

        setSessionStatus(response.data.sessionStatus);
        setSessionCounts(response.data.sessionCounts);
        console.log(response.data.sessionCounts);
        console.log(response.data.sessionStatus);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [selectedDate]);
  useEffect(() => {
    const getData = async () => {
      try {
        console.log("get data function clled **************");
        const data = await axios.get(BASE_URL + "/plans/" + singletour, {
          withCredentials: true,
        });
        const res = await axios.get(
          BASE_URL + "/reviews/" + singletour,
          newReview,
          {
            withCredentials: true,
          },
        );

        setSessionStatus({});
        setSessionCounts({});

        setNewReview({
          reviewText: "",
          imageURL: null,
        });

        setSelectedImage(null);

        setAdultCount(0);
        setChildCount(0);
        setTotalPrice(0);

        if (data.data.data.plan.adultPrice || data.data.data.plan.childPrice) {
          setAdultPrice(data.data.data.plan.adultPrice);
          setChildPrice(data.data.data.plan.childPrice);
        } else {
          setAdultPrice(data.data.data.plan.adultData[0].price);
          setChildPrice(data.data.data.plan.childData[0].price);
        }

        setSelectedAddOns([]);

        setSelectedDate(null);
        console.log(res.data.data);
        setReviews(res.data.data);
        setData(data.data.data.plan);
        setCanWriteReview(data.data.data.canWriteReview);
        setSession(null);
        setAddOnTotalCost(0);
        setSelectedAdultData(null);

        setSelectedChildData(null);

        // setAlbum(data?.data?.images);
        // setTours(data.data.data.plans);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [singletour]);

  const addOnOptions = data?.addOn?.map((addOn) => ({
    label: addOn?.[lang] + "  (" + addOn.price + "  qar) ", // or addOn.ar for Arabic if needed
    value: addOn._id,
    price: addOn.price,
  }));

  return (
    <div>
      <Banner
        image={data?.coverImage}
        title={data && data.title && data?.title[lang]}
        subTitle={"Home | Tours"}
      />

      <div className="flex justify-center items-center px-2  pt-10">
        <div className="flex w-screen md:w-[80vw]   flex-wrap">
          <div className="w-full md:w-3/4  space-y-10    flex flex-col jus tify-center ">
            {(data?.duration?.[lang] ||
              data?.transportation?.[lang] ||
              data?.typeOfTour?.[lang] ||
              data?.language?.[lang]) && (
              <div>
                <h2 className="text-3xl font-bold">
                  {lang === "ar" ? "عرض الجولة" : "About this activity"}
                </h2>

                <div
                  className="relative grid grid-cols-1 md:grid-cols-2 mt-5 bg-custom-yellow w-full md:w-4/5 p-5 gap-3 rounded-lg shadow-xl transition-transform duration-[.6s] transform hover:scale-105 cursor-pointer"
                  dir={lang === "ar" ? "rtl" : "ltr"}
                >
                  {/* Render Time Duration if available */}
                  {data?.duration?.[lang] && (
                    <div className="flex  gap-5 items-center">
                      <BiTime className="w-[60px] h-[60px]" />
                      <div>
                        <h4 className="font-bold text-lg">
                          {lang === "ar" ? "مدة الوقت" : "Time Duration"}
                        </h4>
                        <p>{data?.duration[lang]}</p>
                      </div>
                    </div>
                  )}

                  {/* Render Transportation if available */}
                  {data?.transportation?.[lang] && (
                    <div className="flex  gap-5 items-center">
                      <FaBus className="w-[60px] h-[60px]" />
                      <div>
                        <h4 className="font-bold text-lg">
                          {lang === "ar" ? "المواصلات" : "Transportation"}
                        </h4>
                        <p>{data?.transportation[lang]}</p>
                      </div>
                    </div>
                  )}

                  {/* Render Type of Tour if available */}
                  {data?.typeOfTour?.[lang] && (
                    <div className="flex  gap-5 items-center">
                      <img
                        src={men}
                        className="w-[60px] h-[60px] object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-lg">
                          {lang === "ar" ? "نوع الجولة" : "Type of Tour"}
                        </h4>
                        <p>{data?.typeOfTour[lang]}</p>
                      </div>
                    </div>
                  )}

                  {/* Render Language if available */}
                  {data?.language?.[lang] && (
                    <div className="flex  gap-5 items-center">
                      <img
                        src={languagesss}
                        className="w-[60px] h-[60px] object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-lg">
                          {lang === "ar" ? "اللغة" : "Language"}
                        </h4>
                        <p>{data?.language[lang]}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {data?.description?.[lang] && (
              <div>
                <h2 className="text-3xl font-bold">
                  {lang === "ar" ? "الوصف" : "Description"}
                </h2>

                <div
                  className="relative  mt-5 bg-custom-yellow w-full md:w-4/5 p-5  rounded-lg shadow-xl transition-transform duration-[.6s] transform hover:scale-105 cursor-pointer"
                  dir={lang === "ar" ? "rtl" : "ltr"}
                >
                  <p>{data?.description && data?.description?.[lang]}</p>
                </div>
              </div>
            )}
            {data?.highlights?.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold">
                  {lang === "ar" ? "أبرز النقاط" : "Highlights"}
                </h2>

                <div
                  className="relative  mt-5 bg-custom-yellow w-full md:w-4/5 p-5  rounded-lg shadow-xl transition-transform duration-[.6s] transform hover:scale-105 cursor-pointer"
                  dir={lang === "ar" ? "rtl" : "ltr"}
                >
                  <ul className="list-disc pl-5">
                    {data?.highlights &&
                      data?.highlights?.map((item) => <li>{item[lang]}</li>)}
                  </ul>
                </div>
              </div>
            )}
            {data?.includes?.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold">
                  {lang === "ar" ? "ما الذي يتضمنه؟" : "What’s Included?"}
                </h2>

                <div
                  className="relative  mt-5 bg-custom-yellow w-full   md:w-4/5 p-5  rounded-lg shadow-xl transition-transform duration-[.6s] transform hover:scale-105 cursor-pointer"
                  dir={lang === "ar" ? "rtl" : "ltr"}
                >
                  <ul className="list-disc pl-5">
                    {data?.includes &&
                      data?.includes?.map((item) => <li>{item[lang]}</li>)}
                  </ul>
                </div>
              </div>
            )}

            {data?.itinerary?.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold">
                  {lang === "ar" ? "برنامج الرحلة" : "Itinerary"}
                </h2>

                <div
                  className="relative  mt-5  pl-7  w-full md:w-4/5 py-5  rounded-lg "
                  dir={lang === "ar" ? "rtl" : "ltr"}
                >
                  <ul>
                    {data?.itinerary &&
                      data?.itinerary?.map((item, index) => {
                        if (index == data?.itinerary.length - 2 || index == 1)
                          return (
                            <li
                              className={` ${
                                index == data?.itinerary.length - 1
                                  ? "pt-[90px]"
                                  : "pb-[90px]"
                              }   border-l border-l-4   border-dashed border-black flex  items-center relative`}
                            >
                              <DiscImage />
                              <span className="pl-10">{item[lang]}</span>
                            </li>
                          );

                        return (
                          <li
                            className={`${
                              index == data?.itinerary.length - 1
                                ? " pb-0 "
                                : " pb-[90px] "
                            }  
                                                        ${
                                                          index == 0 ||
                                                          index ==
                                                            data?.itinerary
                                                              .length -
                                                              3
                                                            ? " border-dashed  "
                                                            : "border-solid "
                                                        }  
            
            
                                                         border-l border-l-4   border-solid border-black flex  items-center relative`}
                          >
                            <Disc />
                            <span className="pl-10">{item[lang]}</span>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/4   relative">
            <div>
              <h2 className="text-xl font-bold">
                {lang === "ar" ? "اختر التاريخ والوقت" : "Choose date and time"}
              </h2>
              <br />
              {/*          <DatePicker
                selected={selectedDate}
                onChange={(date) => console.log(formatDateForBackend(date))}
                // filterDate={isAvailableDay} // Disable all days not in availableDays
                inline
                dateFormat="MMMM d, yyyy"
                className="w-full max-w-[100%] sm:max-w-[80%] md:max-w-[60%] lg:max-w-[50%]" // Adjust width for different breakpoints
                // minDate={minDate}
              />*/}
              {/*  <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={(newDate) => setSelectedDate(newDate)}
                  shouldDisableDate={shouldDisableDate} // Disable all dates except those in isAvailableDay
                  minDate={new Date()} // Example: Minimum date can be today
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>*/}
              {console.log(data.adultData)}
              {console.log(data.childData)}

              {data?.availableDays && (
                <DatePickerr
                  enableDays={data?.availableDays}
                  setSelectedDate={setSelectedDate}
                  setSession={setSession}
                />
              )}
            </div>

            <>
              {selectedDate && data?.sessions?.length > 0 && (
                <div>
                  <h2 className="text-xl mt-5 font-bold">
                    {lang === "ar" ? "الجلسات" : "Sessions"}
                  </h2>
                  <div className="flex justify-start items-center gap-5 flex-wrap mt-5">
                    {data.sessions &&
                      data.sessions.map((sessionL) => {
                        const isAvailable =
                          sessionStatus[sessionL] === "Available";
                        const isSelected = session === sessionL; // Check if session is selected

                        return (
                          <button
                            key={sessionL}
                            className={`px-3 py-2 border border-black border-3 rounded-md flex gap-3 items-center ${
                              isSelected
                                ? "bg-yellow-500" // Highlight selected session with yellow
                                : isAvailable
                                  ? "bg-green-500" // Green for available sessions
                                  : "bg-red-500" // Red for unavailable sessions
                            }`}
                            onClick={() => {
                              if (isAvailable) handleSession(sessionL);
                            }}
                          >
                            <BiTime className="w-[25px] h-[25px]" /> {sessionL}
                          </button>
                        );
                      })}
                  </div>
                </div>
              )}
            </>

            {data?.addOn?.length > 0 && (
              <div>
                <h2 className="text-xl mt-5 font-bold">
                  {lang === "ar" ? "الإضافات" : "Add-Ons"}
                </h2>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={addOnOptions} // Set the transformed add-on options here
                  onChange={handleAddOnChange} // Handle selection change
                />
              </div>
            )}

            <TicketBooking
              data={data}
              adultCount={adultCount}
              childCount={childCount}
              lang={lang}
              user={user}
              selectedDate={selectedDate}
              session={session}
              navigate={navigate}
              toast={toast}
              handleTicketCountChange={handleTicketCountChange}
              setTotalPrice={setTotalPrice}
              totalPrice={totalPrice}
              selectedAdultData={selectedAdultData}
              setSelectedAdultData={setSelectedAdultData}
              selectedChildData={selectedChildData}
              setSelectedChildData={setSelectedChildData}
              addOnTotalCost={addOnTotalCost}
              handleBooking={handleBooking}
              adultPrice={adultPrice}
              setAdultPrice={setAdultPrice}
              childPrice={childPrice}
              setChildPrice={setChildPrice}
            />
          </div>
        </div>
      </div>

      <Slider
        mediaUrls={data && data.galleryimages ? data.galleryimages : []}
        mediaVideoUrls={data && data.galleryvideos ? data.galleryvideos : []}
      />
      <div className="flex justify-center items-center px-2  mb-10 ">
        <div className="flex    flex-wrap  w-[80vw]">
          <div className="w-full   space-y-10    flex flex-col justify-center ">
            <div>
              <h2 className="text-3xl font-bold mb-5">
                {lang === "ar" ? "الأسئلة المتكررة" : "FAQs"}
              </h2>
              <Faq faqData={data.faq ? data?.faq : []} lang={lang} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center  ">
        <Reviews
          canWriteReview={canWriteReview}
          reviews={reviews}
          setReviews={setReviews}
          newReview={newReview}
          setNewReview={setNewReview}
          handleReviewSubmit={handleReviewSubmit}
          user={user}
        />
      </div>
    </div>
  );
};

export default SingleTour;
