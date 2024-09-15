import React from "react";

const Disc = () => {
	return (
		<div className="group-hover:scale-110 transition-transform duration-300 ease-in-out w-[50px] bg-white absolute -left-[28px] h-[50px] border-[2px] border-black rounded-full flex border justify-center items-center">
			<div className="w-2 h-2 rounded-full bg-black group-hover:scale-110 -x-6 transition-transform duration-300 ease-in-out"></div>
		</div>
	);
};

export default Disc;
