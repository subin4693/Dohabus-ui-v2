import React, { useState } from "react";
import Banner from "../../components/Banner";
import contactImg from "../../assets/contact.jpg";
import { Link } from "react-router-dom";
import Offers from "../Offer&Promotion";
const index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
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
      id: 4,
      title: "National Museum of Qatar",
      tours: "120+ Tours",
      imageUrl:
        "https://images.pexels.com/photos/14659649/pexels-photo-14659649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 4,
      title: "National Museum of Qatar",
      tours: "120+ Tours",
      imageUrl:
        "https://images.pexels.com/photos/14659649/pexels-photo-14659649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 4,
      title: "National Museum of Qatar",
      tours: "120+ Tours",
      imageUrl:
        "https://images.pexels.com/photos/14659649/pexels-photo-14659649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];
  const Tours = [
    {
      id: 1,
      title: "Souq Waqif Tour",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis voluptates sed",
      hours: "4 Hours",
      price: "200",
      imageUrl:
        "https://images.pexels.com/photos/14659646/pexels-photo-14659646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      title: "Desert Safari",
      desc: "Explore the beautiful desert landscapes with our exciting safari tour.",
      hours: "6 Hours",
      price: "300",
      imageUrl:
        "https://images.pexels.com/photos/1645618/pexels-photo-1645618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 3,
      title: "Desert Safari",
      desc: "Explore the beautiful desert landscapes with our exciting safari tour.",
      hours: "6 Hours",
      price: "300",
      imageUrl:
        "https://images.pexels.com/photos/1645618/pexels-photo-1645618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 4,
      title: "Desert Safari",
      desc: "Explore the beautiful desert landscapes with our exciting safari tour.",
      hours: "6 Hours",
      price: "300",
      imageUrl:
        "https://images.pexels.com/photos/1645618/pexels-photo-1645618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 5,
      title: "Desert Safari",
      desc: "Explore the beautiful desert landscapes with our exciting safari tour.",
      hours: "6 Hours",
      price: "300",
      imageUrl:
        "https://images.pexels.com/photos/1645618/pexels-photo-1645618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 6,
      title: "Desert Safari",
      desc: "Explore the beautiful desert landscapes with our exciting safari tour.",
      hours: "6 Hours",
      price: "300",
      imageUrl:
        "https://images.pexels.com/photos/1645618/pexels-photo-1645618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 7,
      title: "Souq Waqif Tour",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis voluptates sed",
      hours: "4 Hours",
      price: "200",
      imageUrl:
        "https://images.pexels.com/photos/14659646/pexels-photo-14659646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 8,
      title: "Souq Waqif Tour",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis voluptates sed",
      hours: "4 Hours",
      price: "200",
      imageUrl:
        "https://images.pexels.com/photos/14659646/pexels-photo-14659646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  const itemsPerSlide = 3;

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? Math.ceil(slides.length / itemsPerSlide) - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === Math.ceil(slides.length / itemsPerSlide) - 1 ? 0 : prev + 1
    );
  };
  return (
    <div>
      <Banner
        image="https://images.pexels.com/photos/9394657/pexels-photo-9394657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        title={"Your world of joy"}
        subTitle={"Home | Cruise Packages "}
      />

      <section className="mb-5 px-16 mt-5">
        <h2 className="text-3xl font-semibold mb-4">Why Choose DohaBus?</h2>
        <div className="cards flex  justify-around flex-wrap gap-3">
          <div className="card w-[40vh] h-[300px] overflow-hidden">
            <img
              className="w-[10vh]"
              src="https://viatour-nextjs.vercel.app/img/icons/1/ticket.svg"
              alt=""
            />
            <div className="mt-6">
              <h1 className=" font-semibold mb-3">Ultimate flexibility</h1>
              <p>
                You're in control, with free cancellation and payment options to
                satisfy any plan or budget.
              </p>
            </div>
          </div>
          <div className="card w-[40vh] h-[300px] overflow-hidden">
            <img
              className="w-[10vh]"
              src="https://viatour-nextjs.vercel.app/img/icons/1/hot-air-balloon.svg"
              alt=""
            />
            <div className="mt-6">
              <h1 className=" font-semibold mb-3">Memorable experiences</h1>
              <p>
                Browse and book tours and activities so incredible, you'll want
                to tell your friends.
              </p>
            </div>
          </div>
          <div className="card w-[40vh] h-[300px] overflow-hidden">
            <img
              className="w-[10vh]"
              src="https://viatour-nextjs.vercel.app/img/icons/1/diamond.svg"
              alt=""
            />
            <div className="mt-6">
              <h1 className=" font-semibold mb-3">Quality at our core </h1>
              <p>
                High-quality standards. Millions of reviews. A tourz company.
              </p>
            </div>
          </div>
          <div className="card w-[40vh] h-[300px] overflow-hidden">
            <img
              className="w-[10vh]"
              src="https://viatour-nextjs.vercel.app/img/icons/1/medal.svg"
              alt=""
            />
            <div className="mt-6">
              <h1 className="font-semibold mb-3">Award-winning support </h1>
              <p>New price? New plan? No problem. We're here to help, 24/7.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-12 ">
        <h2 className="text-3xl font-semibold mb-4 px-16 mt-5 mb-5">Trending destinations</h2>
        <div className="relative w-full max-w-6xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({
                length: Math.ceil(slides.length / itemsPerSlide),
              }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="flex min-w-full gap-4 md:gap-0 justify-center "
                >
                  {slides
                    .slice(
                      slideIndex * itemsPerSlide,
                      slideIndex * itemsPerSlide + itemsPerSlide
                    )
                    .map((slide) => (
                      <div
                        key={slide.id}
                        className="card w-full md:w-[25%] h-[300px] flex justify-center flex-col items-center"
                      >
                        <Link to={""}>
                          <img
                            className="w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] rounded-full object-cover cursor-pointer transform transition-all duration-300 ease-in-out hover:w-[140px] hover:h-[140px] sm:hover:w-[190px] sm:hover:h-[190px]"
                            src={slide.imageUrl}
                            alt={slide.title}
                          />
                        </Link>
                        <div>
                          <h1 className="text-center font-bold mt-2 text-[1.2rem] h-[30px] overflow-hidden">
                            {slide.title}
                          </h1>
                          <h2 className="text-center font-semibold">
                            {slide.tours}
                          </h2>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-6xl text-custom-yellow  p-2 rounded-full"
          >
            &#8249;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2  p-2 transform -translate-y-1/2  text-6xl text-custom-yellow rounded-full"
          >
            &#8250;
          </button>
        </div>
      </section>
      <section className="mb-5 px-16 mt-5">
        <h2 className="text-3xl font-semibold mb-4">Find Popular Tours</h2>
        <div className="cards flex flex-wrap gap-4 justify-center items-center">
          {Tours.map((tour) => (
            <>
              <Link to={"/tours"}>
                <div
                  key={tour.id}
                  className="card w-[380px] h-[350px] overflow-hidden p-5 border rounded-2xl cursor-pointer"
                >
                  <img
                    className="h-[200px] w-full object-cover rounded transform transition-all duration-300 ease-in-out hover:h-[190px] sm:hover:h-[190px]"
                    src={tour.imageUrl}
                    alt={tour.title}
                  />
                  <div>
                    <h1 className="text-[1.2rem] font-bold">{tour.title}</h1>
                    <p className="h-[50px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {tour.desc}
                    </p>
                    <div className="flex justify-between mt-1">
                      <small>{tour.hours}</small>
                      <h2 className="font-semibold">From: {tour.price} QAR</h2>
                    </div>
                  </div>
                </div>
              </Link>
            </>
          ))}
        </div>
      </section>
     
    </div>
  );
};

export default index;
