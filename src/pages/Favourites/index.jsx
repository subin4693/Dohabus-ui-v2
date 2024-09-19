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
import { toast } from "react-toastify";
import catTop from "../../assets/city-tour-categorypage.jpg";
import TourCard from "./TourCard";
import { useSelector } from "react-redux";
const SignleCategory = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly
    const [tours, setTours] = useState([]);
    const [bannerCategory, setBannerCategory] = useState(null);
    const { category } = useParams();
    const mainUser = useSelector((state) => state.user.user);

    const lang = useSelector((state) => state.language.lang);

    const addToCart = async (categoryId, planId) => {
        try {
            console.log(categoryId);
            console.log(planId);
            console.log("Adding to cart...");

            const res = await axios.post(`${BASE_URL}/carts`, {
                category: categoryId,
                tour: planId,
                user: mainUser,
            });

            const cartId = res.data.data.cartItem?._id; // Safely access cartItem._id

            // Update the tours state after successful request
            setTours((prevTours) =>
                prevTours?.map((tour) =>
                    tour._id === planId
                        ? {
                              ...tour,
                              isInCart: !tour.isInCart,
                              cartId: cartId ? cartId : null, // Conditionally set cartId
                          }
                        : tour
                )
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

            const res = await axios.post(`${BASE_URL}/favourites`, {
                category: categoryId,
                tour: planId,
                user: mainUser,
            });

            const favId = res?.data?.data?.favourite?._id; // Safely access favourite._id

            // Update the tours state after successful request
            setTours((prevTours) =>
                prevTours?.map((tour) =>
                    tour._id === planId
                        ? {
                              ...tour,
                              isInFavorites: !tour.isInFavorites,
                              favId: favId ? favId : null, // Conditionally set favId
                          }
                        : tour
                )
            );
            alert("Added to favourite");
        } catch (error) {
            console.log(error);
        }
    };
    const removeFromCart = async (cartId) => {
        try {
            console.log(cartId);

            const res = await axios.delete(`${BASE_URL}/carts/${cartId}`);

            console.log(res);

            // Update the tours state to remove the tour with the given cartId
            setTours((prevTours) =>
                prevTours.filter((tour) => tour._id !== cartId)
            );
        } catch (error) {
            position: "top-right", console.log(error);
        }
    };
    const removeFromFav = async (favId) => {
        try {
            const res = await axios.delete(`${BASE_URL}/favourites/${favId}`);
            console.log(res);

            // Update the tours state after successful removal
            setTours((prevTours) =>
                prevTours.filter((tour) => tour._id !== favId)
            );
            toast.success(" Removed from favourite ", {
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
            toast.error(" Something went wrong! ", {
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
                const data = await axios.get(
                    BASE_URL + "/favourites?user=" + mainUser._id
                );
                console.log(data?.data?.data?.favourites);
                // setAlbum(data?.data?.images);

                setTours(data?.data?.data?.favourites);
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
                title={"Favorites"}
                subTitle={"Home | Favorites"}
            />{" "}
            <h1 className="text-center text-[3rem] font-bold mt-16">
                {lang === "en" ? "Choose Your Tour" : "اختر جولتك"}
            </h1>
            <div className=" gap-5 mt-5 grid grid-cols-1 md:grid-cols- lg:grid-cols-2 xl:grid-cols-3 mx-10">
                {tours?.map(({ _id, tour }) => {
                    const {
                        isInCart,
                        isInFavorites,
                        coverImage,
                        duration,
                        title,
                        childData,
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

                        favId: _id,
                        itinerary: itinerary && itinerary[0],
                        childPrice: childPrice ? childPrice : 0,
                    });

                    return (
                        <TourCard
                            lang={lang}
                            image={coverImage}
                            title={title[lang]}
                            link={tour._id}
                            key={tour._id}
                            category={tour.category}
                            addToCart={addToCart}
                            addToFav={addToFav}
                            removeFromCart={removeFromCart}
                            removeFromFav={removeFromFav}
                            duration={duration}
                            favId={_id}
                            itinerary={itinerary && itinerary[0]}
                            childPrice={
                                childPrice
                                    ? childPrice
                                    : childData[0]?.price
                                    ? childData[0]?.price
                                    : 0
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default SignleCategory;
