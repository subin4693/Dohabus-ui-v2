import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../../components/Banner";
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
    const BASE_URL = import.meta.env.VITE_BASE_URL; 
    const [tours, setTours] = useState([]);
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
    useEffect(() => {
        const getData = async () => {
            const data = await axios.get(
                BASE_URL + "/plans/category/" + category,
            );
            console.log(data.data.data.plans);
            // setAlbum(data?.data?.images);
            setTours(data.data.data.plans);
        };
        getData();
    }, []);
    return (
        <div>
            <Banner
                image={catTop}
                title={lang === "en" ? "City Tour" : "جولة المدينة"}
                subTitle={"Home | Tours"}
            />

            <h1 className="text-center text-[3rem] font-bold mt-16">
                {lang === "en" ? "Choose Your Tour" : "اختر جولتك"}
            </h1>

            <div className="flex flex-wrap gap-5 justify-center items-center mt-5">
                {tours.map(({ coverImage, title, _id }) => (
                    <TourCard
                        lang={lang}
                        image={coverImage}
                        title={title[lang]}
                        link={_id}
                        key={_id}
                    />
                ))}
            </div>
        </div>
    );
};

export default SignleCategory;
