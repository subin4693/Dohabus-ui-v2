import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import logo from "../../assets/logo.png";
import Slider from "react-slick";

import { IoClose, IoArrowBack, IoArrowForward } from "react-icons/io5";
const reviewss = [
  {
    name: "John Doe",
    text: "This service exceeded my expectations. Highly recommend it!",
    image:
      "https://lh3.googleusercontent.com/a-/ALV-UjWViiXvxkA_Tih2Fp6Ja9hHtrJaj301BQWGqNOK31N9RQ=s120-c-rp-mo-ba2-br100",
  },
  {
    name: "Jane Smith",
    text: "Fantastic experience! The team was very professional and friendly.",
    image:
      "https://lh3.googleusercontent.com/a-/ALV-UjWViiXvxkA_Tih2Fp6Ja9hHtrJaj301BQWGqNOK31N9RQ=s120-c-rp-mo-ba2-br100",
  },
  {
    name: "Sam Wilson",
    text: "Great value for money. I will definitely use this service again.",
    image:
      "https://lh3.googleusercontent.com/a-/ALV-UjWViiXvxkA_Tih2Fp6Ja9hHtrJaj301BQWGqNOK31N9RQ=s120-c-rp-mo-ba2-br100",
  },
  {
    name: "Sam Wilson",
    text: "Great value for money. I will definitely use this service again.",
    image:
      "https://lh3.googleusercontent.com/a-/ALV-UjWViiXvxkA_Tih2Fp6Ja9hHtrJaj301BQWGqNOK31N9RQ=s120-c-rp-mo-ba2-br100",
  },
  {
    name: "Sam Wilson",
    text: "Great value for money. I will definitely use this service again.",
    image:
      "https://lh3.googleusercontent.com/a-/ALV-UjWViiXvxkA_Tih2Fp6Ja9hHtrJaj301BQWGqNOK31N9RQ=s120-c-rp-mo-ba2-br100",
  },
  // Add more reviews as needed
];
const Home = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly
  const [currentIndex, setCurrentIndex] = useState(0);
  const lang = useSelector((state) => state.language.lang);
  const [slides, setSlides] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [reviews, setReviews] = useState([]);
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const slides = [
  //   {
  //     url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/9b/de/55/doha-bus.jpg?w=1200&h=-1&s=1",
  //     alt: "Slide 1",
  //   },
  //   {
  //     url: "https://images.pexels.com/photos/11912983/pexels-photo-11912983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //     alt: "Slide 2",
  //   },
  //   {
  //     url: "https://dohabus.com/wp-content/uploads/2020/05/DSC6346-scaled.jpg",
  //     alt: "Slide 3",
  //   },
  //   {
  //     url: "https://cdn.getyourguide.com/img/tour/63b3fd9ac54a9.jpeg/145.jpg",
  //     alt: "Slide 4",
  //   },
  // ];

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
      // Check if prevIndex is not a number
      if (typeof prevIndex !== "number" || isNaN(prevIndex)) {
        return 0;
      }

      return (prevIndex - 1 + slides.length) % slides.length;
    });
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
        console.log(reviewData.data.data);
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

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length,
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
                ),
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
      {/* <div
        className="pb-6"
        style={{
          backgroundImage: "linear-gradient(138deg, #ffffff 50%, #fed92e 50%)",
        }}
      >
        <div className="flex justify-between items-center flex-wrap gap-5">
          <div className="flex-grow">
            <hr className="border border-dark" />
          </div>
          <div className="px-4">
            <h1 className="text-center text-5xl font-semibold">
              What Our Customers Say!
            </h1>
          </div>
          <div className="flex-grow ">
            <hr className="border border-dark" />
          </div>
        </div>
        <h3 className="text-center mt-5 text-3xl text-gray-700">
          Inbound Tours Qatar - Most trusted website to book your Desert Safari
          in Qatar
        </h3>
        <div className="pt-20 flex justify-center items-center pb-5 flex-wrap">
          <div className="p-5 flex flex-col items-center">
            <h1 className="text-3xl text-center">
              Based on <b>816 reviews</b>
            </h1>
            <img className="w-[30vh] mt-2" src={logo} alt="logo" />
          </div>
          <div className="slider-container inset-0 z-10 flex items-center justify-center px-4">
            <Slider
              {...settings}
              className="w-[90vw] max-w-[90vw] h-[40vh] md:w-[61.2vw] overflow-hidden"
              afterChange={(newIndex) => {
                console.log(newIndex);
              }}
            >
              {reviewss.map((review, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full max-w-[350px] h-[45vh] bg-white shadow-lg p-4 rounded-lg mx-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      className="w-[50px] h-[50px] object-cover rounded-full"
                      src={review.image}
                      alt="reviewer"
                    />
                    <div>
                      <h1 className="text-3xl font-semibold">{review.name}</h1>
                      <p className="text-2xl">2-3-2024</p>
                    </div>
                  </div>
                  <p className="mt-5 text-[1.2rem]">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Adipisci ab earum quibusdam ipsam corporis consectetur est,
                    sed dolor nisi eligendi hic neque qui velit ut architecto
                    ducimus enim eius expedita! lorem
                  </p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div> */}
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
