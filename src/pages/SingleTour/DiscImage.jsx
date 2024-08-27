import React from "react";
import discimage from "../../assets/locationPinforDisc-removebg-preview.png";

const DiscImage = () => {
	return (
		<div className="w-[50px] bg-custom-yellow absolute -left-[28px] h-[50px] border-[2px] border-custom-yellow rounded-full flex border justify-center items-center">
			<img src={discimage} className="w-[80px] h-[80px] object-cover" />
			{/*<div className="w-2 h-2 rounded-full bg-black"></div>*/}
		</div>
	);
};

export default DiscImage;
