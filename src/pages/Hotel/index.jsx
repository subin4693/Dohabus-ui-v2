import React from "react";
import Banner from "../../components/Banner";
import Card from "./Card";
import banner from "../../assets/hotel-banner.jpg";
import hotel1 from "../../assets/hotel1.jpg";

const Hotel = () => {
    const tempHotels = [
        {
            _id: "231",
            image: hotel1,
            title: "Grand Hyatt Doha Hotel & Villas ",
            description:
                "A luxurious five-star hotel with plush villas is located within the scenic shoreline of West Bay Lagoon, spanning more than 150,000 square metres showcasing a mélange of magnificent Arab architecture, lush gardens, multiple swimming pools and a 400-metre private beach. ",
        },
        {
            _id: "2t31",
            image: hotel1,
            title: "Grand Hyatt Doha Hotel & Villas ",
            description:
                "A luxurious five-star hotel with plush villas is located within the scenic shoreline of West Bay Lagoon, spanning more than 150,000 square metres showcasing a mélange of magnificent Arab architecture, lush gardens, multiple swimming pools and a 400-metre private beach. ",
        },
        {
            _id: "2w31",
            image: hotel1,
            title: "Grand Hyatt Doha Hotel & Villas ",
            description:
                "A luxurious five-star hotel with plush villas is located within the scenic shoreline of West Bay Lagoon, spanning more than 150,000 square metres showcasing a mélange of magnificent Arab architecture, lush gardens, multiple swimming pools and a 400-metre private beach. ",
        },
        {
            _id: "23d1",
            image: hotel1,
            title: "Grand Hyatt Doha Hotel & Villas ",
            description:
                "A luxurious five-star hotel with plush villas is located within the scenic shoreline of West Bay Lagoon, spanning more than 150,000 square metres showcasing a mélange of magnificent Arab architecture, lush gardens, multiple swimming pools and a 400-metre private beach. ",
        },
    ];
    return (
        <div>
            <Banner
                image={banner}
                title={"Hotels"}
                subTitle={"Home | Hotels"}
            />
            <div className="px-1 md:px-10 xl:w-[70%] mx-auto my-10">
                <div className="grid grid-cols-1 gap-y-20 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {tempHotels.map((hotel) => (
                        <Card
                            image={hotel.image}
                            title={hotel.title}
                            desc={hotel.description}
                            key={hotel._id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hotel;
