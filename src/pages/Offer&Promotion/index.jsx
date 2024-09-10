import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Index = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const lang = useSelector((state) => state.language.lang); // Get the current language (e.g., 'en' or 'ar')

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(BASE_URL + "/offerbanner/getactive");
        if (response.data && response.data.length > 0) {
          setOffer(response.data[0]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (!offer) {
    return (
      <div
        className="flex justify-center items-center h-screen text-white"
        style={{
          backgroundImage:
            "url('https://dohabus.com/wp-content/uploads/2020/05/IMG_0367-scaled.jpg'), linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      >
        <h1 className="text-4xl">We don't have any offers at the moment.</h1>
      </div>
    );
  }

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage:
          "url('https://dohabus.com/wp-content/uploads/2020/05/IMG_0367-scaled.jpg'), linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
    >
      <div
        className={`pt-20 flex justify-center items-center ${lang === "ar" ? "rtl" : ""}`}
        style={{
          direction: lang === "ar" ? "rtl" : "ltr", // Apply text direction based on the language
        }}
      >
        <div className="py-5">
          <h3 className="text-4xl font-semibold text-white text-center">
            {lang === "ar" ? "عرض خاص" : "SPECIAL OFFER"}
          </h3>
          <h1 className="text-6xl font-bold text-white text-center mt-2">
            {offer.title[lang].toUpperCase()}{" "}
            <p className="text-custom-yellow">
              {lang === "ar" ? "ترويج" : "PROMO"}
            </p>
          </h1>

          <h2 className="text-4xl font-bold text-white text-center mt-6">
            {lang === "ar" ? "تصل إلى" : "UP TO"}
          </h2>
          <h1 className="text-6xl font-bold text-white text-center mt-2">
            {offer.percentage}% {lang === "ar" ? "خصم" : "OFF"}
          </h1>
          <div className="flex justify-center">
            <Link to={"/tours"}>
              <button className="text-3xl font-bold text-white mt-8 bg-custom-yellow p-5">
                {lang === "ar" ? "احجز الآن" : "BOOK NOW"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
