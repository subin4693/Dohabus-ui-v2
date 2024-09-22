import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/log.png";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { setUser } from "../features/Auth/userSlice";
import { toast } from "react-toastify";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaPlus, FaMinus } from "react-icons/fa";
import { IoSearch, IoClose } from "react-icons/io5";

import { BiCart } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../features/language/languageSlice";
import { setOffer as setOfferState } from "../features/offerBanner/offerSlice";
const Navbar = ({ sidebarOpen, setSidebarOpen, isVisible, setIsVisible }) => {
    const lang = useSelector((state) => state.language.lang);
    const { user } = useSelector((state) => state.user);
    const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly
    const [categorys, setCategorys] = useState([]);

    let cartItemCount = 3;
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const [tourOpen, setTourOpen] = useState(false);
    const [servicesOpen, setservicesOpen] = useState(false);
    const inputref = useRef(null);
    const [expandedCategory, setExpandedCategory] = useState([]);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [isEnglish, setIsEnglish] = useState(lang == "en" ? true : false);
    const [offer, setOffer] = useState([]);
    const [randomOffer, setRandomOffer] = useState(null);
    const [search, setSearch] = useState("");

    const [filteredTours, setFilteredTours] = useState([]);
    const dispatch = useDispatch();
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);

        // Filter tours based on query
        if (value) {
            const filtered = categorys.filter(
                (category) =>
                    category.text.en
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    category.tours.some((tour) =>
                        tour.text.en.toLowerCase().includes(value.toLowerCase())
                    )
            );
            setFilteredTours(filtered);
        } else {
            setFilteredTours([]);
        }
    };

    const handleNavigate = (categoryId, tourId = null) => {
        if (tourId) {
            // Navigate to tours/category._id/tour._id
            navigate(`/tours/${categoryId}/${tourId}`);
        } else {
            // Navigate to /category._id
            navigate(`/tours/${categoryId}`);
        }
        setSearchOpen(false);
    };
    const toggleLanguage = () => {
        setIsEnglish((prev) => {
            const newLanguage = prev ? "ar" : "en"; // Determine the new language
            dispatch(setLanguage(newLanguage)); // Update the Redux state with the new language
            localStorage.setItem("language", newLanguage); // Save the new language to localStorage
            return !prev; // Toggle the language state
        });
    };
    const handleToggleCategory = (index) => {
        setExpandedCategory((prev) => {
            let arr = [...prev];
            if (prev.includes(index)) {
                let ind = prev.indexOf(index);

                arr.splice(ind, 1);
                return arr;
            } else {
                arr.push(index);
            }
            return arr;
        });
    };
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setOffer([]);
        dispatch(setOfferState(false));
    };

    const handleSignOut = async () => {
        try {
            // const res = await axios.post(
            //     BASE_URL + "/users/signout",
            //     {}

            dispatch(setUser({}));
            // );
            navigate("/");
            toast.success("Logout succesfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await axios.get(BASE_URL + "/categorys/cat-tour");

                // setAlbum(data?.data?.images);

                setCategorys(data?.data?.data?.category);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await axios.get(
                    BASE_URL + "/offerbanner/getactive"
                );

                setOffer(data.data);
                if (data.data.length > 0) dispatch(setOfferState(true));
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    useEffect(() => {
        if (offer.length > 0) {
            // Select a random offer from the offer array
            const randomIndex = Math.floor(Math.random() * offer.length);
            setRandomOffer(offer[randomIndex]);
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [offer]);

    return (
        <>
            {isVisible && randomOffer && (
                <div className="bg-custom-yellow px-2 md:px-10 h-[50px] z-10 fixed top-0 left-0 right-0">
                    <div className="flex justify-center items-center relative h-full">
                        <h1 className="font-bold text-xl text-center text-dark flex-1">
                            <span className="hidden sm:inline">
                                {randomOffer.title[lang]}
                            </span>{" "}
                            Save up to {randomOffer.percentage}%
                        </h1>

                        <div className="flex gap-5 md:gap-20 items-center absolute right-0">
                            {randomOffer?.planId?.length == 1 ? (
                                <Link
                                    to={`/tours/${randomOffer?.tourId[0]?.category}/${randomOffer?.tourId[0]?._id}`}
                                    className="bg-light text-dark hover:bg-dark hover:text-white duration-300 py-1 px-2 rounded-3xl font-bold"
                                >
                                    <span className="hidden md:flex">
                                        Find Out More
                                    </span>
                                    <span className="md:hidden">
                                        <FaArrowRightLong />
                                    </span>
                                </Link>
                            ) : (
                                <Link
                                    to={`/tours`}
                                    className="bg-light text-dark hover:bg-dark hover:text-white duration-300 py-1 px-2 rounded-3xl font-bold"
                                >
                                    <span className="hidden md:flex">
                                        Find Out More
                                    </span>
                                    <span className="md:hidden">
                                        <FaArrowRightLong />
                                    </span>
                                </Link>
                            )}
                            <h1
                                className="font-bold text-lg text-dark cursor-pointer"
                                onClick={handleClose}
                            >
                                <IoClose />
                            </h1>
                        </div>
                    </div>
                </div>
            )}

            <div
                className={`z-10 transition-colors duration-300 fixed top-0 left-0 right-0 text-white text-xl ${
                    isVisible && " mt-[50px]"
                } ${
                    isScrolled ? "bg-custom-yellow" : "bg-custom-yellow-light"
                }`}
            >
                <div className="lg:w-[100%] mx-auto flex justify-between items-center px-10 py-3">
                    <div className="min-w-[20mm] max-w-[20mm] h-fit">
                        <Link to="/">
                            <img
                                src={logo}
                                className="w-full h-full object-cover"
                                alt="logo"
                            />
                        </Link>
                    </div>

                    <div className="flex justify-center items-center gap-2 ">
                        <div className="hidden xl:flex justify-center items-center gap-5">
                            <Link to="/">
                                {lang === "en" ? "Home" : "الصفحة الرئيسية"}
                            </Link>

                            {/* <Link to="/about">Experiences</Link> */}
                            {/* <Link to="/about">Services</Link> */}

                            {/* =========================================================================================================================================================================================================== */}
                            <div className="group inline-block relative">
                                <button
                                    aria-haspopup="true"
                                    aria-controls="menu"
                                    className="flex items-center relative"
                                >
                                    <NavLink
                                        to="/tours"
                                        className="pr-1   text-white py-4 flex-1 h-full flex items-center justify-center"
                                    >
                                        {lang === "en"
                                            ? "Experiences"
                                            : "تجارب"}
                                    </NavLink>
                                    <span>
                                        <svg
                                            className="fill-current h-4 w-4 transform transition-transform duration-150 ease-in-out"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </span>
                                </button>
                                <ul
                                    id="menu"
                                    aria-hidden="true"
                                    className="bg-white shadow-xl border p-2 border-b-custom-yellow border-b-4 rounded-sm absolute left-0 top-full transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out origin-top min-w-32 text-black w-[250px] text-sm "
                                >
                                    {categorys?.map((tourCategory) => (
                                        <li
                                            key={tourCategory._id}
                                            className="relative group"
                                            onMouseEnter={() =>
                                                setHoveredCategory(
                                                    tourCategory._id
                                                )
                                            }
                                            onMouseLeave={() =>
                                                setHoveredCategory(null)
                                            }
                                        >
                                            <button
                                                aria-haspopup="true"
                                                aria-controls={`menu-category-${tourCategory._id}`}
                                                className="w-full text-left flex items-center px-3 py-1 hover:bg-gray-100"
                                            >
                                                <NavLink
                                                    to={`/tours/${tourCategory._id}`}
                                                    className="pr-1 flex-1"
                                                >
                                                    {tourCategory.text[lang]}
                                                </NavLink>
                                                {tourCategory.tours && (
                                                    <svg
                                                        className="fill-current h-4 w-4 transform transition-transform duration-300 ease-in-out"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                    </svg>
                                                )}
                                            </button>
                                            {hoveredCategory ===
                                                tourCategory._id &&
                                                tourCategory.tours &&
                                                tourCategory.tours.length >
                                                    0 && (
                                                    <ul
                                                        id={`menu-category-${tourCategory._id}`}
                                                        aria-hidden="true"
                                                        className="bg-white shadow-xl border border-b-custom-yellow border-b-4 p-2  w-[250px] rounded-sm absolute left-full top-0 transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out origin-top min-w-32 text-black"
                                                    >
                                                        {tourCategory.tours.map(
                                                            (
                                                                subTour,
                                                                index
                                                            ) => (
                                                                <li
                                                                    key={index}
                                                                    className="px-3 py-1 hover:bg-gray-100"
                                                                >
                                                                    <NavLink
                                                                        to={`/tours/${
                                                                            tourCategory._id +
                                                                            "/" +
                                                                            subTour._id
                                                                        }`}
                                                                        className="block text-black"
                                                                    >
                                                                        {
                                                                            subTour
                                                                                .text[
                                                                                lang
                                                                            ]
                                                                        }
                                                                    </NavLink>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="group inline-block relative">
                                <button
                                    aria-haspopup="true"
                                    aria-controls="menu"
                                    className="flex items-center relative"
                                >
                                    <NavLink
                                        to="/tours"
                                        className="pr-1   text-white py-4 flex-1 h-full flex items-center justify-center"
                                    >
                                        {lang === "en" ? "Services" : "خدمات"}
                                    </NavLink>
                                    <span>
                                        <svg
                                            className="fill-current h-4 w-4 transform transition-transform duration-150 ease-in-out"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </span>
                                </button>
                                <ul
                                    id="menu"
                                    aria-hidden="true"
                                    className="bg-white shadow-xl border p-2 border-b-custom-yellow border-b-4 rounded-sm absolute left-0 top-full transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out origin-top min-w-32 text-black w-[250px] text-sm "
                                >
                                    <Link to={"/transportation"}>
                                        <li className="px-3 py-1 hover:bg-gray-100">
                                            {lang === "en"
                                                ? " Transportation Fleet"
                                                : "أسطول النقل"}
                                        </li>
                                    </Link>
                                    {/* <li className="px-3 py-1 hover:bg-gray-100">
                    {lang === "en" ? "Meet & Assist" : "الاستقبال والمساعدة"}
                  </li> */}
                                    <Link to={"/mice"}>
                                        <li className="px-3 py-1 hover:bg-gray-100">
                                            {lang === "en"
                                                ? "MICE"
                                                : "الاجتماعات والحوافز والمؤتمرات والمعارض"}
                                        </li>
                                    </Link>
                                    <Link to={"/cruise"}>
                                        <li className="px-3 py-1 hover:bg-gray-100">
                                            {lang === "en"
                                                ? "                      Cruise Packages"
                                                : "رحلات الكروز"}
                                        </li>
                                    </Link>

                                    {/* <li className="px-3 py-1 hover:bg-gray-100">
                    {lang === "en" ? "Visa" : "تأشيرة"}
                  </li> */}
                                </ul>
                            </div>

                            {/* =========================================================================================================================================================================================================================== */}

                            {/* <div className="relative group">
                            <Link
                                to="/tours"
                                className="flex items-center relative z-10"
                            >
                                Tours
                                <IoIosArrowDown className="mt-1 ml-1" />
                            </Link>
                            <div className="absolute left-0 top-full bg-white w-[200px] text-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
                                <div className="py-2">
                                    {tours.map((tour) => (
                                        <Link
                                            key={tour._id}
                                            to={`/tours/${tour._id}`}
                                            className="block px-4 py-2 text-black hover:bg-gray-200"
                                        >
                                            {tour.text}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div> */}

                            <Link to="/hotel">
                                {lang === "en" ? "Hotels" : "فنادق"}
                            </Link>

                            <Link to="/contact">
                                {lang === "en" ? "Contact Us" : "اتصل بنا"}
                            </Link>
                            {/* <Link to="/cart">Cart</Link> */}
                            <Link to="/about">
                                {lang === "en" ? "About Us" : "عنّا"}
                            </Link>
                            {/* <Link to="/faq">F&Q</Link> */}
                            {user &&
                                (user.role === "admin" ||
                                    user.role === "super-admin") && (
                                    <Link to="/admin/dashboard">
                                        {lang === "en" ? "Admin" : "الإدارة"}
                                    </Link>
                                )}

                            {!user || !user?.email ? (
                                <Link to="/signin">
                                    {lang === "en" ? "Login" : "تسجيل الدخول"}
                                </Link>
                            ) : (
                                <Link onClick={handleSignOut}>
                                    {lang === "en" ? "Logout" : "تسجيل الخروج"}
                                </Link>
                            )}
                            {/* <Link to="/signin">Login</Link> */}
                            {/* <Link to="/">العربية</Link> */}

                            <div
                                className="relative bg-blue-500 h-10 w-20 rounded-full cursor-pointer flex items-center justify-between"
                                onClick={toggleLanguage}
                            >
                                {/* Slider Circle */}
                                <div
                                    className={`absolute w-8 h-8 bg-custom-yellow rounded-full transition-transform duration-300 ease-in-out flex items-center justify-center ${
                                        isEnglish
                                            ? "translate-x-2"
                                            : "translate-x-10"
                                    }`}
                                >
                                    {/* Language inside the circle */}
                                    <span className="text-white font-semibold">
                                        {isEnglish ? "en" : "ar"}
                                    </span>
                                </div>

                                {/* English Language Option */}
                                <div className="flex-1 text-center text-white font-semibold">
                                    en
                                </div>

                                {/* Arabic Language Option */}
                                <div className="flex-1 text-center text-white font-semibold">
                                    ar
                                </div>
                            </div>

                            {/* <Link to="/cart" className="relative flex items-center">
              <BiCart size={35} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-yellow-500 text-white text-lg font-semibold rounded-full w-6 h-6 flex items-center justify-center -mr-2 -mt-2">
                  {cartItemCount}
                </span>
              )}
            </Link> */}

                            <div className="group inline-block relative">
                                <button
                                    aria-haspopup="true"
                                    aria-controls="menu"
                                    className="flex items-center relative"
                                >
                                    <div className="relative flex items-center ">
                                        <BiCart size={35} />
                                        {/*{cartItemCount > 0 && (
                    <span className="absolute top-0 right-0 bg-yellow-500 text-white text-lg font-semibold rounded-full w-6 h-6 flex items-center justify-center -mr-2 -mt-2">
                      {cartItemCount}
                    </span>
                  )}*/}
                                    </div>
                                    <span>
                                        <svg
                                            className="fill-current h-4 w-4 transform transition-transform duration-150 ease-in-out"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </span>
                                </button>
                                <ul
                                    id="menu"
                                    aria-hidden="true"
                                    className="bg-white shadow-xl border w-[50px] p-2 border-b-custom-yellow border-b-4 rounded-sm absolute left-0 top-full transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out origin-top min-w-32 text-black w-[250px] text-sm "
                                >
                                    <li className="hover:bg-gray-100 w-full">
                                        {user &&
                                        (user.role === "admin" ||
                                            user.role === "super-admin") ? (
                                            <Link
                                                to="/admin-cart"
                                                className="w-full block  px-3 py-1 "
                                            >
                                                {lang === "en"
                                                    ? "Cart"
                                                    : "عربة التسوق"}
                                            </Link>
                                        ) : (
                                            <Link
                                                to="/cart"
                                                className="w-full block  px-3 py-1"
                                            >
                                                {lang === "en"
                                                    ? "Cart"
                                                    : "عربة التسوق"}
                                            </Link>
                                        )}
                                    </li>
                                    <li className=" hover:bg-gray-100 w-full ">
                                        {user &&
                                        (user.role === "admin" ||
                                            user.role === "super-admin") ? (
                                            <Link
                                                to="/admin-favourites"
                                                className="w-full  px-3 py-1 block"
                                            >
                                                {lang === "en"
                                                    ? "Favourites"
                                                    : "المفضلات"}
                                            </Link>
                                        ) : (
                                            <Link
                                                to="/favourites"
                                                className="w-full  px-3 py-1 block"
                                            >
                                                {lang === "en"
                                                    ? "Favourites"
                                                    : "المفضلات"}
                                            </Link>
                                        )}
                                    </li>
                                </ul>
                            </div>

                            {/*<MdOutlineShoppingCart
                            className="w-6 h-6 font-bold text-white"
                            onClick={() => setSearchOpen(!searchOpen)}
                        />*/}
                        </div>
                        <GiHamburgerMenu
                            className="w-6 h-6 text-white xl:hidden"
                            onClick={() => setSidebarOpen(true)}
                        />{" "}
                        {/* &nbsp;
          <Link to="/cart">
            <MdOutlineShoppingCart className="w-6 h-6 text-white xl:hidden" />
          </Link> */}
                        {/* <Link
            to="/cart"
            className="relative flex items-center hover:text-yellow-900 xl:hidden"
          >
            <BiCart size={30} />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 bg-yellow-500 text-white text-lg font-semibold rounded-full w-6 h-6 flex items-center justify-center -mr-2 -mt-2">
                {cartItemCount}
              </span>
            )}
          </Link> */}
                        <div className="group inline-block relative xl:hidden">
                            <button
                                aria-haspopup="true"
                                aria-controls="menu"
                                className="flex items-center relative"
                            >
                                <div className="relative flex items-center">
                                    <BiCart size={35} />
                                    {/* {cartItemCount > 0 && (
                                    <span className="absolute top-0 right-0 bg-yellow-500 text-white text-lg font-semibold rounded-full w-6 h-6 flex items-center justify-center -mr-2 -mt-2">
                                        {cartItemCount}
                                    </span>
                                )}*/}
                                </div>
                                <span>
                                    <svg
                                        className="fill-current h-4 w-4 transform transition-transform duration-150 ease-in-out"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </span>
                            </button>
                            <ul
                                id="menu"
                                aria-hidden="true"
                                className="bg-white shadow-xl border w-[50px] p-2 border-b-custom-yellow border-b-4 rounded-sm absolute left-0 top-full transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out origin-top min-w-32 text-black w-[250px] text-sm "
                            >
                                <li className="hover:bg-gray-100">
                                    {user &&
                                    (user.role === "admin" ||
                                        user.role === "super-admin") ? (
                                        <Link
                                            to="/admin-cart"
                                            className="px-3 py-1 block"
                                        >
                                            {" "}
                                            {lang === "en"
                                                ? "Cart"
                                                : "عربة التسوق"}
                                        </Link>
                                    ) : (
                                        <Link
                                            to="/cart"
                                            className="px-3 py-1 block"
                                        >
                                            {" "}
                                            {lang === "en"
                                                ? "Cart"
                                                : "عربة التسوق"}
                                        </Link>
                                    )}
                                </li>
                                <li className=" hover:bg-gray-100">
                                    {user &&
                                    (user.role === "admin" ||
                                        user.role === "super-admin") ? (
                                        <Link
                                            to="/admin-favourites"
                                            className="px-3 py-1 block"
                                        >
                                            {" "}
                                            {lang === "en"
                                                ? "Favourites"
                                                : "المفضلات"}
                                        </Link>
                                    ) : (
                                        <Link
                                            to="/favourites"
                                            className="px-3 py-1 block"
                                        >
                                            {" "}
                                            {lang === "en"
                                                ? "Favourites"
                                                : "المفضلات"}
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                        &nbsp;
                        {searchOpen ? (
                            <IoClose
                                className="w-6 h-6 z-10 text-white"
                                onClick={() => setSearchOpen(!searchOpen)}
                            />
                        ) : (
                            <IoSearch
                                className="w-6 h-6 text-white"
                                onClick={() => setSearchOpen(!searchOpen)}
                            />
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div
                    className={`fixed inset-0 bg-black transition-opacity duration-300 ${
                        sidebarOpen ? "opacity-70" : "opacity-0"
                    }`}
                    style={{ pointerEvents: sidebarOpen ? "auto" : "none" }}
                    onClick={() => setSidebarOpen(false)}
                />
                <div
                    className={`fixed top-0 right-0 h-full w-[300px] bg-white shadow-lg transition-transform duration-300 ${
                        sidebarOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <div className="flex justify-end p-4 text-black">
                        <IoClose
                            className="w-8 h-8 text-black cursor-pointer"
                            onClick={() => setSidebarOpen(false)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <button
                            onClick={(e) => {
                                setSidebarOpen(false);
                                setExpandedCategory([]);
                                setTourOpen(false);
                                navigate("/");
                            }}
                            className="py-3 text-left text-black px-4 hover:bg-custom-yellow duration-200 hover:text-white text-[18px] border-b border-slate-300"
                        >
                            {lang === "en" ? "Home" : "الصفحة الرئيسية"}
                        </button>

                        <button
                            className="py-3 text-black px-4 hover:bg-custom-yellow duration-200 flex justify-between group items-center hover:text-white text-[18px] border-b border-slate-300"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSidebarOpen(false);
                                setExpandedCategory([]);
                                setTourOpen(false);
                                navigate("/tours");
                            }}
                        >
                            {lang === "en" ? "Experiences" : "تجارب"}

                            <div
                                className="flex p-1 justify-center items-center w-5 h-5 rounded-full bg-custom-yellow group-hover:bg-white group-hover:text-custom-yellow font-bold"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setTourOpen(!tourOpen);
                                }}
                            >
                                {tourOpen ? <FaMinus /> : <FaPlus />}
                            </div>
                        </button>

                        <div
                            className={`transition-all  duration-300 ease-in-out overflow-hidden ${
                                tourOpen
                                    ? "max-h-[1000px] opacity-100" // Increase max-height to accommodate larger content
                                    : "max-h-0 opacity-0"
                            }`}
                        >
                            <div className="bg-custom-yellow ml-5">
                                {categorys?.map((category, index) => (
                                    <div key={index}>
                                        <button
                                            className="py-3 text-black hover:text-white px-4 hover:bg-custom-yellow duration-200  group w-full flex justify-between items-center text-[18px] border-b border-slate-300"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSidebarOpen(false);
                                                setExpandedCategory([]);
                                                setTourOpen(false);
                                                navigate(
                                                    "/tours/" + category._id
                                                );
                                            }}
                                        >
                                            {category && category?.text[lang]}
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleToggleCategory(index);
                                                }}
                                                className="flex p-1 justify-center items-center w-5 h-5 rounded-full bg-custom-yellow group-hover:bg-white group-hover:text-custom-yellow font-bold"
                                            >
                                                {expandedCategory?.includes(
                                                    index
                                                ) ? (
                                                    <FaMinus />
                                                ) : (
                                                    <FaPlus />
                                                )}
                                            </div>
                                        </button>

                                        <div
                                            className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                                expandedCategory?.includes(
                                                    index
                                                )
                                                    ? "max-h-[500px] opacity-100"
                                                    : "max-h-0 opacity-0"
                                            }`}
                                        >
                                            <div className=" ml-5">
                                                {category.tours &&
                                                    category.tours.map(
                                                        (tour, tourIndex) => (
                                                            <button
                                                                key={tourIndex}
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.stopPropagation();
                                                                    setSidebarOpen(
                                                                        false
                                                                    );
                                                                    setExpandedCategory(
                                                                        []
                                                                    );
                                                                    setTourOpen(
                                                                        false
                                                                    );
                                                                    navigate(
                                                                        `/tours/${category._id}/${tour._id}`
                                                                    );
                                                                }}
                                                                className="block py-3 text-black px-4 hover:bg-custom-yellow w-full text-left duration-200 hover:text-white text-[18px] border-b border-slate-300"
                                                            >
                                                                {
                                                                    tour.text[
                                                                        lang
                                                                    ]
                                                                }
                                                            </button>
                                                        )
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button
                            className="py-3 text-black px-4 hover:bg-custom-yellow duration-200 flex justify-between group items-center hover:text-white text-[18px] border-b border-slate-300"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSidebarOpen(false);
                                setExpandedCategory([]);
                                setTourOpen(false);
                                navigate("/tours");
                            }}
                        >
                            {lang === "en" ? "Services" : "خدمات"}
                            <div
                                className="flex p-1 justify-center items-center w-5 h-5 rounded-full bg-custom-yellow group-hover:bg-white group-hover:text-custom-yellow font-bold"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setservicesOpen(!servicesOpen);
                                }}
                            >
                                {servicesOpen ? <FaMinus /> : <FaPlus />}
                            </div>
                        </button>

                        <div
                            className={`transition-all  duration-300 ease-in-out overflow-hidden ${
                                servicesOpen
                                    ? "max-h-[1000px] opacity-100" // Increase max-height to accommodate larger content
                                    : "max-h-0 opacity-0"
                            }`}
                        >
                            <div className="bg-custom-yellow ml-5">
                                <div>
                                    <div>
                                        <div className=" ml-5">
                                            <Link
                                                to={`/transportation`}
                                                className="block py-3 text-black px-4 hover:bg-custom-yellow duration-200 hover:text-white text-[18px] border-b border-slate-300"
                                            >
                                                {lang === "en"
                                                    ? " Transportation Fleet"
                                                    : "أسطول النقل"}
                                            </Link>
                                            {/* <Link
                        to={`/tours`}
                        className="block py-3 text-black px-4 hover:bg-custom-yellow duration-200 hover:text-white text-[18px] border-b border-slate-300"
                      >
                        {lang === "en"
                          ? "Meet & Assist"
                          : "الاستقبال والمساعدة"}
                      </Link> */}
                                            <Link
                                                to={`/mice`}
                                                className="block py-3 text-black px-4 hover:bg-custom-yellow duration-200 hover:text-white text-[18px] border-b border-slate-300"
                                            >
                                                {lang === "en"
                                                    ? "MICE"
                                                    : "الاجتماعات والحوافز والمؤتمرات والمعارض"}
                                            </Link>
                                            <Link
                                                to={`/cruise`}
                                                className="block py-3 text-black px-4 hover:bg-custom-yellow duration-200 hover:text-white text-[18px] border-b border-slate-300"
                                            >
                                                {lang === "en"
                                                    ? "                      Cruise Packages"
                                                    : "رحلات الكروز"}{" "}
                                            </Link>
                                            {/* <Link
                        to={`/tours`}
                        className="block py-3 text-black px-4 hover:bg-custom-yellow duration-200 hover:text-white text-[18px] border-b border-slate-300"
                      >
                        {lang === "en" ? "Visa" : "تأشيرة"}
                      </Link> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={(e) => {
                                setSidebarOpen(false);
                                setExpandedCategory([]);
                                setTourOpen(false);
                                navigate("/hotel");
                            }}
                            className="py-3 text-left  text-black px-4 hover:bg-custom-yellow duration-200 hover:text-white text-[18px] border-b border-slate-300"
                        >
                            {lang === "en" ? "Hotels" : "فنادق"}
                        </button>
                        <button
                            onClick={(e) => {
                                setSidebarOpen(false);
                                setExpandedCategory([]);
                                setTourOpen(false);
                                navigate("/contact");
                            }}
                            className="py-3 text-left  text-black px-4 hover:bg-custom-yellow duration-200 hover:text-white text-[18px] border-b border-slate-300"
                        >
                            {lang === "en" ? "Contact Us" : "اتصل بنا"}{" "}
                        </button>
                        <button
                            onClick={(e) => {
                                setSidebarOpen(false);
                                setExpandedCategory([]);
                                setTourOpen(false);
                                navigate("/about");
                            }}
                            className="py-3 text-left  text-black px-4 hover:bg-custom-yellow duration-200 hover:text-white text-[18px] border-b border-slate-300"
                        >
                            {lang === "en" ? "About Us" : "عنّا"}{" "}
                        </button>

                        {/* <button
            onClick={(e) => {
              setSidebarOpen(false);
              setExpandedCategory([]);
              setTourOpen(false);
              navigate("/favourites");
            }}
            className="py-3 text-left  text-black px-4 hover:bg-custom-yellow duration-200 hover:text-white text-[18px] border-b border-slate-300"
          >
            Favourites
          </button> */}

                        {/* <button
            onClick={(e) => {
              setSidebarOpen(false);
              setExpandedCategory([]);
              setTourOpen(false);
              navigate("/faq");
            }}
            className="py-3 text-left  text-black px-4 hover:bg-custom-yellow duration-200 hover:text-white text-[18px] border-b border-slate-300"
          >
            F&Q
          </button> */}
                        {user &&
                            (user?.role === "admin" ||
                                user?.role === "super-admin") && (
                                <button
                                    onClick={(e) => {
                                        setSidebarOpen(false);
                                        setExpandedCategory([]);
                                        setTourOpen(false);
                                        navigate("/admin/dashboard");
                                    }}
                                    className="py-3 text-left  text-black px-4 hover:bg-custom-yellow duration-200 hover:text-white text-[18px] border-b border-slate-300"
                                >
                                    {lang === "en" ? "Admin" : "الإدارة"}
                                </button>
                            )}
                        <div className="py-3 text-left  flex items-center text-black px-4   duration-200   text-[18px] border-b border-slate-300">
                            <div
                                className="relative bg-blue-500 h-10 w-20 rounded-full cursor-pointer flex items-center justify-between"
                                onClick={() => {
                                    // setSidebarOpen(false);
                                    // setExpandedCategory([]);
                                    // setTourOpen(false);
                                    toggleLanguage();
                                }}
                            >
                                {/* Slider Circle */}
                                <div
                                    className={`absolute w-8 h-8 bg-custom-yellow rounded-full transition-transform duration-300 ease-in-out flex items-center justify-center ${
                                        isEnglish
                                            ? "translate-x-2"
                                            : "translate-x-10"
                                    }`}
                                >
                                    {/* Language inside the circle */}
                                    <span className="text-white font-semibold">
                                        {isEnglish ? "en" : "ar"}
                                    </span>
                                </div>

                                {/* English Language Option */}
                                <div className="flex-1 text-center text-white font-semibold">
                                    en
                                </div>

                                {/* Arabic Language Option */}
                                <div className="flex-1 text-center text-white font-semibold">
                                    ar
                                </div>
                            </div>
                            &nbsp;&nbsp;
                            {isEnglish ? "English" : "Arabic"}
                        </div>

                        {/*    <button
                        onClick={(e) => {
                            setSidebarOpen(false);
                            setExpandedCategory([]);
                            setTourOpen(false);
                            navigate("/");
                        }}
                        className="py-3 text-left text-black px-4 hover:bg-custom-yellow duration-200 hover:text-white text-[18px] border-b border-slate-300"
                    >
                        العربية
                    </button>*/}
                        {!user || !user?.email ? (
                            <button
                                onClick={(e) => {
                                    setSidebarOpen(false);
                                    setExpandedCategory([]);
                                    setTourOpen(false);
                                    navigate("/signin");
                                }}
                                className="py-3 text-left text-black px-4 hover:bg-custom-yellow duration-200 hover:text-white text-[18px] border-b border-slate-300"
                            >
                                {lang === "en" ? "Login" : "تسجيل الدخول"}
                            </button>
                        ) : (
                            <button
                                onClick={(e) => {
                                    setSidebarOpen(false);
                                    setExpandedCategory([]);
                                    setTourOpen(false);
                                    handleSignOut();
                                }}
                                className="py-3 text-left text-black px-4 hover:bg-custom-yellow duration-200 hover:text-white text-[18px] border-b border-slate-300"
                            >
                                {lang === "en" ? "Logout" : "تسجيل الخروج"}
                            </button>
                        )}
                    </div>
                </div>

                {/* Search overlay */}
                <div
                    className={`fixed inset-0 flex justify-center items-center transition-opacity duration-300 ${
                        searchOpen ? "bg-black opacity-70" : "opacity-0"
                    }`}
                    style={{ pointerEvents: searchOpen ? "auto" : "none" }}
                    onClick={() => setSearchOpen(false)}
                >
                    <div
                        className="max-w-[500px] p-10  rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center">
                            <input
                                type="text"
                                className="text-3xl w-full bg-inherit border-b border-b-[px] border-white outline-none"
                                placeholder="Search ..."
                                ref={inputref}
                                value={search}
                                onChange={handleSearch}
                            />
                            <IoSearch className="w-8 h-8 text-white" />
                        </div>

                        <div className="h-full mt-3 h-1 bg-white"></div>
                        <ul className="h-[200px] ">
                            {filteredTours.map((category) => (
                                <li key={category._id}>
                                    {/* Parent item click */}
                                    <div
                                        onClick={() =>
                                            handleNavigate(category?._id)
                                        }
                                        className="hover:bg-custom-yellow hover:text-black "
                                    >
                                        {category.text.en}
                                    </div>
                                    <ul>
                                        {category.tours.map((tour) => (
                                            <li
                                                key={tour._id}
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent parent click from firing
                                                    handleNavigate(
                                                        category?._id,
                                                        tour?._id
                                                    ); // Nested item click with category and tour IDs
                                                }}
                                                className="hover:bg-custom-yellow hover:text-black "
                                            >
                                                {tour.text.en}
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* +++++++++++++++++=== */}
            </div>
        </>
    );
};

export default Navbar;
