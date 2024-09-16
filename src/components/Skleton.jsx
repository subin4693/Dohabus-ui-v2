import React from "react";

const Skleton = ({ width, height }) => {
    return (
        <div role="status" className=" animate-pulse">
            <div
                className={`bg-gray-200   dark:bg-gray-700 rounded-md ${
                    width + " " + height
                }`}
            ></div>
        </div>
    );
};

export default Skleton;
