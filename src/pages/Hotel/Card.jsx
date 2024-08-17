import React from "react";
import { Link } from "react-router-dom";

const Card = ({ image, title, desc }) => {
	return (
		<div className="hover:shadow-2xl border border-gray-lite duration-500">
			<div className=" h-[250px]">
				<img src={image} className="object-cover w-full h-full" />
			</div>
			<div className="p-5 space-y-3">
				<h2 className="text-lg font-bold md: text-xl  text-gray">
					{title}
				</h2>
				<p className="text-sm  text-gray text-justify leading-6">
					{desc}{" "}
				</p>

				<Link
					to="/contact"
					className="text-2xl text-custom-yellow text-center block mt-4   underline"
				>
					Book now
				</Link>
			</div>
		</div>
	);
};

export default Card;
