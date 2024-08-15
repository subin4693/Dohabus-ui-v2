import React from "react";
import Banner from "../../components/Banner";
// import tourtop from "../../assets/tourtop.jpeg";
import tourtop from "../../assets/tourtop.jpg";
const Tours = () => {
    return (
        <div className="h-[200vh] ">
            <Banner image={tourtop} title={"Tour"} subTitle={"Home | Tours"} />
        </div>
    );
};

export default Tours;
