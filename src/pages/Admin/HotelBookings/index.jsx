import React, { useState, useEffect } from "react";
import axios from "axios";

const HotelBookings = () => {
	const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly

	const [hotelBookings, setHotelBookings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getData = async () => {
			try {
				const res = await axios.get(`${BASE_URL}/hotels/bookings`);
				setHotelBookings(res.data.data.hotelBookings); // Adjust according to your response structure
			} catch (error) {
				setError("Something went wrong");
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		getData();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Hotel Bookings</h1>
			<table className="min-w-full bg-white border border-gray-300">
				<thead>
					<tr>
						<th className="border-b px-4 py-2">Booking ID</th>
						<th className="border-b px-4 py-2">Hotel Name</th>
						<th className="border-b px-4 py-2">User Name</th>
						<th className="border-b px-4 py-2">Check-in Date</th>
						<th className="border-b px-4 py-2">Check-out Date</th>
						<th className="border-b px-4 py-2">Number of Adults</th>
						<th className="border-b px-4 py-2">
							Number of Children
						</th>
						<th className="border-b px-4 py-2">Meal Plan</th>
						<th className="border-b px-4 py-2">
							Airport Transfers
						</th>
					</tr>
				</thead>
				<tbody>
					{hotelBookings.length > 0 ? (
						hotelBookings.map((booking) => (
							<tr key={booking._id}>
								<td className="border-b px-4 py-2">
									{booking._id}
								</td>
								<td className="border-b px-4 py-2">
									{booking.hotelId.title.en}
								</td>
								<td className="border-b px-4 py-2">
									{booking.userId.name}
								</td>
								<td className="border-b px-4 py-2">
									{booking.checkInDate}
								</td>
								<td className="border-b px-4 py-2">
									{booking.checkOutDate}
								</td>
								<td className="border-b px-4 py-2">
									{booking.numberOfAdults}
								</td>
								<td className="border-b px-4 py-2">
									{booking.numberOfChildren}
								</td>
								<td className="border-b px-4 py-2">
									{booking.mealPlan}
								</td>
								<td className="border-b px-4 py-2">
									{booking.airportTransfers}
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="9" className="text-center py-4">
								No bookings found
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default HotelBookings;
