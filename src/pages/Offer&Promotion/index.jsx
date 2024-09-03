import React from "react";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url('https://dohabus.com/wp-content/uploads/2020/05/IMG_0367-scaled.jpg'), linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay", 
        height: "100vh", 
        width: "100%",
      }}
    >
      <div className="pt-20 flex justify-center items-center">
        <div className="p-20">
          <h3 className="text-4xl font-semibold text-white text-center">
            SPECIAL OFFER
          </h3>
          <h1 className="text-6xl font-bold text-white text-center mt-2">
            TRAVEL & TOUR <p className="text-custom-yellow">PROMO</p>
          </h1>

          <h2 className="text-4xl font-bold text-white text-center  mt-6">
            UP TO
          </h2>
          <h1 className="text-6xl font-bold text-white text-center mt-2">
            50% OFF
          </h1>
          <div className="flex justify-center">
            <Link to={"/tours"}>
              <button className="text-3xl font-bold text-white  mt-8 bg-custom-yellow p-5">
                BOOK NOW
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
