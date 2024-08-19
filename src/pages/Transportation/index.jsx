import React from "react";
import bannerImg from "../../assets/transport.jpg";
import Banner from "../../components/Banner";
const Transportation = () => {
    return (
        <div>
            <Banner
                image={bannerImg}
                title={"TRANSPORTATION FLEET"}
                subTitle={"Home | TRANSPORTATION FLEET"}
            />
        </div>
    );
};

export default Transportation;
