import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const Checkout = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL; // Set your BASE_URL properly
  const { id } = useParams(); // Get plan ID from route parameter (e.g., /checkout/:id)
  const [searchParams] = useSearchParams(); // Extract query parameters
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
  const [pickupTime, setPickupTime] = useState("");

  const [totalAdultPrice, setTotalAdultPrice] = useState(0);
  const [totalChildPrice, setTotalChildPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [invoiceID, setInvoiceID] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAddons, setShowAddons] = useState([]);

  // New state for payment option: "qpay" (Debit Card) or "cybersource" (Credit Card)
  const [paymentOption, setPaymentOption] = useState("qpay");

  // Extract individual query parameters from URL
  const selectedDate = searchParams.get("date");
  const adultCount = Number(searchParams.get("adultCount") || 0);
  const childCount = Number(searchParams.get("childCount") || 0);
  const session = searchParams.get("session");
  const childData = searchParams.get("selectedChild");
  const adultData = searchParams.get("selectedAdult");
  const addons = searchParams.get("addOns") || "";
  console.log("Addons:", addons);

  // Discount coupon handler
  const checkOffer = async () => {
    if (!firstName.trim()) {
      toast.error("Please enter first name!");
      setLoading(false);
      return;
    }
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
    if (!number) {
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
      setLoading(false);
      return;
    }

    let requestData = {
      couponCode: coupon,
      planId: data._id,
      email,
    };

    if (childCount || adultCount || addons || selectedDate) {
      if (childCount) requestData.childCount = childCount;
      if (adultCount) requestData.adultCount = adultCount;
      if (addons) requestData.addons = addons.split(",");
      if (selectedDate) requestData.selectedDate = selectedDate;
    }

    try {
      setApplyLoader(true);
      const res = await axios.post(`${BASE_URL}/offers/apply-discount`, {
        requestData,
        user,
      });

      setDiscountedPrice(res?.data?.data?.discountedPrice);
      setTotalDiscountedAmount(res?.data?.data?.totalDiscountAmount);
    } catch (error) {
      console.log(error);
      if (
        error?.response?.data?.message?.includes("Coupon code can only be used")
      ) {
        toast.error(error?.response?.data?.message);
        setCoupon("");
      } else {
        toast.error("Coupon code is not valid");
      }
    } finally {
      setApplyLoader(false);
    }
  };

  // Ticket booking handler – updated to use QPay/Cybersource integration
  const handleTicketBooking = async () => {
    setLoading(true);
    if (data.minPerson > 0 && data.minPerson > adultCount + childCount) {
      setLoading(false);
      toast.error(
        `The minimum persons count should be ${
          data?.minPerson
        }. You have selected ${adultCount + childCount}.`
      );
      return;
    }
    if (!firstName.trim()) {
      toast.error("Please enter first name!");
      setLoading(false);
      return;
    }
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

    // Build the payload and include the paymentMethod chosen by the user.
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
      pickupTime,
      paymentMethod: paymentOption, // "qpay" for Debit Card, "cybersource" for Credit Card
    };

    if (childCount || adultCount) {
      if (adultCount) dataa.adultQuantity = adultCount;
      if (childCount) dataa.childQuantity = childCount;
      if (addons) dataa.addons = addons.split(",");
    }

    try {
      // POST booking data to our backend (tickets route)
      // Set responseType to 'text' so we receive the HTML returned by the backend.
      const res = await axios.post(
        `${BASE_URL}/tickets`,
        { dataa, user },
        { responseType: "text" }
      );
      console.log("Booking Response:", res.data);

      // Instead of building and submitting a form on the front end,
      // replace the document with the HTML returned from the backend.
      document.open();
      document.write(res.data);
      document.close();
      // No need to call toast or set loading false as the page is now being replaced.
    } catch (error) {
      setLoading(false);
      console.log("Booking error:", error);
      if (
        error?.response?.data?.message?.includes(
          "tickets are available for this session"
        )
      ) {
        toast.error(error?.response?.data?.message);
      } else if (
        error?.response?.data?.message?.includes("Coupon code can only be used")
      ) {
        toast.error(error?.response?.data?.message);
      } else if (
        error?.response?.data?.message?.includes("Coupon code is not valid")
      ) {
        toast.error("Coupon code is not valid");
      } else if (error?.response?.data?.message?.includes("The minimum ")) {
        toast.error(error?.response?.data?.message);
      } else if (
        error?.response?.data?.message?.includes(
          "Invalid or expired coupon code"
        )
      ) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Something went wrong. Please try again later");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch plan data on mount and when key parameters change
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/plans/${id}`);
        setData(res.data.data.plan);
        setFirstName(user?.name);
        console.log("Plan Data:", res.data.data.plan);
        setEmail(user?.email);
        setNumber(user?.number);
      } catch (error) {
        console.error("Error fetching plan data:", error);
      }
    };
    fetchData();
  }, [id, selectedDate, adultCount, childCount, BASE_URL]);

  // Calculate pricing details when data or selection changes
  useEffect(() => {
    let calculatedTotalAdultPrice = 0;
    let calculatedTotalChildPrice = 0;
    let addOnTotalPrice = 0;

    const normalizedSelectedDate = new Date(selectedDate);
    normalizedSelectedDate.setHours(0, 0, 0, 0);

    const currentPricingLimit = data?.pricingLimits?.find((limit) => {
      const startDate = new Date(limit.startDate);
      const endDate = new Date(limit.endDate);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);
      return (
        normalizedSelectedDate >= startDate && normalizedSelectedDate <= endDate
      );
    });

    console.log("Current Pricing Limit:", currentPricingLimit);
    const pricingSource = currentPricingLimit || data;

    // Calculate adult price based on count
    if (adultCount > 0) {
      if (pricingSource?.adultPrice) {
        calculatedTotalAdultPrice = pricingSource.adultPrice * adultCount;
      } else if (pricingSource?.adultData?.length > 0) {
        const sortedAdultData = pricingSource.adultData.sort(
          (a, b) => a.pax - b.pax
        );
        let foundAdultPrice = null;
        const nearestAdultPax = sortedAdultData
          .filter((adult) => adult.pax <= adultCount)
          .pop();
        console.log("Nearest Adult Data:", nearestAdultPax);
        if (nearestAdultPax) {
          foundAdultPrice = nearestAdultPax.price;
        } else {
          foundAdultPrice = sortedAdultData[0].price;
        }
        calculatedTotalAdultPrice = foundAdultPrice * adultCount;
      }
    }

    // Calculate child price based on count
    if (childCount > 0) {
      if (pricingSource?.childPrice) {
        calculatedTotalChildPrice = pricingSource.childPrice * childCount;
      } else if (pricingSource?.childData?.length > 0) {
        const sortedChildData = pricingSource.childData.sort(
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
        console.log("Found Child Price:", foundChildPrice);
        calculatedTotalChildPrice = foundChildPrice * childCount;
      }
    }

    // Calculate add-on prices if selected
    if (addons) {
      const selectedAddOns = addons.split(",");
      selectedAddOns.forEach((addOnEntry) => {
        const [addId, count] = addOnEntry.split(":");
        const matchingAddOn = data?.addOn?.find((addOn) => addOn._id === addId);
        if (matchingAddOn) {
          const addOnCount = parseInt(count, 10) || 1;
          const totalAddOnPrice = matchingAddOn.price * addOnCount;
          setShowAddons((prev) => [
            ...prev,
            {
              ...matchingAddOn,
              price: totalAddOnPrice,
              count: addOnCount,
            },
          ]);
          addOnTotalPrice += totalAddOnPrice;
        }
      });
    }

    setTotalAdultPrice(calculatedTotalAdultPrice);
    setTotalChildPrice(calculatedTotalChildPrice);
    setTotalPrice(
      calculatedTotalAdultPrice + calculatedTotalChildPrice + addOnTotalPrice
    );
  }, [data, adultCount, childCount, selectedDate, addons]);

  return (
    <div className="md:container mx-auto px-4 py-8 md:flex md:gap-8 mt-20">
      {/* Left side: Input form */}
      <div className="checkout-form w-full md:w-3/4 p-8 border border-gray-300 rounded-lg h-fit">
        {user?.role == undefined && (
          <h1 className="text-center text-3xl font-bold mb-5">
            Continue as a Guest
          </h1>
        )}
        <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
        <div className="flex justify-between items-center gap-5">
          <div className="mb-4 flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-3 py-2 bg-gray-100 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-custom-yellow"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone number
          </label>
          <PhoneInput
            value={number}
            onChange={setNumber}
            placeholder="Enter your mobile number"
            className="w-full px-3 py-2 bg-gray-100 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-custom-yellow"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email (Please make sure you enter a valid email address)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3 py-2 bg-gray-100 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-custom-yellow"
          />
        </div>
        {data?.isPickupRequired && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pick-up Location
            </label>
            <input
              type="text"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              placeholder="Enter pick-up location"
              className="w-full px-3 py-2 bg-gray-100 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-custom-yellow"
            />
          </div>
        )}
        {data?.isDropOffRequired && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Drop-off Location
            </label>
            <input
              type="text"
              value={dropLocation}
              onChange={(e) => setDropLocation(e.target.value)}
              placeholder="Enter drop-off location"
              className="w-full px-3 py-2 bg-gray-100 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-custom-yellow"
            />
          </div>
        )}

        {/* Payment Option Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Option
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentOption"
                value="qpay"
                checked={paymentOption === "qpay"}
                onChange={(e) => setPaymentOption(e.target.value)}
                className="mr-2"
              />
              Debit Card
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentOption"
                value="cybersource"
                checked={paymentOption === "cybersource"}
                onChange={(e) => setPaymentOption(e.target.value)}
                className="mr-2"
              />
              Credit Card
            </label>
          </div>
        </div>
      </div>

      {/* Right side: Plan details */}
      <div className="w-full md:w-1/4 bg-white p-4 space-y-5 h-fit rounded-lg border">
        <h2 className="text-xl font-semibold">Plan Details</h2>
        {data.coverImage && (
          <img
            src={data.coverImage}
            alt="Plan Cover"
            className="w-full h-[150px] mb-4 rounded-lg"
          />
        )}
        <p className="text-lg font-medium mb-2">
          {data?.title && data?.title[lang]}
        </p>
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
                coupon ? "hover:bg-blue-600" : "bg-blue-300 cursor-not-allowed"
              }`}
              disabled={!coupon}
              onClick={checkOffer}
            >
              {applyLoader ? (
                <div className="px-2">
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
              {data?.adultData?.map(
                (adult) =>
                  adult._id === adultData && (
                    <div className="flex justify-between mb-2" key={adult._id}>
                      <span>Adult Price x {adult?.pax}</span>
                      <span>{adult.price} Qar</span>
                    </div>
                  )
              )}
              {data?.childData?.map(
                (child) =>
                  child._id === childData && (
                    <div className="flex justify-between mb-2" key={child._id}>
                      <span>Child Price x {child?.pax}</span>
                      <span>{child.price} Qar</span>
                    </div>
                  )
              )}
            </>
          ) : (
            <>
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
          {showAddons.map((addon, index) => (
            <div className="flex justify-between mb-2" key={index}>
              <span>
                {addon[lang]} x {addon?.count}
              </span>
              <span>{addon.price} Qar</span>
            </div>
          ))}
          {totalDiscountedAmount && (
            <div className="flex justify-between mt-2">
              <span className="font-bold text-green-600">Discounted Price</span>
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
                className={`${discountedPrice && "text-red-500 line-through"}`}
              >
                {totalPrice} Qar
              </span>
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
              className="py-2 w-full h-auto bg-custom-yellow duration-300 mt-4 rounded-md"
              onClick={handleTicketBooking}
            >
              {loading ? (
                <div>
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
