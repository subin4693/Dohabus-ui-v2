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
    const mainUser = useSelector((state) => state.user.user);
    const [tours, setTours] = useState([]);
    const [bannerCategory, setBannerCategory] = useState(null);
    const { category } = useParams();
    const navigate = useNavigate();

    const lang = useSelector((state) => state.language.lang);
    const { user } = useSelector((state) => state.user);
    const addToCart = async (categoryId, planId) => {
        if (!user || !user.email) {
            navigate("/signin");
            return;
        }
        try {
            const res = await axios.post(`${BASE_URL}/carts`, {
                category: categoryId,
                tour: planId,
                user,
            });

            const cartId = res?.data?.data?.cartItem?._id;

            setTours((prevTours) =>
                prevTours?.map((tour) =>
                    tour?._id === planId
                        ? {
                              ...tour,
                              isInCart: !tour?.isInCart,
                              cartId: cartId ? cartId : null,
                          }
                        : tour
                )
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
        if (!user || !user?.email) {
            navigate("/signin");
            return;
        }
        try {
            const res = await axios.post(`${BASE_URL}/favourites`, {
                category: categoryId,
                tour: planId,
                user,
            });
            const favId = res?.data?.data?.favourite?._id; // Safely access favourite._id

            // Update the tours state after successful request
            setTours((prevTours) =>
                prevTours?.map((tour) =>
                    tour?._id === planId
                        ? {
                              ...tour,
                              isInFavorites: !tour?.isInFavorites,
                              favId: favId ? favId : null, // Conditionally set favId
                          }
                        : tour
                )
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
        if (!user || !user?.email) {
            navigate("/signin");
            return;
        }
        try {
            const res = await axios.delete(`${BASE_URL}/carts/${cartId}`);
            // Update the tours state after successful removal
            setTours((prevTours) =>
                prevTours?.map((tour) =>
                    tour?.cartId === cartId
                        ? { ...tour, isInCart: false, cartId: null }
                        : tour
                )
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
            const res = await axios.delete(`${BASE_URL}/favourites/${favId}`);

            // Update the tours state after successful removal
            setTours((prevTours) =>
                prevTours.map((tour) =>
                    tour.favId === favId
                        ? { ...tour, isInFavorites: false, favId: null }
                        : tour
                )
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
                const params = {};

                // Check if mainUser exists and has an _id
                if (mainUser && mainUser._id) {
                    params.user = mainUser._id;
                }

                const data = await axios.get(
                    BASE_URL + "/plans/category/" + category,
                    {
                        params: params,
                    }
                );
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
                className="flex flex-wrap gap-5 mx-2 justify-center items-center mt-5"
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
                            childPrice={
                                childPrice ? childPrice : childData[0].price
                            }
                        />
                    )
                )}
            </motion.div>
        </div>
    );
};

export default SignleCategory;
