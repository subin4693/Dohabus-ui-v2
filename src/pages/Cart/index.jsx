import React, { useState } from "react";
import Banner from "../../components/Banner";
import contactImg from "../../assets/contact.jpg";

import aimaj from "../../assets/aimaaj-tourpagej.jpg";
import desert from "../../assets/deset-tourpage.jpg";
import common from "../../assets/common-tourpage.jpg";
import city from "../../assets/city-tourpage.jpg";
import sea from "../../assets/sea-tourpage.jpg";
import cultural from "../../assets/cultural-tourpage.jpg";

import TourCard from "./TourCard";
import CheckoutCard from "./CheckoutCard";
import { useSelector } from "react-redux";

const Cart = () => {
    const lang = useSelector((state) => state.language.lang);
    const [showCheckoutCard, setShowCheckoutCard] = useState(false);
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
    return (
        <div>
            <Banner
                image={contactImg}
                title={"Cart"}
                subTitle={"Home | Cart"}
            />{" "}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-10 md:px-20">
                {data.map(({ image, title, description, id }) => (
                    <TourCard
                        image={image}
                        title={title[lang]}
                        key={id}
                        lang={lang}
                    />
                ))}
                {/* <div className="px-1 md:px-10 xl:w-[70%] mx-auto my-10"> </div> */}
            </div>
            {showCheckoutCard && (
                <CheckoutCard setShowCheckoutCard={setShowCheckoutCard} />
            )}
        </div>
    );
};

export default Cart;
