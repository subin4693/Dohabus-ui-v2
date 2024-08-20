import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slides = [
        {
            url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/9b/de/55/doha-bus.jpg?w=1200&h=-1&s=1",
            alt: "Slide 1",
        },
        {
            url: "https://images.pexels.com/photos/11912983/pexels-photo-11912983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            alt: "Slide 2",
        },
        {
            url: "https://dohabus.com/wp-content/uploads/2020/05/DSC6346-scaled.jpg",
            alt: "Slide 3",
        },
        {
            url: "https://cdn.getyourguide.com/img/tour/63b3fd9ac54a9.jpeg/145.jpg",
            alt: "Slide 4",
        },
    ];

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
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
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
                    {slides.map(
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
                                        src={slide.url}
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
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full ${
                                index === currentIndex
                                    ? "bg-gray-800"
                                    : "bg-gray-400"
                            }`}
                            onClick={() => goToSlide(index)}
                        ></button>
                    ))}
                </div>
            </div>
            <div
                style={{
                    backgroundImage:
                        "linear-gradient(45deg, #fed92e 50%, #ffffff 50%)",
                }}
                className="py-14 "
            >
                <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl p-5 text-center font-semibold ">
                        Discover Our Tours
                    </h1>
                    <p className="text-lg p-2 text-center text-gray-500">
                        ‘’Explore Qatar to its fullest under our wing..’’
                    </p>
                    <div className="flex justify-center items-center  gap-5 flex-wrap mt-20">
                        {[
                            {
                                title: "City Tours",
                                description:
                                    "Access lots of iconic locations with ease at your own pace",
                                image: "https://eng.dohabus.com/English/images/2022/10/17/city.jpg",
                                link: "/tours/city tours",
                            },
                            {
                                title: "Sea Tours",
                                description:
                                    "Access lots of iconic locations with ease at your own pace",
                                image: "https://eng.dohabus.com/English/images/2022/09/29/3.jpg",
                                link: "/tours/Sea tours",
                            },
                            {
                                title: "Desert Tours",
                                description:
                                    "Access lots of iconic locations with ease at your own pace",
                                image: "https://eng.dohabus.com/English/images/2022/10/17/0.jpg",
                                link: "/tours/Desert tours",
                            },
                            {
                                title: "Combo Tours",
                                description:
                                    "Access lots of iconic locations with ease at your own pace",
                                image: "https://eng.dohabus.com/English/images/2022/10/16/combo.jpg",
                                link: "/tours/Combo tours",
                            },
                            {
                                title: "Cultural Tours",
                                description:
                                    "Access lots of iconic locations with ease at your own pace",
                                image: "https://eng.dohabus.com/English/images/2022/09/29/4.jpg",
                                link: "/tours/Cultural tours",
                            },
                            {
                                title: "Al-Majles",
                                description:
                                    "Access lots of iconic locations with ease at your own pace",
                                image: "https://eng.dohabus.com/English/images/2022/10/17/9.jpg",
                            },
                        ].map((data) => (
                            <Link
                                to={data.link}
                                className="card w-[300px] flex flex-col items-center mb-20"
                            >
                                <div className="relative w-[200px] h-[200px]">
                                    <img
                                        className="absolute inset-0 w-full h-full object-cover rounded-full transition-transform duration-[.6s] transform hover:scale-125 cursor-pointer"
                                        src={data.image}
                                        alt="img"
                                    />
                                </div>
                                <div className="flex flex-col items-center justify-between flex-grow p-4">
                                    <h1 className="text-xl font-semibold text-center mt-4 transition-colors duration-300 hover:text-custom-yellow cursor-pointer">
                                        {data.title}
                                    </h1>
                                    <p className="text-gray-500 text-center mt-2">
                                        {data.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </div>

            <div
                style={{
                    backgroundImage:
                        "linear-gradient(45deg, #ffffff 50%, #fed92e 50%)",
                }}
                className="p-10 py-24 flex justify-center items-center flex-wrap"
            >
                <div className="relative w-full lg:w-2/5 h-[400px] ">
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/PoyyKl6uypA"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="YouTube video"
                    ></iframe>
                </div>

                <div className="w-full lg:w-1/5">
                    <h1 className="text-4xl p-5 text-center font-semibold">
                        OVERALL TOUR EXPERIENCE
                    </h1>
                </div>
                <div className="relative w-full lg:w-2/5 h-[400px]">
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/PoyyKl6uypA"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="YouTube video"
                    ></iframe>
                </div>
            </div>
            <div
                className="w-full py-20"
                style={{
                    backgroundImage:
                        "linear-gradient(135deg, #fed92e 50%, #ffffff 50%)",
                }}
            >
                <div className="px-1 md:px-10 xl:w-[70%] mx-auto flex justify-center items-center gap-5 flex-wrap">
                    <div>
                        <h1 className="text-5xl font-bold">
                            TRANSPORTATION FLEET
                        </h1>
                        <p className="my-4 text-xl">
                            Providing reliable vehicle rental service throughout
                            Doha and across Qatar
                        </p>
                        <Link to="/transportation">
                            <button className="px-4 py-2 bg-black text-white rounded-md text-xl">
                                Discover More...
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
