import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../../components/Banner";
import { useParams, useNavigate } from "react-router-dom";
import aimaj from "../../assets/aimaaj-tourpagej.jpg";
import desert from "../../assets/deset-tourpage.jpg";
import common from "../../assets/common-tourpage.jpg";
import city from "../../assets/city-tourpage.jpg";
import sea from "../../assets/sea-tourpage.jpg";
import cultural from "../../assets/cultural-tourpage.jpg";
import { toast } from "react-toastify";

import { motion, AnimatePresence } from "framer-motion";
import catTop from "../../assets/city-tour-categorypage.jpg";
import TourCard from "./TourCard";
import { useSelector } from "react-redux";
const SignleCategory = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [tours, setTours] = useState([]);
  const [bannerCategory, setBannerCategory] = useState(null);
  const { category } = useParams();
  const navigate = useNavigate();
  const data = [
    {
      _id: 1,
      image: aimaj,
      title: {
        en: "24 Hop On - Hop off Sightseeing Tour",
        ar: "جولة هوب أون - هوب أوف 24",
      },
    },
    {
      _id: 2,
      image: desert,
      title: {
        en: "Explore Doha Tour",
        ar: "جولة استكشاف الدوحة",
      },
    },
    {
      _id: 3,
      image: common,
      title: {
        en: "Doha by Night",
        ar: "الدوحة في الليل",
      },
    },
    {
      _id: 4,
      image: city,
      title: {
        en: "Night Tour",
        ar: "جولة ليلية",
      },
    },
    {
      _id: 5,
      image: cultural,
      title: {
        en: "Doha Sports Tour",
        ar: "جولة الرياضة في الدوحة",
      },
    },
  ];
  const lang = useSelector((state) => state.language.lang);
  const { user } = useSelector((state) => state.user);
  const addToCart = async (categoryId, planId) => {
    if (!user || !user.email) {
      navigate("/signin");
      return;
    }
    try {
      console.log(categoryId);
      console.log(planId);
      console.log("Adding to cart...");

      const res = await axios.post(
        `${BASE_URL}/carts`,
        { category: categoryId, tour: planId },
        { withCredentials: true },
      );

      const cartId = res.data.data.cartItem?._id; // Safely access cartItem._id

      // Update the tours state after successful request
      setTours((prevTours) =>
        prevTours.map((tour) =>
          tour._id === planId
            ? {
                ...tour,
                isInCart: !tour.isInCart,
                cartId: cartId ? cartId : null, // Conditionally set cartId
              }
            : tour,
        ),
      );
      toast.success(" Added to Cart", {
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
      console.log(error);
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
    }
  };

  const addToFav = async (categoryId, planId) => {
    if (!user || !user.email) {
      navigate("/signin");
      return;
    }
    try {
      console.log(categoryId);
      console.log(planId);
      console.log("Adding to favorites...");

      const res = await axios.post(
        `${BASE_URL}/favourites`,
        { category: categoryId, tour: planId },
        { withCredentials: true },
      );

      const favId = res.data.data.favourite?._id; // Safely access favourite._id

      // Update the tours state after successful request
      setTours((prevTours) =>
        prevTours.map((tour) =>
          tour._id === planId
            ? {
                ...tour,
                isInFavorites: !tour.isInFavorites,
                favId: favId ? favId : null, // Conditionally set favId
              }
            : tour,
        ),
      );

      toast.success("Added to favourite ", {
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
      console.log(error);
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
    }
  };
  const removeFromCart = async (cartId) => {
    if (!user || !user.email) {
      navigate("/signin");
      return;
    }
    try {
      const res = await axios.delete(`${BASE_URL}/carts/${cartId}`, {
        withCredentials: true,
      });
      console.log(res);

      // Update the tours state after successful removal
      setTours((prevTours) =>
        prevTours.map((tour) =>
          tour.cartId === cartId
            ? { ...tour, isInCart: false, cartId: null }
            : tour,
        ),
      );

      toast.success("Removed from Cart", {
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
      console.log(error);
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
    }
  };
  const removeFromFav = async (favId) => {
    if (!user || !user.email) {
      navigate("/signin");
      return;
    }
    try {
      const res = await axios.delete(`${BASE_URL}/favourites/${favId}`, {
        withCredentials: true,
      });
      console.log(res);

      // Update the tours state after successful removal
      setTours((prevTours) =>
        prevTours.map((tour) =>
          tour.favId === favId
            ? { ...tour, isInFavorites: false, favId: null }
            : tour,
        ),
      );
      toast.success("Removed from favourite  ", {
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
      console.log(error);
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
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(BASE_URL + "/plans/category/" + category, {
          withCredentials: true, // This option ensures cookies or other credentials are sent with the request
        });
        console.log(data.data.data.plans);
        // setAlbum(data?.data?.images);
        console.log("category", data.data.data.category);
        setTours(data.data.data.plans);
        setBannerCategory(data.data.data.category);
      } catch (error) {
        setTours([]);
        console.log(error);
      }
    };
    getData();
  }, [category]);
  return (
    <div>
      <Banner
        image={bannerCategory && bannerCategory?.coverImage}
        title={bannerCategory && bannerCategory?.title[lang]}
        subTitle={"Home | Tours"}
      />

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-center text-[3rem] font-bold mt-16"
      >
        {lang === "en" ? "Choose Your Tour" : "اختر جولتك"}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-wrap gap-5 justify-center items-center mt-5"
      >
        {tours.map(
          ({
            isInCart,
            isInFavorites,
            coverImage,
            duration,
            title,
            _id,
            favId,
            cartId,
            itinerary,
            childPrice,
            childData,
          }) => (
            <TourCard
              lang={lang}
              image={coverImage}
              title={title[lang]}
              isInCart={isInCart}
              isInFavorites={isInFavorites}
              link={_id}
              catId={bannerCategory._id}
              key={_id}
              addToCart={addToCart}
              addToFav={addToFav}
              removeFromCart={removeFromCart}
              removeFromFav={removeFromFav}
              duration={duration}
              favId={favId}
              cartId={cartId}
              itinerary={itinerary && itinerary[0]}
              childPrice={childPrice ? childPrice : childData[0].price}
            />
          ),
        )}
      </motion.div>
    </div>
  );
};

export default SignleCategory;
