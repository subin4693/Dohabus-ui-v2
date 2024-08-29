import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../../components/Banner";
import contactImg from "../../assets/contact.jpg";
import { useParams } from "react-router-dom";
import aimaj from "../../assets/aimaaj-tourpagej.jpg";
import desert from "../../assets/deset-tourpage.jpg";
import common from "../../assets/common-tourpage.jpg";
import city from "../../assets/city-tourpage.jpg";
import sea from "../../assets/sea-tourpage.jpg";
import cultural from "../../assets/cultural-tourpage.jpg";

import catTop from "../../assets/city-tour-categorypage.jpg";
import TourCard from "./TourCard";
import { useSelector } from "react-redux";
const SignleCategory = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly
    const [tours, setTours] = useState([]);
    const [bannerCategory, setBannerCategory] = useState(null);
    const { category } = useParams();
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

    const addToCart = async (categoryId, planId) => {
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
            alert("Added to Cart");
        } catch (error) {
            console.log(error);
        }
    };

    const addToFav = async (categoryId, planId) => {
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
            alert("Added to favourite");
        } catch (error) {
            console.log(error);
        }
    };
    const removeFromCart = async (cartId) => {
        try {
            console.log(cartId);

            const res = await axios.delete(`${BASE_URL}/carts/${cartId}`, {
                withCredentials: true,
            });

            console.log(res);

            // Update the tours state to remove the tour with the given cartId
            setTours((prevTours) =>
                prevTours.filter((tour) => tour._id !== cartId),
            );

            alert("Removed from Cart");
        } catch (error) {
            console.log(error);
        }
    };
    const removeFromFav = async (favId) => {
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
            alert("Removed from favourite");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await axios.get(BASE_URL + "/carts", {
                    withCredentials: true, // This option ensures cookies or other credentials are sent with the request
                });
                console.log(data.data.data.cartItems);
                // setAlbum(data?.data?.images);

                setTours(data.data.data.cartItems);
                // setBannerCategory(data.data.data.category);
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
                image={contactImg}
                title={"Cart"}
                subTitle={"Home | Cart"}
            />{" "}
            <h1 className="text-center text-[3rem] font-bold mt-16">
                {lang === "en" ? "Choose Your Tour" : "اختر جولتك"}
            </h1>
            <div className="flex flex-wrap gap-5 justify-center items-center mt-5">
                {tours.map(({ _id, tour }) => {
                    const {
                        isInCart,
                        isInFavorites,
                        coverImage,
                        duration,
                        title,

                        favId,
                        cartId,
                        itinerary,
                        childPrice,
                    } = tour; // Destructure tour properties
                    console.log({
                        lang: lang,
                        image: coverImage,
                        title: title[lang],

                        link: _id,
                        key: _id,
                        addToCart: addToCart,
                        addToFav: addToFav,
                        removeFromCart: removeFromCart,
                        removeFromFav: removeFromFav,
                        duration: duration,

                        cartId: _id,
                        itinerary: itinerary && itinerary[0],
                        childPrice: childPrice ? childPrice : 0,
                    });

                    return (
                        <TourCard
                            lang={lang}
                            image={coverImage}
                            title={title[lang]}
                            link={_id}
                            key={_id}
                            addToCart={addToCart}
                            addToFav={addToFav}
                            removeFromCart={removeFromCart}
                            removeFromFav={removeFromFav}
                            duration={duration}
                            cartId={_id}
                            itinerary={itinerary && itinerary[0]}
                            childPrice={childPrice ? childPrice : 0}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default SignleCategory;
