import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/log.png";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { setUser } from "../features/Auth/userSlice";

import { FaPlus, FaMinus } from "react-icons/fa";
import { IoSearch, IoClose } from "react-icons/io5";

import { BiCart } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../features/language/languageSlice";
const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const lang = useSelector((state) => state.language.lang);
  const { user } = useSelector((state) => state.user);
  const BASE_URL = import.meta.env.VITE_BASE_URL; // Make sure to set your BASE_URL properly
  const [categorys, setCategorys] = useState([]);

  const tours = [
    {
      text: "City Tours",
      _id: 1,
      tours: [
        { text: "24 Hour Hop On Hop Off Sightseeing Tour" },
        { text: "Explore Doha Tour" },
        { text: "Doha Sports Tour" },
        { text: "Doha By Night" },
        { text: "Night Tour" },
      ],
    },
    {
      text: "Sea Tours",
      _id: 2,
      tours: [
        { text: "Dhow Cruising" },
        { text: "Dhow with Dinner" },
        { text: "Panoramic Dhow Cruise with Al Safliyah Island" },
      ],
    },
    {
      text: "Cultural Tours",
      _id: 3,
      tours: [
        { text: "History & Heritage of Qatar" },
        { text: "West Coast Excursion " },
        { text: "Doha Museum Tour" },
        { text: "Education City Tour" },
        { text: "Sheikh Faisal Museum and Camel Track" },
      ],
    },
    {
      text: "Desert Tours",
      _id: 4,
      tours: [
        { text: "Half day Desert Safari" },
        {
          text: "Monster Bus Tour in the Desert (Direct from Sealine)",
        },
        { text: "Monster Bus Tour in the Desert" },
        {
          text: "Monster Bus Tour in the Desert with Day Pass at Al Majles Resort ",
        },
        { text: "Full Day Desert Safari" },
      ],
    },
    {
      text: "Combo Tours",
      _id: 5,
      tours: [
        { text: "City & Monster Bus Combo Tour" },
        { text: "City & 4x4 Safari Desert Combo Tour" },
      ],
    },
    {
      text: "AL Majles Resort",
      _id: 6,
    },
  ];

  let cartItemCount = 3;
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [tourOpen, setTourOpen] = useState(false);
  const [servicesOpen, setservicesOpen] = useState(false);
  const inputref = useRef(null);
  const [expandedCategory, setExpandedCategory] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isEnglish, setIsEnglish] = useState(true);

  const dispatch = useDispatch();

  const toggleLanguage = () => {
    setIsEnglish((prev) => {
      if (prev) dispatch(setLanguage("ar"));
      else dispatch(setLanguage("en"));
      return !prev;
    });
  };
  const handleToggleCategory = (index) => {
    setExpandedCategory((prev) => {
      let arr = [...prev];
      if (prev.includes(index)) {
        let ind = prev.indexOf(index);
        console.log(ind);
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

  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSignOut = () => {
    dispatch(setUser({}));
    navigate("/");
    console.log("Logged Out");
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(BASE_URL + "/categorys/cat-tour");
        console.log(data.data?.data?.category);
        // setAlbum(data?.data?.images);
        setCategorys(data?.data?.data?.category);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div
      className={`z-10 transition-colors duration-300 fixed top-0 left-0 right-0 text-white text-xl ${
        isScrolled ? "bg-custom-yellow" : "bg-custom-yellow-light"
      }`}
    >
      {isVisible && (
        <div className="p-5 mb-3 bg-custom-yellow flex justify-between items-center border-b">
          <div className="flex-1 flex justify-center ">
            <h1 className="font-bold text-2xl text-center text-dark">
              Summer Sale! Save up to 15%
            </h1>
          </div>
          <div className="flex gap-5 md:gap-20 items-center">
            <button className="bg-light text-dark p-3 rounded-3xl font-bold">
              Find Out More
            </button>
            <h1
              className="font-bold text-2xl text-dark cursor-pointer"
              onClick={handleClose}
            >
              X
            </h1>
          </div>
        </div>
      )}

      <div className="lg:w-[100%] mx-auto flex justify-between items-center px-10 py-3">
        <div className="min-w-[20mm] max-w-[20mm] h-fit">
          <img src={logo} className="w-full h-full object-cover" alt="logo" />
        </div>

        <div className="flex justify-center items-center gap-2 ">
          <div className="hidden xl:flex justify-center items-center gap-5">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
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
                  Experiences
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
                {categorys.map((tourCategory) => (
                  <li
                    key={tourCategory._id}
                    className="relative group"
                    onMouseEnter={() => setHoveredCategory(tourCategory._id)}
                    onMouseLeave={() => setHoveredCategory(null)}
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
                    {hoveredCategory === tourCategory._id &&
                      tourCategory.tours &&
                      tourCategory.tours.length > 0 && (
                        <ul
                          id={`menu-category-${tourCategory._id}`}
                          aria-hidden="true"
                          className="bg-white shadow-xl border border-b-custom-yellow border-b-4 p-2  w-[250px] rounded-sm absolute left-full top-0 transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out origin-top min-w-32 text-black"
                        >
                          {tourCategory.tours.map((subTour, index) => (
                            <li
                              key={index}
                              className="px-3 py-1 hover:bg-gray-100"
                            >
                              <NavLink
                                to={`/tours/${
                                  tourCategory._id + "/" + subTour._id
                                }`}
                                className="block text-black"
                              >
                                {subTour.text[lang]}
                              </NavLink>
                            </li>
                          ))}
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
                  Services
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
                    Transportation Fleet
                  </li>
                </Link>
                <li className="px-3 py-1 hover:bg-gray-100">Meet & Assist</li>
                <li className="px-3 py-1 hover:bg-gray-100">MICE</li>
                <li className="px-3 py-1 hover:bg-gray-100">Cruise Packages</li>
                <li className="px-3 py-1 hover:bg-gray-100">Visa</li>
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

            <Link to="/hotel">Hotels</Link>

            <Link to="/contact">Contact Us</Link>
            {/* <Link to="/cart">Cart</Link> */}

            {/* <Link to="/faq">F&Q</Link> */}
            {user && user?.role === "admin" && <Link to="/admin">Admin</Link>}
            {user && !user._id ? (
              <Link to="/signin">Login</Link>
            ) : (
              <Link onClick={handleSignOut}>Logout</Link>
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
                  isEnglish ? "translate-x-2" : "translate-x-10"
                }`}
              >
                {/* Language inside the circle */}
                <span className="text-white font-semibold">
                  {isEnglish ? "en" : "an"}
                </span>
              </div>

              {/* English Language Option */}
              <div className="flex-1 text-center text-white font-semibold">
                en
              </div>

              {/* Arabic Language Option */}
              <div className="flex-1 text-center text-white font-semibold">
                an
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
                <div className="relative flex items-center">
                  <BiCart size={35} />
                  {cartItemCount > 0 && (
                    <span className="absolute top-0 right-0 bg-yellow-500 text-white text-lg font-semibold rounded-full w-6 h-6 flex items-center justify-center -mr-2 -mt-2">
                      {cartItemCount}
                    </span>
                  )}
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
                <li className="px-3 py-1 hover:bg-gray-100">
                  <Link to="/cart">Cart</Link>
                </li>
                <li className="px-3 py-1 hover:bg-gray-100">
                  <Link to="/favourites">Favourites</Link>
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
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-yellow-500 text-white text-lg font-semibold rounded-full w-6 h-6 flex items-center justify-center -mr-2 -mt-2">
                    {cartItemCount}
                  </span>
                )}
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
              <li className="px-3 py-1 hover:bg-gray-100">
                <Link to="/cart">Cart</Link>
              </li>
              <li className="px-3 py-1 hover:bg-gray-100">
                <Link to="/favourites">Favourites</Link>
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
            Home
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
            About Us
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
            Experience
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
                      navigate("/tours/" + category._id);
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
                      {expandedCategory?.includes(index) ? (
                        <FaMinus />
                      ) : (
                        <FaPlus />
                      )}
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      expandedCategory?.includes(index)
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className=" ml-5">
                      {category.tours &&
                        category.tours.map((tour, tourIndex) => (
                          <Link
                            key={tourIndex}
                            to={`/tours/${category._id}/${tour._id}`}
                            className="block py-3 text-black px-4 hover:bg-custom-yellow duration-200 hover:text-white text-[18px] border-b border-slate-300"
                          >
                            {tour.text[lang]}
                          </Link>
                        ))}
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
            Services
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
                      Transportation
                    </Link>
                    <Link
                      to={`/tours`}
                      className="block py-3 text-black px-4 hover:bg-custom-yellow duration-200 hover:text-white text-[18px] border-b border-slate-300"
                    >
                      Meet & Assist
                    </Link>
                    <Link
                      to={`/tours`}
                      className="block py-3 text-black px-4 hover:bg-custom-yellow duration-200 hover:text-white text-[18px] border-b border-slate-300"
                    >
                      MICE
                    </Link>
                    <Link
                      to={`/tours`}
                      className="block py-3 text-black px-4 hover:bg-custom-yellow duration-200 hover:text-white text-[18px] border-b border-slate-300"
                    >
                      Cruise Packages
                    </Link>
                    <Link
                      to={`/tours`}
                      className="block py-3 text-black px-4 hover:bg-custom-yellow duration-200 hover:text-white text-[18px] border-b border-slate-300"
                    >
                      Visa
                    </Link>
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
            Hotels
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
            Contact Us
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
          <button
            onClick={(e) => {
              setSidebarOpen(false);
              setExpandedCategory([]);
              setTourOpen(false);
              navigate("/admin");
            }}
            className="py-3 text-left  text-black px-4 hover:bg-custom-yellow duration-200 hover:text-white text-[18px] border-b border-slate-300"
          >
            Admin
          </button>

          <button
            onClick={(e) => {
              setSidebarOpen(false);
              setExpandedCategory([]);
              setTourOpen(false);
              navigate("/");
            }}
            className="py-3 text-left text-black px-4 hover:bg-custom-yellow duration-200 hover:text-white text-[18px] border-b border-slate-300"
          >
            العربية
          </button>
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
            />
            <IoSearch className="w-8 h-8 text-white" />
          </div>
          <div className="h-full mt-3 h-1 bg-white"></div>
        </div>
      </div>

      {/* +++++++++++++++++=== */}
    </div>
  );
};

export default Navbar;
