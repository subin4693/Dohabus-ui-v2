import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner";
import Card from "./Card";
import banner from "../../assets/hotel-banner.jpg";
import hotel1 from "../../assets/hotel1.jpg";
import { useSelector } from "react-redux";
import axios from "axios";

const Hotel = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly

    const [hotels, setHotels] = useState([]);
    const lang = useSelector((state) => state.language.lang);
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(BASE_URL + "/hotels");
                console.log(res.data.data.hotels);
                setHotels(res.data.data.hotels);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    return (
        <div>
            <Banner
                image={banner}
                title={lang === "en" ? "Hotels" : "الفنادق"}
                subTitle={
                    lang === "en" ? "Home | Hotels" : "الرئيسية | الفنادق"
                }
            />
            <div className="px-1 md:px-10 xl:w-[70%] mx-auto my-10">
                <div className="grid grid-cols-1 gap-y-20 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {hotels &&
                        hotels?.map((hotel) => (
                            <Card
                                lang={lang}
                                image={hotel.coverImage}
                                title={hotel.title[lang]} // Use language-specific title
                                desc={hotel.description[lang]} // Use language-specific description
                                key={hotel._id}
                                id={hotel._id}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Hotel;
