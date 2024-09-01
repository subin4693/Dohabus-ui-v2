import React from "react";
import Banner from "../../components/Banner";
// import banner from "../../assets/hotel-banner.jpg";
import { useSelector } from "react-redux";
import banner from "../../assets/tourtop.jpg";
const Blogs = () => {
    const lang = useSelector((state) => state.language.lang);
    return (
        <div>
            {" "}
            <Banner
                image={banner}
                title={lang === "en" ? "Blogs" : "الفنادق"}
                subTitle={lang === "en" ? "Home | Blogs" : "الرئيسية | الفنادق"}
            />
            <div>
                <div></div>
                <div>{/* sidebar here */}</div>
            </div>
        </div>
    );
};

export default Blogs;
