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

const Cart = () => {
    const [showCheckoutCard, setShowCheckoutCard] = useState(false);
    const data = [
        {
            _id: 1,
            image: aimaj,
            title: "Ai-Majles",
            description:
                "Enter into a world of luxury and relaxation as you step inside Al-Majles Resort ",
        },
        {
            _id: 1,
            image: desert,
            title: "Desert Tours",
            description:
                "Explore the desert and its thrilling adventures that awaits you.",
        },
        {
            _id: 1,
            image: common,
            title: "Combo Tours",
            description: "Get the best out of our combo packages.",
        },
        {
            _id: 1,
            image: city,
            title: "City Tours",
            description:
                "Access lots of iconic locations with ease at your own pace.",
        },
        {
            _id: 1,
            image: cultural,
            title: "Cultural Tours",
            description:
                "Plunge into the water on our beautiful vessel and experience Doha",
        },
        {
            _id: 1,
            image: sea,
            title: "Sea Tours",
            description:
                "Learn more about what made Doha what it is today by diving deep into its world of art and culture ",
        },
    ];
    return (
        <div>
            <Banner
                image={contactImg}
                title={"Cart"}
                subTitle={"Home | Cart"}
            />{" "}
            <div className="flex justify-end  m-1 mt-10 mr-20 ">
                <button
                    className="bg-custom-yellow px-5  py-2 rounded-md hover:bg-dark hover:text-white duration-300 "
                    onClick={() => setShowCheckoutCard(true)}
                >
                    450 Qar Checkout
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-10 md:px-20">
                {data.map(({ image, title, description, id }) => (
                    <TourCard
                        image={image}
                        title={title}
                        description={description}
                        key={id}
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
