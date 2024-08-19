import React from "react";
import Banner from "../../components/Banner";

import aimaj from "../../assets/aimaaj-tourpagej.jpg";
import desert from "../../assets/deset-tourpage.jpg";
import common from "../../assets/common-tourpage.jpg";
import city from "../../assets/city-tourpage.jpg";
import sea from "../../assets/sea-tourpage.jpg";
import cultural from "../../assets/cultural-tourpage.jpg";

import catTop from "../../assets/city-tour-categorypage.jpg";
import TourCard from "./TourCard";
const SignleCategory = () => {
    const data = [
        {
            _id: 1,
            image: aimaj,
            title: "24 Hop On - Hop off Signhtseeing Tour",
        },
        {
            _id: 1,
            image: desert,
            title: "Explore Doha Tour",
        },
        {
            _id: 1,
            image: common,
            title: "Doha by Night",
        },
        {
            _id: 1,
            image: city,
            title: "Night Tour",
        },
        {
            _id: 1,
            image: cultural,
            title: "Doha sports Tour",
        },
    ];
    return (
        <div>
            <Banner
                image={catTop}
                title={"City Tour"}
                subTitle={"Home | Tours"}
            />

            <h1 className="text-center text-[3rem] font-bold mt-16 ">
                Choose Your Tour
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-10 md:px-20">
                {data.map(({ image, title, description, id }) => (
                    <TourCard
                        image={image}
                        title={title}
                        description={description}
                        key={id}
                    />
                ))}
            </div>
        </div>
    );
};

export default SignleCategory;
