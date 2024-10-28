import React, { useState } from "react";

// Component for single price inputs
const SinglePriceComponentForPriceLimiting = ({
	adultPrice,
	setAdultPrice,
	childPrice,
	setChildPrice,
}) => (
	<div className="flex space-x-4">
		<div>
			<label htmlFor="adultPrice" className="block mb-2">
				Adult Price{" "}
			</label>
			<input
				type="number"
				id="adultPrice"
				value={adultPrice}
				onChange={(e) => setAdultPrice(e.target.value)}
				className="p-2 border rounded-md w-full"
			/>
		</div>
	 

		<div>
			<label htmlFor="childPrice" className="block mb-2">
				Child Price{" "}
			</label>
			<input
				type="number"
				id="childPrice"
				value={childPrice}
				onChange={(e) => setChildPrice(e.target.value)}
				className="p-2 border rounded-md w-full"
			/>
		</div>
	</div>
);

export default SinglePriceComponentForPriceLimiting;