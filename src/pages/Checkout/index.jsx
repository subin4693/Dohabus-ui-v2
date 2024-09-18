import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Link,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom"; // Import necessary hooks
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Checkout = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly
    const { id } = useParams(); // Get the route parameter (e.g., checkout/:id)
    const [searchParams] = useSearchParams(); // Get the search/query parameters
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const lang = useSelector((state) => state.language.lang);
    const user = useSelector((state) => state.user.user);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [pickupLocation, setPickupLocation] = useState("");
    const [dropLocation, setDropLocation] = useState("");
    const [discountedPrice, setDiscountedPrice] = useState(null);
    const [totalDiscountedAmount, setTotalDiscountedAmount] = useState(null);
    const [applyLoader, setApplyLoader] = useState(false);
    const [coupon, setCoupon] = useState("");

    const [totalAdultPrice, setTotalAdultPrice] = useState(0);
    const [totalChildPrice, setTotalChildPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [invoiceID, setinvoiceID] = useState("");
    const [loading, setLoading] = useState(false);
    const [showAddons, setShowAddons] = useState([]);

    // Extract individual query parameters
    const selectedDate = searchParams.get("date");
    const adultCount = Number(searchParams.get("adultCount") || 0);
    const childCount = Number(searchParams.get("childCount") || 0);
    const session = searchParams.get("session");
    const childData = searchParams.get("selectedChild");
    const adultData = searchParams.get("selectedAdult");
    const addons = searchParams.get("addOns") || "";
    console.log("Uuu *** ");
    console.log(user);
    const checkOffer = async () => {
        if (!firstName.trim()) {
            toast.error("Please enter first name!");
            setLoading(false);
            return;
        }
        // if (!lastName.trim()) {
        //   toast.error("Please enter last name!");
        //   setLoading(false);
        //   return;
        // }
        if (!email.trim()) {
            toast.error("Please enter email!");
            setLoading(false);
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address!");
            setLoading(false);
            return;
        }
        if (!number?.trim()) {
            toast.error("Please enter a valid mobile number!");
            setLoading(false);
            return;
        }
        if (!coupon) {
            toast.error("Coupon is missing");
            return;
        }
        if (!data._id) {
            toast.error("Plan ID is missing");
            return;
        }
        // if ((!childCount && !adultCount) || (!adultData && !childData)) {
        //     toast.error("Person count is missing");
        //     return;
        // }
        let requestData = {
            couponCode: coupon,
            planId: data._id,
            email,
        };

        if (childCount || adultCount || addons) {
            if (childCount) requestData.childCount = childCount;
            if (adultCount) requestData.adultCount = adultCount;
            if (addons) requestData.addons = addons.split(",");
        }
        // else {
        //     if (childData) requestData.childData = childData;
        //     if (adultData) requestData.adultData = adultData;
        // }

        try {
            setApplyLoader(true);
            const res = await axios.post(`${BASE_URL}/offers/apply-discount`, {
                requestData,
                user,
            });
            console.log(res);

            setDiscountedPrice(res?.data?.data?.discountedPrice);
            setTotalDiscountedAmount(res?.data?.data?.totalDiscountAmount);
        } catch (error) {
            console.log(error);
            if (
                error?.response?.data?.message?.includes(
                    "Coupon code can only be used"
                )
            ) {
                toast.error(error?.response?.data?.message);
                setCoupon("");
            } else toast.error("Coupon code is not valid");
        } finally {
            setApplyLoader(false);
        }
    };

    const handleTicketBooking = async () => {
        setLoading(true);

        if (!firstName.trim()) {
            toast.error("Please enter first name!");
            setLoading(false);
            return;
        }
        // if (!lastName.trim()) {
        //   toast.error("Please enter last name!");
        //   setLoading(false);
        //   return;
        // }
        if (!email.trim()) {
            toast.error("Please enter email!");
            setLoading(false);
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address!");
            setLoading(false);
            return;
        }
        if (!number.trim) {
            toast.error("Please enter a valid mobile number!");
            setLoading(false);
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
            setLoading(false);
            return;
        }
        if (!adultCount && !childCount) {
            toast.error("Please select at least one ticket!");
            setLoading(false);
            return;
        }
        if (!session.trim()) {
            toast.error("Please select a session!");
            setLoading(false);
            return;
        }
        if (!data.category) {
            toast.error("Category is missing!");
            setLoading(false);
            return;
        }
        if (!data._id) {
            toast.error("Plan ID is missing!");
            setLoading(false);
            return;
        }

        // const childData = searchParams.get("selectedChild");
        // const adultData = searchParams.get("selectedAdult");

        let dataa = {
            firstName,
            lastName,
            email,
            pickupLocation,
            dropLocation,
            coupon,
            date: selectedDate,
            session: session,
            category: data.category,
            plan: data._id,
            number,
        };

        if (childCount || adultCount) {
            if (adultCount) dataa.adultQuantity = adultCount;
            if (childCount) dataa.childQuantity = childCount;
            if (addons) dataa.addons = addons?.split(",");
        }
        // else if (adultData || childData) {
        //     if (adultData) dataa.adultData = adultData;
        //     if (childData) dataa.childData = childData;
        // }

        try {
            const res = await axios.post(BASE_URL + "/tickets", {
                dataa,
                user,
            });
            setinvoiceID(res.data.data.bookedTickets._id);

            toast.success(
                "Your ticket has been successfully booked. You can now download your invoice"
            );
            setLoading(false);
            navigate(`/invoice/${res.data.data.bookedTickets._id}`);
        } catch (error) {
            setLoading(false);
            console.log(error);
            if (
                error?.response?.data?.message?.includes(
                    "tickets are available for this session"
                )
            ) {
                return toast.error(error?.response?.data?.message);
            } else if (
                error?.response?.data?.message?.includes(
                    "Coupon code can only be used"
                )
            ) {
                toast.error(error?.response?.data?.message);
            } else toast.error("Coupon code is not valid");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/plans/${id}`);

                setData(res.data.data.plan);
                setFirstName(user?.name);

                setEmail(user?.email);
                setNumber(user?.number);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id, selectedDate, adultCount, childCount, BASE_URL]);

    useEffect(() => {
        let calculatedTotalAdultPrice = 0;
        let calculatedTotalChildPrice = 0;
        let addOnTotalPrice = 0;

        if (adultCount > 0) {
            if (data?.adultPrice) {
                calculatedTotalAdultPrice = data?.adultPrice * adultCount;
            } else if (data?.adultData?.length > 0) {
                const sortedAdultData = data.adultData.sort(
                    (a, b) => a.pax - b.pax
                );
                let foundAdultPrice = null;

                const nearestAdultPax = sortedAdultData
                    .filter((adult) => adult.pax <= adultCount)
                    .pop();

                if (nearestAdultPax) {
                    foundAdultPrice = nearestAdultPax.price;
                } else {
                    foundAdultPrice = sortedAdultData[0].price;
                }

                calculatedTotalAdultPrice = foundAdultPrice * adultCount;
            }
        }

        if (childCount > 0) {
            if (data?.childPrice) {
                calculatedTotalChildPrice = data?.childPrice * childCount;
            } else if (data?.childData?.length > 0) {
                const sortedChildData = data.childData.sort(
                    (a, b) => a.pax - b.pax
                );
                let foundChildPrice = null;

                const nearestChildPax = sortedChildData
                    .filter((child) => child.pax <= childCount)
                    .pop();

                if (nearestChildPax) {
                    foundChildPrice = nearestChildPax.price;
                } else {
                    foundChildPrice = sortedChildData[0].price;
                }

                calculatedTotalChildPrice = foundChildPrice * childCount;
            }
        }

        if (addons) {
            const selectedAddOns = addons.split(","); // Array of add-on IDs

            // Loop through add-on IDs and find matches in data.addOn
            selectedAddOns.forEach((addOnId) => {
                const matchingAddOn = data?.addOn?.find(
                    (addOn) => addOn._id === addOnId
                );
                if (matchingAddOn) {
                    setShowAddons((prev) => [...prev, matchingAddOn]);
                    addOnTotalPrice += matchingAddOn.price;
                }
            });

            // Multiply the add-on total by the adultCount and childCount
            addOnTotalPrice = addOnTotalPrice * (adultCount + childCount);
        }

        // Set total prices
        setTotalAdultPrice(calculatedTotalAdultPrice);
        setTotalChildPrice(calculatedTotalChildPrice);

        // Set final total price including add-ons
        setTotalPrice(
            calculatedTotalAdultPrice +
                calculatedTotalChildPrice +
                addOnTotalPrice
        );
        // setTotalAdultPrice(calculatedTotalAdultPrice);
        // setTotalChildPrice(calculatedTotalChildPrice);
        // setTotalPrice(calculatedTotalAdultPrice + calculatedTotalChildPrice);
    }, [data, adultCount, childCount]);
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
                    {/* <div className="mb-4 flex-1">
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
          </div> */}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone number
                    </label>
                    <input
                        type="email"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="Enter your mobile number"
                        className="w-full px-3 py-2 bg-gray-100 border-none outline-none rounded-md focus:outline-none focus:ring-2 focus:ring-custom-yellow"
                    />
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
                        className="w-full max-h-[200px] mb-4 rounded-lg"
                    />
                )}
                <p className="text-lg font-medium mb-2">
                    {data && data.title && data?.title[lang]}
                </p>{" "}
                <div className="flex flex-col mb-4">
                    <div className="flex justify-between mb-2">
                        <span className="font-medium">Selected Date:</span>
                        <span>{selectedDate?.split("T")[0]}</span>
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
                            {applyLoader ? (
                                <div className=" px-2">
                                    <Loader w={20} h={20} b={5} />
                                </div>
                            ) : (
                                " Apply"
                            )}
                        </button>
                    </div>
                </div>
                <div className="flex flex-col p-4 border border-gray-300 rounded-md">
                    {adultData || childData ? (
                        <>
                            {data?.adultData?.map((adult, index) => (
                                <>
                                    {/* Match adult data with data.adultData[index]._id and replace adultCount with pax */}
                                    {adult._id === adultData && (
                                        <div
                                            className="flex justify-between mb-2"
                                            key={adult._id}
                                        >
                                            <span>
                                                {console.log()}
                                                Adult Price x {adult?.pax}
                                            </span>{" "}
                                            {/* Replace with pax */}
                                            <span>{adult.price} Qar</span>{" "}
                                            {/* Calculate total price */}
                                        </div>
                                    )}
                                </>
                            ))}

                            {data?.childData?.map((child, index) => (
                                <>
                                    {/* Match child data with data.childData[index]._id and replace childCount with pax */}
                                    {child._id === childData && (
                                        <div
                                            className="flex justify-between mb-2"
                                            key={child._id}
                                        >
                                            <span>
                                                Child Price x {child?.pax}
                                            </span>{" "}
                                            {/* Replace with pax */}
                                            <span> {child.price} Qar</span>{" "}
                                            {/* Calculate total price */}
                                        </div>
                                    )}
                                </>
                            ))}
                        </>
                    ) : (
                        <>
                            {" "}
                            <div className="flex justify-between mb-2">
                                <span>Adult Price x {adultCount}</span>
                                <span>{totalAdultPrice} Qar</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Child Price x {childCount}</span>
                                <span>{totalChildPrice} Qar</span>
                            </div>
                        </>
                    )}

                    <>
                        {showAddons.map((addon) => (
                            <div className="flex justify-between mb-2">
                                <span>
                                    {addon[lang]} x {adultCount + childCount}
                                </span>
                                <span>
                                    {addon.price * (adultCount + childCount)}{" "}
                                    Qar
                                </span>
                            </div>
                        ))}
                    </>
                    {/* {discountedPrice && (
                        <div className="flex justify-between mt-4">
                            <span className="font-semibold text-red-500">
                                Total Discount Amount
                            </span>
                            <span className="font-semibold text-red-500">
                                {discountedPrice} Qar
                            </span>
                        </div>
                    )}*/}
                    {totalDiscountedAmount && (
                        <div className="flex justify-between mt-2">
                            <span className="font-bold text-green-600">
                                Discounted Price
                            </span>
                            <span className="font-bold text-green-600">
                                {totalDiscountedAmount} Qar
                            </span>
                        </div>
                    )}
                    <hr className="my-4" />

                    <div className="flex justify-between items-center font-bold text-lg">
                        <span>Total</span>
                        <div>
                            <span
                                className={`${
                                    discountedPrice &&
                                    "text-red-500 line-through"
                                }`}
                            >
                                {totalPrice} Qar
                            </span>{" "}
                            &nbsp;&nbsp;
                            {discountedPrice && (
                                <span className="font-bold text-green-600">
                                    {discountedPrice} Qar
                                </span>
                            )}
                        </div>
                    </div>
                    {!invoiceID ? (
                        <button
                            className="py-2 w-full bg-custom-yellow duration-300 mt-4 rounded-md"
                            onClick={handleTicketBooking}
                        >
                            {loading ? (
                                <div className="">
                                    <Loader w={20} h={20} b={5} />
                                </div>
                            ) : (
                                "Complete booking"
                            )}
                        </button>
                    ) : (
                        <Link to={`/invoice/${invoiceID}`}>
                            <button className="py-2 w-full bg-blue-500 duration-300 text-white mt-4 rounded-md">
                                Get Invoice
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Checkout;
