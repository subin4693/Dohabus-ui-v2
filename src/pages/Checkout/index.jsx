import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom"; // Import necessary hooks
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Checkout = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly
    const { id } = useParams(); // Get the route parameter (e.g., checkout/:id)
    const [searchParams] = useSearchParams(); // Get the search/query parameters

    const [data, setData] = useState({});
    const lang = useSelector((state) => state.language.lang);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [pickupLocation, setPickupLocation] = useState("");
    const [dropLocation, setDropLocation] = useState("");
    const [discountedPrice, setDiscountedPrice] = useState(null);
    const [totalDiscountedAmount, setTotalDiscountedAmount] = useState(null);

    const [coupon, setCoupon] = useState("");
    // Extract individual query parameters
    const selectedDate = searchParams.get("date");
    const adultCount = Number(searchParams.get("adultCount") || 0);
    const childCount = Number(searchParams.get("childCount") || 0);
    const session = searchParams.get("session");

    const checkOffer = async () => {
        if (!coupon) {
            toast.error("Coupon is missing");
            return;
        }
        if (!data._id) {
            toast.error("Plan ID is missing");
            return;
        }
        if (!childCount && !adultCount) {
            toast.error("Person count is missing");
            return;
        }

        try {
            const res = await axios.post(
                `${BASE_URL}/offers/apply-discount`,
                {
                    couponCode: coupon,
                    planId: data._id,
                    childCount,
                    adultCount,
                },
                { withCredentials: true },
            );

            setDiscountedPrice(res.data.data.discountedPrice);
            setTotalDiscountedAmount(res.data.data.totalDiscountAmount);
        } catch (error) {
            console.log(error);
            toast.error("Coupon code is not valid");
            return;
        }
    };

    const handleTicketBooking = async () => {
        if (!firstName.trim()) {
            toast.error("Please enter first name!");
            return;
        }
        if (!lastName.trim()) {
            toast.error("Please enter last name!");
            return;
        }
        if (!email.trim()) {
            toast.error("Please enter email!");
            return;
        }
        // if (!pickupLocation.trim()) {
        //     toast.error("Please enter pickup location!");
        //     return;
        // }
        // if (!dropLocation.trim()) {
        //     toast.error("Please enter drop location!");
        //     return;
        // }
        if (!selectedDate) {
            toast.error("Please select a date!");
            return;
        }
        if (!adultCount && !childCount) {
            toast.error("Please select at least one ticket!");
            return;
        }
        if (!session.trim()) {
            toast.error("Please select a session!");
            return;
        }
        if (!data.category) {
            toast.error("Category is missing!");
            return;
        }
        if (!data._id) {
            toast.error("Plan ID is missing!");
            return;
        }
        try {
            const res = await axios.post(
                BASE_URL + "/tickets",
                {
                    firstName,
                    lastName,
                    email,
                    pickupLocation,
                    dropLocation,
                    coupon,
                    date: selectedDate,
                    adultQuantity: adultCount,
                    childQuantity: childCount,
                    session: session,
                    category: data.category,
                    plan: data._id,
                },
                { withCredentials: true },
            );
            toast.success("Ticket booked successfully");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong. Please try again later");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/plans/${id}`);

                setData(res.data.data.plan);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id, selectedDate, adultCount, childCount, BASE_URL]); // Add dependencies
    const totalAdultPrice = data.adultPrice ? data.adultPrice * adultCount : 0;
    const totalChildPrice = data.childPrice ? data.childPrice * childCount : 0;
    const totalPrice = totalAdultPrice + totalChildPrice;

    return (
        <div className="md:container mx-auto px-4 py-8 md:flex md:gap-8 mt-20">
            {/* Left side: Input form */}
            <div className="checkout-form w-full md:w-3/4  p-8 border border-gray-300 rounded-lg h-fit">
                <h2 className="text-xl font-semibold mb-4">
                    Customer Information
                </h2>
                <div className="flex justify-between items-center gap-5">
                    <div className="mb-4 flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name
                        </label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Enter your first name"
                            className="w-full px-3 py-2 bg-gray-100 border-none outline-none rounded-md focus:outline-none focus:ring-2 focus:ring-custom-yellow"
                        />
                    </div>
                    <div className="mb-4 flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name
                        </label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Enter your last name"
                            className="w-full px-3 py-2 bg-gray-100 border-none outline-none rounded-md focus:outline-none focus:ring-2 focus:ring-custom-yellow"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 bg-gray-100 border-none outline-none rounded-md focus:outline-none focus:ring-2 focus:ring-custom-yellow"
                    />
                </div>
                {console.log(data)}
                {data?.isDropOffRequired && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Pick-up Location
                        </label>
                        <input
                            type="text"
                            value={pickupLocation}
                            onChange={(e) => setPickupLocation(e.target.value)}
                            placeholder="Enter pick-up location"
                            className="w-full px-3 py-2 bg-gray-100 border-none outline-none rounded-md focus:outline-none focus:ring-2 focus:ring-custom-yellow"
                        />
                    </div>
                )}
                {data?.isPickupRequired && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Drop-off Location
                        </label>
                        <input
                            type="text"
                            value={dropLocation}
                            onChange={(e) => setDropLocation(e.target.value)}
                            placeholder="Enter drop-off location"
                            className="w-full px-3 py-2 bg-gray-100 border-none outline-none rounded-md focus:outline-none focus:ring-2 focus:ring-custom-yellow"
                        />
                    </div>
                )}
            </div>

            {/* Right side: Plan details */}
            <div className="w-full md:w-1/4 bg-white p-4 space-y-8 h-fit rounded-lg border">
                <h2 className="text-xl font-semibold ">Plan Details</h2>
                {data.coverImage && (
                    <img
                        src={data.coverImage}
                        alt="Plan Cover"
                        className="w-full h-auto mb-4 rounded-lg"
                    />
                )}
                <p className="text-lg font-medium mb-2">
                    {data && data.title && data?.title[lang]}
                </p>{" "}
                <div className="flex flex-col mb-4">
                    <div className="flex justify-between mb-2">
                        <span className="font-medium">Selected Date:</span>
                        <span>{selectedDate.split("T")[0]}</span>
                    </div>

                    <div className="flex justify-between mb-2">
                        <span className="font-medium">Session:</span>
                        <span>{session}</span>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discount Coupon
                    </label>
                    <div className="flex px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <input
                            type="text"
                            placeholder="Enter discount coupon"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                            className="w-full border-none outline-none bg-white"
                        />

                        <button
                            className={`bg-blue-500 text-white px-4 py-2 ml-2 rounded-md transition duration-300 ${
                                coupon
                                    ? "hover:bg-blue-600"
                                    : "bg-blue-300 cursor-not-allowed"
                            }`}
                            disabled={!coupon}
                            onClick={checkOffer}
                        >
                            Apply
                        </button>
                    </div>
                </div>
                <div className="flex flex-col p-4 border border-gray-300 rounded-md">
                    <div className="flex justify-between mb-2">
                        <span>Adult Price x {adultCount}</span>
                        <span>${totalAdultPrice}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Child Price x {childCount}</span>
                        <span>${totalChildPrice}</span>
                    </div>
                    {discountedPrice && (
                        <div className="flex justify-between mt-4">
                            <span className="font-semibold text-red-500">
                                Total Discount Amount
                            </span>
                            <span className="font-semibold text-red-500">
                                ${discountedPrice}
                            </span>
                        </div>
                    )}
                    {totalDiscountedAmount && (
                        <div className="flex justify-between mt-2">
                            <span className="font-bold text-green-600">
                                Discounted Price
                            </span>
                            <span className="font-bold text-green-600">
                                ${totalDiscountedAmount}
                            </span>
                        </div>
                    )}
                    <hr className="my-4" />

                    <div className="flex justify-between items-center font-bold text-lg">
                        <span>Total</span>
                        <div>
                            <span
                                className={`${discountedPrice && "text-red-500 line-through"}`}
                            >
                                ${totalPrice}
                            </span>{" "}
                            &nbsp;&nbsp;
                            {totalDiscountedAmount && (
                                <span className="font-bold text-green-600">
                                    ${totalDiscountedAmount}
                                </span>
                            )}
                        </div>
                    </div>
                    <button
                        className="py-2 w-full bg-custom-yellow duration-300 hover:bg-dark hover:text-white mt-4 rounded-md"
                        onClick={handleTicketBooking}
                    >
                        Complete booking
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
