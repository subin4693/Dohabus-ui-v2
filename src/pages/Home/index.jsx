import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import logo from "../../assets/logo.png";
import Slider from "react-slick";

import { IoClose, IoArrowBack, IoArrowForward } from "react-icons/io5";
const Home = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly
  const [currentIndex, setCurrentIndex] = useState(0);
  const lang = useSelector((state) => state.language.lang);
  const [slides, setSlides] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [Reviews, setReviews]= useState([])

  const Reviews = [
    {
      id: 1,
      title: "Souq Waqif",
      tours: "100+ Tours",
      imageUrl:
        "https://images.pexels.com/photos/14659646/pexels-photo-14659646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      title: "The Pearl-Qatar",
      tours: "50+ Tours",
      imageUrl:
        "https://images.pexels.com/photos/14659647/pexels-photo-14659647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 3,
      title: "Katara Cultural Village",
      tours: "80+ Tours",
      imageUrl:
        "https://images.pexels.com/photos/14659648/pexels-photo-14659648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 4,
      title: "National Museum of Qatar",
      tours: "120+ Tours",
      imageUrl:
        "https://images.pexels.com/photos/14659649/pexels-photo-14659649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 5,
      title: "National Museum of Qatar",
      tours: "120+ Tours",
      imageUrl:
        "https://images.pexels.com/photos/14659649/pexels-photo-14659649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 6,
      title: "National Museum of Qatar",
      tours: "120+ Tours",
      imageUrl:
        "https://images.pexels.com/photos/14659649/pexels-photo-14659649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 7,
      title: "National Museum of Qatar",
      tours: "120+ Tours",
      imageUrl:
        "https://images.pexels.com/photos/14659649/pexels-photo-14659649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  const settings = {
    className: "slider variable-width",
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <NextArrow />, // Custom Next Arrow
    prevArrow: <PrevArrow />,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      // Check if prevIndex is not a number
      if (typeof prevIndex !== "number" || isNaN(prevIndex)) {
        return 0;
      }

      return (prevIndex + 1) % slides?.length;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (typeof prevIndex !== "number" || isNaN(prevIndex)) {
        return 0;
      }

      return (prevIndex - 1 + slides.length) % slides.length;
    });
  };
  const itemsPerReview = window.innerWidth < 768 ? 1 : 3;
  const prevReview = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? Math.ceil(reviews.length / itemsPerReview) - 1 : prev - 1
    );
  };

  const nextReview = () => {
    setCurrentSlide((prev) =>
      prev === Math.ceil(reviews.length / itemsPerReview) - 1 ? 0 : prev + 1
    );
  };

  const firstImageVariants = {
    enter: { opacity: 0, y: -100 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 100 },
  };

  const secondImageVariants = {
    enter: { opacity: 0, scale: 0 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5, rotate: 90 },
  };

  const cardContainerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(BASE_URL + "/banner");
        setSlides([
          ...data?.data?.data?.banner,
          // {
          //   image:
          //     "https://images.hdqwalls.com/wallpapers/planets-mountains-sea-sky-artwork-4k-wh.jpg",
          // },

          // {
          //   image:
          //     "https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?cs=srgb&dl=pexels-eberhardgross-443446.jpg&fm=jpg",
          // },
        ]);
        const reviewData = await axios.get(BASE_URL + "/reviews/all");
        console.log("Reviews???????????????????????", reviewData.data);
        setReviews(reviewData.data.data);

        const categoryData = await axios.get(BASE_URL + "/categorys");

        // setAlbum(data?.data?.images);
        setCategorys(categoryData?.data?.data?.categories);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  console.log("Reviewwwwsss>>>>>>>>>>>>>>>>>>>", reviews);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  return (
    <div
      // style={{
      //     backgroundImage:
      //         "linear-gradient(45deg, #fed92e 50%, #ffffff 50%)",
      // }}
      className=""
    >
      <div className="relative w-full h-screen overflow-hidden group">
        <AnimatePresence initial={false}>
          {slides &&
            slides?.map(
              (slide, index) =>
                currentIndex === index && (
                  <motion.div
                    key={index}
                    className="absolute w-full h-screen"
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={
                      index === 0
                        ? firstImageVariants
                        : index === 1
                        ? secondImageVariants
                        : {
                            enter: { opacity: 0, x: 100 },
                            center: { opacity: 1, x: 0 },
                            exit: { opacity: 0, x: -100 },
                          }
                    }
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="w-full h-screen object-cover"
                    />
                  </motion.div>
                )
            )}
        </AnimatePresence>

        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 text-white duration-500 p-5 opacity-0 group-hover:opacity-100 "
          onClick={prevSlide}
        >
          &#10094;
        </button>

        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-white p-5 opacity-0 group-hover:opacity-100 duration-500"
          onClick={nextSlide}
        >
          &#10095;
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides &&
            slides?.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-gray-800" : "bg-gray-400"
                }`}
                onClick={() => goToSlide(index)}
              ></button>
            ))}
        </div>
      </div>
      <div
        style={{
          backgroundImage: "linear-gradient(45deg, #fed92e 50%, #ffffff 50%)",
        }}
        className="py-14 "
      >
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 className="text-4xl p-5 text-center font-semibold">
            {lang === "en" ? "Discover Our Tours" : "اكتشف جولاتنا"}
          </motion.h1>
          <p className="text-lg p-2 text-center text-gray-500">
            {lang === "en"
              ? "Explore Qatar to its fullest under our wing.."
              : "استكشف قطر على أكمل وجه تحت جناحنا.."}
          </p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex justify-center items-center  gap-5 flex-wrap mt-20"
          >
            {categorys &&
              categorys?.map((data) => (
                <Link
                  to={`tours/${data._id}`}
                  className="card w-[300px] flex flex-col items-center mb-20"
                >
                  <div className="relative w-[200px] h-[200px]">
                    <img
                      className="absolute inset-0 w-full h-full object-cover rounded-full transition-transform duration-[.6s] transform hover:scale-125 cursor-pointer"
                      src={data.coverImage}
                      alt="img"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-between flex-grow p-4">
                    <h1 className="text-xl font-semibold text-center mt-4 transition-colors duration-300 hover:text-custom-yellow cursor-pointer">
                      {data?.title[lang]}
                    </h1>
                    <p className="text-gray-500 text-center mt-2 overflow-hidden h-19 text-ellipsis line-clamp-3">
                      {data?.description[lang]}
                    </p>
                  </div>
                </Link>
              ))}
          </motion.div>
        </motion.div>
      </div>

      <div
        style={{
          backgroundImage: "linear-gradient(45deg, #ffffff 50%, #fed92e 50%)",
        }}
        className="p-10 py-24 flex justify-center items-center flex-wrap"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative w-full lg:w-2/5 h-[400px] "
        >
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/PoyyKl6uypA"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video"
          ></iframe>
        </motion.div>

        <div className="w-full lg:w-1/5">
          <motion.h1
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
            className="text-4xl p-5 text-center font-semibold"
          >
            {lang === "en" ? "OVERALL TOUR EXPERIENCE" : "تجربة الجولة العامة"}
          </motion.h1>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative w-full lg:w-2/5 h-[400px]"
        >
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/PoyyKl6uypA"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video"
          ></iframe>
        </motion.div>
      </div>
      {reviews.length !== 0 && (
        <div
          style={{
            backgroundImage:
              "linear-gradient(134deg, #ffffff 50%, #fed92e 50%)",
          }}
        >
          <section className="">
            <motion.h1
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.5 }}
              className="text-4xl p-5 text-center font-semibold"
            >
              {lang === "en" ? "What Our Customers Say" : "ماذا يقول عملاؤنا"}
            </motion.h1>
            <div className="relative w-full max-w-6xl mx-auto pb-10">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {Array.from({
                    length: Math.ceil(reviews.length / itemsPerReview),
                  }).map((_, slideIndex) => (
                    <div
                      key={slideIndex}
                      className="flex min-w-full gap-4 md:gap-0 justify-center "
                    >
                      {reviews
                        .slice(
                          slideIndex * itemsPerReview,
                          slideIndex * itemsPerReview + itemsPerReview
                        )
                        .map((slide) => (
                          <section class="bg-gray-50 bg-opacity-80 dark:bg-gray-800 overflow-hidden">
                            <div class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-24 lg:px-6">
                              <figure class="max-w-screen-md mx-auto">
                                <svg
                                  class="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                                  viewBox="0 0 24 27"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                                    fill="currentColor"
                                  ></path>
                                </svg>
                                <blockquote className="h-[200px] overflow-hidden">
                                  <p class="text-xl md:text-xl font-medium text-gray-900 md:text-2xl dark:text-white ">
                                    "{slide.reviewText}"
                                  </p>
                                </blockquote>
                                <figcaption class="flex items-center justify-center mt-6 space-x-3">
                                  <div class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                                    <div class="pr-3 font-medium text-gray-900 dark:text-white">
                                      {slide.user.name}
                                    </div>
                                    <div class="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                                      {lang === "en"
                                        ? slide.plan.title.en
                                        : slide.plan.title.ar}
                                    </div>
                                  </div>
                                </figcaption>
                              </figure>
                            </div>
                          </section>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
              {reviews.length >= 3 && (
                <div>
                  <button
                    onClick={prevReview}
                    className="absolute left-0 top-1/3 transform translate-y-1/2 text-6xl text-dark p-2 rounded-full"
                  >
                    &#8249;
                  </button>
                  <button
                    onClick={nextReview}
                    className="absolute right-0 top-1/3 transform translate-y-1/2 p-2 text-6xl text-dark rounded-full"
                  >
                    &#8250;
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
      <div
        className="w-full py-20"
        style={{
          backgroundImage: "linear-gradient(135deg, #fed92e 50%, #ffffff 50%)",
        }}
      >
        <div className="px-1 md:px-10 xl:w-[70%] mx-auto flex justify-center items-center gap-10 flex-wrap">
          <div>
            <h1 className="text-4xl font-bold">
              {lang === "en" ? "TRANSPORTATION FLEET" : "أسطول النقل"}
            </h1>
            <p
              className={`my-4 py-3 text-xl ${
                lang === "ar" ? "text-right" : "text-left"
              }`}
            >
              {lang === "en"
                ? "Providing reliable vehicle rental service throughout Doha and across Qatar"
                : "تقديم خدمة تأجير سيارات موثوقة في جميع أنحاء الدوحة وقطر"}
            </p>

            <Link to="/transportation">
              <button className="px-4 py-2 bg-black text-white rounded-md text-xl">
                {lang === "en" ? "Discover More..." : "اكتشف المزيد..."}
              </button>
            </Link>
          </div>

          <div className="mt-10">
            <img
              src="https://eng.dohabus.com/English/images/2022/10/17/fleet.jpg"
              alt="Fleet"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

const NextArrow = ({ onClick }) => {
  return (
    <button
      className="absolute right-2 mt-10 top-1/2 transform -translate-y-1/2 text-white bg-black p-2 rounded-full opacity-75 hover:opacity-100"
      onClick={onClick}
    >
      <IoArrowForward className="text-2xl" />
    </button>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <button
      className="absolute z-10 mt-10 left-2 top-1/2 transform -translate-y-1/2 text-white bg-black p-2 rounded-full opacity-75 hover:opacity-100"
      onClick={onClick}
    >
      <IoArrowBack className="text-2xl" />
    </button>
  );
};
