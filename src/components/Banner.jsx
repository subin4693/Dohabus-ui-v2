import React from "react";

const Banner = ({ image, title, subTitle }) => {
    console.log(image);
    return (
        <div>
            <img src={image} />
            {image}
            {title}
            {subTitle}
        </div>
    );
};

export default Banner;
