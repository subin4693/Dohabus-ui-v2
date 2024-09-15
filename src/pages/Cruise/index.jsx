import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import contactImg from "../../assets/contact.jpg";
import { Link } from "react-router-dom";
import Offers from "../Offer&Promotion";
import { useSelector } from "react-redux";
import axios from "axios";
const index = () => {
  const lang = useSelector((state) => state.language.lang);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [categories, setCategories] = useState([]);
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const categoryData = await axios.get(BASE_URL + "/couries");
        const toursData = await axios.get(BASE_URL + "/populor-couries");
        setCategories(categoryData?.data?.data?.courise);
        setTours(toursData?.data?.data?.courise);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  console.log("categories", tours);
  const itemsPerSlide = 3;

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? Math.ceil(categories.length / itemsPerSlide) - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === Math.ceil(categories.length / itemsPerSlide) - 1 ? 0 : prev + 1
    );
  };
  return (
    <div>
      <Banner
        image="https://images.pexels.com/photos/9394657/pexels-photo-9394657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        title={lang === "ar" ? "عالمك من السعادة" : "Your world of joy"}
        subTitle={
          lang === "ar" ? "الرئيسية | باقات الرحلات" : "Home | Cruise Packages"
        }
      />

      <section className="mb-5 px-16 mt-5">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          {lang === "en" ? "Why Choose DohaBus?" : "لماذا تختار دوحة باص؟"}
        </h2>
        <br />
        <div className="cards flex  justify-around flex-wrap gap-3">
          <div className="card w-[40vh] h-[300px] overflow-hidden shadow-xl p-3 rounded-md">
            <img
              className="w-[10vh]"
              src="https://viatour-nextjs.vercel.app/img/icons/1/ticket.svg"
              alt=""
            />
            <div className="mt-6">
              <h1 className=" font-semibold mb-3">
                {lang === "en" ? "Ultimate flexibility" : "المرونة القصوى"}
              </h1>
              <p>
                {lang === "en"
                  ? "You're in control, with free cancellation and payment options to satisfy any plan or budget."
                  : "أنت المتحكم، مع إمكانية الإلغاء المجاني وخيارات الدفع التي تناسب أي خطة أو ميزانية."}
              </p>
            </div>
          </div>
          <div className="card w-[40vh] h-[300px] overflow-hidden shadow-xl p-3 rounded-md">
            <img
              className="w-[10vh]"
              src="https://viatour-nextjs.vercel.app/img/icons/1/hot-air-balloon.svg"
              alt=""
            />
            <div className="mt-6">
              <h1 className=" font-semibold mb-3">
                {lang === "en" ? "Memorable experiences" : "تجارب لا تُنسى"}
              </h1>
              <p>
                {lang === "en"
                  ? "Browse and book tours and activities so incredible, you'll want to tell your friends."
                  : "تصفح واحجز جولات وأنشطة رائعة لدرجة أنك سترغب في إخبار أصدقائك."}
              </p>
            </div>
          </div>
          <div className="card w-[40vh] h-[300px] overflow-hidden shadow-xl p-3 rounded-md">
            <img
              className="w-[10vh]"
              src="https://viatour-nextjs.vercel.app/img/icons/1/diamond.svg"
              alt=""
            />
            <div className="mt-6">
              <h1 className=" font-semibold mb-3">
                {lang === "en" ? "Ultimate flexibility" : "المرونة القصوى"}
              </h1>
              <p>
                {lang === "en"
                  ? "                High-quality standards. Millions of reviews. A tourz company."
                  : "معايير عالية الجودة. ملايين التقييمات. شركة جولات."}
              </p>
            </div>
          </div>
          <div className="card w-[40vh] h-[300px] overflow-hidden shadow-xl p-3 rounded-md">
            <img
              className="w-[10vh]"
              src="https://viatour-nextjs.vercel.app/img/icons/1/medal.svg"
              alt=""
            />
            <div className="mt-6">
              <h1 className="font-semibold mb-3">
                {lang === "en" ? "Quality at our core" : "الجودة هي أساسنا"}
              </h1>
              <p>
                {lang === "en"
                  ? "New price? New plan? No problem. We're here to help, 24/7."
                  : "سعر جديد؟ خطة جديدة؟ لا مشكلة. نحن هنا للمساعدة على مدار الساعة."}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="my-20 ">
        <h2 className="text-3xl font-semibold mb-4 px-16 mt-5 mb-5 text-center ">
          {lang === "en" ? "Trending Cruise packages" : "الفئات الرائجة"}
        </h2>
        <div className="relative w-full max-w-6xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({
                length: Math.ceil(categories.length / itemsPerSlide),
              }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="flex min-w-full gap-4 md:gap-0 justify-center "
                >
                  {categories
                    .slice(
                      slideIndex * itemsPerSlide,
                      slideIndex * itemsPerSlide + itemsPerSlide
                    )
                    .map((slide) => (
                      <div
                        key={slide.id}
                        className="card w-full md:w-[25%] h-[300px] flex justify-center flex-col items-center"
                      >
                        <Link to={`/contact`}>
                          <img
                            className="w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] rounded-full object-cover cursor-pointer transform transition-all duration-300 ease-in-out hover:w-[140px] hover:h-[140px] sm:hover:w-[190px] sm:hover:h-[190px]"
                            src={slide.coverImage}
                            alt={slide.title.en}
                          />
                        </Link>
                        <div>
                          <h1 className="text-center font-bold mt-2 text-[1.2rem] h-[30px] overflow-hidden">
                            {lang === "en" ? slide.title.en : slide.title.ar}
                          </h1>
                          <h2 className="text-center font-semibold h-[50px] overflow-hidden line-clamp-2">
                            {lang === "en"
                              ? slide.description.en
                              : slide.description.ar}{" "}
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
        <h2 className="text-3xl font-semibold mb-4 text-center">
          {lang === "en" ? "Find Popular Cruise" : "اكتشف الجولات الشهيرة"}
        </h2>
        <div className="cards flex flex-wrap gap-4 justify-center items-center">
          {tours.map((tour) => (
            <>
              <Link to={`/contact`}>
                <div
                  key={tour._id}
                  className="card w-[380px] h-[350px] overflow-hidden p-5 border rounded-2xl cursor-pointer"
                >
                  <img
                    className="h-[200px] w-full object-cover rounded transform transition-all duration-300 ease-in-out hover:h-[190px] sm:hover:h-[190px]"
                    src={tour.coverImage}
                    alt={tour.title.en}
                  />
                  <div>
                    <h1 className="text-[1.2rem] font-bold mt-2 ">
                      {lang === "en" ? tour.title.en : tour.title.ar}
                    </h1>
                    <p className="h-[50px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {lang === "en"
                        ? tour.description.en
                        : tour.description.ar}
                    </p>
                    <div className="flex justify-between mt-1">
                      <small>
                        {" "}
                        {lang === "en" ? tour.duration.en : tour.duration.ar}
                      </small>
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
