import React from "react";
import Banner from "../../components/Banner";

import aimaj from "../../assets/aimaaj-tourpagej.jpg";
import desert from "../../assets/deset-tourpage.jpg";
import common from "../../assets/common-tourpage.jpg";
import city from "../../assets/city-tourpage.jpg";
import sea from "../../assets/sea-tourpage.jpg";
import cultural from "../../assets/cultural-tourpage.jpg";

import tourtop from "../../assets/tourtop.jpg";
import TourCard from "./TourCard";
import { useSelector } from "react-redux";
const Tours = () => {
    const lang = useSelector((state) => state.language.lang);
    const data = [
        {
            _id: 1,
            image: aimaj,
            title: {
                en: "Ai-Majles",
                ar: "الماجلس",
            },
            description: {
                en: "Enter into a world of luxury and relaxation as you step inside Al-Majles Resort.",
                ar: "ادخل إلى عالم من الفخامة والاسترخاء بمجرد دخولك منتجع المجلس.",
            },
        },
        {
            _id: 2,
            image: desert,
            title: {
                en: "Desert Tours",
                ar: "جولات الصحراء",
            },
            description: {
                en: "Explore the desert and its thrilling adventures that await you.",
                ar: "استكشف الصحراء ومغامراتها المثيرة التي في انتظارك.",
            },
        },
        {
            _id: 3,
            image: common,
            title: {
                en: "Combo Tours",
                ar: "الجولات المدمجة",
            },
            description: {
                en: "Get the best out of our combo packages.",
                ar: "احصل على أفضل ما في باقاتنا المدمجة.",
            },
        },
        {
            _id: 4,
            image: city,
            title: {
                en: "City Tours",
                ar: "جولات المدينة",
            },
            description: {
                en: "Access lots of iconic locations with ease at your own pace.",
                ar: "قم بزيارة العديد من المواقع الأيقونية بسهولة ووفقًا لسرعتك.",
            },
        },
        {
            _id: 5,
            image: cultural,
            title: {
                en: "Cultural Tours",
                ar: "الجولات الثقافية",
            },
            description: {
                en: "Plunge into the water on our beautiful vessel and experience Doha.",
                ar: "غص في الماء على متن سفينتنا الجميلة وتجربة الدوحة.",
            },
        },
        {
            _id: 6,
            image: sea,
            title: {
                en: "Sea Tours",
                ar: "جولات البحر",
            },
            description: {
                en: "Learn more about what made Doha what it is today by diving deep into its world of art and culture.",
                ar: "تعرف على ما جعل الدوحة كما هي اليوم من خلال الغوص في عالمها الفني والثقافي.",
            },
        },
    ];

    return (
        <div>
            <Banner
                image={tourtop}
                title={lang === "en" ? "Tours" : "الجولات"}
                subTitle={lang === "en" ? "Home | Tours" : "الرئيسية | الجولات"}
            />

            <h1 className="text-center text-[3rem] font-bold mt-16">
                {lang === "en" ? "Choose Your Tour" : "اختر جولتك"}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-10 md:px-20">
                {data.map(({ image, title, description, _id }) => (
                    <TourCard
                        image={image}
                        title={title[lang]}
                        description={description[lang]}
                        key={_id}
                    />
                ))}
            </div>
        </div>
    );
};

export default Tours;
